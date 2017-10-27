import express from 'express';
import passwordGenerator from 'password-generator';
let router = express.Router();

// GET users listing. */
router.get('/', function(req, res) {
    let passArray = [];
    let count = 12;
    for(let i =0; i < count; i++){
        passArray.push(passwordGenerator(12, false))
    }
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({passwords : passArray}));
});

export default router;