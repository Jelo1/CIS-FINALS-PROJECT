// GPA calculator: weighted average = sum(units x grade) / sum(units)
(function () {
  var GRADES = ['1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.50', '2.75', '3.00', '5.00'];
  var rows = document.getElementById('gpa-rows');
  var result = document.getElementById('gpa-result');

  function addRow() {
    var tr = document.createElement('tr');

    var tdName = document.createElement('td');
    var name = document.createElement('input');
    name.type = 'text'; name.placeholder = 'Subject name'; name.setAttribute('aria-label', 'Subject name');
    tdName.appendChild(name);

    var tdUnits = document.createElement('td');
    var units = document.createElement('input');
    units.type = 'number'; units.min = '0.5'; units.max = '10'; units.step = '0.5'; units.value = '3';
    units.setAttribute('aria-label', 'Units');
    tdUnits.appendChild(units);

    var tdGrade = document.createElement('td');
    var grade = document.createElement('select');
    grade.setAttribute('aria-label', 'Grade');
    GRADES.forEach(function (g) {
      var o = document.createElement('option');
      o.value = g; o.textContent = g;
      grade.appendChild(o);
    });
    tdGrade.appendChild(grade);

    var tdDel = document.createElement('td');
    var del = document.createElement('button');
    del.type = 'button'; del.className = 'del'; del.textContent = '\u2715';
    del.setAttribute('aria-label', 'Remove subject');
    del.addEventListener('click', function () { tr.remove(); });
    tdDel.appendChild(del);

    tr.appendChild(tdName); tr.appendChild(tdUnits); tr.appendChild(tdGrade); tr.appendChild(tdDel);
    rows.appendChild(tr);
  }

  function calculate() {
    var totalUnits = 0, totalPoints = 0;
    var trs = rows.querySelectorAll('tr');
    for (var i = 0; i < trs.length; i++) {
      var u = parseFloat(trs[i].querySelector('input[type=number]').value);
      var g = parseFloat(trs[i].querySelector('select').value);
      if (!(u > 0)) {
        result.innerHTML = '<span class="gpa-error">Please enter valid units for every subject.</span>';
        return;
      }
      totalUnits += u;
      totalPoints += u * g;
    }
    if (totalUnits === 0) {
      result.innerHTML = '<span class="gpa-error">Add at least one subject.</span>';
      return;
    }
    var gpa = totalPoints / totalUnits;
    result.innerHTML = 'Your GPA: <strong></strong><br>Total units: <span id="gpa-units"></span>';
    result.querySelector('strong').textContent = gpa.toFixed(2);
    document.getElementById('gpa-units').textContent = totalUnits;
  }

  document.getElementById('gpa-add').addEventListener('click', addRow);
  document.getElementById('gpa-calc').addEventListener('click', calculate);
  for (var i = 0; i < 3; i++) addRow();
})();
