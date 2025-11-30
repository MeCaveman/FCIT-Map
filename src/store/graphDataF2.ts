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

// F2 Floor Graph Data - Similar structure to F1 but with F2-specific vertices and paths
export const graphDataF2: GraphData = {
  vertices: [
    { id: "f2_v1", objectName: "xxxxxxx", cx: 723.939, cy: 1054.9 },
    { id: "f2_v2", objectName: null, cx: 796.839, cy: 1097.14 },
    { id: "f2_v3", objectName: null, cx: 723.939, cy: 988.078 },
    { id: "f2_v4", objectName: null, cx: 579.941, cy: 988.078 },
    { id: "f2_v5", objectName: null, cx: 816.986, cy: 988.078 },
    { id: "f2_v6", objectName: null, cx: 723.939, cy: 926.299 },
    { id: "f2_v7", objectName: null, cx: 723.939, cy: 852.963 },
    { id: "f2_v8", objectName: "Main Hallway", cx: 723.939, cy: 765.128 },
    { id: "f2_v9", objectName: null, cx: 723.939, cy: 684.647 },
    { id: "f2_v10", objectName: "Entrance 2", cx: 584.724, cy: 767.229 },
    { id: "f2_v11", objectName: "Entrance 3", cx: 872.489, cy: 767.229 },
    { id: "f2_v12", objectName: null, cx: 656.32, cy: 545.967 },
    { id: "f2_v13", objectName: null, cx: 613.619, cy: 546.967 },
    { id: "f2_v14", objectName: null, cx: 502.563, cy: 546.967 },
    { id: "f2_v15", objectName: null, cx: 591.506, cy: 501.827 },
    { id: "f2_v16", objectName: null, cx: 584.724, cy: 569.419 },
    { id: "f2_v17", objectName: null, cx: 584.724, cy: 546.967 },
    { id: "f2_v18", objectName: null, cx: 465.744, cy: 546.967 },
    { id: "f2_v19", objectName: null, cx: 388.995, cy: 546.967 },
    { id: "f2_v20", objectName: null, cx: 329.359, cy: 546.967 },
    { id: "f2_v21", objectName: null, cx: 364.622, cy: 546.967 },
    { id: "f2_v22", objectName: null, cx: 277.794, cy: 546.967 },
    { id: "f2_v23", objectName: null, cx: 149.563, cy: 546.749 },
    { id: "f2_v24", objectName: null, cx: 199.855, cy: 546.967 },
    { id: "f2_v25", objectName: "Bathroom 3", cx: 199.855, cy: 596.343 },
    { id: "f2_v26", objectName: null, cx: 224.706, cy: 546.967 },
    { id: "f2_v27", objectName: null, cx: 224.706, cy: 596.343 },
    { id: "f2_v28", objectName: "Main Hall", cx: 723.939, cy: 316.798 },
    { id: "f2_v29", objectName: null, cx: 565.94, cy: 316.798 },
    { id: "f2_v30", objectName: null, cx: 845.168, cy: 316.798 },
    { id: "f2_v31", objectName: "Bathroom 4", cx: 603.302, cy: 222.873 },
    { id: "f2_v32", objectName: null, cx: 603.302, cy: 316.798 },
    { id: "f2_v33", objectName: null, cx: 721.939, cy: 222.873 },
    { id: "f2_v34", objectName: null, cx: 723.939, cy: 126.399 },
    { id: "f2_v35", objectName: null, cx: 591.506, cy: 546.967 },
    { id: "f2_v36", objectName: "Bathroom 2", cx: 791.498, cy: 545.967 },
    { id: "f2_v37", objectName: null, cx: 723.939, cy: 545.967 },
    { id: "f2_v38", objectName: null, cx: 527.173, cy: 988.078 },
    { id: "f2_v39", objectName: null, cx: 495.842, cy: 988.078 },
    { id: "f2_v40", objectName: null, cx: 404.157, cy: 988.078 },
    { id: "f2_v41", objectName: null, cx: 383.709, cy: 988.078 },
    { id: "f2_v42", objectName: null, cx: 256.405, cy: 988.078 },
    { id: "f2_v43", objectName: null, cx: 140.315, cy: 990.067 },
    { id: "f2_v44", objectName: null, cx: 205.035, cy: 990.067 },
    { id: "f2_v45", objectName: "Bathroom 1", cx: 205.035, cy: 1036.46 },
    { id: "f2_v46", objectName: null, cx: 178.184, cy: 1036.46 },
    { id: "f2_v47", objectName: null, cx: 177.413, cy: 990.067 },
    { id: "f2_v48", objectName: null, cx: 579.941, cy: 1034.51 },
    { id: "f2_v50", objectName: null, cx: 579.941, cy: 1086.92 },
    { id: "f2_v51", objectName: null, cx: 872.489, cy: 736.235 },
    { id: "f2_v52", objectName: null, cx: 872.489, cy: 799.256 },
    { id: "f2_v53", objectName: null, cx: 575.977, cy: 799.256 },
    { id: "f2_v54", objectName: null, cx: 575.977, cy: 734.168 },
    { id: "f2_v55", objectName: null, cx: 723.939, cy: 455.938 },
    { id: "f2_v56", objectName: null, cx: 721.939, cy: 193.458 },
    { id: "f2_v57", objectName: "Lab Hallway 1", cx: 631.334, cy: 988.918 },
  ],
  edges: [
    // Vertical corridor (center spine)
    { id: "f2_v1_to_v3", from: "f2_v1", to: "f2_v3" }, { id: "f2_v3_to_v1", from: "f2_v3", to: "f2_v1" },
    { id: "f2_v3_to_v6", from: "f2_v3", to: "f2_v6" }, { id: "f2_v6_to_v3", from: "f2_v6", to: "f2_v3" },
    { id: "f2_v6_to_v7", from: "f2_v6", to: "f2_v7" }, { id: "f2_v7_to_v6", from: "f2_v7", to: "f2_v6" },
    { id: "f2_v7_to_v8", from: "f2_v7", to: "f2_v8" }, { id: "f2_v8_to_v7", from: "f2_v8", to: "f2_v7" },
    { id: "f2_v8_to_v9", from: "f2_v8", to: "f2_v9" }, { id: "f2_v9_to_v8", from: "f2_v9", to: "f2_v8" },
    { id: "f2_v9_to_v37", from: "f2_v9", to: "f2_v37" }, { id: "f2_v37_to_v9", from: "f2_v37", to: "f2_v9" },
    { id: "f2_v37_to_v55", from: "f2_v37", to: "f2_v55" }, { id: "f2_v55_to_v37", from: "f2_v55", to: "f2_v37" },
    { id: "f2_v55_to_v28", from: "f2_v55", to: "f2_v28" }, { id: "f2_v28_to_v55", from: "f2_v28", to: "f2_v55" },
    { id: "f2_v28_to_v56", from: "f2_v28", to: "f2_v56" }, { id: "f2_v56_to_v28", from: "f2_v56", to: "f2_v28" },
    { id: "f2_v56_to_v33", from: "f2_v56", to: "f2_v33" }, { id: "f2_v33_to_v56", from: "f2_v33", to: "f2_v56" },
    { id: "f2_v33_to_v34", from: "f2_v33", to: "f2_v34" }, { id: "f2_v34_to_v33", from: "f2_v34", to: "f2_v33" },
    
    // Left corridor (bottom section)
    { id: "f2_v3_to_v57", from: "f2_v3", to: "f2_v57" }, { id: "f2_v57_to_v3", from: "f2_v57", to: "f2_v3" },
    { id: "f2_v57_to_v4", from: "f2_v57", to: "f2_v4" }, { id: "f2_v4_to_v57", from: "f2_v4", to: "f2_v57" },
    { id: "f2_v4_to_v38", from: "f2_v4", to: "f2_v38" }, { id: "f2_v38_to_v4", from: "f2_v38", to: "f2_v4" },
    { id: "f2_v38_to_v39", from: "f2_v38", to: "f2_v39" }, { id: "f2_v39_to_v38", from: "f2_v39", to: "f2_v38" },
    { id: "f2_v39_to_v40", from: "f2_v39", to: "f2_v40" }, { id: "f2_v40_to_v39", from: "f2_v40", to: "f2_v39" },
    { id: "f2_v40_to_v41", from: "f2_v40", to: "f2_v41" }, { id: "f2_v41_to_v40", from: "f2_v41", to: "f2_v40" },
    { id: "f2_v41_to_v42", from: "f2_v41", to: "f2_v42" }, { id: "f2_v42_to_v41", from: "f2_v42", to: "f2_v41" },
    { id: "f2_v42_to_v44", from: "f2_v42", to: "f2_v44" }, { id: "f2_v44_to_v42", from: "f2_v44", to: "f2_v42" },
    { id: "f2_v44_to_v47", from: "f2_v44", to: "f2_v47" }, { id: "f2_v47_to_v44", from: "f2_v47", to: "f2_v44" },
    { id: "f2_v47_to_v43", from: "f2_v47", to: "f2_v43" }, { id: "f2_v43_to_v47", from: "f2_v43", to: "f2_v47" },
    
    // Left branch down
    { id: "f2_v44_to_v45", from: "f2_v44", to: "f2_v45" }, { id: "f2_v45_to_v44", from: "f2_v45", to: "f2_v44" },
    { id: "f2_v45_to_v46", from: "f2_v45", to: "f2_v46" }, { id: "f2_v46_to_v45", from: "f2_v46", to: "f2_v45" },
    { id: "f2_v46_to_v47", from: "f2_v46", to: "f2_v47" }, { id: "f2_v47_to_v46", from: "f2_v47", to: "f2_v46" },
    
    // Right corridor (bottom section)
    { id: "f2_v3_to_v5", from: "f2_v3", to: "f2_v5" }, { id: "f2_v5_to_v3", from: "f2_v5", to: "f2_v3" },
    { id: "f2_v4_to_v48", from: "f2_v4", to: "f2_v48" }, { id: "f2_v48_to_v4", from: "f2_v48", to: "f2_v4" },
    { id: "f2_v48_to_v50", from: "f2_v48", to: "f2_v50" }, { id: "f2_v50_to_v48", from: "f2_v50", to: "f2_v48" },
    { id: "f2_v50_to_v2", from: "f2_v50", to: "f2_v2" }, { id: "f2_v2_to_v50", from: "f2_v2", to: "f2_v50" },
    
    // Left side (middle section - rooms)
    { id: "f2_v10_to_v54", from: "f2_v10", to: "f2_v54" }, { id: "f2_v54_to_v10", from: "f2_v54", to: "f2_v10" },
    { id: "f2_v10_to_v8", from: "f2_v10", to: "f2_v8" }, { id: "f2_v8_to_v10", from: "f2_v8", to: "f2_v10" },
    { id: "f2_v54_to_v53", from: "f2_v54", to: "f2_v53" }, { id: "f2_v53_to_v54", from: "f2_v53", to: "f2_v54" },
    { id: "f2_v53_to_v16", from: "f2_v53", to: "f2_v16" }, { id: "f2_v16_to_v53", from: "f2_v16", to: "f2_v53" },
    { id: "f2_v16_to_v17", from: "f2_v16", to: "f2_v17" }, { id: "f2_v17_to_v16", from: "f2_v17", to: "f2_v16" },
    
    // Right side (middle section - rooms)
    { id: "f2_v8_to_v11", from: "f2_v8", to: "f2_v11" }, { id: "f2_v11_to_v8", from: "f2_v11", to: "f2_v8" },
    { id: "f2_v11_to_v51", from: "f2_v11", to: "f2_v51" }, { id: "f2_v51_to_v11", from: "f2_v51", to: "f2_v11" },
    { id: "f2_v51_to_v52", from: "f2_v51", to: "f2_v52" }, { id: "f2_v52_to_v51", from: "f2_v52", to: "f2_v51" },
    
    // Middle horizontal corridor
    { id: "f2_v17_to_v35", from: "f2_v17", to: "f2_v35" }, { id: "f2_v35_to_v17", from: "f2_v35", to: "f2_v17" },
    { id: "f2_v35_to_v13", from: "f2_v35", to: "f2_v13" }, { id: "f2_v13_to_v35", from: "f2_v13", to: "f2_v35" },
    { id: "f2_v13_to_v12", from: "f2_v13", to: "f2_v12" }, { id: "f2_v12_to_v13", from: "f2_v12", to: "f2_v13" },
    { id: "f2_v12_to_v37", from: "f2_v12", to: "f2_v37" }, { id: "f2_v37_to_v12", from: "f2_v37", to: "f2_v12" },
    { id: "f2_v37_to_v36", from: "f2_v37", to: "f2_v36" }, { id: "f2_v36_to_v37", from: "f2_v36", to: "f2_v37" },
    { id: "f2_v35_to_v15", from: "f2_v35", to: "f2_v15" }, { id: "f2_v15_to_v35", from: "f2_v15", to: "f2_v35" },
    
    // Left rooms (horizontal)
    { id: "f2_v17_to_v14", from: "f2_v17", to: "f2_v14" }, { id: "f2_v14_to_v17", from: "f2_v14", to: "f2_v17" },
    { id: "f2_v14_to_v18", from: "f2_v14", to: "f2_v18" }, { id: "f2_v18_to_v14", from: "f2_v18", to: "f2_v14" },
    { id: "f2_v18_to_v19", from: "f2_v18", to: "f2_v19" }, { id: "f2_v19_to_v18", from: "f2_v19", to: "f2_v18" },
    { id: "f2_v19_to_v21", from: "f2_v19", to: "f2_v21" }, { id: "f2_v21_to_v19", from: "f2_v21", to: "f2_v19" },
    { id: "f2_v21_to_v20", from: "f2_v21", to: "f2_v20" }, { id: "f2_v20_to_v21", from: "f2_v20", to: "f2_v21" },
    { id: "f2_v20_to_v22", from: "f2_v20", to: "f2_v22" }, { id: "f2_v22_to_v20", from: "f2_v22", to: "f2_v20" },
    { id: "f2_v22_to_v26", from: "f2_v22", to: "f2_v26" }, { id: "f2_v26_to_v22", from: "f2_v26", to: "f2_v22" },
    { id: "f2_v26_to_v24", from: "f2_v26", to: "f2_v24" }, { id: "f2_v24_to_v26", from: "f2_v24", to: "f2_v26" },
    { id: "f2_v24_to_v23", from: "f2_v24", to: "f2_v23" }, { id: "f2_v23_to_v24", from: "f2_v23", to: "f2_v24" },
    { id: "f2_v24_to_v25", from: "f2_v24", to: "f2_v25" }, { id: "f2_v25_to_v24", from: "f2_v25", to: "f2_v24" },
    { id: "f2_v26_to_v27", from: "f2_v26", to: "f2_v27" }, { id: "f2_v27_to_v26", from: "f2_v27", to: "f2_v26" },
    
    // Top section
    { id: "f2_v28_to_v32", from: "f2_v28", to: "f2_v32" }, { id: "f2_v32_to_v28", from: "f2_v32", to: "f2_v28" },
    { id: "f2_v29_to_v31", from: "f2_v29", to: "f2_v31" }, { id: "f2_v31_to_v29", from: "f2_v31", to: "f2_v29" },
    { id: "f2_v29_to_v32", from: "f2_v29", to: "f2_v32" }, { id: "f2_v32_to_v29", from: "f2_v32", to: "f2_v29" },
    { id: "f2_v30_to_v28", from: "f2_v30", to: "f2_v28" }, { id: "f2_v28_to_v30", from: "f2_v28", to: "f2_v30" },
    { id: "f2_v32_to_v31", from: "f2_v32", to: "f2_v31" }, { id: "f2_v31_to_v32", from: "f2_v31", to: "f2_v32" },
    { id: "f2_v32_to_v29", from: "f2_v32", to: "f2_v29" }, { id: "f2_v29_to_v32", from: "f2_v29", to: "f2_v32" },
    { id: "f2_v32_to_v31", from: "f2_v32", to: "f2_v31" }, { id: "f2_v31_to_v32", from: "f2_v31", to: "f2_v32" },
    { id: "f2_v28_to_v30", from: "f2_v28", to: "f2_v30" }, { id: "f2_v30_to_v28", from: "f2_v30", to: "f2_v28" }
  ]
};
