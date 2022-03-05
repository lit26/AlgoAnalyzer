import pandas as pd
from bokeh.layouts import column
from bokeh.models import (
    BooleanFilter,
    CustomJS,
    ColumnDataSource,
    CDSView,
    HoverTool,
    CrosshairTool,
    NumeralTickFormatter,
)
from bokeh.plotting import figure, show
from bokeh.embed import json_item
from bokeh.io import curdoc
from bokeh.themes import Theme
import os


INDEX_COL = "index1"
w = 0.5

with open(
    os.path.join(os.path.dirname(__file__), "autoscale_cb.js"), encoding="utf-8"
) as _f:
    _AUTOSCALE_JS_CALLBACK = _f.read()

with open(
    os.path.join(os.path.dirname(__file__), "position_autoscale_cb.js"),
    encoding="utf-8",
) as _f:
    _POSITION_AUTOSCALE_JS_CALLBACK = _f.read()

curdoc().theme = Theme(filename="api/plot/theme.yml")


class Stockplot:
    def __init__(
        self,
        stock,
        data,
        date="Date",
        open="Open",
        high="High",
        low="Low",
        close="Close",
        volume="Volume",
        kind="candlestick",
        show_volume=True,
        addplot=None,
        main_plot_height=400,
        volume_plot_height=100,
    ):
        self._stock = stock
        self._date = date
        self._open = open
        self._high = high
        self._low = low
        self._close = close
        self._volume = volume
        self._kind = kind
        self._show_volume = show_volume
        self._addplot = addplot
        self._main_plot_height = main_plot_height
        self._volume_plot_height = volume_plot_height
        self._tools = "pan,xwheel_zoom,reset"
        self._linked_crosshair = CrosshairTool(dimensions="both", line_color="#d1d4dc")
        self._grid_line_alpha = 0.3
        self._p_scale = []
        self._p = []
        self._process_data(data)
        self._plot()

    def add_subplot(self, subplot):
        p = figure(x_range=self._p[0].x_range, plot_height=200, **self._options)
        p.xaxis.major_label_overrides = self._major_label_overrides
        p.grid.grid_line_alpha = self._grid_line_alpha

        ind_line = []
        ind_tooltip = []
        for ind in subplot:
            if ind["kind"] == "line":
                l = p.line(
                    x=INDEX_COL,
                    y=ind["column"],
                    source=self._source,
                    **self._format_style("line", **ind),
                )
                ind_line.append(l)
                ind_tooltip.append((ind["column"], f"@{ind['column']}"))
            elif ind["kind"] == "scatter":
                s = p.scatter(
                    x=INDEX_COL,
                    y=ind["column"],
                    source=self._source,
                    **self._format_style("scatter", **ind),
                )
                ind_line.append(s)
                ind_tooltip.append((ind["column"], f"@{ind['column']}"))
            else:
                raise ValueError("Other kinds are not supported.")
        p.add_tools(
            HoverTool(
                renderers=ind_line,
                point_policy="follow_mouse",
                tooltips=ind_tooltip,
                mode="vline",
            )
        )
        p.add_tools(self._linked_crosshair)
        self._p_scale.append(200)
        self._p.append(p)

    def _format_tooltips(self, custom):
        NBSP = "\N{NBSP}" * 4
        tool_tips = dict(
            point_policy="follow_mouse",
            tooltips=[
                ("Date", "@Date{%F}"),
                (
                    "OHLC",
                    NBSP.join(
                        (
                            "@Open{0,0.00}",
                            "@High{0,0.00}",
                            "@Low{0,0.00}",
                            "@Close{0,0.00}",
                        )
                    ),
                ),
                ("Volume", "@Volume{0,0.0[0000]}"),
            ]
            + custom,
            formatters={"@Date": "datetime"},
            mode="vline",
        )
        return tool_tips

    def _process_data(self, data):
        data[INDEX_COL] = data.index
        self._source = ColumnDataSource(data)
        inc = self._source.data[self._close] > self._source.data[self._open]
        dec = self._source.data[self._open] > self._source.data[self._close]
        self._view_inc = CDSView(source=self._source, filters=[BooleanFilter(inc)])
        self._view_dec = CDSView(source=self._source, filters=[BooleanFilter(dec)])
        self._view = CDSView(source=self._source)
        self._options = dict(x_axis_type="datetime", plot_width=1000)
        self._major_label_overrides = {
            i: date.strftime("%b %d")
            for i, date in enumerate(pd.to_datetime(self._source.data[self._date]))
        }
        self._segment = dict(
            x0=INDEX_COL, x1=INDEX_COL, y0=self._low, y1=self._high, color="#d1d4dc"
        )

    def _volume_plot(self):
        if self._show_volume:
            p = figure(
                x_range=self._p[0].x_range,
                plot_height=self._volume_plot_height,
                tools="pan,xwheel_zoom,reset",
                **self._options,
            )
            p.toolbar.logo = None
            p.xaxis.major_label_overrides = self._major_label_overrides
            p.grid.grid_line_alpha = self._grid_line_alpha

            vbar_options = dict(
                x=INDEX_COL,
                width=w,
                top=self._volume,
                bottom=0,
                source=self._source,
            )

            t1 = p.vbar(
                fill_color="green",
                line_color="green",
                view=self._view_inc,
                **vbar_options,
            )
            t2 = p.vbar(
                fill_color="red", line_color="red", view=self._view_dec, **vbar_options
            )

            p.add_tools(
                HoverTool(
                    renderers=[t1, t2],
                    **self._format_tooltips([]),
                )
            )
            p.add_tools(self._linked_crosshair)

            p.yaxis.formatter = NumeralTickFormatter(format="0.0a")
            self._p_scale.append(self._volume_plot_height)
            self._p.append(p)

    def _format_style(self, plot, **kwargs):
        styles = {}
        if plot == "line":
            styles["color"] = kwargs["color"] if "color" in kwargs else "#d1d4dc"
            styles["line_width"] = kwargs["line_width"] if "line_width" in kwargs else 1
            styles["alpha"] = kwargs["alpha"] if "alpha" in kwargs else 1
        elif plot == "scatter":
            styles["color"] = kwargs["color"] if "color" in kwargs else "#d1d4dc"
            styles["size"] = kwargs["size"] if "size" in kwargs else 3
            styles["alpha"] = kwargs["alpha"] if "alpha" in kwargs else 1
            styles["marker"] = kwargs["marker"] if "marker" in kwargs else "dot"

        return styles

    def _add_mainplot(self, p):
        if not self._addplot:
            return []
        ind_tooltip = []
        for ind in self._addplot:
            if ind["kind"] == "line":
                p.line(
                    x=INDEX_COL,
                    y=ind["column"],
                    source=self._source,
                    **self._format_style("line", **ind),
                )
            elif ind["kind"] == "scatter":
                p.scatter(
                    x=INDEX_COL,
                    y=ind["column"],
                    source=self._source,
                    **self._format_style("scatter", **ind),
                )
            else:
                raise ValueError("Other kinds are not supported.")
            ind_tooltip.append((ind["column"], f"@{ind['column']}"))

        return ind_tooltip

    def _auto_scale(self, p):
        custom_js_args = dict(ohlc_range=p.y_range, source=self._source)
        p.x_range.js_on_change(
            "end", CustomJS(args=custom_js_args, code=_AUTOSCALE_JS_CALLBACK)
        )
        return p

    def _candlestick_plot(self):
        p = figure(
            plot_height=self._main_plot_height, tools=self._tools, **self._options
        )

        p.toolbar.logo = None
        p.xaxis.major_label_overrides = self._major_label_overrides
        p.grid.grid_line_alpha = self._grid_line_alpha

        p.segment(**self._segment, source=self._source)

        vbar_options = dict(
            x=INDEX_COL,
            width=w,
            top=self._open,
            bottom=self._close,
            source=self._source,
        )

        t1 = p.vbar(
            fill_color="green", line_color="green", view=self._view_inc, **vbar_options
        )
        t2 = p.vbar(
            fill_color="red", line_color="red", view=self._view_dec, **vbar_options
        )

        ind_tooltip = self._add_mainplot(p)

        p.add_tools(
            HoverTool(
                renderers=[t1, t2],
                **self._format_tooltips(ind_tooltip),
            ),
            self._linked_crosshair,
        )
        self._auto_scale(p)
        self._p_scale.append(self._main_plot_height)
        self._p.append(p)

    def _line_plot(self):
        p = figure(
            plot_height=self._main_plot_height, tools=self._tools, **self._options
        )
        p.toolbar.logo = None
        p.xaxis.major_label_overrides = self._major_label_overrides
        p.grid.grid_line_alpha = self._grid_line_alpha

        l = p.line(x=INDEX_COL, y=self._close, source=self._source)

        ind_tooltip = self._add_mainplot(p)

        p.add_tools(
            HoverTool(
                renderers=[l],
                **self._format_tooltips(ind_tooltip),
            ),
            self._linked_crosshair,
        )
        self._auto_scale(p)
        self._p_scale.append(self._main_plot_height)
        self._p.append(p)

    def _plot(self):
        if self._kind == "candlestick":
            self._candlestick_plot()
        elif self._kind == "line":
            self._line_plot()
        else:
            raise ValueError("Please choose from the following: candlestock, line")

        self._volume_plot()

    def get_component(self):
        layout = column(self._p)
        curdoc().add_root(layout)
        return json_item(layout, "bkplot"), self._p_scale

    def show(self):
        show(column(self._p))


