var cons={
	virDir:"/"
};
//var imgReqPath = "/ROOT/upload/";
var imgReqPath = "/upload/";
//写
//如果需要设定自定义过期时间
//那么把上面的setCookie　函数换成下面两个函数就ok;
//程序代码
function setCookie(name,value,time)
{
	var exp = null;
	if (time && time != ""){
		var strsec = getsec(time);
		exp = new Date();
		exp.setTime(exp.getTime() + strsec*1);
	}
	
	document.cookie = name + "="+ escape (value) + ";"+((!exp)?"":"expires=" + exp.toGMTString());
}
function getsec(str)
{
	var str1=str.substring(1,str.length)*1;
	var str2=str.substring(0,1);
	if (str2=="s")
	{
		return str1*1000;
	}
	else if (str2=="h")
	{
		return str1*60*60*1000;
	}
	else if (str2=="d")
	{
		return str1*24*60*60*1000;
	}
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//setCookie("name","hayden","s20");

//读
function getCookie(name)
{
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}
//删
function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//调用：
//var time1 = new Date().Format("yyyy-MM-dd");
//var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");  
var loadPagers = function(recCount,pageSize,pageIndex){
	if (!pageSize || pageSize<0)pageSize = 10;
	var maxPage = Math.ceil(recCount/pageSize);// (recCount % pageSize > 0)?(recCount/pageSize + 1):(recCount/pageSize);
	var bv = "<div class=\"pagination pagination-mini\">"+
		"<ul><li "+ ((pageIndex <= 1)?"class=\"disabled\"":"") +"><a href=\"#\"  onclick=\"loadData("+(pageIndex-1)+")\">上一页</a></li>"+
			"<li "+ ((pageIndex == 1)?"class=\"active\"":"") +">"+
			"	<a href=\"#\" onclick=\"loadData(1)\">1</a>"+
			"</li>";
			
			for(var i= pageIndex - 2;i<=pageIndex + 2;i++){
				if (i<=1 || i >= maxPage)continue;
				bv += "<li  "+ ((pageIndex == i)?"class=\"active\"":"") +"><a href=\"#\"  onclick=\"loadData("+i+")\">"+i+"</a></li>";
			}
			if (maxPage != 1){
			bv += "<li "+ ((pageIndex == maxPage)?"class=\"active\"":"") +">"+
			"	<a href=\"#\" onclick=\"loadData("+maxPage+")\">"+maxPage+"</a>"+
			"</li>";
			}
			bv += "<li "+ ((pageIndex >= maxPage)?"class=\"disabled\"":"") +"><a href=\"#\" onclick=\"loadData("+(pageIndex+1)+")\">下一页</a></li>"+
		"</ul>"+
	"</div>";
	return bv;
};
