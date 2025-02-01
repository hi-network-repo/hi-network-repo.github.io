//=============================================================================
// HuwaHuwa_TittleCommands.js 白金隅　改変
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc (v1.3) タイトルメニューのコマンドを画像で表示します
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_TitleCommands.js
 *
 * @param -> Main <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> コマンド全般 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param Animation Mode
 * @text アニメーション設定
 * @desc アニメーション形式を選択
 * 0:なし / 1:波打ち / 2:振動
 * @default 1
 * @type select
 * @option なし
 * @value 0
 * @option 波打ち
 * @value 1
 * @option 振動
 * @value 2
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Left & Right Input
 * @text 右左キーコマンド選択
 * @desc 右/左キーでのコマンド選択の有効設定
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Shake Duration
 * @text コマンドのフェードイン時間
 * @desc コマンドがフェードイン完了するまでの時間
 * @default 30
 * @type number
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Slide X-Axis
 * @text X軸スライド
 * @desc コマンドを水平方向にスライドさせる量
 * @default -100
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Slide Y-Axis
 * @text Y軸スライド
 * @desc コマンドを垂直方向にスライドさせる量
 * @default 0
 * @parent -> Main <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> カーソル <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param Cursor X-Axis
 * @text X-Axis
 * @desc Definição X-axis do cursor.
 * @default 0
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Y-Axis
 * @text Y-Axis
 * @desc Definição Y-axis do cursor.
 * @default 5
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Visible
 * @text カーソル有効化
 * @desc カーソルの有効設定
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Wave Animation
 * @text 波打ちアニメ有効化
 * @desc 波打ちアニメーションの有効設定
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Rotation Animation
 * @text 回転アニメ有効化
 * @desc 回転アニメーションを有効にします。
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Cursor Rotation Speed
 * @text 回転アニメ速度
 * @desc 正:時計回り / 負:反時計回り。絶対値が大きいほど高速。
 * @default 0.05
 * @parent -> Cursor <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 * @text コマンド位置
 * @desc
 *
 * @param Command Pos 1
 * @desc コマンド1の座標
 * 書式: 32,32
 * @default 180,440
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 2
 * @desc コマンド2の座標
 * 書式: 32,32
 * @default 350,440
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 3
 * @desc コマンド3の座標
 * 書式: 32,32
 * @default 520,440
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 4
 * @desc コマンド4の座標
 * 書式: 32,32
 * @default 690,440
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 5
 * @desc コマンド5の座標
 * 書式: 32,32
 * @default 345,498
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 6
 * @desc コマンド6の座標
 * 書式: 32,32
 * @default 345,530
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 7
 * @desc コマンド7の座標
 * 書式: 32,32
 * @default 0,192
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 8
 * @desc コマンド8の座標
 * 書式: 32,32
 * @default 0,224
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 9
 * @desc コマンド9の座標
 * 書式: 32,32
 * @default 0,256
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Pos 10
 * @desc コマンド10の座標
 * 書式: 32,32
 * @default 0,288
 * @parent -> Commands <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param mapId
 * @text マップＩＤ
 * @desc タイトル画面として使用するマップのＩＤ
 * @type number
 * @min 1
 * @default 1
 *
 * @param startX
 * @text 開始Ｘ座標
 * @desc 開始時のＸ座標です。
 * 空欄なら自動でマップ中央に配置されます。
 * @type number
 * @min 0
 * @max 255
 *
 * @param startY
 * @text 開始Ｙ座標
 * @desc 開始時のＹ座標です。
 * 空欄なら自動でマップ中央に配置されます。
 * @type number
 * @min 0
 * @max 255
 * 
 * @param inputWait
 * @text 入力できないウェイト
 * @desc 入力できないウェイト
 * @type number
 * @min 0
 * @default 0
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ============================================================================
 * +++ MOG - Title Picture Commands (v1.3) +++
 * By Moghunter
 * https://mogplugins.wordpress.com
 * ============================================================================
 * タイトルウィンドウの代わりに画像でコマンドを表示します。
 * 下記のような画像ファイルがコマンドの数だけ必要です。
 *
 * Command_0.png, Command_1.png, Command_2.png , Command_3.png ...
 *
 * 必要な画像は下記のフォルダに保存してください。
 *
 * img/titles2/
 *
 * ============================================================================
 * ”カーソル”を有効にする場合、下記画像ファイルが必要です。
 *
 * Cursor.png
 *
 * ============================================================================
 * * 更新履歴
 * ============================================================================
 * (v1.3) - エンコーディングに関連するソート機能を修正しました。
 * (v1.2) - シーントランジション(フェード)でのコマンド選択の修正。
 * (v1.1) - デフォルトウィンドウを高解像度で表示するように修正。
 */
