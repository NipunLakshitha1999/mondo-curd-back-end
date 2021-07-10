const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
var bodyParser=require('body-parser');
var cors=require('cors')



const CustomerDTO=require('./module/CustomerDTO')
const ItemDTO=require('./module/ItemDTO')
const OrderDTO=require('./module/OrderDTO.js')

const app=express();

app.use(express.json({limit:'50mb'}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/test',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
    useCreateIndex:true

}
).then(()=>{
    app.listen(3001,()=>{
        console.log("server start....");
    })
}).catch(err => console.log(err));











app.post('/saveCustomer',function (req,resp){
    const customer=new CustomerDTO({
        CustomerID:req.body.CustomerID,
        CustomerName:req.body.CustomerName,
        CustomerAddress:req.body.CustomerAddress,
        CustomerContact:req.body.CustomerContact
    })

    customer.save().then(result =>{
        resp.status(200).json({"isSaved":true,data:result});
    }).catch(err =>{
        resp.status(500).json(err);
    })
})

app.get('/getAllCustomers',function (req,resp){
    CustomerDTO.find().then(result =>{
        resp.status(200).json({data:result});
    }).catch( err =>{
        resp.status(500).json(err);
    })
})

app.put('/updateCustomer',function (req,resp){
    CustomerDTO.updateOne(
        {CustomerID:req.body.CustomerID},
        {
            $set:{
                CustomerName:req.body.CustomerName,
                CustomerAddress:req.body.CustomerAddress,
                CustomerContact:req.body.CustomerContact
            }
        }
    ).then(result =>{
        if (result.nModified >0){
            resp.status(200).json({isUpdate:true});
        }else {
            resp.status(200).json({isUpdate:false});
        }
    }).catch( err =>{
        resp.status(500).json(err);
    })
})


app.delete('/deleteCustomer',function (req,resp){
    CustomerDTO.deleteOne(
        {CustomerID:req.headers.id}

    ).then(result =>{
        if (result.deletedCount>0){
            resp.status(200).json({isDeleted:true});
        }else {
            resp.status(200).json({isDeleted:false});
        }

    }).catch(err =>{
        resp.status(500).json(err);
    })
})


app.post('/saveItem',function (req,resp){
    const item=new ItemDTO({
        ItemID:req.body.ItemID,
        ItemName:req.body.ItemName,
        ItemQTY:req.body.ItemQTY,
        ItemPrice:req.body.ItemPrice
    })

    item.save().then(result =>{
        console.log(result);
        resp.status(200).json({"isSaved":true,data:result});
    }).catch(err =>{
        resp.status(500).json(err);
    })
})

app.put('/updateItem',function (req,resp){
    ItemDTO.updateOne(
        {ItemID:req.body.ItemID},
        {
            $set:{
                ItemName:req.body.ItemName,
                ItemQTY:req.body.ItemQTY,
                ItemPrice:req.body.ItemPrice
            }
        }
    ).then(result =>{
        if (result.nModified >0){
            resp.status(200).json({isUpdate:true});
        }else {
            resp.status(200).json({isUpdate:false});
        }
    }).catch( err =>{
        resp.status(500).json(err);
    })
})

app.get('/getAllItem',function (req,resp){
    ItemDTO.find().then(result =>{
        resp.status(200).json({data:result});
    }).catch( err =>{
        resp.status(500).json(err);
    })
})

app.delete('/deleteItem',function (req,resp){
    ItemDTO.deleteOne(
        {ItemID:req.headers.id}

    ).then(result =>{
        if (result.deletedCount>0){
            resp.status(200).json({isDeleted:true});
        }else {
            resp.status(200).json({isDeleted:false});
        }

    }).catch(err =>{
        resp.status(500).json(err);
    })
})

// app.post('/saveOrder',async (req,resp) =>{
//
//
//     PalceOrder(req.body.OD_ID,req.body.OD_CustomerID,req.body.OD_ItemID,req.body.OD_ItemName,req.body.OD_QTY,req.body.OD_Total.toString());
//
//     async function PalceOrder(orderID,cusID,itemID,itemName,itemQTY,price){
//
//         console.log(orderID);
//         // const session = await OrderDTO.startSession();
//         // const session = await OrderDTO.startSession();
//         // (await session).startTransaction();
//         var session = await OrderDTO.startSession();
//
//
//
//         try {
//             session.startTransaction();
//             const opts={ session};
//             await OrderDTO(
//                 {OD_ID:'1' , OD_CustomerID:cusID,OD_ItemID:itemID,OD_ItemName:itemName,OD_QTY:itemQTY,OD_Total:price}
//             ).save(opts);
//             // await OrderDTO.create([{OD_ID: orderID , OD_CustomerID:cusID,OD_ItemID:itemID,OD_ItemName:itemName,OD_QTY:itemQTY,OD_Total:price}],{session})
//            // await ItemDTO.updateOne(
//            //      {ItemID:req.body.OD_ItemID},{$set: {ItemQTY:itemQTY}},opts1
//
//
//             (await session).commitTransaction();
//             (await session).endSession();
//             return true;
//         }catch (error){
//             (await session).abortTransaction();
//             (await session).endSession();
//
//             throw error;
//         }
//     }
//
// })

app.post('/saveOrder',function (req,resp){

    console.log()
    const order=new OrderDTO({
        OD_ID:req.body.OD_ID,
        OD_CustomerID:req.body.OD_CustomerID,
        OD_ItemID:req.body.OD_ItemID,
        OD_ItemName:req.body.OD_ItemName,
        OD_QTY:req.body.OD_QTY,
        OD_Total:req.body.OD_Total.toString()
    })

    order.save().then(result =>{

        console.log(result)
        if (result._id != null){
            console.log("order")
            ItemDTO.updateOne(
                {ItemID:req.body.OD_ItemID},{
                    $set:{
                        ItemQTY:req.body.OD_QTY
                    }
                }

            ).then(result =>{
                console.log(result)
                if (result.nModified >0){
                    console.log("item")
                    resp.status(200).json({isAdded:true});
                }else {
                    console.log("delete")
                    OrderDTO.deleteOne(
                        {OD_ID:req.body.OD_ID}
                    ).then(result =>{
                        if (result.deletedCount>0){
                            resp.status(200).json({isDeleted:true});
                        }else {
                            resp.status(200).json({isDeleted:false});
                        }
                    })
                }
            }).catch(err =>{
                resp.status(500).json(err);
            })
        }else {
            resp.status(200).json({isAdded:false});
        }
    }).catch(err =>{
        resp.status(500).json(err);
    })


})


app.get('/getOrders',function (req,resp){
    console.log(req.headers.id)
    OrderDTO.find(
    {'OD_ID':req.headers.id
    }).then(result =>{
        resp.status(200).json({data:result});
    }).catch( err =>{
        resp.status(500).json(err);
    })
})
