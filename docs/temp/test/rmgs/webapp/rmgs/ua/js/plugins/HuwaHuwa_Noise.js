//=============================================================================
// HuwaHuwa_Noise ver 1.6
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 文字を登場時だけゆらします
 * @author 白金　隅
 * @help オンオフするタイプのもじゆらゆら
 * ■プラグインコマンド
 * HuwaHuwa_Noise noiseOn    # 文字揺れ開始します（デフォルト）
 * HuwaHuwa_Noise noiseOff   # 文字揺れを停止します
 *
 * @command noiseOn
 * @text 文字揺れ開始
 * @desc 文字揺れ開始します
 *
 * @command noiseOff
 * @text 文字揺れを停止
 * @desc 文字揺れを停止します
 */

(function () {
	const pluginName = "HuwaHuwa_Noise";
	var params = PluginManager.parameters(pluginName);

	var _enableNoise = false;

	PluginManager.registerCommand(pluginName, "noiseOn", function (args) {
		_enableNoise = true;
	});

	PluginManager.registerCommand(pluginName, "noiseOff", function (args) {
		_enableNoise = false;
	});

	//-----------------------------------------------------------------------------
	// Window_Message
	//-----------------------------------------------------------------------------

	var _Window_Message_initialize = Window_Message.prototype.initialize;
	Window_Message.prototype.initialize = function (x, y, width, height) {
		_Window_Message_initialize.call(this, x, y, width, height);
		this._textShaking = [0, 0, 0, 0];
		this._shakingSprites = [];
		this._ziwaSprites = [];
		this._ziwaSpritesRandomArray = [];
		this._fastShakeInterval = 0;
		this.isActiveNoise = false;
		this.isActiveZiwa = false;
		this.nextNoiseCount = 1000;
		this.nextZiwaCount = 1000;
		this.noiseWordNum = 1;
		this.ziwaWordNum = 2;
		this.enableGlitch = false;
		this.NoiseMode = 0;//0のときオフ1以上で文字揺れ
		this.ZiwaMode = 0;//文字揺れと一緒の書き方　ジワだし
		this.ziwaPause = false;
	};

	//
	// initialize variables
	//
	const _Window_Message_initMembers = Window_Message.prototype.initMembers;
	Window_Message.prototype.initMembers = function () {
		_Window_Message_initMembers.call(this);
		//this.NoiseMode = 0;
	};

	const _Window_Message_processEscapeCharacter =
		Window_Message.prototype.processEscapeCharacter;
	Window_Message.prototype.processEscapeCharacter = function (code, textState) {
		switch (code) {
			case 'Y':
				this.NoiseMode = this.obtainEscapeParam(textState);
				break;
			case 'Z':
				this.ZiwaMode = this.obtainEscapeParam(textState);
				break;
			case '!':
				this.startPause();
				this.ziwaPause = true;
				//console.log("aaaaaaaaa")
				break;
			default:
				_Window_Message_processEscapeCharacter.call(this, code, textState);
				break;
		}
	};

	Window_Message.prototype.updateInput = function () {
		if (this.isAnySubWindowActive()) {
			return true;
		}
		if (this.pause) {
			if (this.isTriggered()) {
				Input.update();
				this.pause = false;
				this.ziwaPause = false;
				//this.initZiwaAnimation();
				if (!this._textState) {
					this.terminateMessage();
				}
			}
			return true;
		}
		return false;
	};

	var _Window_Message_processCharacter = Window_Message.prototype.processCharacter;
	Window_Message.prototype.processCharacter = function (textState) {
		if (this.NoiseMode > 0 || this.ZiwaMode >0) {
			var c = textState.text[textState.index++];
			if (c === "\n") {
				this.processNewLine(textState);
			}
			if (c === "\x1b") {
				const code = this.obtainEscapeCode(textState);
				this.processEscapeCharacter(code, textState);
				return;
			}
			//var c = textState.text[textState.index++];
			var w = this.textWidth(c);
			var h = textState.height;
			var isY = false;
			var isZ = false;
			if (this.NoiseMode > 0) {
				isY = true;
			}
			if (this.ZiwaMode) {
				isZ = true;
			}
			//console.log("call createShakingCharacter")
			this.createShakingCharacter(textState, c, w, h, isY, isZ);
			textState.x += w;
		} else {
			_Window_Message_processCharacter.call(this, textState);
		}
	};

	//var _Window_Message_processCharacter = Window_Message.prototype.processCharacter;
	//Window_Message.prototype.processCharacter = function (textState) {
	//	var c = textState.text[textState.index++];
	//	if (c === "\n") {
	//		this.processNewLine(textState);
	//	}
	//	else if (c === "\x1b" || c.charCodeAt(0) < 0x20) {
	//	_Window_Message_processCharacter.call(this, textState);
	//	}
	//	else {
	//		if (this.isShakingActive()) {
	//			//if (Imported.YEP_MessageCore && this.checkWordWrap(textState)) {
	//			//	return this.processNewLine(textState);
	//			//}
	//			var c = textState.text[textState.index++];
	//			var w = this.textWidth(c);
	//			var h = textState.height;
	//			this.createShakingCharacter(textState, c, w, h);
	//			textState.x += w;
	//		}
	//	}
	//};

	//Window_Message.prototype.isShakingActive = function () {
	//	if (!_enableNoise) {
	//		return false;
	//	}
	//	return true;
	//};

	//var _Window_Message_obtainEscapeCode = Window_Message.prototype.obtainEscapeCode;
	//Window_Message.prototype.obtainEscapeCode = function (textState) {
	//	var shake = (Imported.YEP_MessageCore) ? !this._checkWordWrapMode : true;
	//	textState.index++;
	//	if (textState.text.slice(textState.index, textState.index + 5).match(/shake/i)) {
	//		textState.index += 5;
	//		return (shake) ? "SHAKE" : "";
	//	} else if (textState.text.slice(textState.index, textState.index + 4).match(/wave/i)) {
	//		textState.index += 4;
	//		return (shake) ? "WAVE" : "";
	//	} else if (textState.text.slice(textState.index, textState.index + 5).match(/slide/i)) {
	//		textState.index += 5;
	//		return (shake) ? "SLIDE" : "";
	//	} else if (textState.text.slice(textState.index, textState.index + 6).match(/circle/i)) {
	//		textState.index += 6;
	//		return (shake) ? "CIRCLE" : "";
	//	} else if (textState.text.slice(textState.index, textState.index + 10).match(/resetshake/i)) {
	//		textState.index += 10;
	//		return (shake) ? "RESETSHAKE" : "";
	//	} else {
	//		textState.index--;
	//		return _Window_Message_obtainEscapeCode.call(this, textState);
	//	}
	//};

	Window_Message.prototype.createShakingCharacter = function (textState, _ch, _width, _height, isNoise, isZiwa) {

		var sprite = new Sprite_Shake(new Bitmap(_width, _height));
		sprite.bitmap.textColor = this.contents.textColor;
		sprite.bitmap.paintOpacity = this.contents.paintOpacity;
		sprite.bitmap.fontSize = this.contents.fontSize;
		sprite.bitmap.fontFace = this.contents.fontFace;
		sprite.bitmap.drawText(_ch, 0, 0, _width, _height);
		//sprite.bitmap.clearRect(0, _height / 2, _width, _height / 2);//上半分クリア
		//sprite.bitmap.clearRect(0, 0, _width,_height);//下半分クリア
		sprite.x = textState.x + $gameSystem.windowPadding();
		sprite.y = textState.y + $gameSystem.windowPadding();
		sprite._xBase = sprite.x;
		sprite._yBase = sprite.y;
		this.addChild(sprite);
		if (isNoise == true) {
			this._shakingSprites.push(sprite);
		}
		if (isZiwa == true) {
			sprite.initZiwa();
			this._ziwaSprites.push(sprite);
			this._ziwaSpritesRandomArray.push(this._ziwaSprites.length - 1);
			this._showFast = true;
		}

		//var sprite_2 = new Sprite_Shake(new Bitmap(_width, _height));
		//sprite_2.bitmap.textColor = this.contents.textColor;
		//sprite_2.bitmap.paintOpacity = this.contents.paintOpacity;
		//sprite_2.bitmap.fontSize = this.contents.fontSize;
		//sprite_2.bitmap.fontFace = this.contents.fontFace;
		//sprite_2.bitmap.drawText(_ch, 0, 0, _width, _height);
		//sprite_2.bitmap.clearRect(0, 0, _width, _height / 2);//下半分クリア
		//sprite_2.x = textState.x + $gameSystem.windowPadding() ;
		//sprite_2.y = textState.y + $gameSystem.windowPadding() ;
		//sprite_2._xBase = sprite.x;
		//sprite_2._yBase = sprite.y;
		//this.addChild(sprite_2);
		//this._shakingSprites.push(sprite_2);

		if (this._showFast || this._lineShowFast) {
			for (var i = 0; i < this._fastShakeInterval; i++) {
				sprite.update();
			}
			this._fastShakeInterval += 2;
		} else {
			this._fastShakeInterval = 0;
		}
	};

	Window_Message.prototype.easeInQuint = function (x) {
		return x * x * x * x * x;
	}

	Window_Message.prototype.easeInCubic = function (x) {
		return x * x * x;
	}

	Window_Message.prototype.initZiwaAnimation = function () {
		this.isActiveZiwa = true;
		//for (var i = 0; i < this._shakingSprites.length; i++) {
		//	this._shakingSprites[i].isActive = true;
		//}
		//console.log(this._ziwaSprites.length);
		//for (var i = 0; i < this._ziwaSprites.length; i++) {
			//this._ziwaSpritesRandomArray.push(i);
		//}
		this.ziwaPause = false;
		//var curLength = initLength;
		this.nextInitZiwaCount = 2;
		this.nextZiwaCount = 2;//Math.floor(Math.random() * 40);
	}

	Window_Message.prototype.resetZiwaAnimation = function () {
		var initLength = this._ziwaSprites.length;
		//console.log(initLength);
		var curLength = 0;
		if (this._ziwaSpritesRandomArray.length >0) {
			curLength = this._ziwaSpritesRandomArray.length;
		}
		//cur
		//console.log(curLength);
		var al = (curLength / initLength);
		var quint = this.easeInQuint(al);
		//this.ziwaPause = true;
		this.nextInitZiwaCount = 5 * quint;
		this.nextZiwaCount = 5 * quint;//Math.floor(Math.random() * 40);
		//this.nextInitZiwaCount = 10;
		//this.nextZiwaCount = 10;
	}

	Window_Message.prototype.initNoiseAnimation = function () {
		this.isActiveNoise = true;

		this.nextNoiseCount = 0;//Math.floor(Math.random() * 40);
	}

	Window_Message.prototype.resetNoiseAnimation = function () {
		this.nextNoiseCount = Math.floor(Math.random() * 40);
	}

	var _Window_Message_update = Window_Message.prototype.update;
	Window_Message.prototype.update = function () {
		_Window_Message_update.call(this);
		//文字にそれぞれやらせると、文字の数に比例して
		//頻度が変わってしまうので文字の揺れをまわりから管理させたい
		//文字揺れ
		if (this.isActiveNoise) {
			if (this.nextNoiseCount <= 0) {
				for (var i = 0; i < this.noiseWordNum; i++) {
					var index = Math.floor(Math.random() * this._shakingSprites.length);
					//console.log(index);
					if (this._shakingSprites.length > 0) {
						this._shakingSprites[index].startShake(8, 0.5, 0.5, 0, 7);
					}
				}
				this.resetNoiseAnimation();
			}
			else {
				this.nextNoiseCount--;
			}
		}
		//ジワだし　リセットはしない　1回きり表示
		if (this.isActiveZiwa && this._waitCount <= 0) {
			// || (this.ziwaPause && this._ziwaSpritesRandomArray.length > 0)
			if (this.nextZiwaCount <= 0) {
				for (var i = 0; i < this.ziwaWordNum; i++) {
					//console.log(this._ziwaSprites.length);
					if (this._ziwaSpritesRandomArray.length > 0) {
						var index = Math.floor(Math.random() * this._ziwaSpritesRandomArray.length);
						//console.log(index);
						var fromArrayIndex = this._ziwaSpritesRandomArray[index];
						if (this._ziwaSpritesRandomArray.length > 0) {
							//console.log("start")
							//console.log(this.nextZiwaCount)
							//console.log(this._ziwaSpritesRandomArray.length)
							this._ziwaSprites[fromArrayIndex].startZiwa(1);
							var remIndex = this._ziwaSpritesRandomArray.indexOf(fromArrayIndex);
							this._ziwaSpritesRandomArray.splice(remIndex, 1);
							this.playCharSE();
							//this._ziwaSpritesRandomArray.removeChild(this._ziwaSpritesRandomArray[index]);
						}
					}
				}
				if (!this.ziwaPause && this._ziwaSpritesRandomArray.length > 0) {
					//console.log("call this.resetZiwaAnimation")
					this.resetZiwaAnimation();
				}
			}
			else {
				//pause中だけど、まだ文字表示しきってないとき
				//if (this._ziwaSpritesRandomArray.length > 0) {
				//console.log(this.nextZiwaCount);
				this.nextZiwaCount--;
			}
			//console.log("this.length = %d", this._ziwaSprites.length);
			//console.log("this.nextZiwaCount = %f",this.nextZiwaCount);
		}
		//console.log(this._waitCount)
		//for (var i = 0; i < this._shakingSprites.length; i++) {
		//	this._shakingSprites[i].opacity = 255;
		//}
	}

	Window_Message.prototype.obtainShakingTextMZParams = function (textState) {
		var arr = /^\<.+\>/.exec(textState.text.slice(textState.index));
		if (arr) {
			textState.index += arr[0].length;
			return String(arr[0].slice(1, arr[0].length - 1));
		} else {
			return '';
		}
	};

	var _Window_Message_open = Window_Message.prototype.open;
	Window_Message.prototype.open = function () {
		_Window_Message_open.call(this);
		for (var i = 0; i < this._shakingSprites.length; i++) {
			this._shakingSprites[i].opacity = 255;
		}
		//if (this.isShakingActive()) {
		this.initNoiseAnimation();
		this.initZiwaAnimation();
		//}

		//一旦消したけどこれいる？

	};

	var _Window_Message_close = Window_Message.prototype.close;
	Window_Message.prototype.close = function () {
		_Window_Message_close.call(this);
		//これをしないと画面に文字が残る
		for (var i = 0; i < this._shakingSprites.length; i++) {
			this._shakingSprites[i].opacity = 0;
		}
		for (var i = 0; i < this._ziwaSprites.length; i++) {
			this._ziwaSprites[i].opacity = 0;
		}
		this.removeShakingSprites();//これをしないとシーンに残って重い
		this.removeZiwaSprites();
		this._shakingSprites.splice(0);
		this._ziwaSprites.splice(0);
		this._ziwaSpritesRandomArray.splice(0);
		//this._shakingSprites = null;
	};

	//文字をSceneから消す
	Window_Message.prototype.removeShakingSprites = function () {
		for (var i = 0; i < this._shakingSprites.length; i++) {
			//if (this.includes(this._shakingSprites[i])) {
				this.removeChild(this._shakingSprites[i]);
			//}
		}
	};

	//文字をSceneから消す
	Window_Message.prototype.removeZiwaSprites = function () {
		for (var i = 0; i < this._ziwaSprites.length; i++) {
			//if (this.includes(this._ziwaSprites[i])) {
				this.removeChild(this._ziwaSprites[i]);
			//}
		}
	};

	Window_Message.prototype.resetShaking = function () {
		for (var i = 0; i < this._textShaking.length; i++) {
			this._textShaking[i] = 0;
		}
	};

	//次のページに引き継がないでリセット
	var _Window_Message_newPage = Window_Message.prototype.newPage;
	Window_Message.prototype.newPage = function (textState) {
		_Window_Message_newPage.call(this, textState);
		this.removeShakingSprites();
		this.NoiseMode = 0;
		this.ZiwaMode = 0;
		//this.isActiveZiwa = false;
		this.initZiwaAnimation();
		//if (_.resetShaking) this.resetShaking();
	};

	//-----------------------------------------------------------------------------
	// Sprite_Shake
	//-----------------------------------------------------------------------------

	function Sprite_Shake() {
		this.initialize.apply(this, arguments);
	}

	Sprite_Shake.prototype = Object.create(Sprite.prototype);
	Sprite_Shake.prototype.constructor = Sprite_Shake;

	const defaultNoiseAnimTime = 3;
	const defaultNextNoiseTime = 60;

	const defaultZiwaAnimTime = 3;
	const defaultNextZiwaTime = 60;

	Sprite_Shake.prototype.initialize = function (bitmap) {
		Sprite.prototype.initialize.call(this, bitmap);
		this.reset();
		this.opacity = 255;
		//this.nextNoiseTime = Math.floor(Math.random() * 960);
		this.isActiveNoise = false;
		this._xBase = this.x;
		this._yBase = this.y;
	};

	Sprite_Shake.prototype.initZiwa = function () {
		this.opacity = 0;
		//this.nextNoiseTime = Math.floor(Math.random() * 960);
		this.isActiveZiwa = false;
		this.ziwaAnimTime = 0;
		this._xBase = this.x;
		this._yBase = this.y;
	};

	Sprite_Shake.prototype.reset = function () {
		//this.nextNoiseTime = Math.floor(Math.random() * 960) + 960;
		this.noiseAnimTime = defaultNoiseAnimTime;
	}

	//結局第二引数以降使ってない　spdとmax
	Sprite_Shake.prototype.startShake = function (time, x_spd, y_spd, x_max, y_max) {
		this.initNoiseAnimTime = time;
		this.noiseAnimTime = time;
		this.isActiveNoise = true;
		var randValue = Math.floor(Math.random() * 4);
		//縦揺れか横揺れだけを許容　確率半分
		const moveVal = 1.5;
		if (randValue == 0) {
			//x+
			this._xMax = moveVal;
			this._yMax = 0;
		}
		else if (randValue == 1) {
			//x-
			this._xMax = -1 * moveVal;//(Math.random() * 0.5 + 0.5) * 1.5;
			this._yMax = 0;
		}
		else if (randValue == 2) {
			//y+
			this._xMax = 0;
			this._yMax = moveVal;//(Math.random() * 0.5 + 0.5) * 1.5;
		}
		else if (randValue == 3) {
			//y-
			this._xMax = 0;//(Math.random() * 0.5 + 0.5) * 1.5;
			this._yMax = -1 * moveVal;
		}
	}

	Sprite_Shake.prototype.startZiwa = function (time) {
		//一回ONにしたら呼ばれないようにする
		if (this.isActiveZiwa == false) {
			this.initZiwaAnimTime = time;
			this.ziwaAnimTime = time;
		}
		this.isActiveZiwa = true;
	}

	Sprite_Shake.prototype.lerp = function (x,y,_weight) {
		return x + (y - x) * _weight;
	}

	Sprite_Shake.prototype.update = function () {
		Sprite.prototype.update.call(this);
		if (this.isActiveNoise == true) {
			this._weight = (this.noiseAnimTime / this.initNoiseAnimTime);
			this.rate = 0;
			//行って返っての1往復だけを実現するため1ループで0->1->0になるα
			//1.0～0.5
			if (this._weight <= 0.5) {
				this.rate = this._weight * 2;
			}
			//0.0～0.5
			else {
				this.rate = 2 - this._weight * 2;
			}
			//console.log(this.rate);
			//anim終了
			if (this.noiseAnimTime <= 0) {
				//this.reset();
				//this.opacity = 255;
				//this.noiseAnimTime = defaultnoiseAnimTime;
				//this.nextNoiseTime = Math.floor(Math.random() * 120) + 30;
				this.x = this._xBase;
				this.y = this._yBase;
			}
			//anim中
			else {
				//if (this.noiseAnimTime) {
				this.noiseAnimTime--;
				this.x = this._xBase + this.lerp(0, this._xMax, this.rate);
				this.y = this._yBase + this.lerp(0, this._yMax, this.rate);
				//this.x += this._xSpd;
				//this.y += this._ySpd;
				//if (Math.abs(this.x - this._xBase) > this._xMax) this._xSpd *= (-1);
				//if (Math.abs(this.y - this._yBase) > this._yMax) this._ySpd *= (-1);
				//}
			}
			//this.opacity = 255;
			//this.x = this._xBase;
			//this.y = this._yBase;
		}
		//console.log(this.isActiveZiwa)
		if (this.isActiveZiwa == true) {
			this._ziwaweight = 1 - (this.ziwaAnimTime / this.initZiwaAnimTime);//0->1
			if (this.ziwaAnimTime <= 0) {
				this.opacity = 255;
			}
			//anim中
			else {
				var _opacity = this._ziwaweight * 255;
				this.opacity = _opacity;
				this.ziwaAnimTime--;
			}
		}
	};
})();