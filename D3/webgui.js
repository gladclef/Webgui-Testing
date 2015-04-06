/**
 * Includes all the webgui objects, such as the canvas objects.
 * Also many convenience methods.
 */

if (window.webgui == undefined) {
  webgui = {};
}

/*******************************************************************************
 ******************************* O B J E C T S *********************************
 ******************************************************************************/

webgui.canvas = function() {
  return d3.select("#webgui_canvas");
};
webgui.sidebar = function() {
  "use strict";
  return webgui.canvas().select(".sidebar").data([0]).enter()
    .append("div")
    .classed("sidebar", true)
    .style({
      width: (Math.max(100, webgui.width() / 10) + "px"),
      height: (webgui.height() + "px")
    });
};
webgui.box_canvas = function() {
  "use strict";
  return webgui.canvas().select(".box_canvas").data([0]).enter()
    .append("div")
    .classed("box_canvas", true)
    .style({
      width: (webgui.width() - $(webgui.sidebar()[0]).width() + "px"),
      height: (webgui.height() + "px")
    });
};

/*******************************************************************************
 ***************** C O N V E N I E N C E   M E T H O D S ***********************
 ******************************************************************************/

webgui.width = function() {
  return $(webgui.canvas[0]).width();
};
webgui.height = function() {
  return $(webgui.canvas[0]).height();
};