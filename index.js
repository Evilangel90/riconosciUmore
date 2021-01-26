const express = require("express");
const app= express();
const path= require("path");
const ejsMate= require("ejs-mate");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", ejsMate);

app.use(express.static(path.join(__dirname, "public")))
app.get("/api/riconoscimentoUmore",(req,res)=>{
    res.render("index.html");
})   

app.get("*",(req,res)=>{
    res.redirect("/api/riconoscimentoUmore");
})   



let porta=process.env.PORT||3000; 
app.listen(3000,(e)=>{
e? console.log("Errore nell'avvio server"):console.log(`Server Avviato alla porta ${porta}`)
});