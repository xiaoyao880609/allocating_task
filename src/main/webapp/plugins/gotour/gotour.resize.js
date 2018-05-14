var getAvailableColWidths = function(colWidths, availableWidth) {
	// summary fixedColWitdh.
	var fixedColWidth = 0;
	for (var i in colWidths) {
		var colWidth = colWidths[i];
		if (colWidth.match('px')) {
			fixedColWidth += parseInt(colWidth.replace(/(\d+)px/, '$1'));
		} else if (colWidth.match('%')) {
			// TODO nothing.
		} else {
			fixedColWidth += parseInt(colWidth);
		}
	}
	var availableColWidth = availableWidth - 16 - fixedColWidth;
	// set availableColWidths.
	var availableColWidths = [];
	for (var i in colWidths) {
		var colWidth = colWidths[i];
		if (colWidth.match('px')) {
			availableColWidths.push(parseInt(colWidth.replace(/(\d+)px/, '$1')));
		} else if (colWidth.match('%')) {
			availableColWidths.push(Math.floor(availableColWidth * parseInt(colWidth.replace(/(\d+)%/, '$1')) / 100));
		} else {
			availableColWidths.push(colWidth);
		}
	}
	var width = 0;
	for (var i in availableColWidths) {
		width += availableColWidths[i];
	}
	return availableColWidths;
}
var resizeHandsontable = function() {
	// 只对当前激活的TabPane进行Resize.
	$('#tabPanes .tab-pane.active').each(function(i, tabPane) {
		if ($(tabPane).find('.ui-layout-container').length > 0) {
			// layout画面
			var layout = $(tabPane).find('.ui-layout-container');
			layout.find('.handsontable').each(function(i, ht) {
				// 同一メールアドレス問い合わせ履歴
				if ($(ht).attr('id') == 'sameInquiryHistData') {
					var offset = $(ht).offset();
					var availableWidth = layout.width() - offset.left + layout.scrollLeft();
					var availableHeight = 140;
					// 同一メールアドレス問い合わせ履歴 百分比宽度设置
					var colWidths = ['60px','110px','70%','60px','60px','60px','10%','10%','10%','50px'];
					var availableColWidths = getAvailableColWidths(colWidths, availableWidth);
					$(ht).handsontable({width:availableWidth,height:availableHeight,colWidths:availableColWidths});
					$(ht).handsontable('render');
				}
			});
		} else {
			$(tabPane).find('.panel>.handsontable').each(function(i, ht) {
				var offset = $(ht).offset();
				var availableWidth = $(ht).parents('.panel').width() - offset.left + $(ht).parents('.panel').scrollLeft() + 16;
				var availableHeight = $(window).height() - offset.top + $(window).scrollTop() - 60 - 15;
				var colWidths = [];
				if ($(ht).attr('id') == 'categoryHt') {
					colWidths = ['30px','15%','50%','15%','20%'];
				}
				if ($(ht).attr('id') == 'localHt') {
					colWidths = ['30px','30px','225px','45%','10%','10%','20%','5%','10%'];
				}
				if ($(ht).attr('id') == 'internalHt') {
					colWidths = ['30px','30px','225px','40%','20%','10%','15%','5%','10%'];
				}
				if ($(ht).attr('id') == 'itineraryHt') {
					colWidths = ['10%','35%','10%','10%','10%','15%','10%'];
				}
				if ($(ht).attr('id') == 'outdoorHt') {
					colWidths = ['30px','30px','225px','45%','20%','20%','5%','10%'];
				}
				if ($(ht).attr('id') == 'attractionsHt') {
					colWidths = ['30px','30px','225px','45%','20%','10%','15%','10%'];
				}
				if ($(ht).attr('id') == 'trainingHt') {
					colWidths = ['30px','30px','225px','45%','10%','10%','20%','5%','10%'];
				}
				if (colWidths.length > 0) {
					var availableColWidths = getAvailableColWidths(colWidths, availableWidth);
					$(ht).handsontable({width:availableWidth,colWidths:availableColWidths});
					$(ht).handsontable('render');
				}
			});
		}
	});
}
var resizeLayout = function() {
	// 只对当前激活的TabPane进行Resize.
	$('#tabPanes .tab-pane.active').each(function(i, tabPane) {
		if ($(tabPane).find('.ui-layout-container').length > 0) {
			// layout画面
			var layout = $(tabPane).find('.ui-layout-container');
			var offset = layout.find('.ui-layout-center').offset();
			var availableWidth = layout.width() - offset.left + layout.scrollLeft();
			var availableHeight = layout.find('.ui-layout-center>.row').height();
			layout.find('.ui-layout-center').width(availableWidth);
			layout.height(availableHeight);
		}
	});
}
var resize = function() {
	//resizeHandsontable();
	//resizeLayout();
	setTimeout('resizeHandsontable()', 500);
	setTimeout('resizeLayout()', 500);
}