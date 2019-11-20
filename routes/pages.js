const router = require('express').Router();
const fetch = require('node-fetch');
const { loginVerify, pageVerify } =  require('./verifyToken');
const { Staff, Cafeteria, CustomerService, Designer, Engineer, FrontDesk, 
    HumanResources, Manager, MedicalAdministrator, Researcher, SalesRepresentative, 
    Secretary, Security, OtherStaff } = require('../model/staff');

router.get('/userGet', loginVerify, (req, res) => {
    // res.send(req.user);
});

router.get('/staffGet', pageVerify, async (req, res) => {
    const staffs = await Staff.find({});
    try{
        res.send(staffs);
    } catch(err){
        res.status(500).send(err);
    }
});

let position = undefined;
let positionLower = undefined;
router.post('/staff-position-post', (req, res) => {
    position = req.body.position;
    try{
        res.send('');
    } catch(err){
        res.status(500).send(err);
    }
});

router.get('/staff-position-get', pageVerify, async (req, res) => {
    let staffposition = undefined;
    positionLower = position.toLowerCase();
    if(positionLower === "cafeteria"){
        staffposition = await Cafeteria.find({});
    }
    else if(positionLower === "customer service"){
        staffposition = await CustomerService.find({});
    }
    else if(positionLower === "designer"){
        staffposition = await Designer.find({});
    }
    else if(positionLower === "engineer"){
        staffposition = await Engineer.find({});
    }
    else if(positionLower === "front desk"){
        staffposition = await FrontDesk.find({});
    }
    else if(positionLower === "human resources"){
        staffposition = await HumanResources.find({});
    }
    else if(positionLower === "manager"){
        staffposition = await Manager.find({});
    }
    else if(positionLower === "medical administrator"){
        staffposition = await MedicalAdministrator.find({});
    }
    else if(positionLower === "researcher"){
        staffposition = await Researcher.find({});
    }
    else if(positionLower === "sales representative"){
        staffposition = await SalesRepresentative.find({});
    }
    else if(positionLower === "secretary"){
        staffposition = await Secretary.find({});
    }
    else if(positionLower === "security"){
        staffposition = await Security.find({});
    }
    else if(positionLower === "other"){
        staffposition = await OtherStaff.find({});
    }
    else{
        staffposition = await Staff.find({position: position});
    }

    try{
        res.send(staffposition);
    } catch(err){
        res.status(500).send(err);
    }
});

let username = undefined;
router.post('/myinfo-post', (req, res) => {
    username = req.body.username;
    try{
        res.send('');
    } catch(err){
        res.status(400).send(err);
    }
});

router.get('/myinfo-get', pageVerify, async (req, res) => {
    const user = await Staff.findOne({username: username});
    try{
        res.send(user);
    } catch(err){
        res.status(500).send(err);
    }
});

let search = undefined;
router.post('/search-post', (req, res) => {
    search = req.body.search;
    try{
        res.send(search);
    } catch(err){
        res.status(400).send(err);
    }
});

router.get('/search-get', pageVerify, async (req, res) => {
    const result = await Staff.find({$or: [{firstName: search},{lastName: search},{username: search}]});
    try{
        res.send(result);
    } catch(err){
        res.status(500).send(err);
    }
});


module.exports = router;