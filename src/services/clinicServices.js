import db from "../models/index";
require('dotenv').config();

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
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

let getClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
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

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = {
                descriptionMarkdown: '',
                descriptionHTML: '',
                doctorClinic: '',
                address: '',
                name: '',
            }

            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionMarkdown', 'descriptionHTML']
                })
                data = {
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML: data.descriptionHTML,
                    address: data.address,
                    name: data.name,
                }
                if (data) {
                    let doctorClinics
                    // const doctor_infor_id = 1
                    doctorClinics = await db.Doctor_Infor.findAll({
                        where: {
                            clinicId: inputId
                        },
                        attributes: ['doctorId']
                    })
                    data = {
                        descriptionMarkdown: data.descriptionMarkdown,
                        descriptionHTML: data.descriptionHTML,
                        address: data.address,
                        doctorClinic: doctorClinics,
                        name: data.name,

                    }
                    // data.doctorClinic = doctorClinic;

                } else data = {}
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
    createClinic,
    getClinic,
    getDetailClinicById
}