/*:
 * @target MZ
 * @plugindesc メモ帳っぽいもの表示プラグイン
 * @author 白金隅
 *
 *
 * @help
 * １１１, くらむぼんさんの文字入力フォームを参考にtextareaに対応した複数行入力できるプラグインです
 * イベントコマンドの「名前入力の処理」とは違い、
 * 慣れ親しんだキーボード入力やフリック入力などを用いられます。
 * また、漢字を含む自由な文字が入力できます。
 * 
 * ---準備---
 * ゲームフォルダにあるcssフォルダ（なければ作る）にFuwaFuwaMemo.cssを入れましょう。
 * ちなみにこのファイルをいじって入力フォームのデザイン・幅などを変えられます。
 * いじり方がわからなかったら「css 書き方」などで検索だ！
 * 
 * ---RPGツクールMZでの使い方---
 * プラグインコマンドを用いて、入力欄を表示できます。
 * 最低限「入力欄のX位置」「入力欄のY位置」で表示位置を調整して、
 * 「入力結果の代入先」に変数を設定すれば動きます。
 * 必要なら他のパラメータも調節してみてください。
 * 
 * ---RPGツクールMVでの使い方---
 * ◆プラグインコマンド：InputForm x=350;y=200;v=11;max=5;
 * みたいな感じで。この例だとx350,y200の位置に表示、結果を11番の変数に保存。
 * 最大文字数は5（maxは省略すれば無制限にもできる）
 *
 * 時間切れなどを作りたい時は、if_s=3;を付けると
 * ”スイッチ３がONになった場合”に強制終了できます
 * 並列イベントの中で、スイッチ３をONにするイベントを作りましょう
 * （ハマリポイント１）なおこの際、強制終了した瞬間の
 * テキストが結果の変数にしっかり保存されていることに注意。
 *
 * 入力が終わるまで次のイベントコマンドは読み込みません
 * （ハマリポイント２）次のイベントコマンドの読み込みまでは
 * 少し間があるため結果の変数を他の並列処理で上書きしないよう注意。
 *
 *
 * 機能追加：
 * Inputform （中略）btn_x=100;btn_y=100;
 * という書き方で、「決定」ボタンの位置を細かく調整できるようにしました。
 * 値はテキストボックスからの相対位置で、デフォルトはbtn_x=0;btn_y=50;です。
 *
 * （2018/12/06追加）
 * 入力欄や決定ボタンの縮尺が画面の縮尺に合わせて伸び縮みするようになりました。
 *
 * Inputform （中略）font_size=30;
 * で入力欄・決定ボタンの文字の大きさを変更できます。
 * font_sizeを指定しなければfont_size=24になります。
 *
 * Inputform （中略）placeholder=文章;
 * で「文章」の内容を最初から入力欄に表示しておくことができます。
 * デフォルトネームを設定しておく場合などにご利用ください。
 * なお、placeholder=$;と指定すると変数vに入っている内容が表示されます。
 *
 * ライセンス：
 * このプラグインの利用法に制限はありません。お好きなようにどうぞ。
 *
 * @command show
 * @text 文字入力の処理
 * @desc
 *
 * @arg target_x
 * @type number
 * @text 入力欄のX位置
 *
 * @arg target_y
 * @type number
 * @text 入力欄のY位置
 *
 * @arg variables_id
 * @type variable
 * @text 入力結果の代入先
 *
 * @arg row_count
 * @type number
 * @text 行数
 * 
 * @arg column_count
 * @type number
 * @text 横の文字数
 *
 * @arg if_switch_id
 * @type switch
 * @text ONのとき入力を強制終了
 *
 * @arg button_x
 * @type number
 * @min -10000
 * @default 0
 * @text 決定ボタンの相対X位置
 *
 * @arg button_y
 * @type number
 * @min -10000
 * @default 50
 * @text 決定ボタンの相対Y位置
 *
 * @arg unit_font_size
 * @type number
 * @default 24
 * @text 文字サイズ
 *
 * @arg placeholder
 * @type string
 * @text 入力欄の初期値
 * 
 * @arg page_count
 * @type number
 * @text ページ数
 * 
 * @arg readonly
 * @type boolean
 * @text 入力不可にする
 * @default false
*/
(function() {
    function stopPropagation(event) {
        event.stopPropagation();
    }

    // css追加
    (function(){
        var css = document.createElement('link');
        css.rel = "stylesheet";
        css.type = 'text/css';
        css.href = './css/FuwaFuwaMemo.css';
        var b_top = document.getElementsByTagName('head')[0];
        b_top.appendChild(css);
    })();
    // キー入力不可にする為に
    Input.form_mode = false;
    var _Input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        if(Input.form_mode)return;
        _Input_onKeyDown.call(this , event)
    };
    var _Input_onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function(event) {
        if(Input.form_mode)return;
        _Input_onKeyUp.call(this , event)
    };
    // 入力終わるまで次のイベントコマンド読み込まない
    var _Game_Interpreter_updateWaitMode =
            Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function(){
        if(this._waitMode == 'input_form')return true;
        return _Game_Interpreter_updateWaitMode.call(this);
    }

    HTMLElement.prototype.postionAdjust = function (screen_postion, target_postion, unitFontSize) {
        const scale = Graphics._realScale;

        this.style.left = screen_postion[0] + target_postion[0] * Graphics._realScale + "px";
        this.style.top  = screen_postion[1] + target_postion[1] * Graphics._realScale + "px";
        this.style.fontSize = unitFontSize * Graphics._realScale + "px";
        //var right = 692 * Graphics._realScale;//692 * Graphics._realScale;
        //console.log(right);
        //this.style.width = right + "px";
        //this.style.right = right + "px";
        //var left = 261 * Graphics._realScale;
        //console.log(left);
        //this.style.height = 261 * Graphics._realScale + "px";
        //this.style.bottom = 261 * Graphics._realScale + "px";
        //this.style.maxWidth = 'calc(100% - ' + this.style.left + ')';
        //this.style.maxHeight = 'calc(100% - ' + this.style.top + ')';
    };
    // 引数のx=350;y=200;みたいなのを可能にする
    var argHash = function(text , arg_names){
        var _args = new Array(arg_names.length);
        var ary = text.split(";");
        ary.forEach(function(str){
            var s_ary = str.split("=");
            var prop = s_ary[0].toLowerCase();
            var value = s_ary[1];
            _args[arg_names.indexOf(prop)] = value;
        });
        return _args;
    }

    function getLen(str) {
        var result = 0;
        for (var i = 0; i < str.length; i++) {
            var chr = str.charCodeAt(i);
            if ((chr >= 0x00 && chr < 0x81) ||
                (chr === 0xf8f0) ||
                (chr >= 0xff61 && chr < 0xffa0) ||
                (chr >= 0xf8f1 && chr < 0xf8f4)) {
                //半角文字の場合は1を加算
                result += 0.5;
            } else {
                //それ以外の文字の場合は2を加算
                result += 1;
            }
        }
        //結果を返す
        return result;
    };

    var cur_col = 0;
    var cur_wards = 0;

    //=============================================================================
    // Game_Interpreter - register plugin commands
    //=============================================================================
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'InputForm'){
            var _ary = argHash(args[0], ["x", "y", "v", "maxr", "maxc", "if_s", "btn_x", "btn_y", "font_size", "placeholder", "page_count","readonly"]);
            var target_x = +_ary[0];
            var target_y = +_ary[1];
            var variables_id = +_ary[2];
            var row_count = _ary[3] || 1;
            var column_count = _ary[4] || 1;
            var if_switch_id = Number(_ary[5]) || null;
            var button_x = +_ary[6] || 0;
            var button_y = _ary[7] === '' || isNaN(_ary[7]) ? 50 : +_ary[7];
            var unit_font_size = _ary[8] === '' || isNaN(_ary[8]) ? 24 : +_ary[8];
            var placeholder = _ary[9];
            var page_count = _ary[10] || 1;
            var readonly = _ary[11] || false;
            this._inputForm(target_x, target_y, variables_id, row_count, column_count, if_switch_id, button_x, button_y, unit_font_size, placeholder, page_count, readonly);
        }
    };

    if (PluginManager.registerCommand) {
        PluginManager.registerCommand("FuwaFuwaMemo", "show", function(args) {
            var { target_x, target_y, variables_id, row_count, column_count, if_switch_id, button_x, button_y, unit_font_size, placeholder, page_count ,readonly} = args;
            this._inputForm(+target_x, +target_y, +variables_id, +row_count, +column_count, +if_switch_id, +button_x, +button_y, +unit_font_size, placeholder, page_count, readonly);
        });
    }

    Game_Interpreter.prototype._inputForm = function (target_x, target_y, variables_id, row_count, column_count, if_switch_id, button_x, button_y, unit_font_size, placeholder, page_count, readonly) {
            var interpreter = this;
            var gui = {
                input : null ,
                submit : null ,
                is_pc : true ,
                init : function(){
                    this.is_pc = Utils.isNwjs();
                    this.create();
                    this.input.focus();
                    this.screenAdjust();
                } ,
                create : function(){
                    // 入力フォーム
                    this.input = document.createElement('textarea');
                    this.input.setAttribute('id', 'FuwaMemo');
                    this.input.setAttribute('rows', "16");
                    //this.input.setAttribute('cols', "21");
                    this.input.setAttribute('wrap', 'hard');
                    //if(max_count)this.input.setAttribute('maxlength', max_count);

                    //if (placeholder === '$') {
                        //placeholder = $gameVariables.value(variables_id);
                    //}
                    if ($gameVariables.value(variables_id) == 0) {
                        
                        this.input.textContent = '';
                    }
                    else{
                        this.input.textContent = $gameVariables.value(variables_id);
                    }
                    if (readonly == "false") {
                        this.input.readOnly = false;
                    } else {
                        this.input.readOnly = true;
                    }
                    this.input.setAttribute('value', 'aaaaaaaaaaaaS');
                    document.body.appendChild(this.input);
                    // 送信ボタン
                    this.submit = document.createElement('input');
                    this.submit.setAttribute('type', 'submit');
                    this.submit.setAttribute('id', '_111_submit');
                    this.submit.setAttribute('value', '  ');
                    document.body.appendChild(this.submit);
                } ,
                success : function(){
                    $gameVariables.setValue(variables_id , this.input.value);
                    this.end();
                } ,
                cancel : function(){
                    $gameVariables.setValue(variables_id , this.input.value);
                    this.end();
                } ,
                start : function(){
                    interpreter.setWaitMode('input_form');
                    Input.clear();
                    Input.form_mode = true;
                    // SceneManager._scene.stop();
                } ,
                end : function(){
                    this.input.remove(); // document.body.removeChild(this.input);
                    this.submit.remove();
                    window.removeEventListener("resize", resizeEvent, false);
                    interpreter.setWaitMode('');
                    Input.form_mode = false;
                    clearInterval(_event);
                    // SceneManager._scene.start();
                } ,
                screenAdjust : function(){ // canvasの左上を基準にした位置に合わせる
                    var screen_x , screen_y;
                    var _canvas = document.getElementById('UpperCanvas') || document.getElementById('gameCanvas');
                    var rect = _canvas.getBoundingClientRect();
                    screen_x = rect.left;
                    screen_y = rect.top;
                    target_x = 66;
                    target_y = 189;
                    this.input.postionAdjust([screen_x, screen_y], [target_x, target_y], 12);
                    var right = 692 * Graphics._realScale;//692 * Graphics._realScale;
                    this.input.style.width = right + "px";
                    var bottom = 261 * Graphics._realScale;
                    this.input.style.height = bottom + "px";


                    this.submit.postionAdjust([screen_x,screen_y] , [target_x + 670,target_y - 20], 17);
                }
            }

            gui.init();
            //送信するイベントgui.input.onkeydown = function(e){
            gui.input.addEventListener("keydown" ,function(e)
            {
                if(e.keyCode === 13){ // 決定キーで送信
                    let lines = gui.input.value.split("\n");
                    //現在の行文字数
                    var index = Math.min(cur_col, lines.length - 1);
                    var textwidth = getLen(lines[index]);
                    var nokori = column_count - (textwidth % column_count);
                    cur_wards += textwidth + nokori;

                    //var floorres = Math.floor(textwidth / column_count);

                    //カウント更新
                    cur_col += 1;
                    return false;
                }
            });
            gui.input.addEventListener("input", function () {
                //次の行に行ってたらcur_col追加
                let lines = gui.input.value.split("\n");
                //現在の行文字数
                var index = Math.min(cur_col, lines.length - 1);

                var textwidth = getLen(lines[index]);
                
                var floorres = Math.floor(textwidth / column_count);
                //if ( floorres > 0)
                //{
                //    cur_col += floorres;
                //}
                
                // 各行を配列の要素に分ける
                //let lines = gui.input.value.split("\n");
                //gui.submit.value = getLen(lines[0]);
                for (var i = 0; i < lines.length; i++)
                {
                    var textwidth = getLen(lines[i]);
                    var dif = textwidth - lines[0].length;
                    //gui.submit.value = cur_col;

                    //if (lines[i].length > column_count)
                    //{
                    //    if (textwidth > column_count)
                    //    {
                    //        lines[i] = lines[i].substr(0, column_count);//各行をcolsで指定した文字数に切り捨てる
                    //    }
                    //}
                }
                //gui.input.value = lines.join("\n");

                // 入力行数が制限を超えた場合
                if (lines.length > row_count-1)
                {
                    var result = "";

                    for (var i = 0; i < row_count -2; i++)
                    {
                        result += lines[i] + "\n";
                    }
                    //result += lines[row_count];
                    //gui.input.value = result;
                }
                //else if (lines.length == row_count + 1) 
                //{
                //    var result = "";
                //    for (var i = 0; i < row_count -1; i++)
                //    {
                //        result += lines[i] + "\n";
                //    }
                //    result += lines[row_count];
                //    gui.input.value = result;
                //}

                //デバッグ表示
                //gui.submit.value = "☒";//"文字数" + cur_wards + " :横幅" + textwidth + " :行数" + lines.length;
            }, false);
            gui.input.value = $gameVariables.value(variables_id);
            gui.input.addEventListener("mousedown", stopPropagation); // 裏のゲーム画面のクリック暴発を防ぐ
            gui.input.addEventListener("touchstart", stopPropagation); // iOSでclickイベント取れない対策
            gui.submit.addEventListener("mousedown", stopPropagation); // 裏のゲーム画面のクリック暴発を防ぐ
            gui.submit.addEventListener("touchstart", stopPropagation); // iOSでclickイベント取れない対策
            gui.submit.addEventListener("click" ,function(){ // 送信ボタンクリック
                gui.success();
                return false;
            });
            // キャンセルするイベント
            if (if_switch_id) {
                var _event = setInterval(function(){
                    if($gameSwitches.value(if_switch_id)){
                        // clearInterval(_event);
                        gui.cancel();
                    }
                }, 1);
            }

            // webではウィンドー大きさ変わる度に%求め直すイベントもいる
            //if(! gui.is_pc){
                var resizeEvent = gui.screenAdjust.bind(gui);
                window.addEventListener("resize", resizeEvent, false);
            //}
            //
            gui.start();
    };
})();
