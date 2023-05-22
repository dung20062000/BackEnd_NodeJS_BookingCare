import  doctorService from "../services/doctorService"


let handleGetTopDoctorHome =async (req, res) => {
    let limit = req.query.limit
    if(!limit) limit = 10
    try{
        let doctors = await doctorService.getTopDoctorHome(limit)
    }catch(err){
        console.log(err)
        res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })
    }
}


module.exports = {
    handleGetTopDoctorHome: handleGetTopDoctorHome

}