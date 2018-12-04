function JS_demo(app) {
  var me = this;

  // 
  me.app = app;
  // 路由
  me.router = require('express').Router();


  // 模型
  me.js_demo_model = require('../../collection/js_model.js');
}
JS_demo.prototype = {
  init: function() {
    var me = this;

    // add
    me.router.post('/font.do', function(req, res) {
      me._api_font(req, res);
    });

    me.app.use('/api/js_demo', me.router);
  },
  _api_font: function(req, res) {
    var me = this;
    var size = Math.floor(Math.random() * 200);
    if (size < 60) {
      size = 60;
    }
    var color = Math.floor(Math.random() * 1000000);

    // 
    res.send({
      size:size,
      color:color,
    });
  },

};



module.exports = JS_demo;
