//=============================================================================
// Plugin for RPG Maker MZ
// 111_InputFormMZ.js
//=============================================================================
// This plugin is the MZ version of 111_InputForm.js the RMMV plugin.
// [History]
// 111_InputForm.js
// 2017.Apr.15 Ver1.0.0 First Release by Sasuke KANNAZUKI, et al.
// 111_InputFormMZ.js
// 2020.Nov.10 Ver1.0.0 First Release
// 2021.Jan.08 Ver1.0.1 Fix bug when choice command comes after form input.
// 2021.Jan.23 Ver1.1.0 Fix bug on message window doesn't hide after event.
//   This problem is solved by うなぎおおとろ(Unagi Ootoro).

/*:
 * @target MZ
 * @plugindesc [Ver1.1.0]Display input form on the game screen
 * @author Sasuke KANNAZUKI
 *
 * @param OK Button Text
 * @desc Text of OK Button
 * @type string
 * @default OK
 *
 * @param Display Cancel Button
 * @text Display Cancel Button?
 * @desc Whether to display cancel button
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 *
 * @param Cancel Button Text
 * @parent Display Cancel Button
 * @desc Text of Cancel Button
 * @type string
 * @default Cancel
 *
 * @param Judge Switch Interval
 * @desc Interval milisecond of checking the switch.
 * By reducing number, more sensitive, maybe overload.
 * @type number
 * @min 1
 * @default 100
 *
 * @param Switch ID Selected OK
 * @desc Turn ON when OK pressed, turn OFF when Cancel pressed.
 * if the ID is 0, no effect.
 * @type switch
 * @min 0
 * @default 0
 *
 * @param Force OK Switch ID
 * @desc When the switch ON, input form is forcedly decided.
 * If the ID is 0, no effect.
 * @type switch
 * @min 0
 * @default 0
 *
 * @param Force Cancel Switch ID
 * @desc When the switch ON, input form is forcedly cancelled.
 * If the ID is 0, no effect.
 * @type switch
 * @min 0
 * @default 0
 *
 * @command open
 * @text Open Input Form
 * @desc Read help to understand all parameters
 *
 * @arg x
 * @text Input Form X
 * @desc Set -1 to automatically appropriate position
 * @type number
 * @min -1
 * @default -1
 *
 * @arg y
 * @text Input Form Y
 * @desc Set -1 to automatically appropriate position
 * @type number
 * @min -1
 * @default -1
 *
 * @arg max
 * @text Max String Length
 * @desc Set by em. Set 0 to limitless length
 * @type number
 * @default 10
 * @min 0
 *
 * @arg where to store
 * @text Where to Store the Result
 * @desc You can select either actor name or variable
 * @type select
 * @option Actor's Name
 * @value actor
 * @option Variable ID
 * @value variable
 * @option Veriable Name
 * @value varname
 * @default variable
 * 
 * @arg n
 * @parent where to store
 * @text Actor ID
 * @type actor
 * @min 0
 * @default 0
 *
 * @arg s
 * @parent where to store
 * @text Variable ID
 * @type variable
 * @min 0
 * @default 0
 *
 * @arg s2
 * @parent where to store
 * @text Variable Name
 * @type string
 * @default 
 *
 * @arg force_ok_sw
 * @text Force OK Switch ID
 * @desc When the switch is ON, current string is adopted. Set 0 to adopt parameters setting.
 * @type switch
 * @min 0
 * @default 0
 *
 * @arg force_no_sw
 * @text Force Cancel Switch ID
 * @desc When the switch is ON, it discards current string. Set 0 to adopt parameters setting.
 * @type switch
 * @min 0
 * @default 0
 *
 * @arg btn_x
 * @text OK Button X
 * @desc Default:0
 * @type number
 * @default 0
 *
 * @arg btn_y
 * @text OK Button Y
 * @desc Default:72
 * @type number
 * @default 72
 *
 * @arg btn_xc
 * @text Cancel Button X
 * @desc Default:120
 * @type number
 * @default 120
 *
 * @arg btn_yc
 * @text Cancel Button Y
 * @desc Default:72
 * @type number
 * @default 72
 *
 * @arg initial string
 * @text Initial String
 * @desc You can set actor's name, variable and any string.
 * @type select
 * @option Actor's Name
 * @value actor
 * @option Variable
 * @value variable
 * @option String
 * @value string
 * @default string
 *
 * @arg init_n
 * @parent initial string
 * @text Actor ID
 * @desc Set text the actor's name
 * @type actor
 * @default 0
 *
 * @arg init_v
 * @parent initial string
 * @text Variable ID
 * @desc Set text the value of the variable.
 * @type variable
 * @default 0
 *
 * @arg init
 * @parent initial string
 * @text String
 * @desc It accepts any string including empty string
 * @type string
 * @default 
 *
 * @arg rest_x
 * @text X of String Number Window
 * @desc Default:288
 * @type number
 * @default 288
 *
 * @arg rest_y
 * @text Y of String Number Window
 * @desc Default:72
 * @type number
 * @default 72
 *
 * @arg w
 * @text Width of Input Form
 * @desc set by em.(Default:15)
 * @type number
 * @default 15
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 * This plugin enables player to input string by using HTML5+CSS functions.
 * 
 * [At first you have to do]
 * This plugin needs another css file that is attached in the archive
 * whose name is "111_InputFormMZ.css".
 * Please make the "css" folder at the same folder as index.html,
 * and then put the css file.
 * If you have the knowledge of css, you can easily change the style of the
 * form by overwriting the css file.
 * 
 * [Plugin Command Guide]
 * To display input form, you have to execute plugin command.
 * Here is the explanation of its arguments.
 *
 * - Input Form X and Y
 * Set the position of input form.
 * Set (-1,-1) to display center or appropriate position.
 *
 * - Max String Length
 * Set 0 to limitless string length. 
 * Even if you set maximum string length, player can input limitless length
 * string, but the string is truncated when the input form is closed.
 * This rule is also applied when the form is forcely terminated (to explain
 * below).
 *
 * - Where to store the Result
 * You can select either an actor's name or a value of variable.
 * You can set the 3 types, but it ignores unselected value
 * (Ex. Variable ID when the value is Actor)
 *
 * - Force OK/Cancel Switch ID
 * You also can set time limit of input.
 * For example, when you set Force OK Switch ID be 3,
 * the input form will be forcely closed when the switch #3 become ON
 * (You can implement such a process by using a parallel event).
 * Note: when the form is forcely closed, the designated variable keeps
 * the string at the moment!
 * 'Force OK Switch ID' and 'Force Cancel Switch ID' are automatically
 * turn OFF when the form is closed. (whreas, switch set in plugin command
 * doesn't change, it's the difference.)
 *
 * [Important note (esp. if you use parallel events)]
 * - Event command interpreter will not exceed until ending the form inputting.
 * - If you checking the variable by parallel event, make sure that there's
 * slight time rug from input ending by next event command execution.
 * (Comment by Sasuke: To run 'Wait 1 frame' after the input is
 * one of the good way to confirm the valuer of variable.)
 *
 * - OK/Cancel Button X/Y, and X/Y of String Number Window
 * The position of each button/window.
 * Note that the origin is left-up of Input Form.
 * Cancel Button can omit by setting plugin parameter.
 * String Number Window doesn't appear when it enables limitless length string.
 *
 * - Initial String
 * When input form opens, the string is set as default.
 * You can select actor's name, variable value, and constant string.
 * It ignores the value of unselected type.
 *
 * - Width of Input Form
 * Width of input form is supposed to defined in CSS file(default: 15em).
 * You can change the width by setting this.
 * Note that 1em is equals to the height of each letter,
 * so if you don't use propotional font (defalut), 1em is length of 2 letters.
 * (and at 2 byte character such as Japanese, 1em is the 1 character.)
 *
 * [Fixed Bug]
 * On previous version (Ver1.0.1), when you open input form during displaying
 * message window, the event terminates without closing the message window.
 * This problem is fixed by great help of UnagiOotoro(うなぎおおとろ).
 * Thanks to him.
 *
 * [License]
 * this plugin's prototype is written by 111 and Kurambon. Thanks to them.
 * This plugin is public domain. There's no limitation of use.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc [Ver1.1.0]ゲーム画面上にHTMLの入力フォームを表示します
 * @author 神無月サスケ
 *
 * @param OK Button Text
 * @text 「決定」ボタンの文字列
 * @desc 「決定」ボタンに表示する文字列
 * @type string
 * @default 決定
 *
 * @param Display Cancel Button
 * @text 「キャンセル」ボタン表示？
 * @desc 「キャンセル」ボタンを表示し有効にするか。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 *
 * @param Cancel Button Text
 * @parent Display Cancel Button
 * @text 「キャンセル」ボタンの文字列
 * @desc 「キャンセル」ボタンを表示する際の文字列
 * @type string
 * @default キャンセル
 *
 * @param Judge Switch Interval
 * @text 強制終了判定インターバル
 * @desc 強制終了スイッチの判定ミリ秒間隔です(推奨値100)。
 * 値を減らすと精度が良くなりますが重くなります。
 * @type number
 * @min 1
 * @default 100
 *
 * @param Switch ID Selected OK
 * @text フォーム終了時用スイッチ
 * @desc フォームの決定でON、キャンセルでOFFになるスイッチID。
 * 0の時は何も行いません。
 * @type switch
 * @min 0
 * @default 0
 *
 * @param Force OK Switch ID
 * @text 強制決定スイッチ
 * @desc このIDのスイッチがONになるとフォームを強制決定します。
 * 0の時は作動しません。
 * @type switch
 * @min 0
 * @default 0
 *
 * @param Force Cancel Switch ID
 * @text 強制キャンセルスイッチ
 * @desc このIDのスイッチがONになるとフォームを強制キャンセルします。
 * 0の時は作動しません。キャンセル無効の時も同様です。
 * @type switch
 * @min 0
 * @default 0
 *
 * @command open
 * @text フォームを開く
 * @desc 設定事項が多いため、ヘルプを参考にしてください。
 *
 * @arg x
 * @text フォームX座標
 * @desc -1を指定すると、中央に自動設定されます。
 * @type number
 * @min -1
 * @default -1
 *
 * @arg y
 * @text フォームY座標
 * @desc -1を指定すると、中央に自動設定されます。
 * @type number
 * @min -1
 * @default -1
 *
 * @arg max
 * @text 最大文字数
 * @desc emで指定。1emは文字2つ分。0を指定すると制限なし
 * @type number
 * @default 10
 * @min 0
 *
 * @arg whereToStore
 * @text 結果の文字列の格納先
 * @desc アクター名か変数を選べます
 * @type select
 * @option アクター名
 * @value actor
 * @option 変数(IDで設定)
 * @value variable
 * @option 変数名
 * @value varname
 * @default variable
 * 
 * @arg n
 * @parent whereToStore
 * @text アクターID
 * @type actor
 * @min 0
 * @default 0
 *
 * @arg s
 * @parent whereToStore
 * @text 変数ID
 * @type variable
 * @min 0
 * @default 0
 *
 * @arg s2
 * @parent whereToStore
 * @text 変数名
 * @type string
 * @default 
 *
 * @arg force_ok_sw
 * @text 強制決定スイッチID
 * @desc ONになると強制的に決定するスイッチ。0にするとデフォルト値に
 * @type switch
 * @min 0
 * @default 0
 *
 * @arg force_no_sw
 * @text 強制キャンセルスイッチID
 * @desc ONになると強制的にキャンセルするスイッチ。0を指定するとデフォルト値に
 * @type switch
 * @min 0
 * @default 0
 *
 * @arg btn_x
 * @text 決定ボタン相対X座標
 * @desc デフォルト値0
 * @type number
 * @default 0
 *
 * @arg btn_y
 * @text 決定ボタン相対Y座標
 * @desc デフォルト値72
 * @type number
 * @default 72
 *
 * @arg btn_xc
 * @text キャンセルボタン相対X座標
 * @desc デフォルト値120
 * @type number
 * @default 120
 *
 * @arg btn_yc
 * @text キャンセルボタン相対Y座標
 * @desc デフォルト値72
 * @type number
 * @default 72
 *
 * @arg initial string
 * @text 初期文字列
 * @desc アクター名、変数、文字列のいずれかを指定します。
 * @type select
 * @option アクター名
 * @value actor
 * @option 変数
 * @value variable
 * @option 文字列
 * @value string
 * @default string
 *
 * @arg init_n
 * @parent initial string
 * @text アクターID
 * @desc 該当するアクターの名前になります
 * @type actor
 * @default 0
 *
 * @arg init_v
 * @parent initial string
 * @text 変数ID
 * @desc 該当する変数の文字列になります
 * @type variable
 * @default 0
 *
 * @arg init
 * @parent initial string
 * @text 文字列
 * @desc 空文字含む任意の文字列を設定します。
 * @type string
 * @default 
 *
 * @arg rest_x
 * @text 文字数表示の相対X座標
 * @desc デフォルト値288
 * @type number
 * @default 288
 *
 * @arg rest_y
 * @text 文字数表示の相対Y座標
 * @desc デフォルト値72
 * @type number
 * @default 72
 *
 * @arg w
 * @text 入力フォームの幅
 * @desc emで指定します(デフォルト:15)
 * @type number
 * @default 15
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 * HTML5とCSSの機能を使用して画面上に文字入力フォームを表示します。
 * 
 * [最初にすべきこと]
 * このプラグインの実行には、同梱されている「111_InputFormMZ.css」が必要です。
 * index.html のあるフォルダに css フォルダを作成し、そこにこのファイルを
 * 置いてください。
 * このCSSファイルでは入力フォームやボタンのフォームが設定されており、
 * これを書きかえることで自由にスタイルが変更できます。
 * CSSに詳しくない方は「css 書き方」などで検索すればよいでしょう。
 * 
 * [プラグインコマンド]
 * 実行はプラグインコマンド呼び出しで行います。
 * 
 * ・フォームX座標、Y座標
 * 入力フォームの座標です。
 * (-1,-1)にすると、自動的に中央に寄ります。
 * メッセージウィンドウ表示中は、適宜表示箇所を変更します。
 *
 * ・最大文字数
 * 0にすると、制限はなくなります。
 * なお、最大文字数を設定した場合でも、それ以上の文字数が入力可能ですが、
 * フォームが閉じられた時に、最大文字数を超える部分はカットされます。
 * これは下記の追加機能によって強制終了した場合でも同じです。
 *
 * ・結果の文字列の格納先
 * アクター名または変数への格納が可能です。
 * どれにするかを選んでください。
 * 指定した以外の設定値(例：アクターIDの時は変数IDの値）は無視されます。
 *
 * ・強制決定スイッチID、強制キャンセルスイッチID
 * これらのスイッチがONになった時に、強制的に入力フォームは閉じます。
 * 強制決定の場合、その時の文字列が格納されます。
 * これは主に、入力にタイムリミットを設定する場合に使われます。
 * 並列イベントを別に作成しスイッチを操作する必要があります。
 * - 0を選択した時は、パラメータの値が参照されます。
 * なお、プラグインコマンドではなく パラメータでこれらを設定した場合、
 * フォームを閉じた際、自動的にOFFになります。
 * (プラグインオプションのスイッチはそうなりません)
 *
 * 注意事項(特に並列イベントを使う場合)：
 * - フォーム入力が終了するまで、次のイベントコマンドには進みません。
 * - もし、フォーム入力変数を並列イベントで参照する場合、
 * 入力と実際に変数に反映されるまでの間に若干のタイムラグがあることに注意。
 * (サスケ注:プラグインコマンド実行直後に変数を参照したい場合、
 * 間に「ウェイト:1フレーム」を入れると確実です。)
 *
 * ・決定ボタン、キャンセルボタン、文字数表示の相対座標
 * 入力フォームの左上を基準にした、ボタンの位置です。
 * キャンセルボタンは、オプションで非表示にも出来ます。
 * 文字数は、設定を0にした場合（＝無制限）の時は表示されません。 
 *
 * ・初期文字列
 * フォームを開いたときにデフォルトで入力される文字列です。
 * アクター、変数、文字列から選択可能で、選択しなかったパラメータの値は
 * 単に無視されます。
 *
 * ・入力フォームの幅
 * 入力フォームの幅は、CSSファイルにて設定されています(初期値：15em)。
 * このサイズを変更可能です。
 * 1emは1文字の高さに相当し、プロポーショナルフォントを使用しない限りは、
 * 指定した値が、表示可能な日本語文字数の長さと等しくなります。
 *
 * [解決されたバグ]
 * 以前のバージョン(Ver1.0.1以前)では、メッセージウィンドウを出した状態で
 * 入力フォームを開く場合、必ず入力後にもメッセージウィンドウを出さなければ
 * メッセージウィンドウが消えないままイベントが終了していました。
 * ツクールフォーラムにおける、うなぎおおとろ様のアドバイスにより解決しました。
 * うなぎおおとろ様に感謝します。
 *
 * [著作権表記]
 * このプラグインは、１１１様、くらむぼん様の 111_InputForm.js をベースに、
 * 神無月サスケが大規模な加筆修正を行ったものです。お二方に感謝します。
 * 
 * このプラグインはパブリックドメインです。利用にいかなる制限もありません。
 */

