// const jwt = require('jsonwebtoken');
const Session = require('../model/session');

const loginVerify = (req, res, next) => {
    const { token } = req.query;

    if(!token)
        return res.status(401).send('Access Denied');

    try{
        const verified = Session.find({
            _id: token,
            isDeleted: false
        }, (err, session) => {
            if (err)
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
    
            if (session.length !== 1)
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
    
            return res.send({
                success: true,
                message: 'Good'
            });
        });

        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
}

const pageVerify = (req, res, next) => {
    const { token } = req.query;

    if(!token)
        return res.status(401).send('Access Denied');

    if(token){
        Session.find({
            _id: token,
            isDeleted: false
        }, (err, session) => {
            if (err)
                return res.status(400).send({
                    success: false,
                    message: 'Error: Server error'
                });
            else if (session.length !== 1)
                return res.status(400).send({
                    success: false,
                    message: 'Error: Invalid'
                });
            else{ next(); }                    
        });
    }
}

module.exports.loginVerify = loginVerify;
module.exports.pageVerify = pageVerify;



// const token = req.header('auth-token');
// const token = req.header('Authorization')
// if (!token) return res.status(401).send("Access Denied");

// try{
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET)
//     req.user = verified;
//     next();
// }
// catch(err){
//     res.status(400).send("Invalid Token");
// }