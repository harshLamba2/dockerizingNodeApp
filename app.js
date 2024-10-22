const express= require("express")
const app= express()
const router= express.Router()

const PORT=8081

app.use(express.json())

app.get("/", async(req,res)=>{
    try{

        res.status(200).json({success:true, message:"Success"})

    }catch(error){
        res.status(400).json({success:false, message:error.message})
    }
})





app.listen(PORT,()=>console.log("Listening on: "+PORT))