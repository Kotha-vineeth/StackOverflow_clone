import jwt from 'jsonwebtoken'

//This funcn checks if user id who has logged in has valid jwt token or not.
//If it is valid only,then goto next else console the error
const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        
        //test is secret key(signature) we have used in jwt while creating the token(in auth.js in controllers folder)
        let decodeData = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decodeData?.id

        next();
    }catch(error){
        console.log(error)
    }
}
export default auth;
