﻿//=============================================================================
// AnotherNewGame.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.2 2016/12/10 アナザーニューゲームをロードした際に、ロード元でイベントが実行中だった場合に続きが実行されてしまう現象を修正
// 1.2.1 2016/11/23 遠景タイトルプラグイン（ParallaxTitle.js）と連携する設定を追加
// 1.2.0 2016/11/22 アナザーニューゲームを選択した際に、フェードアウトしなくなる設定を追加
// 1.1.0 2016/03/29 fftfanttさんからご提供いただいたコードを反映させ、アナザーニューゲーム選択時に
//                  既存のセーブファイルをロードする機能を追加
// 1.0.1 2015/11/10 プラグイン適用中にセーブできなくなる不具合を修正
// 1.0.0 2015/11/07 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc アナザーニューゲーム追加プラグイン
 * @author トリアコンタン
 *
 * @param name
 * @desc タイトル画面に表示されるコマンド名です。（文字列）
 * @default Another New Game
 *
 * @param map_id
 * @desc 移動先のマップIDです。（自然数）
 * @default 1
 *
 * @param map_x
 * @desc 移動先のX座標です。（自然数）
 * @default 1
 *
 * @param map_y
 * @desc 移動先のY座標です。（自然数）
 * @default 1
 *
 * @param hidden
 * @desc デフォルトで選択肢を非表示にします。プラグインコマンドで有効化できます。（ON/OFF）
 * @default OFF
 *
 * @param disable
 * @desc デフォルトで選択肢を選択禁止にします。プラグインコマンドで有効化できます。（ON/OFF）
 * @default OFF
 *
 * @param file_load
 * @desc アナザーニューゲーム選択時に、ロード画面に遷移して既存セーブデータをロードできるようになります。（ON/OFF）
 * @default OFF
 *
 * @param no_fadeout
 * @desc アナザーニューゲーム選択時に、オーディオや画面がフェードアウトしなくなります。（ON/OFF）
 * @default OFF
 *
 * @help タイトル画面のウィンドウの一番下に、もう一つのニューゲームを追加します。
 * 選択すると、ニューゲームとは別に指定したマップに遷移します。
 * クリア後のおまけやCG回想モード、スタッフクレジット、ミニゲーム、隠し要素など
 * 使い手次第で様々な用途に使えます。
 *
 * 選択肢は、あらかじめ非表示あるいは選択禁止にしておくことができます。
 * これらはプラグインコマンドから解除でき、解除状態はセーブファイルを
 * 超えてゲーム全体で共有されます。解除した状態を再度、禁止にすることもできます。
 *
 * プラグインコマンド詳細
 *   イベントコマンド「プラグインコマンド」から実行。
 *
 *  ANG_VISIBLE : アナザーニューゲームを表示にする。
 *  ANG_ENABLE : アナザーニューゲームを選択可能にする。
 *  ANG_HIDDEN : アナザーニューゲームを非表示にする。
 *  ANG_DISABLE : アナザーニューゲームを選択禁止にする。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */
