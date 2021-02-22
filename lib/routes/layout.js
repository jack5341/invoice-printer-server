'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _printer = require('../bin/printer');

var _printer2 = _interopRequireDefault(_printer);

var _template = require('../bin/template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
    method: "GET",
    url: "/layout/a4/*",
    handler: _printer2.default
}, {
    method: "GET",
    url: "/print/*",
    handler: _template2.default
}];

exports.default = routes;