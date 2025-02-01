/*:ja
 * @target MZ
 * @plugindesc 入力の位置替え
 * @author やかろ
 * @help 数字入力の位置を変えます
 */
Window_NumberInput.prototype.windowHeight = function() {
return this.fittingHeight(1) + this.buttonSpacing() + 48;
};
Window_NumberInput.prototype.createButtons = function() {
    this._buttons = [];
    for (const type of ["down", "up", "ok"]) {
    const button = new Sprite_Button(type);
    this._buttons.push(button);
     this.addInnerChild(button);
    }
    this._buttons[0].setClickHandler(this.onButtonDown.bind(this));
    this._buttons[1].setClickHandler(this.onButtonUp.bind(this));
    this._buttons[2].setClickHandler(this.onButtonOk.bind(this));
    };
    Window_NumberInput.prototype.updatePlacement = function() {
        var messageY = this._messageWindow.y;
        var spacing = 8;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        this.x = (580) / 2;
        if (messageY >= Graphics.boxHeight / 2) {
        this.y = (975) / 2;
        } else {
        this.y = (975) / 2;
        }
    };