import constraints from "./constraints";

export let layoutOptions = {
    name: 'fcose',



    // 'draft', 'default' or 'proof'
    // - "draft" only applies spectral layout
    // - "default" improves the quality with incremental layout (fast cooling rate)
    // - "proof" improves the quality with incremental layout (slow cooling rate)
    quality: "default",
    // Use random node positions at beginning of layout
    // if this is set to false, then quality option must be "proof"
    randomize: true,
    // Whether or not to animate the layout
    animate: true,
    // Duration of animation in ms, if enabled
    animationDuration: 100,
    // Easing of animation, if enabled
    animationEasing: undefined,
    // Fit the viewport to the repositioned nodes
    fit: true,
    // Padding around layout
    padding: 15,
    // Whether to include labels in node dimensions. Valid in "proof" quality
    nodeDimensionsIncludeLabels: false,
    // Whether or not simple nodes (non-compound nodes) are of uniform dimensions
    uniformNodeDimensions: false,
    // Whether to pack disconnected components - cytoscape-layout-utilities extension should be registered and initialized
    packComponents: false,
    // Layout step - all, transformed, enforced, cose - for debug purpose only
    // step: "all",

    /* spectral layout options */

    // False for random, true for greedy sampling
    samplingType: true,
    // Sample size to construct distance matrix
    sampleSize: 25,
    // Separation amount between nodes
    nodeSeparation: 40,
    // Power iteration tolerance
    piTol: 0.0000001,

    /* incremental layout options */

    // Node repulsion (non overlapping) multiplier
    //nodeRepulsion: node => 4000,
    nodeRepulsion: 4000,
    // Ideal edge (non nested) length
    idealEdgeLength: 10,
    // Divisor to compute edge forces
    edgeElasticity: 1,
    //edgeElasticity: 1, // Devrim note: Change works for good
    // Nesting factor (multiplier) to compute ideal edge length for nested edges
    nestingFactor: true,
    // Maximum number of iterations to perform - this is a suggested value and might be adjusted by the algorithm as required
    numIter: 2500,
    // For enabling tiling
    tile: false,
    // The comparison function to be used while sorting nodes during tiling operation.
    // Takes the ids of 2 nodes that will be compared as a parameter and the default tiling operation is performed when this option is not set.
    // It works similar to ``compareFunction`` parameter of ``Array.prototype.sort()``
    // If node1 is less then node2 by some ordering criterion ``tilingCompareBy(nodeId1, nodeId2)`` must return a negative value
    // If node1 is greater then node2 by some ordering criterion ``tilingCompareBy(nodeId1, nodeId2)`` must return a positive value
    // If node1 is equal to node2 by some ordering criterion ``tilingCompareBy(nodeId1, nodeId2)`` must return 0
    tilingCompareBy: undefined,
    // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
    tilingPaddingVertical: 10,
    // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
    tilingPaddingHorizontal: 10,


    // Gravity force (constant)
    gravity: 2.25,
    // Gravity range (constant) for compounds
    gravityRangeCompound: 12.5,
    // Gravity force (constant) for compounds
    gravityCompound: 1.5,
    // Gravity range (constant)
    gravityRange: 3.8,
    // Initial cooling factor for incremental layout
    initialEnergyOnIncremental: 0.1,

    /* constraint options */

    // Fix desired nodes to predefined positions
    // [{nodeId: 'n1', position: {x: 100, y: 200}}, {...}]
    fixedNodeConstraint: undefined,
    // Align desired nodes in vertical/horizontal direction
    // {vertical: [['n1', 'n2'], [...]], horizontal: [['n2', 'n4'], [...]]}
    alignmentConstraint: undefined,
    // Place two nodes relatively in vertical/horizontal direction
    // [{top: 'n1', bottom: 'n2', gap: 100}, {left: 'n3', right: 'n4', gap: 75}, {...}]
    relativePlacementConstraint: undefined,


    /* layout event callbacks */
    ready: () => {}, // on layoutready
    stop: () => {}, // on layoutstop

};


export const addVallignConstraint = ( valignArray ) =>{

    if(layoutOptions.alignmentConstraint){
        if(layoutOptions.alignmentConstraint.vertical){
            layoutOptions.alignmentConstraint.vertical.push(valignArray);
        }
        else{
            layoutOptions.alignmentConstraint.vertical = [valignArray];
        }
    }
    else{
        layoutOptions.alignmentConstraint = {};
        layoutOptions.alignmentConstraint.vertical = [valignArray];
    }

};


function relative_placements() {
    if (layoutOptions.relativePlacementConstraint === undefined) {
        layoutOptions.relativePlacementConstraint = [];
    }
    return layoutOptions.relativePlacementConstraint;
}

export const place_left2right = (node1, node2) => {
    let relativePlacementConstraint = relative_placements();

    if (relativePlacementConstraint) {
        relativePlacementConstraint.push({left: node1, right: node2, gap: 10});
    } else {
        relativePlacementConstraint = [{left: node1, right: node2, gap: 10}];
    }
    console.log("relative left right added nodes=", node1, ",", node2, ", relativePlacementConstraint=", relativePlacementConstraint);
};

function getAllignmentConstraints() {
    if (layoutOptions.alignmentConstraint === undefined) {
        layoutOptions.alignmentConstraint = {
            horizontal: undefined,
            vertical: undefined
        };
    }
    return layoutOptions.alignmentConstraint;
}

export function horizontalConstraint(horizontal: any) {
    if (getAllignmentConstraints().horizontal === undefined) {
        getAllignmentConstraints().horizontal = horizontal;
    } else {
        getAllignmentConstraints().horizontal.push(horizontal);
    }
}

export const align_horizontal = (alignArray) => {

    if (layoutOptions.alignmentConstraint) {
        if (layoutOptions.alignmentConstraint.horizontal) {
            // check if the constraint is already added
            layoutOptions.alignmentConstraint.horizontal.push(alignArray);
        } else {
            layoutOptions.alignmentConstraint.horizontal = [alignArray];
        }
    } else {
        layoutOptions.alignmentConstraint = {};
        layoutOptions.alignmentConstraint.horizontal = [alignArray];
    }


};


export const read_file_constraints = () => {


    if (constraints.relativePlacementConstraint) {
        let relativePlacementConstraint;
        relativePlacementConstraint = relative_placements();
        // constraints.relativePlacementConstraint add to getRelativePlacementConstraints() array
        constraints.relativePlacementConstraint.forEach((constraint) => {
            console.log("read_file_constraints: constraint=", constraint);
            relativePlacementConstraint.push(constraint);
        });
    }


    // if (constraints.fixedNodeConstraint) {
    //     layoutOptions.fixedNodeConstraint = constraints.fixedNodeConstraint;
    // }
    if (constraints.alignmentConstraint) {

        if (constraints.alignmentConstraint.horizontal) {
            horizontalConstraint(constraints.alignmentConstraint.horizontal);
        }

    }
};
