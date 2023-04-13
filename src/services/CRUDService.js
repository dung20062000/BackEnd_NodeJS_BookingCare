
import bcrypt from 'bcryptjs';
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

//tạo mới người dùng
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

//mã hóa paswords
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

//render thông tin người dùng để edit 
let getUserInfoById = (userId) =>{
    return new Promise( async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where : {id: userId }, 
                raw: true
            })
            if(user){
                resolve(user);
            }
            else{
                resolve({});

            }
        }catch(err){
            reject(err)
        }
    })
}

//update
let updateUserData = async (data) => {
return new Promise( async (resolve, reject) => {
    try {
        let user = await db.User.findOne({
            where : {id: data.id},
        });
        if(user){
            user.firstName = data.firstName
            user.lastName = data.lastName
            user.address = data.address

            await user.save()

            let allUsers = await db.User.findAll()
            resolve(allUsers);
        }else{
            resolve()
        }
        await db.User.update({

        })

    }catch(err){
        reject(err)
    }
})
}
module.exports = {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUserData,
};