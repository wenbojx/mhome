
$(document).ready(function() {
	$('#menu_scroller').bind('click',function(){
		bind_scroller();
    });
	$('#scroll_close').bind('click',function(){
		bind_scroller();
    });
	pano_loading();
})
function pano_loading(){
	var img_width = $("#pano_loading").css("width");
    var img_height = $("#pano_loading").css("height");
    var box_width = $("#pano-detail").css("width");
    var box_height = $("#pano-detail").css("height");
    var top = (parseInt(box_height)-parseInt(img_height) )/2;
    var left = (parseInt(box_width)-parseInt(img_width) )/2;
    $("#pano_loading").css("top",top+"px");
    $("#pano_loading").css("left",left+"px");
    $("#pano_loading").show();
}
function pano_loaded(){
	$("#pano_loading").hide();
}

function onEnter(panoramaId){
	pano_loaded();
}
function onTransitionEnd(panoramaId){
	//pano_loaded();
}

function hotspot_loading(msg){
	var img_width = $("#hotspot_loading").css("width");
    var img_height = $("#hotspot_loading").css("height");
    var box_width = $("#pano-detail").css("width");
    var box_height = $("#pano-detail").css("height");
    var top = (parseInt(box_height)-parseInt(img_height) )/2;
    var left = (parseInt(box_width)-parseInt(img_width) )/2;
    $("#hotspot_loading").css("top",top+"px");
    $("#hotspot_loading").css("left",left+"px");
    $("#hotspot_loading").show();
}
function hotspot_loaded(msg){
	$("#hotspot_loading").hide();
}

jQuery.fn.extend({
  slideRightShow: function() {
    return this.each(function() {
      jQuery(this).animate({width: 'show'});
    });
  },
  slideLeftHide: function() {
    return this.each(function() {
      jQuery(this).animate({width: 'hide'});
    });
  },
  slideRightHide: function() {
    return this.each(function() {
    	jQuery(this).animate({width: 'hide'});
    });
  },
  slideLeftShow: function() {
    return this.each(function() {
    	jQuery(this).animate({width: 'show'});
    });
  }
});

function bind_scroller(){
	if ($("#scroll_pano_detail").is(":hidden")){
		show_scroller();
	}
	else{
		hide_scroller();
	}
}
function show_scroller(){
	$("#scroll_pano_opacity").show();
	$("#scroll_pano_detail").show();
	$("#scroll_close").show();
	load_menuscroller();
}
function hide_scroller(){
	$("#scroll_pano_opacity").hide();
	$("#scroll_pano_detail").hide();
	$("#scroll_close").hide();
}
var menuscroller = false;
function load_menuscroller(){
	if(menuscroller){
		return false;
	}
	$(".scroll_pano .jCarouselLite").jCarouselLite({
		btnPrev: ".scroll_pano .pano_next",
	    btnNext: ".scroll_pano .pano_prev",
	    visible: 4,
	    //auto: 1500,
	    //speed: 1000,
	    vertical: true
	});
	menuscroller = true;
}
function load_scene(box_id, scene_xml, player_url,wmode ){
	if(!wmode){
		wmode = 'Window';
	}
    var flashvars = {};
    flashvars.xml = scene_xml;
    var params = {};
    params.menu = "false";
    params.quality = "high";
    params.wmode = wmode;
    params.allowfullscreen = "true";
    swfobject.embedSWF(player_url, box_id, "100%", "100%", "10.1.0", "", flashvars, params);
}

function salado_handle_click(actionId){
	// exposed by default
	document.getElementById(scene_box).runAction(actionId);
}