//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
    var Imported = Imported || {};
    Imported.MOG_TitleCommands = true;
	var Moghunter = Moghunter || {};
	const parameters = PluginManager.parameters('HuwaHuwa_TitleCommands');

	Moghunter.parameters = PluginManager.parameters('HuwaHuwa_TitleCommands');
	Moghunter.title_comMode = Number(Moghunter.parameters['Animation Mode'] || 2);
    Moghunter.title_shakeDuration = Number(Moghunter.parameters['Shake Duration'] || 30);
	
	Moghunter.title_slideXaxis = Number(Moghunter.parameters['Slide X-Axis'] || -100);
	Moghunter.title_slideYaxis = Number(Moghunter.parameters['Slide Y-Axis'] || 0);	
	Moghunter.title_sideInput = String(Moghunter.parameters['Left & Right Input'] || "true");

	Moghunter.title_cursorVisible = String(Moghunter.parameters['Cursor Visible'] || "true");
	Moghunter.title_cursorSlide = String(Moghunter.parameters['Cursor Wave Animation'] || "true");
	Moghunter.title_cursorX = Number(Moghunter.parameters['Cursor X-Axis'] || 8);
	Moghunter.title_cursorY = Number(Moghunter.parameters['Cursor Y-Axis'] || -10);	
	Moghunter.title_cursorRot = String(Moghunter.parameters['Cursor Rotation Animation'] || "true");
	Moghunter.title_cursorRotSpeed = Number(Moghunter.parameters['Cursor Rotation Speed'] || 0.05);

	parameters.mapId = Number(parameters.mapId) || 1;
	parameters.startX = Number(parameters.startX) || null; // ADD T.Sunagawa
	parameters.startY = Number(parameters.startY) || null; // ADD T.Sunagawa
	parameters.inputWait = Number(parameters['inputWait']) || 0;
	
	Moghunter.title_com_pos = [];
	for (var i = 0; i < 10; i++) {
		Moghunter.title_com_pos[i] = (Moghunter.parameters['Command Pos ' + String(i + 1)] || null);
	};	

//=============================================================================
// ■■■ Scene Title  ■■■
//=============================================================================

////==============================
//// ♦ ALIAS ♦  Create
////==============================
//var _mog_titleCom_ccreate = Scene_Title.prototype.create;
//Scene_Title.prototype.create = function() {
//	_mog_titleCom_ccreate.call(this);
//	if (this._titleField3) {this._titleField3.children.sort((a, b) => a.z - b.z)}
//};

////================================
//// ♦ ALIAS ♦  createCommandWindow
////================================
//var _mog_titleCom_createCommandWindow = Scene_Title.prototype.createCommandWindow;
//Scene_Title.prototype.createCommandWindow = function() {
//	_mog_titleCom_createCommandWindow.call(this);
//	if (!this._titleField3) {this.createTitleField3()};
//	this.createTitlePictureCommands();
//	this._sideInput = String(Moghunter.title_sideInput) == "true" ? true : false;
//	if (String(Moghunter.title_cursorVisible) == "true") {this.createCursorCommand()};
//};

////================================
//// ♦ ALIAS ♦  update
////================================
//var _mog_titleCom_scnTittle_update = Scene_Title.prototype.update;
//Scene_Title.prototype.update = function() {
//	_mog_titleCom_scnTittle_update.call(this);
//    this.updatePicCommands();
//};

