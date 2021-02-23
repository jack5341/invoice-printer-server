'use strict';

var _fastify = require('fastify');

var _fastify2 = _interopRequireDefault(_fastify);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _layout = require('./routes/layout');

var _layout2 = _interopRequireDefault(_layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _fastify2.default)();

app.register(require("fastify-cors"));
app.register(require("point-of-view"), {
    engine: {
        ejs: require("ejs")
    }
});

_layout2.default.forEach(function (route, index) {
    app.route(route);
});

app.get("/", function (req, res) {
    res.send("Invoice-Printer-Web-API");
});

app.post("/", function (req, res) {
    var raw_post = req.body;
    switch (raw_post.layout.toLowerCase()) {
        case "a4":
            var token = _jsonwebtoken2.default.sign(raw_post, "shhhhh");
            res.redirect("/layout/a4/" + token);
            break;
        default:
            res.send("No avaiable this template");
            break;
    }

    res.end();
});

// Run the server!
app.listen(process.env.PORT || 8080, '0.0.0.0', function (err) {
    if (err) {
        _fastify2.default.log.error(err);
        throw Error(err);
    }
});