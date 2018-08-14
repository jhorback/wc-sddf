/**
 This mixin allows you to declare dom events that are
 attached and detatched automatically when the element is 
 attached or detached from the dom.

 ## Status
 __1/19/2018 - Compleite - 15 passing tests__ 
 ** Fixed listening on parent by switching out parentElement for parentNode
 ** listenAt can now be the id of a child element. See note below.


 __9/13/2017 - Complete - 11 passing tests__


 ## Basic usage
 When "some-dom-event" is dispatched, the "_someHandler" method gets called;
 __stopPropagation()__ is called on the event before passing it to the handler.

  ```js
  class MyCass extends EventMap(Polymer.Element) {
    static get events() {
      return {
        "some-dom-event": "_someHandler",
        "another-dom-event": "_anotherHandler"
      };
    };

    _someHandler(event) {
      // handle event...
    }

    _anotherHandler(event) {
      // handle event...
    }
  }
  ```
  
  ## Listening at the parent or window
  Each event can be configured to add the listener to its parent
  or to the window object. By default the listeners are attached 
  to the element itself.
  
   ```js
  class MyCass extends EventMap(Polymer.Element) {
    static get events() {
      return {
        "some-dom-event": "_someHandler",
        "event-to-handle-at-parent": {
          listenAt: "parent",
          handler: "_someHandler2"
        },
        "event-to-handle-at-window",  {
          listenAt: "window",
          handler: "_someHandler3"
        }
      };
    };

    _someHandler(event) {
      // handle event...
    }

    _someHandler2(event) {
      // handle event...
    }

     _someHandler3(event) {
      // handle event...
    }
  }
  ```

  ## Multiple event maps
  If any mixin or class uses the EventMap, all subclass and mixin event maps
  will be merged.
  
  The event maps higher in the chain will take precident.


// test that sub class event handlers get called
// test that if a parent class overrides the event, that one gets called instead

  @mixinFunction
*/
export let EventMap = (superclass) => class extends superclass {
  /**
   * Adds event listeners.
   */
    connectedCallback() {
        super.connectedCallback && super.connectedCallback();

    // keep the map from being processed more than once.
    // Could happen if the EventMap is mixed in more than
    // once on a single class
    if (this.__eventMapProcessed === true) {
      return;
    }
    this._bindEvents();
    this.__eventMapProcessed = true;    
    }
  /**
   * Detaches event listners.
   */
  disconnectedCallback() {
    super.disconnectedCallback && super.disconnectedCallback();
    this._unbindEvents();
    delete this.__eventMapProcessed;
  }

  notify(eventName) {
      this.dispatchEvent(new CustomEvent(eventName));
  }

  _bindEvents() {
    // verify that the eventmap included twice does not stop too early
    const getAllEvents = _ => {
      let klass = this.constructor;
      let eventMaps = [];

      // can i just do while(klass.prototype?)
      while(klass.prototype) {        
        if (klass.eventMap) {
          let events = klass.eventMap;

          // support eventsListenAt
          if (klass.eventsListenAt) {
            const listenAt = klass.eventsListenAt;
            events = Object.keys(events).reduce((newEvents, eventName) => { 
              if (typeof events[eventName] === "string") {
                const handler = events[eventName];
                newEvents[eventName] = {listenAt, handler};
              } else {
                newEvents[eventName] = events[eventName]
              }
              return newEvents;
            }, {});
          }

          eventMaps.unshift(events);
        }
        klass = Object.getPrototypeOf(klass.prototype.constructor);        
      }

      return eventMaps.length > 0 ?
        Object.assign(...eventMaps) : null;
    }
    
   
    const events = getAllEvents();
    
    if (!events) {
      return;
    }

    this.__eventMapHandlers = {};
    Object.keys(events).forEach((key) => {        

      // support a string or object
      let detail = (typeof events[key] === "string") ? 
        { handler: events[key] } : events[key];
      
      if (!this[detail.handler]) {
        throw new Error(`EventMap method does not exist: ${detail.handler}`);
      }

      let handler = (event) => {
        if (!detail.nsp)  {
          event.stopPropagation();
        }
        this[detail.handler](event);
      };

      const listenAt = (detail.listenAt) === "window" ? window :
        (detail.listenAt) === "this" ? this : this.parentNode;

      if (detail.listenAt && (detail.listenAt !== "window" && detail.listenAt !== "this")) {
        throw new Error(`EventMap could not set up a listener at ${detail.listenAt}`);
      }

      if (!listenAt) {
        throw new Error(`EventMap could not set up a listener at ${detail.listenAt}`); // jch! add test
      }      

      this.__eventMapHandlers[key] =  {
        listenAt: listenAt,
        handler: handler
      };

      listenAt.addEventListener(key, handler);
    });    
  }

  _unbindEvents() {
    let handlers = this.__eventMapHandlers;
    
    if (!handlers) {
      return;
    }

    Object.keys(handlers).forEach((key) => {
      let info = handlers[key];
      info.listenAt.removeEventListener(key, info.handler); 
    });

    delete this.__eventMapHandlers;
  }
};
