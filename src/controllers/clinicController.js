import clinicServices from "../services/clinicServices"

let createClinic = async (req, res) => {
    try {
        let infor = await clinicServices.createClinic(req.body);

        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form the server'
        })
    }
}

let getClinic = async (req, res) => {
    try {
        let infor = await specialtyServices.getSpecialty();

        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form the server'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await specialtyServices.getDetailSpecialtybyId(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form the server'
        })
    }
}

module.exports = {
    createClinic,
    getClinic,
    getDetailClinicById
}