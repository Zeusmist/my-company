const router = require('express').Router();
const { Staff, Cafeteria, CustomerService, Designer, Engineer, FrontDesk, 
    HumanResources, Manager, MedicalAdministrator, Researcher, SalesRepresentative, 
    Secretary, Security, OtherStaff } = require('../model/staff');
const { UserSession, AdminSession } = require('../model/session');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

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

//REGISTER
router.post('/register', parser.single("picture"), async (req, res) => {
    
    //Check validation for errors    
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({success: false, message:error.details[0].message});
    
    //Get the position
    let {position} = req.body;
    position = position.toLowerCase();

    //Check if the email already exists
    const emailExists = await Staff.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send({success: false, message: "Email already in use"});
    
    //Check if the username already exists
    const userExists = await Staff.findOne({username: req.body.username});
    if (userExists) return res.status(400).send({success: false, message: "Username taken"});
    
    //Hash the password
    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //Create the user in Staff collection
    const staff =  new Staff({
        firstName: req.body.firstName.toLowerCase().trim(),
        lastName: req.body.lastName.toLowerCase().trim(),
        age: req.body.age,
        gender: req.body.gender,
        position: req.body.position,
        country: req.body.country.toLowerCase().trim(),
        address: req.body.address.toLowerCase().trim(),
        email: req.body.email.toLowerCase().trim(),
        username: req.body.username.toLowerCase().trim(),
        password: hashedPassword,
        phone: req.body.phone,
        picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
        picture_id: req.file ? req.file.public_id : null
    });

    //Save the user in appropriate position collection depending on the position
    let staffPosition = undefined;
    if(position === "cafeteria"){
        staffPosition =  new Cafeteria({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
    });
    }
    if(position === "customer service"){
        staffPosition =  new CustomerService({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "designer"){
         staffPosition =  new Designer({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "engineer"){
         staffPosition =  new Engineer({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "front desk"){
         staffPosition =  new FrontDesk({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "human resources"){
         staffPosition =  new HumanResources({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "manager"){
         staffPosition =  new Manager({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "medical administrator"){
         staffPosition =  new MedicalAdministrator({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "researcher"){
         staffPosition =  new Researcher({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "sales representative"){
         staffPosition =  new SalesRepresentative({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "secretary"){
         staffPosition =  new Secretary({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    if(position === "security"){
        staffPosition =  new Security({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
    });
    }
    if(position === "other"){
         staffPosition =  new OtherStaff({
            firstName: req.body.firstName.toLowerCase().trim(),
            lastName: req.body.lastName.toLowerCase().trim(),
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country.toLowerCase().trim(),
            address: req.body.address.toLowerCase().trim(),
            email: req.body.email.toLowerCase().trim(),
            username: req.body.username.toLowerCase().trim(),
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.file ? req.file.url : "https://res.cloudinary.com/mca/image/upload/v1576076082/profilePicDefault_yhmu4y.png",
            picture_id: req.file ? req.file.public_id : null
        });
    }
    try{
        await staff.save();
        await staffPosition.save();
        res.send({success: true, message: "Staff created"});
    }
    catch(err){
        res.status(400).send(err)
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({success: false, message: error.details[0].message});

    const validStaff = await Staff.findOne({username: req.body.username.toLowerCase().trim()});
    if (!validStaff) return res.status(400).send({success: false, message: 'Username not registered'});

    const validPass = await bcrypt.compare(req.body.password, validStaff.password);
    if (!validPass) return res.status(400).send({success: false, message: "Wrong password"});

    const userSession = new UserSession();
    userSession.staffId = validStaff._id
    await userSession.save((err, doc) => {
        if(err)
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });

        return res.send({
            success: true,
            message: 'Valid sign in',
            token: doc._id
        })
    })  
    await UserSession.deleteMany({isDeleted: true});
});

//ADMIN LOGIN
router.post('/admin-login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({success: false, message: error.details[0].message});

    let validStaff = await HumanResources.findOne({username: req.body.username.toLowerCase().trim()});
    if(!validStaff){
        validStaff = await Engineer.findOne({username: req.body.username.toLowerCase().trim()})
        if(!validStaff){
            validStaff = await Manager.findOne({username: req.body.username.toLowerCase().trim()})
            if (!validStaff) return res.status(400).send({success: false, message: 'Not an admin'});
        }
    }

    const validPass = await bcrypt.compare(req.body.password, validStaff.password);
    if (!validPass) return res.status(400).send({success: false, message: "Wrong password"});

    const adminSession = new AdminSession();
    adminSession.staffId = validStaff._id
    await adminSession.save((err, doc) => {
        if(err)
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });

        return res.send({
            success: true,
            message: 'Valid sign in',
            token: doc._id
        })
    })
    await AdminSession.deleteMany({isDeleted: true});
});

//LOGOUT
router.get('/logout', (req, res, next) => {
    const { token } = req.query;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: {isDeleted: true}
    }, {useFindAndModify: false}, (err, session) => {
        if(err)
            return res.send({
                success: false,
                message: 'Error: Server error'
            });

        return res.send({
            success: true,
            message: 'Good'
        });
    });
});

//ADMIN LOGOUT
router.get('/admin-logout', (req, res, next) => {
    const { token } = req.query;

    AdminSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: {isDeleted: true}
    }, {useFindAndModify: false}, (err, session) => {
        if(err)
            return res.send({
                success: false,
                message: 'Error: Server error'
            });

        return res.send({
            success: true,
            message: 'Good'
        });
    });
});

module.exports = router;