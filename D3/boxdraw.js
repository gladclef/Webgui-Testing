if (window.webgui == undefined) {
  webgui = {};
}

if (webgui.guidata == undefined) {
  // for an description of the data format, see box_json_format.js
  webgui.guidata = {boxes:[], connections:{}};
}

if (webgui.draw == undefined) {
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
  d3.select("#webgui_canvas").selectAll(".box").data(webgui.guidata.boxes).enter()
    .append("div")
    .classed("box", true)
    .text("hello");
});

webgui.draw._add("connections", function() {

});

webgui.draw._add("sidebar", function() {

});