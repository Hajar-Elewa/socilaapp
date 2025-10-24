import nodemailer from "nodemailer"

export const SendEmail = ({ to, subject, html }: { to: string, subject: string, html: string }) => {
  const transportOptions = {
    host: 'smtp.ethereal.email',
    port: 465,
    secure: true,
    service:"gmail", 
    auth: {
       user: process.env.EMAIL,
       pass: process.env.PASS
},
 tls:{rejectUnauthorized:false}//to solve some problems of secuirty related of email
  }
  const transporter = nodemailer.createTransport(transportOptions)
  const main = async () => {
    const info = await transporter.sendMail({
      from: `Social App${process.env.EMAIL}`,
      to,
      subject,
      html
    })
  }
  main().catch((error)=>{
    console.log(error)
  })
}