const Scene_Title_old = Scene_Title;
Scene_Title = class Scene_TitleMap extends Scene_Map {
	create() {
		this._inputWait = parameters.inputWait;
		Scene_Base.prototype.create.call(this);
		DataManager.loadMapData(parameters.mapId);
		this.createCommandWindow();
		// Scene_Map will create its own window layer later on.
		this.removeChild(this._windowLayer);

		// Needed to avoid player character from appearing on TitleMap when
		// player returns to Title.
		DataManager.setupNewGame();

		// ADD T.Sunagawa
		// 場所移動中のままになっているのでクリア
		$gamePlayer.clearTransferInfo();

		//if (this._titleField3) { this._titleField3.children.sort((a, b) => a.z - b.z) }
	}

	createCommandWindow() {
		// Copy all commands from Scene_Title. This is compatible with
		// Plugins that add their own command to Scene_Title.
		const commands = Object.keys(Scene_Title_old.prototype)
			.filter(property => property.startsWith("command"));
		for (const command of commands) {
			Scene_TitleMap.prototype[command] = Scene_Title_old.prototype[command];
		}

		this.createWindowLayer();
		Scene_Title_old.prototype.createCommandWindow.call(this);
		if (!this._titleField3) {this.createTitleField3()};
		//this.createTitlePictureCommands();
		//this._sideInput = String(Moghunter.title_sideInput) == "true" ? true : false;
		//if (String(Moghunter.title_cursorVisible) == "true") {this.createCursorCommand()};
	}

	createAllWindows() {
		super.createAllWindows();
		this.addWindow(this._commandWindow);
		this._commandWindow.open();
	}

	drawGameTitle() {
		Scene_Title_old.prototype.drawGameTitle.call(this);
	}

	onMapLoaded() {
		$gameMap.setup(parameters.mapId);
		$dataMap.autoplayBgm = false; // Use Title Scene BGM instead.
		$gameMap.autoplay();

		// ADD T.Sunagawa
		// 開始位置を設定
		if (parameters.startX != null) {
			$gamePlayer.center(parameters.startX, parameters.startY);
		} else {
			$gamePlayer.center($gameMap.width() / 2, $gameMap.height() / 2);
		}

		super.onMapLoaded();
		Scene_Title_old.prototype.createForeground.call(this);
		this.createTitlePictureCommands();
		this._sideInput = String(Moghunter.title_sideInput) == "true" ? true : false;
		if (String(Moghunter.title_cursorVisible) == "true") { this.createCursorCommand() };
	}

	start() {
		super.start();
		Scene_Title_old.prototype.playTitleMusic();
	}

	stop() {
		console.log("adsadas")
		Scene_Base.prototype.stop.call(this);
	}

	needsFadeIn() {
		return true;
	}

	fadeOutAll() {
		// ADD T.Sunagawa
		// フェードアウト前に画面キャプチャをかぶせる
		// ※フェード中に画面が乱れるので、それを防ぐための措置。
		SceneManager.snapForBackground();
		this._backgroundSprite = new Sprite();
		this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		this.addChild(this._backgroundSprite);
		this._backgroundSprite.opacity = 255;
		// 標準のフェードアウトを実行
		Scene_Title_old.prototype.fadeOutAll.call(this);

		// const time = this.slowFadeSpeed() / 60;
		// AudioManager.fadeOutBgm(time);
		// AudioManager.fadeOutBgs(time);
		// AudioManager.fadeOutMe(time);
		// this.startFadeOut(1);
	}

	update() {
		// ADD T.Sunagawa
		// 場所移動中は処理を停止
		// ※ニューゲームによる場所移動後まで処理が走ってしまいエラーになるため。
		if ($gamePlayer.isTransferring()) {
			console.log("aaaa")
			Scene_Base.prototype.update.call(this);
			return;
		}

		$gameMap.update(true);
		$gameScreen.update();

		this.updateWaitCount();
		Scene_Base.prototype.update.call(this);
		if (this._inputWait > 0) { this._inputWait--; }
		console.log(this._inputWait);
		this.updatePicCommands();
	}

	terminate() {
		super.terminate();
		const stopVideo = {
			MV: () => {
				if (Graphics.isVideoPlaying()) {
					Graphics._video.pause();
					Graphics._onVideoEnd();
				}
			},
			MZ: () => {
				if (Video.isPlaying()) {
					Video._element.pause();
					Video._onEnd();
				}
			}
		}[Utils.RPGMAKER_NAME];
		stopVideo();
	}

	// ADD T.Sunagawa
	isBusy() {
		// コマンドウィンドウが閉じるのを待つ
		return this._commandWindow.isClosing() || super.isBusy();
	}

	//==============================
	// * Create Title Field 3
	//==============================
	createTitleField3() {
		console.log("createTitleField3")
		this._titleField3 = new Sprite();
		this._titleField3.z = 200;
		this.addChild(this._titleField3);
	};

	//==============================
	// * createTitlePictureCommands
	//==============================
	createTitlePictureCommands() {
		this._picComE = false;
		this._TpictureCom = [];
		this._tComTouch = [TouchInput.x, TouchInput.y];
		this._picComIndex = this._commandWindow._index;
		for (i = 0; i < this._commandWindow._list.length; i++) {
			this._TpictureCom[i] = new TpictureCom(this._commandWindow, i);
			this._TpictureCom[i].z = 300;
			this.addChild(this._TpictureCom[i]);
		};
		this._commandWindow.x = -(Graphics.width * 2);
	};

	//==============================
	// * Create Cursor Command
	//==============================
	createCursorCommand() {
		this._cursorSlide = [0, 0, 0, false];
		if (String(Moghunter.title_cursorSlide) == "true") { this._cursorSlide[3] = true };
		this._cursor = new Sprite(ImageManager.loadTitle2("Cursor"));
		this._cursor.anchor.x = 0.5;
		this._cursor.anchor.y = 0.5;
		this._cursor.org = [Moghunter.title_cursorX, Moghunter.title_cursorY]
		if (this._cursorSlide[3]) { this._cursor.org[0] -= 5 }
		this._cursor.opacity = 255;
		this._cursor.z = 350;
		this._cursor.rot = [true, 0.05];
		this._cursor.rot[0] = String(Moghunter.title_cursorRot) == "true" ? true : false;
		this._cursor.rot[1] = Moghunter.title_cursorRotSpeed;
		this.addChild(this._cursor);
	};

	//==============================
	// * update Title Cursor
	//==============================
	updateTitleCursor() {
		if (this._cursorSlide[3]) { this.updateCursorSlide() };
		if (this._cursor.rot[0]) { this.updateCursorRotation() };
		this._cursor.opacity += 5;
		var nx = this.comSprite().x - (this.comSprite().bitmap.width / 2) - (this._cursor.width / 2) + this._cursorSlide[0];
		var ny = this.comSprite().y - (this.comSprite().bitmap.height / 2) + (this._cursor.height / 2) + this._cursor.org[1];
		this._cursor.x = this.cursorMoveto(this._cursor.x, nx, 10);
		this._cursor.y = this.cursorMoveto(this._cursor.y, ny, 10);
		if (!this._commandWindow.isOpen()) {
			this._cursor.opacity = 0;
		}
	};

	//==============================
	// * Com Sprite
	//==============================
	comSprite() {
		return this._TpictureCom[this._commandWindow._index];
	};

	//==============================
	// * Uodate Cursor Rotation
	//==============================
	updateCursorRotation() {
		this._cursor.rotation += this._cursor.rot[1];
	};

	//==============================
	// * update Cursor Slide
	//==============================
	updateCursorSlide() {
		this._cursorSlide[1]++
		if (this._cursorSlide[1] < 3) { return };
		this._cursorSlide[1] = 0
		this._cursorSlide[2]++
		if (this._cursorSlide[2] < 15) {
			this._cursorSlide[0]++;
		} else if (this._cursorSlide[2] < 30) {
			this._cursorSlide[0]--;
		} else {
			this._cursorSlide[0] = 0;
			this._cursorSlide[2] = 0;
		};
	};

	//==============================
	// * Sprite Move To
	//==============================
	cursorMoveto(value, real_value, speed) {
		if (value == real_value) { return value };
		var dnspeed = 5 + (Math.abs(value - real_value) / speed);
		if (value > real_value) {
			value -= dnspeed;
			if (value < real_value) { value = real_value };
		}
		else if (value < real_value) {
			value += dnspeed;
			if (value > real_value) { value = real_value };
		};
		return Math.floor(value);
	};

	//==============================
	// * checkTPicCom
	//==============================
	checkTPicCom() {
		for (i = 0; i < this._TpictureCom.length; i++) {
			if (this._TpictureCom[i].isOnPicCom()) {
				this._commandWindow._index = i;
				if (this._picComIndex == this._commandWindow._index) {
					this._commandWindow.processOk();
				} else {
					this._commandWindow.playCursorSound()
				};
				this._picComIndex = this._commandWindow._index
			};
		};
	};

	//==============================
	// * picComNeedCheckTouch
	//==============================
	picComNeedCheckTouch() {
		if (this._tComTouch[0] != TouchInput.x) { return true };
		if (this._tComTouch[1] != TouchInput.y) { return true };
		return false;
	};

	//==============================
	// * update Title Touch Input Com
	//==============================
	updateTitleTouchInputCom() {
		if (TouchInput.isTriggered()) { this.checkTPicCom() };
		if (this.picComNeedCheckTouch()) { this.updateTComMouseIsOnPic() };
		this._tComTouch = [TouchInput.x, TouchInput.y];
	};

	//==============================
	// * Update Com Side Input
	//==============================
	updateComSideInput() {
		if (Input.isRepeated('right')) {
			this.addTitleComIndex(1);
		} else if (Input.isRepeated('left')) {
			this.addTitleComIndex(-1);
		};
	};

	//==============================
	// * updateTComMouseIsOnPic
	//==============================
	updateTComMouseIsOnPic() {
		var picID = -1;
		for (i = 0; i < this._TpictureCom.length; i++) {
			if (this._TpictureCom[i].isOnPicCom()) {
				this._commandWindow._index = i;
				if (this._picComIndex != this._commandWindow._index) {
					this._commandWindow.playCursorSound();
				};
				this._picComIndex = this._commandWindow._index;
			};
		};
	};

	//==============================
	// * add Title ComIndex
	//==============================
	addTitleComIndex(value) {
		SoundManager.playCursor();
		var maxIndex = this._commandWindow._list.length - 1
		this._commandWindow._index += value;
		if (this._commandWindow._index < 0) {
			this._commandWindow._index = maxIndex;
		} else if (this._commandWindow._index > maxIndex) {
			this._commandWindow._index = 0;
		};
	};

	//==============================
	// * update Pic Commands
	//==============================
	updatePicCommands() {
		if (!this._picComE && this._inputWait == 0) {
			this.updateTitleTouchInputCom();
			if (this._sideInput) { this.updateComSideInput() };
		};
		if (this._cursor) { this.updateTitleCursor() };
		if (!this._picComE && this._commandWindow.isClosing()) {
			this._picComE = true;
		}
	};
}

