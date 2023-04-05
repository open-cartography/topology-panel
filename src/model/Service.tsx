import {round2} from "../components/TopologyPanel";
import {DataFrame} from "@grafana/data";
import { create_donut_gauge} from "../components/donut";
import {colors} from "../components/colors";
import {createSVGDonutGauge, createSVGDonutGaugeDataURL, createSVGDonutGaugeDataURL2} from "../components/D3DonutGauge";
import {scaledSize} from "../components/style";

function direction(span_kind: any) {
    if (span_kind === "SPAN_KIND_SERVER") {
        return "in";
    } else if (span_kind === "SPAN_KIND_CLIENT") {
        return "out";
    } else if (span_kind === "SPAN_KIND_INTERNAL") {
        return "internal";
    }
    return "unknown";
}

export class Service {
    name: string;
    id: string;
    weight: number;
    data_series: DataFrame[];
    cy: any;

    // constructor(serie: any) {
    //     this.name = serie.fields[1].labels.service_name;
    //     this.id = this.name;
    //     this.weight = round2(serie.fields[1].values.get(0));
    // }
    constructor(service_name: any, weight: any) {
        this.name = service_name;
        this.id = service_name;
        this.weight = weight;

    }


    add_service_compound() {
        return this.cy.add({
            data: {
                id: this.id + "-compound",
                label: this.name,
                service: this.id,
                weight: this.weight
            }
        }).addClass("service-compound");


    }

    add_service_node() {
        this.cy.add({
            data: {
                id: this.id,
                label: this.weight.toString(),
                parent: this.id + "-compound",
                weight: this.weight
            }
        }).addClass("service-node");

    }


    add_hub_nodes() {
        this.data_series.filter((queryResults: any) => queryResults.refId === "spanmetrics_calls_total_span_kind"
            && queryResults.fields[1].labels.service_name === this.id)
            .forEach((serie: any) => {
                // get the span_kind
                let span_kind = serie.fields[1].labels.span_kind;
                //console.log("-->spanmetrics_calls_total_span_kind query returned", serie, "span_kind=", span_kind);
                this.add_hub_node(serie, direction(span_kind));
            });


    }

    add_hub_node(serie, direction: string) {

        // find the related serie in this.props.data.series.filter((queryResults: any) => queryResults.refId === "spanmetrics_calls_total_span_kind") if exists and get value as weight
        // if not exists set weight to 0 {service_name="frontend", span_kind="SPAN_KIND_INTERNAL"}

        if (serie.length !== 1) {
            //console.log("spanmetrics_calls_total_span_kind query returned " + serie.length + " result=", serie);
            return;
        }
        let weight = round2(serie.fields[1].values.buffer[0]);

        // hub node
        this.cy.add({
            data: {
                id: this.id + "-" + direction,
                label: direction,
                parent: this.id + "-compound",
                weight: weight,
                service: this.id,
            }
        }).addClass("hub-node");


        //connect to service node
        this.cy.add({
            data: {
                id: this.id + "-" + direction + "-edge",
                label: "",
                source: direction === "in" ? this.id + "-" + direction : this.id,
                target: direction === "in" ? this.id : this.id + "-" + direction,
                service: this.id,
                parent: this.id + "-compound",

            }
        }).addClass("service2hubs_edges");



    }

    set_series(data_series: DataFrame[]) {
        this.data_series = data_series;
    }

    add_donut() {
        //TODO: extract error sum and construct donut accordingly

        const imageUrl = createSVGDonutGaugeDataURL(this,scaledSize(this.weight));
        const backgroundImage = `url(${imageUrl})`;
        const node = this.cy.getElementById(this.id);
        node.style('background-image', backgroundImage);

    }

    add_name_tippy() {
        let node = this.cy.getElementById(this.id);
        console.log("add_name_tippy", node)
        this.attachTippy(node);


    }

    private attachTippy(node) {
        let popper = node.popper({
            content: () => {
                let div = document.createElement('div');
                let name = node.data('id');
                // name background color[service] font white rounded rectangle
                div.innerHTML = `<div class="name-tippy" style="background-color: ${colors[name]}; color: white; padding: 4px 8px; border-radius: 8px;">${name}</div>`;


                document.body.appendChild(div);

                return div;
            }
        });

        let update = () => {
            popper.update();
        };

        node.on('position', update);

        this.cy.on('pan zoom resize', update);

        // TODO: tippies not destroyed on panel edit, full refresh or dashboard change and sizes calculated according to node size best in style.ts or style.css

    }
}

