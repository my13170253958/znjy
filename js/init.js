var RestApi = 'http://www.lwjiaoyu.com/rest/index.php';
//var RestApi = 'http://znjy.51daniu.cn/rest/index.php';
var Apistore= 'http://apistore.51daniu.cn/rest/index.php';
var currentVersion="2.0";

function banben(){
	$.post(RestApi, { c:'index',a:'updatecheck1'}, function (response){
		 var responseObj = $.parseJSON(response);
		 var androidurl=responseObj.data.uplink.android;
		 var iosurl=responseObj.data.uplink.ios;
		 var nowversion=responseObj.data.version;
//		console.log(androidurl);
//		console.log(iosurl)
		var url;
		//console.log(plus.os.name);
		if(plus.os.name.toLowerCase()=="ios"){
			url=iosurl;
		}else{
			url=androidurl;
		}
		console.log(url);
		if(currentVersion!=nowversion){
			$.alert(responseObj.message,function(){

				plus.runtime.openURL(url);
			})
		}
		
	});
}

setInterval(function (){
	banben()
},10000);

//$('.xcConfirm .popBox .ttBox .tt').html('提示信息')
function plusReady(){
//	updateSerivces();
	if(plus.os.name=="Android"){
		main = plus.android.runtimeMainActivity();
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
	}
	// Android处理返回键
	plus.key.addEventListener('backbutton',function(){
		$.confirm('确认退出APP吗？', function () {
	        plus.runtime.quit();
	    });
	},false);
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}

// 我的 退出系统
function logout(){
	console.log('tuichu')
	$.post(RestApi, {c: 'user',a:'logout'}, function(response){
	      console.log(response);
	      var responseObj=$.parseJSON(response);
	      if(responseObj.code==200){
	      	console.log('退出成功')
	      		$.alert(responseObj.message,function(){
	      	  		 $.router.replacePage("#shouye",true);
	      	  		 login_status()
//	      	  		 $('#login-status').css('display','inline-block');
	      	  		 localStorage.setItem('user_name','')
	      	  });
	      }else{
	      	  $.alert(responseObj.message);
	      }
	});
}

//登录
 function login(){
 	console.log(1)
 			var phone = $('#phone').val();
            var password = $('#password').val();
            var yzm = $('#yzm').val();
            if (phone != '' && password != '') {
            	console.log('密码与账户都已输入')
                if (phone.match(/^[1][0-9]{10}$/)) {
                    $.post(Apistore, {c: 'index', a: 'codecheck', checkcode: yzm}, function (response) {
                        console.log(response);
                        var responseObj = $.parseJSON(response);
                    //  alert(responseObj.code);
                        if (responseObj.code == 500){
                            var n = parseInt(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000);
                            $('#tuxing_yanzheng').attr('src', 'http://apistore.51daniu.cn/rest/index.php?a=checkcode&t=' + n + '');
                            window.wxc.xcConfirm('请输入正确的图形验证码');
//                          alert('请输入正确的图形验证码')
                            return;
                        }else {
                            $.post(RestApi,{c: 'user', a: 'login', phone: phone, password: password}, function (response) {
                            console.log(response);
                            var responseObj = $.parseJSON(response);
                            // alert(responseObj.code);
                                if (responseObj.code == 200) {
//                              	$.showPreloader('登录中，请稍后');
									localStorage.setItem('user_name',phone);
                    					setTimeout(function(){$.router.replacePage("#shouye",true);},1000);
                    					login_status()
//                  						$('#login-status').css('display','none');
//										
                                } else {
//                              		alert('请输入正确的手机号码和密码');
                                    window.wxc.xcConfirm('请输入正确的手机号码和密码');
                                }
                            });
                        }
                    });
                }else{
//              	alert('请输入正确的手机号码')
                    window.wxc.xcConfirm('请输入正确的手机号码');
                }
            }else{
//          		alert('请输入全部信息')
                window.wxc.xcConfirm('请输入全部信息');
         	}        
 }
 //判断登录状态
   function login_status(){
	$.post(RestApi, { c: 'user',a: 'getLoginInfo'}, function(response){
		var responseObj=$.parseJSON(response);
		console.log(responseObj);
		console.log(1)
		if(responseObj.code==200){
			console.log(localStorage.getItem('user_name')!=1);
				$('#login-status').css('display','none');
		}else if(responseObj.code==500){
				$('#login-status').css('display','inline-block');
//				$.alert(responseObj.message,function(){
//	      	  		$.router.replacePage("#login",true);
//	      	  })
		}
	});
}
login_status()
 
 //点击“我的”请求接口，是否登录？
 function mine(){
 	$.post(RestApi, {c:'user',a:'mine'}, function(response){
	      console.log(response);
	      var responseObj=$.parseJSON(response);
	      var item='';
	      var item1='';
	      if(responseObj.code==200){
				console.log(responseObj);
				console.log(responseObj.data.admin.user_name)
				item='<li>姓名：<span>'+responseObj.data.admin.real_name+'</span></li>'+'<li>手机：<span>'+responseObj.data.admin.phone+'</span></li>'+'<li>所在学校：<span>'+responseObj.data.sch.school_name+'</span></li>'
				item1='<li>姓名：<span>'+responseObj.data.admin.real_name+'</span></li>'+'<li>性别：<span>'+responseObj.data.admin.sex+'</span></li>'+'<li>民族：<span>'+responseObj.data.admin.ethnic+'</span></li>'+'<li>学历：<span>'+responseObj.data.admin.xueli+'</span></li>'+'<li><span>手机：'+responseObj.data.admin.phone+'</span></li>'+'<li><span>身份证：'+responseObj.data.admin.card_id+'</span></li>'
				$('#wode-info').html(item);
				$('#wode-xinxi').html(item1);
				$('#login-status').css('display','none');
        		}else if(responseObj.code==403){
        			console.log('fail')
        			$('#login-status').css('display','inline-block');
           		$.alert(responseObj.message,function(){
	      	  		$.router.replacePage("#login",true);
	      	  });
		    }else{
		        $.alert(responseObj.message);
		        $('#login-status').css('display','inline-block');
		    }
	})
 }
 //点击‘应用’请求接口，是否登录？
