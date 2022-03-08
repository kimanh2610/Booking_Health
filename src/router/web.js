import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {

    
    router.post('/post-crud', homeController.postCRUD);

    router.post('/put-crud', homeController.putCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/crud', homeController.getCRUD);
    router.get('/about', homeController.getAboutPage);
    router.get('/', homeController.getHomePage);
    

    // router.get('/', (req, res) => {
    //     return res.send("hom nay la thu may");
    // });


    // router.get('/Hi', (req, res) => {
    //     return res.send("hom nay la thu may vay ta");
    // });

     
    return app.use("/", router);
}

module.exports =initWebRoutes;
