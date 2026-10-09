import generateOTP from "../utils/otp.js";
import sendOTPEmail from "../utils/emailSend.js";
import OTP from "../models/otpModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 2. Check user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 3. Generate OTP
    console.time("OTP generate");
    const otp = generateOTP();
    if (!otp) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate OTP",
      });
    }
    console.timeEnd("OTP generate");
    // 4. Update existing OTP or create new OTP
    console.time("OTP DB");
    await OTP.findOneAndUpdate(
      { email },
      {
        email,
        otp,
        createdAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      },
    );

    // 5. Send OTP to email

    console.timeEnd("OTP DB");

    console.time("SEND EMAIL");
    const emailSent = await sendOTPEmail(email, otp);
    console.timeEnd("SEND EMAIL");

    // 6. If email failed
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP",
      });
    }

    // 7. Success
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    // Check fields
    if (!name || !email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Get latest OTP only
    const otpRecord = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // OTP not found / expired
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "OTP not found or expired",
      });
    }

    // Check OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,

      email,
      password: hashedPassword,
    });

    // Delete OTP after successful signup
    await OTP.deleteOne({
      _id: otpRecord._id,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not Found, Please Sign Up",
      });
    }

    // 3. Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Create JWT token
    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5. Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
   
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
  
    
    return res.status(200)
              .json({
                success:true,
               
               message: "Admin Login",
                token,
              })
  }
  else{
    return res.status(401).json({
        success:false,
        message:"email or password is not match"

    })
  }
};
export { sendOTP, signup, login, adminLogin };
