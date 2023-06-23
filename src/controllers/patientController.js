import patientService from "../services/patientService"

let postBookingAppointment = async (req, res) => {
    try {
        let infoDoctor = await patientService.postBookingAppointmentService(req.body)
        return res.status(200).json(infoDoctor)
    }catch(err){
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}

let postVerifyBookingAppointment = async (req, res) => {
    try {
        let infoDoctor = await patientService.postVerifyBookingAppointmentService(req.body)
        return res.status(200).json(infoDoctor)
    }catch(err){
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}

module.exports = {
    postBookingAppointment: postBookingAppointment,
    postVerifyBookingAppointment: postVerifyBookingAppointment
};