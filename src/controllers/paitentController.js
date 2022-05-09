import paitentServices from "../services/paitentServices"

let postBookAppointment = async(req, res) => {
    try {
        let infor = await paitentServices.postBookAppointment(req.body);
      
        return res.status(200).json(infor);
    }catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form the server'
        })
    }
}

module.exports = {
    postBookAppointment
}