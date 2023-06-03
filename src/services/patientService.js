import db from "../models/index";
import emailService from "./emailServices";
require('dotenv').config()

let postBookingAppointmentService = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.email 
                || !data.doctorId 
                || !data.timeType 
                || !data.date 
                || !data.fullName
                
                ){
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter"
                })
            }else{
                await emailService.sendSimpleEmail({
                    receiversEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: 'https://www.npmjs.com/package/nodemailer'
                })

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                })
                // console.log('cheecj user created ', user[0])
                if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id
                        },
                        defaults: {
                            statusId:'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }


                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: "save patient information  successfully",
                })
            }
        }catch(err){
            reject(err)
        }
    })
};

module.exports = {
    postBookingAppointmentService: postBookingAppointmentService
}