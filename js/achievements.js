/* ============================================================
   ACHIEVEMENT BADGE SYSTEM — js/achievements.js
   17 tiered achievements with check functions
   ============================================================ */

const BADGE_ACHIEVEMENTS = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '\uD83D\uDCDA',
    tier: 'bronze',
    check: function(state) { return (state.lessons_completed || 0) >= 1; }
  },
  {
    id: 'quick_learner',
    title: 'Quick Learner',
    description: 'Complete 5 lessons',
    icon: '\uD83C\uDF93',
    tier: 'bronze',
    check: function(state) { return (state.lessons_completed || 0) >= 5; }
  },
  {
    id: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    description: 'Complete 15 lessons',
    icon: '\uD83D\uDD0D',
    tier: 'silver',
    check: function(state) { return (state.lessons_completed || 0) >= 15; }
  },
  {
    id: 'ai_scholar',
    title: 'AI Scholar',
    description: 'Complete 30 lessons',
    icon: '\uD83C\uDFDB\uFE0F',
    tier: 'gold',
    check: function(state) { return (state.lessons_completed || 0) >= 30; }
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Score 100% on any lesson',
    icon: '\u2728',
    tier: 'bronze',
    check: function(state) { return (state.perfect_lessons || 0) >= 1; }
  },
  {
    id: 'flawless_five',
    title: 'Flawless Five',
    description: 'Score 100% on 5 lessons',
    icon: '\uD83D\uDC8E',
    tier: 'silver',
    check: function(state) { return (state.perfect_lessons || 0) >= 5; }
  },
  {
    id: 'master_mind',
    title: 'Master Mind',
    description: 'Score 100% on 10 lessons',
    icon: '\uD83E\uDDE0',
    tier: 'gold',
    check: function(state) { return (state.perfect_lessons || 0) >= 10; }
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete a lesson in under 2 minutes',
    icon: '\u26A1',
    tier: 'bronze',
    check: function(state) { return (state.fast_lessons || 0) >= 1; }
  },
  {
    id: 'lightning_fast',
    title: 'Lightning Fast',
    description: 'Complete 5 lessons in under 2 minutes',
    icon: '\uD83C\uDF29\uFE0F',
    tier: 'silver',
    check: function(state) { return (state.fast_lessons || 0) >= 5; }
  },
  {
    id: 'streak_starter',
    title: 'Streak Starter',
    description: 'Reach a 3-day streak',
    icon: '\uD83D\uDD25',
    tier: 'bronze',
    check: function(state) { return (state.streak || 0) >= 3; }
  },
  {
    id: 'on_fire',
    title: 'On Fire',
    description: 'Reach a 7-day streak',
    icon: '\uD83D\uDD25',
    tier: 'silver',
    check: function(state) { return (state.streak || 0) >= 7; }
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: 'Reach a 30-day streak',
    icon: '\uD83D\uDD25',
    tier: 'gold',
    check: function(state) { return (state.streak || 0) >= 30; }
  },
  {
    id: 'practice_perfect',
    title: 'Practice Makes Perfect',
    description: 'Complete 10 practice sessions',
    icon: '\uD83C\uDFAF',
    tier: 'silver',
    check: function(state) { return (state.practice_sessions || 0) >= 10; }
  },
  {
    id: 'no_weak_spots',
    title: 'No Weak Spots',
    description: 'Clear all weak topics',
    icon: '\uD83D\uDCAA',
    tier: 'gold',
    check: function(state) {
      if (!state.questionHistory || state.questionHistory.length < 10) return false;
      if (typeof getWeakTopics !== 'function') return false;
      var weak = getWeakTopics();
      return weak.length === 0;
    }
  },
  {
    id: 'gem_collector',
    title: 'Gem Collector',
    description: 'Collect 500 gems',
    icon: '\uD83D\uDCB0',
    tier: 'silver',
    check: function(state) { return (state.gems || 0) >= 500; }
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Complete a lesson after 10 PM',
    icon: '\uD83E\uDD89',
    tier: 'bronze',
    check: function(state) { return (state.night_lessons || 0) >= 1; }
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Complete a lesson before 7 AM',
    icon: '\uD83D\uDC26',
    tier: 'bronze',
    check: function(state) { return (state.early_lessons || 0) >= 1; }
  }
];

/**
 * Check all badge achievements against current state.
 * Returns an array of newly unlocked achievement IDs
 * (those that pass their check but are not yet in state.achievements_unlocked).
 */
function checkBadgeAchievements(state) {
  var unlocked = state.achievements_unlocked || [];
  var newlyUnlocked = [];
  for (var i = 0; i < BADGE_ACHIEVEMENTS.length; i++) {
    var ach = BADGE_ACHIEVEMENTS[i];
    if (unlocked.indexOf(ach.id) === -1 && ach.check(state)) {
      newlyUnlocked.push(ach.id);
    }
  }
  return newlyUnlocked;
}

/**
 * Get a badge achievement object by its ID.
 * Returns the achievement object or undefined if not found.
 */
function getBadgeAchievementById(id) {
  for (var i = 0; i < BADGE_ACHIEVEMENTS.length; i++) {
    if (BADGE_ACHIEVEMENTS[i].id === id) return BADGE_ACHIEVEMENTS[i];
  }
  return undefined;
}
