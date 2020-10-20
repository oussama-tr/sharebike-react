var jwt = require('jsonwebtoken');
var secret = process.env.TOKEN_KEY;


 const auth = function (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                console.log(err);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.email;
                console.log('Decoded email from auth ', decoded.email);
                next();
            }
        });
    } else {
        
        res.status(403).json('No token provided');
    };
}
module.exports = auth;
