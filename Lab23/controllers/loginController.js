const Customer = require('../models/loginModel');
const md5 = require('md5');
const homeController = require('./homeController');

module.exports = {
    index: (req, res) => {
        return res.render("account/loginForm", { 
            error: req.flash("error"), 
            success: req.flash("success"),
            errEmail: req.flash("errEmail"),
            errPass: req.flash("errPass"),
        });
    },

    handleLogin: async (req, res) => {
        const { email, password } = req.body;

        // Validate email and password
        if(!email || !password)
        {
            req.flash('error', "Vui lòng nhập đầy đủ thông tin");
            if(!email && !password)
            {
                req.flash('errEmail', 'Vui lòng nhập email');
                req.flash('errPass', 'Vui lòng nhập mật khẩu');
            }
            else if(!email)
            {
                req.flash('errEmail', 'Vui lòng nhập email');
            }
            else if(!password)
            {
                req.flash('errPass', 'Vui lòng nhập mật khẩu');
            }
        } 
        else {
            // Find query
            const customerModel = await Customer;

            const customer = await customerModel.findOne({
                where: {
                    email: email
                } 
            });

            // Check customer
            if (customer) {
                if(customer.email === email && customer.password === md5(password))
                {
                    req.session.isLogged = true;
                    req.flash('name', customer.name);
                    return res.redirect('/');
                }
                else if(email)
                {
                    req.flash('error', "Mật khẩu không chính xác");
                }
            }
            else
            {
                req.flash('error', "Email không chính xác");
            }
        }

        return res.redirect("/dang-nhap");
    },
}