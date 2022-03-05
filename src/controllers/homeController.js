import db from '../models/index';
import CRUDService from '../services/CRUDServices'

let getHomePage =  async(req, res) => {

   try{
    let data = await db.User.findAll();
    //select * from user; data tra ve mang doi tuong
   
    return res.render('homepage.ejs', {
        data: JSON.stringify(data)
    });
    

   }catch(e){
       console.log(e);
   }
   
   
} 

let getAboutPage =(req, res) => {
    return res.render('test/about.ejs')
    // try{
    //     let data = await db.User.findAll();
    //     return res.render('test/about.ejs', {
    //         data: JSON.stringify(data)
    //     })
    // }catch(e){
    //     console.log(e);
    // }
    
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async(req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server')
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage : getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
}

