(function(global) { // IIFE - immediately invoked function expression - way of scoping variables, organizing code, creating "modules"

  // set up demo namespace
  // attaching to global (window) is our way of exporting components to be used
  var demo = global.demo = {};

  demo.MessageList = MessageList;
  demo.FilterList = FilterList;
  demo.MessageBus = MessageBus;

  function MessageList(params) {
    var
      self = {},
      view = params.view,
      dom = params.dom;

    self.render = render;

    return self;

    function render(data) {
      view.append(getItemNode(data));
      return self;
    }

    function getItemNode(item) {
      return dom('<div />').html(
        dom('<code />').text(JSON.stringify(item))
      );
    }
  }

  function FilterList(params, messageBus) {
    var
      self = {},
      view = params.view,
      dom = params.dom;

    // this could and should probably be moved to an init function. maybe later.
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

      messageBus.publish('filters:updated', checkedData);
    });

    return self;
  }

  function MessageBus() {
    var self, subscribers = {};

    self = {
      publish: publish,
      subscribe: subscribe
    };

    return self;

    function subscribe(topic, subscriber, handler) {
      subscribers[topic] = subscribers[topic] || [];

      subscribers[topic].push({
        sub: subscriber,
        handler: handler
      });

      return self;
    }

    function publish(name, data) {
      var targets = subscribers[name];

      if (!targets) {
        console.log('no subscribers for ', name);
        return;
      }

      targets.forEach(function callTargetHandler(target) {
        // call the handler function, binding the subscribing object to `this`
        target.handler.call(target.sub, data);
      });
    }
  }

})(window);
