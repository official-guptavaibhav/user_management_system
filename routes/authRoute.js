const router = require("express").Router();
const User = require("../models/users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// Register User
router.post("/register", async(req,res)=>{
    const newUser =  new User({
            name: req.body.name,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD).toString(),
            profile_img: req.body.img,
            date_of_birth: req.body.dob,
    });

    try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    } catch(err){
    res.status(500).json(err);
    }

});

// Login User
router.post("/login", async (req,res)=>{
    try{
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(401).json("Invalid Email");

            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD);
            const currentPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            currentPassword !== req.body.password && res.status(401).json("Wrong Password");

            const accessToken = jwt.sign({
                id:user._id
            },process.env.JWT_SEC_KEY,
            { expiresIn:"3d" });

            const { password, ...others } = user._doc;

            res.status(200).json({ ...others, accessToken });
    }catch{
        ress.status(500).json(err);
    }
})


module.exports = router