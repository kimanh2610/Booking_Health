import db from '../models/index';
import CRUDService from '../services/CRUDServices'

let getHomePage = async (req, res) => {

    try {
        let data = await db.User.findAll();
        //select * from user; data tra ve mang doi tuong

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });


    } catch (e) {
        console.log(e);
    }


}

let getAboutPage = (req, res) => {
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

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    // console.log(message);
    return res.send('post crud from server')
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    // console.log(data);

    return res.render('display-CRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check user data not found
        return res.render('editCRUD.ejs', {
            user: userData
        })
    } else {
        return res.send('Users not found!')
    }

    // console.log(req.query.id)

}

let putCRUD = async (req, res) => {
    let data = req.body;
    // console.log(data)
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('display-CRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send('Delete the user successed')

    }
    else{
        return res.send('user not found!');                                                                 
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
}

