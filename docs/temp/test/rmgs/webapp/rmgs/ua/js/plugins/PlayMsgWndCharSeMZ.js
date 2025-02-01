//=============================================================================
// Plugin for RPG Maker MZ
// PlayMsgWndCharSeMZ.js
//=============================================================================
// [Release Note]
// This plugin is the MZ version of PlayMsgWndCharSE.js the RMMV plugin.

/*:ja
 * @target MZ
 * @plugindesc メッセージウィンドウで文字ごとにSEを演奏します。
 * @author 神無月サスケ
 *
 * @param default SE
 * @text マップでのデフォルトSE番号
 * @desc マップに入るたびにこの値に初期化されます。
 * 0,1,2のいずれかにしてください。0は無音です。
 * @type number
 * @max 2
 * @min 0
 * @default 1
 *
 * @param battle default SE
 * @text バトルでのデフォルトSE番号
 * @desc バトルに入るたびにこの値に初期化されます。
 * 0,1,2のいずれかにしてください。0は無音です。
 * @type number
 * @max 2
 * @min 0
 * @default 0
 * 
 * @param interval
 * @text インターバル
 * @desc 何文字スキップして音を鳴らすか(推奨値:2)。
 * 0の場合、全ての文字で音を鳴らします。
 * @type number
 * @min 0
 * @default 2
 *
 * @param name1
 * @text SE1のファイル名
 * @desc
 * @default Cursor1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume1
 * @parent name1
 * @text SE1のボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch1
 * @parent name1
 * @text SE1のピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name2
 * @text SE2のファイル名
 * @desc
 * @default Cursor2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume2
 * @parent name2
 * @text SE2のボリューム
 * @desc デフォルト:90
 * @type number
 * @min 0
 * @default 75
 *
 * @param pitch2
 * @parent name2
 * @text SE2のピッチ
 * @desc デフォルト:100
 * @type number
 * @max 1000000
 * @min 10
 * @default 125
 * 
 * @param name3
 * @text SE3のファイル名
 * @desc
 * @default Cursor3
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume3
 * @parent name3
 * @text SE3のボリューム
 * @desc デフォルト:40
 * @type number
 * @min 0
 * @default 40
 *
 * @param pitch3
 * @parent name3
 * @text SE3のピッチ
 * @desc デフォルト:100
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name4
 * @text SE4のファイル名
 * @desc
 * @default Cursor4
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume4
 * @parent name4
 * @text SE4のボリューム
 * @desc デフォルト:40
 * @type number
 * @min 0
 * @default 40
 *
 * @param pitch4
 * @parent name4
 * @text SE4のピッチ
 * @desc デフォルト:100
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 * 
 * @param name5
 * @text SE5のファイル名
 * @desc
 * @default Cursor5
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume5
 * @parent name5
 * @text SE5のボリューム
 * @desc デフォルト:40
 * @type number
 * @min 0
 * @default 40
 *
 * @param pitch5
 * @parent name5
 * @text SE5のピッチ
 * @desc デフォルト:100
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 * 
 * @param name6
 * @text SE6のファイル名
 * @desc
 * @default Cursor6
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume6
 * @parent name6
 * @text SE6のボリューム
 * @desc デフォルト:40
 * @type number
 * @min 0
 * @default 40
 *
 * @param pitch6
 * @parent name6
 * @text SE6のピッチ
 * @desc デフォルト:100
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 * 
 * @param name7
 * @text SE7のファイル名
 * @desc
 * @default Cursor7
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume7
 * @parent name7
 * @text SE7のボリューム
 * @desc デフォルト:40
 * @type number
 * @min 0
 * @default 40
 *
 * @param pitch7
 * @parent name7
 * @text SE7のピッチ
 * @desc デフォルト:100
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 * 
 * @param name8
 * @text SE8のファイル名
 * @desc
 * @default Cursor8
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume8
 * @parent name8
 * @text SE8のボリューム
 * @desc デフォルト:40
 * @type number
 * @min 0
 * @default 40
 *
 * @param pitch8
 * @parent name8
 * @text SE8のピッチ
 * @desc デフォルト:100
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 * 
 * @param name9
 * @text SE9のファイル名
 * @desc
 * @default Cursor9
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume9
 * @parent name9
 * @text SE9のボリューム
 * @desc デフォルト:40
 * @type number
 * @min 0
 * @default 40
 *
 * @param pitch9
 * @parent name9
 * @text SE9のピッチ
 * @desc デフォルト:100
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 * 
 * @param name10
 * @text SE10のファイル名
 * @desc
 * @default Cursor10
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume10
 * @parent name10
 * @text SE10のボリューム
 * @desc デフォルト:40
 * @type number
 * @min 0
 * @default 40
 *
 * @param pitch10
 * @parent name10
 * @text SE10のピッチ
 * @desc デフォルト:100
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 * 
 * @help このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMZに対応しています。
 * 
 * このプラグインは、メッセージウィンドウで文字表示の際に、
 * ポポポポ……といった感じでSE(効果音)を鳴らすことを可能にします。
 *
 * 2種類の効果音が指定可能で、ケースに応じて使い分けることが可能です。
 *
 * ■概要
 * メッセージウィンドウで以下の書式で書くことでSEを切り替えられます。
 * \SE[0] : SEを止めます。
 * \SE[1] : SE1を鳴らします。
 * \SE[2] : SE2を鳴らします。
 * この設定は、マップかシーンが切り替わるとデフォルトにリセットされます。
 * ※シーン切り替えには、メニューの開閉も含まれます。
 *
 * 文中で \> が設定された場合、インターバル(interval)の値に関わらず、
 * 強制的に1回だけSEが演奏されます。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
    const pluginName = 'PlayMsgWndCharSeMZ';
    //
    // process parameters
    //
    const parameters = PluginManager.parameters(pluginName);
    const defaultMode = Number(parameters['default SE'] || 1);
    const battleDefaultMode = Number(parameters['battle default SE'] || 0);
    const interval = Number(parameters['interval'] || 2);
    const name1 = (parameters['name1'] || 'Cursor1');
    const volume1 = Number(parameters['volume1'] || 90);
    const pitch1 = Number(parameters['pitch1'] || 100);
    const name2 = (parameters['name2'] || 'Cursor2');
    const volume2 = Number(parameters['volume2'] || 75);
    const pitch2 = Number(parameters['pitch2'] || 125);

    const name3 = (parameters['name3'] || 'Cursor3');
    const volume3 = Number(parameters['volume3'] || 40);
    const pitch3 = Number(parameters['pitch3'] || 100);

    const name4 = (parameters['name4'] || 'Cursor4');
    const volume4 = Number(parameters['volume4'] || 40);
    const pitch4 = Number(parameters['pitch4'] || 100);

    const name5 = (parameters['name5'] || 'Cursor5');
    const volume5 = Number(parameters['volume5'] || 40);
    const pitch5 = Number(parameters['pitch5'] || 100);

    const name6 = (parameters['name6'] || 'Cursor6');
    const volume6 = Number(parameters['volume6'] || 40);
    const pitch6 = Number(parameters['pitch6'] || 100);

    const name7 = (parameters['name7'] || 'Cursor7');
    const volume7 = Number(parameters['volume7'] || 40);
    const pitch7 = Number(parameters['pitch7'] || 100);

    const name8 = (parameters['name8'] || 'Cursor8');
    const volume8 = Number(parameters['volume8'] || 40);
    const pitch8 = Number(parameters['pitch8'] || 100);

    const name9 = (parameters['name9'] || 'Cursor9');
    const volume9 = Number(parameters['volume9'] || 40);
    const pitch9 = Number(parameters['pitch9'] || 100);

    const name10 = (parameters['name10'] || 'Cursor10');
    const volume10 = Number(parameters['volume10'] || 40);
    const pitch10 = Number(parameters['pitch10'] || 100);

  //
  // initialize variables
  //
  const _Window_Message_initMembers = Window_Message.prototype.initMembers;
  Window_Message.prototype.initMembers = function() {
    _Window_Message_initMembers.call(this);
    this.charSECount = 0;
    this.charSEmode = defaultMode;
  };

  //
  // set Battle Mode
  //
  const _Scene_Battle_createMessageWindow =
   Scene_Battle.prototype.createMessageWindow;
  Scene_Battle.prototype.createMessageWindow = function() {
    _Scene_Battle_createMessageWindow.call(this);
    this._messageWindow.charSEmode = battleDefaultMode;
  };

  //
  // set the char SE mode
  //  
  const _Window_Message_processEscapeCharacter =
   Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'SE':
      this.charSEmode = this.obtainEscapeParam(textState);
      break;
    case '>':
      // force to play char SE once. 
      this.charSECount = interval + 1;
      // do not break, also do default process.
    default:
      _Window_Message_processEscapeCharacter.call(this, code, textState);
      break;
    }
  };

  //
  // play char SE at message window
  // 
  const _Window_Message_shouldBreakHere =
   Window_Message.prototype.shouldBreakHere;
  Window_Message.prototype.shouldBreakHere = function(textState) {
    const doesBreak = _Window_Message_shouldBreakHere.call(this, textState);
    if (doesBreak) {
      this.processCharSE();
    }
    return doesBreak;
  };

  Window_Message.prototype.processCharSE = function(){
    if(this._showFast) { // triggered (= skipping message)
      return;
    }
    if(!this._lineShowFast) { // unless '\>' mode
      ++this.charSECount;
    }
    if(this.charSECount > interval) {
      this.playCharSE();
      this.charSECount = 0;
    }
  };

    Window_Message.prototype.playCharSE = function () {
        switch (this.charSEmode) {
            case 0:
                // not play sound
                break;
            case 1:
                if (name1) {
                    let audio = {};
                    audio.name = name1;
                    audio.pitch = pitch1;
                    audio.volume = volume1;
                    AudioManager.playStaticSe(audio);
                }
                break;
            case 2:
                if (name2) {
                    let audio = {};
                    audio.name = name2;
                    audio.pitch = pitch2;
                    audio.volume = volume2;
                    AudioManager.playStaticSe(audio);
                }
                break;
            case 3:
                if (name3) {
                    let audio = {};
                    audio.name = name3;
                    audio.pitch = pitch3;
                    audio.volume = volume3;
                    AudioManager.playStaticSe(audio);
                }
                break;
            case 4:
                if (name4) {
                    let audio = {};
                    audio.name = name4;
                    audio.pitch = pitch4;
                    audio.volume = volume4;
                    AudioManager.playStaticSe(audio);
                }
                break;
            case 5:
                if (name5) {
                    let audio = {};
                    audio.name = name5;
                    audio.pitch = pitch5;
                    audio.volume = volume5;
                    AudioManager.playStaticSe(audio);
                }
                break;
            case 6:
                if (name6) {
                    let audio = {};
                    audio.name = name6;
                    audio.pitch = pitch6;
                    audio.volume = volume6;
                    AudioManager.playStaticSe(audio);
                }
                break;
            case 7:
                if (name7) {
                    let audio = {};
                    audio.name = name7;
                    audio.pitch = pitch7;
                    audio.volume = volume7;
                    AudioManager.playStaticSe(audio);
                }
                break;
            case 8:
                if (name8) {
                    let audio = {};
                    audio.name = name8;
                    audio.pitch = pitch8;
                    audio.volume = volume8;
                    AudioManager.playStaticSe(audio);
                }
                break;
            case 9:
                if (name9) {
                    let audio = {};
                    audio.name = name9;
                    audio.pitch = pitch9;
                    audio.volume = volume9;
                    AudioManager.playStaticSe(audio);
                }
                break;
            case 10:
                if (name10) {
                    let audio = {};
                    audio.name = name10;
                    audio.pitch = pitch10;
                    audio.volume = volume10;
                    AudioManager.playStaticSe(audio);
                }
                break;
            default:
                // not supported yet
                break;
        }
    };
})();
