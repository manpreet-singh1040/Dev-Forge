const loginAuth = async (req, res, next) => {
    try {
        console.log(`loginAuth`);
        console.log(req.params);
        if(req.params){
            req.body.params=req.params;
        }
        const jwt=require('jsonwebtoken');
        const sessionToken = req.cookies.sessionToken;
        if(!sessionToken){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
        req.body.userId = decoded.userId;
        console.log(`decoded ${req.body.userId}`);
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = loginAuth;