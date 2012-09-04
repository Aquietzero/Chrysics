/**
 * DemoController controllers all the demos.
 *
 * @author zero / zhaoyunhaosss@gmail.com
 */

var DemoController = function(demos) {

  this.container = $('#demo-area');
  this.closeButton = $('#demo-area-close');
  this.demos = demos;
  this.init();

}

DemoController.prototype = {

  init: function() {

    this.container = $('#demo-area');
    this.closeButton = $('#demo-area-close');

    this.initContainer();
    this.initCloseButton();
    this.initDemos();

    this.currentDemo = null;

  },

  initContainer: function() {

    var left = (window.innerWidth - 800) / 2;
    var top  = (window.innerHeight - 600) / 2;

    this.container.css({
      position : 'absolute',
      width    : '800px',
      height   : '600px',
      left     : left + 'px',
      top      : top + 'px',
    });
  
  },

  initCloseButton: function() {
 
    var self = this;

    this.closeButton.css({
      position : 'absolute',
      width    : '32px',
      height   : '32px',
      right    : '-26px',
      top      : '-26px',
    });

    this.closeButton.hover(function() {
      self.closeButton.css({
        cursor: 'pointer',
        background: "url('img/close-hover.png')",
      });
    }, function() {
       self.closeButton.css({
        background: "url('img/close.png')",
      });
    });

    this.closeButton.click(function() {
      self.hide();
    });
 
  },

  initDemos: function() {

    var self = this;
    for (var demo in this.demos) {

      (function(demo) {
        $('#' + demo).click(function() {
          self.show();
          self.currentDemo = new self.demos[demo]('demo-area');
          self.currentDemo.animate();
        });
      })(demo);

    }

  },

  show: function() {

    this.container.show();

  },

  hide: function() {

    this.container.hide();
    this.container.find('canvas').remove();
    this.currentDemo.stop();
  
  },

}


