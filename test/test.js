/*
* TODO: Use test framework for testing
*
* NOTE: Please don't consider this an actual testing, since right now it is an experimental file.
*
* This is a simple test for loggy
* */
// const Loggy = require("../index");
// const fs = require("fs");

// Loggy.config({
//     // outStream: (data) => {
//     //     const file = fs.appendFile("./logs", data, _ => console.log("Finished writing to log file"));
//     // },
//     // errorStream: (data) => {
//     //     const file = fs.writeFile("./errors", data, _ => console.log("Finished writing to error file") );
//     // },
//     // pretty: true,
//     // isJson: false
// });

// Loggy.format = (logLevel, data) => {
//     return data;
// };

// Loggy.info("Info", __filename);
// Loggy.error("error occurred", new Error("Shit"), __filename);
// Loggy.log("Log", __filename);
// Loggy.warn("Warning", __filename);
// console.log("oKAY NOT annoying");