//=============================================================================
// FuwaFuwa_Menu
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc メニューカスタムプラグイン
 * @author 白金　隅
 * @help いつでもヘルプに助けが書いてあると思うんじゃあない
 
 * @param IMAGE_V
 * @desc メニュー背景の変数
 * @type variable
 * @default 1

 * @param IMAGE_LIST
 * @desc メニュー背景の画像リスト(変数=0～)
 * @dir img/pictures/
 * @type file
 
 * @param IMAGE_V2
 * @desc ゲーム終了背景の変数
 * @type variable
 * @default 1

 * @param IMAGE_LIST2
 * @desc ゲーム終了背景の画像リスト(変数=0～)
 * @dir img/pictures/
 * @type file
 
 * @param IMAGE_V3
 * @desc オプション背景の変数
 * @type variable
 * @default 1

 * @param IMAGE_LIST3
 * @desc オプション背景の画像リスト(変数=0～)
 * @dir img/pictures/
 * @type file
 
 * @param IMAGE_V4
 * @desc セーブ&ロード背景の変数
 * @type variable
 * @default 1

 * @param IMAGE_LIST4
 * @desc セーブ&ロード背景の画像リスト(変数=0～)
 * @dir img/pictures/
 * @type file
 
 * @param IMAGE_V5
 * @desc アイテム背景の変数
 * @type variable
 * @default 1

 * @param IMAGE_LIST5
 * @desc アイテム背景の画像リスト(変数=0～)
 * @dir img/pictures/
 * @type file
 
 * @param ITEM_IMAGE_LIST
 * @desc アイテム画像のリスト(変数=0～)
 * @dir img/pictures/
 * @type file
  
 * @param ITEM_BUTTON_IMAGE
 * @desc アイテムボタン枠
 * @dir img/pictures/
 * @type file
 
 * @param NO_ITEM_BUTTON_IMAGE
 * @desc アイテムボタン枠
 * @dir img/pictures/
 * @type file
 
 * @param MENUE_IMAGE_BUTTON
 * @desc メニューボタン画像
 * @dir img/pictures/
 * @type file
 
 * @param MENUE_IMAGE_BUTTON_W
 * @desc メニューボタン画像の横幅
 * @type number
 * @default 176
 
  * @param MENUE_IMAGE_BUTTON_H
 * @desc メニューボタン画像の縦幅
 * @type number
 * @default 176
 
 * @param GAME_END_BUTTON
 * @desc ゲーム終了のボタン画像
 * @dir img/pictures/
 * @type file
 
 * @param GAME_END_BUTTON_W
 * @desc ゲーム終了のボタン画像の横幅
 * @type number
 * @default 176
 
  * @param GAME_END_BUTTON_H
 * @desc ゲーム終了のボタン画像の縦幅
 * @type number
 * @default 176
 
 * @param OPTION_SWITCH
 * @desc オプションスイッチの番号
* @type switch
 * @default 1
 
 * @param OPTION_TXET
 * @desc オプションスイッチの名称
 * @type string
 * @default 追加スイッチ
 
  * @param OPTION_ON
 * @desc スイッチのN番がONの時オプションスイッチが表示される
* @type switch
 * @default 2
 
 * @param IMAGE_BLACK
 * @type select 
 * @option 結構暗い
 * @value #000000d0
 * @option 暗め
 * @value #000000b0
 * @option 通常
 * @value #000000a0
 * @option 少し明るめ 
 * @value #00000090
 * @option 明るめ
 * @value #00000070
 * @option 結構明るめ
 * @value #00000050
 * @default #000000a0
 */
 //console.log

