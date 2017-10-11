document.write("<li class=\"active\">"+
                            "<a href=\"index.html\"><i class=\"icon-chevron-right\"></i> 驾驶舱</a>"+
                        "</li>"+
                        
                       	"<li>"+
                        "    <a href=\"news.html?1\"><i class=\"icon-chevron-right\"></i> 头条新闻</a>"+
                        "</li>"+
                        "<li>"+
                        "    <a href=\"competitions.html\"><i class=\"icon-chevron-right\"></i> 认证赛事</a>"+
                        "</li>"+
                        "<li>"+
                        "    <a href=\"news.html?3\"><i class=\"icon-chevron-right\"></i> 会员交流(密)</a>"+
                        "</li>"+
                        "<li>"+
                        "    <a href=\"news.html?4\"><i class=\"icon-chevron-right\"></i> 参赛必读(密)</a>"+
                        "</li>"+
                        "<li>"+
                        "    <a href=\"pics.html?1\"><i class=\"icon-chevron-right\"></i> 图片新闻</a>"+
                        "</li>"+
                        "<li>"+
                        "    <a href=\"pics.html?2\"><i class=\"icon-chevron-right\"></i> 图片故事</a>"+
                        "</li>"+
                        " <li>"+
                        "    <a href=\"pics.html?4\"><i class=\"icon-chevron-right\"></i> 获奖作品(密)</a>"+
                        "</li>"+
                        "<li>"+
                        "    <a href=\"users.html\"><i class=\"icon-chevron-right\"></i> 用户管理</a>"+
                        "</li>");
if (getCookie("adminlevel") && getCookie("adminlevel") == "101"){
	document.write("<li>"+
                        "    <a href=\"rubish.html\"><i class=\"icon-chevron-right\"></i> 回收站</a>"+
                        "</li>");
}
