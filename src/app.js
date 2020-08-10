const path=require('path')
const hbs=require('hbs')
const express=require('express')
const { dirname } = require('path')
const { fdatasync } = require('fs')
const app=express()

//from weather app
const geocode=require("./utils/geocode.js")
const forecast=require("./utils/forecast.js")

//define path for express config
const pth=(path.join(__dirname,'../public'))
const viewpth=(path.join(__dirname,'../templates/views'))
const ppth=(path.join(__dirname,'../templates/partials'))

////setup static directory to serve
app.use(express.static(pth))

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpth)
hbs.registerPartials(ppth)


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Vivek'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Vivek'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Vivek'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!',

        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return  res.send({
                    error
                })
            }
            forecast(latitude,longitude,(error,fData)=>{
                if(error){
                    return  res.send({
                        error
                    })
                }
                //not used data.location, only location by destructuring object
        
                res.send({
                    forecast:fData,
                    location,
                    address:req.query.address
                })
            })
            })
    }
    
})








app.get('/help/*',(req,res)=>{
res.render('404',{
    title:404,
    name:'Vivek',
    errorMessage:'Help article not found'
})
})
app.get('*',(req,res)=>{
res.render('404',{
    title:404,
    name:'Vivek',
    errorMessage:'Page not found'
})
})





app.listen(3000,()=>{
    console.log('server up and running on port:3000')
})