
$(document).ready(function() {
	InitThis();
	var mousePressed = false;
	var lastX, lastY;
	var ctx;
	var canvasWidth = 557;
	var canvasHeight = 502;
	var text = "no";
	


	$('#colorpicker').farbtastic('#color');

	

	$("#brushThick").click(function() {
		
		console.log("brushThick");
	});
	$(".undo").click(function() {
		cUndo();
		console.log("undo");
	});
	$(".redo").click(function() {
		cRedo();
		console.log("redo");
	});
	$(".delete").click(function() {
		drawImage();
		console.log("delete");
	});
	$("#btnExport").click(function() {
		exportAndView();
	});

	function InitThis() {
		canvas = document.getElementById('myCanvasBot'),
    	canvasTop = document.getElementById('myCanvasTop'),
    	ctx = canvas.getContext('2d'),
    	ctxMouse = canvasTop.getContext('2d');
		$('#myCanvasTop').mousedown(function(e) {
			e.preventDefault();
			mousePressed = true;
				Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
		});

		$('#myCanvasTop').mousemove(function(e) {
			e.preventDefault();
			if (mousePressed) {
				if (text == "no") {
					Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
				}
				if (text == "si") {
				}
			}
		});

		$('#myCanvasTop').mouseup(function(e) {
			e.preventDefault();
			if (mousePressed) {
				mousePressed = false;
				cPush();
			}
		});

		$('#myCanvastop').mouseleave(function(e) {
			e.preventDefault();
			if (mousePressed) {
				mousePressed = false;
				cPush();

			}
		});
		drawImage();
		drawOutline();
	}

	function drawImage() {
		var image = new Image();
		image.src = 'img/bg.png';
		$(image).load(function() {
			ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
			cPush();
		});
	}

	function drawOutline(){
		var outlineImage = new Image();
		outlineImage.src = 'img/pobarvanka-image.png';
		console.log('outline');
		$(outlineImage).load(function(){
			ctxMouse.drawImage(outlineImage, 15, 70, 521, 352);
		});
	}

	function Draw(x, y, isDown) {
		if (isDown) {
			ctx.beginPath();
			ctx.strokeStyle = curColor;
			ctx.lineWidth = $('#brushThick').val();
			ctx.lineJoin = "round";
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(x, y);
			ctx.closePath();
			ctx.stroke();
		}
		lastX = x;
		lastY = y;
	}

	var cPushArray = new Array();
	var cStep = -1;

	function cPush() {
		cStep++;
		if (cStep < cPushArray.length) {
			cPushArray.length = cStep;
		}
		cPushArray.push(document.getElementById('myCanvasBot').toDataURL());
		document.title = cStep + ":" + cPushArray.length;
	}

	function cUndo() {
		if (cStep > 0) {
			cStep--;
			var canvasPic = new Image();
			canvasPic.src = cPushArray[cStep];
			canvasPic.onload = function() {
				ctx.drawImage(canvasPic, 0, 0);
			}
			document.title = cStep + ":" + cPushArray.length;
		}
	}

	function cRedo() {
		if (cStep < cPushArray.length - 1) {
			cStep++;
			var canvasPic = new Image();
			canvasPic.src = cPushArray[cStep];
			canvasPic.onload = function() {
				ctx.drawImage(canvasPic, 0, 0);
			}
			document.title = cStep + ":" + cPushArray.length;
		}
	}

	function exportAndView()  {
		$("#final").empty();
		var outlineImageBot = new Image();
		outlineImageBot.src = 'img/pobarvanka-image.png';
		console.log('outline canvasBot');
		ctx.drawImage(outlineImageBot, 15, 70, 521, 352);
		var canvasDiv = document.getElementById('myCanvasBot');
		var screenshot = Canvas2Image.saveAsPNG(canvasDiv, true);
		console.log(screenshot);
		var win = window.open();
		$(win.document.body).append(screenshot);
	}


});
