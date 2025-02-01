//=============================================================================
// HuwaHuwa_Hannsya var1.0
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 鏡の反射のように描写するスプライトを設置します
 * @author 白金隅
 *
 * @param TerrainId
 * @desc 鏡面の地形タグ
 * このタグで設定したタイルを鏡面として判定します
 * @default 1
 * 
 * @param OffsetY
 * @desc 上下の調整
 * @type number
 * @default 20
 * 
 * @param toosa
 * @desc 鏡からの遠さ感覚？　離れた時の離れ具合みたいな 1.1とか1.2みたいに小数で
 * @type number
 * @default 1.1
 * 
 * @param opacity
 * @desc 0～255　濃さ
 * @type number
 * @default 200
 *
 * @help ------------------------------------------------------
 * このプラグインについて
 * ------------------------------------------------------
 *  このプラグインは、正確には、
 *  「遠景と下層レイヤーの間にキャラクターの鏡像を表示する地形タグを設定するプラグイン」
 *  となります。
 *  つまり、下層レイヤーの一部が透明や半透明でないと、地形タグを設定しても変化はありません。
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * プラグインパラメータで地形タグを設定すると、その地形タグに鏡像が表示されるようになります。
 *
 * イベントのメモに
 * <鏡像表示なし>
 * <NoReflection>
 * のいずれかを記述すると、そのイベントの鏡像は表示されません。
 *
 * 同じように、イベントのメモに
 * <鏡像表示補正Y:○>
 * <SpecularOffsetY:○>
 * のいずれかを記述すると、鏡像の表示位置を○分ずらします。
 */

