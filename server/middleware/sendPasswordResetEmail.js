import nodemailer from 'nodemailer'

export const sendPasswordResetEmail = (token,email,name)=>{
    const html = `
    <html>
    <body>
    <h3>
    Dear ${name}
    </h3>
    <p>Kérjük, kattintson az alábbi linkre jelszava visszaállításához.</p>
    <a href="http://localhost:3000/password-reset/${token}">Kattints ide!</a>
    </body>
    </html>
    `
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
            user :'t0csa91@gmail.com',
            pass:'esbs okwt vbsy owtl'
        }
     })
     const mailOptions = {
		from: 't0csa91@gmail.com',
		to: email,
		subject: 'Évi ABC: Állítsa vissza a jelszókérést.',
		html: html,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log(`Email elküldve ${email}`);
			console.log(info.response);
		}
	});
};