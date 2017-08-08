var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');

var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next) {
	res.render('signin');
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next) {
	var name = req.fields.name;
	var password = req.fields.password;


	UserModel.getUserByName(name)
	.then(function (user) {
		// 用户不存在
		if(!user){
			req.flash('error','用户不存在');
			return res.redirect('back');
		}

		// 检查密码是否匹配
		if(sha1(password)!==user.password){
			req.flash('error','用户名或密码错误');
		}

		// 登陆成功
		// 用户信息写入 session，写入前去掉用户密码
		delete user.password;
		req.session.user = user;

		req.flash('success','登陆成功');
		res.redirect('/posts');
	})
	.catch(next);

});

module.exports = router;
