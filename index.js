// 初期設定：セクションの切り替えを設定
document.addEventListener('DOMContentLoaded', function() {
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');
    
    const next1 = document.getElementById('next1');
    const prev2 = document.getElementById('prev2');
    const next2 = document.getElementById('next2');
    const prev3 = document.getElementById('prev3');
    
    const progressBar = document.getElementById('progress-bar');
    
    // 初期プログレスバーの幅
    progressBar.style.width = '33%';
    
    // 「次へ」ボタンをクリックすると次のセクションが表示される
    next1.addEventListener('click', function() {
        section1.style.display = 'none';
        section2.style.display = 'block';
        progressBar.style.width = '66%'; // プログレスバー更新
    });
    
    next2.addEventListener('click', function() {
        section2.style.display = 'none';
        section3.style.display = 'block';
        progressBar.style.width = '100%'; // プログレスバー更新
    });
    
    // 「戻る」ボタンで前のセクションに戻る
    prev2.addEventListener('click', function() {
        section2.style.display = 'none';
        section1.style.display = 'block';
        progressBar.style.width = '33%'; // プログレスバー更新
    });
    
    prev3.addEventListener('click', function() {
        section3.style.display = 'none';
        section2.style.display = 'block';
        progressBar.style.width = '66%'; // プログレスバー更新
    });
});
