import db from "../models/index";
require('dotenv').config()
import emailService from "./emailServices";
import { v4 as uuidv4 } from 'uuid';


let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
    // buildUrlEmail(data.doctorId)
}

let postBookingAppointmentService = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.email 
                || !data.doctorId 
                || !data.timeType 
                || !data.date 
                || !data.fullName
                || !data.selectedGender
                || !data.address
                
                ){
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter"
                })
            }else{
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    receiversEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token),
                })

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: {
                        email: data.email
                    },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        address: data.address,
                        gender: data.selectedGender,
                        firstName: data.fullName
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
                            timeType: data.timeType,
                            token: token
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

let postVerifyBookingAppointmentService = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if( !data.doctorId || !data.token ){
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter"
                })
            }else{
                let appointment = await db.Booking.findOne({
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        statusId:'S1'
                    },
                    raw: false
                })
                if(appointment){
                    appointment.statusId = "S2"
                    await appointment.save()
                    
                    resolve({
                        errCode: 0,
                        errMessage: "verify appointment successfully",
                    })
                }else{
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist"
                    })
                }
            }
        }catch(err){
            reject(err)
        }
    })
}

module.exports = {
    postBookingAppointmentService: postBookingAppointmentService,
    postVerifyBookingAppointmentService: postVerifyBookingAppointmentService
}