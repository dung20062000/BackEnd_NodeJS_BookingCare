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
            if(!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action){
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter"
                })
            }else{
                if(inputData.action === 'CREATE'){
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    })
                }else if(inputData.action === 'EDIT'){
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: {doctorId : inputData.doctorId},
                        raw : false
                    })
                    if(doctorMarkdown) {
                        doctorMarkdown.contentHTML= inputData.contentHTML;
                        doctorMarkdown.contentMarkdown= inputData.contentMarkdown;
                        doctorMarkdown.description= inputData.description;
                        doctorMarkdown.doctorId= inputData.doctorId;
                        doctorMarkdown.updateAt= new Date();
                        await doctorMarkdown.save();
                    }
                }
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

let getDetailDoctorByIDService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!inputId){ 
                resolve({
                    errCode: 1,
                    errMessage: "missing required parameter"
                })
            }else{
                let doctorData = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ["password"] //loại bỏ password ra khỏi obj trả về
                    },
                    include: [
                        {model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown']},
                        {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},

                       
                    ],
                    raw: false,
                    nest: true //gom nhóm các obj khi trả về trong data
                });
                if(doctorData && doctorData.image){
                    doctorData.image = new Buffer(doctorData.image, 'base64').toString('binary')

                }
                if(!doctorData) doctorData = {};
                resolve({
                    errCode: 0,
                    data: doctorData
                });
            }
        }catch (err) {
            reject(err);
        }
    });
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInfoDoctor: saveDetailInfoDoctor,
    getDetailDoctorByIDService: getDetailDoctorByIDService
};
