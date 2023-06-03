require('dotenv').config()
const nodemailer = require("nodemailer"); // = import nodemailer from "nodemailer


let sendSimpleEmail = async(dataSend) => {
// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // tai khoan email de thuc hien gui
      pass: process.env.EMAIL_APP_PASSWORD, // tai khoan email de thuc hien gui
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bui Tien Dung 👻" <dungdevnd@gmail.com>', // sender address
    to: dataSend.receiversEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
    html: `
    <h3>Xin Chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đặt lịch khám bệnh trên BOOKINGCARE with BÙI TIẾN DŨNG</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời Gian: ${dataSend.time}</b></div>
    <div><b>bác Sĩ: ${dataSend.doctorName}</b></div>


    <p>Để xác nhận các thông tin trên, bạn hãy ấn vào l;ink dưới để hoàn tất </p>
    <div>
      <a href=${dataSend.redirectLink}>Click Here</a>
    </div>

    <div>Xin chân thành cảm ơn !</div>
    `, // html body
  });
}


// async..await is not allowed in global scope, must use a wrapper
async function main() {

  

}

module.exports = {
    sendSimpleEmail
};