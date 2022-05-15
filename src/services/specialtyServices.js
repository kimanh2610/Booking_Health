import db from "../models/index";
require('dotenv').config();

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
            if(data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data
            })

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailSpecialtybyId = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {
                descriptionMarkdown: '',
                descriptionHTML: '',
                doctorSpecialty: ''
            }

            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else{
                 data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes:  ['descriptionMarkdown', 'descriptionHTML']
                })
                data = {
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML: data.descriptionHTML
                }
                if(data) {
                    let doctorSpecialtys
                    // const doctor_infor_id = 1
                    doctorSpecialtys = await db.Doctor_Infor.findAll({ 
                        where: {
                            specialtyId: inputId
                        },
                        attributes: ['doctorId', 'specialtyId']
                    })
                    data = {
                        descriptionMarkdown: data.descriptionMarkdown,
                        descriptionHTML: data.descriptionHTML,
                        doctorSpecialty: doctorSpecialtys
                    }

                }else data = {}
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createSpecialty,
    getSpecialty,
    getDetailSpecialtybyId
}