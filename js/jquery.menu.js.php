$(function () {
    var flag;
    if($('body').hasClass('sidebar-colors')){
        flag = true;
    } else{
        flag = false;
    }


    if($('#wrapper').hasClass('right-sidebar')) {
        $('ul#side-menu li').hover(function () {
            if ($('body').hasClass('right-side-collapsed')) {
                $(this).addClass('nav-hover');
            }
        }, function () {
            if ($('body').hasClass('right-side-collapsed')) {
                $(this).removeClass('nav-hover');
            }
        });
    } else{
        $('ul#side-menu li').hover(function () {
            if ($('body').hasClass('left-side-collapsed')) {
                $(this).addClass('nav-hover');
            }
        }, function () {
            if ($('body').hasClass('left-side-collapsed')) {
                $(this).removeClass('nav-hover');
            }
        });
    }

});
function actualizar_menu(menu_size){
	
	$.get( "control/control_ajax.php?evento=actualizar_menu&menu_size="+menu_size, function( data ) {

	});
}
