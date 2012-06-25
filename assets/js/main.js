function getParameterByName(name)
{
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results == null) {
		return "";
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

(function($) {
	$(document).ready(function() {

		var url = $('header form input');
		var devices = {
			'iPhone': [320, 480],
			'iPhone (Landscape)': [480, 320],
			'Facebook Page Tab': [520, 520],
			'Kindle Fire': [600, 1024],
			'iPad': [768, 1024],
			'SVGA': [800, 600],
			'Kindle Fire (Landscape)': [1024, 600],
			'iPad (Landscape)': [1024, 768],
			'HD 720p': [1280, 720],
			'13" MacBook Air': [1440, 900],
			'WSXGA+': [1680, 1050]
		};
		var codes = [
			'@media only screen and (min-width : 321px) {}', // iPhone Portrait
			'@media only screen and (max-width : 320px) {}', // iPhone Landscape
			'@media only screen and (width : 520px) {}', // Facebook Page Tab
			'@media only screen and (device-width : 600px) and (device-height : 1024px) {}', // Kindle Fire Portrait
			'@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {}', // iPad Portrait
			'@media only screen and (min-width : 800px) {}', // SVGA
			'@media only screen and (device-width : 1024px) and (device-height : 600px) {}', // Kindle Fire Landscape
			'@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {}', // iPad Landscape
			'@media only screen and () {}', // HD 720p
			'@media only screen and () {}', // 13" MacBook Air
			'@media only screen and () {}', // WSXGA+
		];

		$('header form').submit(function(e) {

			e.preventDefault();
			$('#main').empty();

			$.each(devices, function(device, viewport) {
				var frame = $('<div class="device"></div>').attr({
					'style': [
						'width: ' + viewport[0] + 'px;'
					].join(' ')
				}).append(
					$('<h3></h3>').text(device + ' (' + viewport[0] + 'x' + viewport[1] + ')')
				).append(
					$('<span>' + codes.shift() + '</span>')
				).append(
					$('<iframe></iframe>').attr({
						'sandbox': 'allow-forms allow-same-origin allow-scripts allow-top-navigation',
						'src': $(url).val(),
						'style': [
							'height: ' + viewport[1] + 'px;'
						].join(' ')
					})
				);

				$('#main').append(frame);
				$('iframe:last').load(function () {});
			});
		});

		$(url).change(function() {
			if (!/^https?:\/\//.test(this.value)) {
				this.value = "http://" + this.value;
			}

			window.location.search = "url=" + this.value;
		});

		var value = getParameterByName('url');

		if(value != '') {
			if (!/^(http|https):\/\//.test(value)) {
				value = "http://" + value;
			}

			$(url).val(value);
			$('header form').submit();
		}

	});
})(jQuery);