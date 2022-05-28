var Application =  {
  lastId: 0,
  currentSampleNb: 0,

  getNewId: function() {
    Application.lastId++;
    return "window_id_" + Application.lastId;
  },
  
  showCode: function(a, id) {
    a.innerHTML = $(id + "_codediv").visible() ? "View source" : "Hide source"
    $(id + "_codediv").toggle();
  },

  editCode: function(id) {
    var pre = $(id);
    // First time
    if (!pre.textarea) {
      var textarea = document.createElement("textarea");
      var dim = pre.getDimensions();
      textarea.setAttribute('id', id + "_edit");
      textarea.setAttribute('class', 'listing');
  		
  		pre.textarea = textarea
  		
  		pre.parentNode.insertBefore(textarea, pre);
    } 
    // Show text area
    if (pre.visible()) {
      var dim = pre.getDimensions();      
      
      pre.textarea.value = pre.innerHTML;
      pre.hide();
      pre.textarea.style.height = dim.height + "px"
      pre.textarea.style.width = "100%"
      pre.textarea.style.display = "block";
  
  		pre.textarea.focus();
  		$(id+'_edit_button').innerHTML = "Stop editing";
    }
    // Remove text area
    else {
      pre.update(pre.textarea.value);
      pre.textarea.style.display = "none";
      pre.show();
  		$(id+'_edit_button').innerHTML = "Edit Source";
    }
  },
  
  evalCode: function(id) {
    var pre = $(id);
    var code;
    if (pre.textarea && pre.textarea.visible)
      code = pre.textarea.value;
    else
      code = pre.innerHTML;
    
    code = code.gsub("&lt;", "<");
    code = code.gsub("&gt;", ">");
    
    try {
      eval(code);
    }
    catch (error) {
      Dialog.alert(" error accurs while interprating your javascript code <br/>" + error, {windowParameters: {width:300, showEffect:Element.show}, okLabel: "close"});
    }
  },

	addTitle: function(title, id) {
	  Application.currentSampleNb++;
	  idButton = id + '_click_button';
	  
	  document.write("<h2>" + Application.currentSampleNb + ". " + title + " (<span class='title'  id='" + idButton + "' href='#' onmouseover=\"$('" + idButton + "').addClassName('selected')\" onmouseout=\"$('" + idButton + "').removeClassName('selected')\" onclick=\"Application.evalCode('" + id + "', true)\">click here</span>)</h2>")
	},

//
// ---------------------------------------------
//

// Oxygen Framework.
//
// All Finder and Application window definitions are here.
// Resources for all applications reside inside their Resources folders.
//
// Do not steal Mac OS X.


//
// Finder window.
// Opens on click of Finder Dock icon, and double click on Mercury HD.
//

// Trash, then all other windows.

	openFinderTrash: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-trash.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},


// All Finder windows.
	
	openFinderHome: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<div id='window_title'><font face='Lucida Grande, Tahoma' size=2>Finder</font></div>"});
	  win.getContent().innerHTML =
	  
		"<iframe src=System/CoreServices/Finder_app/Contents/finder-home.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openFinderMercuryHD: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-mercuryhd.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openFinderNetwork: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-network.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openFinderApplications: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-applications.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openFinderDesktop: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-desktop.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openFinderDocuments: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-documents.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openFinderMusic: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-music.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openFinderPictures: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-pictures.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openFinderLibrary: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-library.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openFinderDesktopPictures: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-desktoppictures.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},


// Preview functions. Including the CV. This is what Mercury was originally built for.

	openPreviewDeskPic1: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:640, height:480, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Aqua Blue.jpg</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Library/DesktopWallpaper/1024x768/AquaBlue.jpg frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openPreviewDeskPic2: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:640, height:480, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Aqua Graphite.jpg</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Library/DesktopWallpaper/1024x768/AquaGraphite.jpg frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openPreviewDeskPic3: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:640, height:480, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Clown Fish.jpg</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Library/DesktopWallpaper/1024x768/ClownFish.jpg frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openPreviewDeskPic4: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:640, height:480, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Evening Reflections.jpg</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Library/DesktopWallpaper/1024x768/EveningReflections.jpg frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openPreviewDeskPic5: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:640, height:480, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Faux Fur.jpg</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Library/DesktopWallpaper/1024x768/FauxFur.jpg frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openPreviewDeskPic6: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:640, height:480, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Flowing Rock.jpg</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Library/DesktopWallpaper/1024x768/FlowingRock.jpg frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openPreviewDeskPic7: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:640, height:480, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Gentle Rapids.jpg</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Library/DesktopWallpaper/1024x768/GentleRapids.jpg frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openPreviewDeskPic8: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:640, height:480, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Jaguar Aqua Blue.jpg</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Library/DesktopWallpaper/1024x768/JaguarAquaBlue.jpg frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},


