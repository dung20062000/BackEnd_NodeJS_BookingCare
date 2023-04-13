import db from "../models/index";
import CRUDService from "../services/CRUDService"
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // tìm tất cả dữ liệu có trong User và gán vào biến data

        return res.render("homePage.ejs", {
            data: JSON.stringify(data),
        });
    } catch (e) {
        console.log(e);
    }
};
let getAboutMe = (req, res) => {
    return res.render("./test/aboutMe.ejs");
};

let getCRUD = (req, res) => {
    return res.render("crud.ejs")     
}

let postCRUD = async(req, res) => {
    
    let message =  await CRUDService.createNewUser(req.body)
    console.log(message);
    // console.log(req.body)
    return res.send('post crud form server')
}

//hien thi nguoi dung
let displayGetCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser()
    console.log('......................');
    console.log(data);
    console.log('......................');
    return res.render('displayCRUD.ejs', { dataTable: data })
}

module.exports = {
    getHomePage: getHomePage,
    getAboutMe: getAboutMe,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD
};
