/* ============================================================
   GUS — Gut Check mascot + brand-mark SVG builder  (anime / kawaii)
   Bold sticker base + big glossy anime eyes, soft cat mouth, shiny blush.
   window.Gus.svg(expr)  expr: idle|happy|oops|sleepy
   window.Gus.icon() · window.Gus.badge(id) · window.Gus.mono(expr)
   Pure shapes (no <text>) so it rasterizes cleanly offline.
   ============================================================ */
(function(){
  const INK="#1F2328", TEAL="#00A79B", CREAM="#FFF6EB",
        ORANGE="#FF4D2D", GREEN="#00A878", GOLD="#FFD166", SAND="#EDE5DA",
        SKY="#8FD7E6", IRIS_TOP="#3b5570", IRIS_BOT="#101c2a", PUP="#0c141d";
  let _uid=0;

  function spark(x,y,s,fill){
    return `<path transform="translate(${x},${y}) scale(${s})" d="M0 -11 L2.8 -2.8 L11 0 L2.8 2.8 L0 11 L-2.8 2.8 L-11 0 L-2.8 -2.8 Z" fill="${fill}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`;
  }
  function zee(x,y,s){
    return `<path transform="translate(${x},${y}) scale(${s})" d="M0 0 H13 L0 16 H13" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  /* big glossy anime eye */
  function cuteEye(cx, cy, iris){
    return `<ellipse cx="${cx}" cy="${cy}" rx="19" ry="24.5" fill="${CREAM}" stroke="${INK}" stroke-width="5"/>
      <ellipse cx="${cx}" cy="${cy+2.5}" rx="15" ry="20.5" fill="url(#${iris})"/>
      <ellipse cx="${cx}" cy="${cy+5}" rx="8" ry="11" fill="${PUP}"/>
      <circle cx="${cx-5}" cy="${cy-8}" r="5.6" fill="${CREAM}"/>
      <circle cx="${cx+5.5}" cy="${cy+7}" r="3.2" fill="${CREAM}" opacity="0.92"/>
      <circle cx="${cx+6}" cy="${cy-12}" r="1.9" fill="${CREAM}"/>`;
  }

  function eyes(expr, opt){
    opt=opt||{}; const ink=opt.ink||INK, iris=opt.iris;
    const L=96, R=144, cy=106;
    if(expr==="happy"){   /* joyful closed ^_^ */
      return `<path d="M${L-14} ${cy+4} Q${L} ${cy-13} ${L+14} ${cy+4}" fill="none" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>
              <path d="M${R-14} ${cy+4} Q${R} ${cy-13} ${R+14} ${cy+4}" fill="none" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>`;
    }
    if(expr==="sleepy"){
      return `<path d="M${L-15} ${cy} Q${L} ${cy+10} ${L+15} ${cy}" fill="none" stroke="${ink}" stroke-width="5.5" stroke-linecap="round"/>
              <path d="M${R-15} ${cy} Q${R} ${cy+10} ${R+15} ${cy}" fill="none" stroke="${ink}" stroke-width="5.5" stroke-linecap="round"/>`;
    }
    if(expr==="oops"){    /* >_<  watery */
      return `<path d="M${L-13} ${cy-9} L${L+8} ${cy} L${L-13} ${cy+9}" fill="none" stroke="${ink}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M${R+13} ${cy-9} L${R-8} ${cy} L${R+13} ${cy+9}" fill="none" stroke="${ink}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    if(opt.outline){   /* mono fallback: outlined eyes */
      const e=(cx)=>`<ellipse cx="${cx}" cy="${cy}" rx="19" ry="24.5" fill="${CREAM}" stroke="${ink}" stroke-width="5"/>
        <ellipse cx="${cx}" cy="${cy+4}" rx="9" ry="12" fill="${ink}"/><circle cx="${cx-5}" cy="${cy-7}" r="5" fill="${CREAM}"/>`;
      return e(L)+e(R);
    }
    return cuteEye(L,cy,iris)+cuteEye(R,cy,iris);
  }

  /* soft cat / kawaii mouth */
  function mouth(expr, ink){
    ink = ink||INK;
    if(expr==="happy") return `<path d="M107 130 Q120 150 133 130 Z" fill="${ink}"/><path d="M114 142 Q120 150 126 142 Z" fill="${ink===INK?ORANGE:ink}"/>`;
    if(expr==="oops")  return `<ellipse cx="120" cy="134" rx="8" ry="9.5" fill="${ink}"/>`;
    if(expr==="sleepy")return `<path d="M114 132 q6 5 12 0" fill="none" stroke="${ink}" stroke-width="4.5" stroke-linecap="round"/>`;
    /* idle :3 cat mouth */
    return `<path d="M112 132 q4 6 8 0 q4 6 8 0" fill="none" stroke="${ink}" stroke-width="4.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  /* rosy blush with shine lines */
  function cheeks(expr, flat){
    const y = 126, rx = expr==="happy"?15:13.5, ry = expr==="happy"?10:9;
    const blush=(cx)=>`<g opacity="0.85"><ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="${ORANGE}"/>
      <path d="M${cx-6} ${y+1} l4 -4 M${cx} ${y+2} l4 -4 M${cx+6} ${y+1} l4 -4" stroke="${CREAM}" stroke-width="1.8" stroke-linecap="round" opacity="0.5"/></g>`;
    return blush(72)+blush(168);
  }

  function extras(expr, mono){
    if(expr==="oops") return `<path d="M178 96 q7 11 0 18 a9 9 0 0 1 -11 -7 q4 -7 11 -11 z" fill="${mono?CREAM:SKY}" stroke="${INK}" stroke-width="3"/>`;
    if(expr==="sleepy") return zee(168,56,1)+zee(184,38,1.4);
    if(expr==="happy") return spark(176,70,1.05,mono?CREAM:GOLD)+spark(58,84,0.85,mono?CREAM:GOLD)+spark(120,150,0.5,mono?CREAM:GOLD);
    if(expr==="idle") return spark(182,150,0.5,mono?CREAM:GOLD);
    return "";
  }

  function arms(expr, fill, ink){
    const f=fill||TEAL, s=ink||INK;
    if(expr==="happy")
      return `<g stroke="${s}" stroke-width="5" fill="${f}" stroke-linejoin="round">
        <path d="M50 130 q-24 -6 -32 -26 q14 -7 28 3 q7 10 4 23 z"/>
        <path d="M190 130 q24 -6 32 -26 q-14 -7 -28 3 q-7 10 -4 23 z"/></g>`;
    return `<g stroke="${s}" stroke-width="5" fill="${f}" stroke-linejoin="round">
        <path d="M46 152 q-20 4 -26 22 q14 6 25 -3 q4 -9 1 -19 z"/>
        <path d="M194 152 q20 4 26 22 q-14 6 -25 -3 q-4 -9 -1 -19 z"/></g>`;
  }

  function defs(uid){
    return `<defs><linearGradient id="iris${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${IRIS_TOP}"/><stop offset="1" stop-color="${IRIS_BOT}"/></linearGradient></defs>`;
  }

  function svg(expr, opts){
    expr = expr||"idle"; opts=opts||{};
    const w = opts.size||240; const uid=++_uid; const iris="iris"+uid;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="${w}" height="${w}">
      ${defs(uid)}
      ${arms(expr)}
      <rect x="46" y="60" width="160" height="144" rx="68" fill="${INK}" opacity="0.92"/>
      <rect x="40" y="52" width="160" height="144" rx="68" fill="${TEAL}" stroke="${INK}" stroke-width="6.5"/>
      <ellipse cx="84" cy="88" rx="36" ry="22" fill="${CREAM}" opacity="0.13"/>
      <circle cx="66" cy="80" r="3" fill="${CREAM}" opacity="0.2"/>
      <path d="M120 54 C116 40 119 30 126 25" fill="none" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M126 25 c10 -4 16 1 15 9 c-9 3 -15 -2 -15 -9 z" fill="${GREEN}" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
      ${spark(150,42,0.9,ORANGE)}
      <g class="gus-eyes" style="transform-box:fill-box;transform-origin:center;">${eyes(expr,{iris})}</g>
      ${cheeks(expr)}
      ${mouth(expr)}
      <circle cx="120" cy="165" r="25" fill="${CREAM}" stroke="${INK}" stroke-width="5"/>
      <path d="M109 165 l8 9 15 -19" fill="none" stroke="${GREEN}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${extras(expr)}
    </svg>`;
  }

  function mono(expr, opts){
    expr=expr||"idle"; opts=opts||{}; const w=opts.size||240; const I=INK;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="${w}" height="${w}">
      ${arms(expr, CREAM, I)}
      <rect x="40" y="52" width="160" height="144" rx="68" fill="${CREAM}" stroke="${I}" stroke-width="6.5"/>
      <path d="M120 54 C116 40 119 30 126 25" fill="none" stroke="${I}" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M126 25 c10 -4 16 1 15 9 c-9 3 -15 -2 -15 -9 z" fill="${CREAM}" stroke="${I}" stroke-width="3.5" stroke-linejoin="round"/>
      <g>${eyes(expr,{ink:I, outline:true})}</g>
      <circle cx="72" cy="126" r="9" fill="none" stroke="${I}" stroke-width="3.2"/>
      <circle cx="168" cy="126" r="9" fill="none" stroke="${I}" stroke-width="3.2"/>
      ${mouth(expr, I)}
      <circle cx="120" cy="165" r="25" fill="${CREAM}" stroke="${I}" stroke-width="5"/>
      <path d="M109 165 l8 9 15 -19" fill="none" stroke="${I}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  /* app icon: simplified cute face on rounded tile */
  function icon(opts){
    opts=opts||{}; const s=opts.size||512; const bg=opts.bg||TEAL;
    const dots=[]; for(let i=0;i<5;i++) for(let j=0;j<5;j++){ dots.push(`<circle cx="${30+i*46}" cy="${30+j*46}" r="3" fill="${CREAM}" opacity="0.12"/>`); }
    const eye=(cx,cy)=>`<ellipse cx="${cx}" cy="${cy}" rx="30" ry="38" fill="${CREAM}" stroke="${INK}" stroke-width="8"/>
      <ellipse cx="${cx}" cy="${cy+4}" rx="23" ry="31" fill="#17283c"/>
      <ellipse cx="${cx}" cy="${cy+8}" rx="12" ry="17" fill="${PUP}"/>
      <circle cx="${cx-8}" cy="${cy-12}" r="9" fill="${CREAM}"/><circle cx="${cx+8}" cy="${cy+10}" r="5" fill="${CREAM}" opacity="0.9"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="${s}" height="${s}">
      <rect x="8" y="8" width="224" height="224" rx="54" fill="${bg}" stroke="${INK}" stroke-width="11"/>
      ${dots.join("")}
      <ellipse cx="120" cy="78" rx="60" ry="32" fill="${CREAM}" opacity="0.12"/>
      ${eye(90,102)}${eye(158,102)}
      <g opacity="0.88"><ellipse cx="52" cy="138" rx="17" ry="12" fill="${ORANGE}"/></g>
      <g opacity="0.88"><ellipse cx="196" cy="138" rx="17" ry="12" fill="${ORANGE}"/></g>
      <path d="M104 150 q8 11 16 0 q8 11 16 0" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="124" cy="198" r="26" fill="${CREAM}" stroke="${INK}" stroke-width="7.5"/>
      <path d="M112 198 l8 9 15 -19" fill="none" stroke="${GREEN}" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  }

  /* deck badges (unchanged sticker glyphs) */
  const BADGES = {
    food:{bg:GREEN,label:"Fresh or Fake"}, scam:{bg:TEAL,label:"Scam Spotter"},
    math:{bg:ORANGE,label:"Quick Math"}, weird:{bg:GOLD,label:"Weird Facts"},
    animal:{bg:CREAM,label:"Animal Facts"}, history:{bg:SAND,label:"History Hits"},
    science:{bg:INK,label:"Science Snacks"},
  };
  function badgeGlyph(id){
    switch(id){
      case "food": return `<ellipse cx="32" cy="34" rx="13" ry="17" fill="${CREAM}" stroke="${INK}" stroke-width="3.4"/>
        <ellipse cx="32" cy="36" rx="6.5" ry="8" fill="none" stroke="${INK}" stroke-width="2.4"/>
        <circle cx="32" cy="37" r="4.6" fill="${ORANGE}" stroke="${INK}" stroke-width="2.2"/>
        <path d="M32 17 q5 -4 9 -1" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
      case "scam": return `<circle cx="28" cy="28" r="11" fill="${CREAM}" stroke="${INK}" stroke-width="3.4"/>
        <path d="M36 36 l9 9" stroke="${INK}" stroke-width="4.4" stroke-linecap="round"/>
        <path d="M28 23 v5 M28 31 v.2" stroke="${INK}" stroke-width="2.8" stroke-linecap="round"/>`;
      case "math": return `<path d="M20 24 h10 M25 19 v10" stroke="${CREAM}" stroke-width="3.6" stroke-linecap="round"/>
        <path d="M36 25 h8" stroke="${CREAM}" stroke-width="3.6" stroke-linecap="round"/>
        <circle cx="40" cy="38" r="2.2" fill="${CREAM}"/><path d="M34 40 h12" stroke="${CREAM}" stroke-width="3.4" stroke-linecap="round"/><circle cx="40" cy="44" r="2.2" fill="${CREAM}"/>
        <path d="M20 41 l9 -9" stroke="${CREAM}" stroke-width="3.4" stroke-linecap="round"/>`;
      case "weird": return `<path d="M32 14 L35 27 L48 24 L38 32 L48 40 L35 37 L32 50 L29 37 L16 40 L26 32 L16 24 L29 27 Z" fill="${CREAM}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="32" cy="32" r="5" fill="${ORANGE}" stroke="${INK}" stroke-width="2.4"/>`;
      case "animal": return `<path d="M16 22 L24 30 L18 34 Z" fill="${ORANGE}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/>
        <path d="M48 22 L40 30 L46 34 Z" fill="${ORANGE}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/>
        <path d="M32 24 C42 24 44 34 40 42 C37 47 27 47 24 42 C20 34 22 24 32 24 Z" fill="${ORANGE}" stroke="${INK}" stroke-width="3"/>
        <path d="M27 40 q5 4 10 0" fill="${CREAM}"/><circle cx="27" cy="34" r="2.2" fill="${INK}"/><circle cx="37" cy="34" r="2.2" fill="${INK}"/><circle cx="32" cy="41" r="2.4" fill="${INK}"/>`;
      case "history": return `<path d="M18 22 h28 l-3 5 h-22 z" fill="${TEAL}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/>
        <rect x="24" y="27" width="5" height="17" fill="${TEAL}" stroke="${INK}" stroke-width="2.6"/>
        <rect x="35" y="27" width="5" height="17" fill="${TEAL}" stroke="${INK}" stroke-width="2.6"/>
        <path d="M16 44 h32 l-2 5 h-28 z" fill="${TEAL}" stroke="${INK}" stroke-width="2.8" stroke-linejoin="round"/>`;
      case "science": return `<path d="M27 18 v9 L18 44 a4 4 0 0 0 4 5 h20 a4 4 0 0 0 4 -5 L37 27 v-9 z" fill="${TEAL}" stroke="${CREAM}" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M24 18 h16" stroke="${CREAM}" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="28" cy="40" r="2.4" fill="${GOLD}"/><circle cx="35" cy="43" r="2" fill="${GOLD}"/><circle cx="33" cy="36" r="1.6" fill="${GOLD}"/>`;
    }
    return "";
  }
  function badge(id, opts){
    opts=opts||{}; const s=opts.size||64; const b=BADGES[id]||BADGES.food;
    const stroke = b.bg===INK ? CREAM : INK;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${s}" height="${s}">
      <rect x="6" y="8" width="52" height="52" rx="16" fill="${INK}" opacity="0.9"/>
      <rect x="4" y="4" width="52" height="52" rx="16" fill="${b.bg}" stroke="${stroke}" stroke-width="3.4"/>
      <g transform="translate(-2 -2)">${badgeGlyph(id)}</g></svg>`;
  }

  window.Gus = { svg, mono, icon, badge, BADGES, colors:{INK,TEAL,CREAM,ORANGE,GREEN,GOLD,SAND} };
})();
