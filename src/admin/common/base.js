
$(document).ready(function(){
	var showDialog = function( wrap , info ){
		wrap = $(wrap);
		wrap.show();
		var width = wrap.width();
		var viewWidth = $(window).width();
		wrap.css({
			left: viewWidth/2 - width/2,
			'top':100
		})
		if( info  ){
			if( info.title ){
				wrap.find(".d-header").html( info.title );
			}
			if( info.empty ){
				$(".t-content input,textarea,select", wrap).val('')
			}
		}
		wrap.find('.cancel').on('click',function(){
			wrap.hide();
		})
		wrap.find('.submit').on('click',function(){
			wrap.hide();
		})
	}
	$(".delete").on('click',function(e){
        window.confirm('你真的要删除此条记录吗')
    })
    $(".modify").on('click',function(){
    	var btn = $(this);
    	var wrap = $(".dialog");
    	if( wrap && wrap.length ){
    		showDialog( wrap, {title:btn.data('title')})
    	}
    })
    $(".add").on('click',function(){
    	var btn = $(this);
    	var wrap = $(".dialog");
    	if( wrap && wrap.length ){
    		showDialog( wrap, {title:btn.data('title'),empty:true})
    	}
    })
})