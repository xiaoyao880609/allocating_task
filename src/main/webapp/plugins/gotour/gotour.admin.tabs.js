(function($) {
	Class('gotour.admin.Tabs', {
		init : function(options) {
			var _this = this;
			_this._options = $.extend({
				id : '.container-fluid',
				onShown: function() {}
			}, options);
			_this._root = $(_this._options.id);
			_this._onShown = _this._options.onShown;
			_this._initTabs();
		},
		_initTabs: function() {
			var _this = this;
			_this._tabs = _this._root.find('#tabs');
			_this._tabPanes = _this._root.find('#tabPanes');
			_this._tabTmpl = $('#tabTmpl');
			_this._tabWithoutCloseTmpl = $('#tabWithoutCloseTmpl');
			_this._tabPaneTmpl = $('#tabPaneTmpl');
			_this._root.on('shown.bs.tab', '#tabs>li>a', function(e) {
				_this._onShown();  // for resize when shown
			});
		},
		openTab: function(data) {
			var _this = this;
			var _data = $.extend({
				tabId: '',
				tabName: '',
				url: '',
				params: {},
				type: 'post',
				isShow: true,
				withoutClose: true,
				beforeOpen: function() {},
				afterOpen: function() {},
				beforeClose: function() {},
				afterClose: function() {}
			}, data);
			var _tabId = _data.tabId;
			var _tabName = _data.tabName;
			var _url = _data.url;
			var _params = _data.params;
			var _type = _data.type;
			var _isShow = data.isShow;
			var _withoutClose = _data.withoutClose;
			var _beforeOpen = _data.beforeOpen;
			var _afterOpen = _data.afterOpen;
			var _beforeClose = _data.beforeClose;
			var _afterClose = _data.afterClose;
			var _shown = _data.shown;
			if (_tabId && _tabName) {
				_beforeOpen();
				if (_this._tabs.find('#' + _tabId).length == 0) {
					if (_withoutClose) {
						_this._tabWithoutCloseTmpl.tmpl({tabId:_tabId, tabName:_tabName}).appendTo(_this._tabs);
					} else {
						var _tabHtml = _this._tabTmpl.tmpl({tabId:_tabId, tabName:_tabName});
						$(_tabHtml).find('span').off().click(function() {
							tabs.closeTab({tabId:_tabId, beforeClose:_beforeClose, afterClose:_afterClose});
						});
						_tabHtml.appendTo(_this._tabs);
					}
				}
				if (_this._tabs.find('#' + _tabId + 'Pane').length == 0) {
					_this._tabPaneTmpl.tmpl({tabId:_tabId}).appendTo(_this._tabPanes);
				}
				if (_isShow) {
					_this._root.find('#' + _tabId).tab('show');
				}
				if (_url) {
					$.ajax({
						url: _url,
						type: _type,
						data: _params,
						dataType: 'html',
						cache: false,
						beforeSend: function() {
							loading.show();
						},
						error: function(jqXHR, textStatus, errorThrown) {
							console.log(textStatus, ':', errorThrown);
							loading.hide();
						},
						success: function(html) {
							loading.hide();
							_this._root.find('#' + _tabId + 'Pane').empty().append(html);
							_afterOpen();
						}
					});
				}
			}
		},
		closeTab: function(data) {
			var _this = this;
			var _data = $.extend({
				tabId: null,
				beforeClose: function() {},
				afterClose: function() {}
			}, data);
			var _tabId = _data.tabId;
			var _beforeClose = _data.beforeClose;
			var _afterClose = _data.afterClose;
			if (_tabId) {
				_beforeClose();
				_this._root.find('#' + _tabId).parent().remove();
				_this._root.find('#' + _tabId + 'Pane').remove();
				_this._tabs.find('li:last').find('a').tab('show');
				_afterClose();
			}
		}
	});
})(jQuery);