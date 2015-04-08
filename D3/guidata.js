if (window.webgui == undefined) {
  webgui = {files_loaded:0};
}
webgui.files_loaded++;

if (webgui.guidata == undefined) {
  webgui.guidata = {boxes:[], connections:[]};
}

webgui.guidata.add_box = function(box) {
  box.id = webgui.guidata.boxes.length;
  box.needs_update = {internals:true, decorators:true}
  webgui.guidata.boxes[webgui.guidata.boxes.length] = box;
};

webgui.guidata.live_boxes = function() {
  return webgui.guidata.boxes.filter( function(k,v) { return v.alive; } );
};

webgui.guidata.dead_boxes = function() {
  return webgui.guidata.boxes.filter( function(k,v) { return !v.alive; } );
};