function resetWeather() {
	$gameScreen.changeWeather("none", 0, 0);
}

function freezeCamera(action) {
	const previousMap = $gameMap;
	action();
	for (const property of ["_displayX", "_displayY", "_parallaxX", "_parallaxY"])
		$gameMap[property] = previousMap[property];
}

const WindowTitleCommandInit = Window_TitleCommand.prototype.initialize;
Window_TitleCommand.prototype.initialize = function (rect) {
	WindowTitleCommandInit.call(this,rect);
	this._inputWait = parameters.inputWait;
}

const ProcessOk = Window_TitleCommand.prototype.processOk;
Window_TitleCommand.prototype.processOk = function () {
	if (this._inputWait == 0) {
		Window_TitleCommand._lastCommandSymbol = this.currentSymbol();
		ProcessOk.call(this);
	}
};

const TitleCommandUpdate = Window_TitleCommand.prototype.update;
Window_TitleCommand.prototype.update = function () {
	TitleCommandUpdate.call(this);
	if (this._inputWait > 0) { this._inputWait--; };
}

const Scene_Title_commandNewGame = Scene_Title_old.prototype.commandNewGame;
Scene_Title_old.prototype.commandNewGame = function () {
	freezeCamera(Scene_Title_commandNewGame.bind(this));
	resetWeather();
};

const Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function () {
	Scene_Load_onLoadSuccess.call(this);
	resetWeather();
}

//=========================================================================
// ExtraGauge.jsとの競合解決
//=========================================================================
if (Scene_Base.prototype.addExtraGauge) {
	const _Scene_Base_addExtraGauge = Scene_Base.prototype.addExtraGauge;
	Scene_Base.prototype.addExtraGauge = function () {
		// ゲージデータが存在しない場合は生成する。
		if (!this._extraGauges) {
			this.createExtraGauges();
		}
		_Scene_Base_addExtraGauge.apply(this, arguments);
	};
}

////==============================
//// * Create Title Field 3
////==============================
//Scene_Title.prototype.createTitleField3 = function() {
//    this._titleField3 = new Sprite();
//	this._titleField3.z = 200;
//	this.addChild(this._titleField3);
//};

////==============================
//// * createTitlePictureCommands
////==============================
//Scene_Title.prototype.createTitlePictureCommands = function() {
//	this._picComE = false;
//	this._TpictureCom = [];
//	this._tComTouch = [TouchInput.x,TouchInput.y];
//	this._picComIndex = this._commandWindow._index;
//	for (i = 0; i < this._commandWindow._list.length; i++){
//		 this._TpictureCom[i] = new TpictureCom(this._commandWindow,i);
//		 this._TpictureCom[i].z = 300;
//		 this._titleField3.addChild(this._TpictureCom[i]);
//	};
// 	this._commandWindow.x = -(Graphics.width * 2);	
//};

