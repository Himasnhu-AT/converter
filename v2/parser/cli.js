"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var converter_service_1 = require("../converter/converter.service");
var parser_service_1 = require("./parser.service");
function main(argv) {
    console.warn(argv);
    if (argv.length < 3) {
        console.error("Please provide the file address as an argument.");
        process.exit(1);
    }
    var filePath = argv[2];
    console.log(filePath);
    var parsedJson = (0, parser_service_1.ParseJson)(filePath);
    if (parsedJson === null) {
        console.error("Invalid JSON file.");
        process.exit(1);
    }
    parsedJson.modules.forEach(function (module) {
        (0, converter_service_1.default)(module);
    });
}
exports.main = main;
main(process.argv);
