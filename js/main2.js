jQuery(document).ready(function(x$){
	var x$lateral_menu_trigger = x$('#cd-menu-trigger'),
		x$content_wrapper = x$('.cd-main-content'),
		x$navigation = x$('header');

	//open-close lateral menu clicking on the menu icon
	x$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();
		
		$lateral_menu_trigger.toggleClass('is-clicked');
		x$navigation.toggleClass('lateral-menu-is-open');
		x$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			x$('body').toggleClass('overflow-hidden');
		});
		x$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
		
		//check if transitions are not supported - i.e. in IE9
		if(x$('html').hasClass('no-csstransitions')) {
			x$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	x$content_wrapper.on('click', function(event){
		if( !x$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
			x$lateral_menu_trigger.removeClass('is-clicked');
			x$navigation.removeClass('lateral-menu-is-open');
			x$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				x$('body').removeClass('overflow-hidden');
			});
			x$('#cd-lateral-nav').removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			if(x$('html').hasClass('no-csstransitions')) {
				x$('body').removeClass('overflow-hidden');
			}

		}
	});

	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	x$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		x$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});
});
