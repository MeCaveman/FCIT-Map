export interface VertexData {
  id: string;
  objectName: string | null;
  cx: number;
  cy: number;
}

export interface EdgeData {
  id: string;
  from: string;
  to: string;
}

export interface GraphData {
  vertices: VertexData[];
  edges: EdgeData[];
}

// Auto-generated from SVG - all 56 nodes with auto-connected edges
export const graphData: GraphData = {
  vertices: [
    { id: "v1", objectName: "Entrance 1", cx: 723.939, cy: 1054.9 },
    { id: "v2", objectName: null, cx: 796.839, cy: 1097.14 },
    { id: "v3", objectName: null, cx: 723.939, cy: 988.078 },
    { id: "v4", objectName: null, cx: 579.941, cy: 988.078 },
    { id: "v5", objectName: null, cx: 816.986, cy: 988.078 },
    { id: "v6", objectName: null, cx: 723.939, cy: 926.299 },
    { id: "v7", objectName: null, cx: 723.939, cy: 852.963 },
    { id: "v8", objectName: "Main Hallway", cx: 723.939, cy: 765.128 },
    { id: "v9", objectName: null, cx: 723.939, cy: 684.647 },
    { id: "v10", objectName: "Entrance 2", cx: 584.724, cy: 767.229 },
    { id: "v11", objectName: "Entrance 3", cx: 872.489, cy: 767.229 },
    { id: "v12", objectName: null, cx: 656.32, cy: 545.967 },
    { id: "v13", objectName: null, cx: 613.619, cy: 546.967 },
    { id: "v14", objectName: null, cx: 502.563, cy: 546.967 },
    { id: "v15", objectName: null, cx: 591.506, cy: 501.827 },
    { id: "v16", objectName: null, cx: 584.724, cy: 569.419 },
    { id: "v17", objectName: null, cx: 584.724, cy: 546.967 },
    { id: "v18", objectName: null, cx: 465.744, cy: 546.967 },
    { id: "v19", objectName: null, cx: 388.995, cy: 546.967 },
    { id: "v20", objectName: null, cx: 329.359, cy: 546.967 },
    { id: "v21", objectName: null, cx: 364.622, cy: 546.967 },
    { id: "v22", objectName: null, cx: 277.794, cy: 546.967 },
    { id: "v23", objectName: null, cx: 149.563, cy: 546.749 },
    { id: "v24", objectName: null, cx: 199.855, cy: 546.967 },
    { id: "v25", objectName: "Bathroom 3", cx: 199.855, cy: 596.343 },
    { id: "v26", objectName: null, cx: 224.706, cy: 546.967 },
    { id: "v27", objectName: null, cx: 224.706, cy: 596.343 },
    { id: "v28", objectName: "Main Hall", cx: 723.939, cy: 316.798 },
    { id: "v29", objectName: null, cx: 565.94, cy: 316.798 },
    { id: "v30", objectName: null, cx: 845.168, cy: 316.798 },
    { id: "v31", objectName: "Bathroom 4", cx: 603.302, cy: 222.873 },
    { id: "v32", objectName: null, cx: 603.302, cy: 316.798 },
    { id: "v33", objectName: null, cx: 721.939, cy: 222.873 },
    { id: "v34", objectName: null, cx: 723.939, cy: 126.399 },
    { id: "v35", objectName: null, cx: 591.506, cy: 546.967 },
    { id: "v36", objectName: "Bathroom 2", cx: 791.498, cy: 545.967 },
    { id: "v37", objectName: null, cx: 723.939, cy: 545.967 },
    { id: "v38", objectName: null, cx: 527.173, cy: 988.078 },
    { id: "v39", objectName: null, cx: 495.842, cy: 988.078 },
    { id: "v40", objectName: null, cx: 404.157, cy: 988.078 },
    { id: "v41", objectName: null, cx: 383.709, cy: 988.078 },
    { id: "v42", objectName: null, cx: 256.405, cy: 988.078 },
    { id: "v43", objectName: null, cx: 140.315, cy: 990.067 },
    { id: "v44", objectName: null, cx: 205.035, cy: 990.067 },
    { id: "v45", objectName: "Bathroom 1", cx: 205.035, cy: 1036.46 },
    { id: "v46", objectName: null, cx: 178.184, cy: 1036.46 },
    { id: "v47", objectName: null, cx: 177.413, cy: 990.067 },
    { id: "v48", objectName: null, cx: 579.941, cy: 1034.51 },
    { id: "v50", objectName: null, cx: 579.941, cy: 1086.92 },
    { id: "v51", objectName: null, cx: 872.489, cy: 736.235 },
    { id: "v52", objectName: null, cx: 872.489, cy: 799.256 },
    { id: "v53", objectName: null, cx: 575.977, cy: 799.256 },
    { id: "v54", objectName: null, cx: 575.977, cy: 734.168 },
    { id: "v55", objectName: null, cx: 723.939, cy: 455.938 },
    { id: "v56", objectName: null, cx: 721.939, cy: 193.458 },
    { id: "v57", objectName: "Lab Hallway 1", cx: 631.334, cy: 988.918 },
  ],
  edges: [
    // Vertical corridor (center spine)
    { id: "v1_to_v3", from: "v1", to: "v3" }, { id: "v3_to_v1", from: "v3", to: "v1" },
    { id: "v3_to_v6", from: "v3", to: "v6" }, { id: "v6_to_v3", from: "v6", to: "v3" },
    { id: "v6_to_v7", from: "v6", to: "v7" }, { id: "v7_to_v6", from: "v7", to: "v6" },
    { id: "v7_to_v8", from: "v7", to: "v8" }, { id: "v8_to_v7", from: "v8", to: "v7" },
    { id: "v8_to_v9", from: "v8", to: "v9" }, { id: "v9_to_v8", from: "v9", to: "v8" },
    { id: "v9_to_v37", from: "v9", to: "v37" }, { id: "v37_to_v9", from: "v37", to: "v9" },
    { id: "v37_to_v55", from: "v37", to: "v55" }, { id: "v55_to_v37", from: "v55", to: "v37" },
    { id: "v55_to_v28", from: "v55", to: "v28" }, { id: "v28_to_v55", from: "v28", to: "v55" },
    { id: "v28_to_v56", from: "v28", to: "v56" }, { id: "v56_to_v28", from: "v56", to: "v28" },
    { id: "v56_to_v33", from: "v56", to: "v33" }, { id: "v33_to_v56", from: "v33", to: "v56" },
    { id: "v33_to_v34", from: "v33", to: "v34" }, { id: "v34_to_v33", from: "v34", to: "v33" },
    
    // Left corridor (bottom section)
    { id: "v3_to_v57", from: "v3", to: "v57" }, { id: "v57_to_v3", from: "v57", to: "v3" },
    { id: "v57_to_v4", from: "v57", to: "v4" }, { id: "v4_to_v57", from: "v4", to: "v57" },
    { id: "v4_to_v38", from: "v4", to: "v38" }, { id: "v38_to_v4", from: "v38", to: "v4" },
    { id: "v38_to_v39", from: "v38", to: "v39" }, { id: "v39_to_v38", from: "v39", to: "v38" },
    { id: "v39_to_v40", from: "v39", to: "v40" }, { id: "v40_to_v39", from: "v40", to: "v39" },
    { id: "v40_to_v41", from: "v40", to: "v41" }, { id: "v41_to_v40", from: "v41", to: "v40" },
    { id: "v41_to_v42", from: "v41", to: "v42" }, { id: "v42_to_v41", from: "v42", to: "v41" },
    { id: "v42_to_v44", from: "v42", to: "v44" }, { id: "v44_to_v42", from: "v44", to: "v42" },
    { id: "v44_to_v47", from: "v44", to: "v47" }, { id: "v47_to_v44", from: "v47", to: "v44" },
    { id: "v47_to_v43", from: "v47", to: "v43" }, { id: "v43_to_v47", from: "v43", to: "v47" },
    
    // Left branch down
    { id: "v44_to_v45", from: "v44", to: "v45" }, { id: "v45_to_v44", from: "v45", to: "v44" },
    { id: "v45_to_v46", from: "v45", to: "v46" }, { id: "v46_to_v45", from: "v46", to: "v45" },
    { id: "v46_to_v47", from: "v46", to: "v47" }, { id: "v47_to_v46", from: "v47", to: "v46" },
    
    // Right corridor (bottom section)
    { id: "v3_to_v5", from: "v3", to: "v5" }, { id: "v5_to_v3", from: "v5", to: "v3" },
    { id: "v4_to_v48", from: "v4", to: "v48" }, { id: "v48_to_v4", from: "v48", to: "v4" },
    { id: "v48_to_v50", from: "v48", to: "v50" }, { id: "v50_to_v48", from: "v50", to: "v48" },
    { id: "v50_to_v2", from: "v50", to: "v2" }, { id: "v2_to_v50", from: "v2", to: "v50" },
    
    // Left side (middle section - rooms)
    { id: "v10_to_v54", from: "v10", to: "v54" }, { id: "v54_to_v10", from: "v54", to: "v10" },
    { id: "v10_to_v8", from: "v10", to: "v8" }, { id: "v8_to_v10", from: "v8", to: "v10" },
    { id: "v54_to_v53", from: "v54", to: "v53" }, { id: "v53_to_v54", from: "v53", to: "v54" },
    { id: "v53_to_v16", from: "v53", to: "v16" }, { id: "v16_to_v53", from: "v16", to: "v53" },
    { id: "v16_to_v17", from: "v16", to: "v17" }, { id: "v17_to_v16", from: "v17", to: "v16" },
    
    // Right side (middle section - rooms)
    { id: "v8_to_v11", from: "v8", to: "v11" }, { id: "v11_to_v8", from: "v11", to: "v8" },
    { id: "v11_to_v51", from: "v11", to: "v51" }, { id: "v51_to_v11", from: "v51", to: "v11" },
    { id: "v51_to_v52", from: "v51", to: "v52" }, { id: "v52_to_v51", from: "v52", to: "v51" },
    
    // Middle horizontal corridor
    { id: "v17_to_v35", from: "v17", to: "v35" }, { id: "v35_to_v17", from: "v35", to: "v17" },
    { id: "v35_to_v13", from: "v35", to: "v13" }, { id: "v13_to_v35", from: "v13", to: "v35" },
    { id: "v13_to_v12", from: "v13", to: "v12" }, { id: "v12_to_v13", from: "v12", to: "v13" },
    { id: "v12_to_v37", from: "v12", to: "v37" }, { id: "v37_to_v12", from: "v37", to: "v12" },
    { id: "v37_to_v36", from: "v37", to: "v36" }, { id: "v36_to_v37", from: "v36", to: "v37" },
    { id: "v35_to_v15", from: "v35", to: "v15" }, { id: "v15_to_v35", from: "v15", to: "v35" },
    
    // Left rooms (horizontal)
    { id: "v17_to_v14", from: "v17", to: "v14" }, { id: "v14_to_v17", from: "v14", to: "v17" },
    { id: "v14_to_v18", from: "v14", to: "v18" }, { id: "v18_to_v14", from: "v18", to: "v14" },
    { id: "v18_to_v19", from: "v18", to: "v19" }, { id: "v19_to_v18", from: "v19", to: "v18" },
    { id: "v19_to_v21", from: "v19", to: "v21" }, { id: "v21_to_v19", from: "v21", to: "v19" },
    { id: "v21_to_v20", from: "v21", to: "v20" }, { id: "v20_to_v21", from: "v20", to: "v21" },
    { id: "v20_to_v22", from: "v20", to: "v22" }, { id: "v22_to_v20", from: "v22", to: "v20" },
    { id: "v22_to_v26", from: "v22", to: "v26" }, { id: "v26_to_v22", from: "v26", to: "v22" },
    { id: "v26_to_v24", from: "v26", to: "v24" }, { id: "v24_to_v26", from: "v24", to: "v26" },
    { id: "v24_to_v23", from: "v24", to: "v23" }, { id: "v23_to_v24", from: "v23", to: "v24" },
    { id: "v24_to_v25", from: "v24", to: "v25" }, { id: "v25_to_v24", from: "v25", to: "v24" },
    { id: "v26_to_v27", from: "v26", to: "v27" }, { id: "v27_to_v26", from: "v27", to: "v26" },
    
    // Top section
    { id: "v28_to_v32", from: "v28", to: "v32" }, { id: "v32_to_v28", from: "v32", to: "v28" },
    { id: "v29_to_v31", from: "v29", to: "v31" }, { id: "v31_to_v29", from: "v31", to: "v29" },
    { id: "v29_to_v32", from: "v29", to: "v32" }, { id: "v32_to_v29", from: "v32", to: "v29" },
    { id: "v30_to_v28", from: "v30", to: "v28" }, { id: "v28_to_v30", from: "v28", to: "v30" },
    { id: "v32_to_v31", from: "v32", to: "v31" }, { id: "v31_to_v32", from: "v31", to: "v32" },
    { id: "v32_to_v29", from: "v32", to: "v29" }, { id: "v29_to_v32", from: "v29", to: "v32" },
    { id: "v32_to_v31", from: "v32", to: "v31" }, { id: "v31_to_v32", from: "v31", to: "v32" },
    { id: "v28_to_v30", from: "v28", to: "v30" }, { id: "v30_to_v28", from: "v30", to: "v28" }
  ]
};