(function($) {
	Class('gotour.admin.Category', {
		init : function(options) {
			var _this = this;
			_this._options = $.extend({
				id : '#categoryTabPane'
			}, options);
			_this._root = $(_this._options.id);
			_this._page = 1;
			_this._pageSize = 10;
			_this._initHandsontable();
			_this._loadData();
			_this._bindEvent();
		},
		_bindEvent : function() {
			var _this = this;
			_this._bindSearchEvent();
			_this._bindDeleteEvent();
			_this._bindAddEvent();
			_this._bindCheckboxEvent();
		},
		_bindSearchEvent: function() {
			var _this = this;
			_this._root.on('change', '#productCode', function() {
				_this._colHeaders[0] = '<input class="chkAll" type="checkbox">';
				_this._page = 1;
				_this._loadData();
			});
		},
		_bindDeleteEvent: function() {
			var _this = this;
			_this._root.on('click', '#deleteBtn', function() {
				if (confirm('你确认要删除选中的类别吗？')) {
					var infos = [];
					$(_this._handsontable.getData()).each(function(i, e) {
						if (e.checked) {
							infos.push(e);
						}
					});
					if (infos.length > 0) {
						common.ajax({
							url: '/a/c/delete',
							data: JSON.stringify(infos),
							success: function() {
								loading.hide();
								_this._loadData();
							}
						});
					}
				}
			});
		},
		_bindAddEvent: function() {
			var _this = this;
			_this._root.on('click', '#addBtn', function() {
				if (confirm('你确认要添加这个类别吗？')) {
					_this._productCode = _this._root.find('#addCategoryModal #productCode option:selected').val();
					_this._categoryCode = _this._root.find('#addCategoryModal #categoryCode').val();
					_this._categoryName = _this._root.find('#addCategoryModal #categoryName').val();
					common.ajax({
						url: '/a/c/add',
						data: JSON.stringify({
							infoCode: _this._productCode + _this._categoryCode,
							infoContent: _this._categoryName
						}),
						success: function() {
							loading.hide();
							_this._root.find('#addCategoryModal').modal('hide');
							_this._loadData();
						}
					});
				}
			});
		},
		_bindCheckboxEvent : function() {
			var _this = this;
			_this._allChecked = false;
			_this._root.on('change', '#categoryHt .chkAll', function(e) {
				if (!_this._allChecked) {
					_this._allChecked = true;
					$(_this._handsontable.getData()).each(function(i, e) {
						e.checked = true;
					});
				} else {
					_this._allChecked = false;
					$(_this._handsontable.getData()).each(function(i, e) {
						e.checked = false;
					});
				}
				if (_this._allChecked) {
					_this._colHeaders[0] = '<input class="chkAll" type="checkbox" checked>';
				} else {
					_this._colHeaders[0] = '<input class="chkAll" type="checkbox">';
				}
				_this._handsontable.render();
			});
		},
		_initHandsontable: function() {
			var _this = this;
			_this._colHeaders = [
				'<input class="chkAll" type="checkbox">',
				'类别代码',
				'类别内容',
				'修正者',
				'修正日'];
			_this._root.find('#categoryHt').handsontable({
				startRows: 0,
				startCols: 5,
				height: 257,
				colHeaders: _this._colHeaders,
				columns: [
					{data: 'checked', type: 'checkbox', renderer: _this._checkboxRender},
					{data: 'infoCode', readOnly: true, type: 'text', className: 'text-center'},
					{data: 'infoContent', type: 'text', className: 'text-center'},
					{data: 'modifier', readOnly: true, type: 'text', className: 'text-center'},
					{data: 'modifyTimeFormat', readOnly: true, type: 'text', className: 'text-center'}
				],
				manualColumnMove: false,
				manualColumnResize: false,
				contextMenu: false,
				stretchH: 'all',
				afterChange: _this._saveCell
			});
			_this._handsontable = _this._root.find('#categoryHt').handsontable('getInstance');
			_this._root.find('#categoryHt').find('table').addClass('table').addClass('table-hover').addClass('table-bordered').addClass('table-condensed');
		},
		_checkboxRender: function(instance, td, row, col, prop, value, cellProperties) {
			Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
			$(td).addClass('text-center');
		},
		_saveCell: function(changes, source) {
			if (changes) {
				var csConditions = [];
				var infos = [];
				for (var i in changes) {
					var change = changes[i];
					var row = change[0];
					var prop = change[1];
					var oldVal = change[2];
					var newVal = change[3];
					if (prop == 'infoContent' && oldVal != newVal) {
						infos.push({
							infoCode: this.getDataAtRowProp(row, 'infoCode'),
							infoContent: newVal
						});
					}
				}
				if (infos.length > 0) {
					common.ajax({
						url: '/a/c/modify',
						data: JSON.stringify(infos),
						success: function() {
							loading.hide();
							alert('更新成功！');
							category._loadData();
						}
					});
				}
			}
		},
		_loadData : function() {
			var _this = this;
			common.ajax({
				url: '/a/c/list',
				data: JSON.stringify({
					productCode: _this._root.find('#productCode option:selected').val(),
					page: _this._page,
					pageSize: _this._pageSize
				}),
				dataType: 'json',
				success: function(data) {
					loading.hide();
					_this._dataCount = data.dataCount;
					_this._initPaginator();
					_this._colHeaders[0] = '<input class="chkAll" type="checkbox">';
					_this._handsontable.loadData(data.dataList);
					resize();
				}
			});
		},
		_initPaginator: function() {
			var _this = this;
			if (_this._dataCount == 0) {
				_this._dataCount = 1;
			}
			var options = {
				bootstrapMajorVersion: 3,
				currentPage: _this._page,
				totalPages: Math.ceil(_this._dataCount / _this._pageSize),
				size: 'small',
				numberOfPages: 3,
				itemTexts: function (type, page, current) {
					switch (type) {
					case "first":
						return '<span class="glyphicon glyphicon-fast-backward"></span>';
					case "prev":
						return '<span class="glyphicon glyphicon-backward"></span>';
					case "next":
						return '<span class="glyphicon glyphicon-forward"></span>';
					case "last":
						return '<span class="glyphicon glyphicon-fast-forward"></span>';
					case "page":
						return page;
					}
				},
				shouldShowPage: function(type, page, current) {
					return true;
				},
				tooltipTitles: function() {
					return "";
				},
				onPageClicked: function(event, originalEvent, type, page) {
					_this._page = page;
					_this._loadData();
				}
			};
			_this._root.find('#paginator').bootstrapPaginator(options);
		}
	});
})(jQuery);