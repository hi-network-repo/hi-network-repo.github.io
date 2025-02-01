//=============================================================================
// BanContinue.js
//=============================================================================
/*:
 * @plugindesc 特定スイッチがONになっている場合はコンティニューを禁止します。
 * @author 莞爾の草
 *
 * @help 
 * このプラグインはプラグイン管理リストの一番下に配置してください。
 * プラグインコマンドに
 * BanContinue ON
 * BanContinue OFF
 * などと書くことで使うことができます。
 * BanContinue ONの場合「続きから」を禁止し、OFFで許可します。
 * 
 * ■注意
 * 　　このプラグインは通常使用できないセーブファイル０番を利用しており、
 * 　他のプラグインでもそれが使用されている場合競合する可能性があります。
 * 　その場合はご連絡くださいませm(_ _)m
 */

(function() {
	function banContinue (bool){
		var info = DataManager.loadGlobalInfo() || [];
		if (info[0] != null && typeof info[0] == 'object'){
			if(Array.isArray()){
				info.push(bool);
			}else{
				info[0]._knsBanContinue = bool;
			}
		}else{
			info[0] = {_knsBanContinue:bool};
		}
		StorageManager.save(0, JSON.stringify(info));
	}

	var _pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		if (command == "BanContinue"){
			banContinue(/ON/i.test(args[0]));
		}else{
			return _pluginCommand.call(this, command, args);
		}
	};

	var __isContinueEnabled = Window_TitleCommand.prototype.isContinueEnabled;
	Window_TitleCommand.prototype.isContinueEnabled = function() {
		var info = DataManager.loadSavefileInfo(0);
		var bool =	Array.isArray()	? info[-1] :
					info			? info._knsBanContinue : false;
		return __isContinueEnabled.call(this) && !bool;
	};
})();

