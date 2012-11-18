<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class FController extends CController
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
    public $nick_name = '';
    

    /**
     * @var array the breadcrumbs of the current page. The value of this property will
     * be assigned to {@link CBreadcrumbs::links}. Please refer to {@link CBreadcrumbs::links}
     * for more details on how to specify this property.
     */
    public $breadcrumbs=array();
    public function __construct(){
    	
    	if ($login_info = Yii::app()->session['userinfo']){
    		$this->member_id = $login_info['id'];
    		$this->user_name = $login_info['email'];
    		$this->nick_name = $login_info['nickname'];
    	}
        return true;
    }
    public function display_msg($msg){
        $str = json_encode($msg);
        exit($str);
    }
    //分页
    public function page($page, $page_size, $total, $route){
    	$pages=new CPagination($total);
    	$pages->pageSize = $page_size;
    	$pages->route = $route;
    	return $pages;
    }
}