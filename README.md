monthSlider
===========

A month only picker

## Initialization
~~~html
<div id="monthSlider">
  <div class="left">&lt;</div>
  <div class="month"></div>
  <div class="year"></div>
  <div class="right">&gt;</div>
</div>
~~~

Include jquery and the plugin

~~~javascript
<script src="jquery.js"></script>
<script src="jquery.monthslider.min.js"></script>
~~~

Run the script

~~~javascript
<script>
	$('monthSlider').monthSlider(/* options */);
</script>
~~~

With options it could look like this

~~~javascript
<script>
	$('monthSlider').monthSlider({
		month: 4, // start in may
		events: {
			onChange: function() {
				alert("change");
			}
		}
	});
</script>
~~~


## Options

**None of these options are required **

~~~javascript
{
   month: 5,       // the current month january:0 december:11
   year:  2014,    // current year
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
      left: ".left",    // selector for arrow to go back one month
      month: ".month",  // container for displaying the month
      year: ".year",    // container for displaying the year
      right: ".right"   // selector for arrow to go to next month
    },
    events: {
      onPrevious: function() {},
      onNext: function() {},
      onChange: function() {}
    }
}
~~~

## Methods