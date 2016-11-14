	$(document).ready(function() {
	    var config = {
	        authDomain: "zzwdanmu.wilddogio.com",
	        syncURL: "https://zzwdanmu.wilddogio.com/"
	    };
	    wilddog.initializeApp(config);
	    var ref = wilddog.sync().ref();
	    var arr = [];
	    //把数据提交到野狗云
	    $(".s_sub").click(function() {
	        var text = $(".s_txt").val();
	        ref.child('message').push(text);
	        $(".s_txt").val('');
	    });
	    //响应按键点击事件
	    $(".s_txt").keypress(function(event) {
	        if (event.keyCode == "13") {
	            $(".s_sub").trigger('click');
	        }
	    });
	    //响应按键清除事件
	    $(".s_del").click(function() {
	        ref.set(null); //或者使用ref.remove()
	        arr = [];
	        // $('.dm_show').empty();
	    });
	    //监听云端数据变更，云端数据变化，弹幕框里数据也跟着变化。
	    ref.child('message').on('child_added', function(snapshot) {
	        var text = snapshot.val();
	        arr.push(text);
	        var textObj = $("<div class=\"dm_message\"></div>");
	        textObj.text(text);
	        $(".dm_show").append(textObj);
	        //等同
	        // $(textObj).appendTo(".dm_show");
	        moveObj(textObj);
	    });

	    ref.on('child_removed', function() {
	        arr = [];
	        $('.dm_show').empty();
	    });

	    ref.child('message').on('child_removed', function(snapshot) {
	        var text = snapshot.val();
	        var index = arr.indexOf(text);
	        arr.splice(index, 1);
	        $("div:contains(text)").remove();
	    })

	    //按照时间规则显示弹幕内容。	
	    var topMin = $('.dm_mask').offset().top;
	    var topMax = topMin + $('.dm_mask').height();
	    var _top = topMin;

	    var moveObj = function(obj) {
	        var _left = $('.dm_mask').width() - obj.width();
	        _top = _top + 50;
	        if (_top > (topMax - 50)) {
	            _top = topMin;
	        }
	        obj.css({
	            left: _left,
	            top: _top,
	            color: getRandomColor()
	        });
	        var time = 20000 + 15000 * Math.random();
	        obj.animate({
	            left: "-10px"
	        }, time, function() {
	            obj.remove();
	        });
	    }

	    var getRandomColor = function() {
	        return '#' + (function(h) {
	            return new Array(7 - h.length).join("0") + h
	        })((Math.random() * 0x2000000 << 0).toString(16))
	    }

	    var getAndRun = function() {
	        if (arr.length > 0) {
	            var n = Math.floor(Math.random() * arr.length + 1) - 1;
	            var textObj = $("<div>" + arr[n] + "</div>");
	            $(".dm_show").append(textObj);
	            moveObj(textObj);
	        }

	        setTimeout(getAndRun, 4000);
	    }

	    jQuery.fx.interval = 50;
	    getAndRun();
	});