//function yingyong_status(){
// 	$.post(RestApi, {c:'user',a:'mine'}, function(response){
//	      console.log(response);
//	      var responseObj=$.parseJSON(response);
//	      if(responseObj.code==200){
//				console.log('应用入口进入成功')
//				$('#login-status').css('display','none');	
//      		}else if(responseObj.code==403){
//         		$.alert(responseObj.message,function(){
//	      	  		 $.router.replacePage("#login",true);
//	      	  });
//		    }else{
////		        $.hidePreloader();
//				$('#login-status').css('display','inline-block');
//		        $.alert(responseObj.message);
//		        }
//	})
// }

//我的 修改密码
$('#sub').click(function () {
                var password = $('#pwd').val();
                var newpassword = $('#newpassword').val();
                var newpassword2 = $('#newpassword2').val();
                if (newpassword != "" && newpassword2 != "" && password != "") {
                    if (newpassword == newpassword2) {
                        $.post(RestApi, {c: 'user', a: 'edit_password', newpassword: newpassword, password: password}, function (response) {
                            console.log(response);
                            var responseObj = $.parseJSON(response);
                            // alert(responseObj.code);
                            if (responseObj.code == 200) {
                                window.wxc.xcConfirm("修改成功", window.wxc.xcConfirm.typeEnum.confirm,function () {
                                    $.router.replacePage("#wode",true);
                                });                           
                            } else if (responseObj.code == 500) {
                                window.wxc.xcConfirm("修改失败", window.wxc.xcConfirm.typeEnum.confirm,function () {
                                    $.router.replacePage("#wode_mimaxiugai",true);
                                });
                            } else if (responseObj.code == 501) {
                                window.wxc.xcConfirm("原登陆密码填写错误", window.wxc.xcConfirm.typeEnum.info);
                            }
                        });
                    } else {
                        window.wxc.xcConfirm("两次输入的新密码不同", window.wxc.xcConfirm.typeEnum.info);
                    }
                } else {
                    window.wxc.xcConfirm('请输入全部信息', window.wxc.xcConfirm.typeEnum.info);
                }
            });



//我的 系统公告列表
	$('#xt_notice').click(function () {
		$.post(RestApi,{c:'notice',a:'xt_notice'},function (res) {
			console.log(res);
			var resObj=$.parseJSON(res);
			var item='';
			if(resObj.code==200){
				console.log(resObj.data.lists.length);
					for(var i=0;i<resObj.data.lists.length;i++){
					item+='<li class="row no-gutter" onclick=tiaozhuan(\''+resObj.data.lists[i].no_id+'\')>'+
								'<div class="col-75">'+resObj.data.lists[i].title+'</div>'+
								'<div class="col-25">'+resObj.data.lists[i].ctime+'</div>'+
							'</li>'
					}
				
				$('#wode_gonggaolist').html(item)
			}else{
				item='没有系统公告';
				$('#wode_gonggaolist').html(item)
			}
		})
	})
	//我的 系统公告 跳转至详情页
