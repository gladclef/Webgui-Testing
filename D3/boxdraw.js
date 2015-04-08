/**
 * All the drawing functions (does not include canvas creation functions)
 */

if (window.webgui == undefined) {
  webgui = {files_loaded:0};
}
webgui.files_loaded++;

if (webgui.guidata == undefined) {
  // for an description of the data format, see box_json_format.js
  webgui.guidata = {boxes:[], connections:{}};
}

if (webgui.draw == undefined) {
  // create the basic drawing collection and template
  webgui.draw = {
    _funcs: {},
    _add: function(name, callback) {
      webgui.draw._funcs[name] = callback;
      webgui.draw[name] = callback;
    },
    all: function() {
      var call = function(name, callback) {
        callback();
      };
      $.each(webgui.draw._funcs, call);
    }
  };
}

webgui.draw._add("boxes", function() {
  "use strict";

  // dimensions to be used to create the box
  var w = webgui.box_canvas_width();
  var h = webgui.box_canvas_height();

  // create the box
  var box = webgui.box_canvas().selectAll(".box").data(webgui.guidata.boxes).enter()
    .append("div")
    .classed({box:true})
    .attr("box_id", function(d, i) { return i; })
    .style("top", function(d) { return h * d.position.y + "px" })
    .style("left", function(d) { return w * d.position.x + "px"})
    .style("width", function(d) { return w * d.size.width + "px"})
    .style("height", function(d) { return h * d.size.height + "px"});

  // add internals to the box
  webgui.draw.box_internals();

  // decorate the box
  webgui.draw.box_decorations();

  return box;
});

webgui.draw._add("box_internals", function() {
  var get_title = function(d) {
    var title = d.title == null ? d.type_name : d.title;
    console.log(d);
    console.log(title);
    return [title];
  };
  var needs_update = function(d) {
    var do_update = d.needs_update.internals;
    return do_update;
  };
  var get_data = function(d) {
    return [d];
  };
  var update_boxes = webgui.guidata.live_boxes().filter(needs_update);

  var boxes = webgui.box_canvas().selectAll(".box").data(update_boxes);
  boxes.selectAll(".title").data(get_data).enter()
    .append("div")
    .classed({title:true})
    .text(get_title);
});

webgui.draw._add("box_decorations", function() {

});

webgui.draw._add("connections", function() {
  "use strict";
});

webgui.draw._add("sidebar", function() {
  "use strict";

});