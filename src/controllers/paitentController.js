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

let postVerifyBookAppointment = async(req, res) =>{
    try {
        let infor = await paitentServices.postVerifyBookAppointment(req.body);
      
        return res.status(200).json(infor);
    }catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form the server'
        })
    }
}

module.exports = {
    postBookAppointment, postVerifyBookAppointment
}