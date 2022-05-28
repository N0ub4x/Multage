/**
 * $Id: editor_plugin_src.js 59 2006-11-17 13:30:19Z mkkeck $
 *
 * @author Michael Keck
 * @copyright Copyright © 2006 Michael Keck. All rights reserved.
 */

// import plugin specific language pack
tinyMCE.importPluginLanguagePack('advcode', 'en,de');

var TinyMCE_AdvancedCodePlugin = {
    getInfo : function() {
        return {
            longname  : 'Advanced Code',
            lang_code_desk : 'Advanced Code',
            author    : 'Michael Keck',
            authorurl : 'http://michaelkeck.de',
            infourl   : 'http://michaelkeck.de',
            version   : tinyMCE.majorVersion + "." + tinyMCE.minorVersion
        };
    },

    getControlHTML : function(cn) {
        switch (cn) {
            case "code":
                return tinyMCE.getButtonHTML(cn, 'lang_code_desc', '{$themeurl}/images/code.gif', 'mceAdvCode');
        }
        return "";
    },

    execCommand : function(editor_id, element, command, user_interface, value) {
        switch (command) {
            case "mceAdvCode":
                var template = new Array();
                template['file']   = '../../plugins/advcode/editcode.htm';
                template['width']  = parseInt(tinyMCE.getParam("theme_advanced_source_editor_width", 720));
                template['height'] = parseInt(tinyMCE.getParam("theme_advanced_source_editor_height", 380));
                // language specific width and height addons
                template['width']  += tinyMCE.getLang('lang_advcode_delta_width', 0);
                template['height'] += tinyMCE.getLang('lang_advcode_delta_height', 0);
                var inst = tinyMCE.getInstanceById(editor_id);
                var elm  = inst.getFocusElement();
                if (elm != null && tinyMCE.getAttrib(elm, 'class').indexOf('mceItem') != -1)
                    return true;
                tinyMCE.openWindow(template, {editor_id : editor_id, resizable : "yes", scrollbars : "no", inline : "yes"});
                return true;
            case "mceTabCode":
                var tabbedWin = ( (typeof(parent.frames['tinyCode'])!='undefined') ? parent.frames['tinyCode'] : 0 );
                if (tabbedWin)
                    tabbedWin.location.href = 'tinymce/jscripts/tiny_mce/plugins/advcode/editcode.htm';
                return true;
        }
        return false;
    }

};

tinyMCE.addPlugin("advcode", TinyMCE_AdvancedCodePlugin);
