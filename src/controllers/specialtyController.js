import specialtyService from "../services/specialtyService"

let createSpecialtyController = async (req, res) => {
    try {
        let info= await specialtyService.createSpecialtyService(req.body)
        return res.status(200).json(info)
    }catch(err){
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}

let handleGetAllSpecialty = async (req, res) => {
    try {
        let infoSpecialty = await specialtyService.getAllSpecialtyService()
        return res.status(200).json(infoSpecialty)
    }catch(err){
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}

module.exports ={
    createSpecialtyController: createSpecialtyController,
    handleGetAllSpecialty: handleGetAllSpecialty
}