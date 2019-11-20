const router = require('express').Router();
const { Staff, Cafeteria, CustomerService, Designer, Engineer, FrontDesk, 
    HumanResources, Manager, MedicalAdministrator, Researcher, SalesRepresentative, 
    Secretary, Security, OtherStaff } = require('../model/staff');
const Session = require('../model/session');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({success: false, message:error.details[0].message});
    
    let {position} = req.body;
    position = position.toLowerCase();

    const emailExists = await Staff.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send({success: false, message: "Email already in use"});
    
    const userExists = await Staff.findOne({username: req.body.username});
    if (userExists) return res.status(400).send({success: false, message: "Username taken"});
    
    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const staff =  new Staff({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        position: req.body.position,
        country: req.body.country,
        address: req.body.address,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        phone: req.body.phone,
        picture: req.body.picture
    });

    let staffPosition = undefined;
    if(position === "cafeteria"){
        staffPosition =  new Cafeteria({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        position: req.body.position,
        country: req.body.country,
        address: req.body.address,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        phone: req.body.phone,
        picture: req.body.picture
    });
    }
    if(position === "customer service"){
        staffPosition =  new CustomerService({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "designer"){
         staffPosition =  new Designer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "engineer"){
         staffPosition =  new Engineer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "front desk"){
         staffPosition =  new FrontDesk({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "human resources"){
         staffPosition =  new HumanResources({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "manager"){
         staffPosition =  new Manager({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "medical administrator"){
         staffPosition =  new MedicalAdministrator({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "researcher"){
         staffPosition =  new Researcher({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "sales representative"){
         staffPosition =  new SalesRepresentative({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "secretary"){
         staffPosition =  new Secretary({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
        });
    }
    if(position === "security"){
        staffPosition =  new Security({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        position: req.body.position,
        country: req.body.country,
        address: req.body.address,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        phone: req.body.phone,
        picture: req.body.picture
    });
    }
    if(position === "other"){
         staffPosition =  new OtherStaff({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            position: req.body.position,
            country: req.body.country,
            address: req.body.address,
            email: req.body.email,
            username: req.body.username,
            password: hashedPassword,
            phone: req.body.phone,
            picture: req.body.picture
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
})


//LOGIN
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({success: false, message: error.details[0].message});

    const validStaff = await Staff.findOne({username: req.body.username});
    if (!validStaff) return res.status(400).send({success: false, message: 'Username not registered'});

    const validPass = await bcrypt.compare(req.body.password, validStaff.password);
    if (!validPass) return res.status(400).send({success: false, message: "Wrong password"});

    // const token = jwt.sign({_id: validStaff._id}, process.env.TOKEN_SECRET);
    const session = new Session();
    session.staffId = validStaff._id
    await session.save((err, doc) => {
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
    
    await Session.deleteMany({isDeleted: true});
})

//LOGOUT
router.get('/logout', (req, res, next) => {
    const { token } = req.query;

    Session.findOneAndUpdate({
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