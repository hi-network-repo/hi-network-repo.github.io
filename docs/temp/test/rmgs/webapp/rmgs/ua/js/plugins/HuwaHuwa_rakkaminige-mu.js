//=============================================================================
// HuwaHuwa_rakkaminige-mu
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc ミニゲームのプラグイン
 * @author 白金　隅
 * @help ミニゲームのプラグインです
 * 
 * @command Start
 * @text 開始
 * @desc 開始
 * 
 * @command Stop
 * @text ストップ
 * @desc ストップ
 * 
 * @command Reset
 * @text リセット
 * @desc リセット
 * 
 */

(function () {
	'use strict';
	const pluginName = "HuwaHuwa_rakkaminige-mu";
	var params = PluginManager.parameters(pluginName);

	var isPlay = false;
	var count = 0;
	var dataIndex = 0;

	const melodyData = new Map([//[48, 12], [96, 10], [144, 13], [192, 7], [312, 8], [336, 10], [360, 13], [384, 12], [432, 10], [480, 8], [528, 12], [576, 5], [696, 7], [720, 8], [744, 5], [768, 12], [816, 5], [864, 9], [912, 15], [960, 13], [1080, 12],]);
		[48, 12], [96, 10], [144, 13],
		[192, 7], [312, 8], [336, 10], [360, 13],
		[384, 12], [432, 10], [480, 8], [528, 12],
		[576, 5], [696, 7], [720, 8], [744, 5],
		[768, 12], [816, 5], [864, 9], [912, 15],
		[960, 13], [1080, 12], [1104, 10], [1128, 8],
		[1152, 7], [1200, 4], [1248, 12], [1296, 10],
		[1344, 12],
		[1584, 12], [1632, 10], [1680, 13],
		[1728, 7], [1848, 8], [1872, 10], [1896, 13],
		[1920, 12], [1968, 10], [2016, 8], [2064, 12],
		[2112, 5], [2232, 7], [2256, 8], [2280, 5],
		[2304, 12], [2352, 5], [2400, 9], [2448, 15],
		[2496, 13], [2616, 12], [2640, 10], [2664, 8],
		[2668, 7], [2736, 4], [2784, 5], [2832, 7],
		[2880, 5],
		[3120, 5], [3168, 9], [3216, 15],
		[3264, 17], [3288, 15], [3312, 13], [3408, 8],
		[3456, 7], [3504, 5], [3552, 3], [3600, 17],
		[3648, 15], [3672, 13], [3696, 12], [3792, 8],
		[3840, 5], [3888, 3], [3936, 1], [3984, 12],
		[4032, 13], [4056, 12], [4080, 10], [4176, 5],
		[4224, 4], [4248, 0], [4272, 7], [4296, 0], [4320, 10], [4344, 7], [4368, 13], [4392, 10],
		[4416, 12],
		[4656, 5], [4704, 9], [4752, 15],
		[4800, 17], [4824, 15], [4848, 13],
		[4944, 8], [4992, 7], [5040, 5], [5088, 3],
		[5136, 17], [5184, 15], [5208, 13], [5232, 12],
		[5328, 8], [5376, 5], [5424, 3], [5472, 1],
		[5520, 12], [5568, 13], [5592, 12], [5616, 10],
		[5712, 5], [5760, 4], [5784, 0], [5808, 7], [5832, 4], [5856, 10], [5880, 7], [5904, 12], [5928, 16], [5952, 17]]
	);

	PluginManager.registerCommand(pluginName, "Start", function (args) {
		count = -240;
		isPlay = true;
		const bitmap = new Bitmap(0, 0);
		var melodyManager = new MelodyManager(bitmap);
		SceneManager._scene.addChild(melodyManager);
	});

	PluginManager.registerCommand(pluginName, "Stop", function (args) {
		isPlay = false;
		for (var i = 0; i < 17; i++) {
			var targetswitch = 422 + i * 2;
			$gameSwitches.setValue(targetswitch, true);
		}
	});

	//PluginManager.registerCommand(pluginName, "Stop", function (args) {
	//	isPlay = false;
	//	SceneManager._scene.removeChild(melodyManager);
	//});

	PluginManager.registerCommand(pluginName, "Reset", function (args) {
		count = -240;
		dataIndex = 0;
		isPlay = true;
		for (var i = 0; i < 17; i++) {
			var targetswitch = 422 + i * 2;
			$gameSwitches.setValue(targetswitch, true);
		}
	});

	//-----------------------------------------------------------------------------
	// MelodyManager
	//-----------------------------------------------------------------------------

	function MelodyManager() {
		this.initialize.apply(this, arguments);
	}

	MelodyManager.prototype = Object.create(Sprite.prototype);
	MelodyManager.prototype.constructor = MelodyManager;

	MelodyManager.prototype.initialize = function (bitmap) {
		Sprite.prototype.initialize.call(this, bitmap);
		dataIndex = 0;

		this.useNoteIndexData = new Array(
			12, 10, 13,
			6, 8, 11, 14,
			12, 15, 7, 9,
			3, 4, 8, 5,
			10, 7, 9, 15,
			13, 12, 10, 8,
			7, 4, 11, 9,
			14,
			12, 10, 13,
			7, 8, 9, 11,
			12, 10, 6, 13,
			5, 7, 8, 4,
			11, 6, 9, 15,
			13, 12, 10, 8,
			7, 4, 5, 6,
			3,
			5, 9, 15,
			17, 14, 13, 8,
			7, 6, 5, 11,
			15, 13, 12, 8,
			5, 3, 2, 11,
			13, 12, 10, 8,
			7, 3, 9, 6, 11, 12, 13, 14,
			15,
			5, 9, 15,
			17, 16, 13,
			8, 7, 6, 5,
			15, 14, 13, 12,
			8, 5, 3, 1,
			10, 13, 12, 11,
			6, 4, 1, 7, 5, 9, 8, 11, 16, 17
		);
	};

	MelodyManager.prototype.update = function () {
		Sprite.prototype.update.call(this);
		if (isPlay == true) {
			count++;
			//console.log(count);
			if (melodyData.has(count) == true) {
				//console.log(count);
				var takasa = melodyData.get(count) + 1;
				var number = this.useNoteIndexData[dataIndex];
				if (number) {
					number--;
					//console.log(number);
					//console.log(takasa);
					console.log(count + " : " + number + " : " + takasa);
					$gameVariables.setValue(22 + number, takasa);
					var switch1 = 421 + number * 2;
					var switch2 = 422 + number * 2;
					if ($gameSwitches.value(switch1) == true || $gameSwitches.value(switch2) == true) {
						$gameSwitches.setValue(switch1, false);
						$gameSwitches.setValue(switch2, false);
						console.log("switch1 = " + switch1 + " , switch2 = " + switch2);
					}
					else {
						console.log("まにあってません : " + dataIndex + " : " + count + " : " + number + 1);
					}
					dataIndex++;
				}//$gameSwitches.value(スイッチID)
			}
			//ループ
			if (count == 6300) {
				count = 0;
				dataIndex = 0;
			}
		}
	};
})();