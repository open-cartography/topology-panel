import {colors} from "./colors";
import {Service} from "../model/Service";

export function create_donut_gauge(service: Service): string {
    const successCount = 5;
    const errorCount = 5;
    const total = successCount + errorCount;
    console.log("service=", service)
    const size = 75;
    const lineWidth = 10;
    const radius = size / 2 - lineWidth / 2;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const gaugeStartAngle = -Math.PI - Math.PI / 2;
    // start at 12:00
    const gaugeEndAngle = Math.PI - Math.PI / 2  ;

    // Draw success arc
    const successRatio = successCount / total;
    const successAngle = successRatio * (gaugeEndAngle - gaugeStartAngle);
    // ctx.beginPath();
    // ctx.arc(size / 2, size / 2, radius, gaugeStartAngle, gaugeStartAngle + successAngle);
    // ctx.strokeStyle = colors["UNSET"];
    // ctx.lineWidth = lineWidth;
    // ctx.stroke();

    // Draw error arc
    const errorRatio = errorCount / total;
    const errorAngle = errorRatio * (gaugeEndAngle - gaugeStartAngle);
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, radius, gaugeStartAngle + successAngle, gaugeStartAngle + successAngle + errorAngle);
    ctx.strokeStyle = colors["ERROR"];
    ctx.lineWidth = lineWidth;
    ctx.stroke();


    return canvas.toDataURL();
}
