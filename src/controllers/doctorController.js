import  doctorService from "../services/doctorService"


let handleGetTopDoctorHome =async (req, res) => {
    let limit = req.query.limit
    if(!limit) limit = 10
    try{
        let response = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}

let handleGetAllDoctors = async (req, res) => {
    try{
        let doctors = await doctorService.getAllDoctors()
        return res.status(200).json(doctors)
    }catch(err){
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}

let handleSaveInfoDoctors = async(req, res) => {
    try {
        let infoDoctor = await doctorService.saveDetailInfoDoctor(req.body)
        return res.status(200).json(infoDoctor)
    }catch(err){
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}
module.exports = {
    handleGetTopDoctorHome: handleGetTopDoctorHome,
    handleGetAllDoctors: handleGetAllDoctors,
    handleSaveInfoDoctors: handleSaveInfoDoctors

}