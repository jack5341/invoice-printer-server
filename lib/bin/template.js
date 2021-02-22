"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res) {
    var decodedtoken = _jsonwebtoken2.default.decode(req.params["*"]);
    res.view("/src/views/a4.ejs", { object: decodedtoken });
};