// CV's here. The user must have a PDF browser plugin installed, though.

	openCurriculumVitae: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:480, height:600, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Curriculum Vitae</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Public/CV/cv.html frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},

//
// About Finder.
//	
	openAboutFinder: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:301, height:301, minimizable: false, maximizable: false, resizable: false, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>About Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/aboutfinder.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},



// About this Mac.
	
	openAboutThisMac: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:307, height:335, minimizable: false, maximizable: false, resizable: false, title: "<font face='Lucida Grande, Tahoma' size=2>About OS X</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/Resources/aboutthismac.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	

// Safari for Mercury. Yes, it really browses.

	openSafariFromDock: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/unixexec.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},


// Safari displays the help - which is stored online.
	
	openSafariOSXHelp: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/osxhelp.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},


// Safari with Mac OS X Software

	openSafariOSXSoftware: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/osxsoftware.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	
// Time Machine Safari browsers. The timemachine:// protocol is non functional.

	openSafariTimeMachine01: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine01.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariTimeMachine02: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine02.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariTimeMachine03: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine03.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariTimeMachine04: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine04.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariTimeMachine05: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine05.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariTimeMachine06: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine06.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariTimeMachine07: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine07.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariTimeMachine08: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine08.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariTimeMachine09: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine09.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariTimeMachine10: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/timemachine10.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},

// Time Machine browsers end.

// Individual browsers for bookmarks clicked from network
	
	openSafariBookmark01: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark01.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark02: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark02.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark03: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark03.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark04: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark04.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark05: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark05.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark06: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark06.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark07: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark07.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark08: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark08.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark09: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark09.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark10: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark10.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark11: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark11.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark12: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark12.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openSafariBookmark13: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/bookmark13.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	
// Bookmark browsers end.
	

// Safari again, but this time it opens the Leopard page instead.

	openSafariWithLeopard: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:920, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>Safari</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Safari_app/Contents/unixexec_osx.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	

// iTunes. The centre of your digital life. Yes, it has Cover Flow. Well, sorta anyways.

	openiTunes: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:874, height:600, title: "<font face='Lucida Grande, Tahoma' size=2>iTunes</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iTunes_app/Contents/unixexec.html frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},




// Mail. Drop me a line or two. Or others.

	openMail: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, maximizable: false, resizable: false, width:750, height:500, title: "<font face='Lucida Grande, Tahoma' size=2>New Message</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/Mail_app/Contents/MacOS/exec/unixexec.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	
// I think, therefore iWeb.	
	openiWeb: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:800, height:530, maximizable: false, resizable: false, title: "<font face='Lucida Grande, Tahoma' size=2>iWeb</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iWeb_app/Contents/MacOS/exec/unixexec.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	
// iChat. Only contact information. No IM capability yet. Probably coming in OS X Quicksilver

	openiChat: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:250, height:600, maximizable: false, resizable: false, title: "<font face='Lucida Grande, Tahoma' size=2>iChat</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iChat_app/Contents/unixexec.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},	
	
	
// iPhoto. Yes, it's here now. Calm down. Doesn't do as much though (yet).

	openiPhoto: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:900, height:550, title: "<font face='Lucida Grande, Tahoma' size=2>iPhoto</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iPhoto_app/Contents/unixexec.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openiPhotoRoll01: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:900, height:550, title: "<font face='Lucida Grande, Tahoma' size=2>iPhoto</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iPhoto_app/Contents/roll01.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openiPhotoRoll02: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:900, height:550, title: "<font face='Lucida Grande, Tahoma' size=2>iPhoto</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iPhoto_app/Contents/roll02.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openiPhotoRoll03: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:900, height:550, title: "<font face='Lucida Grande, Tahoma' size=2>iPhoto</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iPhoto_app/Contents/roll03.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openiPhotoRoll04: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:900, height:550, title: "<font face='Lucida Grande, Tahoma' size=2>iPhoto</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iPhoto_app/Contents/roll04.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openiPhotoRoll05: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:900, height:550, title: "<font face='Lucida Grande, Tahoma' size=2>iPhoto</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iPhoto_app/Contents/roll05.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openiPhotoRoll06: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:900, height:550, title: "<font face='Lucida Grande, Tahoma' size=2>iPhoto</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iPhoto_app/Contents/roll06.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	openiPhotoRoll07: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:900, height:550, title: "<font face='Lucida Grande, Tahoma' size=2>iPhoto</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/iPhoto_app/Contents/roll07.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},



