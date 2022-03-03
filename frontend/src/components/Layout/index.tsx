import React, { useState, useEffect, useRef } from 'react';
import Split from 'react-split';
import { useSettings } from '../../context/SettingsContext';
import Topbar from '../Topbar';
import Chart from '../Chart';
import InputPanel from '../InputPanel';
import ResultPanel from '../ResultPanel';
import TesterPanel from '../TesterPanel';
import './Layout.scss';
import { ChartSize } from '../../types/plot';

const Layout: React.FC = () => {
    const chartRef = useRef<any>(null);
    const { setChartHeight } = useSettings();
    const [chartSize, setChartSize] = useState<ChartSize | undefined>(
        undefined,
    );

    // update plot size when window size change
    let resizeInterval: any;
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
            setChartHeight(chartRef.current.offsetHeight);
        }
    };

    return (
        <div>
            <Topbar />
            <Split
                className="Layout__cols"
                gutterSize={5}
                sizes={[70, 30]}
                onDrag={updateSize}>
                {/* Left panel */}
                <Split
                    direction="vertical"
                    gutterSize={5}
                    sizes={[65, 35]}
                    onDrag={updateSize}>
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
