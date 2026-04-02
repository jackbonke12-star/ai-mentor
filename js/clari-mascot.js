/* ClariAI Mascot SVG Expressions — v1.0 */
/* 8 expressions, inline SVG, viewBox 0 0 120 120 */
/* Clari: a friendly round blob with Duolingo-level energy */

/*
 * Shared body anatomy (identical across all expressions):
 *   - Body: ellipse cx=60 cy=68 rx=40 ry=36  fill=#0F9D7A
 *   - Belly: ellipse cx=60 cy=74 rx=22 ry=18  fill=#4DCAA8
 *   - Left foot: ellipse cx=46 cy=101 rx=10 ry=5
 *   - Right foot: ellipse cx=74 cy=101 rx=10 ry=5
 *   - Cheeks: circles at (38,66) and (82,66) r=6 fill=#F59373 opacity=0.5
 *
 * Varying parts: eyes, mouth, arms, accessories
 */

function clariNeutral() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<!-- Body -->
<ellipse cx="60" cy="68" rx="40" ry="36" fill="#0F9D7A"/>
<ellipse cx="60" cy="74" rx="22" ry="18" fill="#4DCAA8"/>
<!-- Feet -->
<ellipse cx="46" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<ellipse cx="74" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<!-- Arms -->
<rect x="14" y="62" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(10,20,62)"/>
<rect x="94" y="62" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(-10,100,62)"/>
<!-- Eyes — sclera -->
<circle cx="44" cy="55" r="11" fill="#FFFFFF"/>
<circle cx="76" cy="55" r="11" fill="#FFFFFF"/>
<!-- Eyes — pupils -->
<circle cx="44" cy="55" r="6" fill="#1F2937"/>
<circle cx="76" cy="55" r="6" fill="#1F2937"/>
<!-- Cheeks -->
<circle cx="34" cy="68" r="6" fill="#F59373" opacity="0.5"/>
<circle cx="86" cy="68" r="6" fill="#F59373" opacity="0.5"/>
<!-- Mouth — gentle smile arc -->
<path d="M50 74 Q60 82 70 74" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`;
}

function clariHappy() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<!-- Body -->
<ellipse cx="60" cy="68" rx="40" ry="36" fill="#0F9D7A"/>
<ellipse cx="60" cy="74" rx="22" ry="18" fill="#4DCAA8"/>
<!-- Feet -->
<ellipse cx="46" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<ellipse cx="74" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<!-- Arms -->
<rect x="14" y="62" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(10,20,62)"/>
<rect x="94" y="62" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(-10,100,62)"/>
<!-- Eyes — happy squint arcs -->
<path d="M34 55 Q44 47 54 55" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M66 55 Q76 47 86 55" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- Cheeks — bigger blush -->
<circle cx="34" cy="66" r="8" fill="#F59373" opacity="0.55"/>
<circle cx="86" cy="66" r="8" fill="#F59373" opacity="0.55"/>
<!-- Mouth — wide smile -->
<path d="M46 72 Q60 86 74 72" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`;
}

