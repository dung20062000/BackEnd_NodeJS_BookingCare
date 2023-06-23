require("dotenv").config();
const nodemailer = require("nodemailer"); // = import nodemailer from "nodemailer

let sendSimpleEmail = async (dataSend) => {
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
        html: getBodyHTMLEmail(dataSend),
    });
};

let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `
    <h3>Xin Chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đặt lịch khám bệnh trên BOOKINGCARE with BÙI TIẾN DŨNG</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời Gian: ${dataSend.time}</b></div>
    <div><b>bác Sĩ: ${dataSend.doctorName}</b></div>


    <p>Để xác nhận các thông tin trên, bạn hãy ấn vào link dưới để hoàn tất </p>
    <div>
      <a href=${dataSend.redirectLink}>Click Here</a>
    </div>

    <div>Xin chân thành cảm ơn !</div>
    `;
    }
    if (dataSend.language === "en") {
        result = `
    <h3>Dear: ${dataSend.patientName}</h3>
    <p>You received this email because you booked a medical appointment on BOOKINGCARE with BUI TIEN DUNG</p>
    <p>Information to schedule an appointment:</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>


    <p>To confirm the above information, please click on the link below to complete </p>
    <div>
      <a href=${dataSend.redirectLink}>Click Here</a>
    </div>

    <div>Sincerely thank !</div>
    `;
    }
    return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `
    <h3>Xin Chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì hoàn thành lịch khám bệnh trên BOOKINGCARE with BÙI TIẾN DŨNG</p>

    <p>Thông tin đơn thuốc và hóa đơn được gửi trong File đính kèm: </p>

    <div>Xin chân thành cảm ơn !</div>
    `;
    }
    if (dataSend.language === "en") {
        result = `
    <h3>Dear: ${dataSend.patientName}</h3>
    <p>You received this email because you completed the above medical appointment on BOOKINGCARE with BUI TIEN DUNG</p>

    <p>Prescription information and invoices are sent in the attached file</p>

    <div>Sincerely thank !</div>
    `;
    }
    return result;
};

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
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
                to: dataSend.email, // list of receivers
                subject: "Kết quả lịch khám bệnh ✔", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        // encoded string as an attachment
                        filename: `remedy-${dataSend.patientId}- ${new Date().getTime()}.png`,
                        content: dataSend.imageBase64.split("base64,")[1],
                        encoding: 'base64'
                    },
                ],
            });

            resolve(true)
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    sendSimpleEmail,
    sendAttachment,
};
