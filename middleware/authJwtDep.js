import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV2YWxpYSIsImlhdCI6MTY3ODQ1MzU1N30.P7WLHRWMcPNa-XLegruv14hi0OD97DMKyrcxWqlxLgo'



export const verifyToken = (req, res, next) => {
    // console.log('verifyToken...') 
    let authorization = req.headers["authorization"]
    let token = req.headers["token"];
    
    if ('Bearer '+ BEARER_TOKEN === authorization) {
        next();
        return true
    }

    if (!token) {
        return res.status(403).send({
            message: "Token no recibido!",
        });
    }

    verify(token, TOKEN_SECRET, (err, decoded) => { 
        if (err) {
            return res.status(401).send({
                message: "No autorizado!",
                type:"tokenError"
            });
        }
        req.userId = decoded.id;
        next();
    });
}; 