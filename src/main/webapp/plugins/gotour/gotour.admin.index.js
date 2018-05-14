(function($) {
	Class('gotour.admin.Index', {
		init : function(options) {
			var _this = this;
			_this._options = $.extend({
				id : '.container-fluid'
			}, options);
			_this._root = $(_this._options.id);
			_this._initTabs();
		},
		_initTabs: function() {
			var _this = this;
			tabs.openTab({
				tabId: 'categoryTab',
				tabName: '类别',
				url: '/a/c',
				isShow: false
			});
			tabs.openTab({
				tabId: 'localTab',
				tabName: '周边方案',
				url: '/a/l',
				isShow: false
			});
			tabs.openTab({
				tabId: 'internalTab',
				tabName: '国内方案',
				url: '/a/i',
				isShow: false
			});
			tabs.openTab({
				tabId: 'outdoorTab',
				tabName: '春秋游方案',
				url: '/a/o',
				isShow: false
			});
			tabs.openTab({
				tabId: 'attractionsTab',
				tabName: '景点',
				url: '/a/a',
				isShow: false
			});
			tabs.openTab({
				tabId: 'trainingTab',
				tabName: '拓展培训',
				url: '/a/t',
				isShow: false
			});
			tabs.openTab({
				tabId: 'toolTab',
				tabName: '代码生成工具',
				url: '/a/tool',
				isShow: false
			});
		}
	});
})(jQuery);