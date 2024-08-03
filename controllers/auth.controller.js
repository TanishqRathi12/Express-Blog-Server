// const Auth = require("../models/auth");


// const getSignup = (req,res)=>{
//     res.render("sign-up");
// }

// const postSignup = async (req,res)=>{
//     const {user,password} = req.body;
//     if(user && password){
//         const auth = new Auth({user,password})
//     try{
//         await auth.save();
//         res.redirect("/login");
//     }catch(err){
//         console.error(err);
//         res.status(500).send("Server Error")
//     }
//     }
//     else{
//         res.status(400).send("All fields are required");
//     }
// }

// const getLogin = (req,res)=>{
//     res.render("login");
// }

// const postLogin = async (req,res)=>{
//     const {user,password} = req.body;
//     if(user && password){
//         try{
//             const user = await Auth.findOne({user});
//             if(user){
//                 if(user.password === password){
//                     req.session.user = user;
//                     res.redirect("/blog");
//                 }
//                 else{
//                     res.status(400).send("Invalid Credentials");
//                 }
//             }
//             else{
//                 res.status(400).send("User not found");
//             }
//         }
//         catch(err){
//             res.status(500).send("Server Error");
//         }
//     }
//     else{
//         res.status(400).send("All fields are Required")
//     }
// }


// module.exports = {
//     getSignup,
//     getLogin,
//     postSignup,
//     postLogin,
// }