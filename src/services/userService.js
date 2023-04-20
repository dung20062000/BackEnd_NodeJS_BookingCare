import db from "../models/index";
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            // nếu đúng email
            if (isExist) {

                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: {email: email},
                    raw: true

                })
                // có người dùng này và so sánh với mật khẩu người dùng truyền lên với mk trong db
                if(user) {
                    let check =  await bcrypt.compareSync(password, user.password); 
                    //dung maatj khau  => errCode 0
                    if(check){
                        userData.errCode = 0
                        userData.errMessage = 'ok';
                        delete user.password; //xóa trường pasword để không show lên
                        userData.user= user
                    }
                    //sai maat khau  => errCode 3
                    else{ 
                        userData.errCode = 3
                        userData.errMessage = 'wrong password';
                    }
                }
                else{//sai nguowi dung
                    userData.errCode = 2,
                    userData.errMessage = `User's not found `
                }
            } else{             //khoong tim thay email => errCode 1
                //return err
                userData.errCode = 1,
                userData.errMessage = `Your email isn't exist in your system. please try other email`
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
        try{
            let users = ''
            if(userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'] //loại bỏ password ra khỏi obj trả về
                    }
                })
            }
            console.log(users);
            if(userId && userId !== 'ALL' ){
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password']  //loại bỏ password ra khỏi obj trả về
                    }
                })
            }
            resolve(users)
            
        }catch(err){
            reject(err);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
};
