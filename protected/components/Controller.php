<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController
{
    /**
     * @var string the default layout for the controller view. Defaults to '//layouts/column1',
     * meaning using a single column layout. See 'protected/views/layouts/column1.php'.
     */
    public $layout='//layouts/column1';
    /**
     * @var array context menu items. This property will be assigned to {@link CMenu::items}.
     */
    public $menu=array();
    public $member_id = '';
    public $user_name = '';

    /**
     * @var array the breadcrumbs of the current page. The value of this property will
     * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
     * for more details on how to specify this property.
     */
    public $breadcrumbs=array();
    public function __construct(){
        if(!$this->check_admin()){
            $this->redirect(array('member/login'));
        }

        $login_info = Yii::app()->session['userinfo'];
        $this->member_id = $login_info['id'];
        $this->user_name = $login_info['email'];

        return true;
    }
    public function check_admin(){
        if(!Yii::app()->session['userinfo']){
            return false;
        }
        return true;
    }
    public function check_scene_own($scene_id = 0){
        $msg['flag'] = 0;
        $msg['msg'] = '无权限';
        if($scene_id == 0){
            $this->display_msg($msg);
        }
        $scene_db = new Scene();
        $datas = $scene_db->get_by_admin_scene($this->member_id, $scene_id);
        if(!$datas){
            $this->display_msg($msg);
        }
        return true;
    }
    public function check_project_owner($project_id = 0){
    	$msg['flag'] = 0;
    	$msg['msg'] = '无权限';
    	if($project_id == 0){
    		$this->display_msg($msg);
    	}
    	$project_db = new Project();
    	$project_datas = $project_db->find_by_project_id($project_id);
    	if(!$project_datas || $project_datas->member_id != $this->member_id){
    		$this->display_msg($msg);
    	}
    	return true;
    }
    public function display_msg($msg){
        $str = json_encode($msg);
        exit($str);
    }
    protected function login_state(){
        if(Yii::app()->session['userinfo']){
            $this->redirect(array('home/index'));
        }
        return false;
    }
}