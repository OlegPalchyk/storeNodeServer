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