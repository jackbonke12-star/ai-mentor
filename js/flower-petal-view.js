// Renders a single petal's node tree (the zoomed-in view)
var FlowerPetalView = {

  render: function(container, petalIndex) {
    var petal = FLOWER_PETALS[petalIndex];
    if (!petal) return;
    var nodes = buildPetalNodes(petal);
    var recommended = getRecommendedPetals();
    var isRec = recommended.indexOf(petal.id) > -1;

    var html = '';
    html += '<div class="fpetal-view" data-petal="' + petal.id + '">';
    html += '<div class="fpetal-color-bar" style="background:' + petal.color + '"></div>';

    // Header with back button and petal info
    html += '<div class="fpetal-header">';
    html += '<button class="fpetal-back" onclick="FlowerTree.showHub()">';
    html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>';
    html += '</button>';
    html += '<div class="fpetal-header-info">';
    html += '<span class="fpetal-header-title" style="color:' + petal.color + '">' + petal.label + '</span>';
    html += '<span class="fpetal-header-desc">' + petal.desc + '</span>';
    html += '</div>';
    // Zoom out button
    html += '<button class="fpetal-zoom-btn" onclick="FlowerTree.toggleZoom()" title="Toggle overview">';
    html += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg>';
    html += '</button>';
    html += '</div>';

    // Progress bar
    var prog = getPetalProgress(petal);
    html += '<div class="fpetal-progress">';
    html += '<div class="fpetal-progress-bar"><div class="fpetal-progress-fill" style="width:' + prog.pct + '%;background:' + petal.color + '"></div></div>';
    html += '<span class="fpetal-progress-text">' + prog.done + '/' + prog.total + '</span>';
    html += '</div>';

    // Node tree
    html += '<div class="fpetal-tree">';
    html += '<svg class="fpetal-connectors" id="fpetal-connectors-' + petal.id + '"></svg>';

    // Group nodes by row
    var rows = {};
    var maxRow = 0;
    for (var i = 0; i < nodes.length; i++) {
      if (!rows[nodes[i].row]) rows[nodes[i].row] = [];
      rows[nodes[i].row].push(nodes[i]);
      if (nodes[i].row > maxRow) maxRow = nodes[i].row;
    }

    for (var r = 0; r <= maxRow; r++) {
      if (!rows[r]) continue;
      html += '<div class="fpetal-row">';
      for (var n = 0; n < rows[r].length; n++) {
        html += this.renderNode(rows[r][n], petal, isRec);
      }
      html += '</div>';
    }

    // Certificate node at the end
    var allDone = prog.done === prog.total && prog.total > 0;
    html += '<div class="fpetal-row">';
    html += '<div class="fpetal-cert ' + (allDone ? 'fpetal-cert--earned' : 'fpetal-cert--locked') + '">';
    html += '<div class="fpetal-cert-circle" style="border-color:' + (allDone ? '#F59E0B' : '#D6D3D1') + ';background:' + (allDone ? '#F59E0B' : '#E7E5E4') + '">';
    html += '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="' + (allDone ? '#fff' : '#A8A29E') + '" stroke-width="2" stroke-linecap="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7m10-3h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7M12 17v5m-4 0h8m-4-5a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/></svg>';
    html += '</div>';
    html += '<span class="fpetal-cert-label">' + (allDone ? 'Certificate Earned!' : prog.done + ' of ' + prog.total + ' to unlock') + '</span>';
    html += '</div>';
    html += '</div>';

    html += '</div>'; // fpetal-tree
    html += '</div>'; // fpetal-view

    container.innerHTML = html;

    // Draw connectors after DOM render
    var self = this;
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        self.drawConnectors(petal, nodes);
      });
    });
  },

  renderNode: function(node, petal, isRec) {
    if (node.isTrophy) {
      var S = typeof loadProgress === 'function' ? loadProgress() : {};
      var trophyState = 'locked';
      var allPreqsDone = true;
      for (var tp = 0; tp < node.prereqs.length; tp++) {
        if (!S.completed || S.completed.indexOf(node.prereqs[tp]) === -1) { allPreqsDone = false; break; }
      }
      if (allPreqsDone && node.prereqs.length > 0) trophyState = 'available';
      // Check if all petal lessons are complete
      var petalObj = null;
      for (var pp = 0; pp < FLOWER_PETALS.length; pp++) {
        if (node.id.indexOf(FLOWER_PETALS[pp].id) === 0) { petalObj = FLOWER_PETALS[pp]; break; }
      }
      if (petalObj) {
        var prog = getPetalProgress(petalObj);
        if (prog.done === prog.total) trophyState = 'completed';
      }
      var tClass = 'fpetal-trophy fpetal-trophy--' + trophyState;
      return '<div class="fpetal-node ' + tClass + '" data-node="' + node.id + '">' +
        '<div class="fpetal-trophy-icon">' + (trophyState === 'completed' ? '\uD83C\uDFC6' : '\uD83C\uDFC5') + '</div>' +
        '<span class="fpetal-node-label">' + node.title + '</span></div>';
    }
    var state = getFlowerNodeState(node, petal.id);
    var color = petal.color;
    var lesson = findLesson(node.id);
    var isFree = lesson && lesson.free;

    var classes = 'fpetal-node fpetal-node--' + state;
    if (state === 'available') classes += ' fpetal-node--pulse';

    var onclick = (state === 'completed' || state === 'available')
      ? ' onclick="startLesson(\'' + node.id + '\')"' : '';

    var html = '<div class="' + classes + '" data-node="' + node.id + '"' + onclick + '>';

    // Circle
    html += '<div class="fpetal-node-circle" style="';
    if (state === 'completed') html += 'background:' + color + ';border-color:' + color + ';';
    else if (state === 'available') html += 'background:var(--card-bg,#fff);border-color:' + color + ';';
    else html += 'background:#E7E5E4;border-color:#D6D3D1;';
    html += '">';

    if (state === 'completed') {
      html += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (state === 'available') {
      html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="' + color + '" stroke="none"><polygon points="8,5 20,12 8,19"/></svg>';
    } else {
      html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
    }

    // Subtle glow for available nodes
    if (state === 'available') {
      html += '<div class="fpetal-node-glow" style="box-shadow:0 0 12px ' + color + '44"></div>';
    }

    html += '</div>'; // circle

    // Label
    html += '<span class="fpetal-node-label' + (state === 'locked' ? ' fpetal-node-label--locked' : '') + '">' + node.title + '</span>';
    if (isFree && state !== 'completed') {
      html += '<span class="fpetal-free-badge">FREE</span>';
    }

    html += '</div>';
    return html;
  },

  drawConnectors: function(petal, nodes) {
    var svg = document.getElementById('fpetal-connectors-' + petal.id);
    if (!svg) return;
    var tree = svg.closest('.fpetal-tree');
    if (!tree) return;

    var treeRect = tree.getBoundingClientRect();
    svg.setAttribute('width', treeRect.width);
    svg.setAttribute('height', treeRect.height);
    svg.style.width = treeRect.width + 'px';
    svg.style.height = treeRect.height + 'px';

    var paths = '';
    var recommended = getRecommendedPetals();
    var isRec = recommended.indexOf(petal.id) > -1;

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.row === 0) continue; // root has no parent lines to draw TO it from prereqs... we draw FROM parents
    }

    // Draw from each node to its children
    for (var i = 0; i < nodes.length; i++) {
      var parent = nodes[i];
      var parentEl = tree.querySelector('[data-node="' + parent.id + '"] .fpetal-node-circle');
      if (!parentEl) continue;

      // Find children (nodes that have this node in their prereqs)
      for (var j = 0; j < nodes.length; j++) {
        if (nodes[j].prereqs.indexOf(parent.id) === -1) continue;
        var childEl = tree.querySelector('[data-node="' + nodes[j].id + '"] .fpetal-node-circle');
        if (!childEl) continue;

        var pRect = parentEl.getBoundingClientRect();
        var cRect = childEl.getBoundingClientRect();

        var x1 = pRect.left + pRect.width/2 - treeRect.left;
        var y1 = pRect.top + pRect.height - treeRect.top;
        var x2 = cRect.left + cRect.width/2 - treeRect.left;
        var y2 = cRect.top - treeRect.top;
        var midY = (y1 + y2) / 2;

        var parentState = getFlowerNodeState(parent, petal.id);
        var childState = getFlowerNodeState(nodes[j], petal.id);

        var strokeColor, strokeWidth, opacity, extraClass;
        if (parentState === 'completed' && childState === 'completed') {
          strokeColor = petal.color;
          strokeWidth = '3';
          opacity = '1';
          extraClass = '';
        } else if (parentState === 'completed' && childState === 'available') {
          strokeColor = petal.color;
          strokeWidth = '2';
          opacity = '0.6';
          extraClass = ' class="fpetal-connector-active"';
        } else {
          strokeColor = '#D6D3D1';
          strokeWidth = '1.5';
          opacity = '0.2';
          extraClass = '';
        }

        paths += '<path d="M' + x1 + ',' + y1 + ' C' + x1 + ',' + midY + ' ' + x2 + ',' + midY + ' ' + x2 + ',' + y2 + '"';
        paths += ' fill="none" stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '"';
        paths += ' opacity="' + opacity + '" stroke-linecap="round"' + extraClass + '/>';
      }
    }

    svg.innerHTML = paths;
  },

  animateCompletion: function(lessonId) {
    var nodeEl = document.querySelector('[data-node="' + lessonId + '"]');
    if (!nodeEl) return;

    var circle = nodeEl.querySelector('.fpetal-node-circle');
    if (!circle) return;

    // Add completion flash
    circle.style.transition = 'all 0.5s ease';
    circle.classList.add('fpetal-node-completing');

    // Remove after animation
    setTimeout(function() {
      circle.classList.remove('fpetal-node-completing');
    }, 1000);
  }
};