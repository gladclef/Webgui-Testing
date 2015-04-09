if (window.webgui == undefined) {
  webgui = {files_loaded:0};
}
webgui.files_loaded++;

if (webgui.svg == undefined) {
  webgui.svg = {};
}

// returns the commands for an SVG path to generate a smooth curve
webgui.svg.smooth_curve_command = function(p1, p2) {

  // get some data about the line
  var is_horizontal = Math.abs(p2.x - p1.x) > Math.abs(p2.y - p1.y);
  var mp = {
    x: (p2.x - p1.x)/2,
    y: (p2.y - p1.y)/2,
  };

  // generate the curve
  var retval = "M " + p1.x + " " + p1.y + " ";
  if (!is_horizontal) {
    retval += "c 0 0, " + (0.7 * mp.x) + " 0, " + mp.x + " " + mp.y + " ";
  } else {
    retval += "c 0 0, 0 " + (0.7 * mp.y) + ", " + mp.x + " " + mp.y + " ";
  }
  retval += "S " + p2.x + " " + p2.y + ", " + p2.x + " " + p2.y;

  return retval;
};