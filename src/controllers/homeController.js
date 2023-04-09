import db from "../models/index";
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

module.exports = {
    getHomePage: getHomePage,
    getAboutMe: getAboutMe,
};
