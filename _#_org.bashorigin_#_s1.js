
const PATH = require("path");
const FS = require("fs");

const VERBOSE = !!process.env.VERBOSE;


var templateCode = FS.readFileSync(PATH.join(__dirname, "minimal/index.html"), "utf8");


exports.wrapHTML = function (bodyCode, options) {
    options = options || {};

    var code = templateCode;

    var baseUriPrefix = "";
    if (
        options.uriDepth &&
        options.uriDepth > 0
    ) {
        var baseUri = [];
        for (var i=0; i<options.uriDepth; i++) {
            baseUri.push("..");
        }
        code = code.replace(/(href="(?!\/))/g, "$1" + baseUri.join("/") + "/");
        baseUriPrefix = baseUri.join("/") + "/";

        if (VERBOSE) console.log("baseUriPrefix", baseUriPrefix);
    }

    if (options.css) {
        if (/^\./.test(options.css)) {
            code = code.replace(/(<\/head>)/, '<link rel="stylesheet" href="' + options.css + '">' + "\n$1");
        } else {
            code = code.replace(/(<\/head>)/, "<style>\n" + options.css + "\n</style>\n$1");
        }
    }

    if (options.scripts) {
        options.scripts.forEach(function (script) {
            if (/^\./.test(script)) {
                bodyCode += '<script href="' + script + '"></script>';
            } else {
                bodyCode += "\n<script>\n" + script + "\n</script>";
            }
        });
    }

    code = code.replace(/(<\/body>)/, bodyCode + "\n$1");

    return code;
}
