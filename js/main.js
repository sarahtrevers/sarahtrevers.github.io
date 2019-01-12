/*
	Spectral by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	skel
		.breakpoints({
			xlarge: '(max-width: 1680px)',
			large: '(max-width: 1280px)',
			medium: '(max-width: 980px)',
			small: '(max-width: 736px)',
			xsmall: '(max-width: 480px)'
		});

	$(function () {

		var $window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Mobile?
		if (skel.vars.mobile)
			$body.addClass('is-mobile');
		else
			skel
				.on('-medium !medium', function () {
					$body.removeClass('is-mobile');
				})
				.on('+medium', function () {
					$body.addClass('is-mobile');
				});

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

		// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

		// Header.
		if (skel.vars.IEVersion < 9)
			$header.removeClass('alt');

		if ($banner.length > 0
			&& $header.hasClass('alt')) {

			$window.on('resize', function () { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom: $header.outerHeight() + 1,
				terminate: function () { $header.removeClass('alt'); },
				enter: function () { $header.addClass('alt'); },
				leave: function () { $header.removeClass('alt'); }
			});

		}

	});

	// Find all YouTube videos
	var $allVideos = $("iframe[src*='//www.youtube.com']"),

		// The element that is fluid width
		$fluidEl = $("#inner-content");

	// Figure out and save aspect ratio for each video
	$allVideos.each(function () {

		$(this)
			.data('aspectRatio', this.height / this.width)

			// and remove the hard coded width/height
			.removeAttr('height')
			.removeAttr('width');

	});

	// When the window is resized
	$(window).resize(function () {

		var innerWidth = $fluidEl.width();
		var newWidth = innerWidth < 350 ? innerWidth : innerWidth / 2.1;

		// Resize all videos according to their own aspect ratio
		$allVideos.each(function () {

			var $el = $(this);
			$el
				.width(newWidth)
				.height(newWidth * $el.data('aspectRatio'));

		});

		// Kick off one resize to fix all videos on page load
	}).resize();

})(jQuery);
