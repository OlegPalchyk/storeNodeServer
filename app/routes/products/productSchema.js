// grab the things we need
import mongoose from 'mongoose';
let Schema = mongoose.Schema;

// create a schema
let ProductsSchema = new Schema({
    description: {type : String, required : true},
    price: { type: Number, required: true},
    title: { type: String, required: true },
    url: { type: String, required: true },
});

// the schema is useless so far
// we need to create a model using it
let Products = mongoose.model('Products', ProductsSchema);
export default Products;
