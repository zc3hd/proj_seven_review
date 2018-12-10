var mongoose = require('mongoose');

// 集合标识
var model_key = 'user';

// 文档模型
var doc_model = new mongoose.Schema({
	// 
  name: String,

  // 密码
  ps:String,

  // 计划限制
  plans_limit: { type: Number, default: 5 },

  // 计划
  plans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'plan'
  }],

  // 邮箱
  email:String,

  // 是否能发邮件
  email_key:{ type: Boolean, default: true },
});


// 模型
module.exports = mongoose.model(model_key, doc_model, model_key);
