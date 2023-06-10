(function () {
  // scene
  const sceneTop = document.getElementById("sceneTop");
  const sceneGame = document.getElementById("sceneGame");
  const sceneResult = document.getElementById("sceneResult");
  // 問題文を表示
  const textQuestion = document.getElementById("textQuestion");
  // 選択肢を表示
  const listAnswer = document.getElementById("listAnswer");
  // 正解数を表示
  const numResult = document.getElementById("numResult");
  // トップ画面でゲームを開始するボタン
  const btnStart = document.getElementById("btnStart");
  // リザルト画面でゲームをリセットしトップへ戻るボタン
  const btnReset = document.getElementById("btnReset");

  // Timer
  var timer;
  var startTime;
  var elapsedTime = 0;
  var holdTime = 0;

  // Export Data
  var exportData=new Date+"\n";

  //問題文を格納
  const question = [
    {
      text: "英語の勉強をしているのは誰？",
      choice: [p1_1, p1_2, p1_3, p1_4],
      ansewer: '1'
    },
    {
      text: "英語の勉強をしているのは誰？",
      choice: [p2_1, p2_2, p2_3, p2_4],
      ansewer: '1'
    },
  ];

  // ゲームで使用する共通の変数
  // answer...プレイヤーの答えと比較する、正解のテキスト
  // gameCount...プレイヤーが答えた数
  // success...正解した数
  let state = {
    answer: "",
    gameCount: 0,
    success: 0
  };

  // リセット
  function init() {
    state.gameCount = 0;
    state.success = 0;
    changeScene(sceneResult, sceneTop);

    btnStart.addEventListener("click", gameStart, false);
    timerStart();
  }

  // 1.トップ画面　2.ゲーム画面　3.リザルト画面
  function changeScene(hiddenScene, visibleScene) {
    hiddenScene.classList.add("is-hidden");
    hiddenScene.classList.remove("is-visible");
    visibleScene.classList.add("is-visible");
  }

  // 問題と選択肢をViewに表示し、正解を共通の変数へ代入
  function showQuestion() {
    // 時間計測開始
    timerStart();

    exportData+=question[state.gameCount].text+','; // Add exportData

    var str = "";
    question[state.gameCount].choice.forEach(function (value) {
      str += "<img src=" + value + "class='questionChoice'>";
    });
    textQuestion.innerHTML = question[state.gameCount].text;
    listAnswer.innerHTML = str;
  }

  function choiceQuestion() {
    let questionChoice = document.querySelectorAll(".questionChoice");
    questionChoice.forEach(function (choice) {
      choice.addEventListener(
        "click",
        function () {
          state.answer = this.id;
          checkAnswer(question[state.gameCount].ansewer);
        },
        false
      );
    });
  }

  // 解答が正解か不正解かをチェック
  function checkAnswer(answer) {
    // 回答時間出力
    timerStop();

    if (answer === state.answer) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
    state.gameCount++;
    if (state.gameCount < question.length) {
      showQuestion();
      choiceQuestion();
    } else {
      gameEnd();
    }
  }

  // 上でチェックし、正解だった場合
  function correctAnswer() {
    state.success++;
    console.log("正解");
    exportData += '正解\n';  // Add exportData
  }

  // 上でチェックし、不正解だった場合
  function incorrectAnswer() {
    console.log("不正解");
    exportData += '不正解\n';  // Add exportData
  }

  // スタートボタンが押された時
  function gameStart() {
    changeScene(sceneTop, sceneGame);
    showQuestion();
    choiceQuestion();
  }

  // ゲームが終了した時
  function gameEnd() {
    downloadCSV();
    changeScene(sceneGame, sceneResult);
    numResult.innerHTML = state.success;
    btnReset.addEventListener("click", init, false);
  }


  // Timer
  function timerStart() {
    startTime = Date.now();
    measureTime();
  }

  function timerStop() {
    console.log(elapsedTime);
    exportData+=elapsedTime/1000+"s,"; // Add exportData
    clearInterval(timer);
    startTime = Date.now();
    elapsedTime = 0;
  }

  function measureTime() {
    timer = setTimeout(function () {
      elapsedTime = Date.now() - startTime;
      measureTime();
    }, 10);
  }
  

  // Export CSV
  function downloadCSV(){
    const filename = "result.csv";
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, exportData], {type: "text/csv"});
    if(window.navigator.msSaveBlob){
      window.navigator.msSaveBlob(blob, filename);
    }else{
      const url = (window.URL || window.webkitURL).createObjectURL(blob);
      const download = document.createElement("a");
      download.href = url;
      download.download = filename;
      download.click();
      (window.URL || window.webkitURL).revokeObjectURL(url);
    }
    console.log("downloaded!");
  }


  // スタートボタンが押されたら、ゲームスタートの関数を
  // リセットボタンが押されたら、ゲーム終了後にゲームをリセットする関数を実行するイベントです
  init();
})();
