import userService from "../services/userService";

let handleLogin = async (req, res) => {
    //try{
        let email  = req.body.email;
        let password = req.body.password;
    
        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing inputs parameter!'
            })
        }
        //check email exist
        //compare password
        //return userInfo 
        //access_token:JWT(json web token)
        let userData = await userService.handleUserLogin(email, password);
        
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {}
        })
    // }catch (e) {
    //     console.error(e)
    //     return res.sendStatus(501)
    // }
}

module.exports = {
    handleLogin: handleLogin,
}