(function () {
    var parameters = PluginManager.parameters('AnotherNewGame');
    var localExtraStage = false;

    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンド[ANG_VISIBLE]などを追加定義します。
    //=============================================================================
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command.toUpperCase()) {
            case 'ANG_VISIBLE' :
                ANGSettingManager.visible = true;
                ANGSettingManager.save();
                break;
            case 'ANG_ENABLE' :
                ANGSettingManager.enable = true;
                ANGSettingManager.save();
                break;
            case 'ANG_HIDDEN' :
                ANGSettingManager.visible = false;
                ANGSettingManager.save();
                break;
            case 'ANG_DISABLE' :
                ANGSettingManager.enable = false;
                ANGSettingManager.save();
                break;
        }
    };

    //=============================================================================
    // Game_Map
    //  アナザーニューゲームのロード時に実行していたイベントを中断します。
    //=============================================================================
    Game_Map.prototype.abortInterpreter = function() {
        if (this.isEventRunning()) {
            this._interpreter.command115();
        }
    };

    //=============================================================================
    // Scene_Title
    //  アナザーニューゲームの選択時の処理を追加定義します。
    //=============================================================================
    var _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        this.loadAngSetting();
        _Scene_Title_create.call(this);
    };

    var _Scene_Title_commandContinue = Scene_Title.prototype.commandContinue;
    Scene_Title.prototype.commandContinue = function() {
        _Scene_Title_commandContinue.call(this);
        localExtraStage = false;
    };

    Scene_Title.prototype.loadAngSetting = function() {
        var angInfo = ANGSettingManager.load();
        ANGSettingManager.visible =
            angInfo['visible'] !== undefined ? angInfo['visible'] : parameters['hidden'].toUpperCase() !== "ON";
        ANGSettingManager.enable =
            angInfo['enable'] !== undefined ? angInfo['enable'] : parameters['disable'].toUpperCase() !== "ON";
    };

    var _Scene_Title_commandNewGameSecond = Scene_Title.prototype.commandNewGameSecond;
    Scene_Title.prototype.commandNewGameSecond = function() {
        if (_Scene_Title_commandNewGameSecond) _Scene_Title_commandNewGameSecond.apply(this, arguments);
        if ((parameters['no_fadeout'] || '').toUpperCase() === 'ON') {
            this._noFadeout = true;
        }
        if ((parameters['file_load'] || '').toUpperCase() !== 'ON') {
            var preMapId = $dataSystem.startMapId;
            var preStartX = $dataSystem.startX;
            var preStartY = $dataSystem.startY;
            $dataSystem.startMapId = parseInt(parameters['map_id'], 10) || 1;
            $dataSystem.startX     = parseInt(parameters['map_x'], 10)  || 1;
            $dataSystem.startY     = parseInt(parameters['map_y'], 10)  || 1;
            this.commandNewGame();
            $dataSystem.startMapId = preMapId;
            $dataSystem.startX     = preStartX;
            $dataSystem.startY     = preStartY;
        } else {
            this.commandContinue();
            localExtraStage = true;
        }
    };

    var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        if (ANGSettingManager.visible)
            this._commandWindow.setHandler('nameGame2',  this.commandNewGameSecond.bind(this));
    };

    Scene_Title.prototype.fadeOutAll = function() {
        if (!this._noFadeout) {
            Scene_Base.prototype.fadeOutAll.apply(this, arguments);
        }
    };

    //=============================================================================
    // Scene_Load
    //  ロード成功時にアナザーポイントに移動します。
    //=============================================================================
    var _Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function() {
        _Scene_Load_onLoadSuccess.call(this);
        if (localExtraStage) {
            var mapId = parseInt(parameters['map_id'], 10) || 1;
            var x = parseInt(parameters['map_x'], 10)  || 1;
            var y = parseInt(parameters['map_y'], 10)  || 1;
            $gamePlayer.reserveTransfer(mapId, x, y);
            $gameMap.abortInterpreter();
            DataManager.selectSavefileForNewGame();
        }
    };

    //=============================================================================
    // Window_TitleCommand
    //  アナザーニューゲームの選択肢を追加定義します。
    //=============================================================================
    var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);
        if (ANGSettingManager.visible) this.addCommand(parameters['name'], 'nameGame2', ANGSettingManager.enable);
    };

    var _Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function() {
        _Window_TitleCommand_updatePlacement.call(this);
        if (ANGSettingManager.visible) this.y += this.height / 8;
    };

    //=============================================================================
    // ANGManager
    //  アナザーニューゲームの設定ファイルのセーブとロードを定義します。
    //=============================================================================
    function ANGSettingManager() {
        throw new Error('This is a static class');
    }

    ANGSettingManager.visible = false;
    ANGSettingManager.enable  = false;

    ANGSettingManager.make = function() {
        var info = {};
        info.visible = ANGSettingManager.visible;
        info.enable = ANGSettingManager.enable;
        return info;
    };

    ANGSettingManager.load = function() {
        var json;
        try {
            json = StorageManager.load(-1001);
        } catch (e) {
            console.error(e);
            return [];
        }
        if (json) {
            return JSON.parse(json);
        } else {
            return [];
        }
    };

    ANGSettingManager.save = function() {
        var info = ANGSettingManager.make();
        StorageManager.save(-1001, JSON.stringify(info));
    };

    //=============================================================================
    // StorageManager
    //  アナザーニューゲームの設定ファイルのパス取得処理を追加定義します。
    //=============================================================================
    var _StorageManager_localFilePath = StorageManager.localFilePath;
    StorageManager.localFilePath = function(savefileId) {
        if (savefileId === -1001) {
            return this.localFileDirectoryPath() + 'AnotherNewGame.rpgsave';
        } else {
            return _StorageManager_localFilePath.call(this, savefileId);
        }
    };

    var _StorageManager_webStorageKey = StorageManager.webStorageKey;
    StorageManager.webStorageKey = function(savefileId) {
        if (savefileId === -1001) {
            return 'RPG AnotherNewGame';
        } else {
            return _StorageManager_webStorageKey.call(this, savefileId);
        }
    };
})();