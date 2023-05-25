import express from "express";
import homeController from "../controllers/homeController";
import userController from"../controllers/userController"
import doctorController from"../controllers/doctorController"

let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage);
    router.get('/aboutme', homeController.getAboutMe);
    router.get('/crud',  homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    //rest API
    router.post('/api/login',userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUser)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/allcode', userController.handleGetAllCode)

    
    router.get('/api/top-doctor-home', doctorController.handleGetTopDoctorHome)
    router.get('/api/get-all-doctors', doctorController.handleGetAllDoctors)
    router.post('/api/save-info-doctors', doctorController.handleSaveInfoDoctors)
    router.get('/api/get-detail-doctor-by-id', doctorController.handleGetDetailDoctorByID)


    return app.use("/", router)
}

module.exports = initWebRoutes