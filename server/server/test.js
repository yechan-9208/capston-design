const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { router } = require("./src/router/router");


const app = express();
const port = 3003;

app.use(cors());
app.use(bodyParser.json());
router(app);

//test
app.get('/',(req,res)=>{
	console.log("data receive");
    return res.send({
	test1: "success"});
})

app.listen(port, function(){
    console.log("Server on");
});


