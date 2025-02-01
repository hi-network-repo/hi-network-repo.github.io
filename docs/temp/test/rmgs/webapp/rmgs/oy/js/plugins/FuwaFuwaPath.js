/*:
 * @target MZ
 * @plugindesc 経路探索用のスクリプト
 * @author らて
 *
 * @help
 * MVのShazさん作成SmartPathを参考にMZ用に作っています
 *  イベントIDに 0 を指定するとこのイベント自身
 *  イベントIDに -1 を指定するとプレイヤー
 *  イベントIDに $gameVariables.value(x) を指定すると変数 x 番のイベントを指定できます
 * 
 * @param pathLength
 * @text 経路探索の距離
 * @desc 距離を長くすると遠くまで引っかからなくなります　大きくしすぎると重くなるかもしれません・・・
 * @default 20
 * @type number
 * 
 * @command toEvent
 * @text イベントまでの経路探索
 * @desc イベント１がイベント２までの経路探索をします
 *
 * @arg event1
 * @type number
 * @min -1
 * @text 動かすイベントID
 * @desc 0でこのイベント　-1でplayerも指定できます。
 *
 * @arg event2
 * @type number
 * @min -1
 * @text 目的のイベントID
 * @desc 0でこのイベント　-1でplayerも指定できます。
 * 
 * @command toCoordinate
 * @text 座標までの経路探索
 * @desc イベントから指定した座標まで経路探索します。
 *
 * @arg eventId
 * @type number
 * @min -1
 * @text 動かすイベントID
 * @desc 0でこのイベント　-1でplayerも指定できます。
 *
 * @arg x
 * @type number
 * @min 0
 * @default 0
 * @text 目的のX座標
 * @desc 座標を指定します　左が0
 * 
 * @arg y
 * @type number
 * @min 0
 * @default 0
 * @text 目的のY座標
 * @desc 座標を指定します　上が0
 * 
 * @command cancel
 * @text 経路探索の中止
 * @desc 指定したイベントの経路探索を中止します。
 *
 * @arg eventId
 * @type number
 * @min -1
 * @text とめるイベントID
 * @desc 0でこのイベント　-1でplayerも指定できます。
 */

(function () {
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);
    const pluginName = "FuwaFuwaPath";
    
    PluginManager.registerCommand(pluginName, "toEvent", function (args) {
        subject = this.character(args.event1);
        subject.setTarget(this.character(args.event2));
    });

    PluginManager.registerCommand(pluginName, "toCoordinate", function (args) {
        subject = this.character(args.eventId);
        subject.setTarget(null,args.x,args.y);
    });

    PluginManager.registerCommand(pluginName, "cancel", function (args) {
        subject = this.character(args.eventId);
        subject.clearTarget();
    });

    Game_Character.prototype.fuwaFindDirectionTo = function (goalX, goalY) {
        const searchLimit = param.pathLength;
        const mapWidth = $gameMap.width();
        const nodeList = [];
        const openList = [];
        const closedList = [];
        const start = {};
        let best = start;

        if (this.x === goalX && this.y === goalY) {
            return 0;
        }

        start.parent = null;
        start.x = this.x;
        start.y = this.y;
        start.g = 0;
        start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
        nodeList.push(start);
        openList.push(start.y * mapWidth + start.x);

        while (nodeList.length > 0) {
            let bestIndex = 0;
            for (let i = 0; i < nodeList.length; i++) {
                if (nodeList[i].f < nodeList[bestIndex].f) {
                    bestIndex = i;
                }
            }

            const current = nodeList[bestIndex];
            const x1 = current.x;
            const y1 = current.y;
            const pos1 = y1 * mapWidth + x1;
            const g1 = current.g;

            nodeList.splice(bestIndex, 1);
            openList.splice(openList.indexOf(pos1), 1);
            closedList.push(pos1);

            if (current.x === goalX && current.y === goalY) {
                best = current;
                break;
            }

            if (g1 >= searchLimit) {
                continue;
            }

            for (let j = 0; j < 4; j++) {
                const direction = 2 + j * 2;
                const x2 = $gameMap.roundXWithDirection(x1, direction);
                const y2 = $gameMap.roundYWithDirection(y1, direction);
                const pos2 = y2 * mapWidth + x2;

                if (closedList.includes(pos2)) {
                    continue;
                }
                if (!this.canPass(x1, y1, direction)) {
                    continue;
                }

                const g2 = g1 + 1;
                const index2 = openList.indexOf(pos2);

                if (index2 < 0 || g2 < nodeList[index2].g) {
                    let neighbor = {};
                    if (index2 >= 0) {
                        neighbor = nodeList[index2];
                    } else {
                        nodeList.push(neighbor);
                        openList.push(pos2);
                    }
                    neighbor.parent = current;
                    neighbor.x = x2;
                    neighbor.y = y2;
                    neighbor.g = g2;
                    neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
                    if (!best || neighbor.f - neighbor.g < best.f - best.g) {
                        best = neighbor;
                    }
                }
            }
        }

        let node = best;
        while (node.parent && node.parent !== start) {
            node = node.parent;
        }

        const deltaX1 = $gameMap.deltaX(node.x, start.x);
        const deltaY1 = $gameMap.deltaY(node.y, start.y);
        if (deltaY1 > 0) {
            return 2;
        } else if (deltaX1 < 0) {
            return 4;
        } else if (deltaX1 > 0) {
            return 6;
        } else if (deltaY1 < 0) {
            return 8;
        }

        const deltaX2 = this.deltaXFrom(goalX);
        const deltaY2 = this.deltaYFrom(goalY);
        if (Math.abs(deltaX2) > Math.abs(deltaY2)) {
            return deltaX2 > 0 ? 4 : 6;
        } else if (deltaY2 !== 0) {
            return deltaY2 > 0 ? 8 : 2;
        }

        return 0;
    };

    var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function () {
        _Game_CharacterBase_initMembers.call(this);
        this._target = null;
        this._targetX = null;
        this._targetY = null;
    };

    Game_CharacterBase.prototype.setTarget = function (target, targetX, targetY) {
        this._target = target;
        if (this._target) {
            this._targetX = this._target.x;
            this._targetY = this._target.y;
        } else {
            this._targetX = targetX;
            this._targetY = targetY;
        }
    };

    Game_CharacterBase.prototype.clearTarget = function () {
        this._target = null;
        this._targetX = null;
        this._targetY = null;
    };

    var _Game_CharacterBase_updateStop = Game_CharacterBase.prototype.updateStop;
    Game_CharacterBase.prototype.updateStop = function () {
        _Game_CharacterBase_updateStop.call(this);

        if (this._target) {
            this._targetX = this._target.x;
            this._targetY = this._target.y;
        }

        if (this._targetX != null) {
            direction = this.fuwaFindDirectionTo(this._targetX, this._targetY);
            if (direction > 0) {
                this.moveStraight(direction);
            }
        }
    };
})();