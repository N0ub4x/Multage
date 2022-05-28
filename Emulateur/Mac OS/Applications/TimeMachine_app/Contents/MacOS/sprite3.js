////////////////////////////////////////////////////////////////
// 
// sprite3.js
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

world3.sprites = new Array();
world3.dirties = new Array();
world3.mobiles = new Array();

//	display function
function displayAll()
{
	for(var i=0;i<world3.dirties.length;i++)
	{
		world3.dirties[i].display();
	}
	world3.dirties = new Array();
}

function dirtyAll()
{
	for(var i=0;i<world3.sprites.length;i++)
	{
		world3.sprites[i].dirty();
	}
}

function redrawAll()
{
	dirtyAll();
	displayAll();
}

function Range(min,max)
{
	this.min = min;
	this.max = max;
}

//	sprite object
function Sprite3()
{
	this.x3 = 0;
	this.y3 = 0;
	this.h3 = 0;
	this.xrange = null;
	this.yrange = null;
	this.hrange = null;
	this.speedlimit = 0;
	this.pre = new Point3(0,0,0);
	this.target = null;
	this.targetmovedivision = 60;
	this.mov = null;
	this.gravity = 0;
	this.isdirty = true;
	this.imgs = new Array();
	world3.sprites.push(this);
}

Sprite3.prototype = new Object();

Sprite3.prototype.type = "Sprite3";

Sprite3.prototype.addImage = function(gif,width,height,shadow,opacity,offset,offsetfunction)
{
	var img = mainscreen.appendChild(document.createElement("img"));
	img.style.position = "absolute";
	img.originalwidth = width;
	img.originalheight = height;
	img.offset = offset;
	img.galleryImg="no";
	img.src = gif;
	img.sprite = this;
	if(opacity>0 && opacity<100)
	{
		img.style.filter = "alpha(opacity:" + opacity +  ")";
		img.style.MozOpacity = opacity/100;
	}
	if(shadow)
	{
		img.shadow = mainscreen.appendChild(document.createElement("img"));
		img.shadow.src = "shadow.gif";
		img.shadow.style.position = "absolute";
		img.shadow.style.filter = "alpha(opacity:50)";
		img.shadow.style.MozOpacity = .5;
		img.shadow.galleryImg="no";
	}
	this.imgs.push(img);
	return img;
};

Sprite3.prototype.savePosition = function ()
{
	this.pre.setPoint(this.x3,this.y3,this.h3);
};

Sprite3.prototype.move = function(time)
{
	this.savePosition();
	if(this.target)
	{
//		this.x3 += (this.target.x3 - this.x3)*Math.min(time/60,1);
//		this.y3 += (this.target.y3 - this.y3)*Math.min(time/60,1);
//		this.h3 += (this.target.h3 - this.h3)*Math.min(time/60,1);
//		this.mov.setPoint(
//			(this.target.x3-this.x3)*timeunit,
//			(this.target.y3-this.y3)*timeunit,
//			(this.target.h3-this.h3)*timeunit);
		var timeunit = Math.min(1/this.targetmovedivision,1);
		this.mov.setPoint(
			(this.target.x3-this.x3)*timeunit,
			(this.target.y3-this.y3)*timeunit,
			(this.target.h3-this.h3)*timeunit);
	}

/*	var speedsqr = this.mov.x3*this.mov.x3 + this.mov.y3*this.mov.y3 + this.mov.h3*this.mov.h3;
	if(this.speedlimit>0 && speedsqr > this.speedlimit*this.speedlimit)
	{
		var speedchange = this.speedlimit / Math.sqrt(speedsqr);
		this.mov.x3 *= speedchange;
		this.mov.y3 *= speedchange;
		this.mov.h3 *= speedchange;
	}
*/
	this.x3 += this.mov.x3 * time;
	this.y3 += this.mov.y3 * time;
	this.h3 += -.5*this.gravity*time*time + this.mov.h3*time;
	this.mov.h3 -= this.gravity*time;

	if(this.xrange!=null)
		this.x3 = Math.min(this.xrange.max,Math.max(this.xrange.min,this.x3));
	if(this.yrange!=null)
		this.y3 = Math.min(this.yrange.max,Math.max(this.yrange.min,this.y3));
	if(this.hrange!=null)
		this.h3 = Math.min(this.hrange.max,Math.max(this.hrange.min,this.h3));
	
	this.dirty();
	return this.mov;
};

Sprite3.prototype.getSpeed = function()
{
	return Math.sqrt(this.mov.x3*this.mov.x3 + this.mov.y3*this.mov.y3 + this.mov.h3*this.mov.h3);
};

