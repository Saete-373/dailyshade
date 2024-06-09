const nodemailer = require("nodemailer");

module.exports = async(email, subject, htmlContent)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: 'tsittidet@gmail.com',
                pass: 'iisvscknelxpsegs',
        },
        })
        await transporter.sendMail({
            from: 'tsittidet@gmail.com',
            to: email,
            subject: subject,
            html: htmlContent,
        })
        console.log("Email sent Successfully",email);
    }catch(err){
        console.log("Email not send", err);
    }
}