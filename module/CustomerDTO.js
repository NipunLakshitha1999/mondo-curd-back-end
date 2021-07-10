const mongoose=require('mongoose');

const CustomerDTO=new mongoose.Schema({

    CustomerID:{
        type:String,
        required:true
    },
    CustomerName:{
        type:String,
        required:true
    },
    CustomerAddress:{
        type:String,
        required:true
    },
    CustomerContact:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Customer',CustomerDTO)
