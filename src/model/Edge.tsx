import {round2} from "../components/TopologyPanel";

export class Edge {
    name: string;
    id: string;
    source: string;
    target: string;
    weight: number;
    type: string;
    label: string;
    failed_weight: number;
    classes: string[];
    source_operationId: string;
    target_operationId: string;
    cy: any;

    constructor() {
        this.failed_weight = 0;
        this.classes = [];
    }

    addClass(className: string) {
        this.classes.push(className);
    }

    // used by Trace.tsx
    join(cy) {
        return cy.add({
            data: {
                id: this.id,
                label: this.label,
                edgeType: this.type,
                source: this.source,
                target: this.target,
                weight: this.weight,
                classes: this.classes,
            }
        });
    }

    getLabel() {
        return "";
    }

    static create(serie: any, panel: any) {
        let edge = new Edge();
        edge.cy = panel.cy;
        edge.source = serie.labels.client;
        edge.target = serie.labels.server;
        edge.weight = round2(serie.values.get(0));
        edge.failed_weight = 0;
        edge.label = edge.getLabel();
        return edge;
    }

    connect_service2service() {
        this.cy.add({
            data: {
                id: this.id,
                label: this.label,
                // edgeType: this.type,
                source: this.source ,
                target: this.target ,
                //source: this.source + "-out",
                //target: this.target + "-in",


                weight: this.weight,
                failed_weight: this.failed_weight,

            }
        }).addClass('service-edge');



    }
}


