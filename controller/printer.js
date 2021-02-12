const jwt = require("jsonwebtoken")
const puppeteer = require("puppeteer")
const fs = require("fs")

module.exports.Invoice = async (req, res) => {
    const decodedtoken = jwt.decode(req.body.token)
    // Must be headless for print page by PDF // No sandbox for heroku deployment
    const browser = await puppeteer.launch({headless: true,
        args: ["--no-sandbox",
		"--disable-setuid-sandbox"]
    }).catch(err => console.log(err));
    const page = await browser.newPage();
    var pdf = await page.goto('http://localhost:8080/layout/invoice/' + req.body.token, {
        waitUntil: "networkidle2"
    }).catch(err => console.log(err));
    res.send({
        file: pdf,
        filename: decodedtoken.Company
    })
}


module.exports.Layout = (req, res) => {
    const decodedtoken = jwt.decode(req.params["*"])
    res.view("/views/layout-invoice.ejs", {invoice_info: decodedtoken})
}
