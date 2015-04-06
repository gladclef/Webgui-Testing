if (window.guidata == undefined) {
	// for an example of the data format, see box_json_format.js
	window.guidata = {boxes:[], connections:{}};
}

create_example_boxes = function() {
	// get the first unused box id
	var box_id = boxes.length;

	// create the first box, no connections
	var box1 = {
    alive: true,
    position: {0.8, 0.8},
    size: {0.1, 0.1},
    title: null,
    type_name: "type example 1",
    type_specific_info: {
      properties: {
        ex1: {
          onclick:"do_something_1",
          display_data: null
        },
        ex2: {
          onclick:null,
          display_data: {type:"list", values:[0, 1, 2]}
        },
      }
    },
    inputs: {
      in1: "integer",
      in2: "double"
    },
    outputs: {
      out1: "double"
    }
  };
  window.guidata.boxes[box_id] = box1;

	// create the second box, connects to third box
	var box2 = {
    alive: true,
    position: {0.2, 0.2},
    size: {0.1, 0.1},
    title: null,
    type_name: "type example 2",
    type_specific_info: {
      properties: {
        ex1: {
          onclick:"do_something_2",
          display_data: null
        }
      }
    },
    inputs: null,
    outputs: {
      out1: "double"
    }
  };
  box_id++;
  window.guidata.boxes[box_id] = box2;

	// create the second box, connects to third box
	var box3 = {
    alive: true,
    position: {0.6, 0.2},
    size: {0.1, 0.1},
    title: null,
    type_name: "type example 3",
    type_specific_info: {
      properties: {
        ex1: {
          onclick:"do_something_3",
          display_data: null
        }
      }
    },
    inputs: {
      in1: "double"
    },
    outputs: null
  };
  box_id++;
  window.guidata.boxes[box_id] = box3;

	// create the connection between boxes 2 and 3
	var connection = {
		from: box_id - 1,
		output_location: "out1",
		to: box_id,
		input_location: "in1"
	}
}