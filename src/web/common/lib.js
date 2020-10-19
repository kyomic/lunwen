var initMock = {
	
}

var fxlib = {}
fxlib.initPageData = function(){
	console.log('initPageData')
	var tpl = $.fn.fxui.tpl;
	$.each($("[data-mock]"),function(i,item){
		console.log(item)
		var key = $(item).data('mock');
		var data = window[key];
		if( !data ){
			console.log('key is not exist');
		}else{
			tpl.renderDom( item, data )
		}
		
	})
}
var fxui = $.fn.fxui || {};

var api = {}
var Config = {
    API:"/api/"
};
api._post = function( obj, onsuccess, onfail ){
    var params = {};
    onsuccess = onsuccess || function(){};
    onfail = onfail || function( obj ){
        return function( res ){
            res = res || {};
            var msg = res.message || res.msg ||"未知服务器异常";
            //alert("接口异常:"+ obj.api +",操作失败,服务器信息:" + msg );
            alert( msg );
        }
    }(obj);

    if( obj.form ){
        params = obj.form.serialize();
    }else{
        params = obj.params;
    }
    $.ajax({
        cache: true,
        type: obj.method || 'POST',
        url:obj.api,
        data:params,
        async: false,
        error: function(request) {
            onfail(request);
        },
        success: function(data) {
            //clear php error
            /*
            try{
                data = data.replace(/\s*\d{8}\s*\d\d.*line:\s+\d+/ig,"");
            }catch(e){}
            */
            //clear php error
            try{
                data = JSON.parse( data );
            }catch(e){};
            if( !data || data.status != 200 ){
                var arr = [];
                for(var i in params){ arr.push(i+"=" + params[i])};
                setTimeout(function(){
                    data = data || {};
                    var msg = data.message || data.msg ||"未知服务器异常";
                    //alert("操作异常:" + obj.api + ",参数:" + arr.join("&") +",服务器消息:" + msg );
//                        alert( msg );
                    //$(grid_selector).restoreCell( lastEditRowIdx, lastEditColIdx );
                },0);
                onfail(data);
            }else{
                onsuccess(data);
                //$(grid_selector).saveCell( lastEditRowIdx, lastEditColIdx );
            }
        }
    });
};

api.login = function( param ){

}

fxui.fxlib = fxlib;
fxui.api = api;