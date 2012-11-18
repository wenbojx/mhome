function save_project(id){
    var msg = {};
    msg.error = '操作失败';
    msg.success = '操作成功';
    var element_id = 'save_project_msg';
    var data = {};
    data.name = $("#project_name").val();
    if(id){
    	data.id = id;
    }
    if(!data.name){
        done_error(element_id, '请输入项目名称')
        return false;
    }
    data.desc = $("#project_desc").val();
    url = $("#save_project").attr('action');
    save_datas(url, data, '', '', call_back);
    function call_back(datas){
        alert(datas.msg);
        jump_to(project_url);
    }
}
function save_scene(id){
    var msg = {};
    msg.error = '操作失败';
    msg.success = '操作成功';
    var element_id = 'save_scene_msg';
    var data = {};
    data.name = $("#scene_name").val();
    data.project_id = $("#project_id").val();
    if(id){
    	data.id = id;
    }
    if(!data.name){
        done_error(element_id, '请输入场景名称')
        return false;
    }
    if(!data.project_id){
        done_error(element_id, '参数错误')
        return false;
    }
    data.desc = $("#scene_desc").val();
    data.photo_time = $("#scene_photo_time").val();
    url = $("#save_scene").attr('action');
    save_datas(url, data, '', '', call_back);
    function call_back(datas){
        alert(datas.msg);
        jump_to(scene_url);
    }
}
