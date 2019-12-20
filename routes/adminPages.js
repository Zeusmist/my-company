const router = require('express').Router();
const fetch = require('node-fetch');
const { adminLoginVerify, adminPageVerify } =  require('./verifyToken');
const { Staff, Cafeteria, CustomerService, Designer, Engineer, FrontDesk, 
    HumanResources, Manager, MedicalAdministrator, Researcher, SalesRepresentative, 
    Secretary, Security, OtherStaff } = require('../model/staff');
const { UserSession, AdminSession } = require('../model/session');

const findAndDelete = async (position, username) => {
    if(position == "cafeteria"){
        await Cafeteria.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "customer service"){
        await CustomerService.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "designer"){
        await Designer.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "engineer"){
        await Engineer.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "front desk"){
        await FrontDesk.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "human resources"){
        await HumanResources.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "manager"){
        await Manager.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "medical administrator"){
        await MedicalAdministrator.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "researcher"){
        await Researcher.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "sales representative"){
        await SalesRepresentative.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "secretary"){
        await Secretary.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "security"){
        await Security.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
    if(position == "other"){
        await OtherStaff.findOneAndDelete({username: username}, {useFindAndModify: false});
    }
}

//Initial Authentication for Admin
router.get('/adminGet', adminLoginVerify, (req, res) => {
    
});

//ADMIN: Get all staffs
router.get('/admin-staffGet', adminPageVerify, async (req, res) => {
    const staffs = await Staff.find({});
    try{
        res.send(staffs);
    } catch(err){
        res.status(500).send(err);
    }
});

//Get all users online
router.get('/admin-onlineGet', adminPageVerify, async (req, res) => {
    const staffs = await UserSession.find({});
    const admins = await AdminSession.find({});
    const online = {staffs: staffs, admins: admins};
    try{res.send(online);}
    catch(err){res.status(500).send(err);}
})

//Update user task
router.post('/admin-taskpost', async (req, res) => {
    let task = req.body.task;
    let username = req.body.username;
    await Staff.findOneAndUpdate(
        {username: username},
        {
            task: task,
            taskCompleted: false
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
        }
        );
});

//Change user position in Staff and transfer user from old Staff Position to new Staff Position
router.post('/admin-changeposition', async (req, res) => {
    const { username, newPosition } = req.body;
    const newP = req.body.newPosition.toLowerCase().trim();
    const position = req.body.position;
    const updated = await Staff.findOneAndUpdate({username: username}, 
        {position: newPosition}, 
        {new: true, useFindAndModify: false});
    findAndDelete(position, username);
    let staffPosition = undefined;
    if(newP == "cafeteria"){
        staffPosition = new Cafeteria({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "customer service"){
        staffPosition = new CustomerService({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "designer"){
        staffPosition = new Designer({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "engineer"){
        staffPosition = new Engineer({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "front desk"){
        staffPosition = new FrontDesk({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "human resources"){
        staffPosition = new HumanResources({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "manager"){
        staffPosition = new Manager({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "medical administrator"){
        staffPosition = new MedicalAdministrator({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "researcher"){
        staffPosition = new Researcher({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "sales representative"){
        staffPosition = new SalesRepresentative({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "secretary"){
        staffPosition = new Secretary({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "security"){
        staffPosition = new Security({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    if(newP == "other"){
        staffPosition = new OtherStaff({
            firstName: updated.firstName,
            lastName: updated.lastName,
            age: updated.age,
            gender: updated.gender,
            position: updated.position,
            country: updated.country,
            address: updated.address,
            email: updated.email,
            username: updated.username,
            password: updated.password,
            phone: updated.phone,
            picture: updated.picture,
            picture_id: updated.picture_id
        })
    }
    
    try{
        await staffPosition.save();
        res.send(updated)
    } catch(err){
        res.status(500).send(`Error is:${err}     Updated is: ${updated}`);
    }
})

//Delete User from Staff and Staff Position
router.post('/admin-deletestaff', async (req, res) => {
    let username = req.body.username;
    let position = req.body.position;

    await Staff.findOneAndDelete({username: username}, {useFindAndModify: false});
    findAndDelete(position, username);

    res.send('');
});

//Get all staffs by position
let position = undefined;
let positionLower = undefined;
router.post('/admin-staff-position-post', (req, res) => {
    position = req.body.position;
    try{
        res.send('');
    } catch(err){
        res.status(500).send(err);
    }
});

router.get('/admin-staff-position-get', adminPageVerify, async (req, res) => {
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

//Search for a user by first name, last name or username
let search = undefined;
router.post('/admin-search-post', (req, res) => {
    search = req.body.search.toLowerCase().trim();
    try{
        res.send(search);
    } catch(err){
        res.status(400).send(err);
    }
});

router.get('/admin-search-get', adminPageVerify, async (req, res) => {
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

//Get position staff count for chart data
router.get('/admin-chart-position-data', adminPageVerify, async (req, res) => {
    const ceo = await Staff.find({position: "CEO"});
    const cafeteria = await Staff.find({position: "Cafeteria"});
    const CS = await Staff.find({position: "Customer service"});
    const designer = await Staff.find({position: "Designer"});
    const engineer = await Staff.find({position: "Engineer"});
    const frontdesk = await Staff.find({position: "Front desk"});
    const HR = await Staff.find({position: "Human resources"});
    const manager = await Staff.find({position: "Manager"});
    const MA = await Staff.find({position: "Medical administrator"});
    const other = await Staff.find({position: "Other"});
    const researcher = await Staff.find({position: "Researcher"});
    const SR = await Staff.find({position: "Sales representative"});
    const secretary = await Staff.find({position: "Secretary"});
    const security = await Staff.find({position: "Security"});

    const labels = ["Cafeteria", "Customer service", "Designer", "Engineer", 
                    "Front desk", "HR", "Manager", "Medical admin", "Others", 
                    "Researcher", "Sales rep", "Secretary", "Security" ];
    const datasets = [{
        label: "Staffs",
        data: [cafeteria.length, CS.length, designer.length, engineer.length,
                frontdesk.length, HR.length, manager.length, MA.length, other.length, 
                researcher.length, SR.length, secretary.length, security.length
            ],
        backgroundColor: ['#fc4e03', '#18fc03', '#03f0fc', '#ad03fc', '#b56c4c', 
                            '#b5b24c', '#1d4f39', '#be72c2', '#f50505', '#5d05f5',
                            '#a5f3fa', '#fcff52', '#08242b'
                        ]
    }]
    // const chart = [labels, datasets];
    const chart = {labels: labels, datasets: datasets};

    try {
        res.send(chart);
    } catch (error) {
        res.status(500).send(error);
    }
})

//Get Completed and pending tasks
router.get('/admin-chart-task-data', adminPageVerify, async (rea, res) => {
    const completed = await Staff.find({taskCompleted: true});
    const pending = await Staff.find({taskCompleted: false});

    const labels = ["Completed","Pending"];
    const datasets = [{
        label: "Tasks",
        data: [completed.length, pending.length],
        backgroundColor: ['#09c902','#c90404']
    }];
    const chart = {labels: labels, datasets: datasets};

    try {
        res.send(chart);
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = router;