function clariExcited() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<!-- Body -->
<ellipse cx="60" cy="68" rx="40" ry="36" fill="#0F9D7A"/>
<ellipse cx="60" cy="74" rx="22" ry="18" fill="#4DCAA8"/>
<!-- Feet -->
<ellipse cx="46" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<ellipse cx="74" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<!-- Arms — raised up -->
<rect x="10" y="50" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(30,16,60)"/>
<rect x="98" y="50" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(-30,104,60)"/>
<!-- Eyes — sclera (large) -->
<circle cx="44" cy="55" r="13" fill="#FFFFFF"/>
<circle cx="76" cy="55" r="13" fill="#FFFFFF"/>
<!-- Eyes — big pupils -->
<circle cx="44" cy="55" r="8" fill="#1F2937"/>
<circle cx="76" cy="55" r="8" fill="#1F2937"/>
<!-- Eye sparkles -->
<circle cx="40" cy="51" r="2.5" fill="#FFFFFF"/>
<circle cx="72" cy="51" r="2.5" fill="#FFFFFF"/>
<!-- Cheeks -->
<circle cx="34" cy="68" r="6" fill="#F59373" opacity="0.5"/>
<circle cx="86" cy="68" r="6" fill="#F59373" opacity="0.5"/>
<!-- Mouth — open excited "O" -->
<ellipse cx="60" cy="77" rx="8" ry="6" fill="#1F2937"/>
<!-- Motion lines -->
<line x1="30" y1="32" x2="26" y2="26" stroke="#E85D30" stroke-width="2" stroke-linecap="round"/>
<line x1="60" y1="28" x2="60" y2="21" stroke="#E85D30" stroke-width="2" stroke-linecap="round"/>
<line x1="90" y1="32" x2="94" y2="26" stroke="#E85D30" stroke-width="2" stroke-linecap="round"/>
</svg>`;
}

function clariThinking() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<!-- Body -->
<ellipse cx="60" cy="68" rx="40" ry="36" fill="#0F9D7A"/>
<ellipse cx="60" cy="74" rx="22" ry="18" fill="#4DCAA8"/>
<!-- Feet -->
<ellipse cx="46" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<ellipse cx="74" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<!-- Arms — left at side, right raised to chin -->
<rect x="14" y="62" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(10,20,62)"/>
<rect x="94" y="54" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(-35,100,54)"/>
<!-- Eyes — sclera (right eye raised) -->
<circle cx="44" cy="55" r="11" fill="#FFFFFF"/>
<circle cx="76" cy="52" r="11" fill="#FFFFFF"/>
<!-- Pupils — looking up-right -->
<circle cx="47" cy="52" r="6" fill="#1F2937"/>
<circle cx="79" cy="49" r="6" fill="#1F2937"/>
<!-- Cheeks -->
<circle cx="34" cy="68" r="6" fill="#F59373" opacity="0.5"/>
<circle cx="86" cy="68" r="6" fill="#F59373" opacity="0.5"/>
<!-- Mouth — small "o" -->
<circle cx="60" cy="76" r="4" fill="#1F2937"/>
<!-- Thought bubbles -->
<circle cx="88" cy="32" r="3" fill="#4DCAA8"/>
<circle cx="96" cy="22" r="4" fill="#4DCAA8"/>
<circle cx="106" cy="12" r="5.5" fill="#4DCAA8"/>
</svg>`;
}

function clariEncouraging() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<g transform="rotate(5,60,68)">
<!-- Body -->
<ellipse cx="60" cy="68" rx="40" ry="36" fill="#0F9D7A"/>
<ellipse cx="60" cy="74" rx="22" ry="18" fill="#4DCAA8"/>
<!-- Feet -->
<ellipse cx="46" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<ellipse cx="74" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<!-- Arms — left at side, right reaching forward -->
<rect x="14" y="62" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(10,20,62)"/>
<rect x="96" y="56" width="22" height="11" rx="5.5" fill="#0F9D7A" transform="rotate(-15,107,62)"/>
<!-- Eyes — sclera -->
<circle cx="44" cy="55" r="11" fill="#FFFFFF"/>
<circle cx="76" cy="55" r="11" fill="#FFFFFF"/>
<!-- Eyes — slightly smaller warm pupils -->
<circle cx="44" cy="55" r="5" fill="#1F2937"/>
<circle cx="76" cy="55" r="5" fill="#1F2937"/>
<!-- Cheeks -->
<circle cx="34" cy="68" r="7" fill="#F59373" opacity="0.5"/>
<circle cx="86" cy="68" r="7" fill="#F59373" opacity="0.5"/>
<!-- Mouth — warm asymmetric smile -->
<path d="M48 73 Q58 82 72 75" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</g>
</svg>`;
}

function clariCelebrating() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<!-- Body -->
<ellipse cx="60" cy="68" rx="40" ry="36" fill="#0F9D7A"/>
<ellipse cx="60" cy="74" rx="22" ry="18" fill="#4DCAA8"/>
<!-- Feet -->
<ellipse cx="46" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<ellipse cx="74" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<!-- Arms — raised high -->
<rect x="6" y="36" width="12" height="22" rx="6" fill="#0F9D7A" transform="rotate(40,12,47)"/>
<rect x="102" y="36" width="12" height="22" rx="6" fill="#0F9D7A" transform="rotate(-40,108,47)"/>
<!-- Eyes — closed happy arcs -->
<path d="M34 55 Q44 46 54 55" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M66 55 Q76 46 86 55" stroke="#1F2937" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- Cheeks -->
<circle cx="34" cy="66" r="7" fill="#F59373" opacity="0.55"/>
<circle cx="86" cy="66" r="7" fill="#F59373" opacity="0.55"/>
<!-- Mouth — huge grin with teeth -->
<path d="M42 72 Q60 92 78 72" stroke="#1F2937" stroke-width="2.5" fill="#1F2937" stroke-linecap="round"/>
<rect x="50" y="72" width="20" height="6" rx="2" fill="#FFFFFF"/>
<!-- Sparkles -->
<path d="M24 26 L26 20 L28 26 L34 28 L28 30 L26 36 L24 30 L18 28 Z" fill="#E85D30"/>
<path d="M92 22 L93.5 17 L95 22 L100 23.5 L95 25 L93.5 30 L92 25 L87 23.5 Z" fill="#E85D30"/>
<circle cx="60" cy="18" r="3" fill="#E85D30"/>
</svg>`;
}

