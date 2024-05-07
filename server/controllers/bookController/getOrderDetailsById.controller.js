const BookModel = require("../../models/bookOrder.model");

exports.getOrderDetailsById = async (req,res) =>{
    let orderId = req.params.id;

    if(orderId === undefined){
        
        return res.status(400).json({
            success: false,
            message: `Please provide order id.`,
        })
    }
    try {
        let allOrders = await BookModel.findById(orderId);

        if(!allOrders){
            return res.status(400).json({
                success: false,
                message: `No orders found.`,
            })
        }

        return res.status(200).json({
            success: true,
            message: `Order Details`,
            data: allOrders,
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error.`,
        })
    }
}