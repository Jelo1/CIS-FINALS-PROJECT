// Pomodoro timer: focus / short break / long break.
(function () {
  var MODES = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };
  var mode = 'focus';
  var remaining = MODES[mode];
  var endTime = null;
  var tick = null;

  var display = document.getElementById('timer-display');
  var toggle = document.getElementById('timer-toggle');
  var reset = document.getElementById('timer-reset');
  var message = document.getElementById('timer-message');
  var sessionsEl = document.getElementById('timer-sessions');
  var modeBtns = document.querySelectorAll('[data-mode]');

  function today() { return new Date().toISOString().slice(0, 10); }
  function loadSessions() {
    try {
      var d = JSON.parse(localStorage.getItem('studyhub.sessions'));
      return d && d.date === today() ? d.count : 0;
    } catch (e) { return 0; }
  }
  function saveSessions(n) {
    try { localStorage.setItem('studyhub.sessions', JSON.stringify({ date: today(), count: n })); } catch (e) {}
  }
  var sessions = loadSessions();

  function fmt(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
  }
  function render() {
    display.textContent = fmt(remaining);
    document.title = (tick ? fmt(remaining) + ' - ' : '') + 'Pomodoro Timer | Study Hub';
    toggle.textContent = tick ? 'Pause' : 'Start';
    sessionsEl.textContent = sessions;
  }
  function beep() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator();
      o.connect(ctx.destination);
      o.frequency.value = 880;
      o.start();
      setTimeout(function () { o.stop(); ctx.close(); }, 400);
    } catch (e) {}
  }
  function stop() { clearInterval(tick); tick = null; }

  function onTick() {
    remaining = Math.max(0, Math.round((endTime - Date.now()) / 1000));
    if (remaining === 0) {
      stop();
      beep();
      if (mode === 'focus') {
        sessions++; saveSessions(sessions);
        message.textContent = 'Great work! Time for a break.';
      } else {
        message.textContent = 'Break is over. Ready to focus?';
      }
    }
    render();
  }

  toggle.addEventListener('click', function () {
    if (tick) {
      stop();
      message.textContent = 'Paused.';
    } else {
      if (remaining === 0) remaining = MODES[mode];
      endTime = Date.now() + remaining * 1000;
      tick = setInterval(onTick, 250);
      message.textContent = mode === 'focus' ? 'Stay focused!' : 'Relax for a bit.';
    }
    render();
  });

  reset.addEventListener('click', function () {
    stop();
    remaining = MODES[mode];
    message.textContent = 'Ready when you are.';
    render();
  });

  modeBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      mode = b.getAttribute('data-mode');
      modeBtns.forEach(function (x) { x.classList.toggle('active', x === b); });
      stop();
      remaining = MODES[mode];
      message.textContent = 'Ready when you are.';
      render();
    });
  });

  render();
})();
