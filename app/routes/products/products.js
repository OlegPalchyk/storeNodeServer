import Product from './productSchema';

exports.getAll = (req, res) => {
    Product.find({}, function(err, products) {
        if (err)
            res.send(err);
        res.json({products});
    });
};

exports.addNew = function(req, res) {
    let new_product = new Product(req.body);
    new_product.save((err, prod)=> {
        if (err)
            res.send(err);
        res.json({prod});
    });
};

exports.getOne = (req, res)=>{
    Product.findOne({_id : req.params.id}, function(err, product) {
        if (err)
            res.send(err);
        res.json({product});
    });
};