const jwt = require('jsonwebtoken');

// Authentication function to verify cookie
module.exports = function(req, res, next){
    if (!req.headers.cookie) return res.status(401).send('Access Denied');
    var split = req.headers.cookie.split('=');
   
    try{
        const verified = jwt.verify(split[1], "fewfew")
        req.userId = verified;
        //console.log(verified);
        Object.assign(req, verified);
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}