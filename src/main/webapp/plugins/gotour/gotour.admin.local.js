(function($) {
	Class('gotour.admin.Local', {
		init : function(options) {
			var _this = this;
			_this._options = $.extend({
				id : '#localTabPane'
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
				if (confirm('你确认要删除选中的周边方案吗？')) {
					var locals = [];
					$(_this._handsontable.getData()).each(function(i, e) {
						if (e.checked) {
							locals.push(e);
						}
					});
					if (locals.length > 0) {
						common.ajax({
							url: '/a/l/delete',
							data: JSON.stringify(locals),
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
				if (confirm('你确认要添加这个周边方案吗？')) {
					_this._categoryCode = _this._root.find('#addLocalModal #categoryCode option:selected').val();
					_this._title = _this._root.find('#addLocalModal #title').val();
					_this._subtitle = _this._root.find('#addLocalModal #subtitle').val();
					_this._description = _this._root.find('#addLocalModal #description').val();
					_this._majorIdea = _this._root.find('#addLocalModal #majorIdea').val();
					_this._locations = _this._root.find('#addLocalModal #locations').val();
					_this._costTime = _this._root.find('#addLocalModal #costTime').val();
					_this._planDetail = _this._root.find('#addLocalModal #planDetail').val();
					_this._costDetail = _this._root.find('#addLocalModal #costDetail').val();
					_this._cost = _this._root.find('#addLocalModal #cost').val();
					_this._trafficCost = _this._root.find('#addLocalModal #trafficCost').val();
					_this._topYn = _this._root.find('#addLocalModal #topYn option:selected').val();
					common.ajax({
						url: '/a/l/add',
						data: JSON.stringify({
							categoryCode: _this._categoryCode,
							title: _this._title,
							subtitle: _this._subtitle,
							description: _this._description,
							majorIdea: _this._majorIdea,
							locations: _this._locations,
							costTime: _this._costTime,
							planDetail: _this._planDetail,
							costDetail: _this._costDetail,
							cost: _this._cost,
							trafficCost: _this._trafficCost,
							topYn : _this._topYn
						}),
						success: function() {
							loading.hide();
							_this._root.find('#addLocalModal').modal('hide');
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
					url: '/a/l/modify/' + $(this).attr('data-id'),
					type: 'get',
					success: function(data) {
						loading.hide();
						_this._root.find('#modifyLocalModal #localId').val(data.id);
						_this._root.find('#modifyLocalModal #categoryCode option[value=' + data.categoryCode + ']').prop('selected',true);
						_this._root.find('#modifyLocalModal #title').val(data.title);
						_this._root.find('#modifyLocalModal #subtitle').val(data.subtitle);
						_this._root.find('#modifyLocalModal #description').val(data.description);
						_this._root.find('#modifyLocalModal #majorIdea').val(data.majorIdea);
						_this._root.find('#modifyLocalModal #locations').val(data.locations);
						_this._root.find('#modifyLocalModal #costTime').val(data.costTime);
						_this._root.find('#modifyLocalModal #planDetail').val(data.planDetail);
						_this._root.find('#modifyLocalModal #costDetail').val(data.costDetail);
						_this._root.find('#modifyLocalModal #cost').val(data.cost);
						_this._root.find('#modifyLocalModal #trafficCost').val(data.trafficCost);
						_this._root.find('#modifyLocalModal #topYn option[value=' + data.topYn + ']').prop('selected',true);
						_this._root.find('#modifyLocalModal').modal('show');
					}
				});
			});
			_this._root.on('click', '#modifyBtn', function() {
				_this._localId = _this._root.find('#modifyLocalModal #localId').val();
				_this._categoryCode = _this._root.find('#modifyLocalModal #categoryCode option:selected').val();
				_this._title = _this._root.find('#modifyLocalModal #title').val();
				_this._subtitle = _this._root.find('#modifyLocalModal #subtitle').val();
				_this._description = _this._root.find('#modifyLocalModal #description').val();
				_this._majorIdea = _this._root.find('#modifyLocalModal #majorIdea').val();
				_this._locations = _this._root.find('#modifyLocalModal #locations').val();
				_this._costTime = _this._root.find('#modifyLocalModal #costTime').val();
				_this._planDetail = _this._root.find('#modifyLocalModal #planDetail').val();
				_this._costDetail = _this._root.find('#modifyLocalModal #costDetail').val();
				_this._cost = _this._root.find('#modifyLocalModal #cost').val();
				_this._trafficCost = _this._root.find('#modifyLocalModal #trafficCost').val();
				_this._topYn = _this._root.find('#modifyLocalModal #topYn option:selected').val();
				common.ajax({
					url: '/a/l/modify',
					data: JSON.stringify({
						id: _this._localId,
						categoryCode: _this._categoryCode,
						title: _this._title,
						subtitle: _this._subtitle,
						description: _this._description,
						majorIdea: _this._majorIdea,
						locations: _this._locations,
						costTime: _this._costTime,
						planDetail: _this._planDetail,
						costDetail: _this._costDetail,
						cost: _this._cost,
						trafficCost: _this._trafficCost,
						topYn : _this._topYn
					}),
					success: function() {
						$('#loading').hide();
						_this._root.find('#modifyLocalModal').modal('hide');
						_this._loadData();
					}
				});
			});
		},
		_bindCheckboxEvent : function() {
			var _this = this;
			_this._allChecked = false;
			_this._root.on('change', '#localHt .chkAll', function() {
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
				'地点',
				'修正者',
				'修正日',
				'热门',
				'操作'];
			_this._root.find('#localHt').handsontable({
				startRows: 0,
				startCols: 8,
				height: 532,
				colHeaders: _this._colHeaders,
				columns: [
					{data: 'checked', type: 'checkbox', renderer: _this._checkboxRender},
					{data: 'id', readOnly: true, type: 'text', className: 'text-center'},
					{readOnly: true, renderer: _this._imgRender},
					{data: 'title', readOnly: true, type: 'text', className: 'text-center'},
					{data: 'locations', readOnly: true, type: 'text', className: 'text-center'},
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
			_this._handsontable = _this._root.find('#localHt').handsontable('getInstance');
			_this._root.find('#localHt').find('table').addClass('table').addClass('table-hover').addClass('table-bordered').addClass('table-condensed');
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
				var locals = [];
				for (var i in changes) {
					var change = changes[i];
					var row = change[0];
					var prop = change[1];
					var oldVal = change[2];
					var newVal = change[3];
					if (prop == 'topYn' && oldVal != newVal) {
						locals.push({
							id: this.getDataAtRowProp(row, 'id'),
							topYn: newVal
						});
					}
				}
				if (locals.length > 0) {
					common.ajax({
						url: '/a/l/modifyTopYn',
						data: JSON.stringify(locals),
						success: function() {
							loading.hide();
							alert('更新成功！');
							local._loadData();
						}
					});
				}
			}
		},
		_loadData : function() {
			var _this = this;
			common.ajax({
				url: '/a/l/list',
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