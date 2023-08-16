module.exports = {
    index: (req, res) => {
        if (req.session.isLogged) 
        {
            return res.render('home/index');
        } 
        else 
        {
            return res.redirect('/dang-nhap');
        }
    },

    handleLogout: (req, res) => {
        req.session.isLogged = false;
        req.flash('success', "Đăng xuất thành công");
        return res.redirect("/dang-nhap");
    }
}