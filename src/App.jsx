// @ts-nocheck
import { useState, useEffect, useRef } from "react";

const PEXELS_KEY = "dkz8UD3sn0mBb8DoP7AvsYz8IO5KELTyNAswsq7pObW90oH6CGK8efzv";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0a0f; --surface: #13131a; --surface2: #1c1c28; --border: #2a2a3d;
    --accent: #ff3c6e; --accent2: #00e5ff; --accent3: #ffe600; --text: #f0f0f8;
    --muted: #6b6b8a; --green: #00ff88;
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; }
  .app { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; position: relative; overflow: hidden; }
  .app::before { content: ''; position: fixed; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(ellipse at 30% 20%, rgba(255,60,110,0.07) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(0,229,255,0.07) 0%, transparent 50%); pointer-events: none; z-index: 0; }
  .container { position: relative; z-index: 1; width: 100%; max-width: 640px; }
  .logo { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px, 8vw, 80px); letter-spacing: clamp(2px, 1vw, 4px); text-align: center; margin-bottom: 4px; background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .tagline { text-align: center; color: var(--muted); font-size: 13px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 48px; }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 32px; margin-bottom: 16px; }
  .card-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: var(--accent2); margin-bottom: 20px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; border-radius: 10px; border: none; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.15s ease; letter-spacing: 0.5px; width: 100%; }
  .btn-primary { background: var(--accent); color: white; }
  .btn-primary:hover { background: #ff5a82; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,60,110,0.3); }
  .btn-secondary { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
  .btn-secondary:hover { border-color: var(--accent2); color: var(--accent2); }
  .btn-ghost { background: transparent; color: var(--muted); font-size: 13px; padding: 8px 16px; }
  .btn-ghost:hover { color: var(--text); }
  .btn-cyan { background: var(--accent2); color: #000; }
  .btn-cyan:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none !important; }
  .input { width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 13px 16px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none; transition: border-color 0.15s; }
  .input:focus { border-color: var(--accent2); }
  .input::placeholder { color: var(--muted); }
  .field { margin-bottom: 20px; }
  .label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .tabs { display: flex; gap: 4px; background: var(--surface2); padding: 4px; border-radius: 10px; margin-bottom: 24px; }
  .tab { flex: 1; padding: 10px; border: none; border-radius: 8px; background: transparent; color: var(--muted); font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; letter-spacing: 0.5px; transition: all 0.15s; }
  .tab.active { background: var(--surface); color: var(--text); box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
  .room-code { font-family: 'Bebas Neue', sans-serif; font-size: 56px; letter-spacing: 12px; text-align: center; color: var(--accent3); padding: 16px; background: var(--surface2); border-radius: 12px; border: 1px solid rgba(255,230,0,0.2); margin: 16px 0; }
  .player-list { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
  .player-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: var(--surface2); border-radius: 10px; border: 1px solid var(--border); font-size: 14px; font-weight: 500; }
  .player-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .dot-green { background: var(--green); box-shadow: 0 0 8px var(--green); }
  .dot-yellow { background: var(--accent3); box-shadow: 0 0 8px var(--accent3); }
  .dot-red { background: var(--accent); box-shadow: 0 0 8px var(--accent); }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
  .dot-pulse { animation: pulse 1.5s ease-in-out infinite; }
  .badge { margin-left: auto; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; }
  .badge-host { background: rgba(255,230,0,0.15); color: var(--accent3); }
  .badge-you { background: rgba(0,229,255,0.15); color: var(--accent2); }
  .alert { padding: 12px 16px; border-radius: 10px; font-size: 13px; margin-bottom: 16px; line-height: 1.5; }
  .alert-info { background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.2); color: var(--accent2); }
  .alert-warning { background: rgba(255,230,0,0.08); border: 1px solid rgba(255,230,0,0.2); color: var(--accent3); }
  .alert-danger { background: rgba(255,60,110,0.08); border: 1px solid rgba(255,60,110,0.2); color: var(--accent); }
  .alert-success { background: rgba(0,255,136,0.08); border: 1px solid rgba(0,255,136,0.2); color: var(--green); }
  .info-row { display: flex; gap: 10px; margin-bottom: 20px; }
  .info-pill { flex: 1; padding: 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; text-align: center; }
  .info-pill .pill-val { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; color: var(--accent2); }
  .info-pill .pill-label { font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-top: 2px; }
  .progress-bar { height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; margin-bottom: 8px; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); border-radius: 2px; transition: width 0.3s ease; }
  .status-row { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 20px; }
  .timer-wrap { display: flex; flex-direction: column; align-items: center; margin-bottom: 16px; }
  .timer-ring { position: relative; display: flex; align-items: center; justify-content: center; }
  .timer-ring svg { position: absolute; top:0; left:0; transform: rotate(-90deg); }
  .timer-num { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 2px; z-index: 1; color: var(--text); }
  .timer-num.urgent { color: var(--accent); animation: blink 0.5s ease-in-out infinite alternate; }
  @keyframes blink { from{opacity:1} to{opacity:0.4} }
  .timer-label { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-top: 6px; }
  .video-wrapper { position: relative; padding-bottom: 56.25%; border-radius: 12px; overflow: hidden; border: 2px solid var(--border); background: #000; margin: 16px 0; }
  .video-wrapper iframe { position: absolute; top:0; left:0; width:100%; height:100%; border:none; }
  .video-overlay { position: absolute; inset: 0; z-index: 2; cursor: not-allowed; }
  .picture-wrapper { position: relative; border-radius: 12px; overflow: hidden; border: 2px solid var(--border); background: var(--surface2); margin: 16px 0; min-height: 200px; display: flex; align-items: center; justify-content: center; }
  .picture-wrapper img { width: 100%; height: 300px; object-fit: cover; display: block; }
  .picture-hidden { width: 100%; height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--muted); font-size: 14px; background: var(--surface2); }
  .word-display { text-align: center; padding: 40px 20px; }
  .word-big { font-family: 'Bebas Neue', sans-serif; font-size: clamp(48px, 12vw, 96px); letter-spacing: 6px; background: linear-gradient(135deg, var(--accent2), var(--accent3)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1; margin-bottom: 12px; }
  .word-sub { font-size: 13px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; }
  .word-blind { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 4px; color: var(--muted); }
  .clue-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 16px 0; }
  .clue-card { background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 16px; text-align: center; }
  .clue-card .name { font-size: 11px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
  .clue-card .word { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; color: var(--text); }
  .clue-card.impostor-reveal { border-color: var(--accent); background: rgba(255,60,110,0.08); }
  .clue-card.impostor-reveal .word { color: var(--accent); }
  .vote-grid { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
  .vote-btn { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; cursor: pointer; transition: all 0.15s; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; text-align: left; }
  .vote-btn:hover { border-color: var(--accent); background: rgba(255,60,110,0.08); }
  .vote-btn.selected { border-color: var(--accent); background: rgba(255,60,110,0.15); color: var(--accent); }
  .vote-count { margin-left: auto; font-size: 12px; color: var(--muted); }
  .result-banner { text-align: center; padding: 32px; border-radius: 16px; margin-bottom: 16px; }
  .result-banner.majority-wins { background: radial-gradient(ellipse at center, rgba(0,255,136,0.1), transparent); border: 1px solid rgba(0,255,136,0.3); }
  .result-banner.imposter-wins { background: radial-gradient(ellipse at center, rgba(255,60,110,0.1), transparent); border: 1px solid rgba(255,60,110,0.3); }
  .result-emoji { font-size: 52px; margin-bottom: 12px; }
  .result-title { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 3px; }
  .result-banner.majority-wins .result-title { color: var(--green); }
  .result-banner.imposter-wins .result-title { color: var(--accent); }
  .result-sub { color: var(--muted); font-size: 14px; margin-top: 8px; }
  .instructions-step { display: flex; gap: 14px; margin-bottom: 16px; align-items: flex-start; }
  .step-num { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--accent); line-height: 1; flex-shrink: 0; width: 28px; }
  .step-text { font-size: 14px; line-height: 1.6; color: var(--muted); }
  .step-text strong { color: var(--text); }
  .range-wrap { margin-bottom: 20px; }
  .range-row { display: flex; align-items: center; gap: 12px; }
  .range-row input[type=range] { flex: 1; accent-color: var(--accent2); cursor: pointer; }
  .range-val { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--accent2); letter-spacing: 1px; min-width: 44px; text-align: right; }
  .category-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 4px; }
  .cat-btn { padding: 14px 8px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; cursor: pointer; text-align: center; transition: all 0.15s; color: var(--text); font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 12px; }
  .cat-btn:hover { border-color: var(--accent2); }
  .cat-btn.selected { border-color: var(--accent2); background: rgba(0,229,255,0.08); color: var(--accent2); }
  .cat-icon { font-size: 22px; display: block; margin-bottom: 4px; }
  .mode-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 24px; }
  .mode-btn { padding: 20px 8px; background: var(--surface2); border: 2px solid var(--border); border-radius: 14px; cursor: pointer; text-align: center; transition: all 0.15s; color: var(--text); font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 13px; }
  .mode-btn:hover { border-color: var(--accent2); }
  .mode-btn.selected { border-color: var(--accent2); background: rgba(0,229,255,0.08); color: var(--accent2); }
  .mode-icon { font-size: 28px; display: block; margin-bottom: 8px; }
  .mode-desc { font-size: 11px; color: var(--muted); margin-top: 4px; font-weight: 400; }
  .custom-pair { display: flex; gap: 8px; align-items: center; padding: 10px 12px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 8px; font-size: 13px; }
  .custom-pair-labels { flex: 1; display: flex; gap: 4px; flex-direction: column; }
  .custom-pair-maj { color: var(--accent2); font-size: 12px; }
  .custom-pair-imp { color: var(--accent); font-size: 12px; }
  .hint-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 4px; }
  .hint-btn { padding: 12px 16px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; cursor: pointer; transition: all 0.15s; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; text-align: left; display: flex; align-items: center; gap: 10px; }
  .hint-btn:hover { border-color: var(--accent2); }
  .hint-btn.selected { border-color: var(--accent2); background: rgba(0,229,255,0.08); color: var(--accent2); }
  .hint-desc { font-size: 11px; color: var(--muted); font-weight: 400; margin-top: 2px; }
  .spinner { width: 32px; height: 32px; border: 3px solid var(--border); border-top-color: var(--accent2); border-radius: 50%; animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .clue-early { background: rgba(0,255,136,0.06); border: 1px solid rgba(0,255,136,0.15); border-radius: 10px; padding: 10px 14px; font-size: 12px; color: var(--green); margin-bottom: 12px; }
  .dot-live { width: 8px; height: 8px; border-radius: 50%; background: var(--green); animation: pulse 1.5s ease-in-out infinite; }
  .video-label { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .add-pair-form { background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 16px; margin-bottom: 12px; }
  .input-row { display: flex; gap: 8px; }
  .input-sm { flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none; }
  .input-sm:focus { border-color: var(--accent2); }
  .input-sm::placeholder { color: var(--muted); }
  .btn-add { background: var(--accent2); color: #000; border: none; border-radius: 8px; padding: 10px 16px; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 13px; cursor: pointer; white-space: nowrap; }
  .btn-remove { background: transparent; color: var(--accent); border: none; font-size: 16px; cursor: pointer; padding: 4px 8px; flex-shrink: 0; }
`;

// ─── Built-in content libraries ───

const VIDEO_PAIRS = [
  { id:"v1", category:"sports",  label:"Two Races",            majority:{id:"ySGpOYEIqWA",start:30}, imposter:{id:"ynRZQ9EBfRI",start:80} },
  { id:"v2", category:"sports",  label:"Two Goals",            majority:{id:"l60UR7crCHo",start:10}, imposter:{id:"9dtMBDNNDl4",start:15} },
  { id:"v3", category:"sports",  label:"Two GOATs",            majority:{id:"s1Ai9n3_VcQ",start:30}, imposter:{id:"xFqiecMR_jw",start:20} },
  { id:"v4", category:"sports",  label:"Two Knockouts",        majority:{id:"ZBjEMRpCGFQ",start:10}, imposter:{id:"hqdXxOANXoY",start:10} },
  { id:"v5", category:"music",   label:"Two Big Performances", majority:{id:"nfWlot6h_JM",start:60}, imposter:{id:"4m1EFMoRFvY",start:45} },
  { id:"v6", category:"music",   label:"Two Rap Videos",       majority:{id:"uxpDa-c-4Mc",start:30}, imposter:{id:"TGjWG9KWNSA",start:20} },
  { id:"v7", category:"music",   label:"Two Pop Bangers",      majority:{id:"JGwWNGJdvx8",start:50}, imposter:{id:"XXYlFuWEuKI",start:30} },
  { id:"v8", category:"memes",   label:"Two Viral Dances",     majority:{id:"9bZkp7q19f0",start:75}, imposter:{id:"OPf0YbXqDm0",start:15} },
  { id:"v9", category:"memes",   label:"Two Viral Challenges", majority:{id:"XoFJEPPgbCo",start:5},  imposter:{id:"nrKEbJlpYeA",start:5}  },
  { id:"v10",category:"tv",      label:"Two Superhero Trailers",majority:{id:"d96cjJhvlMA",start:30}, imposter:{id:"3cxixDgB6Jk",start:20} },
  { id:"v11",category:"tv",      label:"Two Show Intros",      majority:{id:"b9EkMc79ZSU",start:15}, imposter:{id:"bjqU_p3PBgE",start:10} },
  { id:"v12",category:"news",    label:"Two Rocket Launches",  majority:{id:"O2W0N3uKXmo",start:10}, imposter:{id:"g0SnSCGNpPE",start:15} },
];

const PICTURE_CATEGORIES = {
  animals: { label:"Animals", icon:"🐾", pool:[
    "golden retriever","german shepherd","husky","labrador","pug",
    "tabby cat","black cat","kitten","lion","tiger",
    "elephant","giraffe","zebra","gorilla","chimpanzee",
    "panda","polar bear","grizzly bear","wolf","fox",
    "dolphin","whale","shark","penguin","eagle",
    "horse","cow","pig","sheep","duck",
    "rabbit","hamster","parrot","owl","flamingo",
    "crocodile","snake","frog","turtle","deer",
    "kangaroo","koala","cheetah","leopard","rhinoceros",
    "hippopotamus","camel","peacock","octopus","jellyfish",
  ]},
  nature: { label:"Nature", icon:"🌊", pool:[
    "beach sunset","ocean waves","snowy mountain","waterfall","rainforest",
    "desert","volcano","northern lights","lightning storm","rainbow",
    "cherry blossom","autumn leaves","frozen lake","canyon","glacier",
    "lavender field","sunflower field","bamboo forest","coral reef","tornado",
    "sunrise","full moon","starry night","foggy hills","green meadow",
    "flowing river","calm lake","sand dunes","rocky cliff","tropical island",
    "hot spring","lava flow","wheat field","misty forest","snowy forest",
    "cactus","mangrove","rice terraces","tulip field","vineyard",
    "victoria falls","grand canyon","amazon river","mount fuji","niagara falls",
    "great barrier reef","yellowstone geyser","dead sea","fjord","glacier cave",
  ]},
  city: { label:"City", icon:"🏙️", pool:[
    "new york times square","london big ben","paris eiffel tower","tokyo street night",
    "dubai skyscrapers","sydney opera house","rome colosseum","barcelona sagrada familia",
    "hong kong harbour night","singapore marina bay","los angeles highway","chicago skyline",
    "miami south beach","las vegas strip night","san francisco golden gate bridge",
    "amsterdam canal houses","berlin gate","istanbul mosque","seoul city night",
    "bangkok grand palace","moscow red square kremlin","beijing great wall",
    "rio de janeiro christ statue","mexico city cathedral","buenos aires street",
    "cairo pyramids giza","cape town table mountain","edinburgh castle",
    "prague charles bridge","venice gondola canal","athens acropolis",
    "lisbon tram street","vienna parliament","budapest chain bridge",
    "stockholm old town","copenhagen nyhavn colourful","new orleans jazz street",
    "kyoto golden temple","marrakech medina market","havana classic cars street",
    "nairobi skyline","shanghai pudong skyline","zurich lake city","florence duomo",
  ]},
  food: { label:"Food", icon:"🍕", pool:[
    "pizza","burger","sushi","tacos","ramen",
    "pasta","fried chicken","hot dog","sandwich","steak",
    "fish and chips","curry","fried rice","noodles","soup",
    "salad","pancakes","waffles","french toast","omelette",
    "ice cream","chocolate cake","cookies","donuts","cheesecake",
    "chips","popcorn","nachos","mac and cheese","grilled cheese",
    "lobster","shrimp","salmon","bbq ribs","pulled pork",
    "croissant","bagel","pretzel","churros","crepes",
    "pho","pad thai","dumplings","spring rolls","biryani",
    "shawarma","falafel","kebab","paella","lasagne",
  ]},
  sports: { label:"Sports", icon:"⚽", pool:[
    "soccer match stadium","basketball game court","boxing ring match","tennis court match",
    "swimming pool race","gymnastics floor routine","cycling race","baseball game",
    "american football game","rugby match","golf course swing","ice hockey rink",
    "volleyball beach","surfing big wave","skiing snow mountain",
    "marathon running race","skateboarding trick","snowboarding halfpipe",
    "rock climbing wall","weightlifting competition","archery competition",
    "rowing boat race","horse racing track","motocross jump",
    "table tennis match","badminton court","wrestling match",
    "sprint track race","high jump athlete","long jump athlete",
    "water polo pool","diving competition","fencing match","triathlon race",
    "bmx bike jump","formula one race car","drag racing","rally car race",
    "cricket match","rugby scrum","lacrosse game","polo horse match",
    "figure skating ice","bobsled track","cross country skiing",
    "kayak river race","sailing boat race","windsurfing ocean","kite surfing",
  ]},
};

// Pick two DIFFERENT random items from a pool for a fresh pair every round
function pickRandomPair(pool) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return { majority: shuffled[0], imposter: shuffled[1] };
}

const WORD_PAIRS = [
  { id:"w1",  majority:"HOT",        imposter:"COLD",       hint:"Think: temperature" },
  { id:"w2",  majority:"DAY",        imposter:"NIGHT",      hint:"Think: time" },
  { id:"w3",  majority:"BEACH",      imposter:"MOUNTAIN",   hint:"Think: vacation" },
  { id:"w4",  majority:"CITY",       imposter:"FOREST",     hint:"Think: place" },
  { id:"w5",  majority:"PIZZA",      imposter:"SUSHI",      hint:"Think: food" },
  { id:"w6",  majority:"COFFEE",     imposter:"TEA",        hint:"Think: drink" },
  { id:"w7",  majority:"HAPPY",      imposter:"SAD",        hint:"Think: feeling" },
  { id:"w8",  majority:"SUMMER",     imposter:"WINTER",     hint:"Think: season" },
  { id:"w9",  majority:"RICH",       imposter:"POOR",       hint:"Think: money" },
  { id:"w10", majority:"FAST",       imposter:"SLOW",       hint:"Think: speed" },
  { id:"w11", majority:"LOUD",       imposter:"QUIET",      hint:"Think: sound" },
  { id:"w12", majority:"OLD",        imposter:"YOUNG",      hint:"Think: age" },
  { id:"w13", majority:"DOG",        imposter:"CAT",        hint:"Think: pet" },
  { id:"w14", majority:"SUN",        imposter:"MOON",       hint:"Think: sky" },
  { id:"w15", majority:"FIRE",       imposter:"WATER",      hint:"Think: element" },
  { id:"w16", majority:"KING",       imposter:"QUEEN",      hint:"Think: royalty" },
  { id:"w17", majority:"WAR",        imposter:"PEACE",      hint:"Think: conflict" },
  { id:"w18", majority:"LOVE",       imposter:"HATE",       hint:"Think: emotion" },
  { id:"w19", majority:"FOOD",       imposter:"DRINK",      hint:"Think: eating" },
  { id:"w20", majority:"SLEEP",      imposter:"AWAKE",      hint:"Think: rest" },
  { id:"w21", majority:"MORNING",    imposter:"EVENING",    hint:"Think: time of day" },
  { id:"w22", majority:"RAIN",       imposter:"SNOW",       hint:"Think: weather" },
  { id:"w23", majority:"MUSIC",      imposter:"SPORT",      hint:"Think: hobby" },
  { id:"w24", majority:"PHONE",      imposter:"LAPTOP",     hint:"Think: device" },
  { id:"w25", majority:"MOVIE",      imposter:"BOOK",       hint:"Think: entertainment" },
  { id:"w26", majority:"DANCING",    imposter:"SINGING",    hint:"Think: performance" },
  { id:"w27", majority:"SCHOOL",     imposter:"WORK",       hint:"Think: daily life" },
  { id:"w28", majority:"RICH",       imposter:"FAMOUS",     hint:"Think: success" },
  { id:"w29", majority:"LAUGH",      imposter:"CRY",        hint:"Think: reaction" },
  { id:"w30", majority:"ALONE",      imposter:"TOGETHER",   hint:"Think: company" },
];

async function fetchPexelsImage(query) {
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape`, { headers: { Authorization: PEXELS_KEY } });
    const data = await res.json();
    const photos = data.photos || [];
    if (!photos.length) return null;
    const picked = photos[Math.floor(Math.random() * Math.min(photos.length, 8))];
    return picked.src.large || picked.src.original;
  } catch { return null; }
}

