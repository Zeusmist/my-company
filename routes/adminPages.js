const router = require('express').Router();
const fetch = require('node-fetch');
const { adminLoginVerify, adminPageVerify } =  require('./verifyToken');
const { Staff, Cafeteria, CustomerService, Designer, Engineer, FrontDesk, 
    HumanResources, Manager, MedicalAdministrator, Researcher, SalesRepresentative, 
    Secretary, Security, OtherStaff } = require('../model/staff');

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

//Delete User from Staff and Staff Position
router.post('/admin-deletestaff', async (req, res) => {
    let username = req.body.username;
    let position = req.body.position;

    await Staff.findOneAndDelete({username: username});
    if(position == "cafeteria"){
        await Cafeteria.findOneAndDelete({username: username});
    }
    if(position == "customer service"){
        await CustomerService.findOneAndDelete({username: username});
    }
    if(position == "designer"){
        await Designer.findOneAndDelete({username: username});
    }
    if(position == "engineer"){
        await Engineer.findOneAndDelete({username: username});
    }
    if(position == "front desk"){
        await FrontDesk.findOneAndDelete({username: username});
    }
    if(position == "human resources"){
        await HumanResources.findOneAndDelete({username: username});
    }
    if(position == "manager"){
        await Manager.findOneAndDelete({username: username});
    }
    if(position == "medical administrator"){
        await MedicalAdministrator.findOneAndDelete({username: username});
    }
    if(position == "researcher"){
        await Researcher.findOneAndDelete({username: username});
    }
    if(position == "sales representative"){
        await SalesRepresentative.findOneAndDelete({username: username});
    }
    if(position == "secretary"){
        await Secretary.findOneAndDelete({username: username});
    }
    if(position == "security"){
        await Security.findOneAndDelete({username: username});
    }
    if(position == "other"){
        await OtherStaff.findOneAndDelete({username: username});
    }

    res.send('');
});



module.exports = router;