function tiaozhuan(no_id){
//	alert(1)
	$.post(RestApi,{c:'notice',a:'gg_detail',id:no_id},function (res) {
			console.log(res);
			var resObj=$.parseJSON(res);
			var item='';
			var formeritem='';
			var lateritem='';
			if(resObj.code==200){
				$.router.replacePage("#wode_gonggaoxiangqing",true);
				$('#gonggaoHead').html(resObj.data.xq_list.title);
				$('#gongaotime').html(resObj.data.xq_list.ctime);
				$('#gongaocont').html(resObj.data.xq_list.content);
				console.log(formeritem);
				if(resObj.data.former.noticeid==undefined){
					formeritem='没有了';
				}else{
					formeritem='<i onclick="tiaozhuan(\''+resObj.data.former.noticeid+'\')">'+resObj.data.former.title+'</i>';
				}
				if(resObj.data.later.title==undefined){
					lateritem='没有了'
				}else{
					lateritem='<i onclick="tiaozhuan(\''+resObj.data.later.noticeid+'\')">'+resObj.data.later.title+'</i>';
				}
				$('#gonggaoxq_former').html(formeritem);
				$('#gonggaoxq_later').html(lateritem);
				
			}else{
				console.log('请求失败ghghjghg');
			}
		})
}

//发现 教育局公告 学校公告
function faxian_notice() {
 	$.post(RestApi,{c:'notice',a:'find_notice'},function (res) {
			console.log(res);
			var resObj=$.parseJSON(res);
			var itemjyj='';
			var itemsch='';
			var jyjtype='';
			var schtype='';
			var stutype='';
			if(resObj.code==200){
				if(resObj.data.jy_list.length==0){
					itemjyj='没有记录';
					$('#fxjyj_more').html('');
					$('#jiaoyuju_notice').html('没有公告');
				}else if(resObj.data.xx_list.length==0){
					itemsch='没有记录';
					$('#fxsch_more').html('');
					$('#sch_notice').html('没有公告');
				}else{
					for(var i=0;i<resObj.data.jy_list.length;i++){
					itemjyj+='<li class="row no-gutter" onclick=gonggaoxq(\''+resObj.data.jy_list[i].no_id+'\')>'+
								'<div class="col-75">'+resObj.data.jy_list[i].title+'</div>'+
							'</li>';
					}
					for(var j=0;j<resObj.data.xx_list.length;j++){
					itemsch+='<li class="row no-gutter" onclick=gonggaoxq(\''+resObj.data.xx_list[j].no_id+'\')>'+
								'<div class="col-75">'+resObj.data.xx_list[j].title+'</div>'+
							'</li>'
					}
				}
					jyjtype=resObj.data.jy_list[0].type;
					schtype=resObj.data.xx_list[0].type;
					$('#fxjyj_more').attr('type',jyjtype);
					$('#fxsch_more').attr('type',schtype);
					console.log($('#fxsch_more').attr('type'))
					console.log($('#fxjyj_more').attr('type'))
					$('#jiaoyuju_notice').html(itemjyj);
					$('#sch_notice').html(itemsch);
			} else {
				console.log('请求失败');
				$('#jiaoyuju_notice').html('没有公告');
				$('#sch_notice').html('没有公告');
			}
		})
 	}

faxian_notice()

//发现 教育局 更多
function fxjyj_more (selector){
	console.log($('#fxjyj_more').attr('type'))
	if(selector.attr('type')==1){
		$('#more_title').html('教育局公告')
	}else if(selector.attr('type')==2){
		$('#more_title').html('学校公告')
	}
	$.post(RestApi,{c:'notice',a:'find_more',type:selector.attr('type')},function (res) {
			console.log(res);
			var resObj=$.parseJSON(res);
			var item='';
			console.log(resObj.data.length)
			if(resObj.code==200){
				$.router.replacePage("#faxian_jiaoyuju",true);
					for(var i=0;i<resObj.data.length;i++){
						if(resObj.data[i].school_name==null){
							item+='<li class="row no-gutter" onclick=gonggaoxq(\''+resObj.data[i].no_id+'\')>'+
								'<h2>'+resObj.data[i].title+'</h2>'+
								'<div class="col-33 shijian">'+resObj.data[i].ctime+'</div>'+
								'<div class="col-33 didian">&nbsp;&nbsp;</div>'+
								'<div class="col-33">评论(<span>'+resObj.data[i].count+'</span>)</div>'+
							'</li>';
						}else{
							item+='<li class="row no-gutter" onclick=gonggaoxq(\''+resObj.data[i].no_id+'\')>'+
								'<h2>'+resObj.data[i].title+'</h2>'+
								'<div class="col-33 shijian">'+resObj.data[i].ctime+'</div>'+
								'<div class="col-33 didian">'+resObj.data[i].school_name+'</div>'+
								'<div class="col-33">评论(<span>'+resObj.data[i].count+'</span>)</div>'+
							'</li>';
						}
					
					}
					
					$('#jyjgongao').html(item);
			} else {
				$.router.replacePage("#faxian_jiaoyuju",true);
					$('#jyjgongao').html('无公告记录');
				console.log('请求失败')
			}
		})
}
//发现 学校更多

