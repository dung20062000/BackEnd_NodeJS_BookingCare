
import bcrypt from 'bcryptjs';
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => { // createNewUser nhận data từ client và thao tác lên server
    return new Promise(async (resolve, reject) => {
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phonenumber,
                gender: data.gender === '1'  ? true : false,
                roleId: data.roleId,
            })

            resolve('ok create new user success');

        }catch(e){
            reject(e);
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } 
        catch(err){ 
            reject(err);
        }
    })
}

//lấy tất cả người dùng trong BD
let getAllUser = () => {
    return new Promise( async (resolve, reject) => {
        try{
            let users =  db.User.findAll({
                raw: true,
            });
            resolve(users);
        }
        catch(err){ 
            reject(err)
        }
    })
}

module.exports = {
    createNewUser,
    getAllUser,
};