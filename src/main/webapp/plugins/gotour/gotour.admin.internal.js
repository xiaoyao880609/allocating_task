(function($) {
	Class('gotour.admin.Internal', {
		init : function(options) {
			var _this = this;
			_this._options = $.extend({
				id : '#internalTabPane'
			}, options);
			_this._root = $(_this._options.id);
			_this._page = 1;
			_this._pageSize = 10;
			_this._initHandsontable();
			_this._initItineraryHandsontable();
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
				if (confirm('你确认要删除选中的国内方案吗？')) {
					var internals = [];
					$(_this._handsontable.getData()).each(function(i, e) {
						if (e.checked) {
							internals.push(e);
						}
					});
					if (internals.length > 0) {
						common.ajax({
							url: '/a/i/delete',
							data: JSON.stringify(internals),
							success: function() {
								loading.hide();
								_this._loadData();
							}
						});
					}
				}
			});
			_this._root.on('click', '.deleteItineraryBtn', function() {
				var itineraryId = $(this).attr('data-id');
				common.ajax({
					url: '/a/i/i/delete/' + $(this).attr('data-id'),
					type: 'get',
					success: function() {
						loading.hide();
						_this._loadItineraryData(_this._root.find('#addItineraryModal #internalId').val());
					}
				});
			});
		},
		_bindAddEvent: function() {
			var _this = this;
			_this._root.on('click', '#addBtn', function() {
				if (confirm('你确认要添加这个国内方案吗？')) {
					_this._categoryCode = _this._root.find('#addInternalModal #categoryCode option:selected').val();
					_this._title = _this._root.find('#addInternalModal #title').val();
					_this._description = _this._root.find('#addInternalModal #description').val();
					_this._beginDate = _this._root.find('#addInternalModal #beginDate').val();
					_this._cost = _this._root.find('#addInternalModal #cost').val();
					_this._standard = _this._root.find('#addInternalModal #standard').val();
					_this._reminder = _this._root.find('#addInternalModal #reminder').val();
					_this._shopping = _this._root.find('#addInternalModal #shopping').val();
					_this._additionalAttractions = _this._root.find('#addInternalModal #additionalAttractions').val();
					_this._topYn = _this._root.find('#addInternalModal #topYn option:selected').val();
					common.ajax({
						url: '/a/i/add',
						data: JSON.stringify({
							categoryCode: _this._categoryCode,
							title: _this._title,
							description: _this._description,
							beginDate: _this._beginDate,
							cost: _this._cost,
							standard: _this._standard,
							reminder: _this._reminder,
							shopping: _this._shopping,
							additionalAttractions: _this._additionalAttractions,
							topYn : _this._topYn
						}),
						success: function() {
							loading.hide();
							_this._root.find('#addInternalModal').modal('hide');
							_this._loadData();
						}
					});
				}
			});
			_this._root.on('click', '#addItineraryBtn', function() {
				_this._internalId = _this._root.find('#addItineraryModal #internalId').val();
				if (_this._internalId) {
					_this._itineraryDate = _this._root.find('#addItineraryModal #itineraryDate').val();
					_this._itineraryContent = _this._root.find('#addItineraryModal #itineraryContent').val();
					_this._itineraryDining = _this._root.find('#addItineraryModal #itineraryDining').val();
					_this._itineraryLodgment = _this._root.find('#addItineraryModal #itineraryLodgment').val();
					common.ajax({
						url: '/a/i/i/add',
						data: JSON.stringify({
							internalId: _this._internalId,
							itineraryDate: _this._itineraryDate,
							itineraryContent: _this._itineraryContent,
							itineraryDining: _this._itineraryDining,
							itineraryLodgment: _this._itineraryLodgment
						}),
						success: function() {
							loading.hide();
							_this._root.find('#addItineraryModal').modal('hide');
							_this._loadItineraryData(_this._internalId);
						}
					});
				} else {
					alert('请选择一个国内的方案！以便添加这个方案的行程！');
					_this._root.find('#addItineraryModal').modal('hide');
				}
			});
		},
		_bindModifyEvent: function() {
			var _this = this;
			_this._root.on('click', '.modifyBtn', function() {
				common.ajax({
					url: '/a/i/modify/' + $(this).attr('data-id'),
					type: 'get',
					success: function(data) {
						loading.hide();
						_this._root.find('#modifyInternalModal #internalId').val(data.id);
						_this._root.find('#modifyInternalModal #categoryCode option[value=' + data.categoryCode + ']').prop('selected',true);
						_this._root.find('#modifyInternalModal #title').val(data.title);
						_this._root.find('#modifyInternalModal #description').val(data.description);
						_this._root.find('#modifyInternalModal #beginDate').val(data.beginDate);
						_this._root.find('#modifyInternalModal #cost').val(data.cost);
						_this._root.find('#modifyInternalModal #standard').val(data.standard);
						_this._root.find('#modifyInternalModal #reminder').val(data.reminder);
						_this._root.find('#modifyInternalModal #shopping').val(data.shopping);
						_this._root.find('#modifyInternalModal #additionalAttractions').val(data.additionalAttractions);
						_this._root.find('#modifyInternalModal #topYn option[value=' + data.topYn + ']').prop('selected',true);
						_this._root.find('#modifyInternalModal').modal('show');
					}
				});
			});
			_this._root.on('click', '.itineraryBtn', function() {
				_this._root.find('#addItineraryModal #internalId').val($(this).attr('data-id'));
				_this._loadItineraryData($(this).attr('data-id'));
			});
			_this._root.on('click', '#modifyBtn', function() {
				_this._internalId = _this._root.find('#modifyInternalModal #internalId').val();
				_this._categoryCode = _this._root.find('#modifyInternalModal #categoryCode option:selected').val();
				_this._title = _this._root.find('#modifyInternalModal #title').val();
				_this._description = _this._root.find('#modifyInternalModal #description').val();
				_this._beginDate = _this._root.find('#modifyInternalModal #beginDate').val();
				_this._cost = _this._root.find('#modifyInternalModal #cost').val();
				_this._standard = _this._root.find('#modifyInternalModal #standard').val();
				_this._reminder = _this._root.find('#modifyInternalModal #reminder').val();
				_this._shopping = _this._root.find('#modifyInternalModal #shopping').val();
				_this._additionalAttractions = _this._root.find('#modifyInternalModal #additionalAttractions').val();
				_this._topYn = _this._root.find('#modifyInternalModal #topYn option:selected').val();
				common.ajax({
					url: '/a/i/modify',
					data: JSON.stringify({
						id: _this._internalId,
						categoryCode: _this._categoryCode,
						title: _this._title,
						description: _this._description,
						beginDate: _this._beginDate,
						cost: _this._cost,
						standard: _this._standard,
						reminder: _this._reminder,
						shopping: _this._shopping,
						additionalAttractions: _this._additionalAttractions,
						topYn : _this._topYn
					}),
					success: function() {
						$('#loading').hide();
						_this._root.find('#modifyInternalModal').modal('hide');
						_this._loadData();
					}
				});
			});
		},
		_bindCheckboxEvent : function() {
			var _this = this;
			_this._allChecked = false;
			_this._root.on('change', '#internalHt .chkAll', function() {
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
				'出团日期',
				'修正者',
				'修正日',
				'热门',
				'操作'];
			_this._root.find('#internalHt').handsontable({
				startRows: 0,
				startCols: 8,
				height: 532,
				colHeaders: _this._colHeaders,
				columns: [
					{data: 'checked', type: 'checkbox', renderer: _this._checkboxRender},
					{data: 'id', readOnly: true, type: 'text', className: 'text-center'},
					{readOnly: true, renderer: _this._imgRender},
					{data: 'title', readOnly: true, type: 'text', className: 'text-center'},
					{data: 'beginDate', readOnly: true, type: 'text', className: 'text-center'},
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
			_this._handsontable = _this._root.find('#internalHt').handsontable('getInstance');
			_this._root.find('#internalHt').find('table').addClass('table').addClass('table-hover').addClass('table-bordered').addClass('table-condensed');
		},
		_initItineraryHandsontable: function() {
			var _this = this;
			_this._itineraryColHeaders = [
				'行程日期',
				'行程内容',
				'行程用餐',
				'行程住宿',
				'修正者',
				'修正日',
				'操作'];
			_this._root.find('#itineraryHt').handsontable({
				startRows: 0,
				startCols: 8,
				height: 532,
				colHeaders: _this._itineraryColHeaders,
				columns: [
					{data: 'itineraryDate', type: 'text', className: 'text-center'},
					{data: 'itineraryContent', renderer: 'html'},
					{data: 'itineraryDining', type: 'text', className: 'text-center'},
					{data: 'itineraryLodgment', type: 'text', className: 'text-center'},
					{data: 'modifier', readOnly: true, type: 'text', className: 'text-center'},
					{data: 'modifyTimeFormat', readOnly: true, type: 'text', className: 'text-center'},
					{readOnly: true, renderer: _this._itineraryOperationRender}
				],
				manualColumnMove: false,
				manualColumnResize: false,
				contextMenu: false,
				stretchH: 'all',
				afterChange: _this._itinerarySaveCell
			});
			_this._itineraryHandsontable = _this._root.find('#itineraryHt').handsontable('getInstance');
			_this._root.find('#itineraryHt').find('table').addClass('table').addClass('table-hover').addClass('table-bordered').addClass('table-condensed');
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
			var itineraryBtn = $('<button>');
			itineraryBtn.addClass('btn btn-default btn-xs itineraryBtn');
			itineraryBtn.attr('data-id', id);
			itineraryBtn.text('行程');
			$(td).addClass('text-center').empty().append(btn).append(itineraryBtn);
		},
		_itineraryOperationRender: function(instance, td, row, col, prop, value, cellProperties) {
			var id = instance.getDataAtRowProp(row, 'itineraryId');
			var btn = $('<button>');
			btn.addClass('btn btn-default btn-xs deleteItineraryBtn');
			btn.attr('data-id', id);
			btn.text('删除');
			$(td).addClass('text-center').empty().append(btn);
		},
		_saveCell: function(changes, source) {
			if (changes) {
				var csConditions = [];
				var internals = [];
				for (var i in changes) {
					var change = changes[i];
					var row = change[0];
					var prop = change[1];
					var oldVal = change[2];
					var newVal = change[3];
					if (prop == 'topYn' && oldVal != newVal) {
						internals.push({
							id: this.getDataAtRowProp(row, 'id'),
							topYn: newVal
						});
					}
				}
				if (internals.length > 0) {
					common.ajax({
						url: '/a/i/modifyTopYn',
						data: JSON.stringify(internals),
						success: function() {
							loading.hide();
							alert('更新成功！');
							internal._loadData();
						}
					});
				}
			}
		},
		_itinerarySaveCell: function(changes, source) {
			if (changes) {
				var _internalId = this.getDataAtRowProp(0, 'internalId');
				var csConditions = [];
				var itinerarys = [];
				for (var i in changes) {
					var change = changes[i];
					var row = change[0];
					var prop = change[1];
					var oldVal = change[2];
					var newVal = change[3];
					var _itineraryId = this.getDataAtRowProp(row, 'itineraryId');
					if (prop == 'itineraryDate' && oldVal != newVal) {
						itinerarys.push({
							itineraryId: _itineraryId,
							itineraryDate: newVal
						});
					}
					if (prop == 'itineraryContent' && oldVal != newVal) {
						itinerarys.push({
							itineraryId: _itineraryId,
							itineraryContent: newVal
						});
					}
					if (prop == 'itineraryDining' && oldVal != newVal) {
						itinerarys.push({
							itineraryId: _itineraryId,
							itineraryDining: newVal
						});
					}
					if (prop == 'itineraryLodgment' && oldVal != newVal) {
						itinerarys.push({
							itineraryId: _itineraryId,
							itineraryLodgment: newVal
						});
					}
				}
				if (itinerarys.length > 0) {
					common.ajax({
						url: '/a/i/i/modifyItinerary',
						data: JSON.stringify(itinerarys),
						success: function() {
							loading.hide();
							internal._loadItineraryData(_internalId);
						}
					});
				}
			}
		},
		_loadData : function() {
			var _this = this;
			common.ajax({
				url: '/a/i/list',
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
		_loadItineraryData : function(internalId) {
			var _this = this;
			common.ajax({
				url: '/a/i/i/list/' + internalId,
				type: 'get',
				dataType: 'json',
				success: function(data) {
					loading.hide();
					_this._itineraryHandsontable.loadData(data);
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