## 七牛云图床 ##

- 七牛云空间地址(测试账号)：http://ocbao1wc2.bkt.clouddn.com
- 容量限制：10g
- 图床使用方法
	- blog文章相关图片存储至本地的qiniuimgbed文件夹中，其文件名以文章post日期+文章名作为开头（便于后期管理），如20161008XXX_XXX.jpg,其中20161008XXX表示前缀，_XXX表示图片简称。
	- 文章中的图片使用七牛云空间链接，如：http://ocbao1wc2.bkt.clouddn.com/20161008XXX_XXX.jpg
	- 在web中访问相应文章时，浏览器会根据图片src访问七牛云空间获取图片，如果七牛云空间中没有该图片，则会到镜像源(已在七牛云中设置为zhongwei1986.github.io/qiniuimgbed)中查找并备份至七牛云空间。下一次访问该文章时就可以直接从七牛云空间获取。
