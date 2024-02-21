import nodemailer from 'nodemailer'
// esbs okwt vbsy owtl
// t0csa91@gmail.com

export const sendVerificationEmail = (token,email,name,id)=>{
    const html = `
    <html>
    <body>
        <h3>Dear ${name}</h3>
        <p>Thanks for signing up at Tech Lines!</p>
        <p>Use the link below to verify your email</p>
        <a href="http://localhost:3000/email-verify/${token}">Click here!</a>
    </body>
    </html>
    `
 const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user :'t0csa91@gmail.com',
        pass:'esbs okwt vbsy owtl'
    }
 })
 const mailOptions = {
    from: 't0csa91@gmail.com',
    to:email,
    subject: 'Verify your email address',
    html:html
 }
 transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error)
    } else {
        console.log(`Email send to ${email}`)
        console.log(info.response)
    }
 })
}