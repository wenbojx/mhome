var jump_url = '';
function jump_to(jump_url, target){
    if(!jump_url){
        return false;
    }
    if(!target){
    	target = 'self';
    }
    if(target == 'blank'){
    	window.open(jump_url);
    }
    else{
    	window.location.href = jump_url;
    }
}

function save_datas(url, data, type, dataType, done){
    if (!url){
        done_error(element_id, msg.error);
    }
    type = type ? type : 'post';
    dataType = dataType ? dataType : 'json';
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType,
        //timeout: 1000,
        error: function(){
        	done(datas);
        },
        success: function(datas){
            done(datas);
        }
    });
}
function done_error(element_id, msg){
    $("#"+element_id).html(msg);
    //setTimeout( clean_msg_box(element_id), 50000);
}
function done_success(element_id, msg, datas){
    if(datas.flag == '0'){
        msg = datas.msg;
        done_error(element_id, msg);
    }
    $("#"+element_id).html(msg);
    //setTimeout( clean_msg_box(element_id), 50000);
}
function clean_msg_box(element_id){
    $("#"+element_id).html('');
}
function show_banner_pano(){
	$("#pano_banner").show();
	$("#static_banner").hide();
}
function show_banner_pic(){
	$("#pano_banner").hide();
	$("#static_banner").show();
}
function init_ueditor(id, text, height, textarea){
	window.UEDITOR_CONFIG.initialContent = '';
	window.UEDITOR_CONFIG.minFrameHeight = 250;
	window.UEDITOR_CONFIG.textarea = textarea;
    var editor = new UE.ui.Editor();
    editor.render(id);
}
//加载更多全景图
function load_pano_list(){
	var data = {};
	data.page = view_page+1;
	save_datas(view_load_url, data, 'post', 'json', load_pano_finish);
	if(view_page >= total_page){
		$("#page_more").hide();
	}
}

