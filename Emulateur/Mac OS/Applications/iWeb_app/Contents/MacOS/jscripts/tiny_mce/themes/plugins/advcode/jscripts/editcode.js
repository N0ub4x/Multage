var myWinOpener = true;
var myTinyMCE = null;
var myValidElements  = '';
var myEntityEncoding = '';

// check if window.opener
if (window.opener)
    myWinOpener = true;
// else check parent.frames
if (parent.frames['tinyCode'])
    myWinOpener = false;

var isGecko = false;
var isMSIE  = false;
if (!myWinOpener) {
    isGecko = parent.tinyMCE.isGecko;
    isMSIE  = parent.tinyMCE.isMSIE;
} else {
    isGecko = tinyMCE.isGecko;
    isMSIE  = tinyMCE.isMSIE;
}

// save content to the editor
function saveContent() {
    var html = document.getElementById('htmlcode').value;
    html = html.replace('<em>', '<i>');
    html = html.replace('<em ', '<i ');
    html = html.replace('<\/em>', '</i>');
    html = html.replace('<strong>', '<b>');
    html = html.replace('<strong ', '<b ');
    html = html.replace('<\/strong>', '</b>');
    if (myWinOpener)	 {
        tinyMCE.setContent(html);
        tinyMCE.closeWindow(window);
    } else
        parent.tinyMCE.setContent(html);
}

// onload
function onLoadInit() {
    var html = '';
    var wrap = false;
    if (!myWinOpener) {
        myValidElements  = parent.tinyMCE.settings['valid_elements'] + ',' + parent.tinyMCE.settings['extended_valid_elements'];
        myEntityEncoding = parent.tinyMCE.settings['entity_encoding'];
        wrap = parent.tinyMCE.getParam("theme_advanced_source_editor_wrap", true);
        html = parent.tinyMCE.getContent(parent.tinyMCE.editor_id);
        if (typeof(document.getElementById('container'))!='undefined') {
            document.getElementById('container').style.borderLeft  = 'none';
            document.getElementById('container').style.borderRight = 'none';
        }
    } else {
        document.getElementById('codeBody').style.margin = '5px';
        myValidElements  = tinyMCE.settings['valid_elements'] + ',' + tinyMCE.settings['extended_valid_elements'];
        myEntityEncoding = tinyMCE.settings['entity_encoding'];
        wrap = tinyMCE.getParam("theme_advanced_source_editor_wrap", true);
        html = tinyMCE.getContent(tinyMCE.getWindowArg('editor_id'));
        tinyMCEPopup.resizeToInnerSize();
    }
    resizeInputs();
    html = html.replace('<em>', '<i>');
    html = html.replace('<em ', '<i ');
    html = html.replace('<\/em>', '</i>');
    html = html.replace('<strong>', '<b>');
    html = html.replace('<strong ', '<b ');
    html = html.replace('<\/strong>', '</b>');
    document.getElementById('htmlcode').value = html;
    if (wrap) {
        setWrap('soft');
        document.getElementById('wraped').checked = true;
    }
}

// source code wrap
function setWrap(val) {					
    var s = document.getElementById('htmlcode');
    s.wrap = val;
    if (isGecko) {
        var v = s.value;
        var n = s.cloneNode(false);
        n.setAttribute("wrap", val);
        s.parentNode.replaceChild(n, s);
        n.value = v;
    }
}
function toggleWordWrap(elm) {
    if (elm.checked)
        setWrap('soft');
    else
        setWrap('off');
}

function toggleLineNum(elm) {
    var input = ( (typeof(document.getElementById('htmlcode'))!='undefined') ? document.getElementById('htmlcode') : 0 );
    if (input && !isGecko) {
        if (elm.checked) {
            input.className = 'showNumbers';
								} else {
            input.className = 'hideNumbers';
								}
				}
}

// resizing
var wHeight=0, wWidth=0, owHeight=0, owWidth=0;
function resizeInputs() {
    var el = ( typeof(document.getElementById('editline'))!='undefined' ? document.getElementById('editline') : 0 );
    var ml = ( typeof(document.getElementById('menuline'))!='undefined' ? document.getElementById('menuline') : 0 );
    var fl = ( typeof(document.getElementById('footline'))!='undefined' ? document.getElementById('footline') : 0 );
    var ef = ( typeof(document.getElementById('htmlcode'))!='indefined' ? document.getElementById('htmlcode') : 0 );
    var wHeight=0, wWidth=0, fHeight=0, mHeight=0;
    var fix = -4;
    if (myWinOpener)
        fix = -20;
    if (el && ef) {
        if (!isMSIE) {
            wHeight = self.innerHeight + fix;
            wWidth  = self.innerWidth + fix;
        } else {
            if (document.body) {
                wHeight = document.body.clientHeight + fix;
                wWidth  = document.body.clientWidth + fix;
            } else if (document.documentElement) {
                wHeight = document.documentElement.clientHeight + fix;
                wWidth  = document.documentElement.clientWidth + fix;
            }
        }
        if (fl)
            fHeight = parseInt(fl.offsetHeight, 10);
        if (ml)
            mHeight = parseInt(ml.offsetHeight, 10);
        if (wHeight > 0) {  
            el.style.height = Math.abs(wHeight - mHeight - fHeight) + 'px';
            ef.style.height = Math.abs(wHeight - mHeight - fHeight) + 'px';
        }
        if (wWidth > 0)
            ef.style.width  = Math.abs(wWidth) + 'px';
    }
}

