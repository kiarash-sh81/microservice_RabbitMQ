const jwt = require('jsonwebtoken');

async function isAuthentication(req, res, next){
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        jwt.verify(token , "secretKey" , (error , payload)=>{
            if(error) return {error: error.message};
            req.user = payload;
            next();
        })
    } catch (error) {
        return res.json({error: error.message})
    }
}

module.exports ={
    isAuthentication
}