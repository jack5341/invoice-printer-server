import fastify from 'fastify'
import jwt from 'jsonwebtoken'
const app = fastify()

app.register(require("fastify-cors"))
app.register(require("point-of-view"), {
    engine: {
        ejs: require("ejs")
    }
})

import LayoutsRoutes from "./routes/layout"
LayoutsRoutes.forEach((route, index) => {
    app.route(route)
})

app.get("/", (req, res) => {
    res.send("Invoice-Printer-Web-API")
})

app.post("/", (req, res) => {
    const raw_post = req.body
    switch ((raw_post.layout).toLowerCase()) {
        case "a4":
            const token = jwt.sign(raw_post, "shhhhh")
            res.redirect("/layout/a4/" + token)
            break;
        default:
            res.send("No avaiable this template")
            break;
    }

    res.end()
})

// Run the server!
app.listen(process.env.PORT || 8080, '0.0.0.0', function (err) {
    if (err) {
        fastify.log.error(err)
        throw Error(err);
    }
})