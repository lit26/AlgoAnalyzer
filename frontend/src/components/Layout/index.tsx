import React, { useEffect, useRef } from 'react';
import Split from 'react-split';

import { useBacktest } from '../../context/BacktestContext';
import Chart from '../Chart';
import InputPanel from '../InputPanel';
import ResultPanel from '../ResultPanel';
import TesterPanel from '../TesterPanel';
import Topbar from '../Topbar';
import './Layout.scss';

const Layout: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const { chartSize, setChartSize } = useBacktest();

    // update plot size when window size change
    let resizeInterval: NodeJS.Timeout;
    useEffect(() => {
        const handleResize = () => {
            clearTimeout(resizeInterval);
            resizeInterval = setTimeout(updateSize, 100);
        };

        window.addEventListener('resize', handleResize);
    }, []);

    // init plot size
    useEffect(() => {
        updateSize();
    }, []);

    // update size when panel size changes
    const updateSize = () => {
        if (chartRef.current) {
            setChartSize({
                width: chartRef.current.offsetWidth,
                height: chartRef.current.offsetHeight,
            });
        }
    };

    const handleDrag = () => {
        const plot1 = document.getElementById('BokehPlot');
        if (plot1) {
            plot1.innerHTML = '';
        }
        const plot2 = document.getElementById('BokehPerformancePlot');
        if (plot2) {
            plot2.innerHTML = '';
        }
    };

    return (
        <div>
            <Topbar />
            <Split
                className="Layout__cols flex"
                gutterSize={5}
                sizes={[70, 30]}
                minSize={[220, 200]}
                onDrag={handleDrag}
                onDragEnd={updateSize}>
                {/* Left panel */}
                <Split
                    direction="vertical"
                    gutterSize={5}
                    sizes={[65, 35]}
                    minSize={[200, 200]}
                    onDrag={handleDrag}
                    onDragEnd={updateSize}>
                    <div ref={chartRef}>
                        <Chart chartSize={chartSize} />
                    </div>

                    <TesterPanel />
                </Split>

                {/* Right panel */}
                <Split direction="vertical" gutterSize={4} sizes={[40, 60]}>
                    <InputPanel />
                    <ResultPanel />
                </Split>
            </Split>
        </div>
    );
};

export default Layout;
