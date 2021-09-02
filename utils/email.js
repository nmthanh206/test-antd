import nodemailer from "nodemailer";
// import pug from "pug";
import { convert } from "html-to-text";

export default class Email {
   constructor(user, url) {
      this.to = user.email;
      this.firstName = user.name.split(" ")[0];
      this.url = url;
      // this.from = `cu li <${process.env.EMAIL_FROM}>`;
      this.from = `cu li <$culi@example.com>`;
      // console.log(this);
   }

   async newTransport() {
      const tranporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: "nmth206@gmail.com",
            pass: "",
         },
      });
      return tranporter;
   }

   // Send the actual email
   async send(template, subject) {
      const html = ` <h5>account Name:${this.firstName}</h5> <h5>Click this link to reset your password <a>${this.url}</a></h5> <h5>${subject}</h5>`;
      // const html = ` <h1>${this.url}</h1>`;
      // const html = ` 123213`;

      const mailOptions = {
         from: this.from,
         to: this.to,
         subject,
         html,
         text: convert(html),
      };
      console.log(mailOptions);

      // 3) Create a transport and send email

      // await this.newTransport().then((fun) => fun.sendMail(mailOptions));
      const transporter = await this.newTransport();
      const result = await transporter.sendMail(mailOptions);
      console.log(result);
   }

   async sendWelcome() {
      await this.send("welcome", "Welcome to the Natours Family!");
   }

   async sendPasswordReset() {
      await this.send(
         "passwordReset",
         "Your password reset token (valid for only 10 minutes)"
      );
   }
}
