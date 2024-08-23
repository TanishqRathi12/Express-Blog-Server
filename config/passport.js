const LocalStrategy = require("passport-local").Strategy;
const { Author } = require("../models/auth");

module.exports = function (passport) {

  passport.serializeUser((author, done) => {
    done(null, author.id);
  });

  passport.deserializeUser((id, done) => {
    try{
      const author = Author.findById(id);
      done(null, author);
    }catch(err){
      done(err)
    }
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
         
          const author = await Author.findOne({ email });
          if (author) {
            return done(
              null,
              false,
              req.flash("signup message", "This email is already taken")
            );
          }

      
          const newAuthor = new Author({
            name: req.body.user,
            email,
            password, 
          });

    
          await newAuthor.save();
          return done(null, newAuthor);
        } catch (err) {
          return done(err);
        }
      }
    )
  );


  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
        
          const author = await Author.findOne({ email } || {name:email});
          if (!author) {
            return done(null, false, req.flash("login message", "No user found"));
          }

          
          const isMatch = await author.comparePassword(password);
          if (!isMatch) {
            return done(null, false, req.flash("login message", "Email and Password did not match"));
          }

         
          return done(null, author);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
