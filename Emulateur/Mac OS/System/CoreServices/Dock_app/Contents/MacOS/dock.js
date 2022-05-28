if(typeof(nitobi)=="\165\u006e\144\u0065f\u0069n\u0065d"){nitobi={}}
if(typeof(nitobi.lang)=="\165n\144ef\151ned"){nitobi.lang=function(){}
}
nitobi.initFishEye = function(el) { var isIE6 = false; var myagent = navigator.userAgent.toLowerCase(); if ((myagent.indexOf("msie 7.0") == -1) && (myagent.indexOf("msie") != -1)) {isIE6 = true}
isIE = false; if (myagent.indexOf("msie") != -1) {isIE = true;}
var divname = el + 'container'; var elobj = document.getElementById(el); try { var growpercent = elobj.getAttribute("growpercent"); var opendirection = elobj.getAttribute("opendirection"); var expanddirection = elobj.getAttribute("expanddirection"); var iconwidth = elobj.getAttribute("iconwidth"); if (isIE) { elobj.insertAdjacentHTML('beforeBegin', '<div id="' + divname + '"></div>');} else { var testContainer = document.createElement('div'); testContainer.setAttribute('id', divname); elobj.appendChild(testContainer);}
} catch(e) {alert('There is a problem with the Nitobi FishEye Declaration.\n\nThe id "' + el + '" cannot be found.');}
try { nitobiFishEyeObjs[nitobiFishEyeObjs.length] = new ntbFishEye(divname, parseInt(growpercent), opendirection, expanddirection, parseInt(iconwidth)); for(var i=0; i < elobj.childNodes.length; i++)
{ var childTag = elobj.childNodes[i]; if (childTag.nodeType != 3) { var mysrc = childTag.getAttribute("imagesrc"); if (mysrc != null)
nitobiFishEyeObjs[nitobiFishEyeObjs.length-1].addMenuItem(mysrc, childTag.getAttribute("label"), childTag.getAttribute("jsaction"));}
}
nitobiFishEyeObjs[nitobiFishEyeObjs.length-1].render();} catch(e) {alert('There is a problem with the Nitobi FishEye Declaration.\n\nError processing child nodes.');}
}
nitobi.initFishEyes = function() { var FishEyes = document.getElementsByTagName("FishEye"); for (var i = 0; i < FishEyes.length; i++) { nitobi.initFishEye(FishEyes[i].id);}
var FishEyes = document.getElementsByTagName("NTB:FishEye"); for (var i = 0; i < FishEyes.length; i++) { nitobi.initFishEye(FishEyes[i].id);}
}
var ntbFishEyeInit = false; var ntbFishEyeList = Array(); var nitobiFishEyeObjs = Array(); function ntbFishEye(targetDiv, growPercent, openDirection, expandDirection, iconWidth, containerClass, iconArea)
{ ntbFishEyeList[ntbFishEyeList.length] = this; this.uid = Math.random().toString().replace('.', '').replace('0', ''); this.ver = "1.0a"; this.targetDiv = targetDiv; this.fishEyeMode = "LIBERAL"; this.iconWidth = 65; this.iconHeight = 0; this.growPercent = 2.0; this.alignment = "HORIZONTAL"; this.expandDirection = "RIGHT"; this.eD = 0; this.fishEyeWidth = 0; this.x = 0; this.y = 0; this.rangeSensitivity = 2.2; this.timerObj = null; var agent = navigator.userAgent.toLowerCase(); this.opera = false; if (agent.indexOf("opera") == 0) {this.opera = true;}
this.highval = 0; this.highindex = 0; this.iconrange = 4; this.iteratetimer = null; this.useIterator = true; this.disableIterator = null; this.startedIKillTimer = false; this.restartIterator = null; this.foundActive = false; this.currentxoffset = 0; this.mouseX = 0; this.mouseY = 0; this.lastBounce = 0; this.bounceKiller = null; this.loaded = false; this.d_2 = window; this.isIE6 = false; var myagent = navigator.userAgent.toLowerCase(); if ((myagent.indexOf("msie 7.0") == -1) && (myagent.indexOf("msie") != -1)) {this.isIE6 = true}
this.isIE = false; if (myagent.indexOf("msie") != -1) {this.isIE = true;}
if (expandDirection != null)
this.expandDirection = expandDirection.toUpperCase(); this.openDirection = "DOWN"; if (this.alignment == "VERTICAL")
this.openDirection = "RIGHT"; if (openDirection != null)
this.openDirection = openDirection.toUpperCase(); if (iconWidth != null)
this.iconWidth = parseInt(iconWidth); if (growPercent != null){ if (parseInt(growPercent) > 1)
{ this.growPercent = parseInt(growPercent)/100;} else {this.growPercent = 1 + growPercent;}
}
if (iconArea != null) { this.iconArea = parseInt(iconArea);} else { this.iconArea = this.iconWidth*1.0;}
this.menuItems = Array(); this.menuObjects = Array(); this.divObj = document.getElementById(targetDiv); this.minHeight = 0; this.minWidth = 0; this.containerPadding = this.iconArea*0.06; this.labelObj = document.createElement('div'); this.labelObj.setAttribute('id', 'ntbFishEyeLabel_' + this.uid); this.labelObj.style.position = 'absolute'; this.labelObj.style.visibility = 'visible'; this.labelObj.style.width = '1px'; this.labelObj.style.height = '1px'; this.labelObj.style.top = '1px'; this.labelObj.style.left = '1px'; document.getElementsByTagName('body').item(0).appendChild(this.labelObj); this.labelObj.innerHTML = 'blank'; this.labelObj.style.border = '0px solid #000000'; this.labelObj.style.fontFamily = 'lucida grande, tahoma'; this.labelObj.style.color = '#FFFFFF'; this.labelObj.style.fontSize = '14px'; this.labelObj.style.textAlign = 'center'; this.labelObj.style.fontWeight = 'bold'; this.labelObj.style.whiteSpace = 'nowrap'; this.labelObj.style.visibility = 'hidden'; this.labelObj.style.padding = '3px'; this.labelObj.style.paddingLeft = '5px'; this.labelObj.style.paddingRight = '5px'; this.labelObj.style.width = '50px'; this.labelObj.style.height = '15px'; this.labelObj.style.opacity = 0.85; this.labelObj.style.filter = 'alpha(opacity=' + (0.85*100) + ')'; this.labeltext = ''; this.MasterContainer = document.createElement('div'); this.MasterContainer.setAttribute('id', 'ntbFishEyeMenu_' + this.uid); document.getElementsByTagName('body').item(0).appendChild(this.MasterContainer); this.MasterContainer.style.position = 'absolute'; this.MasterContainer.style.visibility = 'hidden'; this.MasterContainer.style.width = '0px'; this.MasterContainer.style.height = '0px'; this.MasterContainer.style.zIndex = '4000000'; this.MasterContainer.style.cursor = 'default'; this.BGContainer = document.createElement('div'); this.BGContainer.setAttribute('id', 'ntbFishEyeMenuBG_' + this.uid); document.getElementsByTagName('body').item(0).appendChild(this.BGContainer); if (containerClass == null) { this.BGContainer.style.backgroundColor = '#DBDFEA'; this.BGContainer.style.border = '1px solid #FFFFFF'; this.BGContainer.style.zIndex = '4000000'; this.BGContainer.style.cursor = 'default'; this.BGContainer.style.opacity = 0.65; this.BGContainer.style.filter = 'alpha(opacity=' + (0.65*100) + ')';} else { this.BGContainer.className = containerClass;}
this.BGContainer.style.position = 'absolute'; this.BGContainer.style.visibility = 'hidden'; this.BGContainer.style.width = '100px'; this.BGContainer.style.height = '100px'; this.BGContainer.style.top = '100px'; this.BGContainer.style.top = '100px'; this.u3_2 = this.d_2.location; this.updateMenuPosition(); if (ntbFishEyeInit == false) { if (window.addEventListener)
{ window.addEventListener("mousemove", ntbFisheyeHandleMouse, false); window.addEventListener("resize", nitobi.fishEyeUpdatePositions, false);}
else if (window.attachEvent)
{ document.attachEvent('onmousemove', ntbFisheyeHandleMouse); window.attachEvent('onresize', nitobi.fishEyeUpdatePositions);} ntbFishEyeInit = true;}
if (this.expandDirection == 'RIGHT')
this.eD = 0; if (this.expandDirection == 'LEFT')
this.eD = 1; if (this.expandDirection == 'CENTER')
this.eD = 2;}
function ntbFisheyeHandleMouse(event)
{ var sP = ntbGetScroll(); var doRedraw = false; var mouseX, mouseY; mouseX = event.clientX + sP.scrollLeft ; mouseY = event.clientY + sP.scrollTop; var t,f,w,h,x,y,o,ol,p,q,dist,calcval; for (t = 0; t < ntbFishEyeList.length; t++) { o = ntbFishEyeList[t]; if (o.loaded) { w = o.iconWidth; h = o.iconHeight; ol = o.menuObjects.length; o.highval = 0; o.highindex = -1; o.foundActive = false; for (f = 0; f < ol; f++) { if (o.menuObjects[f].mysize > 0.01)
doRedraw = true; x = o.x+o.menuObjects[f].myx+(w/2); y = o.y+o.menuObjects[f].myy+(h/2); if (o.eD == 2)
p = Math.abs((x)-mouseX); if (o.eD == 0)
p = Math.abs((x)-mouseX+(o.currentxoffset*(f/ol))); if (o.eD == 1)
p = Math.abs((x)-mouseX-(o.currentxoffset*((ol-f)/ol))); q = Math.abs((y)-mouseY); dist = Math.sqrt((p*p)); if ((p < (w*o.rangeSensitivity)) && (q < (h*o.rangeSensitivity)))
{ doRedraw = true; o.mouseX = mouseX; o.mouseY = mouseY; o.foundActive = true; calcval = 1-(dist/(w*o.rangeSensitivity)); o.menuObjects[f].mysize = calcval; if (o.highval < calcval)
{ o.highval = calcval; o.highindex = f;}
} else {o.menuObjects[f].mysize = 0;}
}
if (!o.foundActive)
o.useIterator = true; if ((doRedraw) || (o.highindex > -1))
o.reDrawItems();}
}
o = null;}
ntbFishEye.prototype.handleBounce = function(menuItem)
{ var ffs = this; this.menuObjects[menuItem].bounceIt += 0.045; if (this.menuObjects[menuItem].bounceIt > 1.0)
this.menuObjects[menuItem].bounceIt -= 1.0; this.menuObjects[menuItem].yoffset = Math.sin(this.menuObjects[menuItem].bounceIt*3.1415926)*(this.growPercent*this.iconWidth*0.13); this.iteratetimer = setTimeout(function(){ffs.reDrawItems()}, 30); this.menuObjects[menuItem].bounceTimer = setTimeout(function(){ffs.handleBounce(menuItem)}, 30);}
ntbFishEye.prototype.bounceItem = function(menuItem, bounceTime)
{ var ffd = this; this.menuObjects[this.lastBounce].bounceIt = 0; this.menuObjects[this.lastBounce].yoffset = 0; clearTimeout(this.menuObjects[this.lastBounce].bounceTimer); this.menuObjects[menuItem].bounceIt = 0; this.lastBounce = menuItem; clearTimeout(this.menuObjects[menuItem].bounceTimer); clearTimeout(this.bounceKiller); clearTimeout(this.iteratetimer); this.bounceKiller = setTimeout(function(){clearTimeout(ffd.menuObjects[menuItem].bounceTimer); ffd.menuObjects[menuItem].yoffset = 0;}, bounceTime); this.handleBounce(menuItem);}
ntbFishEye.prototype.positionLabel = function(labelText, x,y)
{ if (labelText != null) { if (this.labeltext != labelText) { this.labelObj.style.width = ''; this.labelObj.innerHTML = labelText; this.labeltext = labelText; if (this.opera) { this.labelObj.style.width = '75px';} else {this.labelObj.style.width = this.labelObj.offsetWidth;}
}
this.labelObj.style.visibility = 'visible'; this.labelObj.style.left = (x-this.labelObj.offsetWidth/2) + 'px'; this.labelObj.style.top = y + 'px';} else
{ this.labelObj.style.visibility = 'hidden';}
}
ntbFishEye.prototype.reDrawItems = function()
{ var f; var ol = this.menuObjects.length; var w,h; var ms,rs, nw,nh,cx,cy; var doagain = false; var fds = this; var xoffset,yoffset, totalxoffset; clearTimeout(this.iteratetimer); var percentExpanded = 0; if ((this.useIterator) && (!this.startedIKillTimer) && (this.foundActive)) { this.startedIKillTimer = true; clearTimeout(this.disableIterator); this.disableIterator = setTimeout(function(){fds.useIterator = false;}, 400);}
clearTimeout(this.restartIterator); xoffset = 0; totalxoffset = 0; for (f = 0; f < ol; f++) { ms = this.menuObjects[f].mysize; if (ms > 0.01)
{ if ((ms > this.menuObjects[f].lastsize) && (this.useIterator)){ rs = this.menuObjects[f].lastsize+((ms-this.menuObjects[f].lastsize)/4.5); this.menuObjects[f].lastsize = rs;} else { this.menuObjects[f].lastsize = ms; rs = ms;}
percentExpanded = rs/ms; w = this.menuObjects[f].startWidth; h = this.menuObjects[f].startHeight; nw = w*(((this.growPercent-1)*rs)+1); nh = h*(((this.growPercent-1)*rs)+1); this.menuObjects[f].currentWidth = nw; this.menuObjects[f].currentHeight = nh;} else { ms = 0; if (this.useIterator) { rs = this.menuObjects[f].lastsize+((ms-this.menuObjects[f].lastsize)/4.5);} else { rs = ms;}
this.menuObjects[f].lastsize = rs; w = this.menuObjects[f].startWidth; h = this.menuObjects[f].startHeight; nw = w*(((this.growPercent-1)*rs)+1); nh = h*(((this.growPercent-1)*rs)+1); this.menuObjects[f].currentWidth = nw; this.menuObjects[f].currentHeight = nh;}
this.menuObjects[f].xoffset = (nw-w); totalxoffset += (nw-w); if (rs > 0.01)
doagain = true;}
if (this.highindex == -1)
this.labelObj.style.visibility = 'hidden'; if ((this.eD == 2) && (this.highindex > -1)) { for (f = 0; f < ol; f++) { ms = this.menuObjects[f].mysize; nw = this.menuObjects[f].currentWidth; nh = this.menuObjects[f].currentHeight; this.menuObjects[f].style.width = nw; this.menuObjects[f].style.height = nh; xoffset = (1-this.menuObjects[f].mysize)*(totalxoffset/2)*(1+(this.growPercent/11)); if ((this.mouseX-this.x) >= (this.menuObjects[f].myx+(this.menuObjects[f].startWidth/2))) { cx = (this.menuObjects[f].startWidth)+(this.menuObjects[f].myx - ((nw)/2)-xoffset); this.menuObjects[f].style.left = cx + 'px';}
if ((this.mouseX-this.x) < (this.menuObjects[f].myx+(this.menuObjects[f].startWidth/2))) { cx = xoffset+(this.menuObjects[f].startWidth)+(this.menuObjects[f].myx - ((nw)/2)); this.menuObjects[f].style.left = cx + 'px';}
if (this.openDirection == 'UP') { cy = -(this.menuObjects[f].currentHeight-this.menuObjects[f].startHeight+this.menuObjects[f].yoffset); cy -= ms*(this.iconArea/3); this.menuObjects[f].style.top = cy + 'px'; if (f == this.highindex)
this.positionLabel(this.menuItems[f].imgLabel, this.x+cx+(nw/2),this.y+cy-23);} else { cy = this.menuObjects[f].yoffset; cy += ms*(this.iconArea/3); this.menuObjects[f].style.top = cy + 'px'; if (f == this.highindex)
this.positionLabel(this.menuItems[f].imgLabel, this.x+cx+(nw/2),this.y+nh+cy);}
}
}
if ((this.eD == 0) || ((this.eD == 2) && (this.highindex == -1)))
for (f = 0; f < ol; f++) { ms = this.menuObjects[f].mysize; nw = this.menuObjects[f].currentWidth; nh = this.menuObjects[f].currentHeight; this.menuObjects[f].style.width = nw; this.menuObjects[f].style.height = nh; if (f>0)
xoffset += (this.menuObjects[f-1].xoffset/2)*(1+(this.growPercent/2.5)); cx = xoffset+(this.menuObjects[f].startWidth/2)+(this.menuObjects[f].myx - ((nw)/2)); this.menuObjects[f].style.left = cx + 'px'; if (this.openDirection == 'UP') { cy = -(this.menuObjects[f].currentHeight-this.menuObjects[f].startHeight+this.menuObjects[f].yoffset); cy -= ms*(this.iconArea/3); this.menuObjects[f].style.top = cy + 'px'; if (f == this.highindex)
this.positionLabel(this.menuItems[f].imgLabel, this.x+cx+(nw/2),this.y+cy-23);} else { cy = this.menuObjects[f].yoffset; cy += ms*(this.iconArea/3); this.menuObjects[f].style.top = cy + 'px'; if (f == this.highindex)
this.positionLabel(this.menuItems[f].imgLabel, this.x+cx+(nw/2),this.y+nh+cy);}
}
if (this.eD == 1)
for (f = ol-1; f >= 0; f--) { ms = this.menuObjects[f].mysize; nw = this.menuObjects[f].currentWidth; nh = this.menuObjects[f].currentHeight; this.menuObjects[f].style.width = nw; this.menuObjects[f].style.height = nh; if (f<(ol-1))
xoffset += (this.menuObjects[f+1].xoffset/2)*(1+(this.growPercent/2.5)); cx = (this.menuObjects[f].startWidth/2)+(this.menuObjects[f].myx - ((nw)/2)-xoffset); this.menuObjects[f].style.left = cx + 'px'; if (this.openDirection == 'UP') { cy = -(this.menuObjects[f].currentHeight-this.menuObjects[f].startHeight+this.menuObjects[f].yoffset); cy -= ms*(this.iconArea/3); this.menuObjects[f].style.top = cy + 'px'; if (f == this.highindex)
this.positionLabel(this.menuItems[f].imgLabel, this.x+cx+(nw/2),this.y+cy-23);} else { cy = this.menuObjects[f].yoffset; cy += ms*(this.iconArea/3); this.menuObjects[f].style.top = cy + 'px'; if (f == this.highindex)
this.positionLabel(this.menuItems[f].imgLabel, this.x+cx+(nw/2),this.y+nh+cy);}
}
this.currentxoffset = xoffset; var ls = parseInt(this.MasterContainer.style.left.replace('px', '')) + parseInt(this.menuObjects[0].style.left.replace('px', '')); this.BGContainer.style.left = (ls-this.containerPadding) + 'px'; this.BGContainer.style.top = (parseInt(this.MasterContainer.style.top.replace('px', ''))-this.containerPadding) + 'px'; this.BGContainer.style.height = (parseInt(this.MasterContainer.offsetHeight)+this.containerPadding+this.containerPadding); this.BGContainer.style.width = (parseInt(this.menuObjects[this.menuObjects.length-1].style.left.replace('px', '')) + (parseInt(this.menuObjects[this.menuObjects.length-1].style.width.replace('px', ''))) - parseInt(this.menuObjects[0].style.left.replace('px', ''))+this.containerPadding+this.containerPadding); if ((doagain) && ((this.useIterator) || (!this.foundActive))) { this.iteratetimer = setTimeout(function(){fds.reDrawItems()}, 40);} else { this.startedIKillTimer = false; clearTimeout(this.disableIterator); this.restartIterator = setTimeout(function(){clearTimeout(fds.disableIterator); fds.startedIKillTimer = false; fds.useIterator = true;}, 420);}
}
ntbFishEye.prototype.addMenuItem = function(imgFile, imgLabel, menuAction)
{ clearTimeout(this.timerObj); var ds = this; var menuLength = this.menuItems.length; this.menuItems[menuLength] = imgFile; this.menuItems[menuLength] = new Image(); this.menuItems[menuLength].src = imgFile; this.menuItems[menuLength].imgLabel = imgLabel; this.menuItems[menuLength].menuAction = menuAction;}
ntbFishEye.prototype.render = function()
{ var passOK = true; var obj = this; var t; for (t = 0; t < this.menuItems.length; t++)
if (!this.menuItems[t].complete)
passOK = false; if (!passOK) { setTimeout(function(){obj.render()}, 100);} else { var sos = this.u3_2 + ' '; if (sos.indexOf('\u006e\u0069\u0074\u006f\u0062\u0069\u002e\u0063\u006f\u006d') > 0)
{} else {}
this.loaded = true; this.timerObj = setTimeout(nitobi.fishEyeUpdatePositions,300); this.BGContainer.style.visibility = 'visible'; var myHeight, myWidth; for (t = 0; t < this.menuItems.length; t++)
{ myHeight = this.iconWidth*(this.menuItems[t].width/this.menuItems[t].height); myWidth = this.iconWidth; if (this.isIE6) { this.menuObjects[t] = document.createElement('div'); this.menuObjects[t].style.height = myHeight; this.menuObjects[t].style.width = myWidth; this.menuObjects[t].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.menuItems[t].src + "', sizingMethod='scale'); ";} else { this.menuObjects[t] = document.createElement('img'); this.menuObjects[t].src = this.menuItems[t].src; this.menuObjects[t].height = myHeight; this.menuObjects[t].width = myWidth;}
this.menuObjects[t].setAttribute('id', 'ntbFishEyeObj_' + this.uid + '_' + t); this.menuObjects[t].style.position = 'absolute'; this.menuObjects[t].style.cursor = 'pointer'; this.menuObjects[t].style.visibility = 'hidden'; this.menuObjects[t].style.top = '0px'; this.menuObjects[t].style.left = this.minWidth + 'px'; this.menuObjects[t].myx = this.minWidth; this.menuObjects[t].myy = 0; this.menuObjects[t].bounceTimer = null; this.menuObjects[t].bounceIt = 0; this.menuObjects[t].mysize = 0; this.menuObjects[t].lastsize = 0; this.menuObjects[t].xoffset = 0; this.menuObjects[t].yoffset = 0; this.menuObjects[t].distance = 0; this.menuObjects[t].startWidth = myWidth; this.menuObjects[t].startHeight = myHeight; this.menuObjects[t].currentWidth = myWidth; this.menuObjects[t].currentHeight = myHeight; this.menuObjects[t].onclick = function(){obj.bounceItem(obj.highindex,3000); if (obj.menuItems[obj.highindex].menuAction != null) {eval(obj.menuItems[obj.highindex].menuAction);}}; if (myHeight > this.minHeight)
this.minHeight = myHeight; if (myHeight > this.iconHeight)
this.iconHeight = myHeight; this.minWidth += this.iconArea; this.MasterContainer.style.width = this.minWidth + 'px'; this.MasterContainer.style.height = this.minHeight + 'px'; this.MasterContainer.appendChild(this.menuObjects[t]);}
this.divObj.style.width = (this.minWidth+this.containerPadding+this.containerPadding) + 'px'; this.divObj.style.height = (this.minHeight+this.containerPadding+this.containerPadding) + 'px'; this.MasterContainer.style.visibility = 'visible'; this.updateMenuPosition(); this.reDrawItems(); obj.labelObj.style.display = 'none'; setTimeout(function() {obj.labelObj.style.visibility = 'hidden'; obj.labelObj.style.display = 'block';}, 700);}
}
ntbFishEye.prototype.getCoords = function(element)
{ var ew, eh; try { var originalElement = element; ew = element.offsetWidth; eh = element.offsetHeight; for (var lx=0,ly=0;element!=null; lx+=element.offsetLeft,ly+=element.offsetTop,element=element.offsetParent); for (;originalElement!=document.body; lx-=originalElement.scrollLeft,ly-=originalElement.scrollTop,originalElement=originalElement.parentNode);} catch(e) {}
return {x:lx,y:ly,h:eh,w:ew}
}; ntbFishEye.prototype.showhide = function(whichisit)
{ var t; for (t = 0; t < this.menuItems.length; t++)
{ if (whichisit) { this.menuObjects[t].style.visibility = 'visible';} else {this.menuObjects[t].style.visibility = 'hidden';}
}
}
ntbFishEye.prototype.updateMenuPosition = function()
{ var objCoords = this.getCoords(this.divObj); this.MasterContainer.style.top = (objCoords.y+this.containerPadding) + 'px'; this.MasterContainer.style.left = (objCoords.x+this.containerPadding) + 'px'; this.x = (objCoords.x+this.containerPadding); this.y = (objCoords.y+this.containerPadding);}
nitobi.fishEyeUpdatePositions = function() { for (t = 0; t < ntbFishEyeList.length; t++) { ntbFishEyeList[t].showhide(false); ntbFishEyeList[t].updateMenuPosition(); ntbFishEyeList[t].reDrawItems();}
for (t = 0; t < ntbFishEyeList.length; t++) { ntbFishEyeList[t].showhide(true);}
}
function ntbGetScroll() { var ResultScrollTop, ResultScrollLeft = 0; if ((this.opera == false) && (document.documentElement.scrollTop > 0)) { ResultScrollTop = document.documentElement.scrollTop; ResultScrollLeft = document.documentElement.scrollLeft;} else { ResultScrollTop = document.body.scrollTop; ResultScrollLeft = document.body.scrollLeft;}
if (((ResultScrollTop == 0) && (document.documentElement.scrollTop > 0)) || ((ResultScrollLeft == 0) && (document.documentElement.scrollLeft > 0))){ ResultScrollTop = document.documentElement.scrollTop; ResultScrollLeft = document.documentElement.scrollLeft;}
return {scrollLeft:ResultScrollLeft,scrollTop:ResultScrollTop}
}
