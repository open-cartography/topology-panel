import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { TopologyPanel } from './components/TopologyPanel';

export const plugin = new PanelPlugin<SimpleOptions>(TopologyPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'text',
      name: 'Graph option',
      description: 'Service Topology, Generic Graph Query, Pipelines',
      defaultValue: 'Service Topology',
    })
    .addRadio({
      path: 'graphType',
      defaultValue: 'service_topology',
      name: 'Graph Type',
      settings: {
        options: [
          {
            value: 'service_topology',
            label: 'service_topology',
          },
          {
            value: 'pipelines',
            label: 'pipelines',
          },
          {
            value: 'neo4j',
            label: 'neo4j',
          },
        ],
      },
    });
});
