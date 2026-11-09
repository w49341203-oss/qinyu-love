/* =========================================================
   題目附圖（用程式畫，刻度精準）
   題目裡寫 fig:'代號' 就會顯示這裡的圖
   ========================================================= */
const FIGS = {};

/* 共用：表格 */
function figTable(head, rows, widths, color){
  const W = widths.reduce((a, b) => a + b, 0), RH = 38, H = RH * (rows.length + 1);
  let t = `<rect width="${W + 40}" height="${H + 40}" rx="12" fill="#fff"/>`;
  t += `<rect x="20" y="20" width="${W}" height="${RH}" fill="${color}22"/>`;
  const cell = (txt, ci, ri, bold) => {
    const x = 20 + widths.slice(0, ci).reduce((a, b) => a + b, 0) + widths[ci] / 2;
    return `<text x="${x}" y="${20 + ri * RH + 25}" font-size="16" ${bold ? 'font-weight="900"' : ''} text-anchor="middle" fill="${bold ? color : '#222'}">${txt}</text>`;
  };
  head.forEach((h, ci) => t += cell(h, ci, 0, true));
  rows.forEach((r, ri) => r.forEach((c, ci) => t += cell(c, ci, ri + 1, ci === 0)));
  for (let ri = 1; ri <= rows.length; ri++) t += `<line x1="20" y1="${20 + ri * RH}" x2="${20 + W}" y2="${20 + ri * RH}" stroke="${color}88"/>`;
  let x = 20; widths.slice(0, -1).forEach(w => { x += w; t += `<line x1="${x}" y1="20" x2="${x}" y2="${20 + H}" stroke="${color}88"/>`; });
  t += `<rect x="20" y="20" width="${W}" height="${H}" fill="none" stroke="${color}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 ${W + 40} ${H + 40}" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans TC, sans-serif">${t}</svg>`;
}

/* 星光的食鹽溶解紀錄表（18℃，溶解度約 36 g/100 g 水） */
FIGS.saltTable = figTable(['', '食鹽', '水', '溶解情形', '溫度'],
  [['甲','8 g','150 g','完全溶解','18℃'],['乙','26 g','75 g','完全溶解','18℃'],['丙','20 g','50 g','杯底有未溶解的食鹽','18℃']],
  [44, 70, 70, 190, 66], '#b91c1c');

/* 共用：質量－體積座標軸 */
function axes(ox, oy, w, h, xl, yl){
  return `<line x1="${ox}" y1="${oy}" x2="${ox + w}" y2="${oy}" stroke="#222" stroke-width="2" marker-end="url(#ar)"/>
    <line x1="${ox}" y1="${oy}" x2="${ox}" y2="${oy - h}" stroke="#222" stroke-width="2" marker-end="url(#ar)"/>
    <text x="${ox + w - 4}" y="${oy + 22}" font-size="15" text-anchor="end" fill="#222">${xl}</text>
    <text x="${ox - 8}" y="${oy - h + 14}" font-size="15" text-anchor="end" fill="#222">${yl}</text>`;
}
const ARROW = `<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#222"/></marker></defs>`;

/* 兩條直線 D1（陡）、D2（緩） */
FIGS.graphD12 = `<svg viewBox="0 0 340 250" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans TC, sans-serif">${ARROW}
  <rect width="340" height="250" rx="12" fill="#fff"/>${axes(60, 210, 250, 180, '體積 V', '質量 M')}
  <line x1="60" y1="210" x2="220" y2="50" stroke="#2563eb" stroke-width="3"/>
  <line x1="60" y1="210" x2="290" y2="110" stroke="#dc2626" stroke-width="3"/>
  <text x="226" y="52" font-size="18" font-weight="900" fill="#2563eb">D₁</text>
  <text x="294" y="110" font-size="18" font-weight="900" fill="#dc2626">D₂</text></svg>`;

/* 四張質量－體積圖 A～D（D 是通過原點的直線） */
FIGS.graph4 = (function(){
  const W = 170, H = 150;
  const curves = [
    'M 40 70 L 150 70',                              // A 水平線
    'M 48 20 Q 60 110 150 118',                      // B 遞減曲線
    'M 100 128 L 100 20',                            // C 垂直線
    'M 40 128 L 145 30',                             // D 過原點直線
  ];
  let t = '';
  curves.forEach((d, i) => {
    const ox = (i % 2) * W, oy = Math.floor(i / 2) * H;
    t += `<g transform="translate(${ox},${oy})">${axes(40, 128, 120, 110, 'V', 'M')}
      <path d="${d}" fill="none" stroke="#7c3aed" stroke-width="3"/>
      <text x="150" y="26" font-size="20" font-weight="900" fill="#c2410c">${'ABCD'[i]}</text></g>`;
  });
  return `<svg viewBox="0 0 ${W * 2} ${H * 2}" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans TC, sans-serif">${ARROW}
    <rect width="${W * 2}" height="${H * 2}" rx="12" fill="#fff"/>${t}</svg>`;
})();

