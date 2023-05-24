import db from "../models/index";

//lấy thông tin bác sĩ nổi bật 
let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {roleId: 'R2'},
                order: [["createdAt", "DESC"]],   //sắp xếp theo ngày tạo
                attributes: {
                    exclude: ["password"] //loại bỏ password ra khỏi obj trả về
                },
                include: [
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
                ],
                raw: true,
                nest: true

            });
            resolve({
                errCode: 0,
                data: users
            });
        } catch (err) {
            reject(err);
        }
    });
};

// lấy tất cả thông tin bác sĩ trong db
let getAllDoctors = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let doctors = await db.User.findAll({
                Where: {
                    roleId: 'R2'
                },
                attributes: {
                    exclude: ["password","image"] //loại bỏ password ra khỏi obj trả về
                }
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        }catch(err){
            reject(err);
        }
    })
}

let saveDetailInfoDoctor = (inputData) =>{
    return new Promise(async(resolve, reject) =>{
        try{
            if(!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown){
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter"
                })
            }else{
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId,
                })
                resolve({
                    errCode: 0,
                    errMessage: " Save info doctor success"
                })
            }
        }catch(err){
            reject(err);
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInfoDoctor: saveDetailInfoDoctor
};
