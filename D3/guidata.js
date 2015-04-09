if (window.webgui == undefined) {
  webgui = {files_loaded:0};
}
webgui.files_loaded++;

if (webgui.guidata == undefined) {
  webgui.guidata = {boxes:[], connections:[], all_connections:[]};
}

webgui.guidata.add_box = function(box) {
  box.id = webgui.guidata.boxes.length;
  box.needs_update = {internals:true, decorators:true}
  webgui.guidata.boxes[webgui.guidata.boxes.length] = box;
};

webgui.guidata.live_boxes = function() {
  return webgui.guidata.boxes.filter( function(v,k) { return v.alive; } );
};

webgui.guidata.dead_boxes = function() {
  return webgui.guidata.boxes.filter( function(v,k) { return !v.alive; } );
};

webgui.guidata.add_connection = function(conn) {
  var found = false;
  var test_equality = function(conn2) {
    var conn1 = conn;
    if (conn1.output_location == conn2.output_location &&
      conn1.input_location == conn2.input_location) {
      found = true;
    }
  };

  // get the set of connection from and to the destined boxes
  // create the sets as necessary
  if (webgui.guidata.connections[conn.from] == undefined) {
    webgui.guidata.connections[conn.from] = [];
  }
  if (webgui.guidata.connections[conn.from][conn.to] == undefined) {
    webgui.guidata.connections[conn.from][conn.to] = [];
  }
  var connections_set = webgui.guidata.connections[conn.from][conn.to];

  // test all connections from and to the destined boxes to make sure none yet exist
  // for the given ports
  $.each(connections_set, test_equality);
  if (found) {
    return;
  }

  // add the new connection
  connections_set[connections_set.length] = conn;
  webgui.guidata.all_connections[webgui.guidata.all_connections.length] = conn;
};