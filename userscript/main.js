// ==UserScript==
// @name       AC匿名讨论版改造
// @version    0.1
// @description  改造metro风格 使用ajax
// @match      http://h.acfun.tv/*
// @copyright  2012+, You
// ==/UserScript==

//class start
var ResNode=function(str){
    this.title=this.name=this.time=this.id=this.text=this.img=this.imgb=null;
    if(str)fill(str,this);
};
ResNode.prototype.toHTML=function(){
    //TODO:写完这个
    return "<div>"+this.title+"</div>";
};
var HanderNode=function(str){
    this.title=this.name=this.time=this.id=this.text=this.img=this.imgb=null;
	this.isfull=this.href=null;
    this.res=[];
    if(str)fill(str,this,true);
}
HanderNode.prototype.toHTML=function(){
    //TODO:写完这个
    if(this.title!="無題"){}
    if(this.name!="無名"){}
    return "<div>"+this.title+"</div>";
};
//class end
function fill(str,obj,ish){
    var d=$("<div>"+str+"</div>");
    var t=d.find("b:not(table b)");
    obj.title=t[0].innerHTML.trim();
    obj.name=t[1].innerHTML.trim();
    t=d.children("a[title]");
    if(t.length>0){
        obj.img=t.find("img").attr("src");
        obj.imgb=t.attr("href");
    }
    if(ish){
		obj.href=d.children("a:last")[0].href;
		obj.isfull=d.find("font[id]").length>0;
		//res填充
		d.find("td[bgcolor]").each(function(a,bb){
			obj.res.push(new ResNode(bb.innerHTML));
		});
	}
    obj.text=d.children("blockquote").html().trim();
    d.children().remove();//清空
    var info=d.text().trim();
    obj.time=/\d{4}\/\d\d?\/\d\d? \d\d?:\d\d?:\d\d?/.exec(info);
    obj.id=/ID:[\w猴]{8}/.exec(info)[0].substr(3);if(obj.id=="")obj.id="admin";
    return obj;
}
//分析源页面
//class end
$=parent.$;
var bs=[];
var b=$("#postForm").html().split("<hr>");
if(ispage()){
	bs.push(new HanderNode(b[1]));
} else{
	for(var i=2;i<b.length;i++){
		bs.push(new HanderNode(b[i]));
	}
}
function ispage(){
	return true;//DEBUG
	return location.href.indexOf("/").length>1;
}
//"?pager="+2;
//$("body").html("SB");
//style
//$("head").append($("<style/>").html('td{font-family:u5B8Bu4F53,serif;font-size:12px;color:rgb(0, 0, 0);text-shadow: rgba(0, 0, 0, 0.2) 0px 0px 12px;background-color:rgb(230, 230, 230);}'));
//
