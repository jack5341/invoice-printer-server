const app = require('fastify')()

// Middlewares
app.register(require('fastify-cors'))
app.register(require('point-of-view'), {
    engine: {
      ejs: require('ejs')
    }
})

// Routes
const printRoutes = require("./router/print")
printRoutes.forEach((route,index) => {
    app.route(route)
}) 

app.get('/', function (req, reply) {
    reply.send("Invoice Printer (Server-Side)")
})

// Run the server!
app.listen(process.env.PORT || 8080, '0.0.0.0',function (err) {
    if (err) {
        fastify.log.error(err)
        throw Error(err);
    }
  })