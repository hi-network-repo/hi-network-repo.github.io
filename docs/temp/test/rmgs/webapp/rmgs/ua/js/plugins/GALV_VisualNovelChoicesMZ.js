//-----------------------------------------------------------------------------
//  Galv's Visual Novel Choices MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_VisualNovelChoicesMZ.js
//-----------------------------------------------------------------------------
//  2020-11-17 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_VisualNovelChoices = true;

var Galv = Galv || {};            // Galv's main object
Galv.VNC = Galv.VNC || {};        // Plugin object
Galv.VNC.pluginName = "GALV_VisualNovelChoicesMZ";

//-----------------------------------------------------------------------------
/*:ja
 * @plugindesc (v.1.0) 「選択肢」のメッセージボックスの表示方法を変更し、ビジュアルノベルのように表示します。
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 * @orderAfter GALV_MessageStylesMZ
 * 
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * https://galvs-scripts.com/2020/11/17/mz-visual-novel-choices/
 *
 *   Galv's Visual Novel Choices
 * 
 * 選択肢をより視覚的なスタイルで表示します。
 * 選択ボタンの画像は/img/system/フォルダに入れて、
 * 名前を VNButtons.png にしてください。
 * これは、各ボタンを1つのファイルにまとめたものです。
 *
 * このプラグインに必要なサンプル画像は下記のMASTER DEMO内にあります。
 * https://galvs-scripts.com/rpgmaker/rmmz-plugins/
 * 
 * 「コマンド幅」と「コマンド高さ」の設定はボタンのサイズをコントロールし、
 * 「コマンドギャップ」はボタンとボタンの間のスペースをコントロールします。
 * 「コマンド幅」プラグインパラメーターが
 * 画像のピクセル幅と同じであることを確認してください。
 * 
 * VNButtonsファイルの最初のボタン画像はボタン0で、
 * これはボタンの上に表示されるカーソル画像です。
 * 選択オプションテキストに何も指定されていない場合に
 * 表示されるデフォルトのボタンは、ボタン1（カーソル画像の下）になります。
 * 
 * 選択肢オプションのテキストに B[x] を使用すると、
 * その選択肢（xは行番号）とボタンの画像を指定できます。
 *  
 * 使用例
 *   ◆選択肢の表示：はいB[2], いいえB[4] (ウィンドウ, 右, #1, #2)
 *  ：はいB[2]のとき
 *    ◆
 *  ：いいえB[4]のとき
 *    ◆
 *  ：分岐終了
 * 
 * プラグイン設定の ”無効化ボタン ”は、他のプラグインを使っている場合に、
 * 次のような選択コマンドを無効化するためのものです。
 * HIME Disabled Choice Conditions
 * 
 * ----------------------------------------------------------------------------
 *  スクリプト呼び出し:
 * ----------------------------------------------------------------------------
 * 
 *        $gameSystem.vnChoices = status;      // status:(true / false)
 * 
 * @param Command Width
 * @text コマンド幅
 * @desc 選択コマンドの幅。VNButtons.pngの幅以下の必要があります。
 * @default 700
 * @type number
 * 
 * @param Command Height
 * @text コマンド高さ
 * @desc 選択コマンドの高さ
 * @default 48
 * @type number
 * 
 * @param Always Middle
 * @text 常に中央
 * @desc 「選択肢を表示」ウィンドウの位置に関係なく、中央に選択肢を表示します。
 * @default true
 * @type boolean
 * @on 常に中央に表示
 * @off ウィンドウ位置に従う
 * 
 * @param Message Gap
 * @text メッセージとの距離
 * @desc 選択肢がメッセージウィンドウから離れて表示される距離
 * @default 0
 * @type number
 * 
 * @param Disabled Button
 * @text 無効化ボタン
 * @desc 無効化された選択肢のボタンを表示するために使用される行番号 (選択肢を無効化できるプラグインを使用している場合)
 * @default 3
 * @type number
 * 
 * @requiredAssets img/system/VNButtons
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.VNC.width = Number(PluginManager.parameters(Galv.VNC.pluginName)["Command Width"]);
Galv.VNC.height = Number(PluginManager.parameters(Galv.VNC.pluginName)["Command Height"]);
Galv.VNC.alwaysMid = PluginManager.parameters(Galv.VNC.pluginName)["Always Middle"].toLowerCase() == 'true';
Galv.VNC.msgGap = Number(PluginManager.parameters(Galv.VNC.pluginName)["Message Gap"]);
Galv.VNC.disableBtn = Number(PluginManager.parameters(Galv.VNC.pluginName)["Disabled Button"]);

// Cache
Galv.VNC.Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
Scene_Boot.prototype.loadSystemImages = function() {
    ImageManager.loadSystem('VNButtons');
	Galv.VNC.Scene_Boot_loadSystemImages.call(this);
};

// Choice stuff
Galv.VNC.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.VNC.Game_System_initialize.call(this);
	this.vnChoices = true;
};

// Overwrite
Window_ChoiceList.prototype.textHeight = Window_ChoiceList.prototype.lineHeight;
Galv.VNC.Window_ChoiceList_lineHeight = Window_ChoiceList.prototype.lineHeight;
Window_ChoiceList.prototype.lineHeight = function() {return $gameSystem.vnChoices ? Galv.VNC.height : Galv.VNC.Window_ChoiceList_lineHeight.call(this);};
Galv.VNC.Window_ChoiceList_itemHeight = Window_ChoiceList.prototype.itemHeight;
Window_ChoiceList.prototype.itemHeight = function() {return $gameSystem.vnChoices ? Galv.VNC.height : Galv.VNC.Window_ChoiceList_itemHeight.call(this);};

Galv.VNC.Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem;
Window_ChoiceList.prototype.drawItem = function(index) {
	if ($gameSystem.vnChoices) {
		const rect = this.itemRectForText(index);
		this.drawButton(index,rect.y);
		if (index === this._index) this.drawButton(index,rect.y,true);
		const offset = 0;//(this.lineHeight() - this.textHeight()) * 0.5;
		this.drawTextEx(this.commandName(index), rect.x, rect.y + offset);
	} else {
		Galv.VNC.Window_ChoiceList_drawItem.call(this,index);
	};
};

Galv.VNC.Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function() {
	Galv.VNC.Window_ChoiceList_updatePlacement.call(this);
	if ($gameSystem.vnChoices && Galv.VNC.alwaysMid) {
		this.x = (Graphics.boxWidth - this.width) / 2;
	};
	if (this._messageWindow.y >= Graphics.boxHeight / 2) {
		this.y -= Galv.VNC.msgGap;
    } else {
        this.y += Galv.VNC.msgGap;
    };
};

Galv.VNC.Window_ChoiceList__refreshCursor = Window_ChoiceList.prototype._refreshCursor;
Window_ChoiceList.prototype._refreshCursor = function() {
	if ($gameSystem.vnChoices) {
		this._cursorSprite.opacity = 0;
	} else {
		Galv.VNC.Window_ChoiceList__refreshCursor.call(this);
	};
};

Galv.VNC.Window_ChoiceList_drawItemBackground = Window_ChoiceList.prototype.drawItemBackground;
Window_ChoiceList.prototype.drawItemBackground = function(index) {
	if ($gameSystem.vnChoices) return;
	Galv.VNC.Window_ChoiceList_drawItemBackground.call(this,index);
};

Window_ChoiceList.prototype.drawButton = function(index,y,cursor) {
    const bitmap = ImageManager.loadSystem('VNButtons');
    const pw = Galv.VNC.width;
    const ph = Galv.VNC.height;
	let bgId = 0;

    const sx = 0;
	if (cursor) {
		bgId = 0;
	} else {
		if (this._list[index].enabled === false || !this.choice_background) {
			bgId = Galv.VNC.disableBtn;
		} else {
			bgId = this.choice_background[index] ? this.choice_background[index] : 1;
		};
	};
    const sy = bgId * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, 0, y);
};

Galv.VNC.Window_ChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
	this.setupVNChoices();
	Galv.VNC.Window_ChoiceList_start.call(this);
};

Window_ChoiceList.prototype.setupVNChoices = function() {
	this.ChoiceSprites = [];
	this.choice_background = [];
	this._vnIndex = this._index;
    if ($gameSystem.vnChoices) {
      this.opacity = 0;
	} else {
      this.opacity = 255;
	};
};

Galv.VNC.Window_ChoiceList_update = Window_ChoiceList.prototype.update;
Window_ChoiceList.prototype.update = function() {
	Galv.VNC.Window_ChoiceList_update.call(this);
	if (this._vnIndex != this._index) {
		this.refresh();
		this._vnIndex = this._index;
	}
};

Galv.VNC.Window_ChoiceList_updateBackground = Window_ChoiceList.prototype.updateBackground;
Window_ChoiceList.prototype.updateBackground = function() {
	if ($gameSystem.vnChoices) {
		this._background = 2;
   	 	this.setBackgroundType(this._background);
	} else {
		Galv.VNC.Window_ChoiceList_updateBackground.call(this);
	};
    
};

Galv.VNC.Window_ChoiceList_convertEscapeCharacters = Window_ChoiceList.prototype.convertEscapeCharacters;
Window_ChoiceList.prototype.convertEscapeCharacters = function(text,index) {
	text = text.replace(/\\/g, '\x1b');
	text = text.replace(/\x1b\x1b/g, '\\');
	text = text.replace(/\x1bB\[(\d+)\]/gi, function() {
		this.choice_background[index] = parseInt(arguments[1]);
        return "";
    }.bind(this));
	
	return Galv.VNC.Window_ChoiceList_convertEscapeCharacters.call(this,text);
};

Window_ChoiceList.prototype.itemRectForText = function(index) {
    let rect = this.itemRect(index);
	if ($gameSystem.vnChoices) {

		let txt = $gameMessage._choices[index];
		
		// count icon code
		let icons = txt.match(/\\i\[/g) || txt.match(/\\I\[/g);
		icons = icons ? icons.length * 36 : 0;
		
		txt = this.convertEscapeCharacters(txt,index);
		txt = txt.replace(/i\[\d*\]/g,"");
		txt = txt.replace(/I\[\d*\]/g,"");
		
		txt = txt.replace(/c\[\d*\]/g,"");
		txt = txt.replace(/C\[\d*\]/g,"");
		const txtSize = this.textWidth(txt) + icons;

		rect.x = (Galv.VNC.width - txtSize) / 2;
	} else {
		rect.x += $gameSystem.windowPadding();
	};
	rect.width -= $gameSystem.windowPadding() * 2;
	return rect;
};

Window_ChoiceList.prototype.windowWidth = function() {
    const width = this.maxChoiceWidth() + this.padding * 2;
    return Math.min(width, Graphics.boxWidth);
};

Galv.VNC.Window_ChoiceList_maxChoiceWidth = Window_ChoiceList.prototype.maxChoiceWidth;
Window_ChoiceList.prototype.maxChoiceWidth = function() {
	if ($gameSystem.vnChoices) {
		return Galv.VNC.width;
	} else {
		return Galv.VNC.Window_ChoiceList_maxChoiceWidth.call(this);
	};
};

Galv.VNC.Window_Message_updateFloatChoiceWindow = Window_Message.prototype.updateFloatChoiceWindow;
Window_Message.prototype.updateFloatChoiceWindow = function() {
	if ($gameSystem.vnChoices) {
		let targetY = Graphics.height - this._choiceListWindow.height;
		if (this.y + this.height > targetY) targetY = 0;
			this._choiceListWindow.y = targetY;
		return;
	};
	Galv.VNC.Window_Message_updateFloatChoiceWindow.call(this);
};