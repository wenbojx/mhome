
var latlng = {"lat":glat,"lng":glng, "zoom":gzoom};
var googlemap = null;
var spot_id = '420';
function load_map(){
        var base_info = {
            lat:parseFloat(latlng.lat),
            lng:parseFloat(latlng.lng),
            zoom:latlng.zoom};
        googlemap = jQuery.googlemap(base_info);
        googlemap.init();
}

jQuery.extend( {
    googlemap : function(base_info) {
        var canvas = document.getElementById('map_canvas');
        var map = null;
        var center_point = null;
        var zoom = base_info.zoom;
        var geocoder = null;
        var moveing_marker = null;
        var search_options = null;


        function init () {
            map = new GMap2(canvas)
            geocoder = new GClientGeocoder();
            lat = base_info.lat;
            lng = base_info.lng;
            zoom = base_info.zoom;
            search_options = {
                    onSearchCompleteCallback: search_complete
            };
            map.setMapType(G_SATELLITE_MAP);

            map.addControl(new GLargeMapControl());
            map.addControl(new GOverviewMapControl());
            map.addControl(new google.maps.LocalSearch(search_options));
            map.enableContinuousZoom();

            point = new GLatLng(lat,lng);
            map.setCenter(point, zoom);

            //地图缩放时改变高度
            GEvent.addListener(map,'zoomend',function (oldzoom,newzoom) {
                jQuery('#span_zoom').html(newzoom);
            });

            set_init_marker(0);
        }

        function search_complete (searcher) {
            if (searcher.results.length > 0) {
                var first_result = searcher.results[0];
                var point = new GLatLng(first_result.lat,first_result.lng);
                redraw_marker(point);
            }
            //console.log(searcher.results);
        }
        function set_init_marker (iscancel) {
            //检查以前设置过坐标没
            if (base_info['lat'] && base_info['lng']) {
                // 如果已经设置了坐标
                point = new GLatLng(base_info.lat, base_info.lng);
                zoom = parseInt(base_info.zoom);
                zoom = zoom > 0 ? zoom : map.getZoom();
                redraw_marker(point,zoom);
            }
        }

        function redraw_marker (point,zoom) {
            zoom = zoom > 0 ? zoom : map.getZoom();
            if (moveing_marker != null) {
                moveing_marker.setLatLng(point);
            } else {
                var icon = new GIcon(G_DEFAULT_ICON, google_map_tip_url);
                moveing_marker = new GMarker(point, {
                    draggable : true,
                    icon: icon
                });
                map.addOverlay(moveing_marker);
            }

            map.setCenter(point,zoom);
            set_values(point,zoom);

            GEvent.addListener(moveing_marker,'drag',function () {
                var point = moveing_marker.getLatLng();
                set_values(point);
            });
        }

        //设置页面变量
        function set_values(point,zoom) {
            zoom = zoom > 0 ? zoom : map.getZoom();
            jQuery('#span_lat').html(point.lat());
            jQuery('#span_lng').html(point.lng());
            jQuery('#span_zoom').html(zoom);
        }

        //放弃 返回列表页
        function cancel () {
            window.location.href = back_url;
        }

        return {
            init: init,
            cancel: cancel
        };
    }
});