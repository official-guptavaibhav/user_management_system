const router = require("express").Router();
const users = require("../models/users");
const { verify, verifyTokenAndAuthorization } = require("./verifyToken");


// Fetching User Profile
router.get("/find/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const user = await users.findById(req.params.id)
        const { password, ...others } = user._doc;

            res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
});


// Fetching User using Search Filter
router.get("/find/", verifyTokenAndAuthorization, async (req,res)=>{
        try{
            const search = " " ;
            if(req.query.search){
                search = req.query.search;
            }

            const user = await users.find({
               $or:[
                    { name: { $regex: '.*' +search+ '.*', $options: 'i' } },
                    { email: { $regex: '.*' +search+ '.*', $options: 'i' } }
                ]
            });

            res.status(200).json(user);
        }catch{
            res.status(500).json(err);
        }
})

module.exports = router