// insert html tags
function insertTag(theTag, endTag) {
    var input = ( (typeof(document.forms['source'].elements['htmlcode'])!='undefined') ? document.forms['source'].elements['htmlcode'] : 0 );
    var aTag = '';
    var eTag = '';
    if (!endTag || endTag == '') {
        switch (theTag) {
            case 'space':
                aTag = '&nbsp;';
                    if (myEntityEncoding.indexOf('num')!=-1)
                        aTag = '&#160;';
                    eTag = '';
                break;
            case 'a':
                var uri = prompt( (myWinOpener ? tinyMCE.getLang("lang_advcode_pagelink_prompt") : parent.tinyMCE.getLang("lang_advcode_pagelink_prompt") ) + ":\n", "http://");
                if (uri!='' && uri!=null && uri!='undefined') {
                    if (uri.substring(0,7) == 'mailto:' && uri.indexOf('@')!=-1 && uri.indexOf('.')!=-1) {
                        uri  = uri.toLowerCase();
                        uri  = uri.replace('mailto:' , '');
                        aTag = '<a href="mailto:' + uri + '" target="_self" title="' + (myWinOpener ? tinyMCE.getLang("lang_advcode_mail_title") : parent.tinyMCE.getLang("lang_advcode_mail_title") ) + ' ' + uri + '">';
                    } else
                        aTag = '<a href="' + uri + '" target="_self">';
                    eTag = '</a>';
                }
                break;
            case 'mail':
                var uri = prompt( (myWinOpener ? tinyMCE.getLang("lang_advcode_mail_prompt") : parent.tinyMCE.getLang("lang_advcode_mail_prompt") )  +":\n", "");
                if (uri!='' && uri!=null && uri!='undefined' && uri.indexOf('@')!=-1 && uri.indexOf('.')!=-1) {
                    uri  = uri.toLowerCase();
                    uri  = uri.replace('mailto:' , '');
                    aTag = '<a href="mailto:' + uri + '" target="_self" title="' + (myWinOpner ? tinyMCE.getLang("lang_advcode_mail_title") : parent.tinyMCE.getLang("lang_advcode_mail_title") ) + ' ' + uri + '">';
                    eTag = '</a>';
                }
                break;
            case 'br':
            case 'break':
                aTag = '<br />\n';
                eTag = '';
                break;
            case 'comment':
                aTag = '<!--\n';
                eTag = '-->\n';
                break;
            case 'script':
                aTag = '<script language="javascript" type="text/javascript">\n<!--\n';
                eTag = '\n//-->\n</script>\n<noscript>\n</noscript>\n';
                break;
            case 'img':
                var uri = prompt( (myWinOpener ? tinyMCE.getLang("lang_advcode_image_prompt") : parent.tinyMCE.getLang("lang_advcode_image_prompt") )  +":\n", "http://");
                if (uri!='' && uri!=null && uri!='undefined' && uri.indexOf('.')!=-1) {
                    aTag = '<img src="' + uri + '" border="0" />';
                    eTag = '';
                }
                break;
            case 'ol':
            case 'ul':
                aTag = '<' + theTag + '>\n <li>';
                eTag = '</li>\n</' + theTag + '>\n';
                break;
            case 'table':
                aTag = '<table border="0">\n <thead>\n </thead>\n <tfoot>\n </tfoot>\n <tbody>\n';
                eTag = '\n </tbody>\n</table>\n';
                break;
            case 'td':
            case 'th':
            case 'tr':
                aTag = '<' + theTag + '>';
                eTag = '</' + theTag + '>';
                break;
            default:
                aTag = '<' + theTag + '>';
                eTag = '</' + theTag + '>';
                break;
        }
    } else {
        aTag = endTag;
        eTag = '';
    }
    if (input && aTag!='') {
        input.focus();
        if (typeof(document.selection) != 'undefined') {
            var range = document.selection.createRange();
            var insText = range.text;
            if (!(insText.indexOf(aTag)!=-1)) {
                range.text = aTag + insText + eTag;
                range = document.selection.createRange();
                if (insText.length == 0)
                    range.move('character', -eTag.length);
                else
                    range.moveStart('character', aTag.length + insText.length + eTag.length);
            }
            range.select();
        } else if (typeof(input.selectionStart) != 'undefined') {
            var start   = input.selectionStart;
            var end     = input.selectionEnd;
            var insText = input.value.substring(start, end);
            if (!(insText.indexOf(aTag)!=-1)) {
                input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);
                var pos;
                if (insText.length == 0)
                    pos = start + aTag.length;
                else
                    pos = start + aTag.length + insText.length + eTag.length;
                input.selectionStart = pos;
                input.selectionEnd   = pos;
            }
        }
    }
}