$('#fxstu_more').click(function(){
	$.post(RestApi, { c: 'user',a: 'getLoginInfo'}, function(response){
		var responseObj=$.parseJSON(response);
		if(responseObj.code==200){
			$.post(RestApi,{c:'notice',a:'find_more',type:'3'},function (res) {
				console.log(res);
				var resObj=$.parseJSON(res);
				var item='';
				console.log(resObj.data.length)
				if(resObj.code==200){
					$.router.replacePage("#faxian_jiaoyuju",true);
						for(var i=0;i<resObj.data.length;i++){
							item+='<li class="row no-gutter" onclick=gonggaoxq(\''+resObj.data[i].no_id+'\')>'+
								'<h2>'+resObj.data[i].title+'</h2>'+
								'<div class="col-33 shijian">'+resObj.data[i].ctime+'</div>'+
								'<div class="col-33 didian">'+resObj.data[i].school_name+'</div>'+
								'<div class="col-33">评论（<span>'+resObj.data[i].count+'</span>)</div>'+
							'</li>';
						}
						$('#jyjgongao').html(item);
				} else {
					$.router.replacePage("#faxian_jiaoyuju",true);
					$('#jyjgongao').html('无公告记录');
					console.log('班级公告请求失败')
				}
			})
		}else if(responseObj.code==500){
				$('#login-status').css('display','inline-block');
				$.alert(responseObj.message,function(){
	      	  		$.router.replacePage("#login",true);
	      	  })
		}
		$('#more_title').html('班级公告');
	});
	
})
//发现 系统公告详情
function gonggaoxq(no_id){
	$.post(RestApi,{c:'notice',a:'gg_detail',id:no_id},function (res) {
			console.log(res);
			var resObj=$.parseJSON(res);
			var item='';
			var formeritem='';
			var lateritem='';
			if(resObj.code==200){
				$.router.replacePage("#faxian_xiangqing",true);
				$('#jyjxq_title').html(resObj.data.xq_list.title);
				$('#jyjxq_time').html(resObj.data.xq_list.ctime);
				$('#jyjxq_content').html(resObj.data.xq_list.content);
				if(resObj.data.xq_list.picture==''){
					$('#jyjxq_picture').css('width','0');
				}else{
					$('#jyjxq_picture').css('width','100%');
					$('#jyjxq_picture').attr('src',resObj.data.xq_list.picture);

				}
				if(resObj.data.former.noticeid==undefined){
					formeritem='没有了';
				}else{
					formeritem='<i onclick="gonggaoxq(\''+resObj.data.former.noticeid+'\')">上'+resObj.data.former.title+'</i>';
				}
				if(resObj.data.later.title==undefined){
					lateritem='没有了'
				}else{
					lateritem='<i onclick="gonggaoxq(\''+resObj.data.later.noticeid+'\')">'+resObj.data.later.title+'</i>';
				}
				console.log(formeritem);
				$('#jyjxq_former').html(formeritem);
				$('#jyjxq_later').html(lateritem);
				$('#jyjxq_count').html(resObj.data.count);
				if(resObj.data.pl_list.length==0){
					item='';
				}else{
					for(var i=0;i<resObj.data.pl_list.length;i++){
					item+='<li><div class="row"><div class="col-50 who">'+
											'<p>'+(i+1)+'楼<span>'+resObj.data.pl_list[i].user_name+'</span></p></div>'+
										'<div class="col-50 time">'+resObj.data.pl_list[i].ctime+'</div></div>'+
									'<p class="pinglun_content">'+resObj.data.pl_list[i].content+'</p>'+
									'<a>回复（<span>'+resObj.data.pl_list[i].reply+'</span>）</a></li>'
					}
				}
				$('#jyjxq_pllist').html(item);
			}else{
				console.log('请求失败')
			}
		})
}


//网页返回到APP,同时判断是否登录，及登录角色
function queren(urll,a){
	var data_sign=$(a).attr('data_sign');
		$.post(RestApi, { c: 'user',a: 'yz_sign',sign:data_sign}, function(response){
		var responseObj=$.parseJSON(response);
		if(responseObj.code==200){
			localStorage.setItem('uurl',urll);
			clicked('webview_embed.html',true);
			$('#login-status').css('display','none');
		}else if(responseObj.code==403){
				$('#login-status').css('display','inline-block');
				$.alert(responseObj.message,function(){
	      	  		$.router.replacePage("#login",true);
	      	  })
		}else{
			$.alert('您没有权限访问',function(){
				if($(a).attr('data_enter')=='yingyong'){
					$.router.replacePage("#yingyong",true);
				}else{
					$.router.replacePage("#shouye",true);
				}
			});
			$('#login-status').css('display','inline-block');
		}
	});
	
}






