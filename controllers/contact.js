const nodemailer=require("nodemailer")

const sendMail=async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.qualabels.com",
      // port: 465,
      // secure: true, // true for 465, false for 587
      port: 587,
  secure: false,
      auth: {
        user: "noreply@qualabels.com",
        pass: "Admin@#2010",
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: ["info@QuaLabels.com","wanofi.israel@qualabels.com"],
      replyTo: email,
      subject: "New Contact From Qualabels.com",
      html: `
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email",error });
  }
}


module.exports={
    sendMail
}