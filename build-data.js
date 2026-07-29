const fs = require('fs');
const path = require('path');

const H = 'C:/Users/aaciy/projects/_handoffs';
const OUT = 'C:/Users/aaciy/projects/YOMANI/handoffs.js';

// name = display, cat = category, url = best-known live URL ('' = none/not deployed),
// repo = github repo slug, hf = handoff filename (without .md), alt = secondary live url
const PROJECTS = [
  // ⭐ פעילים
  { name: 'VERISESS',            cat: 'פעילים',   url: 'https://verisess.vercel.app',                    repo: 'VERISESS',            hf: 'VERISESS' },
  { name: 'royal777',            cat: 'פעילים',   url: 'https://royal777-yoni-s-projects3k.vercel.app',  repo: '',                    hf: 'royal777' },
  { name: 'k-fitness',           cat: 'פעילים',   url: 'https://k-fitness-pearl.vercel.app',             repo: 'k-fitness',           hf: 'k-fitness' },
  { name: 'hanut-tal-niv',       cat: 'פעילים',   url: 'https://hanut-tal-niv.vercel.app',               repo: '',                    hf: 'hanut-tal-niv' },
  { name: 'navad',               cat: 'פעילים',   url: 'https://navad-preview.vercel.app',               repo: '',                    hf: 'navad' },
  { name: 'awakingdreams',       cat: 'פעילים',   url: 'https://aaciyoni-bot.github.io/awakingdreams',   repo: 'awakingdreams',       hf: 'awakingdreams' },
  { name: 'hiburatik',           cat: 'פעילים',   url: 'https://hiburatik.co.il',                        repo: 'hiburatik',           hf: 'hiburatik' },
  { name: 'CHASIDOOT',           cat: 'פעילים',   url: 'https://aaciyoni-bot.github.io/CHASIDOOT',       repo: 'CHASIDOOT',           hf: 'CHASIDOOT' },
  { name: 'windflow-ac',         cat: 'פעילים',   url: 'https://windflow-ac.vercel.app',                 repo: 'windflow-ac',         hf: 'windflow-ac' },
  { name: 'yehonatan-realestate',cat: 'פעילים',   url: 'https://aaciyoni-bot.github.io/yehonatan-realestate', repo: 'yehonatan-realestate', hf: 'yehonatan-realestate' },
  { name: 'orizisweb',           cat: 'פעילים',   url: 'https://orizisweb.com',                          repo: 'AFENT',               hf: 'orizisweb' },
  { name: 'adlipa',              cat: 'פעילים',   url: 'https://adlipa.web.app',                         repo: '',                    hf: 'adlipa' },
  { name: 'orizis-technology',   cat: 'פעילים',   url: '',                                                repo: '',                    hf: 'orizis-technology' },

  // ♠️ פוקר / קזינו / משחקים
  { name: 'pokerten',            cat: 'משחקים',   url: 'https://pokerten.com',                           repo: 'pokerten',            hf: 'pokerten' },
  { name: 'pocketseven',         cat: 'משחקים',   url: 'https://pocketseven.com',                        repo: 'pocketseven',         hf: 'pocketseven' },
  { name: 'RUMMIKUBE',           cat: 'משחקים',   url: 'https://www.rummikube.com',                      repo: 'RUMMIKUBE',           hf: 'RUMMIKUBE' },
  { name: 'NETABEL',             cat: 'משחקים',   url: 'https://netabel.com',                            repo: 'NETABEL',             hf: 'NETABEL' },
  { name: 'POKER',               cat: 'משחקים',   url: '',                                                repo: 'POKER',               hf: 'POKER' },
  { name: 'SCRATCH (DIAMOND BALL)', cat: 'משחקים', url: 'https://aaciyoni-bot.github.io/SCRATCH',        repo: 'SCRATCH',             hf: 'SCRATCH' },
  { name: 'TOURIZIS',            cat: 'משחקים',   url: 'https://tourizis.com',                           repo: 'TOURIZIS',            hf: 'TOURIZIS' },
  { name: 'orizis-games',        cat: 'משחקים',   url: '',                                                repo: '',                    hf: 'orizis-games' },
  { name: 'kicker-magazine',     cat: 'משחקים',   url: '',                                                repo: '',                    hf: 'kicker-magazine' },
  { name: 'ORIZIS GROUP (repo "-")', cat: 'משחקים', url: 'https://www.orizisgroup.com',                  repo: '-',                   hf: 'repo_aaciyoni-bot_-' },
  { name: 'repo "-76-67"',       cat: 'משחקים',   url: '',                                                repo: '-76-67',              hf: '76-67' },

  // 🏗️ נדל"ן / השקעות
  { name: 'ORIZJOREAL',          cat: 'נדל"ן',    url: 'https://aaciyoni-bot.github.io/ORIZJOREAL',      repo: 'ORIZJOREAL',          hf: 'ORIZJOREAL' },
  { name: 'orizisreal',          cat: 'נדל"ן',    url: 'https://orizisreal.com',                         repo: 'orizisreal',          hf: 'orizisreal' },
  { name: 'oriziscapital',       cat: 'נדל"ן',    url: 'https://www.oriziscap.com',                      repo: 'oriziscapital',       hf: 'oriziscapital' },
  { name: 'BAKU-VIP-INVEST',     cat: 'נדל"ן',    url: '',                                                repo: 'BAKU-VIP-INVEST',     hf: 'BAKU-VIP-INVEST' },
  { name: 'CRM',                 cat: 'נדל"ן',    url: '',                                                repo: '-CRM',                hf: 'CRM' },
  { name: 'orizis-realestate',   cat: 'נדל"ן',    url: '',                                                repo: '',                    hf: 'orizis-realestate' },

  // 🧰 מערכות ניהול / ERP / כלים
  { name: 'AFENT (ORIZISWEB ERP)', cat: 'כלים',   url: 'https://orizisweb.com',                          repo: 'AFENT',               hf: 'AFENT' },
  { name: 'DOH1',                cat: 'כלים',     url: 'https://www.capsul.co.il',                       repo: 'DOH1',                hf: 'DOH1' },
  { name: 'citycheck',           cat: 'כלים',     url: 'https://www.citycheck.co.il',                    repo: 'citycheck',           hf: 'citycheck' },
  { name: 'YOMANI',              cat: 'כלים',     url: 'https://aaciyoni-bot.github.io/YOMANI',          repo: 'YOMANI',              hf: 'YOMANI' },
  { name: 'ASFANUT',             cat: 'כלים',     url: 'https://aaciyoni-bot.github.io/ASFANUT',         repo: 'ASFANUT',             hf: 'ASFANUT' },
  { name: 'collexen',            cat: 'כלים',     url: 'https://collexen.com',                           repo: 'collexen',            hf: 'collexen' },
  { name: 'SEMESTERS',           cat: 'כלים',     url: '',                                                repo: 'SEMESTERS',           hf: 'SEMESTERS' },
  { name: 'SWIPEJOB (GOOJOB)',   cat: 'כלים',     url: 'https://aaciyoni-bot.github.io/SWIPEJOB',        repo: 'SWIPEJOB',            hf: 'SWIPEJOB' },
  { name: 'Subtitle- (PhoneScreen AI)', cat: 'כלים', url: '',                                            repo: 'Subtitle-',           hf: 'Subtitle-' },
  { name: 'uziel (BidMaster Pro)', cat: 'כלים',   url: 'https://aaciyoni-bot.github.io/uziel',           repo: 'uziel',               hf: 'uziel' },
  { name: 'orizisweb-erp',       cat: 'כלים',     url: '',                                                repo: '',                    hf: 'orizisweb-erp' },

  // 🏢 תדמית / עסקים / אחר
  { name: '189 (חטיבת נגבה)',    cat: 'תדמית',    url: 'https://www.189.co.il',                          repo: '189',                 hf: '189' },
  { name: 'ROTEM (עו"ד)',        cat: 'תדמית',    url: 'https://www.rotemslaw.com',                      repo: 'ROTEM',               hf: 'ROTEM' },
  { name: 'ORENF (אורן פראג\')', cat: 'תדמית',    url: 'https://orenfarage.com',                         repo: 'ORENF',               hf: 'ORENF' },
  { name: 'TOPHANEGEV',          cat: 'תדמית',    url: 'https://tophanegev.com',                         repo: 'TOPHANEGEV',          hf: 'TOPHANEGEV' },
  { name: 'HLI (חלי)',           cat: 'תדמית',    url: 'https://www.hli.org.il',                         repo: 'HLI',                 hf: 'HLI' },
  { name: 'ORPAZ-ILY',           cat: 'תדמית',    url: 'https://orpaz.co',                               repo: 'ORPAZ-ILY',           hf: 'ORPAZ-ILY' },
  { name: 'FARAH-VEN',           cat: 'תדמית',    url: 'https://www.farahvenezuela.com',                 repo: 'FARAH-VEN',           hf: 'FARAH-VEN' },
  { name: 'TIYUL (Nomado)',      cat: 'תדמית',    url: '',                                                repo: 'TIYUL',               hf: 'TIYUL' },
  { name: 'tal-niv',             cat: 'תדמית',    url: '',                                                repo: '',                    hf: 'tal-niv' },

  // 🛒 ZedMall / Zed family
  { name: 'zedmall-site',        cat: 'Zed',      url: '',                                                repo: 'zedmall-site',        hf: 'zedmall-site' },
  { name: 'zedmall-frontend',    cat: 'Zed',      url: '',                                                repo: 'zedmall-frontend',    hf: 'zedmall-frontend' },
  { name: 'zedmall-backend',     cat: 'Zed',      url: '',                                                repo: 'zedmall-backend',     hf: 'zedmall-backend' },
  { name: 'zedmall (base)',      cat: 'Zed',      url: '',                                                repo: '',                    hf: 'zedmall' },
  { name: 'zedglow (ZedGlow)',   cat: 'Zed',      url: 'https://zedglow.com',                            repo: 'zedglow-site',        hf: '' },
  { name: 'ZedTech',             cat: 'Zed',      url: 'https://aaciyoni-bot.github.io/zedtech-site',                repo: 'zedtech-site',        hf: 'ZEDTECH' },
  { name: 'ZedSolar',            cat: 'Zed',      url: 'https://aaciyoni-bot.github.io/zedsolar-site',               repo: 'zedsolar-site',       hf: 'ZEDSOLAR' },
  { name: 'ZedHome',             cat: 'Zed',      url: 'https://aaciyoni-bot.github.io/zedhome-site',                repo: 'zedhome-site',        hf: 'ZEDHOME' },
  { name: 'ZedBaby',             cat: 'Zed',      url: 'https://aaciyoni-bot.github.io/zedbaby-site',                repo: 'zedbaby-site',        hf: 'ZEDBABY' },
  { name: 'ZedCards',            cat: 'Zed',      url: 'https://aaciyoni-bot.github.io/zedcards-site',               repo: 'zedcards-site',       hf: 'ZEDCARDS' },
  { name: 'ZedTickets',          cat: 'Zed',      url: 'https://aaciyoni-bot.github.io/zedtickets-site',             repo: 'zedtickets-site',     hf: 'ZEDTICKETS' },
  { name: 'ZedMatch',            cat: 'Zed',      url: 'https://aaciyoni-bot.github.io/zedmatch-site',   repo: 'zedmatch-site',       hf: 'ZEDMATCH' },
  { name: 'ZedSave',             cat: 'Zed',      url: '',                                                repo: '',                    hf: 'ZEDSAVE' },
  { name: 'ZedTopUp',            cat: 'Zed',      url: '',                                                repo: '',                    hf: 'ZEDTOPUP' },
  { name: 'ORIZIS Academy',      cat: 'Zed',      url: 'https://aaciyoni-bot.github.io/orizis-academy',              repo: 'orizis-academy',      hf: 'ORIZIS-ACADEMY' },

  // 🔗 תשתית משותפת
  { name: 'VeriPoints (ארנק)',   cat: 'תשתית',    url: '',                                                repo: 'VeriPoints',          hf: 'veripoints' },
  { name: 'ADDON-VERIPOINTS',    cat: 'תשתית',    url: '',                                                repo: '',                    hf: 'ADDON-VERIPOINTS' },
  { name: 'orizis-group',        cat: 'תשתית',    url: 'https://www.orizisgroup.com',                    repo: '-',                   hf: 'orizis-group' },
];

