import nodemailer from "nodemailer";
const user=process.env.user;
const pass=process.env.pass;
const nodemail=async  (to, message) => {
  
   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">

      <div style="padding: 20px;">
        <p>Hello ${to},</p>
        <p><b> ${message}</b></p>
        <p>Thank you for your time. We will get back to you soon!</p>
        <p style="margin-top: 20px;">Best Regards,<br/>The Patra Team</p>
      </div>
      <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #777;">
        <p>&copy; 2024 Patra Inc. All rights reserved.</p>
        <p>
          <a href="#" style="color: #4CAF50; text-decoration: none;">Privacy Policy</a> |
          <a href="#" style="color: #4CAF50; text-decoration: none;">Terms of Service</a>
        </p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"Patra Support Team" <patrapritiranjan957@gmail.com>',
      to,
      subject:'Your Job Status Changed',
      text: message,
      html: emailTemplate, 
    });

  } catch (error) {
    console.error("Error sending email:", error.message);
 
  }
}
export default nodemail;