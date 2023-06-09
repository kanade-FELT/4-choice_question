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

  //問題文を格納
  const question = [
    {
      text: "江戸時代から使われていた言葉はどれ？",
      choice: ["うざい", "むかつく", "えもい", "ばえ"],
      ansewer: "むかつく"
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
  }

  // 1.トップ画面　2.ゲーム画面　3.リザルト画面
  function changeScene(hiddenScene, visibleScene) {
    hiddenScene.classList.add("is-hidden");
    hiddenScene.classList.remove("is-visible");
    visibleScene.classList.add("is-visible");
  }

  // 問題と選択肢をViewに表示し、正解を共通の変数へ代入
  function showQuestion() {
    var str = "";
    question[state.gameCount].choice.forEach(function (value) {
      str += '<li class="questionChoice">' + value + "</li>";
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
          state.answer = this.textContent;
          checkAnswer(question[state.gameCount].ansewer);
        },
        false
      );
    });
  }

  // 解答が正解か不正解かをチェック
  function checkAnswer(answer) {
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
  }

  // 上でチェックし、不正解だった場合
  function incorrectAnswer() {
    console.log("不正解");
  }

  // スタートボタンが押された時
  function gameStart() {
    changeScene(sceneTop, sceneGame);
    showQuestion();
    choiceQuestion();
  }

  // ゲームが終了した時
  function gameEnd() {
    changeScene(sceneGame, sceneResult);
    numResult.innerHTML = state.success;
    btnReset.addEventListener("click", init, false);
  }

  // スタートボタンが押されたら、ゲームスタートの関数を
  // リセットボタンが押されたら、ゲーム終了後にゲームをリセットする関数を実行するイベントです
  init();
})();
