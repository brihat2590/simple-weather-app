const express=require("express")
const app=express();
const axios=require("axios")
app.set("view engine", "ejs"); //to serve html files
app.use(express.static("public")) // css ko lai 



app.get("/", (req, res) => {
    res.render("index", { weather: null, error: null });
});
app.get("/weather",async(req,res)=>{
    const city=req.query.city
    const apiKey='173d4572f2ec20ca5f2031f54025e380'
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    let weather
    let error=null
    try{
        const response=await axios.get(url)
        if(!response){
            
            res.status(400).send({
                message:"cant find the location"
            })
        }
        weather=response.data


    }
    catch(error){
        weather=null;
        res.send({
            message:error.message
        })

    }
    res.render("index",{weather,error})
})

  


app.listen(3000,()=>{
    console.log("listening on port 3000")
})