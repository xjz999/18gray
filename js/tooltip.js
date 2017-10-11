var tooltipArr=[
{title:"PSA",summary:"美国摄影学会简称"}
//,{title:"国际影展条例",summary:"点击下载影展条例，版本： October 14, 2017",href:"https://psa-photo.org/index.php?about-bylaws-and-mission"}
,{title:"灰度影像免费代理申请“美国摄影学会PSA”会员",summary:"点击下载美国摄影学会入会申请",href:"upload/doc/doc1.doc"}
];
$(function(){
	var xx = $(".mainContent").html();
	if (!xx)return;
	for (var i=0;i<tooltipArr.length;i++){
		xx = xx.replace(tooltipArr[i].title,"<a href=\""+ (tooltipArr[i].href || "#") +"\" "+ 
			((tooltipArr[i].href)?" target='_blank' ":"")
		+" data-toggle=\"tooltip\" title=\""+tooltipArr[i].summary+"\">"+tooltipArr[i].title+"</a>");
	}
	$(".mainContent").html(xx);
	$("[data-toggle='tooltip']").tooltip();
});
