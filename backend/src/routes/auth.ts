import express, {Response, Request} from "express"
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import verifyToken from "../middleware/auth";
import cors from "cors";


const router = express.Router();
app.use(cors());

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password should be more then 6 charectors").isLength({min:6}),
], async (req:Request, res:Response)=>{
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }

    const {email, password} = req.body;

    try {

        const user =await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "invalid credentinals"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "invalid credentinals"});
        }

        const token = jwt.sign({userId:user.id}, 
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn:"1d"
                }
            );

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000
            });
            res.status(200).json({userId: user._id});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
        
    }
})

router.get("/validate-token", verifyToken, (req: Request, res: Response)=>{
    res.status(200).send({usedId: req.userId });
})

router.post("/logout", (req: Request, res: Response)=> {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    });
    res.send();
});

export default router;
