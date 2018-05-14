(function($) {
	Class('gotour.Common', {
		ajax: function(options) {
			var _this = this;
			_this._options = $.extend({
				type: 'post',
				contentType: 'application/json;charset=utf-8',
				cache: false,
				beforeSend: function() {
					loading.show();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, ':', errorThrown);
					loading.hide();
				}
			}, options);
			$.ajax(_this._options);
		}
	});
})(jQuery);