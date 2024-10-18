// Fisher-Yatesアルゴリズムを使用して配列をシャッフル
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// シャッフル機能を各問題に適用する関数
function shuffleChoices() {
    const shuffleQuestions = document.querySelectorAll('.shuffle'); // .shuffleクラスの要素を取得

    shuffleQuestions.forEach((question) => {
        const labels = Array.from(question.querySelectorAll('label')); // 選択肢（label）を配列として取得
        const correctAnswers = question.getAttribute("data-correct").split(',').map(Number); // 元の正解インデックスを取得

        // 選択肢だけをシャッフル
        const shuffledLabels = shuffle(labels);

        // 各ラジオボタンのname属性を正しく維持するために、question IDを取得して利用
        const questionNumber = question.id.charAt(question.id.length - 1);

        // 新しい選択肢のインデックスを基に、新しい正解インデックスを更新
        const newCorrectIndexes = [];
        shuffledLabels.forEach((label, newIndex) => {
            const inputElement = label.querySelector('input');
            const originalIndex = parseInt(inputElement.id.match(/\d+$/)[0], 10); // 元のインデックスを取得
            inputElement.name = `q${questionNumber}`; // ラジオボタンのname属性を正しく維持
            if (correctAnswers.includes(originalIndex)) {
                newCorrectIndexes.push(newIndex + 1); // 新しいインデックスを正解に設定
            }
        });

        // 元の選択肢を削除して、設問文を残したままシャッフルされた選択肢を再追加
        const questionText = question.querySelector('h2'); // 設問文 (h2)
        const parent = question;
        parent.innerHTML = ''; // 既存の内容をクリア
        parent.appendChild(questionText); // 設問文を再度追加
        shuffledLabels.forEach((label, index) => {
            const input = label.querySelector('input');
            input.id = `q${questionNumber}-${index + 1}`; // 新しいIDを設定
            parent.appendChild(label); // シャッフルされた選択肢を再追加
        });

        // 新しい正解インデックスをdata-correct属性に設定
        question.setAttribute("data-correct", newCorrectIndexes.join(','));
    });
}

// ページがロードされたときにシャッフルを実行
window.onload = shuffleChoices;
