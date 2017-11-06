import * as products from './products/products';

let routes =  (app) =>{


    app.route('/api')
        .get(products.getAll)
        .post(products.addNew);

    app.route('/api/:id')
        .get(products.getOne);

};
export default routes;