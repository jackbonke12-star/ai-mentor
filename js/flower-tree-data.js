const FLOWER_PETALS = [
  {
    id: 'foundation',
    label: 'Foundation',
    color: '#5BC0F8',
    icon: 'brain',
    units: [1, 2],
    desc: 'How AI works and how to talk to it'
  },
  {
    id: 'work',
    label: 'Work & Admin',
    color: '#FFC800',
    icon: 'briefcase',
    units: [3, 10],
    desc: 'AI for your job and office tasks'
  },
  {
    id: 'creative',
    label: 'Creative',
    color: '#a560f8',
    icon: 'palette',
    units: [4, 8],
    desc: 'Images, writing, and creative AI'
  },
  {
    id: 'safety',
    label: 'Safety & Ethics',
    color: '#ff4b4b',
    icon: 'shield',
    units: [5, 6],
    desc: 'Staying safe and using AI responsibly'
  },
  {
    id: 'students',
    label: 'Students',
    color: '#FF9800',
    icon: 'graduation',
    units: [7],
    desc: 'AI for learning and academics'
  },
  {
    id: 'finance',
    label: 'Finance',
    color: '#1a73e8',
    icon: 'chart',
    units: [9, 11, 16, 17],
    desc: 'Taxes, bookkeeping, stocks, and crypto'
  },
  {
    id: 'industry',
    label: 'Industry',
    color: '#ff6b35',
    icon: 'wrench',
    units: [12, 13, 14, 15],
    desc: 'Customer service, caregivers, trades, parenting'
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    color: '#00897b',
    icon: 'compass',
    units: [18, 19, 23, 24],
    desc: 'Small business, job seeking, travel, music'
  }
];

// Build the node tree for a petal from COURSE data
// Returns array of node objects with prereqs forming a widening tree
function buildPetalNodes(petal) {
  var allLessons = [];
  for (var i = 0; i < petal.units.length; i++) {
    var unitNum = petal.units[i];
    for (var c = 0; c < COURSE.length; c++) {
      if (COURSE[c].num === unitNum) {
        for (var l = 0; l < COURSE[c].lessons.length; l++) {
          allLessons.push({
            id: COURSE[c].lessons[l].id,
            title: COURSE[c].lessons[l].title,
            unitNum: unitNum,
            unitTitle: COURSE[c].title,
            unitColor: COURSE[c].color
          });
        }
        break;
      }
    }
  }

  // Build widening tree: 1 → 2 → 3 → ... pattern
  // Row 0: 1 node, Row 1: 2 nodes, Row 2: 3 nodes, etc.
  var nodes = [];
  var idx = 0;
  var row = 0;
  while (idx < allLessons.length) {
    var rowSize = Math.min(row + 1, 3); // cap at 3 wide
    if (row > 2) rowSize = Math.min(3, allLessons.length - idx);
    for (var r = 0; r < rowSize && idx < allLessons.length; r++) {
      var lesson = allLessons[idx];
      var prereqs = [];
      // First row: no prereqs (root)
      // Other rows: require ALL nodes from previous row
      if (row > 0) {
        for (var p = 0; p < nodes.length; p++) {
          if (nodes[p].row === row - 1) {
            prereqs.push(nodes[p].id);
          }
        }
      }
      nodes.push({
        id: lesson.id,
        title: lesson.title,
        unitNum: lesson.unitNum,
        unitTitle: lesson.unitTitle,
        unitColor: lesson.unitColor,
        row: row,
        col: r,
        rowSize: rowSize,
        prereqs: prereqs
      });
      idx++;
    }
    row++;
  }

  return nodes;
}

// Get node state: 'completed', 'available', or 'locked'
function getFlowerNodeState(node, petalId) {
  if (S.completed && S.completed.indexOf(node.id) > -1) return 'completed';

  // Foundation petal has no gate
  // Other petals require Unit 1 completed (all of u1l1-u1l4)
  if (petalId !== 'foundation') {
    var foundationDone = S.completed &&
      S.completed.indexOf('u1l1') > -1 &&
      S.completed.indexOf('u1l2') > -1 &&
      S.completed.indexOf('u1l3') > -1 &&
      S.completed.indexOf('u1l4') > -1;
    if (!foundationDone) return 'locked';
  }

  if (node.prereqs.length === 0) return 'available';

  var allMet = true;
  for (var i = 0; i < node.prereqs.length; i++) {
    if (!S.completed || S.completed.indexOf(node.prereqs[i]) === -1) {
      allMet = false;
      break;
    }
  }
  return allMet ? 'available' : 'locked';
}

// Get petal progress
function getPetalProgress(petal) {
  var nodes = buildPetalNodes(petal);
  var done = 0;
  for (var i = 0; i < nodes.length; i++) {
    if (S.completed && S.completed.indexOf(nodes[i].id) > -1) done++;
  }
  return { done: done, total: nodes.length, pct: nodes.length > 0 ? Math.round((done / nodes.length) * 100) : 0 };
}

// Is petal unlocked?
function isPetalUnlocked(petalId) {
  if (petalId === 'foundation') return true;
  return S.completed &&
    S.completed.indexOf('u1l1') > -1 &&
    S.completed.indexOf('u1l2') > -1 &&
    S.completed.indexOf('u1l3') > -1 &&
    S.completed.indexOf('u1l4') > -1;
}

// Get recommended petals from onboarding selections
function getRecommendedPetals() {
  var selected = [];
  try {
    var stored = localStorage.getItem('clari-selected-paths');
    if (stored) selected = JSON.parse(stored);
  } catch(e) {}
  // Map onboarding topics to petal IDs
  var mapping = {
    'work': 'work', 'creative': 'creative', 'safety': 'safety',
    'students': 'students', 'finance': 'finance', 'investing': 'finance',
    'industry': 'industry', 'lifestyle': 'lifestyle',
    'basics': 'foundation', 'beginner': 'foundation'
  };
  var recommended = ['foundation']; // always recommend foundation
  for (var i = 0; i < selected.length; i++) {
    var mapped = mapping[selected[i]];
    if (mapped && recommended.indexOf(mapped) === -1) recommended.push(mapped);
  }
  return recommended;
}