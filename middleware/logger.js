const logger = (req ,res ,next) =>{
    //TODOS:
    // 1.logtime
    // 2.log req.url
    // 3.log req.body
    console.log({Timestamp :new  Date().toTimeString() ,
        url:req.url ,
        method:req.method,
        body:req.body,
    })
    // call next()
    next();
}

module.exports ={
    logger,
}