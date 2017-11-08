import Product from './productSchema';
import deleteFiles from '../../deleteFiles';

exports.getAll = (req, res) => {
    Product.find({}, function (err, products) {
        if (err)
            res.json(err);
        res.json({products});
    });
};

exports.addNew = function (req, res) {
    let product = req.body;
    let files = req.files.map(item => {
        return {url: '/upload/' + item.filename, originalName : item.originalname}
    });
    Object.assign(product, {images: files});
    let new_product = new Product(product);
    new_product.isNew = true;
    new_product.save(
        (err, prod) => {
            if (err){
                console.log(err);
                return res.json(err);
            }
            return res.json({prod});
        }
    )


};

exports.getOne = (req, res) => {
    Product.findOne({_id: req.params.id}, function (err, product) {
        if (err) {
            res.statusCode  = 404;
            return res.json(err);

        }else{
            if (product === null){
                res.statusCode = 404;
                return res.json({message : 'no such item'})
            }
            return res.json({product});
        }

    });
};

exports.deleteItem = (req, res)=>{
    Product.findOne({_id: req.params.id}, (err, product)=>{
        if (err) {
            res.statusCode = 404;
            return res.json(err);
        }else{

            Product.remove({_id : product._id}, (err, resp)=>{


                if (err){
                    res.statusCode = 404;
                    return res.json(err);
                }else{
                    let files = product.images.map(item => {
                        return item.url;
                    });
                    deleteFiles(files, (err)=>{
                        if(err){
                            return res.json({id : req.params.id})

                        }else{
                            return res.json({id : req.params.id})

                        }
                    })
                }
            })
        }
    });

};

exports.updateItem = (req, res)=>{
    let product = req.body;
    if(req.files.length > 0){
        let files = req.files.map(item => {
            return {url: '/upload/' + item.filename, originalName : item.originalname}
        });
        Object.assign(product, {images: files});
    }

    Product.findByIdAndUpdate(req.params.id, product,{new: true}, (err, updProduct)=>{
            if (err)
                return res.json(err);
            else{
                return res.json({product : updProduct})
            }
    });
};