const { hashPassword, comparePassword } = require("../helpers/authHelper")
const userModel = require ("../models/userModel")
const JWT = require('jsonwebtoken')

//REGISTER
const registerControler = async (req,res) => {
    try {
        const {name,email,password} = req.body
        //validation
        if (!name){
            return res.status(400).send({
                success: false,
                message : 'name is required'
            })
        }
        if (!email){
            return res.status(400).send({
                success: false,
                message : 'email is required'
            })

        }if (!password || password.length < 6 ){
            return res.status(400).send({
                success: false,
                message : 'password is required and 6 character needed'
            })
        }
        //exsisitng user
        const exsisitngUser = await userModel.findOne({email})
        if(exsisitngUser){
            return res.status(500).send({
                success : false,
                message : 'User alredy registerd with this Email'
            })
        }
        // hashed password
        const hashedPassword= await hashPassword(password)

        //save user
        const user = await userModel({name,email,password: hashedPassword }).save()
        res.status(201).send({
            success :true,
            message : 'Registered succesfully please log in'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : 'Error in Register api',
            error,
        })
        
    }

}


//LOGIN
const loginControler = async (req, res) => {
    try {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(500).send({
                success :false,
                message :"please provide email or password"
            })
        }
        // find user
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(500).send({
                success : false,
                message : "User not found"
            })
        }
        // match password
        const match = await comparePassword(password , user.password)
        if(!match){
            return res.status(500).send({
                success : false,
                message : 'invalid username or password'
            })
        }
        // TOKEN JWT
        const JWT_SECRET = 'jjvjndjnvjdnvo'
        const token = await JWT.sign({_id:user._id},JWT_SECRET,{
            expiresIn :'7d'
        })
        // undefine password
        user.password = undefined
        res.status(200).send({
            success: true,
            message :'login Successfully',
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : 'Error in login api',
            error
        })
    }

}

module.exports = {registerControler, loginControler};