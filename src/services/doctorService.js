import db from "../models/index";

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: {roleId: 'R2'},
                order: [["createdAt", "DESC"]],
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
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
};
