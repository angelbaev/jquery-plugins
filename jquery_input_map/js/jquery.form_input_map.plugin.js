/*!
 * jQuery Form Input Map - This plugin help to send unchecked input checkboxes or radio.
 *
 * The MIT License
 *
 * @author  : Angel Baev
 * @version : 0.1.0
 *
 */

(function($) {

	$.fn.form_input_map = function( options ) {
    
		var settings = $.extend({
			selector   : null,
			complete	 : null
		}, options);

    var self = this;
    var index = 0;
    
		return this.each( function() {
      if (jQuery(this).prop("tagName").toLowerCase() != 'form') {
        return false;
      }
      
      if(settings.selector == null) {
        settings.selector = 'input[type=\'checkbox\'], input[type=\'radio\']';
      } 
      $(settings.selector, $(this)).each(function(){

        var el_id =  'hid_'+index;
        $('<input>').attr({
            type: 'hidden',
            id: el_id,
            name: this.name, 
            value: (this.checked?1:0), 
        }).appendTo(this);
        
        $(this).bind('change', function(){
          $('#'+el_id).val((this.checked?1:0))
        });
        
        this.name = '';
        ++index;
      }); 
      
			if ( $.isFunction( settings.complete ) ) {
				settings.complete.call(this);
			}
      
    
		});

	};

}(jQuery));
