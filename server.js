const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const res = require('express/lib/response')
const path = require('path')

let idCounter = 1
let productos = []

/***********Motores de plantilla*********/

/* ////////////////////Handlebars
app.engine('hbs', engine({
    extname:".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/handlebars/views/layouts"
}))
app.set("view engine", "hbs")
app.set("views", "./handlebars/views") */


/* /////////////////////////PUG
app.set("views", "./pug/views/layouts")
app.set("view engine", "pug") */

///////////////////////////EJS
app.set("views", "./ejs/views/layouts")
app.set("view engine", "ejs")


/*Middlewares*/
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "/public")))

/*Routes */

app.post('/api/productos', (req,res)=>{
        console.log('req', req.body)
    if(!req.body.title || !req.body.price || !req.body.thumbnail)return res.json({
        msg:'Debe ingresar los datos del producto'
    })
    let product = req.body
    product.id = idCounter++
    productos.push(product)
    res.redirect(200,'/')
})
app.get('/productos', (req,res)=>{
    res.render('main', {products: productos})
})

/* Listener */
app.listen(8080, ()=>{
    console.log('app corriendo')
})