import db from "../models/index";
import CRUDService from "../services/CRUDService";
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
    return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    // console.log(req.body)
    return res.send("post crud form server");
};

//hien thi nguoi dung
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log("......................");
    console.log(data);
    console.log("......................");
    return res.render("displayCRUD.ejs", { dataTable: data });
};
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    // console.log(userId);

    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check user data not found

        // gán x <- y
        return res.render("editCRUD.ejs", { userDataEdit: userData });
    } else {
        return res.send("User not found !");
    }
};

//upsate người dùng mới
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);

    return res.render("displayCRUD.ejs", {
        dataTable: allUser,
    });
};
//xóa user
let deleteCRUD = async (req, res) => {
    let deleteId = req.query.id;

    if (deleteId) {
        await CRUDService.deleUserById(deleteId);

        return res.send("User deleted successfully");
    } else {
        return res.send("User not found");
    }
};
module.exports = {
    getHomePage: getHomePage,
    getAboutMe: getAboutMe,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
};
