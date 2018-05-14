(function($) {
	Class('gotour.admin.Training', {
		init : function(options) {
			var _this = this;
			_this._options = $.extend({
				id : '#trainingTabPane'
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
				if (confirm('你确认要删除选中的拓展培训吗？')) {
					var trainings = [];
					$(_this._handsontable.getData()).each(function(i, e) {
						if (e.checked) {
							trainings.push(e);
						}
					});
					if (trainings.length > 0) {
						common.ajax({
							url: '/a/t/delete',
							data: JSON.stringify(trainings),
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
				if (confirm('你确认要添加这个拓展培训吗？')) {
					_this._categoryCode = _this._root.find('#addTrainingModal #categoryCode option:selected').val();
					_this._title = _this._root.find('#addTrainingModal #title').val();
					_this._locations = _this._root.find('#addTrainingModal #locations').val();
					_this._costTime = _this._root.find('#addTrainingModal #costTime').val();
					_this._characteristic = _this._root.find('#addTrainingModal #characteristic').val();
					_this._planDetail = _this._root.find('#addTrainingModal #planDetail').val();
					_this._costDetail = _this._root.find('#addTrainingModal #costDetail').val();
					_this._cost = _this._root.find('#addTrainingModal #cost').val();
					_this._trafficCost = _this._root.find('#addTrainingModal #trafficCost').val();
					_this._topYn = _this._root.find('#addTrainingModal #topYn option:selected').val();
					common.ajax({
						url: '/a/t/add',
						data: JSON.stringify({
							categoryCode: _this._categoryCode,
							title: _this._title,
							locations: _this._locations,
							costTime: _this._costTime,
							characteristic: _this._characteristic,
							planDetail: _this._planDetail,
							costDetail: _this._costDetail,
							cost: _this._cost,
							trafficCost: _this._trafficCost,
							topYn : _this._topYn
						}),
						success: function() {
							loading.hide();
							_this._root.find('#addTrainingModal').modal('hide');
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
					url: '/a/t/modify/' + $(this).attr('data-id'),
					type: 'get',
					success: function(data) {
						loading.hide();
						_this._root.find('#modifyTrainingModal #trainingId').val(data.id);
						_this._root.find('#modifyTrainingModal #categoryCode option[value=' + data.categoryCode + ']').prop('selected',true);
						_this._root.find('#modifyTrainingModal #title').val(data.title);
						_this._root.find('#modifyTrainingModal #locations').val(data.locations);
						_this._root.find('#modifyTrainingModal #costTime').val(data.costTime);
						_this._root.find('#modifyTrainingModal #characteristic').val(data.characteristic);
						_this._root.find('#modifyTrainingModal #planDetail').val(data.planDetail);
						_this._root.find('#modifyTrainingModal #costDetail').val(data.costDetail);
						_this._root.find('#modifyTrainingModal #cost').val(data.cost);
						_this._root.find('#modifyTrainingModal #trafficCost').val(data.trafficCost);
						_this._root.find('#modifyTrainingModal #topYn option[value=' + data.topYn + ']').prop('selected',true);
						_this._root.find('#modifyTrainingModal').modal('show');
					}
				});
			});
			_this._root.on('click', '#modifyBtn', function() {
				_this._trainingId = _this._root.find('#modifyTrainingModal #trainingId').val();
				_this._categoryCode = _this._root.find('#modifyTrainingModal #categoryCode option:selected').val();
				_this._title = _this._root.find('#modifyTrainingModal #title').val();
				_this._locations = _this._root.find('#modifyTrainingModal #locations').val();
				_this._costTime = _this._root.find('#modifyTrainingModal #costTime').val();
				_this._characteristic = _this._root.find('#modifyTrainingModal #characteristic').val();
				_this._planDetail = _this._root.find('#modifyTrainingModal #planDetail').val();
				_this._costDetail = _this._root.find('#modifyTrainingModal #costDetail').val();
				_this._cost = _this._root.find('#modifyTrainingModal #cost').val();
				_this._trafficCost = _this._root.find('#modifyTrainingModal #trafficCost').val();
				_this._topYn = _this._root.find('#modifyTrainingModal #topYn option:selected').val();
				common.ajax({
					url: '/a/t/modify',
					data: JSON.stringify({
						id: _this._trainingId,
						categoryCode: _this._categoryCode,
						title: _this._title,
						locations: _this._locations,
						costTime: _this._costTime,
						characteristic: _this._characteristic,
						planDetail: _this._planDetail,
						costDetail: _this._costDetail,
						cost: _this._cost,
						trafficCost: _this._trafficCost,
						topYn : _this._topYn
					}),
					success: function() {
						$('#loading').hide();
						_this._root.find('#modifyTrainingModal').modal('hide');
						_this._loadData();
					}
				});
			});
		},
		_bindCheckboxEvent : function() {
			var _this = this;
			_this._allChecked = false;
			_this._root.on('change', '#trainingHt .chkAll', function() {
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
			_this._root.find('#trainingHt').handsontable({
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
			_this._handsontable = _this._root.find('#trainingHt').handsontable('getInstance');
			_this._root.find('#trainingHt').find('table').addClass('table').addClass('table-hover').addClass('table-bordered').addClass('table-condensed');
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
				var trainings = [];
				for (var i in changes) {
					var change = changes[i];
					var row = change[0];
					var prop = change[1];
					var oldVal = change[2];
					var newVal = change[3];
					if (prop == 'topYn' && oldVal != newVal) {
						trainings.push({
							id: this.getDataAtRowProp(row, 'id'),
							topYn: newVal
						});
					}
				}
				if (trainings.length > 0) {
					common.ajax({
						url: '/a/t/modifyTopYn',
						data: JSON.stringify(trainings),
						success: function() {
							loading.hide();
							alert('更新成功！');
							training._loadData();
						}
					});
				}
			}
		},
		_loadData : function() {
			var _this = this;
			common.ajax({
				url: '/a/t/list',
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