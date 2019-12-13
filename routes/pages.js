const router = require('express').Router();
const fetch = require('node-fetch');
const { loginVerify, pageVerify, adminLoginVerify, adminPageVerify } =  require('./verifyToken');
const { Staff, Cafeteria, CustomerService, Designer, Engineer, FrontDesk, 
    HumanResources, Manager, MedicalAdministrator, Researcher, SalesRepresentative, 
    Secretary, Security, OtherStaff } = require('../model/staff');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const bcrypt = require('bcryptjs');

cloudinary.config({
    cloud_name: "mca",
    api_key: 651466496877873,
    api_secret: "AISpGk9B5uu23t58F0ucjzRxPT0"
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "profileImages",
    allowedFormats: ["jpg","png"],
    transformation: [{width: 500, height: 500, crop: "limit"}]
});

const parser = multer({storage: storage});

//Initial Authentication
router.get('/userGet', loginVerify, (req, res) => {
    // res.send(req.user);
});

//USER: Get all staffs
router.get('/staffGet', pageVerify, async (req, res) => {
    const staffs = await Staff.find({});
    try{
        res.send(staffs);
    } catch(err){
        res.status(500).send(err);
    }
});

//Get all staffs by position
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

//Get user details during login
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

//Search for a user by first name, last name or username
let search = undefined;
router.post('/search-post', (req, res) => {
    search = req.body.search.toLowerCase().trim();
    try{
        res.send(search);
    } catch(err){
        res.status(400).send(err);
    }
});

router.get('/search-get', pageVerify, async (req, res) => {
    let result = await Staff.find({$or: [{firstName: search},{lastName: search},{username: search}]});
    if (result.length < 1){
        search = search.charAt(0).toUpperCase() + search.slice(1);
        result = await Staff.find({$or: [{firstName: search},{lastName: search},{username: search}]});
    }
    // else if (result.length < 1){
    //     const format = /[@]/;
    //     if (format.test(search)){
    //         search = search.toLowerCase();
    //         result = await Staff.find({username: search});
    //     }
    // }
    try{
        res.send(result);
    } catch(err){
        res.status(500).send(err);
    }
});

//Get user task of the moment
router.get('/taskget', async (req, res) => {
    let username = req.query.username;
    const staff = await Staff.findOne({username: username});
    // let task = staff.task
    res.send(staff);
});

//Update user taskCompleted to either true or false
router.post('/taskcompleted', async (req, res) => {
    let {username, completed} = req.body;
    if (completed === false){
        await Staff.findOneAndUpdate(
            {username:username},
            {taskCompleted: true},
            {useFindAndModify: false}
            )
    }
    if(completed === true){
        await Staff.findOneAndUpdate(
            {username:username},
            {taskCompleted: false},
            {useFindAndModify: false}
            )
    }
    res.send('');
})

//
const updateInfo = async (newInfo, db, user, pos ) => {
    if (newInfo !== undefined && newInfo !== null && newInfo !== ""){
        await Staff.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        if(pos === "cafeteria"){
            await Cafeteria.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "customer service"){
            await CustomerService.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "designer"){
            await Designer.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "engineer"){
            await Engineer.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "front desk"){
            await FrontDesk.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "human resources"){
            await HumanResources.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "manager"){
            await Manager.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "medical administrator"){
            await MedicalAdministrator.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "researcher"){
            await Researcher.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "sales representative"){
            await SalesRepresentative.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "secretary"){
            await Secretary.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "security"){
            await Security.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
        if(pos === "other"){
            await OtherStaff.findOneAndUpdate({username: user}, {[db]: newInfo}, {useFindAndModify: false});
        }
    }
}

//Edit user info
router.post('/edit-info', async (req, res) => {
    let { username, position, newUsername, newFirstName, newLastName, 
            newAge, newCountry, newAddress, newPhone, newEmail } = req.body;
            
    updateInfo(newFirstName, "firstName", username, position);
    updateInfo(newLastName, "lastName", username, position);
    if (newUsername !== undefined && newUsername !== null && newUsername !== ""){
        const userExists = await Staff.findOne({username: newUsername});
        if (userExists) return res.send({success: false, message: "Username taken"});
        updateInfo(newUsername, "username", username, position);
    }
    updateInfo(newAge, "age", username, position);
    updateInfo(newCountry, "country", username, position);
    updateInfo(newAddress, "address", username, position);
    updateInfo(newPhone, "phone", username, position);
    updateInfo(newEmail, "email", username, position);
    
    try {
        res.send({success: true, message: "Updated successfully"});
    } catch (error) {
        res.status(500).send(error.message)
    }
});

//Edit user picture
router.post('/edit-picture', parser.single("newPicture"), async (req, res) => {
        if (req.file !== undefined && req.file !== null && req.file !== ""){
            updateInfo(req.file.url, "picture", username, position);
            updateInfo(req.file.public_id, "picture_id", username, position);
        }
})

//Edit user password
router.post('/edit-password', async (req, res) => {
    let { username, position, password, newPassword } = req.body;

    const validStaff = await Staff.findOne({username: username})
    const validPass = await bcrypt.compare(password, validStaff.password)
    if(!validPass) return res.send({success: false, message: 'Wrong password'});

    const salt =  await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    if(newPassword !== undefined && newPassword !== null && newPassword !== ""){
        await Staff.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false})

        if(position === "cafeteria"){
            await Cafeteria.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "customer service"){
            await CustomerService.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "designer"){
            await Designer.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "engineer"){
            await Engineer.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "front desk"){
            await FrontDesk.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "human resources"){
            await HumanResources.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "manager"){
            await Manager.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "medical administrator"){
            await MedicalAdministrator.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "researcher"){
            await Researcher.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "sales representative"){
            await SalesRepresentative.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "secretary"){
            await Secretary.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "security"){
            await Security.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
        if(position === "other"){
            await OtherStaff.findOneAndUpdate({username: username}, {password: newPassword}, {useFindAndModify: false});
        }
    }

    try {
        res.send({success: true, message: "Updated successfully"});
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router;