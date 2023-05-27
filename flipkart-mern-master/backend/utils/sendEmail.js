// const nodeMailer = require('nodemailer');
const dotenv = require('dotenv')
const sgMail = require('@sendgrid/mail')
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {

    // const transporter = nodeMailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: process.env.SMTP_PORT,
    //     service: process.env.SMTP_SERVICE,
    //     auth: {
    //         user: process.env.SMTP_MAIL,
    //         pass: process.env.SMTP_PASSWORD,
    //     },
    // });

    // const mailOptions = {
    //     from: process.env.SMTP_MAIL,
    //     to: options.email,
    //     subject: options.subject,
    //     html: options.message,
    // };

    // await transporter.sendMail(mailOptions);
    // console.log("hefkjdnjvndkvn");
    // console.log(options.data);
    // console.log("hefkjdnjvndkvn");
    const msg = {
        to: options.email,
        from: process.env.SENDGRID_MAIL,
        templateId: process.env.SENDGRID_RESET_TEMPLATEID,
        dynamic_template_data: options.data,
    }
    sgMail.send(msg).then(() => {
        console.log(options.data)
    }).catch((error) => {
        console.error(error)
    });
};

module.exports = sendEmail;