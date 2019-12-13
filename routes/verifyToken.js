// const jwt = require('jsonwebtoken');
const {UserSession, AdminSession } = require('../model/session');

//Verify User during login
const loginVerify = (req, res, next) => {
    const { token } = req.query;

    if(!token)
        return res.status(401).send('Access Denied');

    try{
        const verified = UserSession.find({
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

//Verify Admin during login
const adminLoginVerify = (req, res, next) => {
    const { token } = req.query;

    if(!token)
        return res.status(401).send('Access Denied');

    try{
        const verified = AdminSession.find({
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

//Verify User during page access
const pageVerify = (req, res, next) => {
    const { token } = req.query;

    if(!token)
        return res.status(401).send('Access Denied');

    if(token){
        UserSession.find({
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

//Verify Admin during page access
const adminPageVerify = (req, res, next) => {
    const { token } = req.query;

    if(!token)
        return res.status(401).send('Access Denied');

    if(token){
        AdminSession.find({
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
module.exports.adminLoginVerify = adminLoginVerify;
module.exports.pageVerify = pageVerify;
module.exports.adminPageVerify = adminPageVerify;



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