////==============================
//// * Create Cursor Command
////==============================
//Scene_Title.prototype.createCursorCommand = function() {
//	this._cursorSlide = [0,0,0,false];
//	if (String(Moghunter.title_cursorSlide) == "true") {this._cursorSlide[3] = true};
//    this._cursor = new Sprite(ImageManager.loadTitle2("Cursor"));
//	this._cursor.anchor.x = 0.5;
//	this._cursor.anchor.y = 0.5;
//	this._cursor.org = [Moghunter.title_cursorX,Moghunter.title_cursorY]
//	if (this._cursorSlide[3]) {this._cursor.org[0] -= 5}
//	this._cursor.opacity = 0;
//	this._cursor.z = 350;
//	this._cursor.rot = [true,0.05];
//	this._cursor.rot[0] = String(Moghunter.title_cursorRot) == "true" ? true : false;
//	this._cursor.rot[1] = Moghunter.title_cursorRotSpeed;
//	this._titleField3.addChild(this._cursor);
//};

////==============================
//// * update Title Cursor
////==============================
//Scene_Title.prototype.updateTitleCursor = function() {
//	 if (this._cursorSlide[3]) {this.updateCursorSlide()};
//	 if (this._cursor.rot[0]) {this.updateCursorRotation()}; 
//   	 this._cursor.opacity += 5;
// 	 var nx = this.comSprite().x - (this.comSprite().bitmap.width / 2) - (this._cursor.width / 2) + this._cursorSlide[0];
//	 var ny = this.comSprite().y - (this.comSprite().bitmap.height / 2) + (this._cursor.height / 2) + this._cursor.org[1];
//     this._cursor.x = this.cursorMoveto(this._cursor.x , nx, 10);
//	 this._cursor.y = this.cursorMoveto(this._cursor.y, ny, 10);
//};

////==============================
//// * Com Sprite
////==============================
//Scene_Title.prototype.comSprite = function() {
//    return this._TpictureCom[this._commandWindow._index];
//};

////==============================
//// * Uodate Cursor Rotation
////==============================
//Scene_Title.prototype.updateCursorRotation = function() {
//    this._cursor.rotation += this._cursor.rot[1];
//};

////==============================
//// * update Cursor Slide
////==============================
//Scene_Title.prototype.updateCursorSlide = function() {
//     this._cursorSlide[1] ++
//	 if (this._cursorSlide[1] < 3) {return};
//	 this._cursorSlide[1] = 0
//	 this._cursorSlide[2] ++
//	 if (this._cursorSlide[2] < 15) {
//		 this._cursorSlide[0] ++;
//	 } else if (this._cursorSlide[2] < 30) {
//		 this._cursorSlide[0] --;
//	 } else {
//		 this._cursorSlide[0] = 0;
//		 this._cursorSlide[2] = 0;
//	 };
//};

////==============================
//// * Sprite Move To
////==============================
//Scene_Title.prototype.cursorMoveto = function(value,real_value,speed) {
//	if (value == real_value) {return value};
//	var dnspeed = 5 + (Math.abs(value - real_value) / speed);
//	if (value > real_value) {value -= dnspeed;
//	    if (value < real_value) {value = real_value};}
//    else if (value < real_value) {value  += dnspeed;
//    	if (value  > real_value) {value  = real_value};		
//    };
//	return Math.floor(value);
//};

////==============================
//// * checkTPicCom
////==============================
//Scene_Title.prototype.checkTPicCom = function() {
//	for (i = 0; i < this._TpictureCom.length; i++){
//	     if (this._TpictureCom[i].isOnPicCom()) {
//			 this._commandWindow._index = i;
//			 if (this._picComIndex == this._commandWindow._index) {			    
//			      this._commandWindow.processOk();
//			 } else {
//				  this._commandWindow.playCursorSound()
//			 };
//			 this._picComIndex = this._commandWindow._index 
//		 };
//	};
//};

////==============================
//// * picComNeedCheckTouch
////==============================
//Scene_Title.prototype.picComNeedCheckTouch = function() {
//   if (this._tComTouch[0] != TouchInput.x) {return true};
//   if (this._tComTouch[1] != TouchInput.y) {return true}; 
//   return false;
//};

