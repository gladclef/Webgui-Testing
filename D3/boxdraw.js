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

/*******************************************************************************
 ****************************** C O N S T A N T S ******************************
 ******************************************************************************/

webgui.draw.one_tenth_width = function() { return webgui.width() / 10; };
webgui.draw.base_font_size = function() { return webgui.draw.one_tenth_width() * 0.093; };
webgui.draw.decorator_width = function() { return webgui.draw.one_tenth_width() * 0.077; };

/*******************************************************************************
 ************************ D R A W I N G   M E T H O D S ************************
 ******************************************************************************/

webgui.draw._add("boxes", function() {
  "use strict";

  // dimensions to be used to create the box
  var w = webgui.box_canvas_width();
  var h = webgui.box_canvas_height();
  var get_set_width = function(d) {
    var width = w * d.size.width;
    d.size.pixel_width = width;
    return (width + "px");
  };
  var get_set_height = function(d) {
    var height = h * d.size.height;
    d.size.pixel_height = height;
    return (height + "px");
  };

  // create the box
  var box = webgui.box_canvas().selectAll(".box").data(webgui.guidata.boxes).enter()
    .append("div")
    .classed({box:true})
    .attr("box_id", function(d, i) { return i; })
    .style("top", function(d) { return h * d.position.y + "px" })
    .style("left", function(d) { return w * d.position.x + "px"})
    .style("width", get_set_width)
    .style("height", get_set_height);

  // add internals to the box
  webgui.draw.box_internals();

  // decorate the box
  webgui.draw.box_decorations();

  return box;
});

webgui.draw._add("box_internals", function() {
  var get_title = function(d) {
    var title = d.title == null ? d.type_name : d.title;
    return [title];
  };
  var get_title_data = function(d) {
    return [{title:d.title, type_name:d.type_name}];
  };
  var get_props_data = function(d) {
    var retval = [];
    var add_to_retval = function(k,v) {
      var prop = v;
      prop.title = k;
      retval[retval.length] = prop;
    };
    if (d.type_specific_info.properties != null) {
      $.each(d.type_specific_info.properties, add_to_retval);
    }
    return retval;
  };
  var get_prop_title = function(d) {
    return d.title;
  };
  var font_size = webgui.draw.base_font_size();

  // get the boxes to be updated
  var needs_update = function(d) {
    var do_update = d.needs_update.internals;
    return do_update;
  };
  var update_boxes = webgui.guidata.live_boxes().filter(needs_update);
  var boxes = webgui.box_canvas().selectAll(".box").data(update_boxes);

  // update the title
  boxes.selectAll(".title").data(get_title_data).exit().remove();
  boxes.selectAll(".title").data(get_title_data).enter()
    .append("div")
    .classed({title:true, internals:true})
    .style({
      height: (font_size * 1.5 + 6 + "px"),
      "font-size": (font_size * 1.5 + "px")
    })
    .text(get_title);

  // update the properties
  boxes.selectAll(".property").data(get_props_data).exit().remove();
  boxes.selectAll(".property").data(get_props_data).enter()
    .append("div")
    .classed({property:true, internals:true})
    .style({
      height: (font_size + 6 + "px"),
      "font-size": (font_size + "px")
    })
    .text(get_prop_title);
});

webgui.draw._add("box_decorations", function() {
  var get_decorators = function(decorators, size) {
    var retval = [];
    var add_to_retval = function(k,v) {
      var decorator = {type:v};
      decorator.title = k;
      decorator.count = Object.keys(decorators).length;
      decorator.box_size = size;
      retval[retval.length] = decorator;
    };
    if (decorators != null) {
      $.each(decorators, add_to_retval);
    }
    return retval;
  };
  var get_inputs = function(d) {
    return get_decorators(d.inputs, d.size);
  };
  var get_outputs = function(d) {
    return get_decorators(d.outputs, d.size);
  };
  var get_left = function(d, i) {
    var offset = d.box_size.pixel_width / (d.count + 1) * (i + 1) - decorator_width / 2;
    return (offset + "px");
  };
  var get_top = function(d) {
    var top = d.box_size.pixel_height + decorator_width / 2;
    return (top + "px");
  };
  var decorator_width = webgui.draw.decorator_width();

  // get the boxes to be updated
  var needs_update = function(d) {
    var do_update = d.needs_update.decorators;
    return do_update;
  };
  var update_boxes = webgui.guidata.live_boxes().filter(needs_update);
  var boxes = webgui.box_canvas().selectAll(".box").data(update_boxes);

  boxes.selectAll(".input").data(get_inputs).exit().remove();
  boxes.selectAll(".input").data(get_inputs).enter()
    .append("div")
    .classed({input:true, decorators:true})
    .style({
      width: (decorator_width + "px"),
      height: (decorator_width + "px"),
      top: (-decorator_width/2 + "px")
    })
    .style("left", get_left);
});

webgui.draw._add("connections", function() {
  "use strict";
});

webgui.draw._add("sidebar", function() {
  "use strict";

});