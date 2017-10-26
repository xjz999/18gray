document.write('<div id="topOut">'+
			'<div id="top">'+
			'	<div id="logo"></div>'+
			'	<div id="menu">'+
			'		<a href="'+cons.virDir+'index.html">首页</a>'+
			'		<a href="'+cons.virDir+'aboutpsa.html">关于PSA</a>'+
			'		<a href="'+cons.virDir+'aboutropa.html">关于名人堂</a>'+
			'		<a href="'+cons.virDir+'psastars.html">星标名衔</a>'+
			'		<a href="'+cons.virDir+'whoswho.html">Who\'s Who</a>'+
			'		<a href="'+cons.virDir+'laurel.html">获奖作品</a>'+
			'		<a href="'+cons.virDir+'aboutus.html">关于我们</a>'+
			'		<a href="'+cons.virDir+'joinus.html">加入挑战</a>'+
			'	</div>'+
			'	<div id="regLogin"><a href="register.html">注册</a><a href="login.html">登录</a></div>'+
			'	<div id="loginStat"><span>hi,昨夜的星辰</span><a href="#">个人中心</a></div>'+
			'</div>'+
		'</div>');
var doExit=function(){
	setCookie("name","");
	setCookie("loginname","");
	location = location;
};
$(function(){
	if (getCookie("name") && getCookie("name")!= ""){
		$("#loginStat").html("<span>欢迎登录！</span><a href=\"/my/index.html\">个人中心</a> <a href='#' onclick='doExit();'>退出</a>");
		$("#loginStat").show();
		$("#regLogin").hide();
	}else{
		$("#loginStat").hide();
		$("#regLogin").show();
	}
});

