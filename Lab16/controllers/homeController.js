module.exports = {
    index: (req, res) => {
        console.log(req.session.isLogged);
        if (req.session.isLogged) 
        {
            return res.render('home/index');
        } 
        else 
        {
            req.session.isLogged = false;
            console.log(req.session.isLogged);
            return res.redirect('/dang-nhap');
        }
    },

    handleLogout: (req, res) => {
        req.session.isLogged = false;
        console.log(req.session.isLogged);
        req.flash('success', "Đăng xuất thành công");
        return res.redirect("/dang-nhap");
    }
}