const mongoose=require('mongoose');

const ItemDTO=new mongoose.Schema({

    ItemID:{
        type:String,
        required:true
    },
    ItemName:{
        type:String,
        required:true
    },
    ItemQTY:{
        type:String,
        required:true
    },
    ItemPrice:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Item',ItemDTO)
