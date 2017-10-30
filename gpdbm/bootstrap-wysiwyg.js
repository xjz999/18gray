/* http://github.com/mindmup/bootstrap-wysiwyg */
/*global jQuery, $, FileReader*/
/*jslint browser:true*/
(function ($) {
	var myUserOptions;
	'use strict';
	var readFileIntoDataUrl = function (fileInfo) {
		var loader = $.Deferred(),
			fReader = new FileReader();
		fReader.onload = function (e) {
			loader.resolve(e.target.result);
		};
		fReader.onerror = loader.reject;
		fReader.onprogress = loader.notify;
		fReader.readAsDataURL(fileInfo);
		return loader.promise();
	};
	var uploadFileToServer = function(id, action, options,callback) {
		$.ajaxFileUpload({
			url : action,
			secureurl : false,
			fileElementId : id,
			data : {modeltype:6},
			dataType : 'json',
			success : function(obj) {
				if (obj.filename) {
					callback("/"+obj.filename);
					$.fn.wysiwyg(myUserOptions);
				} else
					options.fileUploadError("server-internal-exception",
							obj.message);
			},
			error : function() {
				options.fileUploadErroe("upload-failure", "");
			}
		});
	}
		
	$.fn.cleanHtml = function () {
		var html = $(this).html();
		return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, '');
	};
	$.fn.wysiwyg = function (userOptions) {
		myUserOptions = userOptions;
		var editor = this,
			selectedRange,
			options,
			toolbarBtnSelector,
			updateToolbar = function () {
				if (options.activeToolbarClass) {
					$(options.toolbarSelector).find(toolbarBtnSelector).each(function () {
						var command = $(this).data(options.commandRole);
						if (document.queryCommandState(command)) {
							$(this).addClass(options.activeToolbarClass);
						} else {
							$(this).removeClass(options.activeToolbarClass);
						}
					});
				}
			},
			execCommand = function (commandWithArgs, valueArg) {
				var commandArr = commandWithArgs.split(' '),
					command = commandArr.shift(),
					args = commandArr.join(' ') + (valueArg || '');
				document.execCommand(command, 0, args);
				updateToolbar();
				var fontElements = document.getElementsByTagName("font");
				if (fontElements && fontElements.length && fontElements.length > 0){
					for (var i = 0; i < fontElements.length; i++) {
				        switch (fontElements[i].size) {
					        	case "1":fontElements[i].style.fontSize = "20px";
					        		fontElements[i].style.lineHeight = "30px";
					        	break;
					        	case "2":fontElements[i].style.fontSize = "18px";
					        		fontElements[i].style.lineHeight = "29px";
					        	break;
				        		case "3":fontElements[i].style.fontSize = "16px";
				        			fontElements[i].style.lineHeight = "27px";
				        		break;
				        		case "4":fontElements[i].style.fontSize = "15px";
				        			fontElements[i].style.lineHeight = "26px";
				        		break;
				        		case "5":fontElements[i].style.fontSize = "14px";
				        			fontElements[i].style.lineHeight = "24px";
				        		break;
				        		case "6":
				        			fontElements[i].style.fontSize = "13px";
				        			fontElements[i].style.lineHeight = "23px";
				        		break;
				        		case "7":fontElements[i].style.fontSize = "12px";
				        			fontElements[i].style.lineHeight = "21px";
				        		break;
				        }
				        fontElements[i].removeAttribute("size");
				    }	
				}
			},
			bindHotkeys = function (hotKeys) {
				$.each(hotKeys, function (hotkey, command) {
					editor.keydown(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault();
							e.stopPropagation();
							execCommand(command);
						}
					}).keyup(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault();
							e.stopPropagation();
						}
					});
				});
			},
			getCurrentRange = function () {
				var sel = window.getSelection();
				if (sel.getRangeAt && sel.rangeCount) {
					return sel.getRangeAt(0);
				}
			},
			saveSelection = function () {
				selectedRange = getCurrentRange();
			},
			restoreSelection = function () {
				var selection = window.getSelection();
				if (selectedRange) {
					try {
						selection.removeAllRanges();
					} catch (ex) {
						document.body.createTextRange().select();
						document.selection.empty();
					}

					selection.addRange(selectedRange);
				}
			},
			//insertFiles = function (files) {
			insertFiles = function (files,id, action){
				editor.focus();
				$.each(files, function (idx, fileInfo) {
					if (/^image\//.test(fileInfo.type)) {
//						$.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
//							execCommand('insertimage', dataUrl);
//						}).fail(function (e) {
//							options.fileUploadError("file-reader", e);
//						});
						uploadFileToServer(id, action, options,function(src) {
							var imgSrc=imgReqPath+src;
//							imgSrc.height='100px';
// 							imgSrc.width='50px';
							execCommand('insertimage', imgSrc);
							$("#editor img").each(function(){
								$(this).on("load",function(){
									$(this).css("marginTop","5px");
									$(this).css("marginBottom","5px");
									$(this).css("marginLeft","calc(50% - "+ ($(this).width()/2).toString() +"px)");
								});
//								$(this).wrap("<div style='width:100%;paddingTop:5px;paddingBottom:5px; text-align:center;'><div>");
								
								$(this).on("dblclick",function(e){
									var wh = window.prompt("请输入将要修改的宽和高，请注意只需修改数字部分即可。","宽:"+this.width+",高:"+this.height);
									if (!wh)return;
									wh = wh.replace("宽:","").replace("高:","").replace("，",",");
									var arr = wh.split(",");
									try{
										var ww = parseInt(arr[0]);
										var hh = parseInt(arr[1]);
										if (ww < 10 || ww > 1500){
											alert("您输入的数字有误，必须在10与1500之间");
											return;
										}
										if (hh < 10 || hh > 1500){
											alert("您输入的数字有误，必须在10与1500之间");
											return;
										}
									}catch(err){
										alert("您输入的数字有误，请稍后再试");
										return;
									}
									$(this).css("width",arr[0]+"px");
									$(this).css("height",arr[1]+"px");
									$(this).css("marginLeft","calc(50% - "+ ($(this).width()/2).toString() +"px)");
//									$(this).style.marginLeft = "calc(50% - "+ $(this).width() +"px)";
								});
								
							}); 
						});
					} else {
						options.fileUploadError("unsupported-file-type", fileInfo.type);
					}
				});
			},
			markSelection = function (input, color) {
				restoreSelection();
				if (document.queryCommandSupported('hiliteColor')) {
					document.execCommand('hiliteColor', 0, color || 'transparent');
				}
				saveSelection();
				input.data(options.selectionMarker, color);
			},
			bindToolbar = function (toolbar, options) {
				toolbar.find(toolbarBtnSelector).click(function () {
					restoreSelection();
					editor.focus();
					execCommand($(this).data(options.commandRole));
					saveSelection();
				});
				toolbar.find('[data-toggle=dropdown]').click(restoreSelection);

				toolbar.find('input[type=text][data-' + options.commandRole + ']').on('webkitspeechchange change', function () {
					var newValue = this.value; /* ugly but prevents fake double-calls due to selection restoration */
					this.value = '';
					restoreSelection();
					if (newValue) {
						editor.focus();
						execCommand($(this).data(options.commandRole), newValue);
					}
					saveSelection();
				}).on('focus', function () {
					var input = $(this);
					if (!input.data(options.selectionMarker)) {
						markSelection(input, options.selectionColor);
						input.focus();
					}
				}).on('blur', function () {
					var input = $(this);
					if (input.data(options.selectionMarker)) {
						markSelection(input, false);
					}
				});
				toolbar.find('input[type=file][data-' + options.commandRole + ']').change(function () {
					restoreSelection();
					if (this.type === 'file' && this.files && this.files.length > 0) {
						//insertFiles(this.files);
						insertFiles(this.files, $(this).attr('id'),$(this).attr('action'));
					}
					saveSelection();
					this.value = '';
				});
			},
			initFileDrops = function () {
				editor.on('dragenter dragover', false)
					.on('drop', function (e) {
						var dataTransfer = e.originalEvent.dataTransfer;
						e.stopPropagation();
						e.preventDefault();
						if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
							insertFiles(dataTransfer.files);
						}
					});
			};
		options = $.extend({}, $.fn.wysiwyg.defaults, userOptions);
		toolbarBtnSelector = 'a[data-' + options.commandRole + '],button[data-' + options.commandRole + '],input[type=button][data-' + options.commandRole + ']';
		bindHotkeys(options.hotKeys);
		if (options.dragAndDropImages) {
			initFileDrops();
		}
		bindToolbar($(options.toolbarSelector), options);
		editor.attr('contenteditable', true)
			.on('mouseup keyup mouseout', function () {
				saveSelection();
				updateToolbar();
			});
		$(window).bind('touchend', function (e) {
			var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
				currentRange = getCurrentRange(),
				clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
			if (!clear || isInside) {
				saveSelection();
				updateToolbar();
			}
		});
		return this;
	};
	$.fn.wysiwyg.defaults = {
		hotKeys: {
			'ctrl+b meta+b': 'bold',
			'ctrl+i meta+i': 'italic',
			'ctrl+u meta+u': 'underline',
			'ctrl+z meta+z': 'undo',
			'ctrl+y meta+y meta+shift+z': 'redo',
			'ctrl+l meta+l': 'justifyleft',
			'ctrl+r meta+r': 'justifyright',
			'ctrl+e meta+e': 'justifycenter',
			'ctrl+j meta+j': 'justifyfull',
			'shift+tab': 'outdent',
			'tab': 'indent'
		},
		toolbarSelector: '[data-role=editor-toolbar]',
		commandRole: 'edit',
		activeToolbarClass: 'btn-info',
		selectionMarker: 'edit-focus-marker',
		selectionColor: 'darkgrey',
		dragAndDropImages: true,
		fileUploadError: function (reason, detail) { console.log("File upload error", reason, detail); }
	};
}(window.jQuery));
