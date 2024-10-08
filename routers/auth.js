const {Router} = require("express")

const passport = require("passport")

const authRouter = Router();


authRouter.get("/login", (req,res)=>{
    res.render("login")
});
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
    req.logout(function(){
        req.flash('success_msg', 'You are logged out');
    });
    res.redirect('/login');
    req.flash('success_msg', 'You are logged out');
});

module.exports ={
    authRouter,
};