// To-Do list: add, complete, delete, filter. Saved in localStorage.
(function () {
  var KEY = 'studyhub.todos';
  var todos = load();
  var filter = 'all';

  var form = document.getElementById('todo-form');
  var input = document.getElementById('todo-input');
  var list = document.getElementById('todo-list');
  var empty = document.getElementById('todo-empty');
  var count = document.getElementById('todo-count');
  var clearBtn = document.getElementById('todo-clear');
  var filterBtns = document.querySelectorAll('[data-filter]');

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(todos)); } catch (e) {}
  }

  function render() {
    list.innerHTML = '';
    var shown = todos.filter(function (t) {
      return filter === 'all' || (filter === 'done' ? t.done : !t.done);
    });
    shown.forEach(function (t) {
      var li = document.createElement('li');
      if (t.done) li.className = 'done';

      var box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = t.done;
      box.setAttribute('aria-label', 'Mark done: ' + t.text);
      box.addEventListener('change', function () { t.done = box.checked; save(); render(); });

      var label = document.createElement('span');
      label.textContent = t.text;

      var del = document.createElement('button');
      del.className = 'del';
      del.type = 'button';
      del.textContent = '\u2715';
      del.setAttribute('aria-label', 'Delete: ' + t.text);
      del.addEventListener('click', function () {
        todos = todos.filter(function (x) { return x.id !== t.id; });
        save(); render();
      });

      li.appendChild(box); li.appendChild(label); li.appendChild(del);
      list.appendChild(li);
    });
    empty.style.display = shown.length ? 'none' : 'block';
    var left = todos.filter(function (t) { return !t.done; }).length;
    count.textContent = left + (left === 1 ? ' task left' : ' tasks left');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    todos.push({ id: Date.now() + Math.random(), text: text, done: false });
    input.value = '';
    save(); render();
  });

  clearBtn.addEventListener('click', function () {
    todos = todos.filter(function (t) { return !t.done; });
    save(); render();
  });

  filterBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      filter = b.getAttribute('data-filter');
      filterBtns.forEach(function (x) { x.classList.toggle('active', x === b); });
      render();
    });
  });

  render();
})();