////==============================
//// * update Title Touch Input Com
////==============================
//Scene_Title.prototype.updateTitleTouchInputCom = function() {
//    if (TouchInput.isTriggered()) {this.checkTPicCom()}; 
//	if (this.picComNeedCheckTouch()) {this.updateTComMouseIsOnPic()};
//	this._tComTouch = [TouchInput.x,TouchInput.y];
//};

////==============================
//// * Update Com Side Input
////==============================
//Scene_Title.prototype.updateComSideInput = function() {
//    if (Input.isRepeated('right')) {
//		this.addTitleComIndex(1);
//	} else if (Input.isRepeated('left')) {
//		this.addTitleComIndex(-1);
//	};
//};

////==============================
//// * updateTComMouseIsOnPic
////==============================
//Scene_Title.prototype.updateTComMouseIsOnPic = function() {
//	var picID = -1;
//	for (i = 0; i < this._TpictureCom.length; i++){
//	     if (this._TpictureCom[i].isOnPicCom()) {
//			 this._commandWindow._index = i;
//			 if (this._picComIndex != this._commandWindow._index) {			    
//	    		 this._commandWindow.playCursorSound();
//			 };
//			 this._picComIndex = this._commandWindow._index ;
//		 };
//	};
//};

////==============================
//// * add Title ComIndex
////==============================
//Scene_Title.prototype.addTitleComIndex = function(value) {
//    SoundManager.playCursor();
//	var maxIndex = this._commandWindow._list.length - 1
//	this._commandWindow._index += value;
//	if (this._commandWindow._index < 0) {
//		this._commandWindow._index = maxIndex;
//	} else if (this._commandWindow._index > maxIndex) {
//		this._commandWindow._index = 0;
//	};
//};

////==============================
//// * update Pic Commands
////==============================
//Scene_Title.prototype.updatePicCommands = function() {
//	 if (!this._picComE) {
//	     this.updateTitleTouchInputCom();
//	     if (this._sideInput) {this.updateComSideInput()};
//	 };
//	 if (this._cursor) {this.updateTitleCursor()};
//	 if (!this._picComE && this._commandWindow.isClosing()) {this._picComE = true;}
//};

//=============================================================================
// ■■■ TpictureCom  ■■■ 
//=============================================================================
function TpictureCom() {
    this.initialize.apply(this, arguments);
};

TpictureCom.prototype = Object.create(Sprite.prototype);
TpictureCom.prototype.constructor = TpictureCom;

//==============================
// * Initialize
//==============================
TpictureCom.prototype.initialize = function(data,index) {
    Sprite.prototype.initialize.call(this);
	this._index = index;
	this._data = data;
	this._index2 = this._data._index;
	this._wait = 5 * index;
	this._inputWait = 120;
	this.opacity = 0;
	this._aniData = {};
	this._aniData.mode = Moghunter.title_comMode;
	this._aniData.zoomON = Moghunter.title_zoomEffect == "true" ? true : false;
	this._aniData.zoomMax = 1.3;
    this._aniData.zoomPhase = 0; 
	this._aniData.zoomSpeed = 0.010;
	this._aniData.shakeD1 = 60;
	this._aniData.shakeD2 = 0;
	this._aniData.shakeX = 0;
	this._enabled = data.isCommandEnabled(index);
	this._orgXY = this.set_tcp(Moghunter.title_com_pos[index]);
	this.prepareBitmap();
};

//==============================
// * Prepare Bitmap
//==============================
TpictureCom.prototype.prepareBitmap = function() {
	var name = "Command_" + String(this._index);
	this.bitmap = ImageManager.loadTitle2(name)
	console.log(name)
};

//==============================
// * set tcp
//==============================
TpictureCom.prototype.set_tcp = function(value) {
	if (!value) {return null};
	var s = value.split(',');
	if (!s[0] || !s[1]) {return null};
	return  [Number(s[0]),Number(s[1])];
};

//==============================
// * get Data
//==============================
TpictureCom.prototype.getData = function() {
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	this._cw = this.bitmap.width;
	this._ch = this.bitmap.height / 2;
	var fx = (Graphics.width - 816) / 2; 
	var fy = (Graphics.height - 624) / 2;	
	this._orgXY[0] += (this._cw / 2) + fx;
	this._orgXY[1] += fy;
	this.x = this._orgXY[0];
	this.y = this._orgXY[1];
    this._pw1 = this.x - (this._cw / 2);
	this._pw2 = this.x + (this._cw / 2);
	this._ph1 = this.y - (this._ch / 2);
	this._ph2 = this.y + (this._ch / 2);	
	var rectY = !this._enabled || this._index != this._data._index ? this._ch : 0;
	this.setFrame(0, rectY, this._cw, this._ch);
	this.x += Moghunter.title_slideXaxis;
	this.y += Moghunter.title_slideYaxis;
};