(() => {
  const pluginName = '111_InputFormMZ';

  const stopPropagation = event => event.stopPropagation();

  //
  // Import CSS at first.
  // (css追加)
  //
  (() => {
    let css = document.createElement('link');
    css.rel = "stylesheet";
    css.type = 'text/css';
    css.href = './css/111_InputFormMZ.css';
    let b_top = document.getElementsByTagName('head')[0];
    b_top.appendChild(css);
  })();

  //
  // Invalidate input function on MV script layer
  // (キー入力不可にする為に)
  //
  Input.formMode = false;
  const _Input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function (event) {
    if (Input.formMode) {
      return;
    }
    _Input_onKeyDown.call(this, event);
  };
  const _Input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function (event) {
    if(Input.formMode) {
      return;
    }
    _Input_onKeyUp.call(this, event);
  };

  //
  // Interpreter waits until form input is terminated.
  // (入力終わるまで次のイベントコマンド読み込まない)
  //
  const _Game_Interpreter_updateWaitMode =
   Game_Interpreter.prototype.updateWaitMode;    
  Game_Interpreter.prototype.updateWaitMode = function () {
    if(this._waitMode == 'input_form') {
      return true;
    }
    return _Game_Interpreter_updateWaitMode.call(this);
  }

  //
  // when input form opens while message window is open, not close it.
  //
  Game_Interpreter.prototype.processInputForm = function() {
    const command = this._list[this._index];
    // if the next command is Plugin Command "InputForm"
    if (command && command.code === 357) {
      if (command.parameters[0] === pluginName) {
        this.command357(command.parameters);
      }
    }
  };

  const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
  Game_Interpreter.prototype.command101 = function(params) {
    const result = _Game_Interpreter_command101.call(this, params);
    const command = this._list[this._index];
    this.processInputForm();
    return result;
  };

  const _Game_Interpreter_command402 = Game_Interpreter.prototype.command402;
  Game_Interpreter.prototype.command402 = function(params) {
    const result = _Game_Interpreter_command402.call(this, params);
    this.processInputForm();
    return result;
  };

  const _Game_Interpreter_command103 = Game_Interpreter.prototype.command103;
  Game_Interpreter.prototype.command103 = function(params) {
    const result = _Game_Interpreter_command103.call(this, params);
    this.processInputForm();
    return result;
  };

  const _Game_Interpreter_command104 = Game_Interpreter.prototype.command104;
  Game_Interpreter.prototype.command104 = function(params) {
    const result = _Game_Interpreter_command104.call(this, params);
    this.processInputForm();
    return result;
  };

  const _Window_Message_doesContinue = Window_Message.prototype.doesContinue;
  Window_Message.prototype.doesContinue = function() {
    return Input.formMode || _Window_Message_doesContinue.call(this);
  };

  //
  // define signal that requests message window close.
  //
  const _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this._messageWindowCloseSignal = false;
  };

  Game_Temp.prototype.messageWindowCloseSignal = function() {
    return this._messageWindowCloseSignal;
  };

  Game_Temp.prototype.setMessageWindowCloseSignal = function(signal) {
    this._messageWindowCloseSignal = signal;
  };

  const _Window_Message_update = Window_Message.prototype.update;
  Window_Message.prototype.update = function() {
    if ($gameTemp.messageWindowCloseSignal()) {
      $gameTemp.setMessageWindowCloseSignal(false);
      this.terminateMessage();
      return;
    }
    _Window_Message_update.call(this);
  };

  //
  // Routine for HTML
  //
  HTMLElement.prototype.positionAdjust = function(screenPos, targetPos) {
    // read CSS properties
    if (this.defaultFontSize == null) {
      let _elem = document.getElementById(this.id);
      if (_elem.currentStyle) { // for IE and so on.
        _elem = _elem.currentStyle;
      } else { // for Chrome, Safari, Opera, and so on.
        _elem = window.getComputedStyle(_elem, null);
      }
      this.defaultFontSize = parseInt(_elem['font-size']) || 24;
    }
    // set width by scale
    const scale = Graphics._realScale;
    this.style.left = Math.floor(screenPos.x + targetPos.x * scale) + 'px';
    this.style.top  = Math.floor(screenPos.y + targetPos.y * scale) + 'px';
    this.style['font-size'] = Math.floor(this.defaultFontSize * scale) + 'px';
  };

  //=========================================================================
  // process parameters (and related functions)
  //=========================================================================
  const parameters = PluginManager.parameters(pluginName);
  const textOkButton = parameters['OK Button Text'] || 'OK';
  const textCancelButton = parameters['Cancel Button Text'] || 'Cancel';
  const doDisplayCancel = eval(parameters['Display Cancel Button'] || 'true');
  const judgeInterval = Number(parameters['Judge Switch Interval'] || 100);
  const switchIdOkPressed = Number(parameters['Switch ID Selected OK'] || 0);
  const switchIdForceOk = Number(parameters['Force OK Switch ID'] || 0);
  const switchIdForceCancel = +(parameters['Force Cancel Switch ID'] || 0);

  //
  // analyze variable parameter notation
  //
  const getVariableIdWhoseNameIs = name => {
    const varNames = $dataSystem.variables;
    for (let i = 1; i < varNames.length; i++) {
      if (varNames[i] === name) {
        return i;
      }
    }
    return 0;
  };

  const getVariableIdFromParam = varIdNotation => {
    let  reg;
    varIdNotation = String(varIdNotation);
    if (reg = (/^(V?)([0-9]+)/i).exec(varIdNotation)) {
      return reg[1] ? $gameVariables.value(+reg[2]) : +reg[2];
    } else {
      return getVariableIdWhoseNameIs(varIdNotation);
    }
  };

  //
  // determine initial string of input form
  //
  const defaultInputString = params => {
    switch (params['initial string']) {
    case 'actor':
      const actorId = +params.init_n || +params.n;
      if (actorId && $gameActors.actor(actorId)) {
        return $gameActors.actor(actorId).name();
      }
      break;
    case 'variable':
      const varId = +params.init_v;
      const value = $gameVariables.value(varId);
      if (value) {
        return value;
      }
      break;
    case 'string':
      return params.init;
    }
    return '';
  };

  //
  // routine for the case that string length is limited
  //
  const _strLengthText = (current, max) => String(current) + '/' + max;
  const _setStringColorByLength = (target, current, max) => {
    target.style.color = current > max ? 'red' : 'white';
  };
  const truncateString = (text, max) => max ? text.substring(0, max) : text;
  const setLimitedStrLength = (target, current, max) => {
    target.textContent = _strLengthText(current, max);
    _setStringColorByLength(target, current, max);
  };

  //
  // centering the input form
  //
  const defaultTargetX = target => {
    const rect = target.getBoundingClientRect();
    const width = rect.width + window.pageXOffset;
    return Math.floor((Graphics.boxWidth - width) / 2);
  };
  const defaultTargetY = target => {
    // when message window is displaying at the center,
    // change position to below the message window.
    const msgWnd = SceneManager._scene._messageWindow;
    if (msgWnd.isOpen() && msgWnd._positionType === 1) {
      return msgWnd.y + msgWnd.height + msgWnd.standardPadding() * 2;
    }
    const rect = target.getBoundingClientRect();
    const height = rect.height + window.pageYOffset;
    return Math.floor((Graphics.boxHeight - height) / 2);
  };

  //
  // resize the width of input form
  //
  const setFormWidth = (maxTextLength, target) => {
    target.style.cssText += " width: " + maxTextLength + 'em';
  };

  //=========================================================================
  // Game_Interpreter - register plugin command
  //=========================================================================
  //
  // process plugin commands
  //
  let currentInterpreter = null;
  const _Game_Interpreter_command357 = Game_Interpreter.prototype.command357;
  Game_Interpreter.prototype.command357 = function(params) {
    currentInterpreter = this;
    return _Game_Interpreter_command357.call(this, params);
  };
  PluginManager.registerCommand(pluginName, 'open', args => {
    const params = processParameters(args);
    if (currentInterpreter) {
      currentInterpreter._performInput(params);
    }
  });
  const processParameters = params => {
    params['x'] = +params['x'] === -1 ? null : +params['x'];
    params['y'] = +params['y'] === -1 ? null : +params['y'];
    params['force_ok_sw'] = +params['force_ok_sw'] || switchIdForceOk;
    params['force_no_sw'] = +params['force_no_sw'] || switchIdForceCancel;
    return params;
  };

  Game_Interpreter.prototype._performInput = function(params) {
    //
    // set variables from params
    //
    let targetX = +params['x'] || null;
    let targetY = +params['y'] || null;

    let varId = actorId = 0;
    switch (params['whereToStore']) {
    case 'actor':
      actorId = +params['n'] || 0;
      break;
    case 'variable':
      varId = +params['s'] || 0;
      break;
    case 'varname':
      varId = getVariableIdWhoseNameIs(params['s2']);
      break;
    }

    const maxCount = +params['max'] || null;
    const ifSwitchId = +params['force_ok_sw'] || 0;
    const rejectSwitchId = +params['force_no_sw'] || 0;
    const buttonX = +params['btn_x'];
    const buttonY = +params['btn_y'];
    const cancelButtonX = +params['btn_xc'];
    const cancelButtonY = +params['btn_yc'];
    const strLengthX = +params['rest_x'];
    const strLengthY = +params['rest_y'];
    const formWidth = +params['w'] || null;

    //
    // define main gui
    //
    const interpreter = this;
    let _eventId = null;
    const gui = {
      input: null,
      submit: null,
      cancel: null,
      stringLength: null,
      is_pc: true,
      init: function () {
        this.is_pc = Utils.isNwjs();
        this.create();
        this.input.focus();
        this.screenAdjust();
      },
      create: function () {
        // Input form (入力フォーム)
        this.input = document.createElement('input');
        this.input.setAttribute('id', '_111_input');
        this.input.value = defaultInputString(params);
        document.body.appendChild(this.input);
        if (formWidth) {
          setFormWidth(formWidth, this.input);
        }
        targetX = targetX || defaultTargetX(this.input);
        targetY = targetY || defaultTargetY(this.input);
        // Submit Button (送信ボタン)
        this.submit = document.createElement('input');
        this.submit.setAttribute('type', 'submit');
        this.submit.setAttribute('id', '_111_submit');
        this.submit.setAttribute('value', textOkButton);
        document.body.appendChild(this.submit);
        // Cancel Button (キャンセルボタン)
        if (doDisplayCancel) {
          this.cancel = document.createElement('input');
          this.cancel.setAttribute('type', 'submit');
          this.cancel.setAttribute('id', '_111_submit');
          this.cancel.setAttribute('value', textCancelButton);
          document.body.appendChild(this.cancel);
        }
        // Display string length of current/max (入力/最大文字数表示)
        if (maxCount) {
          this.strLength = document.createElement('span');
          this.strLength.setAttribute('id', '_Sasuke_RestStrLength');
          setLimitedStrLength(this.strLength, this.input.value.length,
           maxCount);
          document.body.appendChild(this.strLength);
        }
      },
      accept: function () {
        this.input.value = truncateString(this.input.value, maxCount);
        if (varId) {
          $gameVariables.setValue(varId, this.input.value);
        }
        if (actorId && $gameActors.actor(actorId)) {
          $gameActors.actor(actorId).setName(this.input.value);
        }
        if (switchIdOkPressed) {
          $gameSwitches.setValue(switchIdOkPressed, true);
        }
        this.end();
      },
      reject: function () {
        if (switchIdOkPressed) {
          $gameSwitches.setValue(switchIdOkPressed, false);
        }
        this.end();
      },
      start: function () {
        interpreter.setWaitMode('input_form');
        Input.clear();
        Input.formMode = true;
      },
      end: function () {
        this.input.remove();
        this.submit.remove();
        if (this.cancel) {
          this.cancel.remove();
        }
        if (this.strLength) {
          this.strLength.remove();
        }
        window.removeEventListener("resize", resizeEvent, false);
        interpreter.setWaitMode('');
        Input.formMode = false;
        if (_eventId) {
          clearInterval(_eventId);
        }
      },
      screenAdjust: function () { // canvasの左上を基準にした位置に合わせる
        const _canvas = document.getElementById('UpperCanvas') ||
          document.getElementById('gameCanvas');
        const rect = _canvas.getBoundingClientRect();
        const screenX = rect.left;
        const screenY = rect.top;
        this.input.positionAdjust({x:screenX, y:screenY},
         {x:targetX, y:targetY});
        this.submit.positionAdjust({x:screenX, y:screenY},
         {x:targetX + buttonX, y:targetY + buttonY});
        if (this.cancel) {
          this.cancel.positionAdjust({x:screenX, y:screenY},
           {x:targetX + cancelButtonX, y:targetY + cancelButtonY});
        }
        if (this.strLength) {
          this.strLength.positionAdjust({x:screenX, y:screenY},
           {x:targetX + strLengthX, y:targetY + strLengthY});
        }
      }
    };
    //
    // Init gui
    //
    gui.init();

    //
    // add event listeners
    //

    // accept when enter key(決定キーで送信)
    gui.input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        $gameTemp.setMessageWindowCloseSignal(true);
        Input.clear();
        gui.accept();
        // stop propagation not to fire keydown event in document.
        // (親へのイベント伝播を止める(documentのkeydownが反応しないように))
        e.stopPropagation();
      }
    });
    // Set event player click submit/cancel button.
    gui.submit.addEventListener("click", function () {
      $gameTemp.setMessageWindowCloseSignal(true);
      gui.accept();
      return false;
    });
    if (gui.cancel) {
      gui.cancel.addEventListener("click", function () {
        $gameTemp.setMessageWindowCloseSignal(true);
        gui.reject();
        return false;
      });
    }
    // modify inputting string length
    if (gui.strLength) {
      gui.input.addEventListener("keyup", function () {
        setLimitedStrLength(gui.strLength, gui.input.value.length, maxCount);
        return false;
      });
    }
    // stop propagation to prevent clicking bomb on game screen
    // (裏のゲーム画面のクリック暴発を防ぐ)
    gui.input.addEventListener("mousedown", stopPropagation);
    gui.submit.addEventListener("mousedown", stopPropagation);
    if (gui.cancel) {
      gui.cancel.addEventListener("mousedown", stopPropagation);
    }
    // For iOS (iOS doesn't fire several click events)
    // (iOSでclickイベント取れない対策)
    gui.input.addEventListener("touchstart", stopPropagation);
    gui.submit.addEventListener("touchstart", stopPropagation);
    if (gui.cancel) {
      gui.cancel.addEventListener("touchstart", stopPropagation);
    }

    //
    // Event for forcing termination by switch condition
    // (スイッチによって強制終了するイベント)
    //
    if (ifSwitchId || rejectSwitchId) {
      _eventId = setInterval(() => {
        if ($gameSwitches.value(rejectSwitchId)) {
          if (switchIdForceCancel) {
            $gameSwitches.setValue(switchIdForceCancel, false);
          }
          gui.reject();
        } else if ($gameSwitches.value(ifSwitchId)) {
          if (switchIdForceOk) {
            $gameSwitches.setValue(switchIdForceOk, false);
          }
          gui.accept();
        }
      }, judgeInterval);
    }
    //
    // At some condition, it needs to change ratio(%) of elements' size
    // everytime when browser's size changes.
    //
    const resizeEvent = gui.screenAdjust.bind(gui);
    window.addEventListener("resize", resizeEvent, false);

    //
    // start
    //
    gui.start();
  };
})();