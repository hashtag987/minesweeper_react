const mongoose = require("mongoose");

module.exports = () => {
	mongoose.connect("mongodb://localhost:27017/miners",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
	}).then(()=>{
		console.log("DB connection successfull");
	}).catch(err=>{
		console.log(err.message);
	});
};
