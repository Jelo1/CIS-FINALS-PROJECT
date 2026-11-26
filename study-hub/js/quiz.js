// Quick quiz: multiple choice, one question at a time.
(function () {
  var QUESTIONS = [
    { q: 'What does HTML stand for?', a: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Mark Language'], c: 0 },
    { q: 'Which CSS property changes the text color?', a: ['font-color', 'color', 'text-style', 'foreground'], c: 1 },
    { q: 'Which symbol selects a class in CSS?', a: ['#', '.', '*', '&'], c: 1 },
    { q: 'Which JavaScript keyword declares a constant?', a: ['var', 'let', 'const', 'static'], c: 2 },
    { q: 'Which HTML tag creates a hyperlink?', a: ['<link>', '<a>', '<href>', '<url>'], c: 1 },
    { q: 'Which Git command saves your changes to the local history?', a: ['git push', 'git pull', 'git commit', 'git clone'], c: 2 },
    { q: 'Which Git command downloads the latest changes from GitHub?', a: ['git pull', 'git add', 'git init', 'git branch'], c: 0 },
    { q: 'What is a pull request?', a: ['A request to delete a repository', 'A request to merge your changes into another branch', 'A request to download a file', 'A request to rename a branch'], c: 1 }
  ];

  var index = 0, score = 0, answered = false;
  var box = document.getElementById('quiz-box');
  var result = document.getElementById('quiz-result');
  var progress = document.getElementById('quiz-progress');
  var question = document.getElementById('quiz-question');
  var options = document.getElementById('quiz-options');
  var feedback = document.getElementById('quiz-feedback');
  var next = document.getElementById('quiz-next');
  var scoreEl = document.getElementById('quiz-score');
  var restart = document.getElementById('quiz-restart');

  function show() {
    var item = QUESTIONS[index];
    answered = false;
    progress.textContent = 'Question ' + (index + 1) + ' of ' + QUESTIONS.length;
    question.textContent = item.q;
    feedback.textContent = '';
    next.hidden = true;
    next.textContent = index === QUESTIONS.length - 1 ? 'See result' : 'Next';
    options.innerHTML = '';
    item.a.forEach(function (text, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'quiz-option';
      b.textContent = text;
      b.addEventListener('click', function () { choose(i); });
      options.appendChild(b);
    });
  }

  function choose(i) {
    if (answered) return;
    answered = true;
    var item = QUESTIONS[index];
    var btns = options.querySelectorAll('.quiz-option');
    btns.forEach(function (b, n) {
      b.disabled = true;
      if (n === item.c) b.classList.add('correct');
      else if (n === i) b.classList.add('wrong');
    });
    if (i === item.c) { score++; feedback.textContent = 'Correct!'; }
    else { feedback.textContent = 'Not quite. The answer is: ' + item.a[item.c]; }
    next.hidden = false;
  }

  next.addEventListener('click', function () {
    index++;
    if (index < QUESTIONS.length) { show(); return; }
    box.hidden = true;
    result.hidden = false;
    scoreEl.textContent = 'You scored ' + score + ' out of ' + QUESTIONS.length + '.';
  });

  restart.addEventListener('click', function () {
    index = 0; score = 0;
    result.hidden = true;
    box.hidden = false;
    show();
  });

  show();
})();
