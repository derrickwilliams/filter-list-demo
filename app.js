(function(global) { // IIFE - immediately invoked function expression - way of scoping variables, organizing code, creating "modules"

  // set up demo namespace
  // attaching to global is our way of exporting modules to be used
  var demo = global.demo = {};

  demo.MessageList = MessageList;

  function MessageList(params) {
    var
      self = {},
      view = params.view,
      dom = params.dom;

    self.render = render;

    return self;

    function render(data) {
      var itemNodes = [];

      clearList();

      data.forEach(function handleItem(item, i) {
        itemNodes.push(getItemNode(data[i]));
      });

      view.append(itemNodes);

      return self;
    }

    function clearList() {
      view.find('li').remove();
    }

    function getItemNode(item) {
      return dom('<li />').text(item.message);
    }
  }

})(window);