class Portfolioplot:
    def __init__(
        self,
        data,
        date="Date",
        portfolio="Portfolio",
        positions="Positions",
        plot_height=200,
    ):
        self._data = data
        self._date = date
        self._portfolio = portfolio
        self._positions = positions
        self._process_data(data)
        self._plot_height = plot_height
        self._tools = "pan,xwheel_zoom,reset"
        self._linked_crosshair = CrosshairTool(dimensions="both", line_color="#d1d4dc")
        self._grid_line_alpha = 0.3
        self._p = []
        self._p_scale = [plot_height]
        self._plot()

    def _format_tooltips(self):
        tool_tips = dict(
            point_policy="follow_mouse",
            tooltips=[
                ("Date", "@Date{%F}"),
                ("Portfolio", "@Portfolio{0,0.0[0000]}"),
                ("Positions", "@Positions{0,0.0[0000]}"),
            ],
            formatters={"@Date": "datetime"},
            mode="vline",
        )
        return tool_tips

    def _process_data(self, data):
        self._source = ColumnDataSource(data)
        self._options = dict(x_axis_type="datetime", plot_width=1000)
        self._major_label_overrides = {
            i: date.strftime("%b %d")
            for i, date in enumerate(pd.to_datetime(self._source.data[self._date]))
        }

    def _auto_scale(self, p):
        custom_js_args = dict(ohlc_range=p.y_range, source=self._source)
        p.x_range.js_on_change(
            "end", CustomJS(args=custom_js_args, code=_POSITION_AUTOSCALE_JS_CALLBACK)
        )
        return p

    def _plot(self):
        p = figure(plot_height=self._plot_height, tools=self._tools, **self._options)
        p.toolbar.logo = None
        p.xaxis.major_label_overrides = self._major_label_overrides
        p.grid.grid_line_alpha = self._grid_line_alpha

        l1 = p.line(x=INDEX_COL, y=self._portfolio, source=self._source)
        l2 = p.line(
            x=INDEX_COL, y=self._positions, source=self._source, line_color="#f47f33"
        )

        p.add_tools(
            HoverTool(renderers=[l1, l2], **self._format_tooltips()),
            self._linked_crosshair,
        )
        p.yaxis.formatter = NumeralTickFormatter(format="0.0a")
        self._auto_scale(p)

        self._p.append(p)

    def get_component(self):
        layout = column(self._p)
        curdoc().add_root(layout)
        return json_item(layout, "bkplot_position"), self._p_scale

    def show(self):
        show(column(self._p))
