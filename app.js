(function(global) { // IIFE - immediately invoked function expression - way of scoping variables, organizing code, creating "modules"

  // set up demo namespace
  // attaching to global is our way of exporting modules to be used
  var demo = global.demo = {};

  demo.MessageList = MessageList;
  demo.FilterList = FilterList;

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

  function FilterList(params, messageBus) {
    var
      self = {},
      view = params.view,
      dom = params.dom;

    // this could and should probably be move to an init function. maybe later.
    view.on('click', '[type=checkbox]', function handleFilterClick(e) {
      var
        allChecked = view.find(':checked'),
        checkedData = [],
        clickTarget = e.target;

      allChecked.each(function handleCheckedItem(i, item) {
        checkedData.push({
          name: dom(item).attr('name'),
          value: dom(item).val()
        });
      });

      messageBus.trigger('filters:updated', checkedData);
    });

    return self;
  }

})(window);
