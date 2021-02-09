// Controller
const print = require("../controller/printer")

const routes = [{
    method: "GET",
    url: "/layout/invoice",
    handler: print.Invoice
}]

module.exports = routes