(function() {
	// 初期化
	var parameters = PluginManager.parameters('HuwaHuwa_Menu');
	//parameters['IMAGE_LIST'] = JSON.parse(parameters['IMAGE_LIST']);
	parameters['IMAGE_V'] = Number(parameters['IMAGE_V']);
	//parameters['IMAGE_LIST2'] = JSON.parse(parameters['IMAGE_LIST2']);
	parameters['IMAGE_V2'] = Number(parameters['IMAGE_V2']);
	//parameters['IMAGE_LIST3'] = JSON.parse(parameters['IMAGE_LIST3']);
	parameters['IMAGE_V3'] = Number(parameters['IMAGE_V3']);
	//parameters['IMAGE_LIST4'] = JSON.parse(parameters['IMAGE_LIST4']);
	parameters['IMAGE_V4'] = Number(parameters['IMAGE_V4']);
	//parameters['IMAGE_LIST5'] = JSON.parse(parameters['IMAGE_LIST5']);
	//parameters['ITEM_IMAGE_LIST'] = JSON.parse(parameters['ITEM_IMAGE_LIST']);
	parameters['IMAGE_V5'] = Number(parameters['IMAGE_V5']);
	parameters['OPTION_SWITCH'] = Number(parameters['OPTION_SWITCH']);
	const MENUE_IMAGE_BUTTON_W = Number(parameters['MENUE_IMAGE_BUTTON_W']);
	const MENUE_IMAGE_BUTTON_H = Number(parameters['MENUE_IMAGE_BUTTON_H']);
	const GAME_END_BUTTON_W = Number(parameters['GAME_END_BUTTON_W']);
	const GAME_END_BUTTON_H = Number(parameters['GAME_END_BUTTON_H']);
	const OPTION_ON = Number(parameters['OPTION_ON']);
	
	
	// 追加画像の読み込み
	var old_loadSystemImages20210407 = Scene_Boot.prototype.loadSystemImages;
	Scene_Boot.prototype.loadSystemImages = function() {
	    old_loadSystemImages20210407.call(this);
	    ImageManager.loadPicture(parameters['MENUE_IMAGE_BUTTON']);
		ImageManager.loadPicture(parameters['GAME_END_BUTTON']);
		ImageManager.loadPicture(parameters['ITEM_BUTTON_IMAGE']);
		ImageManager.loadPicture(parameters['NO_ITEM_BUTTON_IMAGE']);

		ImageManager.loadPicture(parameters['IMAGE_LIST']);
		ImageManager.loadPicture(parameters['IMAGE_LIST2']);
		ImageManager.loadPicture(parameters['IMAGE_LIST3']);
		ImageManager.loadPicture(parameters['IMAGE_LIST4']);
		ImageManager.loadPicture(parameters['IMAGE_LIST5']);
		ImageManager.loadPicture(parameters['ITEM_IMAGE_LIST']);

	 //   // 配列の結合
		//let list = parameters['IMAGE_LIST'].concat(parameters['IMAGE_LIST2'], parameters['IMAGE_LIST3'], parameters['IMAGE_LIST4'], parameters['IMAGE_LIST5'], parameters['ITEM_IMAGE_LIST']);
	 //   // 重複の排除
	 //   list =Array.from(new Set(list));
	 //   for (const elem of list) {
	 //   	ImageManager.loadPicture(elem);
	 //   }
	};

	var bgmenublur = false;

	Scene_MenuBase.prototype.createBackground = function () {
		this._backgroundFilter = new PIXI.filters.BlurFilter();
		this._backgroundSprite = new Sprite();
		this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
		if (bgmenublur || $gameSystem.BG_MenuBlur) { this._backgroundSprite.filters = [this._backgroundFilter]; var opa = 192; } else { var opa = 255; }
		this.addChild(this._backgroundSprite);
		this.setBackgroundOpacity(opa);
	};

	Scene_MenuBase.prototype.createButtons = function () {
		if (this.needsCancelButton()) {
			this.createCancelButton();
		}
		if (this.needsPageButtons()) {
			this.createPageButtons();
		}
	};

	//----------------------------------------------------------------------------------
	//　メニュー
	//----------------------------------------------------------------------------------
	// タイプ1に変更
	// タイプ1を改変して背景画像を表示するようにしているため。
	var old_init20210406 = Window_MenuCommand.prototype.initialize;
	Window_MenuCommand.prototype.initialize = function(rect) {
	    old_init20210406.call(this, rect);
	    this.setBackgroundType(1);
	};
	
	// バックに画像を表示
	Window_MenuCommand.prototype.refreshDimmerBitmap = function() {
	    if (this._dimmerSprite) {
	    	this._dimmerSprite.bitmap.destroy();
	        this._dimmerSprite.bitmap = ImageManager.loadPicture(parameters['IMAGE_LIST']);
	    }
	};

	//ブラーを削除
	var old_Window_Menu = Window_MenuCommand.prototype.createBackground
	Window_MenuCommand.prototype.createBackground = function () {
		//old_Window_Menu.call(this);
		this._backgroundSprite2 = new Sprite();
		this._backgroundSprite2.bitmap = SceneManager.backgroundBitmap();
		this.addChild(this._backgroundSprite2);
		this.setBackgroundOpacity(255);
		//alias.apply(this, arguments);
		//this._backgroundSprite.filters.shift();     // remove first filter (blur)
	};
	
	// 画像を削除しないように変更
	Window_MenuCommand.prototype.destroy = function(options) {
	    this.destroyContents();
	    Window.prototype.destroy.call(this, options);
	};
	
	// 不要な項目を削除
	Window_MenuCommand.prototype.makeCommandList = function() {
	    const enabled = this.areMainCommandsEnabled();
	    if (this.needsCommand("item")) {
	        this.addCommand(TextManager.item, "item", enabled);
	    }
	    //this.addFormationCommand();
	    //this.addOriginalCommands();
	    this.addSaveCommand();
	    this.addOptionsCommand();
	    this.addGameEndCommand();
	};
	
	// メニューの数の変更
	Window_MenuCommand.prototype.maxCols = function() {
	    return 6;
	};

	Window_MenuCommand.prototype.itemTextAlign = function() {
	    return "center";
	};
	//  画像の横サイズを変更
	Window_MenuCommand.prototype.itemWidth = function() {
	    return MENUE_IMAGE_BUTTON_W + 16;
	};

	Window_MenuCommand.prototype.itemHeight = function() {
		return MENUE_IMAGE_BUTTON_H;// + 8;
	};
	// 列の横サイズを変更
	Window_MenuCommand.prototype.lineHeight = function() {
	    return MENUE_IMAGE_BUTTON_W ;
	};
	// 列の縦サイズを変更
	Window_MenuCommand.prototype.lineWidth = function() {
	    return MENUE_IMAGE_BUTTON_H;
	};

	// 描写位置の調整
	Window_MenuCommand.prototype.itemRect = function(index) {
	    const maxCols = this.maxCols();
	    const itemWidth = this.itemWidth();
	    const itemHeight = this.itemHeight();
	    const colSpacing = this.colSpacing();
	    const rowSpacing = this.rowSpacing();
	    const col = index % maxCols;
	    const row = Math.floor(index / maxCols);
	    const x = 184 + col * (itemWidth +10) + colSpacing / 2 - this.scrollBaseX();
		const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY() + 8;
	    const width = MENUE_IMAGE_BUTTON_W;
	    const height = MENUE_IMAGE_BUTTON_H;
	    return new Rectangle(x, y, width, height);
	};

	// バック画像に書き込むように変更
	Window_MenuCommand.prototype.drawItem = function(index) {
	    const rect = this.itemLineRect(index);
	    const align = this.itemTextAlign();
	    this.resetTextColor();
	//    this.changePaintOpacity(this.isCommandEnabled(index));
	//    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
	    this.drawSystem( rect.x-8, rect.y, index *MENUE_IMAGE_BUTTON_W , 0, MENUE_IMAGE_BUTTON_W, MENUE_IMAGE_BUTTON_H, index == this._index);
	};
	
	// 画像を更新する
	var oldWindow_MenuCommandSelect20210413 = Window_MenuCommand.prototype.select;
	Window_MenuCommand.prototype.select = function(index) {
	    oldWindow_MenuCommandSelect20210413.call(this, index);
	    this.refresh();
	};
	
	// 画像をウインドウに書き込む
	Window_MenuCommand.prototype.drawSystem = function(x, y, sx, sy, w, h, flag) {
	    var bitmap = ImageManager.loadPicture(parameters['MENUE_IMAGE_BUTTON']);
	    // ローディング遅延対策
	     bitmap.addLoadListener(function() {
			this.contents.blt(bitmap, sx, sy, w, h, x, y);
			// 暗くする為に半透明で書き込む
			if(!flag){ this.contents.fillRect( x, y, w, h, parameters['IMAGE_BLACK']); }
	    }.bind(this));
	};
	
	// カーソルの表示は意味ないので消す
	Window_MenuCommand.prototype.refreshCursor = function() {
	};


	// 不要なので削除
	Window_MenuCommand.prototype.drawItemBackground = function(index) {
	//const rect = this.itemRect(index);
	//    this.drawBackgroundRect(rect);
	};

	// ゴールド表示を削除
	Scene_Menu.prototype.create = function() {
	    Scene_MenuBase.prototype.create.call(this);
	    this.createCommandWindow();
	    //this.createGoldWindow();
	};
	// ステータス画面を削除
	Scene_Menu.prototype.start = function() {
	    Scene_MenuBase.prototype.start.call(this);
	    //this._statusWindow.refresh();
	};

	// 不要な項目を削除
	Scene_Menu.prototype.createCommandWindow = function() {
	    const rect = this.commandWindowRect();
	    const commandWindow = new Window_MenuCommand(rect);
	    commandWindow.setHandler("item", this.commandItem.bind(this));
	    //commandWindow.setHandler("skill", this.commandPersonal.bind(this));
	    //commandWindow.setHandler("equip", this.commandPersonal.bind(this));
	    //commandWindow.setHandler("status", this.commandPersonal.bind(this));
	    //commandWindow.setHandler("formation", this.commandFormation.bind(this));
	    commandWindow.setHandler("options", this.commandOptions.bind(this));
	    commandWindow.setHandler("save", this.commandSave.bind(this));
	    commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
	    commandWindow.setHandler("cancel", this.popScene.bind(this));
	    this.addWindow(commandWindow);
	    this._commandWindow = commandWindow;
	};
	
	// 戻るボタンの表示位置を変更
	Scene_Menu.prototype.buttonY = function() {
	    const offsetY = Math.floor((this.buttonAreaHeight() - 48) / 2);
		return this.buttonAreaTop() + offsetY+40;
	};

	// メニュー表示位置の調整
	Scene_Menu.prototype.commandWindowRect = function() {
	    const ww = Graphics.boxWidth;
	    const wh = 120;
	    const wx = 0;
		const wy = -4;//上にある隙間の分　一体何なんでしょうthis.mainAreaTop();// +100;
	    return new Rectangle(wx, wy, ww, wh);
	};

	// メニューにステータス画面がないので削除
	Scene_Menu.prototype.onPersonalCancel = function() {
	    //this._statusWindow.deselect();
	    this._commandWindow.activate();
	};


	//----------------------------------------------------------------------------------
	//　ゲーム終了メニュー
	//----------------------------------------------------------------------------------
	// タイプ1に変更
	// タイプ1を改変して背景画像を表示するようにしているため。
	var old_GameEndinit20210406 = Window_GameEnd.prototype.initialize;
	Window_GameEnd.prototype.initialize = function(rect) {
	    old_GameEndinit20210406.call(this, rect);
	    this.setBackgroundType(1);
	};
	
	// バックに画像を表示
	Window_GameEnd.prototype.refreshDimmerBitmap = function() {
	    if (this._dimmerSprite) {
	 	this._dimmerSprite.bitmap.destroy();
	        this._dimmerSprite.bitmap = ImageManager.loadPicture(parameters['IMAGE_LIST2']);
	    }
	};
	
	// 画像を削除しないように変更
	Window_GameEnd.prototype.destroy = function(options) {
	    this.destroyContents();
	    Window.prototype.destroy.call(this, options);
	};
	// メニューの数の変更
	Window_GameEnd.prototype.maxCols = function() {
	    return 2;
	};

	Window_GameEnd.prototype.itemTextAlign = function() {
	    return "center";
	};
	Window_GameEnd.prototype.itemWidth = function() {
	    return GAME_END_BUTTON_W + 16;
	};
	//  画像の横サイズを変更
	Window_GameEnd.prototype.itemHeight = function() {
	    return GAME_END_BUTTON_H + 8;
	};
	// 列の横サイズを変更
	Window_GameEnd.prototype.lineHeight = function() {
	    return GAME_END_BUTTON_W;
	};
	// 列の縦サイズを変更
	Window_GameEnd.prototype.lineWidth = function() {
	    return GAME_END_BUTTON_H;
	};

	// 描写位置の調整
	Window_GameEnd.prototype.itemRect = function(index) {
	    const maxCols = this.maxCols();
	    const itemWidth = this.itemWidth();
	    const itemHeight = this.itemHeight();
	    const colSpacing = this.colSpacing();
	    const rowSpacing = this.rowSpacing();
	    const col = index % maxCols;
	    const row = Math.floor(index / maxCols);
	    const x = col * (itemWidth +110) + colSpacing / 2 - this.scrollBaseX() + 130;
	    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY() + 70;
	    const width = GAME_END_BUTTON_W;
	    const height = GAME_END_BUTTON_H;
	    return new Rectangle(x, y, width, height);
	};
	
	// バック画像に書き込むように変更
	Window_GameEnd.prototype.drawItem = function(index) {
	    const rect = this.itemLineRect(index);
	    this.drawSystem( rect.x-8, rect.y, index *GAME_END_BUTTON_W , 0, GAME_END_BUTTON_W, GAME_END_BUTTON_H, index == this._index);
	};

	// 画像を更新する
	var oldWindow_GameEndSelect20210413 = Window_MenuCommand.prototype.select;
	Window_GameEnd.prototype.select = function(index) {
	    oldWindow_GameEndSelect20210413.call(this, index);
	    this.refresh();
	};
	
	// 画像をウインドウに書き込む
	Window_GameEnd.prototype.drawSystem = function(x, y, sx, sy, w, h, flag) {
	    var bitmap = ImageManager.loadPicture(parameters['GAME_END_BUTTON']);
	    // ローディング遅延対策
	     bitmap.addLoadListener(function() {
			this.contents.blt(bitmap, sx, sy, w, h, x, y);
			// 暗くする為に半透明で書き込む
			if(!flag){ this.contents.fillRect( x, y, w, h, parameters['IMAGE_BLACK']); }
	    }.bind(this));
	};
	
	// カーソルの表示は意味ないので消す
	Window_GameEnd.prototype.refreshCursor = function() {
	};
	// 不要なので削除
	Window_GameEnd.prototype.drawItemBackground = function(index) {
	//const rect = this.itemRect(index);
	//    this.drawBackgroundRect(rect);
	};

	// 表示位置の調整
	Scene_GameEnd.prototype.commandWindowRect = function() {
	    const ww = Graphics.boxWidth;
	    const wh = 300;
	    const wx = 0;
	    const wy = this.mainAreaTop() +100;
	    return new Rectangle(wx, wy, ww, wh);
	};
	// ボタンの表示位置を変更
	Scene_GameEnd.prototype.buttonY = function() {
	    const offsetY = Math.floor((this.buttonAreaHeight() - 48) / 2);
	    return this.buttonAreaTop() + offsetY + 430;
	};
	//----------------------------------------------------------------------------------
	//　オプションメニュー
	//----------------------------------------------------------------------------------
	// スイッチが外部によって変化していたら対応する
	Scene_Menu.prototype.commandOptions = function() {
		ConfigManager["mySwitch"] = $gameSwitches.value(parameters['OPTION_SWITCH']);
		SceneManager.push(Scene_Options);
	};

	// バック画像を使う
	var old_Optionsinit20210406 = Window_Options.prototype.initialize;
	Window_Options.prototype.initialize = function(rect) {
	    old_Optionsinit20210406.call(this, rect);
	    this.setBackgroundType(1);
	};
	
	// バックに画像を表示
	Window_Options.prototype.refreshDimmerBitmap = function() {
	    if (this._dimmerSprite) {
	    	this._dimmerSprite.bitmap.destroy();
	        //this._dimmerSprite.bitmap = ImageManager.loadPicture(parameters['IMAGE_LIST3'][$gameVariables.value(parameters['IMAGE_V3'])]);
	    }
	};

	var OpUp = Window_Options.prototype.update;
	Window_Options.prototype.update = function () {
		OpUp.call(this);
		$gameMap.update(true);
		$gameScreen.update();
	}

	// 背景に画像を表示 ブラーを削除
	var old_Window_OptionscreateBackground20210407 = Scene_Options.prototype.createBackground
	Scene_Options.prototype.createBackground = function () {
		old_Window_OptionscreateBackground20210407.call(this);
		this._backgroundSprite2 = new Sprite();
		//this._backgroundSprite2.bitmap = ImageManager.loadPicture(parameters['IMAGE_LIST5'][$gameVariables.value(parameters['IMAGE_V5'])]);
		//this._backgroundSprite2.y = this.mainAreaTop() + 100 + 4;
		this._backgroundSprite2.bitmap = SceneManager.backgroundBitmap();
		this.addChild(this._backgroundSprite2);
		this.setBackgroundOpacity(255);
		//this._backgroundSprite1 = new Sprite();
		//ImageManager.loadPicture(parameters['ITEM_BUTTON_IMAGE']);
		//this._backgroundSprite1.bitmap = ImageManager.loadPicture(parameters['IMAGE_LIST3']);
		//this._backgroundSprite1.y = 0;
		//this.addChild(this._backgroundSprite1);
	};
	
	// 画像を削除しないように変更
	Window_Options.prototype.destroy = function(options) {
	    this.destroyContents();
	    Window.prototype.destroy.call(this, options);
	};
	// メニューの数の変更
	Window_Options.prototype.maxCols = function() {
	    return 5;
	};

	Window_Options.prototype.colSpacing = function () {
		return 52;
	};
	var option_icon_width = 130;
	var option_icon_height = 83;
	var option_offset_x = 55;
	var option_offset_y = 37;

	Window_Options.prototype.rowSpacing = function () {
		return 0;
	};

	Window_Options.prototype.scrollBaseX = function () {
		return this._scrollBaseX - option_offset_x;
	};

	Window_Options.prototype.scrollBaseY = function () {
		return this._scrollBaseY - option_offset_y;
	};

	Window_Options.prototype.statusWidth = function () {
		return 10;
	};

	Window_Options.prototype.drawItem = function (index) {
		const title = this.commandName(index);
		const status = this.statusText(index);
		const rect = this.itemLineRect(index);
		const statusWidth = this.statusWidth();
		const titleWidth = rect.width - statusWidth;
		this.resetTextColor();
		this._backgroundSprite = new Sprite();
		this._backgroundSprite.bitmap = ImageManager.loadPicture(parameters['ITEM_BUTTON_IMAGE']);
		this._backgroundSprite.x = rect.x - 15;// + option_offset_x;
		this._backgroundSprite.y = rect.y - 27;// + option_offset_y;
		this.addChildToBack(this._backgroundSprite);
		//this.addChild(this._backgroundSprite);
		this.changePaintOpacity(this.isCommandEnabled(index));
		//上下2行に変更
		this.drawText(title, rect.x, rect.y-16, rect.width, "center");
		this.drawText(status, rect.x, rect.y + 17, rect.width, "center");
	};

	Window_Options.prototype.itemWidth = function () {
		return option_icon_width;
	};
	//  画像の横サイズを変更
	Window_Options.prototype.itemHeight = function () {
		return option_icon_height;
	};

	//Window_Options.prototype.itemTextAlign = function() {
	//    return "center";
	//};
	// 描写位置の調整
	Window_Options.prototype.itemRect = function(index) {
	    const maxCols = this.maxCols();
	    const itemWidth = this.itemWidth();
	    const itemHeight = this.itemHeight();
	    const colSpacing = this.colSpacing();
	    const rowSpacing = this.rowSpacing();
	    const col = index % maxCols;
	    const row = Math.floor(index / maxCols);
		const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
		const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY() + 70;
	    const width = itemWidth - colSpacing;
	    const height = itemHeight - rowSpacing;
	    return new Rectangle(x, y, width, height);
	};

	Window_Options.prototype.drawBackgroundRect = function (rect) {
		const c1 = ColorManager.itemBackColor1();
		const c2 = ColorManager.itemBackColor2();
		const x = rect.x + 15;
		const y = rect.y + 24;
		const w = rect.width;
		const h = rect.height;
		//this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
		//this.contentsBack.strokeRect(x, y, w, h, c1);
	};

	// オプションコマンドを追加。
	var old_addGeneralOptions20210406 = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function() {
		this.addCommand(TextManager.alwaysDash, "alwaysDash");
		//this.addCommand(TextManager.commandRemember, "commandRemember");
		//this.addCommand(TextManager.touchUI, "touchUI");
	};

	Window_Options.prototype.addVolumeOptions = function () {
		this.addCommand(TextManager.bgmVolume, "bgmVolume");
		this.addCommand(TextManager.bgsVolume, "bgsVolume");
		this.addCommand(TextManager.meVolume, "meVolume");
		this.addCommand(TextManager.seVolume, "seVolume");
	};
	
	// オプションスイッチが変更された時にスイッチ状態が反映されるように変更。
	Window_Options.prototype.processOk = function() {
	    const index = this.index();
	    const symbol = this.commandSymbol(index);
	    if (this.isVolumeSymbol(symbol)) {
	        this.changeVolume(symbol, true, true);
	    } else {
	        this.changeValue(symbol, !this.getConfigValue(symbol));
	        if(symbol.includes("mySwitch")){
	        	$gameSwitches.setValue(parameters['OPTION_SWITCH'], ConfigManager[symbol]);
	        }
	    }
	};
	// 表示位置の調整
	Scene_Options.prototype.optionsWindowRect = function () {
		//const ww = Graphics.boxWidth;
		//const wh = 240;
		//const wx = 0;
		//const wy = this.mainAreaTop() +300;
	    //return new Rectangle(wx, wy, ww, wh);
		const ww = Graphics.boxWidth;
		const wh = 240;
		const wx = -15;
		const wy = this.mainAreaTop() + 335;//435 + 10;
		return new Rectangle(wx, wy, ww, wh);
	};
	
	// 項目数を7から8へ変更。
	Scene_Options.prototype.maxCommands = function() {
	    // Increase this value when adding option items.
	    //return $gameSwitches.value(OPTION_ON) ? 8 : 5;
		return 5;
	};

	// 戻るボタンの表示位置を変更
	Scene_Options.prototype.buttonY = function () {
		const offsetY = Math.floor((this.buttonAreaHeight() - 48) / 2);
		return this.buttonAreaTop() + offsetY + 524;
	};

	// 戻るボタンの表示位置を変更
	Scene_Options.prototype.buttonX = function () {
		const offsetX = Math.floor((this.buttonAreaWidth() - 48) / 2);
		return this.buttonAreaRight() + offsetX - 100;
	};
	
	// 新規ゲームの時にオプションスイッチを反映する
	//var old_createGameObjects20210406 = DataManager.createGameObjects;
	//DataManager.createGameObjects = function() {
	//	old_createGameObjects20210406.call(this);
	///    $gameSwitches.setValue(parameters['OPTION_SWITCH'], ConfigManager["mySwitch"]);
	//};
	
	// オプションスイッチ情報の保存
	var old_makeData20210406 = ConfigManager.makeData;
	ConfigManager.makeData = function() {
	    const config = old_makeData20210406.call(this);
	    config.mySwitch = this.mySwitch;
	    return config;
	};

	// オプションスイッチ情報の初期化
	var old_applyData20210406 = ConfigManager.applyData;
	ConfigManager.applyData = function(config) {
	    old_applyData20210406.call(this, config);
	    this.mySwitch = this.readFlag(config, "mySwitch", false);
	};
	
	// 処理を元に戻す
	Window_Options.prototype.cursorRight = function() {
		Window_Selectable.prototype.cursorRight.call(this);
	}
	// 処理を元に戻す
	Window_Options.prototype.cursorLeft = function() {
		Window_Selectable.prototype.cursorLeft.call(this);
	};
	
	//// タイトルでは非表示にする為の処理
	//Scene_Title.prototype.commandOptions = function() {
	//    this._commandWindow.close();
	//    SceneManager.push(Scene_Options2);
	//};
	
	//// 継承して処理を変更
	//function Scene_Options2() {
	//    this.initialize(...arguments);
	//}
	//Scene_Options2.prototype = Object.create(Scene_Options.prototype);
	//Scene_Options2.prototype.constructor = Scene_Options2;
	//function Window_Options2() {
	//    this.initialize(...arguments);
	//}
	//Scene_Options2.prototype.maxCommands = function() {
	//    // Increase this value when adding option items.
	//    return 7;
	//};
	//Scene_Options2.prototype.createOptionsWindow = function() {
	//    const rect = this.optionsWindowRect();
	//    this._optionsWindow = new Window_Options2(rect);
	//    this._optionsWindow.setHandler("cancel", this.popScene.bind(this));
	//    this.addWindow(this._optionsWindow);
	//};
	//Window_Options2.prototype = Object.create(Window_Options.prototype);
	//Window_Options2.prototype.constructor = Window_Options2;
	//Window_Options2.prototype.addGeneralOptions = function() {
	//    old_addGeneralOptions20210406.call(this);
	//};

	//----------------------------------------------------------------------------------
	//　セーブメニュー
	//----------------------------------------------------------------------------------
	// タイプ1に変更
	// タイプ1を改変して背景画像を表示するようにしているため。
	var old_Window_SavefileListinit20210406 = Window_SavefileList.prototype.initialize;
	Window_SavefileList.prototype.initialize = function(rect) {
	    old_Window_SavefileListinit20210406.call(this, rect);
	    this.setBackgroundType(1);
	};
	
	// バックに画像を表示
	Window_SavefileList.prototype.refreshDimmerBitmap = function() {
	  //  if (this._dimmerSprite) {
	 //this._dimmerSprite.bitmap.destroy();
	  //      this._dimmerSprite.bitmap = ImageManager.loadPicture(parameters['IMAGE_LIST4']);
	  //  }
	};

	//ブラーを削除
	var old_Window_SavefilecreateBackground20210407 = Window_SavefileList.prototype.createBackground
	Window_SavefileList.prototype.createBackground = function () {
		old_Window_SavefilecreateBackground20210407.call(this);
		//this._backgroundSprite2 = new Sprite();
		//this._backgroundSprite2.bitmap = SceneManager.backgroundBitmap();
		//this.addChild(this._backgroundSprite2);
		//this.setBackgroundOpacity(255);
		//alias.apply(this, arguments);
		//this._backgroundSprite.filters.shift();     // remove first filter (blur)
	};
	
	var save_num = 7;
	
	// 画像を削除しないように変更
	Window_SavefileList.prototype.destroy = function(options) {
	    this.destroyContents();
	    Window.prototype.destroy.call(this, options);
	};

	Window_SavefileList.prototype.scrollBaseY = function () {
		return this._scrollBaseY + 10;
	};

	// メニューの数の変更
	Window_SavefileList.prototype.maxCols = function() {
		return save_num;
	};

	Window_SavefileList.prototype.itemTextAlign = function() {
	    return "center";
	};
	Window_SavefileList.prototype.itemWidth = function () {
		return 94;
	};
	Window_SavefileList.prototype.itemHeight = function() {
		return 98+4;
	};


	Window_SavefileList.prototype.colSpacing = function () {
		return 4;
	};

	Window_SavefileList.prototype.rowSpacing = function () {
		return 8;
	};

	// 描写位置の調整
	Window_SavefileList.prototype.itemRect = function (index) {
		const maxCols = this.maxCols();
		const itemWidth = this.itemWidth();
		const itemHeight = this.itemHeight();
		const colSpacing = this.colSpacing();
		const rowSpacing = this.rowSpacing();
		const col = index % maxCols;
		const row = Math.floor(index / maxCols);
		const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
		const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
		const width = itemWidth - colSpacing;
		const height = itemHeight - rowSpacing;
		return new Rectangle(x, y, width, height);
	};

	// 顔アイコンを表示するように変更
	Window_SavefileList.prototype.drawContents = function(info, rect) {
		let data = info.faces[0];
		const magicOffset = 8;
		this.drawFace(data[0], data[1], rect.x, rect.y, this.itemWidth - magicOffset, this.itemHeight - magicOffset);
		const bottom = rect.y + rect.height;
		    const lineHeight = this.lineHeight();
		    const y2 = bottom - lineHeight - 4;
		    if (y2 >= lineHeight) {
		        this.drawPlaytime(info, rect.x, y2, rect.width);
		    }
	};

	Window_SavefileList.prototype.drawFace = function (
		faceName, faceIndex, x, y, width, height
	) {
		width = width || ImageManager.faceWidth;
		height = height || ImageManager.faceHeight;
		const bitmap = ImageManager.loadFace(faceName);
		const pw = 90;//ImageManager.faceWidth;
		const ph = 90;//ImageManager.faceHeight;
		const sw = Math.min(width, pw);
		const sh = Math.min(height, ph);
		const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
		const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
		const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
		const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
		this.contentsBack.blt(bitmap, sx, sy, sw, sh, dx-35, dy-22);//画像位置のズレ修正
	};

	//表示順番を変更 顔アイコン→文字情報
	Window_SavefileList.prototype.drawItem = function(index) {
	    const savefileId = this.indexToSavefileId(index);
	    const info = DataManager.savefileInfo(savefileId);
	    const rect = this.itemRectWithPadding(index);
	    this.resetTextColor();
	    this.changePaintOpacity(this.isEnabled(savefileId));
	    if (info) {
	        this.drawContents(info, rect);
	    }
	    this.drawTitle(savefileId, rect.x, rect.y + 4);
	};
	// 最後に選ばれたセーブが見えるようにインデックスを調整
	Window_SavefileList.prototype.selectSavefile = function(savefileId) {
	    const index = Math.max(0, this.savefileIdToIndex(savefileId));
	    this.select(index);
	    this.setTopRow(index - 9);
	};
	// 表示位置の調整
	Scene_File.prototype.listWindowRect = function () {
		const ww = Graphics.boxWidth;
		const wh = 140;
	    const wx = 15;
		const wy = this.mainAreaBottom() - wh+20;

	    return new Rectangle(wx, wy, ww, wh);
	};

	//セーブの文字編集
	Window_SavefileList.prototype.drawTitle = function (savefileId, x, y) {
		if (savefileId === 0) {
			this.drawText(TextManager.autosave, x, y, 180);
		} else {
			//this.drawText(TextManager.file + " " + savefileId, x, y, 90);
			this.drawText(savefileId, x, y, 180);
		}
	};

	// 不要なヘルプ等を削除
	Scene_File.prototype.create = function() {
	    Scene_MenuBase.prototype.create.call(this);
	    DataManager.loadAllSavefileImages();
	    this.createListWindow();
	};
	
	// 戻るボタンの表示位置を変更
	Scene_File.prototype.buttonY = function () {
		const offsetY = Math.floor((this.buttonAreaHeight() - 48) / 2);
		return this.buttonAreaTop() + offsetY + 524;
	};

	// 戻るボタンの表示位置を変更
	Scene_File.prototype.buttonX = function () {
		const offsetX = Math.floor((this.buttonAreaWidth() - 48) / 2);
		return this.buttonAreaRight() + offsetX - 100;
	};
	//　セーブ数を増やす
	DataManager.maxSavefiles = function() {
		return save_num+1;
	};
	
	//----------------------------------------------------------------------------------
	//　アイテムメニュー
	//----------------------------------------------------------------------------------
	// タイプ2に変更
	// 背景非表示
	var old_Window_ItemCategory20210407 = Window_ItemCategory.prototype.initialize;
	Window_ItemCategory.prototype.initialize = function(rect) {
	    old_Window_ItemCategory20210407.call(this, rect);
	    this.setBackgroundType(1);
	};
	// 背景非表示
	var old_Window_ItemListinit20210407 = Window_ItemList.prototype.initialize;
	Window_ItemList.prototype.initialize = function(rect) {
	    old_Window_ItemListinit20210407.call(this, rect);
		this.setBackgroundType(1);
		//this._scrollBaseY = -8;
	};

	// バックに画像を表示
	Window_ItemList.prototype.refreshDimmerBitmap = function() {
	    if (this._dimmerSprite) {
	    	this._dimmerSprite.bitmap.destroy();
	        //this._dimmerSprite.bitmap = ImageManager.loadPicture(parameters['IMAGE_LIST3'][$gameVariables.value(parameters['IMAGE_V3'])]);
	    }
	};

	// 画像とアイコンを表示 ブラーを削除
	var old_Window_ItemcreateBackground20210407 = Scene_Item.prototype.createBackground
	Scene_Item.prototype.createBackground = function() {
		old_Window_ItemcreateBackground20210407.call(this);
	    this._backgroundSprite2 = new Sprite();
	    //this._backgroundSprite2.bitmap = ImageManager.loadPicture(parameters['IMAGE_LIST5'][$gameVariables.value(parameters['IMAGE_V5'])]);
		//this._backgroundSprite2.y = this.mainAreaTop() + 100 + 4;
		this._backgroundSprite2.bitmap = SceneManager.backgroundBitmap();
		this.addChild(this._backgroundSprite2);
		this.setBackgroundOpacity(255);
		//this._backgroundSprite1 = new Sprite();
		//ImageManager.loadPicture(parameters['ITEM_BUTTON_IMAGE']);
		//this._backgroundSprite1.bitmap = ImageManager.loadPicture(parameters['IMAGE_LIST5']);
		//this._backgroundSprite1.y =0;
		//this.addChild(this._backgroundSprite1);
	};

	var popscene = Scene_Item.prototype.popScene;
	Scene_Item.prototype.popScene = function () {
		$gameSwitches.setValue(2, false);
		popscene.call(this);
	};


	Window_ItemList.prototype.maxCols = function () {
		return 5;
	};



	//いじると5個未満のアイテムの表示が変わる
	Window_ItemList.prototype.maxItems = function () {
		return 5;
	};

	//Window_ItemList.prototype.itemTextAlign = function () {
	//	return "center";
	//};
	Window_ItemList.prototype.colSpacing = function () {
		return 52;
	};
	var item_icon_width = 130;
	var item_icon_height = 88;
	Window_ItemList.prototype.rowSpacing = function () {
		return 0;
	};

	Window_ItemList.prototype.scrollBaseX = function () {
		return this._scrollBaseX-40;
	};

	Window_ItemList.prototype.scrollBaseY = function () {
		return this._scrollBaseY+8;
	};

	Window_ItemList.prototype.itemWidth = function () {
		return item_icon_width;
	};
	//  画像の横サイズを変更
	Window_ItemList.prototype.itemHeight = function () {
		return item_icon_height;
	};

	////列の横サイズを変更
	//Window_ItemList.prototype.lineHeight = function () {
	//	return item_icon_width;
	//};
	//// 列の縦サイズを変更
	//Window_ItemList.prototype.lineWidth = function () {
	//	return item_icon_height;
	//};

	//Scene_Item.prototype.maxCols = function () {
	//	return 3;
	//};

	//Scene_Item.prototype.itemHeight = function () {
	//	return 95;
	//};
	//Scene_Item.prototype.itemWidth = function () {
	//	return 95;
	//};

	//Scene_Item.prototype.itemHeight = function () {
	//	return 95;
	//};
	//Scene_Item.prototype.itemWidth = function () {
	//	return 95;
	//};

	// アイテム種類の表示位置の調整
	Scene_Item.prototype.categoryWindowRect = function() {
	    const wx = 0;
	    const wy = this.mainAreaTop() +100;
	    const ww = Graphics.boxWidth;
	    const wh = this.calcWindowHeight(1, true);
	    return new Rectangle(wx, wy, ww, wh);
	};
	// アイテムリストの表示位置の調整
	Scene_Item.prototype.itemWindowRect = function() {
	    const ww = Graphics.boxWidth;
	    const wh = 240;
	    const wx = 0;
		const wy = this.mainAreaTop() + 435+10;
	    return new Rectangle(wx, wy, ww, wh);
	};
	
	// ヘルプの削除
	Scene_Item.prototype.create = function() {
	    Scene_ItemBase.prototype.create.call(this);
	    this.createItemWindow();
	    this.createActorWindow();
	};

	// 戻るボタンの表示位置を変更
	Scene_Item.prototype.buttonY = function() {
	    const offsetY = Math.floor((this.buttonAreaHeight() - 48) / 2);
	    return this.buttonAreaTop() + offsetY + 524;
	};

	// 戻るボタンの表示位置を変更
	Scene_Item.prototype.buttonX = function () {
		const offsetX = Math.floor((this.buttonAreaWidth() - 48) / 2);
		return this.buttonAreaRight() + offsetX-100;
	};

	Scene_Item.prototype.createItemWindow = function() {
	    const rect = this.itemWindowRect();
	    this._itemWindow = new Window_ItemList(rect);
	    this._itemWindow.setHelpWindow(this._helpWindow);
	    this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
	    this._itemWindow.setHandler("cancel", this.popScene.bind(this));
	    this.addWindow(this._itemWindow);
	    this._itemWindow.setCategory("item");
	    this.onCategoryOk();
	};

	//Scene_Item.prototype.createItemWindow = function () {
	//	const rect = this.itemWindowRect();
	//	this._itemWindow = new Window_ItemList(rect);
	//	this._itemWindow.setHelpWindow(this._helpWindow);
	//	this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
	//	this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
	//	this.addWindow(this._itemWindow);
	//	this._categoryWindow.setItemWindow(this._itemWindow);
	//	if (!this._categoryWindow.needsSelection()) {
	//		this._itemWindow.y -= this._categoryWindow.height;
	//		this._itemWindow.height += this._categoryWindow.height;
	//		this._itemWindow.createContents();
	//		this._categoryWindow.update();
	//		this._categoryWindow.hide();
	//		this._categoryWindow.deactivate();
	//		this.onCategoryOk();
	//	}
	//};

	Window_ItemList.prototype.drawIcon = function (iconIndex, x, y) {
		const bitmap = ImageManager.loadSystem("IconSet");
		const pw = ImageManager.iconWidth;
		const ph = ImageManager.iconHeight;
		const sx = (iconIndex % 16) * pw;
		const sy = Math.floor(iconIndex / 16) * ph;
		this.contentsBack.blt(bitmap, sx, sy, 80/*pw*/, 80/*ph*/, x, 0);
	};

	//アイテムアイコンをアイコン画像だけにする
	Window_ItemList.prototype.drawItemName = function (item, x, y, width) {
		if (item) {
			const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
			const textMargin = ImageManager.iconWidth + 4;
			const itemWidth = Math.max(0, width - textMargin);
			this.resetTextColor();
			this._backgroundSprite = new Sprite();
			this._backgroundSprite.bitmap = ImageManager.loadPicture(parameters['ITEM_BUTTON_IMAGE']);
			this._backgroundSprite.x = x;
			this._backgroundSprite.y = y;
			//this._backgroundSprite.changePaintOpacity(255);

			this.addChildToBack(this._backgroundSprite);
			this.drawIcon(item.iconIndex, x + 7, iconY);

			//テキストは表示しない
			//this.drawText(item.name, x + textMargin, y, itemWidth);
		}
		else
		{
			const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
			const textMargin = ImageManager.iconWidth + 4;
			const itemWidth = Math.max(0, width - textMargin);
			this.resetTextColor();
			this._backgroundSprite = new Sprite();
			this._backgroundSprite.bitmap = ImageManager.loadPicture(parameters['NO_ITEM_BUTTON_IMAGE']);
			this._backgroundSprite.x = x;
			this._backgroundSprite.y = y;
			//this._backgroundSprite.changePaintOpacity(255);
			this.addChildToBack(this._backgroundSprite);
			//this.drawIcon(item.iconIndex, x + 7, iconY);
		}
	};
	// カーソルの表示は意味ないので消す
	//Window_ItemList.prototype.refreshCursor = function () {
	//};

	Window_ItemList.prototype.refreshCursor = function () {
		if (this._cursorAll) {
			this.refreshCursorForAll();
		} else if (this.index() >= 0) {
			const rect = this.itemRect(this.index());
			this.setCursorRect(rect.x-2, rect.y, rect.width+4, rect.height+2);
		} else {
			this.setCursorRect(0, 0, 0, 0);
		}
	};

	Window_ItemList.prototype.drawAllItems = function () {
		const topIndex = this.topIndex();
		for (let i = 0; i < this.maxVisibleItems(); i++) {
			const index = topIndex + i;
			if (index < this.maxItems()) {
				this.drawItemBackground(index);
				this.drawItem(index);
			}
		}
	};

	//　アイテムの個数表示を消す
	Window_ItemList.prototype.drawItem = function(index) {
	    const item = this.itemAt(index);
		if (item) {
			const numberWidth = this.numberWidth();
			const rect = this.itemLineRect(index);
			this.changePaintOpacity(255);
			//this.changePaintOpacity(this.isEnabled(item));
			this.drawItemName(item, rect.x - 15, rect.y - 24, rect.width - numberWidth);
			//this.drawItemNumber(item, rect.x, rect.y, rect.width);
			this.changePaintOpacity(1);
		}
		else
		{
			const numberWidth = this.numberWidth();
			const rect = this.itemLineRect(index);
			this.changePaintOpacity(255);
			this.drawItemName(item, rect.x - 15, rect.y - 24, rect.width - numberWidth);
			//this.drawItemNumber(item, rect.x, rect.y, rect.width);
			this.changePaintOpacity(1);
		}
	};
})();