Sprite3.prototype.moveTo = function(x3,y3,h3)
{
	this.savePosition();
	this.x3 = x3;
	this.y3 = y3;
	this.h3 = h3;
	this.dirty();
	return this;
};

Sprite3.prototype.setMotion = function(x3,y3,h3,gravity)
{
	if(this.mov==null)
	{
		this.mov = new Point3(0,0,0);
		world3.mobiles.push(this);
	}
	this.mov.setPoint(x3,y3,h3);
	if(typeof gravity!="undefined")
		this.gravity = gravity;
	return this;
};

Sprite3.prototype.display = function()
{
	for(var i=0;i<this.imgs.length;i++)
	{
		var img = this.imgs[i];
		var x3 = this.x3;
		var y3 = this.y3;
		var h3 = this.h3;
		if(img.offset)
		{
			x3 += img.offset.x3;
			y3 += img.offset.y3;
			h3 += img.offset.h3;			
		}
		display3D(img,x3,y3,h3,img.originalwidth,img.originalheight);
		if(img.shadow)
			display3D(img.shadow,x3,y3,world3.floor,img.originalwidth,img.originalheight);				
	}
	this.isdirty = false;
};

Sprite3.prototype.dirty = function()
{
	this.isdirty = true;
	world3.dirties.push(this);
};

Sprite3.prototype.collisiontime = function(walltype,val)
{
	//	using the formula:
	//	-1/2 g t^2 + v t + p, determine the time when collision should occur
	switch(walltype)
	{
	case world3.xwall:	//	sprite.xmov * time + sprite.x3 = wall.x3
		return (val - this.x3)/this.mov.x3;
	case world3.ywall:	//	sprite.ymov * time + sprite.y3 = wall.y3
		return (val - this.y3)/this.mov.y3;
	case world3.hwall://	-1/2 g * time * time + sprite.hmov * time + sprite.h3 = wall.h3
		return (this.mov.h3 + Math.sqrt(this.mov.h3*this.mov.h3 + 2*this.gravity * (this.h3 - val)))/this.gravity;
	}
	return -1;
};

Sprite3.prototype.predictposition = function(time)
{
	//	-1/2 g t^2 + v t + p
	return new Point3(this.mov.x3 * time + this.x3,this.mov.y3 * time + this.y3,-.5 * this.gravity * time*time + this.mov.h3 * time + this.h3);
};

Sprite3.prototype.predictmovement = function(time)
{
	return new Point3(this.mov.x3,this.mov.y3,this.mov.h3 - this.gravity*time);
};

Sprite3.prototype.willcollide = function(walltype,val,time)
{
	var futurepoint = this.predictposition(time);
	switch(walltype)
	{
	case world3.xwall:
		return (val-this.x3)*(val-futurepoint.x3)<0;
	case world3.ywall:
		return (val-this.y3)*(val-futurepoint.y3)<0;
	case world3.hwall:
		return (val-this.h3)*(val-futurepoint.h3)<0;
	}
	return false;
};

Sprite3.prototype.speedup = function(factor)
{
	this.mov.x3 *= factor;
	this.mov.y3 *= factor;
	this.mov.h3 *= factor;
};

function bounce (sprite,walltype,val)
{
	switch(walltype)
	{
	case world3.xwall:
		sprite.x3 = val;
		sprite.mov.x3 = -sprite.mov.x3;
		break;
	case world3.ywall:
		sprite.y3 = val;
		sprite.mov.y3 = -sprite.mov.y3;
		break;
	case world3.hwall:
		sprite.h3 = val;
		sprite.mov.h3 = -sprite.mov.h3;
		break;
	}
};

// Image caching

var imagecache = new Object();

function filename(src)
{
	return src.substring(src.lastIndexOf("/")+1)
}

function preload(img)
{
	var src = img.src;
	var id = filename(img.src);
	imagecache[id] = img;
}

function getrealsrc(src)
{
	return imagecache[src]?imagecache[src].src:src;
}

function quickSprite(src,width,height,shadow,opacity)
{
	var sprite = new Sprite3(true,false);
	sprite.addImage(getrealsrc(src),width,height,shadow,opacity,null,null);
	return sprite;
}


// Gameloop

var fastestrefresh = 10;
var slowestrefresh = 50;

function startGame()
{
	var startdate = new Date();
	var then = 0;
	setInterval(function()
	{
		var now = new Date() - startdate;
		refresh(Math.min(now-then,slowestrefresh));
		displayAll();
		then = now;
	},fastestrefresh);
}

function refresh(duration)
{
	//	needs to be implemented
}