var tagOpen  = false;
var tagInput = '';
openedTags   = new Array();
tagCounter   = -1;

window.document.onkeydown = onKeyHandler;
document.onkeypress = tagComplete;

function onKeyHandler(e) {
    var evt = (e) ? e : ((event) ? event : null);
    if (evt) {
        var charCode = (evt.charCode) ? evt.charCode : evt.keyCode;
        var alt = evt.altKey || false;
        var shft = evt.shiftKey || false;
        var ctrl = evt.ctrlKey || false;
        if (shft && !ctrl && !alt) {
            switch (charCode) {
                case 13:
                    insertTag('br');
                    doCancel(evt);
                    break;
                case 32:
                    insertTag('space');
                    break;
            }
        } else if (ctrl && !shft && !alt) {
            switch (charCode) {
                case 13:
                    insertTag('p');
                    doCancel(evt);
                    break;
                case 49:
                    insertTag('h1');
                    doCancel(evt);
                    break;
                case 50:
                    insertTag('h2');
                    doCancel(evt);
                    break;
                case 51:
                    insertTag('h3');
                    doCancel(evt);
                    break;
                case 52:
                    insertTag('h4');
                    doCancel(evt);
                    break;
                case 53:
                    insertTag('h5');
                    doCancel(evt);
                    break;
                case 54:
                    insertTag('h6');
                    doCancel(evt);
                    break;
                case 55:
                    insertTag('b');
                    doCancel(evt);
                    break;
                case 56:
                    insertTag('i');
                    doCancel(evt);
                    break;
                case 57:
                    insertTag('a');
                    doCancel(evt);
                    break;
            }
        } else if (alt && shft && !ctrl) {
            switch (charCode) {
                case 50:
                    insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#34;' : '&quot;' ) );
                    doCancel(evt);
                    break;
                case 54:
                    insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#38;' : '&amp;' ) );
                    doCancel(evt);
                    break;
												}
								}
    }
}

function tagComplete(e) {
    var evt = (e) ? e : ((event) ? event : null);
    if (evt) {
        var charCode = (evt.charCode) ? evt.charCode : evt.keyCode;
        switch (charCode) {
            case 47:
                if (tagOpen && typeof(openedTags[tagCounter])!='undefined') {
                    insertTag('', '/' + openedTags[tagCounter] + '>');
                    openedTags.length = openedTags.length-1;
                    tagCounter+=-1;
                    doCancel(evt);
                }
                tagOpen = false;
                break;
            case 60:
                tagOpen = true;
                break;
            case 62:
            case 32:
                if (tagOpen && tagInput!='br' && tagInput!='img' && tagInput!='input' && tagInput!='hr') {
                    tagCounter++;
                    openedTags[tagCounter] = tagInput;
																}
                tagInput = '';
                tagOpen = false;
                break;
            case 196:
                insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#' + charCode + ';' : '&Auml;' ) );
                doCancel(evt);
                break;
            case 214:
                insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#' + charCode + ';' : '&Ouml;' ) );
                doCancel(evt);
                break;
            case 220:
                insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#' + charCode + ';' : '&Uuml;' ) );
                doCancel(evt);
                break;
            case 223:
                insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#' + charCode + ';' : '&szlig;' ) );
                doCancel(evt);
                break;
            case 228:
                insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#' + charCode + ';' : '&auml;' ) );
                doCancel(evt);
                break;
            case 246:
                insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#' + charCode + ';' : '&ouml;' ) );
                doCancel(evt);
                break;
            case 252:
                insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#' + charCode + ';' : '&uuml;' ) );
                doCancel(evt);
                break;
            case 8364:
                insertTag( '', ( (myEntityEncoding.indexOf('num')!=-1) ? '&#' + charCode + ';' : '&euro;' ) );
                doCancel(evt);
                break;
            default:
                var myCharCode = String.fromCharCode(charCode);
                myCharCode = myCharCode.toLowerCase();
                if (tagOpen)
                    tagInput += myCharCode;                       
                break;
								}
    }
}

function doCancel(e) {
    var evt = (e) ? e : ((event) ? event : null);
    if (evt) {
        if (isMSIE) {
            evt.returnValue = false;
            evt.cancelBubble = true;
        } else
            evt.preventDefault();
        return false;
				}
}

