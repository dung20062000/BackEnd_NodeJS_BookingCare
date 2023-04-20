import  userService from "../services/userService"


let handleLogin = async (req, res) => {   
    let email = req.body.email
    let password = req.body.password
    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'missing input email or password'
        })
    }
    let userData =  await userService.handleUserLogin(email, password)
    //check email cảu người dùng
    //so sánh password của người dùng chuyền lên
    //trả về user info
    //trả về accsess_token: JWT json web token
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}

    })
}

let handleGetAllUser = async(req, res) => {
    let id = req.query.id; // lấy lấy tất info user thông qua ID

    if(!id) {
        return res.status(200).json({
            errCode: 1,
            erMessage: 'missing required parameter',
            user: []
        })
    }
    let users = await userService.getAllUsers(id)

    return res.status(200).json({
        errCode: 0,
        message:'ok',
        users

    })
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
}