(function(){
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('HuwaHuwa_Hannsya');
    var terrainIds = parameters['TerrainId'].split(',').map(function(n){ return Number(n) });
    //var offsetYVariableId = Number(parameters['OffsetYVariableID']) || 0;

    const jyouge = Number(parameters['OffsetY']);
    const toosa = Number(parameters['toosa']);
    const kosa = Number(parameters['opacity']);

    ////////////////////////////////////////////////////////////////////////////////////

    Game_CharacterBase.prototype.isReflect = function() {
        return true;
    };

    Game_CharacterBase.prototype.isEvent = function() {
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Event.prototype.isReflect = function() {
        return !(this.event().meta['鏡像表示なし'] || this.event().meta['NoReflection']);
    };

    Game_Event.prototype.isEvent = function() {
        return true;
    };

    Game_Event.prototype.specularOffsetY = function() {
        if (this.event().meta['鏡像表示補正Y']) {
            return Number(this.event().meta['鏡像表示補正Y']) || 0;
        }
        if (this.event().meta['SpecularOffsetY']) {
            return Number(this.event().meta['SpecularOffsetY']) || 0;
        }
        return 0;
    };

    function Sprite_Specular() {
        this.initialize.apply(this, arguments);
    }

    ////////////////////////////////////////////////////////////////////////////////////

    Sprite_Specular.prototype = Object.create(Sprite.prototype);
    Sprite_Specular.prototype.constructor = Sprite_Specular;

    Sprite_Specular.prototype.initialize = function(character) {
        Sprite.prototype.initialize.call(this);
        this.initMembers();
        this.setCharacter(character);
    };

    Sprite_Specular.prototype.initMembers = function() {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._character = null;
        this._tilesetId = 0;
        this._upperBody = null;
        this._lowerBody = null;
        this.scale = new Point(1.0,1.0);
        this.visible = true;
        this.z = 2;
        this.offsetY = 0;
        //this.opacity = 40;
        //this.hidden = false;
    };
    
    
    Sprite_Specular.prototype.setCharacter = function(character) {
        this._character = character;
    };

    Sprite_Specular.prototype.findReflectBorder = function () {
        var terrainTag;
        var reflectTerrain;
        var x = this._character.x;
        for (var _y = this._character.y; _y > 0; _y--) {
            terrainTag = $gameMap.terrainTag(x, _y);
            reflectTerrain = terrainIds.contains(terrainTag);
            if (reflectTerrain == true) {
                return _y;
            }
        }
        return -1;
    }

    Sprite_Specular.prototype.convertToScreenX = function (mapX) {
        const tw = $gameMap.tileWidth();
        return Math.floor($gameMap.adjustX(mapX) * tw + tw / 2);
    };

    Sprite_Specular.prototype.convertToScreenY = function (mapY) {
        const th = $gameMap.tileHeight();
        return Math.floor($gameMap.adjustY(mapY) * th + th / 2);
    };

    Sprite_Specular.prototype.updateVisibility = function () {
        //対象線の座標からマスを判定する
        Sprite.prototype.updateVisibility.call(this);
        if (this._character.isTransparent() || !this._character.isReflect()){
            this.visible = false;
            return;
        }
        var x = this._character.x;
        var terrainTag;
        var reflectTerrain;
        var BorderY = this.findReflectBorder();
        if (BorderY == -1) {
            this.visible = false;
            return;
        }
        this.visible = true;
        var length = (this.convertToScreenY(BorderY) - this._character.screenY());// * $gameMap.tileWidth();
        //console.log(length);
        this.offsetY = (length + jyouge) * toosa;
        //var y = this._character.y + Math.ceil(this.offsetY() / $gameMap.tileWidth())+1;
        //var dir = this._character._direction;
        //var terrainTag = $gameMap.terrainTag(x, y);
        //var reflectTerrain = terrainIds.contains(terrainTag);


        //switch(dir) {
        //    case 2: y = reflectTerrain ? y : y - 1; break;
        //    case 4: x = reflectTerrain ? x : x + 1;  break;
        //    case 6: x = reflectTerrain ? x : x - 1; break;
        //    case 8: y = reflectTerrain ? y : y + 1;  break;
        //}

        //terrainTag = $gameMap.terrainTag(x, y);
        //this.visible = terrainIds.contains(terrainTag);
    };

    Sprite_Specular.prototype.isTile = function() {
        return this._character.tileId > 0;
    };

    Sprite_Specular.prototype.tilesetBitmap = function(tileId) {
        var tileset = $gameMap.tileset();
        var setNumber = 5 + Math.floor(tileId / 256);
        return ImageManager.loadTileset(tileset.tilesetNames[setNumber]);
    };

    Sprite_Specular.prototype.updateBitmap = function() {
        if (this.isImageChanged()) {
            this._tilesetId = $gameMap.tilesetId();
            this._tileId = this._character.tileId();
            this._characterName = this._character.characterName();
            this._characterIndex = this._character.characterIndex();
            if (this._tileId > 0) {
                this.setTileBitmap();
            } else {
                this.setCharacterBitmap();
            }
        }
    };

    Sprite_Specular.prototype.isImageChanged = function() {
        return (this._tilesetId !== $gameMap.tilesetId() ||
                this._tileId !== this._character.tileId() ||
                this._characterName !== this._character.characterName() ||
                this._characterIndex !== this._character.characterIndex());
    };

    Sprite_Specular.prototype.setTileBitmap = function() {
        this.bitmap = this.tilesetBitmap(this._tileId);
    };

    Sprite_Specular.prototype.setCharacterBitmap = function() {
        this.bitmap = ImageManager.loadCharacter(this._characterName);
        this._isBigCharacter = ImageManager.isBigCharacter(this._characterName);
    };

    Sprite_Specular.prototype.updateFrame = function() {
        if (this._tileId > 0) {
            this.updateTileFrame();
        } else {
            this.updateCharacterFrame();    

        }
    };

    Sprite_Specular.prototype.updateTileFrame = function() {
        var pw = this.patternWidth();
        var ph = this.patternHeight();
        var sx = (Math.floor(this._tileId / 128) % 2 * 8 + this._tileId % 8) * pw;
        var sy = Math.floor(this._tileId % 256 / 8) % 16 * ph;
        this.setFrame(sx, sy, pw, ph);
    };

    Sprite_Specular.prototype.updateCharacterFrame = function() {
        var pw = this.patternWidth();
        var ph = this.patternHeight();
        //向きと反対の画像をつかう
        var pattern_x = this.characterPatternX();
        var pattern_y = this.characterPatternY();
        var block_x = this.characterBlockX();
        var block_y = this.characterBlockY();
        //左右反転
        switch (pattern_x) {
            case 0:
                pattern_x = 2;
                break;
            case 1:
                break;
            case 2:
                pattern_x = 0;
                break;
            default:
                break;
        }
        //switch (block_x) {
        //    case 0:
        //        3;
        //        break;
        //    case 1:
        //        break;
        //    case 2:
        //        break;
        //    case 3:
        //        break;
        //    default:
        //        break;
        //}
        //上下反転
        switch (pattern_y) {
            case 0:
                pattern_y = 3;
                break;
            case 1:
                pattern_y = 1;
                break;
            case 2:
                pattern_y = 2;
                break;
            case 3:
                pattern_y = 0;
                break;
            default:
                break;
        }

        //switch (block_y) {
        //    case 0:
        //        break;
        //    case 1:
        //        break;
        //    case 2:
        //        break;
        //    case 3:
        //        break;
        //    default:
        //        break;
        //}
        var sx = (block_x + pattern_x) * pw;
        var sy = (block_y+ pattern_y) * ph;

        this.updateHalfBodySprites();
        if (this._bushDepth > 0) {
            var d = this._bushDepth;
            this._upperBody.setFrame(sx, sy, pw, ph - d);
            this._lowerBody.setFrame(sx, sy + ph - d, pw, d);
            this.setFrame(sx, sy, 0, ph);
        } else {
            this.setFrame(sx, sy, pw, ph);
        }
    };

    Sprite_Specular.prototype.characterBlockX = function() {
        if (this._isBigCharacter) {
            return 0;
        } else {
            var index = this._character.characterIndex();
            return index % 4 * 3;
        }
    };

    Sprite_Specular.prototype.characterBlockY = function() {
        if (this._isBigCharacter) {
            return 0;
        } else {
            var index = this._character.characterIndex();
            return Math.floor(index / 4) * 4;
        }
    };

    Sprite_Specular.prototype.characterPatternX = function() {
        return this._character.pattern();
    };

    Sprite_Specular.prototype.characterPatternY = function() {
        return (this._character.direction() - 2) / 2;
    };

    Sprite_Specular.prototype.patternWidth = function() {
        if (this._tileId > 0) {
            return $gameMap.tileWidth();
        } else if (this._isBigCharacter) {
            return this.bitmap.width / 3;
        } else {
            return this.bitmap.width / 12;
        }
    };

    Sprite_Specular.prototype.patternHeight = function() {
        if (this._tileId > 0) {
            return $gameMap.tileHeight();
        } else if (this._isBigCharacter) {
            return this.bitmap.height / 4;
        } else {
            return this.bitmap.height / 8;
        }
    };

    Sprite_Specular.prototype.updateHalfBodySprites = function() {
        if (this._bushDepth > 0) {
            this.createHalfBodySprites();
            this._upperBody.bitmap = this.bitmap;
            this._upperBody.visible = true;
            this._upperBody.y = - this._bushDepth;
            this._lowerBody.bitmap = this.bitmap;
            this._lowerBody.visible = true;
            this._upperBody.setBlendColor(this.getBlendColor());
            this._lowerBody.setBlendColor(this.getBlendColor());
            this._upperBody.setColorTone(this.getColorTone());
            this._lowerBody.setColorTone(this.getColorTone());
        } else if (this._upperBody) {
            this._upperBody.visible = false;
            this._lowerBody.visible = false;
        }
    };

    Sprite_Specular.prototype.createHalfBodySprites = function() {
        if (!this._upperBody) {
            this._upperBody = new Sprite();
            this._upperBody.anchor.x = 0.5;
            this._upperBody.anchor.y = 1;
            this.addChild(this._upperBody);
        }
        if (!this._lowerBody) {
            this._lowerBody = new Sprite();
            this._lowerBody.anchor.x = 0.5;
            this._lowerBody.anchor.y = 1;
            this._lowerBody.opacity = 128;
            this.addChild(this._lowerBody);
        }
    };

    Sprite_Specular.prototype.updateOther = function() {
        this.opacity = kosa;//this._character.opacity();
        this.blendMode = this._character.blendMode();
        this._bushDepth = this._character.bushDepth();
    };


    Sprite_Specular.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updatePosition();
        this.updateBitmap();
        this.updateFrame();
        this.updatePosition();
        this.updateOther();
        this.updateVisibility();
    };
    
    Sprite_Specular.prototype.updatePosition = function() {
        this.x = this._character.screenX();
        this.y = this._character.screenY() + this.offsetY;
        this.z = this._character.screenZ();
    };

    //Sprite_Specular.prototype.offsetY = function() {
    //    var offsetY = offsetYVariableId ? $gameVariables.value(offsetYVariableId) : 0;
    //    offsetY = this._character.isEvent() ? this._character.specularOffsetY() : offsetY;
    //    return offsetY;
    //};

    ////////////////////////////////////////////////////////////////////////////////////

    var _sref_SMap_createParallax = Spriteset_Map.prototype.createParallax;
    Spriteset_Map.prototype.createParallax = function() {
        _sref_SMap_createParallax.call(this);
        this.createSpecular();
    };
    
    Spriteset_Map.prototype.createSpecular = function() {
        this._specularSprites = [];
        $gameMap.events().forEach(function(event) {
            this._specularSprites.push(new Sprite_Specular(event));
        }, this);
        $gameMap.vehicles().forEach(function(vehicle) {
            this._specularSprites.push(new Sprite_Specular(vehicle));
        }, this);
        for (const follower of $gamePlayer.followers().reverseData()) {
            this._specularSprites.push(new Sprite_Specular(follower));
        }
        //$gamePlayer.followers().forEach(function(follower) {
        //    this._specularSprites.push(new Sprite_Specular(follower));
        //}, this);
        this._specularSprites.push(new Sprite_Specular($gamePlayer));
        for (var i = 0; i < this._specularSprites.length; i++) {
            this._baseSprite.addChild(this._specularSprites[i]);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
    
}());
