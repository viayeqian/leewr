<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>{{data.title}} -- READY READ -- 锐读</title>
	<link rel="stylesheet" type="text/css" href="/public/static/css/index.css">
  <link rel="stylesheet" type="text/css" href="/public/static/js/plugin/wangeditor.css">
</head>
<body>
  {% include "include/head.tpl" %}
  <div class="indexWrap">
    <div class="indexList">
	    <div class="articl-cpt detail">
	    	<div class="title-box">
				<h3 class="title">{{data.title}}</h3>
	    	</div>
	    	<div class="article w-e-text">
				{{ data.content | safe}}
	    	</div>
	    </div>
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
  <script type="text/javascript" src="/public/static/js/plugin/sea.js"></script>
  <script type="text/javascript" src="/public/static/js/editor.js"></script>
</body>
</html>