/* 製造氧氣＋排水集氣法裝置 */
FIGS.o2setup = `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans TC, sans-serif">
  <rect width="520" height="300" rx="12" fill="#fff"/>
  <!-- 錐形瓶 -->
  <path d="M95 120 L95 150 L45 250 L185 250 L135 150 L135 120 Z" fill="#eef7fc" stroke="#334" stroke-width="2"/>
  <path d="M62 215 L168 215 L185 250 L45 250 Z" fill="#9fd3f0" opacity=".8"/>
  <circle cx="90" cy="240" r="3" fill="#333"/><circle cx="110" cy="243" r="3" fill="#333"/><circle cx="135" cy="240" r="3" fill="#333"/>
  <rect x="90" y="112" width="50" height="14" rx="3" fill="#555"/>
  <!-- 薊頭漏斗（下端伸入液面下） -->
  <line x1="105" y1="60" x2="105" y2="235" stroke="#334" stroke-width="3"/>
  <path d="M85 40 Q105 75 125 40 Z" fill="#eef7fc" stroke="#334" stroke-width="2"/>
  <!-- 導管 -->
  <path d="M125 112 L125 80 L330 80 L330 265 L370 265 L370 225" fill="none" stroke="#334" stroke-width="4"/>
  <!-- 水槽 -->
  <rect x="300" y="180" width="200" height="100" fill="#cfeaf9" stroke="#334" stroke-width="2"/>
  <!-- 集氣瓶（倒立、裝滿水） -->
  <rect x="345" y="120" width="60" height="140" rx="6" fill="#9fd3f0" stroke="#334" stroke-width="2"/>
  <circle cx="370" cy="215" r="4" fill="#fff" stroke="#2a7ab0"/><circle cx="378" cy="196" r="5" fill="#fff" stroke="#2a7ab0"/>
  <text x="140" y="38" font-size="15" fill="#222">薊頭漏斗</text>
  <text x="20" y="282" font-size="14" fill="#222">雙氧水＋二氧化錳</text>
  <text x="415" y="140" font-size="15" fill="#222">集氣瓶</text>
  <text x="430" y="272" font-size="15" fill="#222">水槽</text>
</svg>`;

/* 常見金屬密度表（20°C） */
FIGS.density = (function(){
  const rows = [['金','Au','19.32'],['鉛','Pb','11.34'],['銀','Ag','10.49'],['銅','Cu','8.96'],['鐵','Fe','7.87'],['鋁','Al','2.70']];
  let t = `<rect width="360" height="${50 + rows.length * 36}" rx="12" fill="#fff"/>`;
  t += `<rect x="20" y="16" width="320" height="34" fill="#fde2e2"/>`;
  [['金屬',75],['符號',180],['密度 (g/cm³)',275]].forEach(([s, x]) => t += `<text x="${x}" y="39" font-size="16" font-weight="900" text-anchor="middle" fill="#b91c1c">${s}</text>`);
  rows.forEach((r, i) => {
    const y = 50 + i * 36;
    t += `<line x1="20" y1="${y}" x2="340" y2="${y}" stroke="#e5a3a3"/>`;
    t += `<text x="75" y="${y + 24}" font-size="17" text-anchor="middle" fill="#222">${r[0]}</text>`;
    t += `<text x="180" y="${y + 24}" font-size="17" text-anchor="middle" fill="#222">${r[1]}</text>`;
    t += `<text x="275" y="${y + 24}" font-size="17" text-anchor="middle" fill="#222">${r[2]}</text>`;
  });
  const h = 50 + rows.length * 36;
  t += `<rect x="20" y="16" width="320" height="${h - 16}" fill="none" stroke="#b91c1c" stroke-width="2"/>`;
  return `<svg viewBox="0 0 360 ${h + 12}" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans TC, sans-serif">${t}</svg>`;
})();

/* 啤酒罐標示 */
FIGS.beercan = `<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans TC, sans-serif">
  <rect width="420" height="260" rx="12" fill="#fff"/>
  <rect x="40" y="30" width="120" height="200" rx="16" fill="#2f7d4f"/>
  <rect x="40" y="30" width="120" height="16" rx="8" fill="#b9c2c9"/>
  <rect x="40" y="214" width="120" height="16" rx="8" fill="#b9c2c9"/>
  <rect x="52" y="90" width="96" height="70" rx="6" fill="#f3ecd2"/>
  <text x="100" y="118" font-size="16" font-weight="900" text-anchor="middle" fill="#1f4d32">BEER</text>
  <text x="100" y="144" font-size="13" font-weight="700" text-anchor="middle" fill="#b91c1c">ALC. 5.0% VOL.</text>
  <line x1="150" y1="138" x2="215" y2="112" stroke="#b91c1c" stroke-width="2"/>
  <rect x="215" y="80" width="180" height="60" rx="8" fill="#fff5f5" stroke="#b91c1c" stroke-width="2"/>
  <text x="305" y="118" font-size="22" font-weight="900" text-anchor="middle" fill="#b91c1c">ALC. 5.0% VOL.</text>
  <text x="305" y="172" font-size="15" text-anchor="middle" fill="#444">（罐身標示放大）</text>
</svg>`;

