$(function() {
//	初始化
	$.init();
	//学校选择
	$("#school-picker").picker({
		toolbarTemplate: '<header class="bar bar-nav">\
	  <button class="button button-link pull-right close-picker">确定</button>\
	  <h1 class="title">请选择学校</h1>\
	  </header>',
		cols: [{
			textAlign: 'center',
			values: ['哈哈哈中学', '黑呵呵嘿嘿额中学']
		}]
	});
//		图片上传
	$('.shangchuan').on('click', function(e) {
		var that = e.target;
		var buttons1 = [{
				text: '拍照',
				onClick: function() {
					enryUploadFile("picture", that)
				}
			},
			{
				text: '从手机相册选择',
				onClick: function() {
					enryUploadFile("album", that)
				}
			}
		];
		var buttons2 = [{
			text: '取消',
			bg: 'danger'
		}];
		var groups = [buttons1, buttons2];
		$.actions(groups);
	});
//点击跳转 详情
	$("#faxian .content-block>ul>li>ul li").click(function(){
		$.router.loadPage("#faxian_xiangqing",false);  //加载内联页面
	})
	
	$("#faxian_xiangqing .content-block>.pinlun>ul>li>a").click(function(){
		$.router.loadPage("#faxian_huifu",false);  //加载内联页面
	});
})
$("a[href='#shouye']").click(function(){
	console.log(11111);
	$("#shouye_banner")[0].pause();
	$("#shouye_banner")[0].play();
});
//应用首页 轮播图
$("a[href='#yingyong']").click(function(){
	var swiper1 = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        speed:300,  
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
	});
});
//应用 跳转
$("#yingyong .yingyong_fenlei img:nth-of-type(1)").click(function(){
	$.router.loadPage("#yingyong_xuesheng",false);  //加载内联页面
});
$("#yingyong .yingyong_fenlei img:nth-of-type(2)").click(function(){
	$.router.loadPage("#yingyong_jiazhang",false);  //加载内联页面
});
$("#yingyong .yingyong_fenlei img:nth-of-type(3)").click(function(){
	$.router.loadPage("#yingyong_jiaoyuju",false);  //加载内联页面
});
$("#yingyong .yingyong_fenlei img:nth-of-type(4)").click(function(){
	$.router.loadPage("#yingyong_jiaozhigong",false);  //加载内联页面
});
$("#yingyong .yingyong_fenlei img:nth-of-type(5)").click(function(){
	$.router.loadPage("#yingyong_xuexiaoguanliyuan",false);  //加载内联页面
});

//应用每个 icon跳转
$(".yy .content .content-block li").click(function(){
	console.log(1111111)
	let id=$(this).attr('id');
	console.log(id)
	let src='#yingyong_'+id;
	$.router.loadPage(src,false);
})

// 教师 请假界面
//日期选择初始化
let now = new Date();
let nowdate=now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
$("#xiujiakaishi").calendar({
    value: [nowdate]
});
$("#xiujiajieshu").calendar({
    value: [nowdate]
});

//请假类别选择
$("#qingjialeibie").picker({
  toolbarTemplate: '<header class="bar bar-nav">\
  <button class="button button-link pull-right close-picker">确定</button>\
  <h1 class="title">请选择请假类别</h1>\
  </header>',
  cols: [
    {
      textAlign: 'center',
      values: ['事假', '病假', '婚假', '产假', '丧假']
    }
  ]
});
//请假审核人选择
$("#qingjiashenheren").picker({
  toolbarTemplate: '<header class="bar bar-nav">\
  <button class="button button-link pull-right close-picker">确定</button>\
  <h1 class="title">请选择审核人</h1>\
  </header>',
  cols: [
    {
      textAlign: 'center',
      values: ['Celina', 'mark', 'kai', 'jo', 'leif']
    }
  ]
});


//公告详情跳转
$("#wode_gonggao .content-block ul li").click(function(){
	$.router.loadPage("#wode_gonggaoxiangqing",false);  //加载内联页面
});

//查看教师备课  跳转到教师备课列表
$('#yingyong_xuexiaoguanliyuan_chakanjiaoshibeike table span').click(function(){
	$.router.loadPage("#yingyong_xuexiaoguanliyuan_jiaoshibeikexiangxi",false);  //加载内联页面
})

//教师备课列表跳转到备课详细界面
$('#yingyong_xuexiaoguanliyuan_jiaoshibeikexiangxi table span').click(function(){
	$.router.loadPage("#xuexiaoguanliyuan_jiaoshibeikexaingxi",false);  //加载内联页面
})
//查看年级界面 跳转到 查看班级界面
$('#yingyong_xuexiaoguanliyuan_banjiguanli table span').click(function(){
	$.router.loadPage("#yingyong_xuexiaoguanliyuan_chakanbanji",false);  //加载内联页面
})
//升班管理界面跳转到班级查看界面
$('#yingyong_xuexiaoguanliyuan_shengbanguanli table span').click(function(){
	$.router.loadPage("#yingyong_xuexiaoguanliyuan_banjichakan",false);  //加载内联页面
})
//班级查看界面跳转到班级详细
$('#yingyong_xuexiaoguanliyuan_banjichakan table span').click(function(){
	$.router.loadPage("#yingyong_xuexiaoguanliyuan_banjixaingxi",false);  //加载内联页面
})
//学生调班 学生列表跳转到 调班界面
$('#yingyong_xuexiaoguanliyuan_xueshengtiaoban table span').click(function(){
	$.router.loadPage("#xuexiaoguanliyuan_genhuanbanji",false);  //加载内联页面
})
//课程管理 跳转到课程列表
$('#yingyong_xuexiaoguanliyuan_jiaoshibeike table span').click(function(){
	$.router.loadPage("#yingyong_xuexiaoguanliyuan_banjikechengchakan",false);  //加载内联页面
})
//教师备课跳转到班级列表
$('#yingyong_xuexiaoguanliyuan_banjikechengchakan table span').click(function(){
	$.router.loadPage("#yingyong_xuexiaoguanliyuan_banjikechenglebiao",false);  //加载内联页面
})
//班级课程查看 班级列表跳转到 班级课程列表
$('#yingyong_xuexiaoguanliyuan_banjikechenglebiao table span').click(function(){
	$.router.loadPage("#yingyong_xuexiaoguanliyuan_banjikechenglebiao",false);  //加载内联页面
})
//班级课程列表跳转到 修改课程老师界面
$('#yingyong_xuexiaoguanliyuan_banjikechenglebiao table span').click(function(){
	$.router.loadPage("#xuexiaoguanliyuan_xiugairenkejiaoshi",false);  //加载内联页面
})
// 班级排课 班级列表 跳转到 排课列表
$('#yingyong_xuexiaoguanliyuan_paikeguanli table span').click(function(){
	$.router.loadPage("#yingyong_xuexiaoguanliyuan_jutipaike",false);  //加载内联页面
})