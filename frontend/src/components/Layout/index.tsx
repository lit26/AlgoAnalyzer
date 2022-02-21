import React from 'react';
import Topbar from '../Topbar';
import Split from 'react-split';
import './Layout.scss';

const Layout: React.FC = () => {
    return (
        <div>
            <Topbar />
            <Split className="Layout__cols" gutterSize={5} sizes={[75, 25]}>
                {/* Left panel */}
                <Split direction="vertical" gutterSize={5} sizes={[75, 25]}>
                    <div>Chart</div>
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
