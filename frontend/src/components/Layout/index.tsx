import React, { useState, useEffect, useRef } from 'react';
import Split from 'react-split';
import Topbar from '../Topbar';
import Chart from '../Chart';
import './Layout.scss';
import { ChartSize } from '../../types/plot';

const Layout: React.FC = () => {
    const chartRef = useRef<any>(null);
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
        }
    };

    return (
        <div>
            <Topbar />
            <Split
                className="Layout__cols"
                gutterSize={5}
                sizes={[75, 25]}
                onDragEnd={updateSize}>
                {/* Left panel */}
                <Split
                    direction="vertical"
                    gutterSize={5}
                    sizes={[75, 25]}
                    onDragEnd={updateSize}>
                    <div ref={chartRef}>
                        <Chart chartSize={chartSize} />
                    </div>

                    <div>Tester panel</div>
                </Split>

                {/* Right panel */}
                <Split direction="vertical" gutterSize={4}>
                    <div>Input panel</div>
                    <div>General result panel</div>
                </Split>
            </Split>
        </div>
    );
};

export default Layout;
