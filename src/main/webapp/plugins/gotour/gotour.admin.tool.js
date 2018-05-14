(function($) {
	Class('gotour.admin.Tool', {
		init : function(options) {
			var _this = this;
			_this._options = $.extend({
				id : '#toolTabPane'
			}, options);
			_this._root = $(_this._options.id);
			_this._bindEvent();
		},
		_bindEvent : function() {
			var _this = this;
			_this._root.find('#tableBtn').click(function() {
				_this._text = _this._root.find("#text").val();
				common.ajax({
					url: '/a/tool/table',
					contentType: 'application/x-www-form-urlencoded;charset=utf-8',
					data: {text: _this._text},
					dataType: 'text',
					success: function(data) {
						loading.hide();
						_this._root.find("#result").empty().val(data);
					}
				});
			});
			_this._root.find('#listBtn').click(function() {
				_this._text = _this._root.find("#text").val();
				common.ajax({
					url: '/a/tool/list',
					contentType: 'application/x-www-form-urlencoded;charset=utf-8',
					data: {text: _this._text},
					dataType: 'text',
					success: function(data) {
						loading.hide();
						_this._root.find("#result").empty().val(data);
					}
				});
			});
			_this._root.find('#imageBtn').click(function() {
				_this._text = _this._root.find("#text").val();
				common.ajax({
					url: '/a/tool/image',
					contentType: 'application/x-www-form-urlencoded;charset=utf-8',
					data: {text: _this._text},
					dataType: 'text',
					success: function(data) {
						loading.hide();
						_this._root.find("#result").empty().val(data);
					}
				});
			});
			_this._root.find('#copyBtn').click(function() {
				window.clipboardData.setData('Text', $('#result').val());
			});
		}
	});
})(jQuery);