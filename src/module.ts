import { PanelPlugin } from '@grafana/data';
import { PanelOptions } from './types';
import { TopologyPanel } from './components/TopologyPanel';

export const plugin = new PanelPlugin<PanelOptions>(TopologyPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'text',
      name: 'Graph option',
      description: 'Service Topology, Generic Graph Query, Pipelines',
      defaultValue: 'Service Topology',
    })
    .addTextInput({
      path: 'graphAsJson',
      name: 'Graph As Json',
      description: 'Offline presets for graph',
      defaultValue: '',
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
