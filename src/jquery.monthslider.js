// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "monthSlider",
        today = new Date(),
        defaults = {
            month: today.getMonth(),
            year:  today.getFullYear(),
            monthNames: [
              "Januar",
              "Februar",
              "März",
              "April",
              "Mai",
              "Juni",
              "Juli",
              "August",
              "September",
              "Oktober",
              "November",
              "Dezember"
            ],
            selectors: {
              left: ".left",
              month: ".month",
              year: ".year",
              right: ".right"
            }
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = 
    {

        init: function() 
        {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            this.updateMonthAndYear();
          
            this.initializeEventHandlers(this.element, this.options);
        },

        updateMonthAndYear: function() 
        {
           this.setMonthAndYear(this.options.month, this.options.year);
        },
      
        setMonthAndYear: function(month, year) 
        {
           var $el       = $(this.element),
               monthName = this.options.monthNames[month];
          
           $el.find(this.options.selectors.month).text(monthName);
           
           $el.find(this.options.selectors.year).text(year);
          
        },
      
        initializeEventHandlers: function(el, options)
        {
           var $el  = $(el),
               self = this;
          
           $el.find(options.selectors.left).click(function(e) 
           {
               self.previousMonth(e);
           });
          
           $el.find(options.selectors.right).click(function(e)
           {
               self.nextMonth(e);
           });
        },
      
        previousMonth : function(e) 
        {
          var options = this.options;
          
          options.month--;
          
          if(options.month < 0)
          {
            options.month = options.monthNames.length-1;
            
            options.year--;
          }
          
          this.updateMonthAndYear();
          
          this.fireMonthChangedEvents(e, true, false);
        },
      
        nextMonth: function(e) 
        {
          var options = this.options;
          
          options.month++;
          
          if(options.month >= options.monthNames.length)
          {
            options.month = 0;
            
            options.year++;
          }
          
          this.updateMonthAndYear();
          
          this.fireMonthChangedEvents(e, false, true);
        },
      
        fireMonthChangedEvents: function(e, previous, next) 
        {
          var options = this.options;
          
          // onPrevious Event
          if(previous) 
          {
            if (options.events.onPrevious !== undefined) {
              options.events.onPrevious(e);
            }
          }
          
          // onNext event
          if(next) 
          {
            if (options.events.onNext !== undefined) 
            {
              options.events.onNext(e);
            }
          }
          
          debugger;
          // onChange event
          if (options.events.onChange !== undefined) {
            options.events.onChange(e);
          }
        }
      
        
        
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );