const mongoose=require('mongoose');

const OrderDTO=new mongoose.Schema({

    OD_ID:{
        type:String,
        required:true
    },
    OD_CustomerID:{
        type:String,
        required:true
    },
    OD_ItemID:{
        type:String,
        required:true
    },
    OD_ItemName:{
        type:String,
        required:true
    },
    OD_QTY:{
        type:String,
        required:true
    },
    OD_Total:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Orders',OrderDTO)
