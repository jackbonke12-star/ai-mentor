// Flower Hub — the zoomed-out overview showing Clari + 8 petals in a circle
var FlowerHub = {

  render: function(container) {
    var html = '';
    html += '<div class="fhub-wrap">';

    // Center: Clari mascot
    html += '<div class="fhub-center">';
    html += '<div class="fhub-clari">' + (typeof getClariExpression === 'function' ? getClariExpression('happy') : '🤖') + '</div>';
    html += '<div class="fhub-center-label">ClariAI</div>';
    html += '</div>';

    // Petals arranged in a circle
    var recommended = getRecommendedPetals();
    for (var i = 0; i < FLOWER_PETALS.length; i++) {
      var petal = FLOWER_PETALS[i];
      var angle = (i / FLOWER_PETALS.length) * 360 - 90; // start from top
      var unlocked = isPetalUnlocked(petal.id);
      var progress = getPetalProgress(petal);
      var isRec = recommended.indexOf(petal.id) > -1;

      html += this.renderPetalIcon(petal, angle, unlocked, progress, isRec, i);

      // Spoke line from center to petal
      html += this.renderSpoke(angle, petal.color, unlocked, isRec, progress.pct);
    }

    // Overall progress
    var totalDone = 0;
    var totalAll = 0;
    for (var p = 0; p < FLOWER_PETALS.length; p++) {
      var prog = getPetalProgress(FLOWER_PETALS[p]);
      totalDone += prog.done;
      totalAll += prog.total;
    }
    var totalPct = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;
    html += '<div class="fhub-total">';
    html += '<div class="fhub-total-bar"><div class="fhub-total-fill" style="width:' + totalPct + '%"></div></div>';
    html += '<span class="fhub-total-text">' + totalDone + ' of ' + totalAll + ' lessons complete</span>';
    html += '</div>';

    html += '</div>'; // fhub-wrap
    container.innerHTML = html;
  },

  renderPetalIcon: function(petal, angle, unlocked, progress, isRec, index) {
    var radians = angle * (Math.PI / 180);
    var radius = 140; // distance from center in px
    var x = Math.cos(radians) * radius;
    var y = Math.sin(radians) * radius;

    var classes = 'fhub-petal';
    if (!unlocked) classes += ' fhub-petal--locked';
    if (isRec) classes += ' fhub-petal--recommended';
    if (progress.pct === 100) classes += ' fhub-petal--complete';

    var onclick = unlocked ? ' onclick="FlowerTree.openPetal(' + index + ')"' : '';

    var html = '<div class="' + classes + '" style="transform:translate(' + x + 'px,' + y + 'px)"' + onclick + '>';

    // Circle with progress ring
    var circumference = 2 * Math.PI * 22; // r=22
    var offset = circumference - (progress.pct / 100) * circumference;

    html += '<svg class="fhub-petal-ring" width="56" height="56" viewBox="0 0 56 56">';
    // Background circle
    html += '<circle cx="28" cy="28" r="22" fill="' + (unlocked ? 'var(--card-bg, #fff)' : '#E7E5E4') + '" stroke="' + (unlocked ? petal.color + '33' : '#D6D3D1') + '" stroke-width="3"/>';
    // Progress arc
    if (unlocked && progress.pct > 0) {
      html += '<circle cx="28" cy="28" r="22" fill="none" stroke="' + petal.color + '" stroke-width="3" stroke-linecap="round" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" transform="rotate(-90 28 28)"/>';
    }
    html += '</svg>';

    // Icon inside
    html += '<div class="fhub-petal-icon" style="color:' + (unlocked ? petal.color : '#A8A29E') + '">';
    html += FlowerIcons.get(petal.icon, unlocked ? petal.color : '#A8A29E');
    html += '</div>';

    // Label
    html += '<div class="fhub-petal-label">' + petal.label + '</div>';

    // Recommended glow
    if (isRec && unlocked) {
      html += '<div class="fhub-rec-dot" style="background:' + petal.color + '"></div>';
    }

    html += '</div>';
    return html;
  },

  renderSpoke: function(angle, color, unlocked, isRec, pct) {
    var radians = angle * (Math.PI / 180);
    var innerR = 40; // edge of center circle
    var outerR = 108; // start of petal icon
    var x1 = Math.cos(radians) * innerR;
    var y1 = Math.sin(radians) * innerR;
    var x2 = Math.cos(radians) * outerR;
    var y2 = Math.sin(radians) * outerR;

    var isComplete = pct >= 100;
    var strokeColor, opacity, width, dash, filterDef, filterAttr;

    if (!unlocked) {
      strokeColor = '#D6D3D1';
      opacity = '0.3';
      width = '2';
      dash = ' stroke-dasharray="4,3"';
      filterDef = '';
      filterAttr = '';
    } else if (isRec) {
      strokeColor = color;
      opacity = '1';
      width = '4';
      filterDef = '<defs><filter id="fhub-glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
      filterAttr = ' filter="url(#fhub-glow)"';
      dash = '';
    } else if (isComplete) {
      strokeColor = color;
      opacity = '1';
      width = '3';
      dash = '';
      filterDef = '';
      filterAttr = '';
    } else {
      strokeColor = color;
      opacity = '0.5';
      width = '3';
      dash = '';
      filterDef = '';
      filterAttr = '';
    }

    return '<svg class="fhub-spoke" style="overflow:visible;pointer-events:none;">'
      + filterDef
      + '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"'
      + ' stroke="' + strokeColor + '" stroke-width="' + width + '" opacity="' + opacity + '"' + dash + filterAttr + '/>'
      + '</svg>';
  }
};