/*:ja
 * @target MZ
 */
(() => {
    "use strict"
    const _ColorManager_normalColor = ColorManager.normalColor;
    ColorManager.normalColor = function() {
        return (SceneManager._scene instanceof Scene_MenuBase) ?
            this.textColor(2) : _ColorManager_normalColor.apply(this, arguments);
    };
})();