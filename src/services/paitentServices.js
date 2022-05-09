import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';
import emailServices from './emailServices'

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                await emailServices.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: 'nguyen van an',
                    time: '8:00 - 9:00 Thứ 3: 10/05/2022',
                    doctorName: "Huỳnh Kim Ánh",
                    redirectLink: 'https://www.facebook.com/profile.php?id=100010726396667'
                })
                
                //upsert patient 
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                    raw: true
                })

                // console.log('check user', user)

                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            patientId: user[0].id,
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: data.timeType
                        }

                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor paitent successed'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointment
}