//==============================
// * On Picture Com
//==============================
TpictureCom.prototype.isOnPicCom = function() {
    if (TouchInput.x < this._pw1) {return false};
	if (TouchInput.x > this._pw2) {return false};
	if (TouchInput.y < this._ph1) {return false};
	if (TouchInput.y > this._ph2) {return false};
	return true;
};

//==============================
// * On Picture Com
//==============================
TpictureCom.prototype.canClick = function () {
	if (this._inputWait == 0) {
		return true;
	}
	return false;
};

//==============================
// * update Zoom Animation
//==============================
TpictureCom.prototype.updateZoomAnimation = function() {
	this._aniData.shakeX = 0;
 	if (this._index == this._data._index) {
		if (this._aniData.zoomPhase == 0) {
			this.scale.x -= this._aniData.zoomSpeed;
			if (this.scale.x <= 1.00) {
				this.scale.x = 1.00;
				this._aniData.zoomPhase = 1;
			};
		} else {
			this.scale.x += this._aniData.zoomSpeed;
			if (this.scale.x >= this._aniData.zoomMax) {
				this.scale.x = this._aniData.zoomMax;
				this._aniData.zoomPhase = 0;
			};		
	    };
	} else {
		this._aniData.zoomPhase = 0;
		if (this.scale.x > 1.00) {this.scale.x -= (this._aniData.zoomSpeed * 3)};
	}; 
	this.scale.y = this.scale.x  
};

//==============================
// * set Frame Index
//==============================
TpictureCom.prototype.setFrameIndex = function() {
	this._aniData.shakeD1 = Moghunter.title_shakeDuration;
	this._aniData.shakeD2 = 3;
    this._index2 = this._data._index
	var rectY = !this._enabled || this._index != this._data._index ? this._ch : 0;
	this.setFrame(0, rectY, this._cw, this._ch);
};

//==============================
// * update Slide
//==============================
TpictureCom.prototype.updateSlide = function() {
    this.x = this.cSlide(this.x, (this._orgXY[0] + this._aniData.shakeX), 60);
	this.y = this.cSlide(this.y, this._orgXY[1], 60);	
};

//==============================
// * Sprite Move To
//==============================
TpictureCom.prototype.cSlide = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 3 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * update Opacity
//==============================
TpictureCom.prototype.updateOpacity = function() {
	this.opacity += 15;
	if (!this._data.isOpen()) {
		this.opacity = 0;
	}
};

//==============================
// * shakeClear
//==============================
TpictureCom.prototype.shakeClear = function() {
	this._aniData.shakeD1 = 0;
	this._aniData.shakeD2 = 0;
	this._aniData.shakeX = 0;
};
			
//==============================
// * update Shake Animation
//==============================
TpictureCom.prototype.updateShakeAnimation = function() {
	if (this._index != this._data._index) {this.shakeClear();return};
	if (this._aniData.shakeD1 > 0) {
		if (this._aniData.shakeD2 > 0) {
			this._aniData.shakeD2--;
		    if (this._aniData.shakeD2 <= 0) {
			    this._aniData.shakeD2 = 3;
			    this._aniData.shakeX = -5 + (Math.abs(Math.random() * 10));
			};
		};
		this._aniData.shakeD1--;
	    if (this._aniData.shakeD1 <= 0) {this.shakeClear()};
	};
};

//==============================
// * update Pic Command
//==============================
TpictureCom.prototype.updatePicCommand = function () {
	if (this._inputWait > 0) { this._inputWait--; };
	if (this._wait > 0) {this._wait--;return};
    if (this._aniData.mode == 1) {
		this.updateZoomAnimation()
	} else if (this._aniData.mode == 2) {
		this.updateShakeAnimation();
	};
	if (this._index2 != this._data._index) {this.setFrameIndex()};
	this.updateSlide();
	this.updateOpacity();
};

//==============================
// * Update
//==============================
TpictureCom.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (!this._cw) {
	    if (this.bitmap.isReady()) {this.getData()};
	} else {
		this.updatePicCommand();
    };
};