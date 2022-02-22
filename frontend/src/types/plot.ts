export type BokehEmbedPlotReference = {
    attributes: any;
    id: string;
    type: string;
    subtype?: string;
};

export type BokehEmbedPlot = {
    target_id: string;
    root_id: string;
    doc: {
        title: string;
        version: string;
        defs: any[];
        roots: {
            root_ids: string[];
            references: BokehEmbedPlotReference[];
        };
    };
};

export type ChartSize = {
    width: number;
    height: number;
};
