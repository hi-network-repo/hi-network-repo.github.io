
//=============================================================================
// HuwaHuwa_Nyuuryokusousa.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 数字入力操作奪われます
 * @author 白金隅
 *
 * @help HuwaHuwa_Nyuuryokusousa.js
 * 
 * @command On
 * @text 入力実行
 * @desc 入力実行
 * 
 * @arg VariableNum
 * @text 変更する変数
 * @desc 変更する変数
 * @type variable
 * @default 1
 * 
 * @command Off
 * @text 入力停止　自動でするからたぶん使わない
 * @desc 入力停止　自動でするからたぶん使わない
 */

(() => {
    "use strict";
    const pluginName = "HuwaHuwa_Nyuuryokusousa";

    const parameters = PluginManager.parameters(pluginName);

    var window_input = true;
    var input_data = [["None", 60], ["Up", 60], ["Right", 30], ["Up", 30], ["Up", 60], ["Right", 30], ["Up", 60], ["Right", 30], ["Down", 30], ["Down", 30], ["Down", 300], ["Ok", 30]];
    var data_index = 0;
    var input_wait = 0;
    var __started = false;
    var AutoInputWorking = false;

    PluginManager.registerCommand(pluginName, "On", function (args) {
        var val = args['VariableNum'];
        //window_input = new Window_HuwaHuwaNumberInput()
        //SceneManager.push(window_input);
        //window_input.start();
        //SceneManager.push(Window_HuwaHuwaNumberInput);
        window_input = false;
        data_index = 0;
        input_wait = input_data[data_index][1];
        var Param = [val, 4];
        $gameMap._interpreter.command103(Param);
        AutoInputWorking = true;
        __started = false;
        //$gameMap._interpreter.setupNumInput(Param);
    });

    PluginManager.registerCommand(pluginName, "Off", function (args) {
        window_input = true;
        __started = false;
        AutoInputWorking = false;
        //$gameMessage._numberInputWindow.processOk();
    });

    var Window_BaseResetTextColor = Window_NumberInput.prototype.resetTextColor;
    Window_NumberInput.prototype.resetTextColor = function () {
        if (window_input) {
            Window_BaseResetTextColor.call(this);
        }
        else {
            this.changeTextColor(ColorManager.textColor(3));
            this.changeOutlineColor(ColorManager.outlineColor());
        }
    };
    
    var _Window_NumberInputStart = Window_NumberInput.prototype.start;
    Window_NumberInput.prototype.start = function () {
        if (AutoInputWorking) {
            if (!__started) {
                this._maxDigits = $gameMessage.numInputMaxDigits();
                this._number = $gameVariables.value($gameMessage.numInputVariableId());
                this._number = this._number.clamp(0, Math.pow(10, this._maxDigits) - 1);
                this.updatePlacement();
                this.placeButtons();
                this.createContents();
                this.refresh();
                this.open();
                this.activate();
                this.select(0);
                __started = true;
            }
        }
        else {
            _Window_NumberInputStart.call(this);
        }
    };

    var _Window_NumberInputUpdate = Window_NumberInput.prototype.update;
    Window_NumberInput.prototype.update = function () {
        if (window_input) {
            _Window_NumberInputUpdate.call(this);
        }
        else if (!window_input) {
            //_Window_NumberInputUpdate.call(this);
            Window_Base.prototype.update.call(this);
            if (input_wait > 0) {
                input_wait--;
            }
            else if (input_wait == 0) {
                data_index++;
                if (input_data.length > data_index) {
                    input_wait = input_data[data_index][1];
                    var input_kind = input_data[data_index][0];
                    switch (input_kind) {
                        case "None":
                            break;
                        case "Up":
                            this.changeDigit(true);
                            break;
                        case "Right":
                            this.cursorRight(Input.isTriggered("right"));
                            break;
                        case "Down":
                            this.changeDigit(false);
                            break;
                        case "Ok":
                            this.processOk();
                            _Window_NumberInputStart = false;
                            window_input = true;
                            __started = false;
                            //AutoInputWorking = false;
                            break;
                    }
                    console.log(this._number);
                }
                else {
                    console.log("data範囲外とかデータ不正")
                }
            }
        }
    }
    var _Window_NumberInputProcessOk = Window_NumberInput.prototype.processOk;
    Window_NumberInput.prototype.processOk = function () {
        __started = false;
        _Window_NumberInputProcessOk.call(this);
        //this.playOkSound();
        //$gameVariables.setValue($gameMessage.numInputVariableId(), this._number);
        //this._messageWindow.terminateMessage();
        //this.updateInputData();
        //this.deactivate();
        //this.close();
    };

    var _Window_Message = Window_Message.prototype.updateInput;
    Window_Message.prototype.updateInput = function () {
        if (window_input) {
            return _Window_Message.call(this);
        }
    }

    var _Window_NumberInputIsCursorMovable = Window_NumberInput.prototype.isCursorMovable;
    Window_NumberInput.prototype.isCursorMovable = function () {
        if (window_input) {
            return _Window_NumberInputIsCursorMovable.call(this);
        }
        else if (!window_input) {
            return false;
        }
    }
    var _Window_NumberInputProcessCursorMove = Window_NumberInput.prototype.processCursorMove;
    Window_NumberInput.prototype.processCursorMove = function () {
        if (window_input) {
            _Window_NumberInputProcessCursorMove.call(this);
        }
    }

    Window_NumberInput.prototype.onButtonUp = function () {
        if (window_input) {
            this.changeDigit(true);
        }
        else {
            this.playBuzzerSound();
        }
    };

    Window_NumberInput.prototype.onButtonDown = function () {
        if (window_input) {
            this.changeDigit(false);
        }
        else {
            this.playBuzzerSound();
        }
    };

    Window_NumberInput.prototype.onButtonOk = function () {
        if (window_input) {
            this.processOk();
        }
        else {
            this.playBuzzerSound();
        }
    };
})();
