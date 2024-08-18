const {Router} = require("express")
//const { verifyToken } = require("../middleware/authmiddle")
//const authController = require("../controllers/auth.controller")
const passport = require("passport")

const authRouter = Router();


authRouter.get("/login", (req,res)=>{
    res.render("login")
});
// authRouter.post("/signup",authController.signUp)
authRouter.post("/login",passport.authenticate('local-login',{
    successRedirect:"/blog",
    failureRedirect:"/signup",
    failureFlash:true,
})
);

authRouter.get("/signup",(req,res)=>{
    res.render("signup");
})

authRouter.post("/signup",passport.authenticate('local-signup',{
    successRedirect:"/blog",
    failureRedirect:"/signup",
    failureFlash:true,
})
);

authRouter.post('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    return res.redirect('/login')
})

module.exports ={
    authRouter,
};