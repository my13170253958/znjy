//生成 图形验证码的方法
function yanzhengma(e){
        var n = parseInt(Math.random()*(9999999999-1000000000+1)+1000000000);
        $(e).attr('src','http://apistore.51daniu.cn/rest/index.php?c=index&a=checkcode&t='+n+'');
      }
//图片上传方法
function enryUploadFile(from,that,isbianji)
 {
	var task = plus.uploader.createUpload( "http://apistore.51daniu.cn/rest/index.php?c=upfile&a=pic", 
		{ method:"POST",blocksize:2048,priority:100 },
		function ( response, status ) {
			$.showPreloader('请稍后...');
			// 上传完成
			if ( status == 200 ) {
				var shay_imgurl = response.responseText.split('"data":"')[1].split('"}')[0].replace('\\/','/').replace('\\/','/').replace('\\/','/').replace('\\/','/').replace('\\/','/').replace('\\/','/').replace('\\/','/').replace('\\/','/');
				console.log(shay_imgurl);
				console.log(response.responseText);
				if(isbianji){
					$(that).html('已编辑');
					$('#'+isbianji).val(shay_imgurl);
				}else{
					$(that).attr('src',shay_imgurl);
				}
				$.hidePreloader();
			} else {
				plus.nativeUI.alert("上传失败");
				$.hidePreloader();
			}
		}
	);
	if(from=='album')
	{
		plus.gallery.pick(function(p){
	 		plus.zip.compressImage({
				src:p,
				dst:p,
				quality:20,
				overwrite:true
			},
			function() {
				task.addFile( p, {key:"enryUploadFile"} );
				task.start();
			},function(error) {
				$.alert(error);
			});
		});	
	}
	else
	{
		plus.camera.getCamera().captureImage(function(p){
			plus.zip.compressImage({
				src:p,
				dst:p,
				quality:20,
				overwrite:true
			},
			function() {
				task.addFile( p, {key:"enryUploadFile"} );
				task.start();
			},function(error) {
				$.alert(error);
			});
		});	
	}
 }