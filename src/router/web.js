import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

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

    router.post('/api/login', userController);
    

    // router.get('/', (req, res) => {
    //     return res.send("hom nay la thu may");
    // });


    // router.get('/Hi', (req, res) => {
    //     return res.send("hom nay la thu may vay ta");
    // });

     
    return app.use("/", router);
}

module.exports =initWebRoutes;
