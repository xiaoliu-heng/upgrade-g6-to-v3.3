import React from 'react';
import G6, { Minimap, Grid, Graph } from '@antv/G6';

const minimap = new Minimap({
  //... configurations
})
const grid = new Grid({
  //... configurations
})
const graph = new Graph({
  //... other configurations
  plugins: [minimap, grid]
});

let node;

const group = node.get('group')
const label = group.findByClassName('node-label')
