if (window.webgui == undefined) {
  webgui = {};
}

if (webgui.guidata == undefined) {
  // for an description of the data format, see box_json_format.js
  webgui.guidata = {boxes:[], connections:{}};
}

if (webgui.draw == undefined) {
  webgui.draw = {};
}

webgui.draw.boxes = function() {
  d3.select("#webgui_canvas").selectAll(".box").data(webgui.guidata.boxes).enter()
    .append("div")
    .classed("box", true)
    .text("hello");
}