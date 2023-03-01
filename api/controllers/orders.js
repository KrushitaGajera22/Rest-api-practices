const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

exports.orders_create_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (product) {
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    product: req.body.productId
                });
                order.save().then(result => {
                    res.status(201).json({
                        message: 'Order Stored',
                        createdOrder: {
                            _id: result._id,
                            product: result.product,
                            quantity: result.quantity
                        },
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + result._id
                        }
                    });
                }).catch(err => {
                    res.status(500).json({
                        message: 'Not Found',
                        error: err
                    });
                });
            }
            else {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
        })
}

exports.orders_get_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .select('product quantity _id')
        .populate('product')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    order: doc,
                    request: {
                        type: 'GET',
                        description: 'All orders',
                        url: 'http://localhost:3000/orders/'
                    }
                });
            } else {
                res.status(404).json({ message: 'Id not Found' });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_delete_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order Deleted',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}