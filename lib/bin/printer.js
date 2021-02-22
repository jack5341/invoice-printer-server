"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (req, res) {
    var browser = await _puppeteer2.default.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    var page = await browser.newPage();
    await page.goto('http://localhost:8080/print/' + req.params["*"], {
        waitUntil: 'networkidle2'
    });
    var pdf = await page.pdf({ format: "A4" });
    await browser.close();
    res.send(pdf.toString("base64"));
};