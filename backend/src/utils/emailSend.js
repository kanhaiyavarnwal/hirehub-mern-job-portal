import nodemailer from "nodemailer";


const sendOTPEmail = async (email, otp) => {
  try {
    // console.log("email send page")
     const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    const info = await transporter.sendMail({
      from: `"Job Portal" <${"XYZ company"}>`,
      to: email,
      subject: "Job Portal - OTP Verification",
      html: `
        <div>
          <h2>OTP Verification</h2>

          <p>Your OTP for Job Portal registration is:</p>

          <h1>${otp}</h1>

          <p>This OTP is valid for <strong>10 minutes</strong>.</p>

          <p>Please do not share this OTP with anyone.</p>
        </div>
      `,
    });

    // console.log("OTP email sent:", info);

    return info;
  } catch (error) {
    console.log("Error sending OTP email:", error.message);
    throw error;
  }
};
export default sendOTPEmail;