/* 量筒放大圖：最小刻度 1 mL，液面凹處最低點正好在 327 mL */
FIGS.cyl327 = (function(){
  const TOP = 336, BOT = 319, PX = 15, Y0 = 20;          // 顯示 319～336 mL，每 mL 15 px
  const yOf = v => Y0 + (TOP - v) * PX;
  const L = 150, R = 270, LEVEL = 327;
  let t = '';
  // 水（含凹液面）
  const yl = yOf(LEVEL), rise = 10;
  t += `<path d="M${L} ${yl-rise} Q${(L+R)/2} ${yl+rise} ${R} ${yl-rise} L${R} ${yOf(BOT)} L${L} ${yOf(BOT)} Z" fill="#7cc4ee" opacity=".75"/>`;
  t += `<path d="M${L} ${yl-rise} Q${(L+R)/2} ${yl+rise} ${R} ${yl-rise}" fill="none" stroke="#1e6fa8" stroke-width="2"/>`;
  // 筒壁
  t += `<line x1="${L}" y1="${Y0-6}" x2="${L}" y2="${yOf(BOT)}" stroke="#5b6b7a" stroke-width="3"/>`;
  t += `<line x1="${R}" y1="${Y0-6}" x2="${R}" y2="${yOf(BOT)}" stroke="#5b6b7a" stroke-width="3"/>`;
  // 刻度（畫在筒左側內緣）
  for (let v = BOT; v <= TOP; v++) {
    const y = yOf(v), big = v % 5 === 0;
    t += `<line x1="${L}" y1="${y}" x2="${L + (big ? 40 : 20)}" y2="${y}" stroke="#123" stroke-width="${big ? 2 : 1}"/>`;
    if (big) t += `<text x="${L - 10}" y="${y + 6}" font-size="18" text-anchor="end" fill="#123">${v}</text>`;
  }
  t += `<text x="${L - 10}" y="${yOf(BOT) + 22}" font-size="14" text-anchor="end" fill="#555">mL</text>`;
  t += `<text x="300" y="40" font-size="16" fill="#555">量筒刻度放大圖</text>`;
  t += `<text x="300" y="64" font-size="16" fill="#555">（最小刻度 1 mL）</text>`;
  return `<svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans TC, sans-serif">
    <rect width="460" height="300" rx="12" fill="#fff"/>${t}</svg>`;
})();

/* 直尺讀數：鉛筆尖在 14.75 cm（甲乙＝最小刻度 1 cm；丙丁＝最小刻度 1 mm） */
FIGS.ruler4 = (function(){
  const panels = [
    { lab:'甲', mm:false, rec:'14.7 cm' },
    { lab:'乙', mm:false, rec:'15.7 cm' },
    { lab:'丙', mm:true,  rec:'14.751 cm' },
    { lab:'丁', mm:true,  rec:'14.75 cm' },
  ];
  const PX = 70, X0 = 12.6, TIP = 14.75;          // 每 cm 70 px，從 12.6 cm 畫起
  const xOf = cm => 14 + (cm - X0) * PX;
  const one = (p, i) => {
    const ox = (i % 2) * 262, oy = Math.floor(i / 2) * 150;
    let t = '';
    // 尺身
    t += `<rect x="${ox+6}" y="${oy+58}" width="240" height="52" rx="4" fill="#bfe3f5" stroke="#5aa9cf"/>`;
    // 刻度
    for (let mm = Math.ceil(X0*10); mm <= 155; mm++) {
      const cm = mm / 10, x = ox + xOf(cm);
      if (x > ox + 244) break;
      if (mm % 10 === 0) {
        t += `<line x1="${x}" y1="${oy+58}" x2="${x}" y2="${oy+82}" stroke="#123" stroke-width="2"/>`;
        t += `<text x="${x}" y="${oy+102}" font-size="15" text-anchor="middle" fill="#123">${mm/10}cm</text>`;
      } else if (p.mm) {
        const h = mm % 5 === 0 ? 15 : 9;
        t += `<line x1="${x}" y1="${oy+58}" x2="${x}" y2="${oy+58+h}" stroke="#123" stroke-width="1"/>`;
      }
    }
    // 鉛筆（筆尖在 TIP）
    const tx = ox + xOf(TIP);
    t += `<rect x="${ox+6}" y="${oy+30}" width="${tx-ox-6-34}" height="24" fill="#e8b04a" stroke="#a87520"/>`;
    t += `<polygon points="${tx-34},${oy+30} ${tx-34},${oy+54} ${tx},${oy+56}" fill="#f6d2b0" stroke="#a87520"/>`;
    t += `<polygon points="${tx-11},${oy+49} ${tx-11},${oy+55} ${tx},${oy+56}" fill="#222"/>`;
    // 標號與紀錄
    t += `<text x="${ox+10}" y="${oy+22}" font-size="18" font-weight="900" fill="#c2410c">${p.lab}</text>`;
    t += `<text x="${ox+36}" y="${oy+22}" font-size="16" fill="#123">紀錄：${p.rec}</text>`;
    return t;
  };
  return `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans TC, sans-serif">
    <rect width="520" height="300" rx="12" fill="#fff"/>${panels.map(one).join('')}</svg>`;
})();
