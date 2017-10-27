import * as products from './products/products';

let routes =  (app) =>{


    app.route('/api')
        .get(products.getAll)
        .post(products.addNew);

};
export default routes;