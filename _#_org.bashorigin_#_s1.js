
const PATH = require("path");
const FS = require("fs");

var templateCode = FS.readFileSync(PATH.join(__dirname, "minimal/index.html"), "utf8");


exports.wrapHTML = function (code) {
    code = templateCode.replace(/(<\/body>)/, code + "\n$1");
    return code;
}
