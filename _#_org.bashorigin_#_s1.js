
const PATH = require("path");
const FS = require("fs");

var templateCode = FS.readFileSync(PATH.join(__dirname, "minimal/index.html"), "utf8");


exports.wrapHTML = function (bodyCode, options) {
    options = options || {};

    var code = templateCode;

    if (options.uriDepth) {
        var baseUri = [];
        for (var i=0; i<options.uriDepth; i++) {
            baseUri.push("..");
        }
        code = code.replace(/(href="(?!\/))/g, "$1" + baseUri.join("/") + "/");
    }

    if (options.css) {
        code = code.replace(/(<\/head>)/, "<style>\n" + options.css + "\n</style>\n$1");
    }

    code = code.replace(/(<\/body>)/, bodyCode + "\n$1");

    return code;
}
