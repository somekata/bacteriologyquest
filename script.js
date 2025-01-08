function checkAnswers() {
    // 問題の数を動的に取得する
    const totalQuestions = document.querySelectorAll('[id^="question"]').length;
    let score = 0;

    // 正解リストを準備
    const correctAnswersDiv = document.getElementById("correct-answers");
    correctAnswersDiv.innerHTML = "";

    // 各問題の判定
    for (let i = 1; i <= totalQuestions; i++) {
        const questionDiv = document.getElementById(`question${i}`);
        const correctAnswers = questionDiv
            .getAttribute("data-correct")
            .split(",")
            .map(Number);
        const userAnswers = getSelectedAnswers(`q${i}`);

        const result = judgeAnswer(correctAnswers, userAnswers);
        const resultText = `問題${i}: ${result}`;
        console.log(resultText);

        // 正解の選択肢を表示
        showCorrectAnswers(i, correctAnswers);
        
        // 正解・誤答の選択肢をマークする
        markAnswers(i, correctAnswers, userAnswers);

        // 正解のカウント
        if (result === "正解") {
            score++;
        }
    }

    // 結果の表示
    const judgement = document.getElementById("judgement");
    judgement.textContent = `あなたのスコアは ${score} / ${totalQuestions} です。`;

    // 判定結果の表示
    document.getElementById("result").classList.remove("hidden");
}

function judgeAnswer(correctAnswers, userAnswers) {
    const correctSet = new Set(correctAnswers);
    const userSet = new Set(userAnswers);

    const intersection = new Set([...correctSet].filter((x) => userSet.has(x)));

    if (intersection.size === correctSet.size && intersection.size === userSet.size) {
        return "正解";  // All correct and no extra wrong selections
    } else if (intersection.size > 0) {
        return "一部正解";  // Some correct answers but with extras or missing correct ones
    } else {
        return "不正解";  // No correct answers selected
    }
}


// 選択されたチェックボックスの値を取得する関数
function getSelectedAnswers(questionPrefix) {
    const selectedAnswers = [];
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`${questionPrefix}-${i}`);
        if (checkbox && checkbox.checked) {
            selectedAnswers.push(i);
        }
    }
    return selectedAnswers;
}

// 正解の選択肢を表示する関数
function showCorrectAnswers(questionNumber, correctAnswers) {
    const questionDiv = document.getElementById(`question${questionNumber}`);
    const labels = questionDiv.querySelectorAll("label");

    let correctText = `<p>問題${questionNumber}の正解:</p>`;
    correctAnswers.forEach((answer) => {
        // ラベルの内容を取得して表示
        const label = labels[answer - 1];
        const labelText = label.innerHTML.replace(/<input.*?>/, ""); // input要素を除去
        correctText += `<p>${labelText}</p>`;
    });

    const correctAnswersDiv = document.getElementById("correct-answers");
    correctAnswersDiv.innerHTML += correctText;
}

// 正解・不正解をマークする関数
function markAnswers(questionNumber, correctAnswers, userAnswers) {
    const questionDiv = document.getElementById(`question${questionNumber}`);
    const labels = questionDiv.querySelectorAll("label");

    // 正解の選択肢に "correct" クラスを追加
    correctAnswers.forEach((answer) => {
        labels[answer - 1].classList.add("correct");
    });

    // ユーザーが選んだ誤答の選択肢に "incorrect" クラスを追加
    userAnswers.forEach((answer) => {
        if (!correctAnswers.includes(answer)) {
            labels[answer - 1].classList.add("incorrect");
        }
    });
}

//footerSectionを自動で表示
const footerSection = document.getElementById("footerSection");
const footerSectionContents = '    <p>      <button onclick="history.back()">戻る</button>    </p>    <footer>      <p>&copy; 2024 細菌学クエスト</p>    </footer>'
footerSection.outerHTML = footerSectionContents;
