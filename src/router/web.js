import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import paitentController from "../controllers/paitentController";
import specialtyController from "../controllers/specialtyController";
let router = express.Router();

let initWebRoutes = (app) => {

    
    router.post('/post-crud', homeController.postCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/crud', homeController.getCRUD);
    router.get('/about', homeController.getAboutPage);
    router.get('/', homeController.getHomePage);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-infor-doctors', doctorController.postInforDoctors);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-doctor-by-id', doctorController.getExtraInforDoctorById);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
    
    router.post('/api/patient-book-appointment', paitentController.postBookAppointment);
    router.post('/api/verify-book-appointment', paitentController.postVerifyBookAppointment);

    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    router.get('/api/get-specialty', specialtyController.getSpecialty);


    return app.use("/", router);
}

module.exports =initWebRoutes;
