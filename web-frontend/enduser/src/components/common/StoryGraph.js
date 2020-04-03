import React, { useState, useEffect } from 'react';
import StoryService from '../../services/story.service';
import Graph from "react-graph-vis";


let options = { 
    physics: { enabled: true, stabilization: { iterations: 5000 } }, 
    clickToUse: true,
    layout: { hierarchical: true }, 
    nodes : { shape : 'square' }, 
    autoResize: false,
    height: '500px', 
    physics: {
        forceAtlas2Based: {
            gravitationalConstant: -26,
            centralGravity: 0.005,
            springLength: 230,
            springConstant: 0.18,
            avoidOverlap: 1.5
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        timestep: 0.35,
        stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 25
        }
    },
    edges: { 
        smooth: false, 
        color: '#000000', 
        width: 0.5, 
        length: 400,
        arrows: { 
            to: { enabled: true, scaleFactor: 0.5 } 
        } }, 
    interaction: { hover: true, keyboard :true, navigationButtons: true, tooltipDelay: 150 } 
};

const StoryGraph = (props) => {
    const { nodes, edges, setCurrentScreen } = props;

    const graph = { nodes, edges };

    const events = {
        select: function(event) {
          var { nodes, edges } = event;
        },
        selectNode: function(event){
            var { nodes, edges } = event;
            setCurrentScreen(nodes[0]);
        }
    };

    return (
        <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
        />
    );
};


export default StoryGraph;
