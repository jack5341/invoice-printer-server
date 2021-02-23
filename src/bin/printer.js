import puppeteer from 'puppeteer'

export default async (req, res) => {
    console.log(req.params["*"])
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox",
            "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/print/' + req.params["*"], {
        waitUntil: 'networkidle2',
    })
    const pdf = await page.pdf({ format: "A4" })
    await browser.close()
    res.send(pdf.toString("base64"))
}