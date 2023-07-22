const nodemailer = require('nodemailer')
const fs = require("fs")

const sendEmailContact = async options =>{

    const transporter = nodemailer.createTransport({
        service: 'Gmail'
    })

    let attachments = {}

    if(options.file) {
        const fData = fs.readFileSync(options.file.path)
        attachments.filename = options.file.originalname,
        attachments.content = fData
    }

    const mailOptions = {
        from: `${options.name +''+  options.lastName} <${options.email}>`,
        to: process.env.EMAIL_ADMIN,
        subject: options.subject,
        text: options.body,
        attachments
    }

    await transporter.sendMail(mailOptions)
}

module.exports = {
    sendEmailContact
}