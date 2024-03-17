"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var parseJson_1 = require("./parseJson");
function main(argv) {
    console.warn(argv);
    if (argv.length < 3) {
        console.error("Please provide the file address as an argument.");
        process.exit(1);
    }
    var filePath = argv[2];
    console.log(filePath);
    (0, parseJson_1.parseJson)(filePath);
}
exports.main = main;
main(process.argv);
