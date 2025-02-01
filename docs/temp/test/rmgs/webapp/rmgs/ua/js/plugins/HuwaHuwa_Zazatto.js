//=============================================================================
// HuwaHuwa_Zazatto var1.1 komasaka!
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 画面をざざっとします
 * @author 白金　隅
 * @help 画面をざざっとします
 * ■プラグインコマンド
 * HuwaHuwa_Zazatto zazaOn    # ざざっと開始します（デフォルト）
 * HuwaHuwa_Zazatto zazaOff   # ざざっとを停止します
 * 
 * @command zazaOn
 * @text ざざっと開始
 * @desc ざざっと開始します
 * 
 * @arg noise_komakasa
 * @text ノイズの細かさ
 * @desc ノイズの細かさ
 * @type number
 * @default 200
 * 
 * @arg x_zazatto_on
 * @text 横揺れオンオフ
 * @desc 横揺れオンオフ
 * @type boolean
 * @default true
 * 
 * @arg x_zazatto_range
 * @text 横揺れの幅
 * @desc 横揺れの幅
 * @type number
 * @default 816
 * 
 * @arg y_zazatto_on
 * @text 縦揺れオンオフ
 * @desc 縦揺れオンオフ
 * @type boolean
 * @default false
 *
 * @arg y_zazatto_range
 * @text 縦揺れの幅
 * @desc 縦揺れの幅
 * @type number
 * @default 624
 * 
 * @command zazaOff
 * @text ざざっとを停止
 * @desc ざざっとを停止します
 * 
 */

(function () {
	const pluginName = "HuwaHuwa_Zazatto";
	var params = PluginManager.parameters(pluginName);

	var komakasa = 200;

	var _enableZaza = false;
	var sprites = [];
	var yokoyure_enable = true;
	var tateyure_enable = true;
	var yokoyure_range = 816;
	var tateyure_range = 624;

	PluginManager.registerCommand(pluginName, "zazaOn", function (args) {
		komakasa = args['noise_komakasa'];
		var num = komakasa;
		const width = Graphics.width;
		const height = Graphics.height;

		const renderTexture = PIXI.RenderTexture.create(width, height);
		var stage = SceneManager._scene;
		const renderer = Graphics.app.renderer;
		renderer.render(stage, renderTexture);
		stage.worldTransform.identity();
		const canvas = renderer.extract.canvas(renderTexture);
		for (var i = 0; i < num; i++) {
			const bitmap = new Bitmap(width, height);
			bitmap.context.drawImage(canvas, 0, 0);
			bitmap.baseTexture.update();
			var sprite = new ZazattoSprite(bitmap);
			sprites.push(sprite);
			var top = 624 / num * i;
			var bottom = 624 / num * (i + 1);
			sprite.bitmap.clearRect(0, 0, 816, top);//上クリア
			sprite.bitmap.clearRect(0, bottom, 816, 624 - bottom);//下クリア
			SceneManager._scene.addChild(sprite);
			//sprite.x = args['x_zazatto_on'];
			//sprite.x = Math.floor(Math.random() * 624)-312;
		}
		canvas.width = 0;
		canvas.height = 0;
		renderTexture.destroy({ destroyBase: true });
		//eval(args['x_zazatto_on'] || 'true');
		
		yokoyure_enable = eval(args['x_zazatto_on'] || 'true');
		tateyure_enable = eval(args['y_zazatto_on'] || 'false');
		yokoyure_range = args['x_zazatto_range'];
		tateyure_range = args['y_zazatto_range'];
	});

	PluginManager.registerCommand(pluginName, "zazaOff", function (args) {
		for (var i = 0; i < sprites.length; i++) {
			var sprite = sprites[i];
			SceneManager._scene.removeChild(sprite);
		}
		sprites.splice(0);
	});

	//-----------------------------------------------------------------------------
	// ZazattoSprite
	//-----------------------------------------------------------------------------

	function ZazattoSprite() {
		this.initialize.apply(this, arguments);
	}

	ZazattoSprite.prototype = Object.create(Sprite.prototype);
	ZazattoSprite.prototype.constructor = ZazattoSprite;

	ZazattoSprite.prototype.initialize = function (bitmap) {
		Sprite.prototype.initialize.call(this, bitmap);
	};

	ZazattoSprite.prototype.update = function () {
		Sprite.prototype.update.call(this);
		if (yokoyure_enable) {
			this.x = Math.floor(Math.random() * yokoyure_range) - (yokoyure_range / 2);
		}
		if (tateyure_enable) {
			this.y = Math.floor(Math.random() * tateyure_range) - (tateyure_range / 2);
		}
	};
})();