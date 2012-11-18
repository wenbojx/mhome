$(document).ready(function(){
    check_login();
})
function login_state(datas){
    if(datas.flag == '0'){
        $("#m_register").show();
        $("#m_login").show();
    }
    else{
        var str = "" + datas.nick_name + " 您好!";
        $("#m_nickname").html(str);
        $("#m_welcome").show();
        $("#m_loginout").show();
    }
}
function check_login(){
    $.post(check_login_url, {}, login_state, 'json');
}
var member = {};
member.save_datas = function(url, data, callback, type, dataType){
    type = type ? type : 'post';
    dataType = dataType ? dataType : 'json';
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType,
        success: function(datas){
            member.callback = callback;
            member.callback(datas);
        }
    });
}
member.reg_clear = function(){
	var tip = 'reg_tip_';
	$("#"+tip+'email').html("");
	$("#"+tip+'passwd').html("");
	$("#"+tip+'repasswd').html("");
	$("#"+tip+'nickname').html("");
	$("#"+tip+'code').html("");
}
member.check_reg = function(){
	member.reg_clear();
    var tip = 'reg_tip_';
    var email = $("#reg_email").val();
    if(!email){
        $("#"+tip+'email').html("请输入您要注册的email地址");
        return false;
    }
    var passwd = $("#reg_passwd").val();
    if(!passwd){
        $("#"+tip+'passwd').html("请输入您密码");
        return false;
    }
    var repasswd = $("#reg_repasswd").val();
    if(!repasswd){
        $("#"+tip+'repasswd').html("请重复输入您密码");
        return false;
    }
    if(passwd != repasswd){
        $("#"+tip+'repasswd').html("两次输入密码不一致");
        return false;
    }
    var nickname = $("#reg_nickname").val();
    if(!nickname){
        $("#"+tip+'nickname').html("请输入昵称");
        return false;
    }
    var code = $("#reg_code").val();
    if(!code){
        $("#"+tip+'code').html("请输入邀请码");
        return false;
    }
    var url = $("#member_reg").attr('action');
    var datas = {'email':email, 'passwd':passwd, 'repasswd':repasswd, 'code':code, 'nickname':nickname};

    member.save_datas(url, datas, do_after);

    function do_after(datas){
        if(datas.flag =='1'){
            $("#reg_tip_flag").html('注册成功');
            jump_url = datas.url;
            setTimeout("jump_to()",3000);
        }
        else{
            if(datas.field){
                $.each(datas.field, function(k,v){
                    if(k=='email'){
                        if(v == '0'){
                            $msg = '请输入邮箱';
                        }
                        else if(v == '1'){
                            $msg = '该邮箱已存在';
                        }
                        $("#"+tip+'email').html($msg);
                    }
                    if(k=='passwd'){
                        if(v == '0'){
                            $msg = '请输入密码';
                        }
                        $("#"+tip+'passwd').html($msg);
                    }
                    if(k=='repasswd'){
                        if(v == '0'){
                            $msg = '两次密码不一致';
                        }
                        $("#"+tip+'repasswd').html($msg);
                    }
                    if(k=='code'){
                        if(v == '0'){
                            $msg = '请输入邀请码';
                        }
                        else if(v == '2'){
                            $msg = '该邀请码不存在';
                        }
                        else if(v=='3'){
                            $msg = '该邀请码已失效';
                        }
                        $("#"+tip+'code').html($msg);
                    }
                    if(k=='nickname'){
                        if(v == '0'){
                            $msg = '请输入昵称';
                        }
                        else if(v == '1'){
                            $msg = '该昵称已存在';
                        }
                        $("#"+tip+'nickname').html($msg);
                    }
                })
            }
        }
        return false;
    }
}
member.login_clear = function(){
	var tip = 'login_tip_';
	$("#"+tip+'email').html("");
	$("#"+tip+'passwd').html("");
}
member.login = function(){
	member.login_clear();
    var tip = 'login_tip_';
    var email = $("#login_email").val();
    if(!email){
        $("#"+tip+'email').html("请输入email");
        return false;
    }
    var passwd = $("#login_passwd").val();
    if(!passwd){
        $("#"+tip+'passwd').html("请输入密码");
        return false;
    }
    var url = $("#member_login").attr('action');
    var datas = {'email':email, 'passwd':passwd};

    member.save_datas(url, datas, do_after);

    function do_after(datas){
    	if(datas.flag =='1'){
            $("#login_tip_flag").html('登陆成功');
            jump_to(login_jump_url);
        }
        else{
            if(datas.field){
                $.each(datas.field, function(k,v){
                	if(k=='email'){
                        $msg = '请输入邮箱';
                        $("#"+tip+'email').html($msg);
                    }
                    if(k=='passwd'){
                        $msg = '请输入密码';
                        $("#"+tip+'passwd').html($msg);
                    }
                })
            }
            else{
            	$("#login_tip_flag").html('账号密码错误');
            }
        }
    }
}
