$(document).ready(function(){
	var user = cookie.get('user');
	if( user ){
		$(".unlogin").hide();
		$(".logined").show();
		user = JSON.parse(user);
		if( user ){
			$(".logined .name").html( user.nick_name )
			if( user.level == 0){
				$(".logined .admin").show();
			}else{
				$(".logined .admin").hide();
			}
		}
	}else{
		$(".unlogin").show();
		$(".logined").hide();
	}
	var name = /\/web\/page\/([^\/]+)/i.exec(location.href)
	if( name ){
		name = name[1]
	}else{
		name = 'index'
	}
	var current = $(".menu-" + name );
	console.log('current', current)
	if( current && current.length){
		current.addClass('current')
	}
});