(function() {
    tinymce.create('tinymce.plugins.Vital', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(ed, url) {
            ed.addCommand('wholepost', function() {
                var selected_text = ed.selection.getContent();
                var return_text = '';
                return_text = '[whole_post link_show="Continue" link_hide="Hide Post"]' + selected_text + '[/whole_post]';
                ed.execCommand('mceInsertContent', 0, return_text);
            });
            
            ed.addButton('wholepost', {
                title : 'Expandable Post Content',
                cmd : 'wholepost',
                image : url + '/wholepost.png'
            });

            ed.addCommand('column_left', function() {
                var selected_text = ed.selection.getContent();
                var return_text = '';
                return_text = '[column_left width_percent="50" pad_r="12" pad_l="0" seamless_grid="false"]' + selected_text + '[/column_left]';
                ed.execCommand('mceInsertContent', 0, return_text);
            });
            
            ed.addButton('column_left', {
                title : 'Left Column',
                cmd : 'column_left',
                image : url + '/column_left.png'
            });

            ed.addCommand('column_right', function() {
                var selected_text = ed.selection.getContent();
                var return_text = '';
                return_text = '[column_right width_percent="50" pad_r="0" pad_l="12" seamless_grid="false"]' + selected_text + '[/column_right]';
                ed.execCommand('mceInsertContent', 0, return_text);
            });
            
            ed.addButton('column_right', {
                title : 'Right Column',
                cmd : 'column_right',
                image : url + '/column_right.png'
            });


            ed.addCommand('narrow_text', function() {
                var selected_text = ed.selection.getContent();
                var return_text = '';
                return_text = '[narrow_text]' + selected_text + '[/narrow_text]';
                ed.execCommand('mceInsertContent', 0, return_text);
            });
            
            ed.addButton('narrow_text', {
                title : 'Narrow Width Text',
                cmd : 'narrow_text',
                image : url + '/narrow_text.png'
            });
        },

        /**
         * Creates control instances based in the incomming name. This method is normally not
         * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
         * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
         * method can be used to create those.
         *
         * @param {String} n Name of the control to create.
         * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
         * @return {tinymce.ui.Control} New control instance or null if no control was created.
         */
        createControl : function(n, cm) {
            return null;
        },

        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                    longname : 'TinyMCE additions from Tedworth & Oscar - collapsible content and variable width columns',
                    author : 'Tedworth & Oscar',
                    authorurl : 'http://tedworthandoscar.co.uk',
                    version : "0.2"
            };
        }
    });

    // Register plugin
    tinymce.PluginManager.add('vital', tinymce.plugins.Vital);
})();