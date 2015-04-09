/**
 * Includes all the webgui objects, such as the canvas objects.
 * Also many convenience methods.
 */

if (window.webgui == undefined) {
  webgui = {files_loaded:0};
}
webgui.files_loaded++;

$(function() {
  var init, other;
  init = function() {
    if (webgui.files_loaded < 5) {
      setTimeout(other, 10);
    } else {
      webgui.create_example_boxes();
      webgui.draw.all();
    }
  };
  other = function() {
    init();
  };
  init();
}());

/*******************************************************************************
 ******************************* O B J E C T S *********************************
 ******************************************************************************/

webgui.canvas = function() {
  "use strict";
  var vdiff = 20; // account for scrollbar width
  var wdiff = 20; // account for scrollbar height
  var selection = d3.select("#webgui_canvas").selectAll(".inner_webgui_canvas");
  if (!selection.empty()) {
    return selection;
  }
  return selection.data([0]).enter()
    .append("div")
    .classed("inner_webgui_canvas", true)
    .style({
      width: ($(document).width() - wdiff + "px"),
      height: ($(document).height() - vdiff + "px")
    });
};
webgui.sidebar = function() {
  "use strict";
  var selection = webgui.canvas().selectAll(".sidebar");
  if (!selection.empty()) {
    return selection;
  }
  return selection.data([0]).enter()
    .append("div")
    .classed("sidebar", true)
    .style({
      width: (Math.max(100, webgui.width() / 10) + "px"),
      height: (webgui.height() + "px")
    });
};
webgui.box_canvas = function() {
  "use strict";
  var selection = webgui.canvas().selectAll(".box_canvas");
  if (!selection.empty()) {
    return selection;
  }
  var retval = selection.data([0]).enter()
    .append("div")
    .classed("box_canvas", true)
    .style({
      width: (webgui.width() - $(webgui.sidebar()[0]).width() + "px"),
      height: (webgui.height() + "px")
    });
  retval.append("svg")
    .attr("width", webgui.box_canvas_width() + "px")
    .attr("height", webgui.box_canvas_height() + "px")
    .classed("svg_canvas", true);
  return retval;
};

/*******************************************************************************
 ***************** C O N V E N I E N C E   M E T H O D S ***********************
 ******************************************************************************/

webgui.width = function() {
  return $(webgui.canvas()[0]).width();
};
webgui.height = function() {
  return $(webgui.canvas()[0]).height();
};
webgui.sidebar_width = function() {
  return $(webgui.sidebar()[0]).width();
};
webgui.sidebar_height = function() {
  return $(webgui.sidebar()[0]).height();
};
webgui.box_canvas_width = function() {
  return $(webgui.box_canvas()[0]).width();
};
webgui.box_canvas_height = function() {
  return $(webgui.box_canvas()[0]).height();
};