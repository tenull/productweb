import nodemailer from 'nodemailer'
// esbs okwt vbsy owtl
// t0csa91@gmail.com

export const sendVerificationEmail = (token,email,name,id)=>{
    const html = `
    <html>
    <body>
        <h3>Kedves ${name}!</h3>
        <p>Köszönjük, hogy regisztrált az Évi ABC weboldalához!</p>
        <p>Az alábbi link segítségével igazolja vissza e-mail címét</p>
        <a href="http://localhost:3000/email-verify/${token}">Kattints ide!</a>
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
    subject: 'Erősítsd meg az e-mail címed!',
    html:html
 }
 transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error)
    } else {
        console.log(`Email elküldve ${email}`)
        console.log(info.response)
    }
 })
}