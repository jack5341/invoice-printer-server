import Print from '../bin/printer'
import Template from '../bin/template'

const routes = [
    {
        method: "GET",
        url: "/layout/a4/*",
        handler: Print
    },
    {
        method: "GET",
        url: "/print/*",
        handler: Template
    }
]

export default routes