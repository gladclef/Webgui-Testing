// boxes are indexed by their respective ids
// box data is of the form:
//     {alive:bool, position:{x:double,y:double}, size:{width:double, height:double},
//      title:null/string type_name:string, type_specific_info:{}, inputs:{}/null, outputs:{}/null,
//      id:int, needs_update:{internals:bool, decorators:bool}}
//     where position/size data is a scale from 0-1, where the value 1 == the drawing window width/height as appropriate
//     where the type specific info is of the form:
//         {properties:{}}
//         where the properties are specified by their string name and are of the form:
//             {onclick:string/null, display_data:{}/null}
//             where the onclick string is the name of a corresponding function in window.box_functions
//             where display_data is of the form:
//                 {type:"list"/"image"/"json", values:[]/url/json}
//     where inputs are indexed by a string key and specify a string type name
//     where outputs are indexed by a string key and specify a string type name
//     where id and needs_update are assigned automatically and should not be touched
// connections are indexed by [from_boxid][to_boxid][conn1,conn2,...]
// connections are of the form:
//     {from:int, output_location:string, to:int, input_location:string}

// example:
//
// window.guidata = {boxes:[], connections:{}};
//
// var box = {
//     alive: true,
//     position: {0.4, 0.4},
//     size: {0.2, 0.2},
//     title: null,
//     type_name: "type example 1",
//     type_specific_info: {
//         properties: {
//             ex1: {
//                 onclick:"do_something",
//                 display_data: null
//             },
//             ex2: {
//                 onclick:null,
//                 display_data: {type:"list", values:[0, 1, 2]}
//             },
//         }
//     },
//     inputs: {
//         in1: "integer",
//         in2: "double"
//     },
//     outputs: {
//         out1: "double"
//     }
// };
//
// var connection = {
//     from: 0,
//     output_location: "out1",
//     to: 1,
//     input_location: "in1"
// };