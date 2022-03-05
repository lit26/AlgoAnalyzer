import React, { useRef, useEffect } from 'react';
import { useBacktest } from '../../../context/BacktestContext';
import './Performance.scss';
import { BokehEmbedPlotReference } from '../../../types/plot';

const Performance: React.FC = () => {
    const performanceChartRef = useRef<HTMLDivElement>(null);

    const { portfolioPlotData, chartSize } = useBacktest();

    useEffect(() => {
        if (performanceChartRef.current) {
            performanceChartRef.current.innerHTML = '';
            if (portfolioPlotData) {
                let plot = portfolioPlotData;
                if (chartSize) {
                    plot.doc.roots.references =
                        portfolioPlotData.doc.roots.references.map(
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
                                                  chartSize &&
                                                  window.innerHeight -
                                                      (chartSize.height + 120),
                                          },
                                      }
                                    : reference,
                        );
                }
                const bokehPlot = document.getElementById(
                    'BokehPerformancePlot',
                );
                if (bokehPlot) {
                    bokehPlot.innerHTML = '';
                }
                window.Bokeh.embed.embed_item(
                    portfolioPlotData,
                    'BokehPerformancePlot',
                );
            }
        }
    }, [portfolioPlotData, chartSize]);
    return <div id="BokehPerformancePlot" ref={performanceChartRef}></div>;
};

export default Performance;
