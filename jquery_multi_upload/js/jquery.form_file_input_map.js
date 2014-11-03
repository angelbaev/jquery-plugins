/*!
 * jQuery Form File Input Map - .
 *
 * The MIT License
 *
 * @author  : Angel Baev
 * @version : 0.1.0
 *
 */

(function($) {
  
	$.fn.form_file_input_map = function( options ) {
		var settings = $.extend({
			file_input_name          : null,
			replace_input            : null,
			attach_file_selector     : null,
			file_tag_prefix          : null,
			file_tag_suffix          : null,
			multiple                 : false,
			clone_selector           : false
		}, options);

    var self = this;
    this.files = [];
    
    this.init = function () {
      if(typeof(settings[0]) != 'undefined') {
        for(var i in settings) {
          if(!isNaN(i)) {
           if(typeof(settings[i].file_input_name) != 'undefined' || settings[i].file_input_name != null) {
             var name = $(self).find('input[name=\''+settings[i].file_input_name+'\']').attr('name');
             if (typeof(name) != 'undefined') {
               settings[i].file_input_name = name;
             } else {
                alert('Invalid file input field  in the settings in item number: ('+i+')!');
                settings[i].file_input_name = null;
             }
           } else {
             alert('Please put the name of the field in the settings in item number: ('+i+')!');
             settings[i].file_input_name = null;
           }
           
           //TODO this work only file input have a name
           if(settings[i].file_input_name != null) {
              var file_input = $('input[name=\''+settings[i].file_input_name+'\']');
              file_input.attr('data-group', i);
              if (settings[i].multiple) {
                file_input.attr('multiple', 'multiple');
              }
              
              if (settings[i].replace_input != null) {
                file_input.before(settings[i].replace_input);
                var rep_el =  file_input.prev();
                var width = rep_el.width();
                var height = rep_el.height();
                var position = rep_el.position();
                file_input.css({'opacity':0, 'position':'absolute', 'text-align':'right', 'z-index':2, 'cursor':'pointer', 'width':width+'px', 'height': height+'px', 'left':position.left});
              }

              self.Lisenter_M({
            			file_input_name          : settings[i].file_input_name,
            			file_input_group         : i,
            			replace_input            : (typeof(settings[i].replace_input) != 'undefined'?settings[i].replace_input:null),
            			attach_file_selector     : (typeof(settings[i].attach_file_selector) != 'undefined'?settings[i].attach_file_selector:null),
            			file_tag_prefix          : (typeof(settings[i].file_tag_prefix) != 'undefined'?settings[i].file_tag_prefix:null),
            			file_tag_suffix          : (typeof(settings[i].file_tag_suffix) != 'undefined'?settings[i].file_tag_suffix:null),
            			clone_selector          : (typeof(settings[i].clone_selector) != 'undefined'?settings[i].clone_selector:false),
            			multiple                 : (typeof(settings[i].multiple) != 'undefined'?settings[i].multiple:false)
              });
              
           }
           
           
          }
        }//for
              
      } else {
        if(settings.file_input_name == null) {
           settings.file_input_name =  $(self).find('input[type=\'file\']').eq(0).attr('name');
        } else {
          var name = $(self).find('input[name=\''+settings.file_input_name+'\']').attr('name');
          if (typeof(name) == 'undefined' || name != settings.file_input_name) {
            settings.file_input_name =  $(self).find('input[type=\'file\']').eq(0).attr('name');
          }
        }
        var file_input = $('input[name=\''+settings.file_input_name+'\']');
        if (settings.multiple) {
          file_input.attr('multiple', 'multiple');
        }
        
        if (settings.replace_input != null) {
          file_input.before(settings.replace_input);
          var rep_el =  file_input.prev();
          var width = rep_el.width();
          var height = rep_el.height();
          var position = rep_el.position();
          file_input.css({'opacity':0, 'position':'absolute', 'text-align':'right', 'z-index':2, 'cursor':'pointer', 'width':width+'px', 'height': height+'px', 'left':position.left});
        }
        self.Lisenter(); 
      }
    };
    
    this.addField = function () {
        var last_file_field = $('form[name=\''+$(self).attr('name')+'\'] input:file').last();
        var first_file_field = $('form[name=\''+$(self).attr('name')+'\'] input:file').first();
        var count_file_field = ($('form[name=\''+$(self).attr('name')+'\'] input:file').length) + 1;
        var selector_name = first_file_field.attr('name').toString();
        var selector_name =  (selector_name.indexOf('[') != -1? selector_name:selector_name+count_file_field);
        var selector_id = first_file_field.attr('id')+count_file_field;
        $('<input/>', {
            'type': 'file',
            'name': selector_name,
            'style': first_file_field.attr('style'),
            'id': selector_id
        }).insertAfter(last_file_field);
        self.Lisenter();       
    };
    
    this.Lisenter = function() { 
      $('input[type="file"]', $(self)).change(function(){
        if (settings.clone_selector) {
          if(settings.attach_file_selector != null) {
            if (settings.file_tag_prefix != null && settings.file_tag_suffix != null) {
                $(settings.attach_file_selector).append(settings.file_tag_prefix+$(this).val()+settings.file_tag_suffix);
            } else {
              $(self.settings.append_selector).append($(this).val());
            }
          }
          self.addField();
        } else {
            if (settings.file_tag_prefix != null && settings.file_tag_suffix != null) {
                $(settings.attach_file_selector).html(settings.file_tag_prefix+$(this).val()+settings.file_tag_suffix);
            } else {
              $(self.settings.append_selector).html($(this).val());
            }        
        }
      }); 
    };

    this.addField_M = function (_setting) {
        var last_file_field = $('form[name=\''+$(self).attr('name')+'\'] input[data-group=\''+_setting.file_input_group+'\']').last();
        var first_file_field = $('form[name=\''+$(self).attr('name')+'\'] input[data-group=\''+_setting.file_input_group+'\']').first();
        var count_file_field = ($('form[name=\''+$(self).attr('name')+'\'] input[data-group=\''+_setting.file_input_group+'\']').length) + 1;
        var selector_name = first_file_field.attr('name').toString();
        var selector_name =  (selector_name.indexOf('[') != -1? selector_name:selector_name+count_file_field);
        var selector_id = first_file_field.attr('id')+count_file_field;
        
        $('<input/>', {
            'type': 'file',
            'name': selector_name,
            'data-group': _setting.file_input_group,
            'style': first_file_field.attr('style'),
            'id': selector_id
        }).insertAfter(last_file_field);
       self.Lisenter_M(_setting);
    };
    
    this.Lisenter_M = function(_setting) {
       $('input[type="file"]', $(self)).change(function(){
          if($(this).attr('data-group') == _setting.file_input_group) {
            if (_setting.clone_selector) {
              if (_setting.file_tag_prefix != null && _setting.file_tag_suffix != null) {
                  $(_setting.attach_file_selector).append(_setting.file_tag_prefix+$(this).val()+_setting.file_tag_suffix);
              } else {
                $(_setting.append_selector).append($(this).val());
              }
              self.addField_M(_setting);
            } else {
              if (_setting.file_tag_prefix != null && _setting.file_tag_suffix != null) {
                  $(_setting.attach_file_selector).html(_setting.file_tag_prefix+$(this).val()+_setting.file_tag_suffix);
              } else {
                $(_setting.append_selector).html($(this).val());
              }            
            }
          }
      });
    };
    

		return this.each( function() {
      if (jQuery(this).prop("tagName").toLowerCase() != 'form') {
        alert('Form File Input Map plugin, can be attached only to the form tag!');
        return false;
      }
      self.init();

    
		});

	};

}(jQuery));
