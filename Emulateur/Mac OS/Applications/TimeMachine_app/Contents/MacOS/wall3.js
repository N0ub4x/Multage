////////////////////////////////////////////////////////////////
// 
// wall3.js
//
// Copyright (c) 2006 (Vinh Le Quang). 
// http://www.bunnypot.com/library/
// You may copy or reuse this code only if you include this copyright notice.
// Send comments to kwanguru@yahoo.com
//
////////////////////////////////////////////////////////////////



if(typeof world3=="undefined")
{
	alert("You need '3d.js'.");
}

function Wall3(xstart,ystart,xend,yend,color,redwall)
{
	this.pointstart = new Point2(xstart,ystart);
	this.pointend = new Point2(xend,yend);
	this.color = new Object();
	this.color.R = Math.floor(color/256/256)%256;
	this.color.G = Math.floor(color/256)%256;
	this.color.B = color%256;
	this.redwall = redwall;

//	alert(this.color.R + "," + this.color.G + "," + this.color.B);
	
	var colorvalue = Math.sqrt(this.color.R*this.color.R + this.color.G*this.color.G + this.color.B*this.color.B);
	this.color.R /= colorvalue;
	this.color.G /= colorvalue;
	this.color.B /= colorvalue;
	
	this.isdirty = true;
	
	var table = this.table = mainscreen.appendChild(document.createElement("table"));
	table.cellPadding = 0;
	table.cellSpacing = 0;
	table.border = 0;
	table.style.position = "absolute";
	table.style.filter = redwall?"alpha(opacity=50)":"";
	table.style.MozOpacity = redwall?.5:"";

	var toprow = table.insertRow(0);
	var midrow = table.insertRow(1);
	var botrow = table.insertRow(2);
	
	var topcell = toprow.insertCell(0);
	var midcell = midrow.insertCell(0);
	var botcell = botrow.insertCell(0);

	this.topimg = topcell.appendChild(document.createElement("img"));
	this.midimg = midcell.appendChild(document.createElement("img"));
	this.botimg = botcell.appendChild(document.createElement("img"));

	this.topimg.src = "../Resources/transparent.png";//"blank.gif";
	this.topimg.galleryImg="no";
	this.midimg.src = "../Resources/transparent.png";
	this.midimg.galleryImg="no";
	this.botimg.src = "../Resources/transparent.png";//"blank.gif";
	this.botimg.galleryImg="no";

	world3.sprites.push(this);
}

Wall3.prototype = new Object();

Wall3.prototype.type = "Wall3";

