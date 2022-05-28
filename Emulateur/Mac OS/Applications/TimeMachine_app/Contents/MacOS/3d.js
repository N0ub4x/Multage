////////////////////////////////////////////////////////////////
// 
// 3d.js
//
// Copyright (c) 2006 (Vinh Le Quang). 
// http://www.bunnypot.com/library/
// You may copy or reuse this code only if you include this copyright notice.
//
////////////////////////////////////////////////////////////////


var world3 = new Object();

world3.top = 75;
world3.left = 0;
world3.floor = 0;
world3.ceiling = 100;
world3.xwall = 0;
world3.ywall = 1;
world3.hwall = 2;
world3.xscale = 1;
world3.yscale = 1;
world3.hscale = 1;
world3.ystart = 0;
world3.xstart = 0;
world3.hstart = 0;
world3.slope = 0;
world3.angle = 0;

world3.toString = function()
{
	var str = 
		"world3.top=" + world3.top + ";\n" +
		"world3.left=" + world3.left + ";\n" +
		"world3.floor=" + world3.floor + ";\n" +
		"world3.ceiling=" + world3.ceiling + ";\n" +
		"world3.ystart=" + world3.ystart + ";\n" +
		"world3.xstart=" + world3.xstart + ";\n" +
		"world3.hstart=" + world3.hstart + ";\n" +
		"world3.xscale=" + world3.xscale.toFixed(2) + ";\n" +
		"world3.yscale=" + world3.yscale.toFixed(2) + ";\n" +
		"world3.hscale=" + world3.hscale.toFixed(2) + ";\n" +
		"world3.slope=" + world3.slope.toFixed(2) + ";\n";
	return str;
};

function hex(num)
{
	var hexmap = "0123456789ABCDEF";
	var str = "";
	for(var i=0;i<2;i++)
	{
		str = hexmap.charAt(num%16)+str;
		num = Math.floor(num/16);
	}
	return str;
}

//	2d point object
function Point2(x2,y2)
{
	this.x2 = x2;
	this.y2 = y2;
}
Point2.prototype = new Object();

Point2.prototype.toString = function /*Point.prototype.toString*/()
{
	return "(" + this.x2.toFixed(1) + ", " + this.y2.toFixed(1) + ")";
};

Point2.prototype.setPoint = function (x2,y2)
{
	this.x2 = x2;
	this.y2 = y2;
};

function display2D(img,point1,point2)
{
	img.style.width = Math.abs(point1.x2-point2.x2)+1;
	img.style.height = Math.abs(point1.y2-point2.y2)+1;
	img.style.left = Math.min(point1.x2,point2.x2);
	img.style.top = Math.min(point1.y2,point2.y2);
}

//	3d point object
function Point3(x3,y3,h3)
{
	this.x3 = x3;
	this.y3 = y3;
	this.h3 = h3;
}
Point3.prototype = new Object();

Point3.prototype.toString = function /*Point.prototype.toString*/()
{
	return "(" + this.x3.toFixed(1) + ", " + this.y3.toFixed(1) + ", " + this.h3.toFixed(1) + ")";
};

Point3.prototype.setPoint = function (x3,y3,h3)
{
	this.x3 = x3;
	this.y3 = y3;
	this.h3 = h3;
};

Point3.prototype.convertToScreen = function ()
{
	var h3 = world3.hstart + this.h3*world3.hscale + world3.slope*this.y3;
	var x3 = world3.xstart + (this.x3-50)*world3.xscale;
	var y3 = world3.ystart + this.y3*world3.yscale + 10;
	var xfactor = 100/y3;
	var x2 = document.body.offsetWidth/2 + xfactor*x3 + world3.left;
	var y2 = (60-h3)*xfactor + world3.top-100;
	return new Point2(x2,y2);
};

function display3D(img,x3,y3,h3,originalwidth,originalheight)
{
	h3 = world3.hstart + h3*world3.hscale + world3.slope*y3;
	x3 = world3.xstart + (x3-50)*world3.xscale;
	y3 = world3.ystart + y3*world3.yscale + 10;
	
	if(y3>0)
	{
		var sizefactor = 200/Math.sqrt(x3*x3 + y3*y3*100 + h3*h3);
		var xfactor = 100/y3;
		var width = 5* world3.xscale * originalwidth * sizefactor;
		var height = 5* world3.hscale * originalheight * sizefactor;
		img.style.zIndex = Math.floor(10000-y3*100+h3);
		img.style.width = width?width:"";
		img.style.height = height?height:"";
		img.style.left = document.body.offsetWidth/2 + xfactor*x3 + world3.left - width/2;
		img.style.top = (60 - h3)*xfactor + world3.top-100 - height;
		img.style.visibility = "";
	}
	else
	{
		img.style.visibility = "hidden";
	}
}

