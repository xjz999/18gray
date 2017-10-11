var addHandler;
if(window.addEventListener){ //DOM2 Events
	addHandler=function(ele,eType,handler){
		ele.addEventListener(eType,handler,false);
	}
}else{ //IE
	addHandler=function(ele,eType,handler){
		ele.attachEvent("on" + eType,handler);
	}
}
addHandler(window,"load",function(){
//	var xx="<span class=\"goTopButton\" title=\"回顶部\" onclick=\"doBackTop();\"><i class=\"fa fa-arrow-circle-up\"></i></span>";
	var span =document.createElement("span");
	span.className = "goTopButton";
	span.title="回顶部";
	span.innerHTML="<i class=\"fa fa-arrow-circle-up\"></i>";
	span.onclick = function(){
		$('body,html').animate({scrollTop:0},500);
	};
	document.body.appendChild(span);
	$(".goTopButton").css("display","none");
	$(window).scroll(function(){
		var sc=$(window).scrollTop();
		var rwidth=$(window).width()
		if(sc>10){
		    $(".goTopButton").css("display","block");
		}else{
			$(".goTopButton").css("display","none");
		}
	});
});