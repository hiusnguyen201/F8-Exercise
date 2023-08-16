module.exports = {
    index: (req, res) => {
        if (req.cookies.isLogged === 'true') 
        {
            return res.render('home/index');
        } 
        else 
        {
            res.cookie('isLogged', 'false');
            return res.redirect('/dang-nhap');
        }
    },

    handleLogout: (req, res) => {
        res.cookie('isLogged', 'false');
        req.flash('success', "Đăng xuất thành công");
        return res.redirect("/dang-nhap");
    }
}