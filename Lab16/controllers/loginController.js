module.exports = {
    index: (req, res) => {
        return res.render("account/loginForm", { 
            error: req.flash("error"), 
            success: req.flash("success"),
            errEmail: req.flash("errEmail"),
            errPass: req.flash("errPass"),
        });
    },

    handleLogin: (req, res) => {
        const { email, password } = req.body;

        if(!email || !password)
        {
            req.flash('error', "Vui lòng nhập đầy đủ thông tin");
            if(!email && !password)
            {
                req.flash('errEmail', 'Vui lòng nhập email');
                req.flash('errPass', 'Vui lòng nhập mật khẩu');
            }
        } 
        else if(email.toLowerCase() === "admin@gmail.com" && password === "123456") 
        {
            res.cookie('isLogged', 'true');
            return res.redirect("/");
        }
        else
        {
            req.flash('error', "Email hoặc mật khẩu không chính xác");
        }

        return res.redirect("/dang-nhap");
    },
}