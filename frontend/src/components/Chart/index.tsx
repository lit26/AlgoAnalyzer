import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useRef, useState } from 'react';

import { getStockDataRequest } from '../../apis/stockData';
import { useBacktest } from '../../context/BacktestContext';
import { useManager } from '../../context/ManagerContext';
import { useToast } from '../../context/ToastContext';
import { BokehEmbedPlotReference, ChartSize } from '../../types/plot';
import './Chart.scss';

interface ChartProps {
    chartSize?: ChartSize;
}

const Chart: React.FC<ChartProps> = ({ chartSize }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const { currentTicker, currentStrategy, chartType } = useManager();
    const { plotData, handlePlot, plotScales, runStrategy, backtestRunning } =
        useBacktest();
    const { addToasts } = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (currentTicker) {
            setLoading(true);
            if (
                currentStrategy.name !== '' &&
                typeof backtestRunning !== 'undefined'
            ) {
                runStrategy(
                    currentStrategy.name,
                    chartType,
                    currentTicker,
                    currentStrategy.params,
                )
                    .then(() => setLoading(false))
                    .catch(err => {
                        setLoading(false);
                        addToasts(err.msg, 'error');
                    });
            } else {
                getStockDataRequest(
                    currentTicker.ticker,
                    currentTicker.timeframe,
                    chartType,
                )
                    .then(res => {
                        setLoading(false);
                        handlePlot(res);
                    })
                    .catch(() => {
                        setLoading(false);
                        addToasts('Fail to plot chart.', 'error');
                    });
            }
        }
    }, [currentTicker, chartType]);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.innerHTML = '';
            if (plotData) {
                const plot = plotData;
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
                                                  chartSize.height,
                                          },
                                      }
                                    : reference,
                        );
                }
                const bokehPlot = document.getElementById('BokehPlot');
                if (bokehPlot) {
                    bokehPlot.innerHTML = '';
                }
                window.Bokeh.embed.embed_item(plot, 'BokehPlot');
            }
        }
    }, [plotData, chartSize, plotScales]);

    return (
        <div className="Chart">
            <div id="BokehPlot" ref={chartRef}></div>
            {loading && (
                <div
                    className="Chart__loadingWrapper"
                    style={{
                        width: chartSize?.width,
                        height: chartSize?.height,
                        backgroundColor: plotData && '#00000033',
                    }}>
                    <div className="Chart__loading">
                        <CircularProgress
                            style={{
                                width: '26px',
                                height: '26px',
                                marginRight: '5px',
                            }}
                        />
                        <div>Loading...</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chart;
