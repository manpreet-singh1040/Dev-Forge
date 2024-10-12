const githubAuth=(req,res,next)=>{
    console.log('Github Auth middleware');
    console.log(req.session);
    next();
}
module.exports = githubAuth;