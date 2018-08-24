<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>READY READ -- 锐读</title>
	<link rel="stylesheet" type="text/css" href="/public/static/css/index.css">
</head>
<body>
  {% include "include/head.tpl" %}
  <div class="topwrap">
    <div class="slider">
      <div class="item">
        <a href="">
          <img src="https://upload.jianshu.io/admin_banners/web_images/4424/28fa64c724d3d67bc47994c5b9e43b43474069d9.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540">
        </a>
      </div>
    </div>
    <div class="toplist">
      <ul>
        <li><a href=""><img src="/public/static/images/banner-s-3-7123fd94750759acf7eca05b871e9d17.png"></a></li>
        <li><a href=""><img src="/public/static/images/banner-s-4-b70da70d679593510ac93a172dfbaeaa.png"></a></li>
        <li><a href=""><img src="/public/static/images/banner-s-3-7123fd94750759acf7eca05b871e9d17.png"></a></li>
        <li><a href=""><img src="/public/static/images/banner-s-4-b70da70d679593510ac93a172dfbaeaa.png"></a></li>
      <li>
    </div>
  </div>
  <div class="indexWrap">
    <div class="indexList">
    {% for item in data %}
      <div class="article-cpt">
        <div class="article-info">
          <div class="article-info-box">
            <div class="article-title">
              <a href="/topic/{{item.id}}" target="_blank">{{item.title}}</a>
            </div> 
            <div class="article-author">
              <a href="/" target="_blank">{{item.authorId}}</a>
            </div>
            <div class="article-content"> 
              {{item.summary}} 
              <span class="view-all">
                <a href="/topic/{{item.id}}" target="_blank">VIEW ALL...</a>
              </span>
            </div>
          </div> 
          <div class="article-others">{{item.view}}次阅读&nbsp;&nbsp;|&nbsp;&nbsp;评论:{{item.commentNum}}&nbsp;&nbsp;|&nbsp;&nbsp;喜欢:{{item.thumbs}}
          </div>
        </div> 
        <div class="article-img" style="background-image: url({{item.imgUurl}});"><a href="/topic/{{item.id}}" target="_blank"></a>
        </div>
      </div>
    {% endfor %}
    </div>
  </div>
  <div class="footer">
    <div class="foot">
      <div class="foot-logo"></div> 
      <div class="foot-link">
        <p>
        <a href="#" target="_blank">关于我们</a> 
        <a href="#" target="_blank">友情链接</a> 
        <a href="#" target="_blank">片刻帮助</a>
        <a href="#" target="_blank">意见反馈</a>
        <a href="#" target="_blank">成长记忆</a>
        </p> 
        <p>All rights reserved © 2016 pianke.me /黔ICP备17008875号-1</p>
      </div> 
      <div class="foot-icon">
        
      </div>
    </div>
  </div>
</body>
</html>