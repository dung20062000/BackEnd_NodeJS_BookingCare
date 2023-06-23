import db from "../models/index";
import bcrypt from "bcryptjs"; //check mk người dùng và hash password
const salt = bcrypt.genSaltSync(10);

//mã hóa paswords
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (err) {
            reject(err);
        }
    });
};

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            // nếu đúng email
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ["email", "id", "roleId", "password", 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,
                });
                // có người dùng này và so sánh với mật khẩu người dùng truyền lên với mk trong db
                if (user) {
                    let check = await bcrypt.compareSync(
                        password,
                        user.password
                    );
                    //dung maatj khau  => errCode 0
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "ok";
                        delete user.password; //xóa trường pasword để không show lên
                        userData.user = user;
                    }
                    //sai maat khau  => errCode 3
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "wrong password";
                    }
                } else {
                    //sai nguowi dung
                    (userData.errCode = 2),
                        (userData.errMessage = `User's not found `);
                }
            } else {
                //khoong tim thay email => errCode 1
                //return err
                (userData.errCode = 1),
                    (userData.errMessage = `Your email isn't exist in your system. please try other email`);
            }
            resolve(userData);
        } catch (err) {
            reject(err);
        }
    });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
};

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"], //loại bỏ password ra khỏi obj trả về
                    },
                });
            }
            console.log(users);
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ["password"], //loại bỏ password ra khỏi obj trả về
                    },
                });
            }
            resolve(users);
        } catch (err) {
            reject(err);
        }
    });
};

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // check email xem đã tồn tại hay chưa:
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage:
                        "Your email is already in used, please try again another email",
                });
            }else{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phonenumber,
                gender: data.gender,
                roleId: data.roleId,
                positionId: data.positionId,
                image: data.avatar
            });
            resolve({
                errCode: 0,
                errMessage: "ok",
            });
            }

        } catch (err) {
            reject(err);
        }
    });
};
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId },
        });
        try {
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "The user is not exist",
                });
            }

            await db.User.destroy({
                where: { id: userId },
            });

            resolve({
                errCode: 0,
                errMessage: "The user is deleted",
            });
        } catch (err) {
            reject(err);
        }
    });
};
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: "The user missing required parameters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (user) {
                user.firstName= data.firstName;
                user.lastName= data.lastName;
                user.address= data.address;
                user.roleId= data.roleId;
                user.positionId= data.positionId;
                user.gender= data.gender;
                user.phoneNumber= data.phoneNumber;
                if(data.avatar){

                    user.image= data.avatar
                }


                await user.save()

                resolve({
                    errCode: 0,
                    message: "The user updated successfully",
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'user not found',
                });
            }
            await db.User.update({});
        } catch (err) {
            reject(err);
        }
    });
};

let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'missing required parameter'
                })
            }else{
                let res ={};
                let allCode = await db.Allcode.findAll({
                    where: {type : typeInput}
                });
                res.errCode = 0
                res.data = allCode
                resolve(res);
            }


        }catch(err){
            reject(err);
        };
    });
};
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
};
