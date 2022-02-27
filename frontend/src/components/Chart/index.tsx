import React, { useState, useEffect, useRef } from 'react';
import { getStockDataRequest } from '../../apis/stockData';
import {
    BokehEmbedPlot,
    BokehEmbedPlotReference,
    ChartSize,
} from '../../types/plot';
import './Chart.scss';

interface ChartProps {
    chartSize?: ChartSize;
}

const Chart: React.FC<ChartProps> = ({ chartSize }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [plotData, setPlotData] = useState<BokehEmbedPlot | undefined>(
        undefined,
    );
    const [plotScales, setPlotScales] = useState<number[]>([]);

    useEffect(() => {
        getStockDataRequest()
            .then(res => {
                setPlotScales(
                    res.doc.roots.references.map(
                        (reference: BokehEmbedPlotReference) =>
                            reference.subtype && reference.subtype === 'Figure'
                                ? reference.attributes.height / 100
                                : 0,
                    ),
                );
                setPlotData(res);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.innerHTML = '';
            if (plotData) {
                let plot = plotData;
                if (chartSize) {
                    plot.doc.roots.references =
                        plotData.doc.roots.references.map(
                            (
                                reference: BokehEmbedPlotReference,
                                index: number,
                            ) =>
                                reference.subtype &&
                                reference.subtype === 'Figure'
                                    ? {
                                          ...reference,
                                          attributes: {
                                              ...reference.attributes,
                                              width: chartSize.width,
                                              height:
                                                  plotScales[index] *
                                                  (chartSize.height / 5),
                                          },
                                      }
                                    : reference,
                        );
                }

                window.Bokeh.embed.embed_item(plot, 'BokehPlot');
            }
        }
    }, [plotData, chartSize, plotScales]);

    return <div id="BokehPlot" ref={chartRef}></div>;
};

export default Chart;
