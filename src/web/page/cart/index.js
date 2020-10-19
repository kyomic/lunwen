$(document).ready(function(){
	var ischecked = false;
	$(".select-all").on('click',function(){
		ischecked = !ischecked
		$(".books").find('input[type=checkbox]').prop('checked', ischecked)
	})
})