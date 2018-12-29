var mongoose = require('mongoose');

// 集合标识
var model_key = 'plan';

// 文档模型
var doc_model = new mongoose.Schema({
  // 计划名称
  name: String,

  // 复习轮次
  sum: Number,
  // 复习的间隔的天数，
  jg_days: [Number],

  // 计划日期
  date: String,
  // 复习的间隔的日期，
  jg_date: [String],
});


// 模型
module.exports = mongoose.model(model_key, doc_model, model_key);
