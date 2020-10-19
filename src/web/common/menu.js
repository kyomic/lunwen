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
});