import * as products from './products/products';
import  crypto from 'crypto';
import path from 'path'
import multer from 'multer';
let storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../upload/'),
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
    }
});
let upload = multer({ storage: storage });

let routes =  (app) =>{


    app.route('/api')
        .get(products.getAll)
        .put(upload.any(), products.addNew)

    app.route('/api/:id')
        .get(products.getOne)
        .delete(products.deleteItem)
        .post(upload.any(), products.updateItem);



};
export default routes;