// ---- read handoff files ----
const META_SKIP = new Set(['INDEX', '_CONTEXT', '_RECOVERY', '_SESSION_NOTES', '_shared']);
const handoffs = {};
for (const f of fs.readdirSync(H)) {
  if (!f.endsWith('.md')) continue;
  const key = f.replace(/\.md$/, '');
  if (META_SKIP.has(key)) continue;
  handoffs[key] = fs.readFileSync(path.join(H, f), 'utf8');
}

// ---- liveness check (curl-based — more reliable than Node fetch in this env) ----
const { exec } = require('child_process');
function curlCode(u) {
  return new Promise((resolve) => {
    exec(`curl -s -m 20 -o /dev/null -w "%{http_code}" -L "${u}"`, (err, stdout) => {
      resolve((stdout || '').trim());
    });
  });
}
async function checkUrl(url) {
  if (!url) return 'none';
  const code = await curlCode(url);
  if (code && code !== '000') return code;
  // https failed — try http fallback to distinguish "down" from "https-cert-missing"
  const httpUrl = url.replace(/^https:/, 'http:');
  if (httpUrl !== url) {
    const c2 = await curlCode(httpUrl);
    if (c2 && c2 !== '000' && /^[23]/.test(c2)) return 'H' + c2; // live over HTTP only
  }
  return 'ERR';
}

(async () => {
  const links = [];
  await Promise.all(PROJECTS.map(async (p) => {
    const status = await checkUrl(p.url);
    links.push({ name: p.name, cat: p.cat, url: p.url, repo: p.repo, hf: p.hf, status });
  }));
  // keep original order
  links.sort((a, b) => PROJECTS.findIndex(p => p.name === a.name) - PROJECTS.findIndex(p => p.name === b.name));

  const data = {
    generatedAt: '2026-07-25',
    links,
    handoffs,
  };
  const out = 'window.CLAUDE_PROJECT_DATA = ' + JSON.stringify(data) + ';\n';
  fs.writeFileSync(OUT, out);

  const liveCount = links.filter(l => /^2|^3/.test(l.status)).length;
  console.log('projects:', links.length, '| handoffs:', Object.keys(handoffs).length, '| live(2xx/3xx):', liveCount, '| file KB:', Math.round(out.length / 1024));
  console.log('statuses:');
  links.forEach(l => console.log(' ', l.status.padEnd(8), l.name, l.url || '(none)'));
})();
