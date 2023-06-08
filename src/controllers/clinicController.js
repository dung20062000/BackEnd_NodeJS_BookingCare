import  clinicService from "../services/clinicService"

let createClinicController = async(req, res) => {
    try {
        let info = await clinicService.createClinicService(req.body)
        return res.status(200).json(info)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}

let handleGetAllClinic = async(req, res) => {
    try {
        let info = await clinicService.handleGetAllClinicService()
        return res.status(200).json(info)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}

let handleGetDetailClinicById = async(req, res) => {
    try {
        let info = await clinicService.handleGetDetailClinicByIdService(req.query.id)
        return res.status(200).json(info)
    }catch(err){
        console.log(err);
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}

module.exports ={
    createClinicController: createClinicController,
    handleGetAllClinic: handleGetAllClinic,
    handleGetDetailClinicById: handleGetDetailClinicById,
}
