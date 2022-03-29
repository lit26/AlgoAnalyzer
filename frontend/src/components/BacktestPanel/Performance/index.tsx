import React, { useEffect, useRef } from 'react';

import { useBacktest } from '../../../context/BacktestContext';
import { BokehEmbedPlotReference } from '../../../types/plot';
import './Performance.scss';

const Performance: React.FC = () => {
    const performanceChartRef = useRef<HTMLDivElement>(null);

    const { portfolioPlotData, chartSize } = useBacktest();

    useEffect(() => {
        if (performanceChartRef.current) {
            performanceChartRef.current.innerHTML = '';
            if (portfolioPlotData) {
                const plot = portfolioPlotData;
                if (chartSize) {
                    plot.doc.roots.references =
                        portfolioPlotData.doc.roots.references.map(
                            (reference: BokehEmbedPlotReference) =>
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
    return (
        <div
            id="BokehPerformancePlot"
            className="relative"
            ref={performanceChartRef}></div>
    );
};

export default Performance;