// System Preferences. Fancy a new wallpaper?

	openSystemPreferences: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:583, height:404, resizable: false, maximizable: false, title: "<font face='Lucida Grande, Tahoma' size=2>System Preferences</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/SystemPreferences_app/Contents/unixexec.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
// Software Update module

	openSoftwareUpdate: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:583, height:404, resizable: false, maximizable: false, title: "<font face='Lucida Grande, Tahoma' size=2>Software Update</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Applications/SystemPreferences_app/Contents/softwareupdate.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	

// Moonlight. It's finally here.
	
	openMoonlight: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:534, height:450, resizable: false, maximizable: false, title: "<font face='Lucida Grande, Tahoma' size=2>Moonlight</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Moonlight_app/Contents/MacOS/unixexec.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},


// Shut down OS X.

	openShutDownDialog: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:455, height:136, resizable: false, maximizable: false, minimizable: false, title: ""});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/LoginWindow_app/Contents/shutdown.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},


// Restart.

	openRestartDialog: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:455, height:136, resizable: false, maximizable: false, minimizable: false, title: ""});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/LoginWindow_app/Contents/restart.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},


// Log me out.

	openLogoutDialog: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:455, height:136, resizable: false, maximizable: false, minimizable: false, title: ""});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/LoginWindow_app/Contents/logout.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},


// Last but not least: Release Notes.
	
	openReleaseNotes: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:480, height:600, resizable: false, maximizable: false, minimizable: false, title: "<font face='Lucida Grande, Tahoma' size=2>OS X Mercury Release Notes</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Public/rn.html frameborder=0 width=100% height=100% scrolling=auto></iframe>";
	  
	  win.showCenter(modal);
	},


// Mcode. The online application development environment.

	openMcode: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:950, height:580, title: "<font face='Lucida Grande, Tahoma' size=2>Mcode</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=Developer/Applications/Mcode_app/Contents/mcode_window.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},
	
	
// Reason folder

	openFinderDesktopReason: function(theme, modal) {
	  var win = new Window(Application.getNewId(), {className: theme, width:700, height:400, title: "<font face='Lucida Grande, Tahoma' size=2 id='findertitle'>Finder</font>"});
	  win.getContent().innerHTML=
	  
	  "<iframe src=System/CoreServices/Finder_app/Contents/finder-desktopreason.html frameborder=0 width=100% height=100% scrolling=no></iframe>";
	  
	  win.showCenter(modal);
	},

//
// ---------------------------------------------
//

	
	insertDocOverview: function() {
	  var div = $('Overview');
	  var html = "<table class='overview''><tr>";
	  
	  // Window
	  html += "<td>Window Class <ul>";
	  $$(".window").each(function(element){html += "- <a href='#" + element.title + "'>" + element.title + "</a><br/>"});
	  html += "</ul></td>";
	  
	  // Dialog
	  html += "<td>Dialog Module <ul>";
	  $$(".dialogmodule").each(function(element){html += "- <a href='#" + element.title + "'>" + element.title + "</a><br/>"});
	  html += "</ul></td>";
	  
	  // Windows
	  html += "<td>Windows Module <ul>";
	  $$(".windows").each(function(element){html += "- <a href='#" + element.title + "'>" + element.title + "</a><br/>"});
	  html += "</ul></td>";
		  
	  html += "</tr></table>"
	  div.innerHTML = html;
	},
	
	insertNavigation: function(selected) {
	  document.write('\
	  <h1><a href="http://prototype-window.xilinus.com"><img border=0 src="logo.gif"/></a></h1>\
    <div class="navigation">\
    </div>');
    $('menu_' + selected).addClassName("selected");
	}
}

function changeTitleHome() {
	document.getElementById('window_title').innerHTML="<font face='Lucida Grande, Tahoma' size=2>Home</font>";
}

function changeTitleApplications() {
	document.getElementById('window_title').innerHTML="<font face='Lucida Grande, Tahoma' size=2>Applications</font>";
}