function makeVideoSrc(v) {
  if (!v) return null;
  return `https://www.youtube.com/embed/${v.id}?autoplay=1&mute=1&start=${v.start}&rel=0&modestbranding=1&controls=1&fs=0&enablejsapi=1&origin=https://impostor-game-self-seven.vercel.app`;
}

const SUPABASE_URL = "https://lvyxbefvvhdaissgrflw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2eXhiZWZ2dmhkYWlzc2dyZmx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NjAwNzMsImV4cCI6MjA4OTUzNjA3M30.yI0k7cqUNfOyA07isu1tJTVL2ECdTNf6_DfRz3NXbiI";
const SB = (path, opts={}) => fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
  headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
  ...opts
});

async function getRoom(code) {
  try {
    const res = await SB(`rooms?code=eq.${code}&select=data`);
    const rows = await res.json();
    return rows?.[0]?.data || null;
  } catch { return null; }
}

async function saveRoom(r) {
  try {
    await SB(`rooms`, {
      method: "POST",
      body: JSON.stringify({ code: r.code, data: r, updated_at: new Date().toISOString() }),
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=representation" }
    });
  } catch(e) { console.error("saveRoom error", e); }
}
function genCode()     { return Math.random().toString(36).substring(2,6).toUpperCase(); }
function genId()       { return Date.now().toString(36)+Math.random().toString(36).substring(2,5); }

