const request=require("request")

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=00bf7c4b21025f41a76c6016df321a09&query='+latitude+','+longitude
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect',undefined)
        } else if(body.error){
            callback('please try other search ',undefined)
        }
        else{
            callback(undefined,' Temperature is '+body.current.temperature +'°C .The apparent temperature is '+body.current.feelslike +'°C. The humidity is '+body.current..weather_descriptions.humidity)
        }
    })
}
module.exports=forecast