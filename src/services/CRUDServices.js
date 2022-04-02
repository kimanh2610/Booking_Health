import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);


module.exports.createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fullName: data.fullName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,

            })
            resolve('ok create a new user successed!');
        } catch (e) {
            reject(e);
        }
    })

}


let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.getAllUsers = (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports.updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })

            if (user) {
                user.fullName = data.fullName
                user.address = data.address
                await user.save()
                // console.log(updateUser)

                let allUsers = await db.User.findAll();
                resolve(allUsers);

            } else {
                resolve();
            }

        } catch (e) {
            console.log(e)
            reject(e);
        }
    })
}

module.exports.deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId}
            })

            if(user){
                await user.destroy();
            }

            resolve();
        } catch (e) {
            reject(e);

        }
    })
}


