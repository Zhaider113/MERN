const   User            = require('../models/user');

  // validate email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// This will register
const register = async (req, res) => {
    try {
        let { name, email, password, role} = req.body;
        if(email != '' && password != '' && name !='') {
            console.log(req.body)
            if(validateEmail(email)) {
                let user= new User({
                    name: name,
                    email: email,
                    password: password,
                    role: role
                  });
                  const token = await user.generateAuthToken()
                  user.token = token;
                await user.save();
                return res.send({ 
                    success: true,
                    message: 'Your account created...!',
                    data: {user, token}
                });
            } else {
                res.send({ success: false, message: 'Enter valid email address.' });    
            }
        } else {
            res.send({ success: false, message: 'Email and Password required.' });
        }
    } catch (error) {
        res.send({ success: false, message: error.message});
    }
}
// This will login user/admin
const login = async (req, res) => {
    try {
        let {email, password } = req.body;
        if (email && password) {
            if (validateEmail(email)) {
                const user = await User.findByCredentials(email, password)
                const token = await user.generateAuthToken()
                res.send({ success: true, message: 'Login Successfully.', data: {user, token} })
            } else {
              res.send({ success: false, message: 'Enter valid email address.' });
            }
          } else {
            res.send({ success: false, message: 'Email and Password required.' });
          }
    } catch (error) {
        res.send({ success: false, message: error.message});
    }
}



module.exports = {
    register,
    login
}