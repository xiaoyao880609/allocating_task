(function($) {
	Class('gotour.admin.Outdoor', {
		init : function(options) {
			var _this = this;
			_this._options = $.extend({
				id : '#outdoorTabPane'
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
			_this._bindModifyEvent();
			_this._bindCheckboxEvent();
		},
		_bindSearchEvent: function() {
			var _this = this;
			_this._root.on('change', '#searchCategoryCode', function() {
				_this._colHeaders[0] = '<input class="chkAll" type="checkbox">';
				_this._page = 1;
				_this._loadData();
			});
		},
		_bindDeleteEvent: function() {
			var _this = this;
			_this._root.on('click', '#deleteBtn', function() {
				if (confirm('你确认要删除选中的春秋游方案吗？')) {
					var outdoors = [];
					$(_this._handsontable.getData()).each(function(i, e) {
						if (e.checked) {
							outdoors.push(e);
						}
					});
					if (outdoors.length > 0) {
						common.ajax({
							url: '/a/o/delete',
							data: JSON.stringify(outdoors),
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
				if (confirm('你确认要添加这个春秋游方案吗？')) {
					_this._categoryCode = _this._root.find('#addOutdoorModal #categoryCode option:selected').val();
					_this._title = _this._root.find('#addOutdoorModal #title').val();
					_this._planDetail = _this._root.find('#addOutdoorModal #planDetail').val();
					_this._standard = _this._root.find('#addOutdoorModal #standard').val();
					_this._cost = _this._root.find('#addOutdoorModal #cost').val();
					_this._topYn = _this._root.find('#addOutdoorModal #topYn option:selected').val();
					common.ajax({
						url: '/a/o/add',
						data: JSON.stringify({
							categoryCode: _this._categoryCode,
							title: _this._title,
							planDetail: _this._planDetail,
							standard: _this._standard,
							cost: _this._cost,
							topYn : _this._topYn
						}),
						success: function() {
							loading.hide();
							_this._root.find('#addOutdoorModal').modal('hide');
							_this._loadData();
						}
					});
				}
			});
		},
		_bindModifyEvent: function() {
			var _this = this;
			_this._root.on('click', '.modifyBtn', function() {
				common.ajax({
					url: '/a/o/modify/' + $(this).attr('data-id'),
					type: 'get',
					success: function(data) {
						loading.hide();
						_this._root.find('#modifyOutdoorModal #outdoorId').val(data.id);
						_this._root.find('#modifyOutdoorModal #categoryCode option[value=' + data.categoryCode + ']').prop('selected',true);
						_this._root.find('#modifyOutdoorModal #title').val(data.title);
						_this._root.find('#modifyOutdoorModal #planDetail').val(data.planDetail);
						_this._root.find('#modifyOutdoorModal #standard').val(data.standard);
						_this._root.find('#modifyOutdoorModal #cost').val(data.cost);
						_this._root.find('#modifyOutdoorModal #topYn option[value=' + data.topYn + ']').prop('selected',true);
						_this._root.find('#modifyOutdoorModal').modal('show');
					}
				});
			});
			_this._root.on('click', '#modifyBtn', function() {
				_this._outdoorId = _this._root.find('#modifyOutdoorModal #outdoorId').val();
				_this._categoryCode = _this._root.find('#modifyOutdoorModal #categoryCode option:selected').val();
				_this._title = _this._root.find('#modifyOutdoorModal #title').val();
				_this._planDetail = _this._root.find('#modifyOutdoorModal #planDetail').val();
				_this._standard = _this._root.find('#modifyOutdoorModal #standard').val();
				_this._cost = _this._root.find('#modifyOutdoorModal #cost').val();
				_this._topYn = _this._root.find('#modifyOutdoorModal #topYn option:selected').val();
				common.ajax({
					url: '/a/o/modify',
					data: JSON.stringify({
						id: _this._outdoorId,
						categoryCode: _this._categoryCode,
						title: _this._title,
						planDetail: _this._planDetail,
						standard: _this._standard,
						cost: _this._cost,
						topYn : _this._topYn
					}),
					success: function() {
						$('#loading').hide();
						_this._root.find('#modifyOutdoorModal').modal('hide');
						_this._loadData();
					}
				});
			});
		},
		_bindCheckboxEvent : function() {
			var _this = this;
			_this._allChecked = false;
			_this._root.on('change', '#outdoorHt .chkAll', function() {
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
				'ID',
				'缩略图',
				'标题',
				'修正者',
				'修正日',
				'热门',
				'操作'];
			_this._root.find('#outdoorHt').handsontable({
				startRows: 0,
				startCols: 8,
				height: 532,
				colHeaders: _this._colHeaders,
				columns: [
					{data: 'checked', type: 'checkbox', renderer: _this._checkboxRender},
					{data: 'id', readOnly: true, type: 'text', className: 'text-center'},
					{readOnly: true, renderer: _this._imgRender},
					{data: 'title', readOnly: true, type: 'text', className: 'text-center'},
					{data: 'modifier', readOnly: true, type: 'text', className: 'text-center'},
					{data: 'modifyTimeFormat', readOnly: true, type: 'text', className: 'text-center'},
					{data: 'topYn', type: 'dropdown', source: ["Y", "N"], renderer: _this._autocompleteRenderer},
					{readOnly: true, renderer: _this._operationRender}
				],
				manualColumnMove: false,
				manualColumnResize: false,
				manualRowResize: true,
				rowHeights: [100,100,100,100,100,100,100,100,100,100],
				contextMenu: false,
				stretchH: 'all',
				afterChange: _this._saveCell
			});
			_this._handsontable = _this._root.find('#outdoorHt').handsontable('getInstance');
			_this._root.find('#outdoorHt').find('table').addClass('table').addClass('table-hover').addClass('table-bordered').addClass('table-condensed');
		},
		_checkboxRender: function(instance, td, row, col, prop, value, cellProperties) {
			Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
			$(td).addClass('text-center');
		},
		_textRenderer: function(instance, td, row, col, prop, value, cellProperties) {
			Handsontable.renderers.TextRenderer.apply(this, arguments);
			$(td).addClass('text-center');
		},
		_imgRender: function(instance, td, row, col, prop, value, cellProperties) {
			var id = instance.getDataAtRowProp(row, 'id');
			var productCode = instance.getDataAtRowProp(row, 'productCode');
			var img = $('<img>');
			img.attr('src', '/images/thumbnail/' + productCode + '_' + id + '.jpg');
			img.on('mousedown', function() {
				event.preventDefault();
			});
			$(td).addClass('text-center').empty().append(img);
		},
		_autocompleteRenderer: function(instance, td, row, col, prop, value, cellProperties) {
			Handsontable.renderers.AutocompleteRenderer.apply(this, arguments);
			$(td).addClass('text-center');
		},
		_operationRender: function(instance, td, row, col, prop, value, cellProperties) {
			var id = instance.getDataAtRowProp(row, 'id');
			var btn = $('<button>');
			btn.addClass('btn btn-default btn-xs modifyBtn');
			btn.attr('data-id', id);
			btn.text('详细');
			$(td).addClass('text-center').empty().append(btn);
		},
		_saveCell: function(changes, source) {
			if (changes) {
				var csConditions = [];
				var outdoors = [];
				for (var i in changes) {
					var change = changes[i];
					var row = change[0];
					var prop = change[1];
					var oldVal = change[2];
					var newVal = change[3];
					if (prop == 'topYn' && oldVal != newVal) {
						outdoors.push({
							id: this.getDataAtRowProp(row, 'id'),
							topYn: newVal
						});
					}
				}
				if (outdoors.length > 0) {
					common.ajax({
						url: '/a/o/modifyTopYn',
						data: JSON.stringify(outdoors),
						success: function() {
							loading.hide();
							alert('更新成功！');
							outdoor._loadData();
						}
					});
				}
			}
		},
		_loadData : function() {
			var _this = this;
			common.ajax({
				url: '/a/o/list',
				data: JSON.stringify({
					categoryCode: _this._root.find('#searchCategoryCode option:selected').val(),
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