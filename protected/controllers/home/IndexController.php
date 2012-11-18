<?php
class IndexController extends FController{
    public $defaultAction = 'index';
    public $layout = 'home';
    private $page_size = 10;

    /* public function __construct(){
        $this->check_admin();
        $this->month = Yii::app()->session['userinfo']['month'];
        $this->year = Yii::app()->session['userinfo']['year'];
        //print_r(Yii::app()->session['userinfo']);
        $this->language = Yii::app()->session['userinfo']['language'];
    } */

    public function actionIndex(){
        $datas = array();
        $datas['list'] = $this->get_pano_list();
        $this->render('/home/index', array('datas'=>$datas));
    }

    private function get_pano_list(){
    	$project_db = new Project();
    	$order = 'id DESC';
    	$datas = $project_db->get_project_list($page_size, $order);
    	//print_r($datas);
    	return $datas;
    }
}