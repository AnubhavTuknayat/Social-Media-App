import jwt from "jsonwebtoken";

export const verifyToken = async (request,response,next)=>{
    try {
        let token = request.header("Authorization");
        console.log("Code reached here" , token)
        // if(!token){
        //     return response.status(500).send("Access Denied!")
        // }

        // if(token.startsWith("Bearer ")){
        //     token = token.split(' ')[1];
        // }

        // const verified = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = verified;
        
        next();

    } catch (err) {
        console.log("-----TOKEN NOT VERIFIED-----")
        console.log(err)
        return response.status(500).json({error:err.message})
    }
}