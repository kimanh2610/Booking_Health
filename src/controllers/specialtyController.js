import specialtyServices from "../services/specialtyServices"

let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyServices.createSpecialty(req.body);

        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form the server'
        })
    }

}

let getSpecialty = async (req, res) => {
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

let getDetailSpecialtybyId = async (req, res) => {
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
    createSpecialty,getSpecialty,
    getDetailSpecialtybyId
}