// 表示する文字列のリスト
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
];

// 文字列の初期化
let untyped = '';
let typed = '';
let score = 0;

// テキストを入れる場所を取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const start = document.getElementById('start');
const count = document.getElementById('count');

// 正解の文字数を入れる場所
const resultCounts = document.getElementById('resultsCount');

// 正解の文字数背景色を取得
const showResults = document.getElementById('showResults');


// 背景色の変更用にHTMLの要素を取得
const wrap = document.getElementById('wrap');


// ランダムテキストを表示
const createText = () => {
    // 入力完了時に文字列を初期化
    typed = '';
    typedfield.textContent = typed;

    // 文字列をランダムに選択して表示
    let random = Math.floor(Math.random() * textLists.length);
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {
    console.log(e.key);

    // 入力された文字との正誤判定（間違ってたら関数終了）
    if(e.key !== untyped.substring(0, 1)){
        wrap.classList.add('mistyped');

        // 背景を赤⇒白に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;
    };

    // 入力が正しい場合
    score++;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // 正解文字数の表示
    resultCounts.textContent = score;

    // 点数によって背景色を変更
    if(score < 100) {
        showResults.classList.add('rankThird');
    } else if(score < 200) {
        showResults.classList.add('rankSecond');
    } else if(score < 300) {
        showResults.classList.add('rankFirst');
    } else if(score >= 300){
        showResults.classList.add('rankTop');
    };

    // 入力完了の判定
    if(untyped === ''){
        createText();
    };
};

// タイピングスキルのランクを判定
const rankCheck = score => {
    let text = '';

    // スコアごとのメッセージ
    if(score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です`;
    } else if(score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です`;
    } else if(score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${100 - score}文字です`;
    } else if(score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます！`;
    };

    return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);

    // ポップアップで処理が止まるっぽいので無理やり遅らせてる。
    setTimeout(() => {
        const result = confirm(rankCheck(score));
    },);

    // Okボタンが押されたページリセット
    if(result == true) {
        window.location.reload();
    };
};

// カウントダウンタイマー
const timer = () => {
    // 今の時間を取得
    let time = count.textContent;

    // 一定時間ごとの繰り返し処理
    const id = setInterval(() => {
    // カウントダウン処理
    time--;
    count.textContent = time;

    if(time <= 0) {
        console.log('debagg : ' + time);
        gameOver(id);
    };
    }, 1000);
};

// スタート時の処理
start.addEventListener('click', () => {
    // タイムアップ表示の追加
    setTimeout(()=> {
        typedfield.textContent = '';
        untypedfield.textContent = 'タイムアップ！';
    }, 60000);

    // タイマー開始
    timer();

    // テキストを生成
    createText();

    // スタートボタンを非表示
    start.style.display = 'none';

    // 入力を検知したら正誤判定
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