async function getMessages(code) {
  try {
    const res = await SB(`messages?room_code=eq.${encodeURIComponent(code)}&order=created_at.asc&limit=100`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

async function sendMessage(code, playerId, name, text) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ room_code: code, player_id: playerId, name, text })
    });
  } catch(e) { console.error(e); }
}

function TimerRing({ seconds, total, size=96 }) {
  const r=38, circ=2*Math.PI*r, pct=Math.max(0,seconds/total);
  const urgent=seconds<=5;
  const color=urgent?"var(--accent)":seconds<=total*0.4?"var(--accent3)":"var(--accent2)";
  return (
    <div className="timer-wrap">
      <div className="timer-ring" style={{width:size,height:size}}>
        <svg width={size} height={size} viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="var(--border)" strokeWidth="4"/>
          <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={circ*(1-pct)}
            style={{transition:"stroke-dashoffset 1s linear,stroke 0.5s"}}/>
        </svg>
        <span className={`timer-num${urgent?" urgent":""}`}>{seconds}</span>
      </div>
      <span className="timer-label">{seconds>0?"seconds remaining":"time's up!"}</span>
    </div>
  );
}

// ── ChatBox — defined outside App so it never loses focus ──
function ChatBox({ messages, playerId, chatMsg, setChatMsg, onSend, chatEndRef }) {
  return (
    <div style={{marginTop:16}}>
      <div style={{height:200,overflowY:"auto",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"12px 12px 0 0",padding:12,display:"flex",flexDirection:"column",gap:8}}>
        {messages.length===0 && <div style={{color:"var(--muted)",fontSize:12,textAlign:"center",marginTop:8}}>No messages yet — say something!</div>}
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.player_id===playerId?"flex-end":"flex-start",gap:2}}>
            <span style={{fontSize:10,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase"}}>{m.player_id===playerId?"you":m.name}</span>
            <span style={{fontSize:13,padding:"7px 12px",borderRadius:10,background:m.player_id===playerId?"rgba(0,229,255,0.12)":"var(--surface)",color:"var(--text)",maxWidth:"85%",lineHeight:1.5,wordBreak:"break-word"}}>{m.text}</span>
          </div>
        ))}
        <div ref={chatEndRef}/>
      </div>
      <div style={{display:"flex",gap:8,padding:8,background:"var(--surface2)",border:"1px solid var(--border)",borderTop:"none",borderRadius:"0 0 12px 12px"}}>
        <input
          style={{flex:1,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 12px",color:"var(--text)",fontFamily:"'DM Sans',sans-serif",fontSize:13,outline:"none"}}
          placeholder="Type a message..."
          value={chatMsg}
          onChange={e=>setChatMsg(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&onSend()}
          maxLength={200}/>
        <button
          style={{background:"var(--accent2)",color:"#000",border:"none",borderRadius:8,padding:"9px 16px",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}
          onClick={onSend}>Send</button>
      </div>
    </div>
  );
}

export default function App() {
  // Core
  const [screen, setScreen]         = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode]     = useState("");
  const [playerId]                  = useState(genId);
  const [room, setRoom]             = useState(null);
  const [isHost, setIsHost]         = useState(false);
  const [amImpostor, setAmImpostor] = useState(false);
  const [myClue, setMyClue]         = useState("");
  const [myVote, setMyVote]         = useState("");
  const [error, setError]           = useState("");
  const [tab, setTab]               = useState("create");

  // Mode & settings
  const [gameMode, setGameMode]     = useState("video"); // video | picture | word
  const [selectedCats, setSelectedCats]               = useState(["sports","music","memes"]);
  const [roundsSetting, setRoundsSetting]             = useState(5);
  const [impostorCount, setImpostorCount]             = useState(1);
  const [blindMode, setBlindMode]                     = useState(false);
  const [hintMode, setHintMode]                       = useState("none"); // hint | none
  const [pictureTimer, setPictureTimer]               = useState("visible"); // visible | hidden
  const [verbalMode, setVerbalMode]                   = useState(false);
  const [videoTimerSetting, setVideoTimerSetting]     = useState(25);
  const [discussTimerSetting, setDiscussTimerSetting] = useState(60);
  const [voteTimerEnabled, setVoteTimerEnabled]       = useState(false);
  const [voteTimerSetting, setVoteTimerSetting]       = useState(30);

  // Custom pairs
  const [customPairs, setCustomPairs] = useState([]);
  const [newMaj, setNewMaj]           = useState("");
  const [newImp, setNewImp]           = useState("");
  const [newLabel, setNewLabel]       = useState("");

  // Runtime
  const [videoTimer, setVideoTimer]       = useState(25);
  const [videoActive, setVideoActive]     = useState(false);
  const [discussTimer, setDiscussTimer]   = useState(60);
  const [discussActive, setDiscussActive] = useState(false);
  const [voteTimer, setVoteTimer]         = useState(60);
  const [voteActive, setVoteActive]       = useState(false);
  const [replayKey, setReplayKey]         = useState(0);
  const [myContent, setMyContent]         = useState(null);
  const [loading, setLoading]             = useState(false);
  const [picHidden, setPicHidden]         = useState(false);
  const [chatMsg, setChatMsg]             = useState("");
  const [messages, setMessages]           = useState([]);
  const chatEndRef                        = useRef(null);
  const pollRef = useRef(null);

  // Poll Supabase every 1.5s for room changes + messages
  useEffect(() => {
    if (!room) return;
    pollRef.current = setInterval(async () => {
      const fresh = await getRoom(room.code);
      if (!fresh) return;

      // Fetch messages if chat enabled
      if (!fresh.verbalMode) {
        const msgs = await getMessages(room.code);
        setMessages(msgs);
      }

      if (JSON.stringify(fresh) !== JSON.stringify(room)) {
        // Handle player leaving — remove disconnected players after 30s
        setRoom(fresh);
        if (fresh.phase !== room.phase) {
          if (fresh.phase === "ended") {
            setRoom(null); setIsHost(false); setScreen("home");
            return;
          }
          setScreen(fresh.phase);
          if (fresh.phase === "watch") {
            const isImp = (fresh.impostors||[]).includes(playerId);
            setAmImpostor(isImp);
            setVideoTimer(fresh.videoTimerSetting||25);
            setVideoActive(true);
            setMyClue(""); setMyVote(""); setReplayKey(0); setPicHidden(false);
            const pair = fresh.pairs?.[fresh.currentPairIndex];
            if (pair) {
              if (fresh.mode === "video") {
                setMyContent({ type:"video", data: isImp ? pair.imposter : pair.majority });
              } else if (fresh.mode === "picture") {
                setMyContent({ type:"picture", url: isImp ? pair.imposterUrl : pair.majorityUrl });
              } else if (fresh.mode === "word") {
                if (fresh.blindMode) {
                  setMyContent({ type:"word", word: isImp ? pair.imposter : pair.majority, blind:true });
                } else {
                  setMyContent({ type:"word", word: isImp ? pair.imposter : pair.majority, isImp, hint: isImp ? (fresh.hintMode==="hint" ? pair.hint : null) : null });
                }
              }
            }
          }
          if (fresh.phase === "discuss") {
            setDiscussTimer(fresh.discussTimerSetting||60);
            setDiscussActive(true);
          }
          if (fresh.phase === "vote" && fresh.voteTimerEnabled) {
            setVoteTimer(fresh.voteTimerSetting||30);
            setVoteActive(true);
          }
        }
      }
    }, 1500);
    return () => clearInterval(pollRef.current);
  }, [room, playerId]);

  // Scroll chat to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendChat() {
    if (!chatMsg.trim() || !room) return;
    const text = chatMsg.trim().slice(0, 200);
    setChatMsg("");
    await sendMessage(room.code, playerId, playerName, text);
  }

  useEffect(() => {
    if (!videoActive||videoTimer<=0) { setVideoActive(false); return; }
    const t = setTimeout(()=>setVideoTimer(v=>v-1),1000);
    return ()=>clearTimeout(t);
  }, [videoTimer, videoActive]);

  useEffect(() => {
    if (!discussActive || discussTimer <= 0) {
      setDiscussActive(false);
      if (discussTimer <= 0 && screen === "discuss") {
        (async () => {
          const r = await getRoom(room?.code);
          if (r && r.phase === "discuss") {
            r.phase = "vote"; await saveRoom(r); setRoom(r); setScreen("vote");
            if (r.voteTimerEnabled) {
              setVoteTimer(r.voteTimerSetting || 30);
              setVoteActive(true);
            }
          }
        })();
      }
      return;
    }
    const t = setTimeout(() => setDiscussTimer(d => d - 1), 1000);
    return () => clearTimeout(t);
  }, [discussTimer, discussActive]);

  useEffect(() => {
    if (!voteActive || voteTimer <= 0) {
      setVoteActive(false);
      // Auto-advance when vote timer ends — anyone who hasn't voted gets skipped
      if (voteTimer <= 0 && screen === "vote" && !room?.votes?.[playerId]) {
        (async () => {
          const r = await getRoom(room?.code);
          if (r && r.phase === "vote") {
            // Mark this player as abstained with a special value
            r.votes[playerId] = "abstain";
            // Check if all players have now voted or abstained
            const allDone = r.players.every(p => r.votes[p.id]);
            if (allDone) r.phase = "result";
            await saveRoom(r); setRoom(r);
            if (r.phase === "result") setScreen("result");
          }
        })();
      }
      return;
    }
    const t = setTimeout(() => setVoteTimer(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [voteTimer, voteActive]);

  function getFilteredPairs(mode) {
    let builtin = [];
    if (mode === "video") {
      builtin = VIDEO_PAIRS.filter(p => selectedCats.includes(p.category));
    } else if (mode === "picture") {
      // Each selected category contributes multiple random pairs from its pool
      selectedCats.forEach(cat => {
        if (PICTURE_CATEGORIES[cat]) {
          const pool = PICTURE_CATEGORIES[cat].pool;
          // Generate up to roundsSetting pairs from this category's pool
          const usedIndices = new Set();
          for (let i = 0; i < Math.min(roundsSetting, Math.floor(pool.length / 2)); i++) {
            // Pick two unused items
            const available = pool.map((_, idx) => idx).filter(idx => !usedIndices.has(idx));
            if (available.length < 2) break;
            const shuffled = available.sort(() => Math.random() - 0.5);
            const aIdx = shuffled[0], bIdx = shuffled[1];
            usedIndices.add(aIdx); usedIndices.add(bIdx);
            builtin.push({
              id: `pic_${cat}_${i}_${Date.now()}`,
              category: cat,
              label: `${PICTURE_CATEGORIES[cat].label}`,
              majorityQuery: pool[aIdx],
              imposterQuery: pool[bIdx],
            });
          }
        }
      });
    } else if (mode === "word") {
      builtin = WORD_PAIRS;
    }
    const custom = customPairs.map((p,i) => ({ id:`custom_${i}`, category:"custom", label:p.label||"Custom", ...p }));
    return [...builtin, ...custom].sort(() => Math.random() - 0.5);
  }

  function randomizeAssignment(pairs) {
    // For each pair, randomly decide which item is majority and which is impostor
    return pairs.map(p => {
      if (Math.random() < 0.5) {
        return { ...p, majority: p.imposter, imposter: p.majority,
          majorityUrl: p.imposterUrl, imposterUrl: p.majorityUrl,
          majorityQuery: p.imposterQuery, imposterQuery: p.majorityQuery };
      }
      return p;
    });
  }

  async function buildPairs(mode, count) {
    const all = getFilteredPairs(mode);
    const picked = all.slice(0, count);
    let result;
    if (mode === "picture") {
      const fetched = await Promise.all(picked.map(async p => {
        const [majUrl, impUrl] = await Promise.all([
          fetchPexelsImage(p.majorityQuery || p.majority),
          fetchPexelsImage(p.imposterQuery || p.imposter),
        ]);
        return { ...p, majorityUrl: majUrl || "", imposterUrl: impUrl || "" };
      }));
      result = fetched.filter(p => p.majorityUrl && p.imposterUrl);
    } else {
      result = picked;
    }
    return randomizeAssignment(result);
  }

  async function handleCreate() {
    if (!playerName.trim()) { setError("Enter your name!"); return; }
    if (playerName.trim().length > 12) { setError("Name must be 12 characters or less!"); return; }
    if (selectedCats.length<1 && customPairs.length<1) { setError("Pick at least one category or add custom pairs!"); return; }
    setLoading(true); setError("");
    const pairs = await buildPairs(gameMode, roundsSetting);
    if (pairs.length < 1) { setError("Couldn't build enough pairs — add more categories or custom content!"); setLoading(false); return; }
    const code = genCode();
    const r = {
      code, host:playerName.trim(), mode:gameMode,
      players:[{name:playerName.trim(),id:playerId,isHost:true}],
      phase:"lobby", pairs, currentPairIndex:0,
      impostors:[], clues:{}, votes:{}, round:1, totalRounds:pairs.length,
      impostorCount, blindMode, hintMode, verbalMode,
      voteTimerEnabled, voteTimerSetting,
      videoTimerSetting, discussTimerSetting,
      pictureTimer,
    };
    await saveRoom(r);
    setRoom(r); setIsHost(true); setRoomCode(code); setLoading(false); setScreen("lobby");
  }

  async function handleJoin() {
    if (!playerName.trim()) { setError("Enter your name!"); return; }
    if (playerName.trim().length > 12) { setError("Name must be 12 characters or less!"); return; }
    if (!roomCode.trim())   { setError("Enter a room code!"); return; }
    const r = await getRoom(roomCode.toUpperCase());
    if (!r)                  { setError("Room not found!"); return; }
    if (r.phase!=="lobby")   { setError("Game already started!"); return; }
    if (!r.players.find(p=>p.id===playerId)) {
      r.players.push({name:playerName.trim(),id:playerId,isHost:false});
      await saveRoom(r);
    }
    setRoom(r); setIsHost(false); setScreen("lobby"); setError("");
  }

  async function handleStart() {
    const r = await getRoom(room.code);
    if (r.players.length<2) { setError("Need at least 2 players!"); return; }
    const count = Math.min(r.impostorCount||1, Math.floor(r.players.length/2));
    // Fisher-Yates shuffle — true randomness, no bias
    const arr = [...r.players];
    for (let i=arr.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
    const impostors = arr.slice(0,count).map(p=>p.id);
    // Independently shuffle turn order
    const tArr = [...r.players];
    for (let i=tArr.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [tArr[i],tArr[j]]=[tArr[j],tArr[i]]; }
    const turnOrder = tArr.map(p=>p.id);
    r.impostors = impostors;
    r.turnOrder = turnOrder;
    r.phase = "watch"; r.clues={}; r.votes={};
    await saveRoom(r);

    const isImp = impostors.includes(playerId);
    setAmImpostor(isImp);
    const pair = r.pairs?.[r.currentPairIndex];
    if (pair) {
      if (r.mode==="video") {
        setMyContent({type:"video", data: isImp?pair.imposter:pair.majority});
      } else if (r.mode==="picture") {
        setMyContent({type:"picture", url: isImp?pair.imposterUrl:pair.majorityUrl});
      } else if (r.mode==="word") {
        setMyContent({type:"word", word: isImp?pair.imposter:pair.majority, isImp, blind:r.blindMode, hint: isImp?(r.hintMode==="hint"?pair.hint:null):null});
      }
    }

    setRoom(r);
    setVideoTimer(r.videoTimerSetting||25); setVideoActive(true);
    setMyClue(""); setMyVote(""); setReplayKey(0); setPicHidden(false);
    setScreen("watch"); setError("");
  }

  async function handleSubmitClue() {
    if (!myClue.trim())       { setError("Enter a word!"); return; }
    if (myClue.includes(" ")) { setError("One word only!"); return; }
    const r = await getRoom(room.code);
    r.clues[playerId] = {word:myClue.trim().toUpperCase(),name:playerName};
    if (Object.keys(r.clues).length>=r.players.length) r.phase="discuss";
    await saveRoom(r); setRoom(r);
    if (r.phase==="discuss") {
      setDiscussTimer(r.discussTimerSetting||60); setDiscussActive(true); setScreen("discuss");
    }
    setError("");
  }

  async function handleGoToVote() {
    const r = await getRoom(room.code);
    r.phase = "vote";
    await saveRoom(r); setRoom(r); setScreen("vote");
  }

  async function handleVote(targetId) {
    if (room?.votes?.[playerId]) return;
    setMyVote(prev=>prev===targetId?"":targetId);
    setError("");
  }

  async function handleConfirmVote() {
    if (!myVote) { setError("Select a player first!"); return; }
    const r = await getRoom(room.code);
    r.votes[playerId] = myVote;
    if (Object.keys(r.votes).length>=r.players.length) r.phase="result";
    await saveRoom(r); setRoom(r);
    if (r.phase==="result") setScreen("result");
    setError("");
  }

  async function handleLeaveGame() {
    if (isHost && room) {
      const r = await getRoom(room.code);
      if (r) { r.phase = "ended"; await saveRoom(r); }
    } else if (room) {
      // Non-host leaving — remove from players list
      const r = await getRoom(room.code);
      if (r) {
        r.players = r.players.filter(p => p.id !== playerId);
        if (r.players.length === 0) { r.phase = "ended"; }
        await saveRoom(r);
      }
    }
    setScreen("home"); setRoom(null); setIsHost(false);
  }

  async function handlePlayAgain() {
    if (!isHost) return;
    setScreen("setup");
  }

  async function handleNextRound() {
    if (!isHost) return;
    const r = await getRoom(room.code);
    const next = r.currentPairIndex+1;
    if (next>=r.pairs.length) { setScreen("setup"); return; }
    r.phase="lobby"; r.clues={}; r.votes={}; r.impostors=[];
    r.currentPairIndex=next; r.round=(r.round||1)+1;
    await saveRoom(r); setRoom(r); setMyClue(""); setMyVote(""); setScreen("lobby");
  }

  async function handleApplySetup() {
    if (!isHost) return;
    setLoading(true); setError("");
    const pairs = await buildPairs(gameMode, roundsSetting);
    if (pairs.length<1) { setError("Couldn't build pairs — add more categories!"); setLoading(false); return; }
    const r = await getRoom(room.code);
    r.mode=gameMode; r.pairs=pairs; r.currentPairIndex=0; r.round=1;
    r.phase="lobby"; r.clues={}; r.votes={}; r.impostors=[];
    r.totalRounds=pairs.length;
    r.impostorCount=impostorCount; r.blindMode=blindMode; r.hintMode=hintMode; r.verbalMode=verbalMode;
    r.voteTimerEnabled=voteTimerEnabled; r.voteTimerSetting=voteTimerSetting;
    r.videoTimerSetting=videoTimerSetting; r.discussTimerSetting=discussTimerSetting;
    r.pictureTimer=pictureTimer;
    await saveRoom(r); setRoom(r); setMyClue(""); setMyVote("");
    setLoading(false); setScreen("lobby");
  }

  function addCustomPair() {
    if (!newMaj.trim()||!newImp.trim()) { setError("Fill in both fields!"); return; }
    setCustomPairs(prev=>[...prev,{majority:newMaj.trim(),imposter:newImp.trim(),label:newLabel.trim()||"Custom",hint:""}]);
    setNewMaj(""); setNewImp(""); setNewLabel(""); setError("");
  }

  const cluesIn  = Object.keys(room?.clues||{}).length;
  const votesIn  = Object.keys(room?.votes||{}).length;
  const total    = room?.players?.length||1;

  function getVoteTallies() {
    const t={}; room?.players?.forEach(p=>{t[p.id]=0;});
    Object.values(room?.votes||{}).forEach(id=>{
      if (id !== "abstain" && t[id]!==undefined) t[id]++;
    });
    return t;
  }

  const tallies         = getVoteTallies();
  const sortedVotes     = Object.entries(tallies).sort((a,b)=>b[1]-a[1]);
  const topVotes        = sortedVotes[0]?.[1] || 0;
  const topVoters       = sortedVotes.filter(([,v])=>v===topVotes).map(([id])=>id);
  const isDraw          = topVoters.length > 1 && topVotes > 0;
  const mostVoted       = isDraw ? null : topVoters[0];
  const impostorIds     = room?.impostors||[];
  const impostorPlayers = room?.players?.filter(p=>impostorIds.includes(p.id))||[];
  const impostorCaught  = !isDraw && impostorIds.includes(mostVoted);
  const currentPair     = room?.pairs?.[room?.currentPairIndex];
  const isLastRound     = (room?.currentPairIndex+1)>=room?.pairs?.length;
  const modeIcon        = room?.mode==="video"?"🎬":room?.mode==="picture"?"🖼️":"💬";

  // ── Settings form (shared between create and setup screens) ──
  function SettingsForm({ isSetup=false }) {
    return <>
      <div className="field">
        <label className="label">Game Mode</label>
        <div className="mode-grid">
          {[
            {key:"video",  icon:"🎬", label:"Video",   desc:"Short clips"},
            {key:"picture",icon:"🖼️", label:"Picture",  desc:"Images from Pexels"},
            {key:"word",   icon:"💬", label:"Word",     desc:"Pure bluffing"},
          ].map(m=>(
            <button key={m.key} className={`mode-btn${gameMode===m.key?" selected":""}`} onClick={()=>setGameMode(m.key)}>
              <span className="mode-icon">{m.icon}</span>
              {m.label}
              <div className="mode-desc">{m.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {gameMode!=="word" && (
        <div className="field">
          <label className="label">Categories</label>
          <div className="category-grid">
            {Object.entries(gameMode==="picture"?PICTURE_CATEGORIES:{sports:{label:"Sports",icon:"🏆"},music:{label:"Music",icon:"🎵"},memes:{label:"Memes",icon:"😂"},tv:{label:"TV & Film",icon:"🎬"},news:{label:"Events",icon:"🌍"}}).map(([key,cat])=>(
              <button key={key} className={`cat-btn${selectedCats.includes(key)?" selected":""}`}
                onClick={()=>setSelectedCats(prev=>prev.includes(key)?prev.filter(c=>c!==key):[...prev,key])}>
                <span className="cat-icon">{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="field">
        <label className="label">Custom Pairs {gameMode==="video"?"(YouTube IDs)":gameMode==="picture"?"(Image URLs)":"(Words)"}</label>
        <div style={{fontSize:12,color:"var(--muted)",marginBottom:10,lineHeight:1.5}}>
          Just add two {gameMode==="word"?"words":gameMode==="picture"?"image URLs":"YouTube video IDs"} per pair — the game randomly decides who gets which one. You won't know which is the impostor!
        </div>
        <div className="add-pair-form">
          <div style={{marginBottom:8}}>
            <input className="input-sm" style={{width:"100%",marginBottom:8}}
              placeholder={gameMode==="word"?"First word (e.g. BEACH)":gameMode==="picture"?"First image URL":"First YouTube video ID"}
              value={newMaj} onChange={e=>setNewMaj(e.target.value)}/>
            <input className="input-sm" style={{width:"100%",marginBottom:8}}
              placeholder={gameMode==="word"?"Second word (e.g. DESERT)":gameMode==="picture"?"Second image URL":"Second YouTube video ID"}
              value={newImp} onChange={e=>setNewImp(e.target.value)}/>
            <div className="input-row">
              <input className="input-sm" placeholder="Label (optional, e.g. Round 1)" value={newLabel} onChange={e=>setNewLabel(e.target.value)}/>
              <button className="btn-add" onClick={addCustomPair}>+ Add</button>
            </div>
          </div>
          {customPairs.length===0 && <div style={{fontSize:12,color:"var(--muted)"}}>No custom pairs yet</div>}
          {customPairs.map((p,i)=>(
            <div className="custom-pair" key={i}>
              <div className="custom-pair-labels">
                <div style={{fontSize:13,color:"var(--text)",fontWeight:600}}>{p.label||`Pair ${i+1}`}</div>
                <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>{p.majority} · {p.imposter}</div>
              </div>
              <button className="btn-remove" onClick={()=>setCustomPairs(prev=>prev.filter((_,j)=>j!==i))}>✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="field">
        <label className="label">Clue Mode</label>
        <div className="hint-grid">
          {[
            { key:false, icon:"⌨️", label:"Type your clue", desc:"Everyone types one word — great for online play or when you want clues hidden until everyone submits" },
            { key:true,  icon:"🗣️", label:"Say it out loud", desc:"Everyone says their clue word verbally — best for in-person games, no phones needed for clues" },
          ].map(v=>(
            <button key={String(v.key)} className={`hint-btn${verbalMode===v.key?" selected":""}`} onClick={()=>setVerbalMode(v.key)}>
              <span style={{fontSize:20}}>{v.icon}</span>
              <div>{v.label}<div className="hint-desc">{v.desc}</div></div>
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label className="label">Impostor Hint</label>
        <div className="hint-grid">
          {[
            {key:"hint", icon:"💡", label:"Give impostor a hint", desc:"Impostor gets a clue word to help them bluff"},
            {key:"none", icon:"🎭", label:"No hint", desc:"Impostor knows they're the impostor but gets no clue"},
          ].map(h=>(
            <button key={h.key} className={`hint-btn${hintMode===h.key?" selected":""}`} onClick={()=>setHintMode(h.key)}>
              <span style={{fontSize:20}}>{h.icon}</span>
              <div>
                {h.label}
                <div className="hint-desc">{h.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label className="label">Blind Mode</label>
        <button className={`btn ${blindMode?"btn-primary":"btn-secondary"}`} onClick={()=>setBlindMode(b=>!b)} style={{marginBottom:6}}>
          {blindMode?"🎲 Blind Mode ON — nobody knows if they're the impostor":"👁 Normal Mode — impostor knows who they are"}
        </button>
      </div>

      {gameMode==="picture" && (
        <div className="field">
          <label className="label">Picture Visibility</label>
          <div className="hint-grid">
            {[
              {key:"visible", icon:"👁", label:"Always visible", desc:"Image stays on screen the whole round"},
              {key:"hidden",  icon:"⏱", label:"Hidden after timer", desc:"Image disappears when timer ends"},
            ].map(v=>(
              <button key={v.key} className={`hint-btn${pictureTimer===v.key?" selected":""}`} onClick={()=>setPictureTimer(v.key)}>
                <span style={{fontSize:20}}>{v.icon}</span>
                <div>{v.label}<div className="hint-desc">{v.desc}</div></div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="range-wrap">
        <label className="label">Number of Impostors</label>
        <div className="range-row">
          <input type="range" min="1" max="3" step="1" value={impostorCount} onChange={e=>setImpostorCount(Number(e.target.value))}/>
          <span className="range-val">{impostorCount}</span>
        </div>
      </div>

      <div className="range-wrap">
        <label className="label">Number of Rounds</label>
        <div className="range-row">
          <input type="range" min="1" max="10" step="1" value={roundsSetting} onChange={e=>setRoundsSetting(Number(e.target.value))}/>
          <span className="range-val">{roundsSetting}</span>
        </div>
      </div>

      {gameMode!=="word" && (
        <div className="range-wrap">
          <label className="label">{gameMode==="picture"?"Picture Timer":"Video Watch Time"}</label>
          <div className="range-row">
            <input type="range" min="10" max="30" step="5" value={videoTimerSetting} onChange={e=>setVideoTimerSetting(Number(e.target.value))}/>
            <span className="range-val">{videoTimerSetting}s</span>
          </div>
        </div>
      )}

      <div className="range-wrap">
        <label className="label">Discussion Time</label>
        <div className="range-row">
          <input type="range" min="30" max="120" step="15" value={discussTimerSetting} onChange={e=>setDiscussTimerSetting(Number(e.target.value))}/>
          <span className="range-val">{discussTimerSetting}s</span>
        </div>
      </div>

      <div className="field">
        <label className="label">Vote Timer</label>
        <button className={`btn ${voteTimerEnabled?"btn-primary":"btn-secondary"}`}
          onClick={()=>setVoteTimerEnabled(v=>!v)} style={{marginBottom:10}}>
          {voteTimerEnabled?"⏱ Vote Timer ON":"⏱ Vote Timer OFF — players vote at their own pace"}
        </button>
        {voteTimerEnabled && (
          <div className="range-row">
            <input type="range" min="15" max="60" step="15" value={voteTimerSetting} onChange={e=>setVoteTimerSetting(Number(e.target.value))}/>
            <span className="range-val">{voteTimerSetting}s</span>
          </div>
        )}
      </div>
    </>;
  }

  // ── Chat Box ──
  // ── Content display for watch screen ──
  function ContentDisplay() {
    if (!myContent) return <div style={{textAlign:"center",padding:32,color:"var(--muted)"}}>Loading...</div>;

    if (myContent.type==="video") {
      const src = makeVideoSrc(myContent.data);
      return (
        <div className="video-wrapper">
          <iframe key={replayKey} src={src} allow="autoplay; fullscreen" allowFullScreen/>
          <div className="video-overlay"/>
        </div>
      );
    }

    if (myContent.type==="picture") {
      const showPic = pictureTimer==="visible" || !picHidden;
      return (
        <div className="picture-wrapper">
          {showPic
            ? <img src={myContent.url} alt="Round image" onError={e=>{e.target.style.display="none";}}/>
            : <div className="picture-hidden"><span style={{fontSize:48}}>🙈</span><span>Image hidden — submit your clue!</span></div>
          }
        </div>
      );
    }

    if (myContent.type==="word") {
      if (myContent.blind) {
        return (
          <div className="word-display">
            <div className="word-big">{myContent.word}</div>
            <div className="word-sub">Your word — you don't know if you're the impostor</div>
          </div>
        );
      }
      if (myContent.isImp) {
        return (
          <div className="word-display">
            <div style={{marginBottom:16}}>
              <div className="word-blind">???</div>
              <div className="word-sub" style={{marginTop:8}}>You are the impostor — you don't know their word</div>
            </div>
            {myContent.hint && (
              <div className="alert alert-warning" style={{display:"inline-block",marginTop:8}}>
                💡 Hint: {myContent.hint}
              </div>
            )}
          </div>
        );
      }
      return (
        <div className="word-display">
          <div className="word-big">{myContent.word}</div>
          <div className="word-sub">Your word — give a one-word clue without being too obvious!</div>
        </div>
      );
    }
    return null;
  }

  if (loading) return (
    <div className="app"><style>{STYLES}</style>
      <div className="container">
        <div className="logo">IMPOSTOR</div>
        <div className="card" style={{textAlign:"center",padding:48}}>
          <div className="spinner" style={{margin:"0 auto 16px"}}/>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:3,color:"var(--muted)"}}>
            {gameMode==="picture"?"Fetching images from Pexels...":"Building rounds..."}
          </div>
        </div>
      </div>
    </div>
  );

  // ══════ SCREENS ══════

  if (screen==="home") return (
    <div className="app"><style>{STYLES}</style>
      <div className="container">
        <div className="logo">IMPOSTOR</div>
        <div className="tagline">The Pop Culture Bluffing Game</div>

        <div className="card">
          <div className="instructions-step"><div className="step-num">1</div><div className="step-text"><strong>Everyone gets the same video, picture or word</strong> — except one player who secretly gets a different one.</div></div>
          <div className="instructions-step"><div className="step-num">2</div><div className="step-text"><strong>Submit one word clue</strong> about what you got. The impostor must bluff without giving themselves away!</div></div>
          <div className="instructions-step"><div className="step-num">3</div><div className="step-text"><strong>Discuss, then vote</strong> — who do you think is the impostor?</div></div>
        </div>

        <div className="tabs">
          <button className={`tab${tab==="create"?" active":""}`} onClick={()=>setTab("create")}>Create Game</button>
          <button className={`tab${tab==="join"?" active":""}`} onClick={()=>setTab("join")}>Join Game</button>
        </div>

        {tab==="create" && (
          <div className="card">
            <div className="card-title">New Game</div>
            <div className="field">
              <label className="label">Your Name</label>
              <input className="input" placeholder="Enter your name..." value={playerName} onChange={e=>setPlayerName(e.target.value.slice(0,12))} maxLength={12}/>
            </div>
            <SettingsForm/>
            {error && <div className="alert alert-warning">{error}</div>}
            <button className="btn btn-primary" onClick={handleCreate}>Create Room →</button>
          </div>
        )}

        {tab==="join" && (
          <div className="card">
            <div className="card-title">Join Game</div>
            <div className="field">
              <label className="label">Your Name</label>
              <input className="input" placeholder="Enter your name..." value={playerName} onChange={e=>setPlayerName(e.target.value.slice(0,12))} maxLength={12}/>
            </div>
            <div className="field">
              <label className="label">Room Code</label>
              <input className="input" placeholder="e.g. FROG" value={roomCode} onChange={e=>setRoomCode(e.target.value.toUpperCase())} maxLength={4} style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,letterSpacing:8,textAlign:"center"}}/>
            </div>
            {error && <div className="alert alert-warning">{error}</div>}
            <button className="btn btn-primary" onClick={handleJoin}>Join Room →</button>
          </div>
        )}
      </div>
    </div>
  );

  if (screen==="setup") return (
    <div className="app"><style>{STYLES}</style>
      <div className="container">
        <div className="logo">IMPOSTOR</div>
        <div className="tagline">Change Settings</div>
        <div className="card">
          <div className="card-title">Game Settings</div>
          <SettingsForm isSetup/>
          {error && <div className="alert alert-warning">{error}</div>}
          <button className="btn btn-primary" onClick={handleApplySetup}>Apply & Back to Lobby →</button>
          <button className="btn btn-ghost" style={{marginTop:8,width:"100%",textAlign:"center"}} onClick={()=>setScreen("lobby")}>← Cancel</button>
        </div>
      </div>
    </div>
  );

  if (screen==="lobby") return (
    <div className="app"><style>{STYLES}</style>
      <div className="container">
        <div className="logo">IMPOSTOR</div>
        <div className="tagline">Waiting for players</div>
        <div className="card">
          <div className="card-title">Room Code</div>
          <div className="room-code">{room?.code}</div>
          <div className="alert alert-info">Share this code — everyone opens this app and types it in to join!</div>
        </div>
        <div className="card">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
            <div className="card-title" style={{marginBottom:0}}>Players ({room?.players?.length||0})</div>
            <span style={{fontSize:24}}>{modeIcon}</span>
          </div>
          <div className="player-list">
            {room?.players?.map(p=>(
              <div className="player-item" key={p.id}>
                <div className={`player-dot ${p.isHost?"dot-yellow":"dot-green"} dot-pulse`}/>
                {p.name}
                {p.isHost && <span className="badge badge-host">Host</span>}
                {p.id===playerId && <span className="badge badge-you">You</span>}
              </div>
            ))}
          </div>
          <div className="info-row">
            <div className="info-pill"><div className="pill-val">{room?.round||1}/{room?.totalRounds||"?"}</div><div className="pill-label">Round</div></div>
            <div className="info-pill"><div className="pill-val">{room?.impostorCount||1}</div><div className="pill-label">Impostors</div></div>
            <div className="info-pill"><div className="pill-val">{room?.verbalMode?"🗣️":"⌨️"}</div><div className="pill-label">{room?.verbalMode?"Verbal":"Typed"}</div></div>
          </div>
          {room?.blindMode && <div className="alert alert-warning" style={{marginBottom:12}}>🎲 Blind Mode is ON — nobody knows who's the impostor!</div>}
          {error && <div className="alert alert-warning">{error}</div>}
          {isHost
            ? <>
                <button className="btn btn-primary" onClick={handleStart}>▶ Start Round {room?.round||1}</button>
                <button className="btn btn-ghost" style={{marginTop:8,width:"100%",textAlign:"center"}} onClick={()=>setScreen("setup")}>⚙ Change Settings</button>
              </>
            : <div className="alert alert-info" style={{textAlign:"center",marginBottom:0}}>Waiting for host to start...</div>
          }
        </div>
        {!room?.verbalMode && (
          <div className="card">
            <div className="card-title">Lobby Chat</div>
            <ChatBox messages={messages} playerId={playerId} chatMsg={chatMsg} setChatMsg={setChatMsg} onSend={handleSendChat} chatEndRef={chatEndRef}/>
          </div>
        )}
      </div>
    </div>
  );

  if (screen==="watch") {
    const done = videoTimer<=0;
    const showClueHint = myContent?.type==="word" && myContent?.isImp && myContent?.hint;
    return (
      <div className="app"><style>{STYLES}</style>
        <div className="container">
          <div className="logo">IMPOSTOR</div>

          {room?.blindMode
            ? <div className="alert alert-warning">🎲 Blind Mode — nobody knows who's the impostor!</div>
            : amImpostor
              ? <div className="alert alert-danger">🎭 You are the IMPOSTOR — {room?.mode==="word"?"you don't know their word":"your content is different"}. Bluff carefully!</div>
              : <div className="alert alert-info">👀 {impostorIds.length} player{impostorIds.length>1?"s have":" has"} different content — figure out who!</div>
          }

          <div className="card">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <div className="video-label"><div className="dot-live"/>Round {room?.round} {modeIcon}</div>
              {room?.mode!=="word" && <TimerRing seconds={videoTimer} total={room?.videoTimerSetting||25} size={72}/>}
            </div>

            <ContentDisplay/>

            {room?.mode==="picture" && room?.pictureTimer==="hidden" && !picHidden && done && (
              <div className="alert alert-warning" style={{marginTop:8}}>Timer ended — image is now hidden!</div>
            )}

            {room?.mode!=="word" && (
              <button className="btn btn-secondary" style={{marginTop:12}} onClick={()=>{
                setReplayKey(k=>k+1);
                setVideoTimer(room?.videoTimerSetting||25);
                setVideoActive(true);
                if (room?.pictureTimer==="hidden") setPicHidden(false);
              }}>↺ Replay</button>
            )}

            <div className="alert alert-warning" style={{marginTop:12,marginBottom:0}}>
              🔇 {room?.mode==="word"?"Don't show your screen to others!":"Watch privately — don't show your screen!"}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Your Clue</div>
            {room?.verbalMode ? (
              <>
                <div className="alert alert-info" style={{marginBottom:16}}>
                  🗣️ <strong>Verbal Mode</strong> — say your clue word out loud in the order below. One word each, no explaining!
                </div>

                <div className="field">
                  <label className="label">🎲 Speaking Order</label>
                  <div className="player-list" style={{margin:0}}>
                    {(room?.turnOrder||room?.players?.map(p=>p.id))?.map((id, i)=>{
                      const p = room?.players?.find(pl=>pl.id===id);
                      if (!p) return null;
                      return (
                        <div className="player-item" key={id} style={{padding:"10px 14px"}}>
                          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--accent2)",minWidth:24}}>{i+1}</span>
                          <div className="player-dot dot-green"/>
                          {p.name}{p.id===playerId?" (you)":""}
                          {i===0 && <span className="badge badge-host" style={{marginLeft:"auto"}}>Goes first</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {isHost && (
                  <button className="btn btn-primary" onClick={handleGoToVote}>
                    Everyone's said their word → Vote Now
                  </button>
                )}
                {!isHost && (
                  <div className="alert alert-warning" style={{marginBottom:0}}>Waiting for host to move to voting...</div>
                )}
              </>
            ) : (
              <>
                <div className="clue-early">💡 Submit your clue whenever you're ready!</div>
                <div className="player-list" style={{margin:"0 0 16px"}}>
                  {room?.players?.map(p=>{
                    const submitted=!!room?.clues?.[p.id];
                    return (
                      <div className="player-item" key={p.id} style={{padding:"10px 14px"}}>
                        <div className={`player-dot ${submitted?"dot-green":"dot-red"}`}/>
                        {p.name}{p.id===playerId?" (you)":""}
                        <span style={{marginLeft:"auto",fontSize:18}}>{submitted?"✅":"⏳"}</span>
                      </div>
                    );
                  })}
                </div>
                {room?.clues?.[playerId]
                  ? <div className="alert alert-success">Clue locked: <strong>{room.clues[playerId].word}</strong> — waiting for others...</div>
                  : <>
                      {amImpostor && !room?.blindMode && !showClueHint && (
                        <div className="alert alert-danger" style={{marginBottom:12}}>Pick a word that sounds plausible but isn't too specific!</div>
                      )}
                      {showClueHint && <div className="alert alert-warning" style={{marginBottom:12}}>💡 Hint: {myContent?.hint}</div>}
                      {room?.blindMode && <div className="alert alert-warning" style={{marginBottom:12}}>🎲 Give an honest clue — you might not even be the impostor!</div>}
                      <div className="field">
                        <input className="input" placeholder="ONE WORD..." value={myClue}
                          onChange={e=>setMyClue(e.target.value.replace(/\s/g,""))}
                          onKeyDown={e=>e.key==="Enter"&&handleSubmitClue()}
                          style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:26,letterSpacing:4,textTransform:"uppercase",textAlign:"center"}}/>
                      </div>
                      {error && <div className="alert alert-warning">{error}</div>}
                      <button className="btn btn-primary" onClick={handleSubmitClue}>Lock In Clue →</button>
                    </>
                }
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen==="discuss") return (
    <div className="app"><style>{STYLES}</style>
      <div className="container">
        <div className="logo">IMPOSTOR</div>
        <div className="tagline">Discussion Phase</div>
        <div className="card">
          <div className="card-title">All Clues</div>
          {room?.verbalMode ? (
            <>
              <div className="alert alert-info" style={{marginBottom:12}}>🗣️ Verbal mode — clues were said out loud. Speaking order was:</div>
              <div className="player-list" style={{margin:"0 0 8px"}}>
                {(room?.turnOrder||room?.players?.map(p=>p.id))?.map((id,i)=>{
                  const p = room?.players?.find(pl=>pl.id===id);
                  if (!p) return null;
                  return (
                    <div className="player-item" key={id} style={{padding:"10px 14px"}}>
                      <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--accent2)",minWidth:24}}>{i+1}</span>
                      <div className="player-dot dot-green"/>
                      {p.name}{p.id===playerId?" (you)":""}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="clue-grid">
              {room?.players?.map(p=>(
                <div className="clue-card" key={p.id}>
                  <div className="name">{p.name}{p.id===playerId?" (you)":""}</div>
                  <div className="word">{room.clues?.[p.id]?.word||"..."}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <div className="card-title">Time to Discuss</div>
          <TimerRing seconds={discussTimer} total={room?.discussTimerSetting||60}/>
          <div className="alert alert-info" style={{marginBottom:16}}>Look at everyone's clues — who gave a suspicious word? Talk it out before voting!</div>
          {(discussTimer<=0||isHost) && (
            <button className="btn btn-primary" onClick={async()=>{
              const r = await getRoom(room.code); r.phase="vote"; await saveRoom(r); setRoom(r); setScreen("vote");
            }}>{isHost?"End Discussion → Vote":"Go to Vote →"}</button>
          )}
          {!isHost && discussTimer>0 && <div className="alert alert-warning" style={{marginBottom:0}}>Waiting for host to move to voting...</div>}
        </div>
        {!room?.verbalMode && (
          <div className="card">
            <div className="card-title">Discussion Chat</div>
            <ChatBox messages={messages} playerId={playerId} chatMsg={chatMsg} setChatMsg={setChatMsg} onSend={handleSendChat} chatEndRef={chatEndRef}/>
          </div>
        )}
      </div>
    </div>
  );

  if (screen==="vote") return (
    <div className="app"><style>{STYLES}</style>
      <div className="container">
        <div className="logo">IMPOSTOR</div>
        <div className="card">
          <div className="card-title">{room?.verbalMode?"Speaking Order":"All Clues"}</div>
          {room?.verbalMode ? (
            <div className="player-list" style={{margin:0}}>
              {(room?.turnOrder||room?.players?.map(p=>p.id))?.map((id,i)=>{
                const p = room?.players?.find(pl=>pl.id===id);
                if (!p) return null;
                return (
                  <div className="player-item" key={id} style={{padding:"10px 14px"}}>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--accent2)",minWidth:24}}>{i+1}</span>
                    <div className="player-dot dot-green"/>
                    {p.name}{p.id===playerId?" (you)":""}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="clue-grid">
              {room?.players?.map(p=>(
                <div className="clue-card" key={p.id}>
                  <div className="name">{p.name}{p.id===playerId?" (you)":""}</div>
                  <div className="word">{room.clues?.[p.id]?.word||"..."}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
            <div className="status-row" style={{marginBottom:0,flex:1}}>
              <span>Votes cast</span>
              <span style={{color:"var(--accent2)"}}>{votesIn}/{total}</span>
            </div>
            {room?.voteTimerEnabled && <TimerRing seconds={voteTimer} total={room?.voteTimerSetting||30} size={64}/>}
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width:`${(votesIn/total)*100}%`}}/></div>
          <div className="player-list" style={{margin:"0 0 16px"}}>
            {room?.players?.map(p=>(
              <div className="player-item" key={p.id} style={{padding:"10px 14px"}}>
                <div className={`player-dot ${room?.votes?.[p.id]?"dot-green":"dot-red"}`}/>
                {p.name}{p.id===playerId?" (you)":""}
                <span style={{marginLeft:"auto",fontSize:18}}>{room?.votes?.[p.id]?"✅":"⏳"}</span>
              </div>
            ))}
          </div>
          {room?.voteTimerEnabled && voteTimer<=0 && !room?.votes?.[playerId] && (
            <div className="alert alert-danger" style={{marginBottom:12}}>⏱ Time's up — you didn't vote in time!</div>
          )}
          {room?.votes?.[playerId]
            ? <>
                <div className="alert alert-success">Voted for <strong>{room.players.find(p=>p.id===room.votes[playerId])?.name}</strong> — waiting for others...</div>
                {votesIn>=total && <button className="btn btn-primary" style={{marginTop:4}} onClick={()=>setScreen("result")}>See Results →</button>}
              </>
            : <>
                <div className="vote-grid">
                  {room?.players?.filter(p=>p.id!==playerId).map(p=>(
                    <button key={p.id} className={`vote-btn${myVote===p.id?" selected":""}`} onClick={()=>handleVote(p.id)}>
                      <div className="player-dot dot-red"/>
                      {p.name}
                      <span style={{fontSize:12,color:"var(--muted)",marginLeft:4}}>{room.clues?.[p.id]?.word||""}</span>
                      {myVote===p.id && <span style={{marginLeft:"auto",fontSize:18}}>👈</span>}
                    </button>
                  ))}
                </div>
                {error && <div className="alert alert-warning">{error}</div>}
                <button className="btn btn-primary" style={{marginTop:8,opacity:myVote?1:0.4}} onClick={handleConfirmVote}>
                  {myVote?`Vote for ${room?.players?.find(p=>p.id===myVote)?.name} →`:"Select a player first"}
                </button>
              </>
          }
        </div>
      </div>
    </div>
  );

  if (screen==="result") return (
    <div className="app"><style>{STYLES}</style>
      <div className="container">
        <div className="logo">IMPOSTOR</div>
        <div className={`result-banner ${isDraw ? "imposter-wins" : impostorCaught ? "majority-wins" : "imposter-wins"}`}>
          <div className="result-emoji">{isDraw ? "🤝" : impostorCaught ? "🎉" : "🎭"}</div>
          <div className="result-title">{isDraw ? "It's a Draw!" : impostorCaught ? "Impostor Caught!" : "Impostor Escapes!"}</div>
          <div className="result-sub">
            {isDraw
              ? `Votes were tied — the impostor${impostorPlayers.length>1?"s":""} ${impostorPlayers.map(p=>p.name).join(" & ")} get${impostorPlayers.length===1?"s":""} away!`
              : impostorCaught
                ? `${impostorPlayers.map(p=>p.name).join(" & ")} ${impostorPlayers.length>1?"were":"was"} the impostor${impostorPlayers.length>1?"s":""} — busted!`
                : `${impostorPlayers.map(p=>p.name).join(" & ")} ${impostorPlayers.length>1?"were":"was"} the impostor${impostorPlayers.length>1?"s":""} — got away!`
            }
          </div>
        </div>

            {/* Show what each side actually got */}
          {currentPair && (
          <div className="card">
            <div className="card-title">What Was Shown</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{background:"var(--surface2)",border:"1px solid rgba(0,229,255,0.3)",borderRadius:12,padding:16,textAlign:"center"}}>
                <div style={{fontSize:11,color:"var(--accent2)",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>👥 Majority</div>
                {room?.mode==="picture" && currentPair.majorityUrl && <img src={currentPair.majorityUrl} alt="" style={{width:"100%",height:80,objectFit:"cover",borderRadius:8,marginBottom:8}}/>}
                {room?.mode==="word" && <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"var(--accent2)"}}>{currentPair.majority}</div>}
                {room?.mode==="video" && <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"var(--accent2)"}}>{currentPair.label}</div>}
              </div>
              <div style={{background:"var(--surface2)",border:"1px solid rgba(255,60,110,0.3)",borderRadius:12,padding:16,textAlign:"center"}}>
                <div style={{fontSize:11,color:"var(--accent)",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>🎭 Impostor got</div>
                {room?.mode==="picture" && currentPair.imposterUrl && <img src={currentPair.imposterUrl} alt="" style={{width:"100%",height:80,objectFit:"cover",borderRadius:8,marginBottom:8}}/>}
                {room?.mode==="word" && (
                  <div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:28,color:"var(--accent)"}}>
                      {(room?.hintMode==="none" && !room?.blindMode) ? "NOTHING" : currentPair.imposter}
                    </div>
                    {(room?.hintMode==="none" && !room?.blindMode) && (
                      <div style={{fontSize:11,color:"var(--muted)",marginTop:6}}>
                        Majority saw: <strong style={{color:"var(--accent2)"}}>{currentPair.majority}</strong>
                      </div>
                    )}
                  </div>
                )}
                {room?.mode==="video" && <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:14,color:"var(--accent)"}}>{currentPair.label}</div>}
              </div>
            </div>
          </div>
        )}

        {!room?.verbalMode && (
          <div className="card">
            <div className="card-title">Clues</div>
            <div className="clue-grid">
              {room?.players?.map(p=>(
                <div className={`clue-card${impostorIds.includes(p.id)?" impostor-reveal":""}`} key={p.id}>
                  <div className="name">{p.name}{impostorIds.includes(p.id)?" 🎭":""}{p.id===playerId?" (you)":""}</div>
                  <div className="word">{room.clues?.[p.id]?.word||"—"}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {room?.verbalMode && (
          <div className="card">
            <div className="card-title">Speaking Order</div>
            <div className="player-list" style={{margin:0}}>
              {(room?.turnOrder||room?.players?.map(p=>p.id))?.map((id,i)=>{
                const p = room?.players?.find(pl=>pl.id===id);
                if (!p) return null;
                return (
                  <div className="player-item" key={id} style={{padding:"10px 14px"}}>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,color:"var(--accent2)",minWidth:24}}>{i+1}</span>
                    <div className={`player-dot ${impostorIds.includes(p.id)?"dot-red":"dot-green"}`}/>
                    {p.name}{impostorIds.includes(p.id)?" 🎭":""}{p.id===playerId?" (you)":""}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-title">Vote Count</div>
          <div className="vote-grid">
            {room?.players?.map(p=>(
              <div className="vote-btn" key={p.id} style={{cursor:"default"}}>
                <div className={`player-dot ${impostorIds.includes(p.id)?"dot-red":"dot-green"}`}/>
                {p.name}{impostorIds.includes(p.id)?" 🎭":""}
                {p.id===playerId&&<span className="badge badge-you">You</span>}
                <span className="vote-count">{tallies[p.id]||0} votes</span>
              </div>
            ))}
          </div>
        </div>

        {isHost
          ? isLastRound
            ? <button className="btn btn-primary" onClick={handlePlayAgain}>🎮 Play Again — Change Settings</button>
            : <button className="btn btn-primary" onClick={handleNextRound}>▶ Next Round ({(room?.round||1)+1}/{room?.totalRounds})</button>
          : <div className="alert alert-info" style={{textAlign:"center"}}>Waiting for host to continue...</div>
        }
        {!room?.verbalMode && (
          <div className="card">
            <div className="card-title">Post-Game Chat</div>
            <ChatBox messages={messages} playerId={playerId} chatMsg={chatMsg} setChatMsg={setChatMsg} onSend={handleSendChat} chatEndRef={chatEndRef}/>
          </div>
        )}
        <button className="btn btn-ghost" style={{marginTop:8,width:"100%",textAlign:"center"}} onClick={handleLeaveGame}>← Leave Game</button>
      </div>
    </div>
  );

  return null;
}