function clariSleeping() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<!-- Body -->
<ellipse cx="60" cy="68" rx="40" ry="36" fill="#0F9D7A"/>
<ellipse cx="60" cy="74" rx="22" ry="18" fill="#4DCAA8"/>
<!-- Feet -->
<ellipse cx="46" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<ellipse cx="74" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<!-- Arms — tucked in close -->
<rect x="20" y="65" width="11" height="16" rx="5.5" fill="#0F9D7A"/>
<rect x="89" y="65" width="11" height="16" rx="5.5" fill="#0F9D7A"/>
<!-- Eyes — closed, gentle curves -->
<path d="M36 55 Q44 60 52 55" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M68 55 Q76 60 84 55" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<!-- Cheeks -->
<circle cx="34" cy="66" r="6" fill="#F59373" opacity="0.45"/>
<circle cx="86" cy="66" r="6" fill="#F59373" opacity="0.45"/>
<!-- Mouth — gentle wavy line -->
<path d="M52 75 Q56 72 60 75 Q64 78 68 75" stroke="#1F2937" stroke-width="2" fill="none" stroke-linecap="round"/>
<!-- Z z z -->
<text x="82" y="38" font-family="sans-serif" font-size="18" font-weight="bold" fill="#4DCAA8">Z</text>
<text x="92" y="26" font-family="sans-serif" font-size="14" font-weight="bold" fill="#4DCAA8">z</text>
<text x="100" y="16" font-family="sans-serif" font-size="10" font-weight="bold" fill="#4DCAA8">z</text>
</svg>`;
}

function clariWaving() {
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<!-- Body -->
<ellipse cx="60" cy="68" rx="40" ry="36" fill="#0F9D7A"/>
<ellipse cx="60" cy="74" rx="22" ry="18" fill="#4DCAA8"/>
<!-- Feet -->
<ellipse cx="46" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<ellipse cx="74" cy="101" rx="10" ry="5" fill="#0F9D7A"/>
<!-- Left arm — at side -->
<rect x="14" y="62" width="12" height="20" rx="6" fill="#0F9D7A" transform="rotate(10,20,62)"/>
<!-- Right arm — raised and waving -->
<rect x="96" y="34" width="12" height="26" rx="6" fill="#0F9D7A" transform="rotate(-20,102,47)"/>
<!-- Waving hand (circle) -->
<circle cx="108" cy="28" r="7" fill="#0F9D7A"/>
<!-- Eyes — sclera -->
<circle cx="44" cy="55" r="11" fill="#FFFFFF"/>
<circle cx="76" cy="55" r="11" fill="#FFFFFF"/>
<!-- Eyes — pupils -->
<circle cx="44" cy="55" r="6" fill="#1F2937"/>
<circle cx="76" cy="55" r="6" fill="#1F2937"/>
<!-- Cheeks -->
<circle cx="34" cy="68" r="6" fill="#F59373" opacity="0.5"/>
<circle cx="86" cy="68" r="6" fill="#F59373" opacity="0.5"/>
<!-- Mouth — happy smile -->
<path d="M48 73 Q60 84 72 73" stroke="#1F2937" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`;
}

// Expression map for easy lookup
const CLARI_EXPRESSIONS = {
  neutral: clariNeutral,
  happy: clariHappy,
  excited: clariExcited,
  thinking: clariThinking,
  encouraging: clariEncouraging,
  celebrating: clariCelebrating,
  sleeping: clariSleeping,
  waving: clariWaving
};

function getClariExpression(name) {
  const fn = CLARI_EXPRESSIONS[name] || CLARI_EXPRESSIONS.neutral;
  return fn();
}
