/*:
 * @plugindesc クリック移動の挙動を変えるプラグイン
 * @target MZ
 * @author 白金隅
 *
 * @command moveToLastTouchPos
 * @text 最後にタッチした場所に再移動
 * @desc 素通りしたいイベントの最後に呼ぶ
 * 
 * @command ClickBlock
 * @text クリック移動禁止
 * @desc クリック移動禁止
 *
 * @arg Enable
 * @text オンオフ
 * @desc オンにするかオフにするか
 * @type boolean
 * @on 移動禁止
 * @off 移動解除
 * @default false
 * 
 * @command HorizontalMoveOnly
 * @text 左右移動のみ許可
 * @desc 左右移動のみ許可
 *
 * @arg HoriEnable
 * @text オンオフ
 * @desc オンにするかオフにするか
 * @type boolean
 * @on 移動禁止
 * @off 移動解除
 * @default false
 * 
 */

(() => {
    'use strict';
    const pluginName = "HuwaHuwa_KurikkuTyennzi";
    var param = PluginManager.parameters(pluginName);

    var lastTouchX = null;
    var lastTouchY = null;
    var clickBlockEnable = false;
    var horizontalEnable = false;

    var OnMapTouch = Scene_Map.prototype.onMapTouch;
    Scene_Map.prototype.onMapTouch = function () {
        lastTouchX = $gameMap.canvasToMapX(TouchInput.x);
        lastTouchY = $gameMap.canvasToMapY(TouchInput.y);
        OnMapTouch.call(this);
    };

    PluginManager.registerCommand(pluginName, "moveToLastTouchPos", function (args) {
        $gameTemp.setDestination(lastTouchX, lastTouchY);
    });

    PluginManager.registerCommand(pluginName, "ClickBlock", function (args) {
        clickBlockEnable = eval(args['Enable'] || 'false');
    });

    PluginManager.registerCommand(pluginName, "HorizontalMoveOnly", function (args) {
        horizontalEnable = eval(args['HoriEnable'] || 'false');
    });

    Scene_Map.prototype.isMapTouchOk = function () {
        return this.isActive() && $gamePlayer.canMove() && clickBlockEnable == false;
    };

    var MoveByInput = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function () {
        if (!this.isMoving() && this.canMove()) {
            let direction = this.getInputDirection();
            if (direction > 0) {
                //最後にタッチした場所も消す
                lastTouchX = null;
                lastTouchY = null;
                $gameTemp.clearDestination();
            } else if ($gameTemp.isDestinationValid()) {
                const x = $gameTemp.destinationX();
                const y = $gameTemp.destinationY();
                direction = this.findDirectionTo(x, y);
            }
            if (direction > 0) {
                //console.log(direction)
                //左右移動のみ許可モード
                if (horizontalEnable == true) {
                    if (direction == 4 || direction == 6) {
                        this.executeMove(direction);
                    }
                }
                else {
                    this.executeMove(direction);
                }
            }
        }
    };

})();