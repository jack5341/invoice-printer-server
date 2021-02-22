import jwt from 'jsonwebtoken'

export default (req,res) => {
    const decodedtoken = jwt.decode(req.params["*"])
    res.view("/src/views/a4.ejs", { object: decodedtoken })
}