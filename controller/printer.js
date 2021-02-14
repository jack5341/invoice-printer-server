const jwt = require("jsonwebtoken")
const puppeteer = require("puppeteer")

module.exports.Invoice = async (req, res) => {
    const decodedtoken = jwt.decode(req.body.token)
    // Must be headless for print page by PDF // No sandbox for heroku deployment
    const url = `http://invoice-printer-fastify.herokuapp.com/layout/invoice/${req.body.token}`
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox",
		"--disable-setuid-sandbox"]
    })
    const page = await browser.newPage()
    await page.goto(url)
    var pdf = await page.pdf({ path: 'process-file.pdf', format: 'A4' })
    const buf = Buffer.from(pdf, 'base64');
    res.send({
        fileName: decodedtoken.Company,
        file: buf.toString("base64")
    })
}


module.exports.Layout = (req, res) => {
    const decodedtoken = jwt.decode(req.params["*"])
    res.view("/views/layout-invoice.ejs", {invoice_info: decodedtoken})
}
