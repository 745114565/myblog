// var config = require('config-lite');
var config = require('config-lite')({
    filename: 'default',
    config_basedir: __dirname,
    config_dir: 'config',
});
var Mongolass = require('mongolass');
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

console.dir(objectIdToTimestamp);
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

mongolass.plugin('addCreatedAt',{
	afterFind:function(results){
		results.forEach(function(item){
			item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
		});
		return results;
	},
	afterFindOne:function (result) {
		
		if(result){
			result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
		}
		return result;
	}
});

exports.User = mongolass.model('User', {
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一

//文章
exports.Post = mongolass.model('Post',{
	author:{type:Mongolass.Types.ObjectId},
	title:{type:'string'},
	content:{type:'string'},
	pv:{type:'number'}
});
exports.Post.index({author:1,_id:1}).exec();//按创建时间降序查看文章列表

//留言
exports.Comment = mongolass.model('Comment',{
	author:{type : Mongolass.Types.ObjectId},
	content:{type:'string'},
	postId : {type : Mongolass.Types.ObjectId}
});
exports.Comment.index({postId:1,_id:1}).exec();//通过文章id获取该文章下所有留言，按留言创建时间排序
exports.Comment.index({author:1,_id:1}).exec();//通过用户id和留言 id 删除一个留言


