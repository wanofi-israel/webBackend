const nodemailer=require("nodemailer")

const sendMail=async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      // host: "mail.qualabels.com",
      // port: 465,
      // secure: true, // true for 465, false for 587
  
      //     port: 587,
  // secure: false,

  host: "smtp.gmail.com",
  port: 465,
  secure: true,
      auth: {
        user: "wanofiisrael17@gmail.com",
        // pass: "Admin@#2010",
        pass: "niqm gbav yiyn khtg",
      },
  tls: { rejectUnauthorized: false },
    });

    await transporter.verify()
  .then(() => console.log("SMTP ready"))
  .catch(err => console.error("SMTP cannot connect:", err));

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