Wall3.prototype.display = function()
{
	var x1 = this.pointstart.x2;
	var y1 = this.pointstart.y2;
/*	var realx1 = Math.cos(world3.angle)*x1 + Math.sin(world3.angle)*y1;
	var realy1 = Math.cos(world3.angle)*y1 + Math.sin(world3.angle)*x1;
	x1 = realx1; y1 = realy1;		
	*/
	var hfloor1 = world3.hstart + world3.floor*world3.hscale + world3.slope*y1;
	var hceiling1 = world3.hstart + world3.ceiling*world3.hscale + world3.slope*y1;
	var x1 = (world3.xstart + (x1-50)*world3.xscale);
	var y1 = (world3.ystart + y1*world3.yscale + 10);
	var xfactor1 = 100/y1;
	
	var x2 = this.pointend.x2;
	var y2 = this.pointend.y2;
/*	var realx2 = Math.cos(world3.angle)*x2 + Math.sin(world3.angle)*y2;
	var realy2 = Math.cos(world3.angle)*y2 + Math.sin(world3.angle)*x2;
	x2 = realx2; y2 = realy2;
	*/
	var hfloor2 = world3.hstart + world3.floor*world3.hscale + world3.slope*y2;
	var hceiling2 = world3.hstart + world3.ceiling*world3.hscale + world3.slope*y2;
	var x2 = (world3.xstart + (x2-50)*world3.xscale);
	var y2 = (world3.ystart + y2*world3.yscale + 10);
	var xfactor2 = 100/y2;

	if(y1<=0 || y2<=0)
	{
		this.table.style.visibility = "hidden";
	}
	else
	{
		this.table.style.visibility = "";
		var floor1 = new Point2(
							Math.round(document.body.offsetWidth/2 + xfactor1*x1 + world3.left),
							Math.round((60-hfloor1)*xfactor1 + world3.top-100));
		var floor2 = new Point2(
							Math.round(document.body.offsetWidth/2 + xfactor2*x2 + world3.left),
							Math.round((60-hfloor2)*xfactor2 + world3.top-100));
		var ceiling1 = new Point2(
							Math.round(floor1.x2),
							Math.round((60-hceiling1)*xfactor1 + world3.top-100));
		var ceiling2 = new Point2(
							Math.round(floor2.x2),
							Math.round((60-hceiling2)*xfactor2 + world3.top-100));

		var divleft = Math.min(floor1.x2,floor2.x2);
		var divtop = Math.min(ceiling1.y2,ceiling2.y2);
		var divwidth = Math.abs(floor1.x2-floor2.x2);
		var divtopheight = Math.abs(ceiling1.y2-ceiling2.y2);
		var divmidheight = (Math.min(floor1.y2,floor2.y2) - Math.max(ceiling1.y2,ceiling2.y2));
		var divbotheight = Math.abs(floor1.y2-floor2.y2);
/*		alert(divleft+"\n"+
				divtop+"\n"+
				divwidth+"\n"+
				divtopheight+"\n"+
				divmidheight+"\n"+
				divbotheight
		);
		*/
		
		this.table.style.left = divleft;
		this.table.style.top = divtop;
			
		this.topimg.style.width = divwidth;
		this.topimg.style.height = divtopheight;
		this.topimg.style.marginBottom = Math.min(0,divmidheight);
		this.midimg.style.width = divwidth;
		this.midimg.style.height = Math.max(0,divmidheight);
		this.botimg.style.width = divwidth;
		this.botimg.style.height = divbotheight;
		this.topimg.src = (ceiling1.y2-ceiling2.y2) * (ceiling1.x2-ceiling2.x2)>0?this.redwall?"../Resources/transparent.png":"../Resources/transparent.png":this.redwall?"../Resources/transparent.png":"../Resources/transparent.png";
		this.midimg.src = this.redwall?"../Resources/transparent.png":"../Resources/transparent.png";
		this.botimg.src = (floor1.y2-floor2.y2) * (floor1.x2-floor2.x2)<0?this.redwall?"../Resources/transparent.png":"../Resources/transparent.png":this.redwall?"../Resources/transparent.png":"../Resources/transparent.png";

		this.table.style.zIndex = Math.floor(10000-Math.max(y1,y2)*100);

		if(!this.redwall)
		{		
			var yvalue = Math.max(0,Math.min(255,255-Math.min(y1,y2)));
			var newcolor = "#" + hex(Math.floor(this.color.R*yvalue))
						+ hex(Math.floor(this.color.G*yvalue))
						+ hex(Math.floor(this.color.B*yvalue));
			//alert(yvalue);
			this.table.style.backgroundColor = newcolor;
		}
		
	}
}

Wall3.prototype.dirty = function()
{
	this.isdirty = true;
	world3.dirties.push(this);
};
/*	var h3 = world3.hstart + this.h3*world3.hscale + world3.slope*this.y3;
	var x3 = world3.xstart + (this.x3-50)*world3.xscale;
	var y3 = world3.ystart + this.y3*world3.yscale + 10;
	var xfactor = 100/y3;
	var x2 = document.body.offsetWidth/2 + xfactor*x3 + world3.left;
	var y2 = (60-h3)*xfactor + world3.top-100;
	return new Point2(x2,y2);
	*/



/*
function displayWall3(x3start,y3start,x3finish,y3finish,h3,color)
{
	var p3topstart = new Point3(x3start,y3start,h3);
	var p3topfinish = new Point3(x3finish,y3finish,h3);
	var p3botstart = new Point3(x3start,y3start,0);
	var p3botfinish = new Point3(x3finish,y3finish,0);

	display2d(
	
}


		<img id=bl style="position:absolute; z-Index=100000;" src="blwall.gif">
		<img id=br style="position:absolute; z-Index=100000;" src="brwall.gif">
		<img id=tl style="position:absolute; z-Index=100000;" src="tlwall.gif">
		<img id=tr style="position:absolute; z-Index=100000;" src="trwall.gif">
		<img id=cn style="position:absolute; z-Index=100000;" src="blank.gif">
		<img id=cn2 style="position:absolute; z-Index=100000;" src="blank.gif">

	var p2topstart = new Point3(x3start,y3start,h3).convertToScreen();
	var p2topfinish = new Point3(x3finish,y3finish,h3).convertToScreen();
	var p2botstart = new Point3(x3start,y3start,0).convertToScreen();
	var p2botfinish = new Point3(x3finish,y3finish,0).convertToScreen();

//	alert(p3topstart.convertToScreen());
	if(p2topstart.y2<p2topfinish.y2)
	{
		tr.style.backgroundColor = color;
		display2D(tr,p2topstart,p2topfinish);
	}
	
	cn2.style.backgroundColor = color;
	display2D(cn2,new Point2(p2topstart.x2,p2topfinish.y2),new Point2(p2botfinish.x2,p2botfinish.y2));

	br.style.backgroundColor = color;
	display2D(br,p2botstart,p2botfinish);
*/