import { User } from "../models/User.models.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
       
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return(

                res.status(400).json({
                    message: "Something is missing ",
                    success: false
                    
                    
                }))
                
            
        };
       
        

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname:fullname,
            email,
            phoneNumber,
            password: hashedPassword,  
            role       
            
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// log in 


export const login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Validation: Ensure all required fields are present
      if (!email || !password || !role) {
        return res.status(400).json({
          status: '400 Bad Request',
          success: false,
          message: 'Email, password, and role are required',
        });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          msg: 'User not found',
          success: false,
        });
      }
  
      console.log("User found:", user); // Debug log to inspect the user object
  
      // Password comparison
      const passwordMatch = await bcrypt.compare(password, user.password); // Ensure correct field
      if (!passwordMatch) {
        return res.status(403).json({
          msg: 'Invalid password',
          success: false,
        });
      }
  
      // Role check
      if (role !== user.role) {
        return res.status(403).json({
          msg: 'Role is invalid',
          success: false,
        });
      }
  
      // Generate JWT token
      const tokenData = { userId: user._id };
      const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
  
      // Prepare user object for response
      const userResponse = {
        userId: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      };
  
      // Send response with token and user info
      return res.status(200).cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
        httpOnly: true,
        sameSite: 'strict',
      }).json({
        message: `Welcome back ${userResponse.fullname}`,
        user: userResponse,
        success: true,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: '500 Internal Server Error',
        success: false,
        message: 'An error occurred during login.',
      });
    }
  };

  
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
     




        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id;
         // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }



        // updating data
        if(fullname) user.fullname=fullname
        if(email) user.email = email
        if(phoneNumber)  user.phonenumber =phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
       


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout= async(req,res) => {
try{

  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out successfully.",
    success: true
})



}catch(e){
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    message: "Logged out error.",
    success: true
})
}}

