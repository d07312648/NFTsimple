/* PassMarket：日本円でNFTを売買できるマーケットプレイス（研究用の疑似取引）
   app.js より先に読み込む。app.js の state・関数は呼び出し時にのみ参照する。 */
const MARKET_STATE_VERSION=1;
const MARKET_FEE_RATE=.025;
const MARKET_MIN_PRICE=100;
const MARKET_MAX_PRICE=9999999;
const TICKET_RESALE_CAP_RATIO=1;
const WITHDRAW_FEE_YEN=200;
const WITHDRAW_MIN_YEN=1000;
const WITHDRAW_DELAY_MS=8000;
const MARKET_SALE_FAST_SECONDS=12;
const MARKET_SALE_SLOW_SECONDS=45;
const MARKET_INCOMING_OFFER_LIMIT=3;
const MARKET_OFFER_ACCEPT_RATIO=.9;
const MARKET_ACTIVITY_LIMIT=400;
const MARKET_BACKGROUND_MIN_MS=15000;
const MARKET_BACKGROUND_MAX_MS=26000;
const MARKET_TIER_MULT=[1,1.35,2.1,3.6,7.5];
const MARKET_TIER_WEIGHTS=[55,25,12,6,2];
const MARKET_DAY_MS=86400000;
const MARKET_HANDLES=["sakura_collector","tokyo_nft_fan","momo_lover","kaito_nft","haru_collects","neon_drifter","fujiyama_art","ramen_maxi","yuki_gallery","osaka_minter","shibuya_whale","umi_and_sora","kyoto_kura","midori_dao","nagi_records","tsubasa_cards","hikari_pass","rin_pixel","sora_bridge","akari_onchain","ren_ukiyoe","mei_collective","taku_vault","nana_stamp","hina_wave","aoi_frames","riku_moon","kotone_fm"];
const MARKET_CATEGORIES=[["all","すべて"],["ticket","チケット"],["art","アート"],["game","ゲーム"],["music","音楽"],["local","地域・観光"],["membership","会員権"]];
const MARKET_COLLECTIONS=[
  {id:"nova-live",kind:"ticket",ticketId:"nova-live",category:"ticket",name:"NOVA LIVE 2026",creator:"NOVA LIVE 実行委員会",royalty:.05,demand:.97,supply:12000,count:7,verified:true,description:"NOVA LIVE 2026 の公式NFTチケット。公式リセールとして定価を上限に再販でき、売買のたびに販売額の5%が主催者へ還元されます。"},
  {id:"digital-art",kind:"ticket",ticketId:"digital-art",category:"ticket",name:"TOKYO DIGITAL ART NIGHT",creator:"TOKYO DIGITAL ART NIGHT 実行委員会",royalty:.05,demand:.92,supply:3000,count:7,verified:true,description:"TOKYO DIGITAL ART NIGHT の公式NFTチケット。定価を上限とした公式リセールに対応しています。"},
  {id:"skyline-fest",kind:"ticket",ticketId:"skyline-fest",category:"ticket",name:"SKYLINE MUSIC FEST",creator:"SKYLINE MUSIC FEST 事務局",royalty:.05,demand:.95,supply:20000,count:7,verified:true,description:"SKYLINE MUSIC FEST の公式NFTチケット。行けなくなった場合も、定価以内で安全に譲渡できます。"},
  {id:"creator-expo",kind:"ticket",ticketId:"creator-expo",category:"ticket",name:"ANIME CREATOR EXPO",creator:"ANIME CREATOR EXPO 運営事務局",royalty:.05,demand:.9,supply:8000,count:7,verified:true,description:"ANIME CREATOR EXPO の公式NFTチケット。デジタルパンフレットと抽選参加権が付いています。"},
  {id:"light-show",kind:"ticket",ticketId:"light-show",category:"ticket",name:"BAY AREA LIGHT SHOW",creator:"BAY AREA LIGHT SHOW 実行委員会",royalty:.05,demand:.88,supply:5000,count:7,verified:true,description:"BAY AREA LIGHT SHOW の公式NFTチケット。提携施設のクーポンが付いた観光・ナイトイベントのチケットです。"},
  {id:"nexus-future-pass",kind:"ticket",ticketId:"nexus-future-pass",category:"ticket",name:"NEXUS FUTURE PASS",creator:"Nexus Gateway",royalty:.05,floorBase:18000,noCap:true,supply:1000,count:6,verified:true,description:"NFTチケットを3枚購入した人に配布された限定エアドロップNFT。未来体験への特別アクセス権が付いています。"},
  {id:"momo-pixel",kind:"art",style:"pixel",category:"game",name:"MOMO PIXEL FRIENDS",creator:"Studio Momo",royalty:.05,floorBase:6800,supply:3333,count:12,verified:true,description:"PassWalletのマスコット「モモ」と仲間たちの、3,333体のピクセルアートアバター。耳・目・アクセサリーの組み合わせで、見た目とレア度が1体ずつ異なります。"},
  {id:"neo-tokyo",kind:"art",style:"skyline",category:"art",name:"NEO TOKYO NIGHTS",creator:"Kei Arakawa",royalty:.075,floorBase:12000,supply:1000,count:12,verified:true,description:"夜の東京をテーマにしたジェネラティブアート。時間帯・天気・ランドマークの組み合わせで、1点ずつ異なる街並みが描かれています。"},
  {id:"wave-genesis",kind:"art",style:"wave",category:"art",name:"WAVE GENESIS",creator:"generative.jp",royalty:.05,floorBase:24000,supply:512,count:12,verified:true,description:"コードで描かれた波の抽象画。512点限定のジェネラティブアートコレクションです。"},
  {id:"fuji-views",kind:"art",style:"fuji",category:"art",name:"FUJI 36 VIEWS",creator:"Ukiyo Lab",royalty:.06,floorBase:9800,supply:3600,count:12,verified:false,description:"浮世絵の「富嶽三十六景」をモチーフにした風景アート。季節・時刻・前景の組み合わせで全3,600点が発行されています。"},
  {id:"star-card",kind:"art",style:"card",category:"game",name:"STAR CARD ARENA",creator:"Arena Studio",royalty:.05,floorBase:1800,supply:50000,count:14,verified:true,tierMult:[1,1.8,4,9,25],description:"デジタルトレーディングカード。N・R・SR・SSR・URの5段階のレアリティがあり、レアなカードほど高値で取引されます。"},
  {id:"furusato-goshuin",kind:"art",style:"goshuin",category:"local",name:"ふるさと御朱印NFT",creator:"ふるさとNFT推進協議会",royalty:.1,floorBase:3000,supply:8000,count:12,verified:true,description:"全国の観光地を訪れた記念に発行される御朱印NFT。クリエイター収益（10%）は、各地域の観光振興に活用されます。"},
  {id:"sound-drop",kind:"art",style:"record",category:"music",name:"SOUND DROP RECORDS",creator:"Sound Drop",royalty:.08,floorBase:4500,supply:2400,count:12,verified:false,description:"インディーアーティストの楽曲を、レコードジャケット型のNFTとして販売。限定盤やサイン入りは保有者限定の音源が付いています。"},
  {id:"bay-members",kind:"art",style:"pass",category:"membership",name:"TOKYO BAY MEMBERS PASS",creator:"Tokyo Bay Club",royalty:.05,floorBase:38000,supply:800,count:9,verified:true,tierMult:[1,1.6,2.6,4.2,8],description:"東京ベイエリアの提携施設で使える会員権NFT。ランクに応じて、ラウンジ利用や優先入場などの特典を受けられます。"},
  {"id":"astral-forge","kind":"art","style":"relic","category":"game","name":"ASTRAL FORGE RELICS","creator":"Astral Forge Studio","royalty":0.05,"floorBase":8400,"supply":4200,"count":12,"verified":true,"description":"星の鉱石から鍛えられた剣・盾・杖を集める、ファンタジーRPGの装備コレクション。装備の種類、カラーテーマ、エディションの組み合わせで個体を識別します。ゲーム内での装備やプレイヤー間の取引を想定したNFTです。"},
  {"id":"blue-hour","kind":"art","style":"jazz","category":"music","name":"BLUE HOUR SESSIONS","creator":"Blue Hour Records","royalty":0.08,"floorBase":6200,"supply":1200,"count":12,"verified":true,"description":"小さなジャズクラブの深夜公演を収録したライブ音源コレクション。ピアノトリオ、カルテット、ソロの各セッションを、レコードとジャケットのアートで表現。保有者向けの未公開テイクや録音ノートを特典とする設定です。"},
  {"id":"echo-atlas","kind":"art","style":"ambient","category":"music","name":"ECHO ATLAS","creator":"Echo Atlas Soundworks","royalty":0.08,"floorBase":4800,"supply":1800,"count":12,"verified":true,"description":"雨音、潮騒、森の環境音を重ねたアンビエント作品。音の波形をモチーフにしたアートと、音風景ごとのエディションを収集できます。保有者向けの高音質音源と制作日誌を特典とする設定です。"},
  {"id":"setouchi-journal","kind":"art","style":"islands","category":"local","name":"SETOUCHI JOURNAL","creator":"瀬戸内旅の編集室","royalty":0.1,"floorBase":3200,"supply":3600,"count":12,"verified":true,"description":"尾道・小豆島・直島を巡る旅を、島影と帆船を描いたポストカードとして残すNFT。寄港地や色合いが異なる旅の記録を集められます。売買時のクリエイター収益の10%を地域の文化活動に還元する設定です。"},
  {"id":"ridgeline-passport","kind":"art","style":"trails","category":"local","name":"RIDGELINE PASSPORT","creator":"稜線アーカイブ","royalty":0.1,"floorBase":3600,"supply":2400,"count":12,"verified":true,"description":"八ヶ岳、北アルプス、奥多摩の山歩きを記録するデジタル登山パスポート。山並み、登山道、森を重ねた風景画を収集できます。ルートごとの記録や、登山道保全への還元を想定したコレクションです。"},
  {"id":"quiet-chapter","kind":"art","style":"library","category":"membership","name":"QUIET CHAPTER","creator":"Quiet Chapter Library","royalty":0.05,"floorBase":26000,"supply":600,"count":10,"verified":true,"description":"読書と対話のための書斎ラウンジ会員権。書架と開いた本を描いた会員証に、閲覧室・サロン・アーカイブのプランを用意。プランに応じた席の予約や読書会への参加を想定しています。"},
  {"id":"glasshouse-society","kind":"art","style":"botanical","category":"membership","name":"GLASSHOUSE SOCIETY","creator":"Glasshouse Botanical Club","royalty":0.05,"floorBase":22000,"supply":900,"count":10,"verified":true,"description":"都市の温室を拠点とする植物好きのための会員権。温室の建築と葉のシルエットを会員証にデザイン。庭園の利用、園芸ワークショップ、会員限定の植物交換会をプラン別の特典として想定しています。"},
  {"id":"fold-form","kind":"art","style":"paperform","category":"art","name":"FOLD / FORM","creator":"Atelier Fold","royalty":0.05,"floorBase":9200,"supply":768,"count":12,"verified":true,"description":"一枚の紙から生まれる折りの環、階段、回転する面を集めた立体造形シリーズ。紙の重なりと陰影をデジタルで表現し、構成枚数・造形・色の組み合わせで一点ずつ異なる作品を生成します。"},
  {"id":"kintsugi-life","kind":"art","style":"kintsugi","category":"art","name":"KINTSUGI / SECOND LIFE","creator":"継景スタジオ","royalty":0.05,"floorBase":14500,"supply":540,"count":12,"verified":true,"description":"割れ目を金でつなぐ金継ぎをテーマにしたデジタル陶芸。茶碗・花器・湯呑みに、それぞれ異なる釉薬と継ぎの線が現れます。傷を隠さず、新たな景色として鑑賞する作品群です。"},
  {"id":"apex-orbit","kind":"art","style":"racer","category":"game","name":"APEX ORBIT","creator":"Apex Orbital Works","royalty":0.05,"floorBase":7600,"supply":4800,"count":12,"verified":true,"description":"無重力のサーキットを駆ける宇宙レース機のNFT。機体の翼型、エンジン構成、カラーリングを組み合わせて収集できます。レースゲーム内での機体選択やプレイヤー間取引を想定したコレクションです。"},
  {"id":"clockwork-tactics","kind":"art","style":"clockchess","category":"game","name":"CLOCKWORK TACTICS","creator":"Clockwork Table Studio","royalty":0.05,"floorBase":5400,"supply":3600,"count":12,"verified":true,"description":"歯車で動く機械仕掛けのチェス駒。ナイト・ルーク・クイーンの造形に、金属の色と駆動歯車の違いを持たせています。戦略ボードゲームで自分の駒として使用し、交換する設定のNFTです。"},
  {"id":"patch-signals","kind":"art","style":"synth","category":"music","name":"PATCH SIGNALS","creator":"Voltage Room","royalty":0.08,"floorBase":6800,"supply":960,"count":12,"verified":true,"description":"モジュラーシンセの配線から生まれる電子音楽のエディション。ノブやパッチケーブルを描いたアートとともに、アシッド、ドローン、変則リズムの作品を収集できます。保有者向けに制作時のパッチ図と別ミックスを提供する設定です。"},
  {"id":"wind-up-melodies","kind":"art","style":"musicbox","category":"music","name":"WIND-UP MELODIES","creator":"小さな音楽機械室","royalty":0.08,"floorBase":5200,"supply":1500,"count":12,"verified":true,"description":"手巻きオルゴールのために書かれた短い楽曲集。木箱、金属のシリンダー、浮かぶ音符でワルツや子守歌の世界を描きます。保有者向けに楽曲音源と編曲譜を届ける設定の音楽NFTです。"},
  {"id":"matsuri-archive","kind":"art","style":"festival","category":"local","name":"MATSURI / NIGHT ARCHIVE","creator":"まちの灯編集部","royalty":0.1,"floorBase":2800,"supply":4200,"count":12,"verified":true,"description":"祭りの夜に並ぶ提灯と通りの賑わいを残すデジタル紀行。花・月・祭の紋と灯りの色が異なる作品を集められます。祭礼の記録保存と地域の担い手支援への収益還元を想定しています。"},
  {"id":"indigo-routes","kind":"art","style":"indigo","category":"local","name":"INDIGO / CRAFT ROUTES","creator":"藍の道工芸舎","royalty":0.1,"floorBase":4300,"supply":1800,"count":12,"verified":true,"description":"藍染工房を巡る旅と伝統文様をテーマにしたコレクション。七宝、麻の葉、青海波を、藍の濃淡や型の間隔とともに表現します。工房見学の記録や染め手への収益還元を想定したNFTです。"},
  {"id":"open-bench","kind":"art","style":"maker","category":"membership","name":"OPEN BENCH GUILD","creator":"Open Bench Collective","royalty":0.05,"floorBase":18000,"supply":720,"count":12,"verified":true,"description":"3Dプリント、電子工作、木工を楽しむ共同工房の会員権。機材を設計図風に描いた会員証に、日中利用・常設会員・講師コミュニティのプランを用意。作業台の予約や講習への参加を想定しています。"},
  {"id":"after-dark","kind":"art","style":"observatory","category":"membership","name":"AFTER DARK OBSERVATORY","creator":"After Dark Astronomy Club","royalty":0.05,"floorBase":24000,"supply":480,"count":12,"verified":true,"description":"夜空を観察する天文台コミュニティの会員権。北斗七星・カシオペヤ・夏の大三角の星図を会員証に描きます。観望会、天体撮影、深宇宙観測のプランに応じた設備予約や交流会への参加を想定しています。"}
];
const MARKET_COLLECTION_BY_ID=new Map(MARKET_COLLECTIONS.map(c=>[c.id,c]));
const MARKET_CATALOG=(()=>{
  const items=[];
  MARKET_COLLECTIONS.forEach(c=>{
    const r=NftArt.rng(`catalog:${c.id}`),serials=new Set();
    for(let i=0;i<c.count;i++){
      let serial;do{serial=1+Math.floor(r()*c.supply)}while(serials.has(serial));serials.add(serial);
      let tier=0;
      if(c.kind!=="ticket"){
        if(i===0)tier=r()<.45?4:3;
        else if(i===1)tier=2;
        else{let x=r()*100;tier=MARKET_TIER_WEIGHTS.findIndex(w=>(x-=w)<0);if(tier<0)tier=0}
      }
      items.push({id:`${c.id}-${serial}`,collectionId:c.id,serial,tier});
    }
  });
  return items;
})();
const MARKET_CATALOG_BY_ID=new Map(MARKET_CATALOG.map(item=>[item.id,item]));
const TRADE_VIEW_DEFAULTS={tab:"explore",page:null,id:null,category:"all",sort:"recommended",listedOnly:true,collectionSort:"price_asc",collectionListedOnly:false,accountTab:"owned",activityFilter:"all",rankCategory:"all",rankSort:"volume",query:"",visible:24,history:[]};
const MARKET_BANKS=["デモ銀行（研究用）","三菱UFJ銀行","三井住友銀行","みずほ銀行","りそな銀行","ゆうちょ銀行","楽天銀行","PayPay銀行","住信SBIネット銀行"];
const MARKET_VERIFIED='<i class="pm-verified" title="公式認証済み" aria-label="公式認証済み">✓</i>';

let marketHeartbeatTimer=null;
let marketOrderTimer=null;
let marketPasskeyTimer=null;
let marketModalItemId=null;
let tradeSearchTimer=null;
let tradeChartResizeTimer=null;
let listingDurationDays=7;

/* ---------- 基本ユーティリティ ---------- */
function marketUid(prefix){return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`}
function marketRandom(min,max){return min+Math.random()*(max-min)}
function marketHandle(exclude){let name;do{name=MARKET_HANDLES[Math.floor(Math.random()*MARKET_HANDLES.length)]}while(name===exclude);return name}
function niceYen(value){const v=Math.max(0,Number(value)||0),step=v<1000?10:v<10000?100:v<100000?500:1000;return Math.round(v/step)*step}
function toHalfWidthNumber(value){return String(value).replace(/[０-９]/g,c=>String.fromCharCode(c.charCodeAt(0)-0xFEE0)).replace(/[．。]/g,".")}
/* 日本語入力（全角数字・変換中）でも金額を入力できるよう、変換確定後に半角へ整える */
function bindNumericInput(input,sanitize,onChange=null){
  const apply=()=>{
    const raw=input.value,value=sanitize(toHalfWidthNumber(raw));
    if(raw!==value){
      const caret=document.activeElement===input?input.selectionStart:null;
      input.value=value;
      // 途中の桁を直したときにカーソルが末尾へ飛ばないよう、整えた後も同じ桁の位置に戻す
      if(caret!==null&&caret<raw.length){const pos=Math.min(value.length,sanitize(toHalfWidthNumber(raw.slice(0,caret))).length);input.setSelectionRange(pos,pos)}
    }
    onChange?.();
  };
  input.addEventListener("input",event=>{if(!event.isComposing)apply()});
  input.addEventListener("compositionend",apply);
}
function fmtYenCompact(value){
  const v=Math.round(Number(value)||0);
  if(v>=1e8)return `¥${(v/1e8).toFixed(v>=1e9?0:1)}億`;
  if(v>=1e4)return `¥${(v/1e4).toFixed(v>=1e6?0:1)}万`;
  return fmtYen(v);
}
function marketRelTime(at){
  const s=Math.max(0,Math.round((Date.now()-Number(at))/1000));
  if(s<10)return "たった今";if(s<60)return `${s}秒前`;
  const m=Math.floor(s/60);if(m<60)return `${m}分前`;
  const h=Math.floor(m/60);if(h<24)return `${h}時間前`;
  return `${Math.floor(h/24)}日前`;
}
function marketContractAddress(collectionId){
  const r=NftArt.rng(`contract:${collectionId}`);
  return `0x${Array.from({length:40},()=>Math.floor(r()*16).toString(16)).join("").toUpperCase()}`;
}
function marketCategoryLabel(category){return MARKET_CATEGORIES.find(([key])=>key===category)?.[1]||category}
function marketCollection(id){return MARKET_COLLECTION_BY_ID.get(id)||null}
function marketTicket(collection){return collection?.ticketId?tickets.find(t=>t.id===collection.ticketId)||null:null}
function marketTicketFaceYen(collection){return collection?.kind==="ticket"&&!collection.noCap?ticketPriceYenById(collection.ticketId):null}

/* ---------- 状態 ---------- */
function marketState(){
  if(!state.market||state.market.version!==MARKET_STATE_VERSION)state.market=seedMarketState();
  return state.market;
}
function normalizeMarketState(){
  const m=marketState();
  ["activity","myOffers","ledger","withdrawals","notifications"].forEach(key=>{if(!Array.isArray(m[key]))m[key]=[]});
  if(!m.items||typeof m.items!=="object")m.items={};
  if(!m.favorites||typeof m.favorites!=="object")m.favorites={};
  m.balance={available:0,reserved:0,pending:0,earned:0,withdrawn:0,...m.balance};
  if(!Number.isFinite(m.nextBackgroundAt))m.nextBackgroundAt=Date.now()+MARKET_BACKGROUND_MIN_MS;
  const missing=MARKET_CATALOG.filter(base=>!m.items[base.id]);
  if(missing.length){
    const seeded=seedMarketState(),ids=new Set(missing.map(base=>base.id));
    for(const base of missing)m.items[base.id]=seeded.items[base.id];
    m.activity.push(...seeded.activity.filter(event=>ids.has(event.itemId)));
    m.activity.sort((a,b)=>a.at-b.at);
    m.activity=m.activity.slice(-MARKET_ACTIVITY_LIMIT);
  }
  Object.values(m.items).forEach(rec=>{if(!Array.isArray(rec.offers))rec.offers=[]});
}
function tradeView(){
  if(!state.tradeView||typeof state.tradeView!=="object")state.tradeView={...TRADE_VIEW_DEFAULTS,history:[]};
  for(const key of ["category","rankCategory"]){if(["pfp","tcg"].includes(state.tradeView[key]))state.tradeView[key]="game";}
  return state.tradeView;
}
function tradeBalance(){return Math.max(0,Number(state.market?.balance?.available)||0)}
function marketRecord(itemId){
  const m=marketState();
  if(!m.items[itemId])m.items[itemId]={owner:null,listing:null,lastSalePrice:null,lastSaleAt:null,favCount:0,views:0,offers:[]};
  return m.items[itemId];
}
function seedMarketState(){
  const nowMs=Date.now(),items={},activity=[];
  MARKET_CATALOG.forEach(base=>{
    const c=marketCollection(base.collectionId),owner=marketHandle();
    const fair=marketFairYenForCatalog(base),capped=c.kind==="ticket"&&!c.noCap;
    const rec={owner,listing:null,lastSalePrice:null,lastSaleAt:null,favCount:Math.round(Math.random()*10+base.tier*Math.random()*16),views:Math.round(18+Math.random()*180+base.tier*40),offers:[]};
    if(Math.random()<.65){
      const at=nowMs-Math.round(marketRandom(.04,7)*MARKET_DAY_MS),price=marketBoundPrice(c,fair*marketRandom(.86,1.12));
      rec.lastSalePrice=price;rec.lastSaleAt=at;
      activity.push({id:marketUid("act"),type:"sale",itemId:base.id,price,from:marketHandle(owner),to:owner,at});
    }
    if(Math.random()<(c.kind==="ticket"?.86:.7)){
      const listedAt=nowMs-Math.round(marketRandom(.01,3)*MARKET_DAY_MS);
      const target=capped?marketTicketFaceYen(c)*marketRandom(.86,1):fair*marketRandom(.98,1.38);
      rec.listing={price:marketBoundPrice(c,target),listedAt,expiresAt:listedAt+[7,14,30][Math.floor(Math.random()*3)]*MARKET_DAY_MS,seller:owner};
      activity.push({id:marketUid("act"),type:"list",itemId:base.id,price:rec.listing.price,from:owner,to:null,at:listedAt});
    }
    items[base.id]=rec;
  });
  activity.sort((a,b)=>a.at-b.at);
  return {version:MARKET_STATE_VERSION,seededAt:nowMs,items,activity,myOffers:[],favorites:{},balance:{available:0,reserved:0,pending:0,earned:0,withdrawn:0},ledger:[],bankAccount:null,withdrawals:[],notifications:[],nextBackgroundAt:nowMs+MARKET_BACKGROUND_MIN_MS};
}
function marketBoundPrice(collection,value){
  const cap=collection.kind==="ticket"&&!collection.noCap?Math.floor(marketTicketFaceYen(collection)*TICKET_RESALE_CAP_RATIO):MARKET_MAX_PRICE;
  return Math.min(cap,Math.max(MARKET_MIN_PRICE,niceYen(value)));
}

/* ---------- アイテム情報 ---------- */
function marketItemIdForEntry(entry){return entry?.itemId||`tok-${entry?.tokenId}`}
function myEntryForItem(itemId){return state.ownedNfts.find(entry=>!entry.soldAt&&marketItemIdForEntry(entry)===itemId)||null}
function marketOwnedByMe(itemId){return !!myEntryForItem(itemId)}
function marketItemUsed(itemId){return state.ownedNfts.some(entry=>marketItemIdForEntry(entry)===itemId&&!!entry.admissionUsedAt)}
function marketListingForEntry(entry){const rec=state.market?.items?.[marketItemIdForEntry(entry)];return rec?.listing&&rec.listing.seller==="me"?rec.listing:null}
function marketTicketTraits(itemId,acquisition){
  const r=NftArt.rng(`${itemId}#ticket`),used=marketItemUsed(itemId);
  const channel=acquisition==="airdrop"?"エアドロップ":acquisition==="fiat_purchase"?"公式販売":["一般販売","一般販売","先行抽選","公式リセール"][Math.floor(r()*4)];
  return [{label:"受付",value:channel,share:null},{label:"ゲート",value:`${"ABCDEF"[Math.floor(r()*6)]}ゲート`,share:17},{label:"入場状況",value:used?"使用済み（記念）":"未使用",share:null}];
}
const MARKET_INFO_CACHE=new Map();
function marketItemCollectionId(itemId){
  if(!itemId)return null;
  if(itemId.startsWith("tok-")){const tokenId=itemId.slice(4);return state.ownedNfts.find(item=>item.tokenId===tokenId)?.ticketId||null}
  return MARKET_CATALOG_BY_ID.get(itemId)?.collectionId||null;
}
function marketItemInfo(itemId){
  if(!itemId)return null;
  if(MARKET_INFO_CACHE.has(itemId))return MARKET_INFO_CACHE.get(itemId);
  if(itemId.startsWith("tok-")){
    const tokenId=itemId.slice(4),entry=state.ownedNfts.find(item=>item.tokenId===tokenId);
    const c=marketCollection(entry?.ticketId),t=marketTicket(c);
    if(!entry||!c||!t)return null;
    const serial=Number(tokenId.replace(/\D/g,"").slice(-4))||1;
    return {id:itemId,collection:c,serial,tier:0,tierLabel:"コモン",name:`${t.title} #${String(serial).padStart(4,"0")}`,image:t.image,traits:marketTicketTraits(itemId,entry.acquisitionType),isTicket:true,tokenLabel:tokenId};
  }
  const base=MARKET_CATALOG_BY_ID.get(itemId),c=marketCollection(base?.collectionId);
  if(!base||!c)return null;
  let info;
  if(c.kind==="ticket"){
    const t=marketTicket(c);
    info={id:itemId,collection:c,serial:base.serial,tier:0,tierLabel:"コモン",name:`${t.title} #${String(base.serial).padStart(4,"0")}`,image:t.image,get traits(){return marketTicketTraits(itemId)},isTicket:true,tokenLabel:String(base.serial)};
  }else{
    const art=NftArt.create(c.style,itemId,base.tier,base.serial);
    info={id:itemId,collection:c,serial:base.serial,tier:base.tier,tierLabel:art.tierLabel,name:art.title,get image(){return art.uri()},traits:art.traits,isTicket:false,tokenLabel:String(base.serial)};
  }
  MARKET_INFO_CACHE.set(itemId,info);
  return info;
}
function marketFairYenForCatalog(base){
  const c=marketCollection(base.collectionId);
  if(c.kind==="ticket")return c.noCap?c.floorBase:marketTicketFaceYen(c)*c.demand;
  return c.floorBase*(c.tierMult||MARKET_TIER_MULT)[base.tier];
}
function marketFairYen(itemId){
  const info=marketItemInfo(itemId);if(!info)return 0;
  const c=info.collection,used=marketItemUsed(itemId);
  if(c.kind==="ticket"&&!c.noCap){const face=marketTicketFaceYen(c);return used?face*.3:face*c.demand}
  return (c.floorBase||0)*(c.tierMult||MARKET_TIER_MULT)[info.tier]*(used?.5:1);
}
function marketPriceCap(itemId){
  const c=marketItemInfo(itemId)?.collection;
  return c&&c.kind==="ticket"&&!c.noCap?Math.floor(marketTicketFaceYen(c)*TICKET_RESALE_CAP_RATIO):MARKET_MAX_PRICE;
}
function marketPriceRange(itemId){
  const info=marketItemInfo(itemId),cap=marketPriceCap(itemId);
  if(info?.collection.kind==="ticket"&&!info.collection.noCap){
    const face=marketTicketFaceYen(info.collection);
    if(marketItemUsed(itemId))return {low:niceYen(face*.2),high:niceYen(face*.4),cap,face};
    return {low:niceYen(face*.75),high:Math.min(cap,face),cap,face};
  }
  const fair=marketFairYen(itemId);
  return {low:niceYen(fair*.8),high:niceYen(fair*1.25),cap,face:null};
}
function marketSaleEstimate(itemId,price){
  const {low,high}=marketPriceRange(itemId);
  if(price<low)return {zone:"low",seconds:9};
  if(price<=high){const ratio=high>low?(price-low)/(high-low):0;return {zone:"fair",seconds:Math.round(MARKET_SALE_FAST_SECONDS+ratio*(MARKET_SALE_SLOW_SECONDS-MARKET_SALE_FAST_SECONDS))}}
  return {zone:"high",seconds:null};
}
function marketFees(price,collection){
  const platform=Math.round(price*MARKET_FEE_RATE),royalty=Math.round(price*(collection?.royalty||0));
  return {platform,royalty,net:price-platform-royalty};
}
function allMarketItemIds(){
  const ids=new Set(MARKET_CATALOG.map(item=>item.id));
  Object.keys(marketState().items).forEach(id=>{if(id.startsWith("tok-")&&marketItemInfo(id))ids.add(id)});
  state.ownedNfts.forEach(entry=>{const id=marketItemIdForEntry(entry);if(!entry.soldAt&&marketItemInfo(id))ids.add(id)});
  return [...ids];
}
function collectionItemIds(collectionId){return allMarketItemIds().filter(id=>marketItemCollectionId(id)===collectionId)}
function collectionListings(collectionId){return collectionItemIds(collectionId).map(id=>marketRecord(id).listing).filter(Boolean)}
function collectionFloor(collectionId){const prices=collectionListings(collectionId).map(l=>l.price);return prices.length?Math.min(...prices):null}
function collectionVolume(collectionId,windowMs=7*MARKET_DAY_MS){
  const since=Date.now()-windowMs;
  return marketState().activity.filter(a=>a.type==="sale"&&a.at>=since&&marketItemCollectionId(a.itemId)===collectionId).reduce((sum,a)=>sum+a.price,0);
}
function collectionBasePrice(c){return c.kind==="ticket"&&!c.noCap?marketTicketFaceYen(c)*c.demand:c.floorBase}
function collectionHistory(collectionId){
  const c=marketCollection(collectionId),r=NftArt.rng(`history:${collectionId}`),base=collectionBasePrice(c),cap=c.kind==="ticket"&&!c.noCap?marketTicketFaceYen(c):Infinity;
  let value=base*(.82+r()*.22);const points=[];
  for(let day=29;day>=1;day--){
    value=Math.min(cap,Math.max(base*.55,value*(1+(r()-.48)*.07)+(base-value)*.08));
    points.push({at:Date.now()-day*MARKET_DAY_MS,value:niceYen(value)});
  }
  points.push({at:Date.now(),value:collectionFloor(collectionId)??niceYen(value)});
  return points;
}
function collectionChange(collectionId){
  const points=collectionHistory(collectionId),last=points[points.length-1].value,prev=points[points.length-2].value;
  return prev?(last-prev)/prev:0;
}
function collectionOwners(c){return Math.round(c.supply*(.42+NftArt.rng(`owners:${c.id}`)()*.3))}
function collectionCover(collectionId){
  const c=marketCollection(collectionId);
  if(c.kind==="ticket")return marketTicket(c).image;
  return marketItemInfo(MARKET_CATALOG.find(item=>item.collectionId===collectionId).id).image;
}
function collectionMosaic(collectionId,count=3){
  const c=marketCollection(collectionId);
  if(c.kind==="ticket")return [marketTicket(c).image];
  return MARKET_CATALOG.filter(item=>item.collectionId===collectionId).slice(0,count).map(item=>marketItemInfo(item.id).image);
}

/* ---------- 記録・通知 ---------- */
function pushMarketActivity(event){
  const m=marketState();
  m.activity.push({id:marketUid("act"),at:Date.now(),...event});
  if(m.activity.length>MARKET_ACTIVITY_LIMIT)m.activity.splice(0,m.activity.length-MARKET_ACTIVITY_LIMIT);
}
function pushMarketLedger(entry){
  const m=marketState(),record={id:marketUid("led"),at:Date.now(),status:"done",...entry};
  m.ledger.push(record);return record;
}
function pushMarketNotice(kind,title,body,itemId=null){
  const m=marketState();
  m.notifications.push({id:marketUid("ntf"),kind,title,body,itemId,at:Date.now(),read:false});
  if(m.notifications.length>60)m.notifications.splice(0,m.notifications.length-60);
  updateTradeChrome();
  if(!missionCompletionNoticeActive)showEthSuccess(title,body,4800,"market-notice-toast");
}
function noteNftMinted(entry){
  if(!entry||!state.participantId)return;
  const itemId=marketItemIdForEntry(entry);marketRecord(itemId);
  pushMarketActivity({type:"mint",itemId,price:entry.priceYen||0,from:entry.acquisitionType==="airdrop"?"エアドロップ":"Ticket Store",to:"あなた",mine:true});
}

/* ---------- エンジン（売却・オファー・出金・他ユーザーの取引） ---------- */
function startMarketEngine(){
  if(!state.participantId)return;
  normalizeMarketState();
  clearInterval(marketHeartbeatTimer);
  marketHeartbeatTimer=setInterval(marketHeartbeat,1000);
  marketHeartbeat();
}
function stopMarketEngine(){clearInterval(marketHeartbeatTimer);clearTimeout(marketOrderTimer);clearTimeout(marketPasskeyTimer);marketHeartbeatTimer=null}
function marketHeartbeat(){
  if(!state.participantId||resetInProgress)return;
  const m=marketState(),nowMs=Date.now();
  Object.keys(m.items).forEach(itemId=>{
    const rec=m.items[itemId],listing=rec.listing;
    rec.offers.forEach(offer=>{if(offer.status==="open"&&!offer.mine&&offer.expiresAt<=nowMs)offer.status="expired"});
    if(!listing||listing.seller!=="me")return;
    if(!marketOwnedByMe(itemId)){rec.listing=null;return}
    if(listing.expiresAt<=nowMs){expireMyListing(itemId);return}
    if(listing.saleAt&&listing.saleAt<=nowMs){completeMyMarketSale(itemId,listing.price,"listing",marketHandle());return}
    if(listing.offerAt&&listing.offerAt<=nowMs)receiveMarketOffer(itemId);
  });
  m.myOffers.filter(offer=>offer.status==="pending"&&offer.resolveAt<=nowMs).forEach(resolveMyOffer);
  m.withdrawals.filter(w=>w.status==="processing"&&w.completesAt<=nowMs).forEach(completeWithdrawal);
  if(nowMs>=m.nextBackgroundAt){
    runBackgroundMarketEvent();
    m.nextBackgroundAt=nowMs+Math.round(marketRandom(MARKET_BACKGROUND_MIN_MS,MARKET_BACKGROUND_MAX_MS));
  }
  updateMarketCountdowns();
}
function scheduleMyListing(itemId,price,previous=null){
  const est=marketSaleEstimate(itemId,price),nowMs=Date.now();
  const rec=marketRecord(itemId),openOffer=rec.offers.some(o=>o.status==="open"&&!o.mine);
  const offerCount=previous?.offerCount||0;
  return {
    zone:est.zone,
    saleAt:est.seconds?nowMs+Math.max(5,est.seconds+marketRandom(-4,4))*1000:null,
    offerAt:est.zone==="high"&&!openOffer&&offerCount<MARKET_INCOMING_OFFER_LIMIT?nowMs+marketRandom(25,40)*1000:null,
    offerCount
  };
}
function createMyListing(itemId,price,days){
  const entry=myEntryForItem(itemId),rec=marketRecord(itemId),info=marketItemInfo(itemId);
  if(!entry||!info)return false;
  const nowMs=Date.now();
  rec.owner=null;
  rec.listing={price,listedAt:nowMs,expiresAt:nowMs+days*MARKET_DAY_MS,seller:"me",durationDays:days,...scheduleMyListing(itemId,price)};
  pushMarketActivity({type:"list",itemId,price,from:"あなた",to:null,mine:true});
  log("market_listing_created",{item_id:itemId,token_id:entry.tokenId,collection_id:info.collection.id,price_yen:price,zone:rec.listing.zone,expected_sale_seconds:rec.listing.saleAt?Math.round((rec.listing.saleAt-nowMs)/1000):null,duration_days:days,fair_range_yen:marketPriceRange(itemId)});
  return true;
}
function updateMyListing(itemId,price){
  const rec=marketRecord(itemId),listing=rec.listing;
  if(!listing||listing.seller!=="me"||!marketOwnedByMe(itemId))return false;
  const previousPrice=listing.price;
  Object.assign(listing,{price,...scheduleMyListing(itemId,price,listing)});
  pushMarketActivity({type:"price",itemId,price,from:"あなた",to:null,mine:true});
  log("market_listing_updated",{item_id:itemId,previous_price_yen:previousPrice,price_yen:price,zone:listing.zone,expected_sale_seconds:listing.saleAt?Math.round((listing.saleAt-Date.now())/1000):null});
  return true;
}
function cancelMyListing(itemId,reason="cancel"){
  const rec=marketRecord(itemId),listing=rec.listing;
  if(!listing||listing.seller!=="me")return false;
  rec.listing=null;
  rec.offers.forEach(offer=>{if(offer.status==="open"&&!offer.mine)offer.status="closed"});
  pushMarketActivity({type:"cancel",itemId,price:listing.price,from:"あなた",to:null,mine:true});
  log(reason==="expired"?"market_listing_expired":"market_listing_cancelled",{item_id:itemId,price_yen:listing.price,listed_seconds:Math.round((Date.now()-listing.listedAt)/1000)});
  return true;
}
function expireMyListing(itemId){
  if(!cancelMyListing(itemId,"expired"))return;
  pushMarketNotice("expired","出品期間が終了しました",`${marketItemInfo(itemId)?.name||"NFT"} の出品期間が終了しました`,itemId);
  refreshMarketViews();
}
function completeMyMarketSale(itemId,price,via,buyer,offerId=null){
  const entry=myEntryForItem(itemId),info=marketItemInfo(itemId);
  if(!entry||!info)return false;
  const rec=marketRecord(itemId),m=marketState(),fees=marketFees(price,info.collection),listedAt=rec.listing?.listedAt||null;
  entry.soldAt=now();entry.soldPriceYen=price;entry.soldTo=buyer;entry.saleNetYen=fees.net;entry.soldVia=via;
  rec.listing=null;rec.owner=buyer;rec.lastSalePrice=price;rec.lastSaleAt=Date.now();
  rec.offers.forEach(offer=>{if(offer.status==="open"&&!offer.mine)offer.status=offer.id===offerId?"accepted":"closed"});
  m.balance.available+=fees.net;m.balance.earned+=fees.net;
  pushMarketLedger({type:"sale",title:`${info.name} の売上`,amount:fees.net,gross:price,platformFee:fees.platform,royalty:fees.royalty,itemId});
  pushMarketActivity({type:"sale",itemId,price,from:"あなた",to:buyer,mine:true});
  log("market_nft_sold",{item_id:itemId,token_id:entry.tokenId,collection_id:info.collection.id,price_yen:price,net_yen:fees.net,platform_fee_yen:fees.platform,royalty_yen:fees.royalty,via,buyer,listed_seconds:listedAt?Math.round((Date.now()-listedAt)/1000):null});
  if(activeAdmissionIndex!==null&&state.ownedNfts[activeAdmissionIndex]?.tokenId===entry.tokenId)closeAdmissionPass();
  if(marketModalItemId===itemId)closeModal();
  pushMarketNotice("sold","NFTが売れました",`${info.name} が ${fmtYen(price)} で売れました。${fmtYen(fees.net)} を売上残高に追加しました`,itemId);
  refreshMarketViews();
  return true;
}
function receiveMarketOffer(itemId){
  const rec=marketRecord(itemId),listing=rec.listing,info=marketItemInfo(itemId);
  if(!listing||!info)return;
  const range=marketPriceRange(itemId),amount=Math.min(listing.price-niceYen(listing.price*.02),niceYen(range.high*marketRandom(.93,1))),from=marketHandle();
  rec.offers.push({id:marketUid("ofr"),from,amount,at:Date.now(),expiresAt:Date.now()+MARKET_DAY_MS,status:"open"});
  listing.offerCount=(listing.offerCount||0)+1;listing.offerAt=null;
  pushMarketActivity({type:"offer",itemId,price:amount,from,to:"あなた",mine:true});
  log("market_offer_received",{item_id:itemId,amount_yen:amount,listing_price_yen:listing.price,from});
  pushMarketNotice("offer","オファーが届きました",`${info.name} に ${fmtYen(amount)} のオファーが届きました`,itemId);
  refreshMarketViews();
}
function declineIncomingOffer(itemId,offerId){
  const rec=marketRecord(itemId),offer=rec.offers.find(o=>o.id===offerId&&o.status==="open");
  if(!offer)return;
  offer.status="declined";
  const listing=rec.listing;
  if(listing?.seller==="me"&&listing.zone==="high"&&(listing.offerCount||0)<MARKET_INCOMING_OFFER_LIMIT)listing.offerAt=Date.now()+marketRandom(35,55)*1000;
  log("market_offer_declined",{item_id:itemId,amount_yen:offer.amount,from:offer.from});
  refreshMarketViews();toast("オファーを辞退しました");
}
function placeMyOffer(itemId,amount){
  const m=marketState(),rec=marketRecord(itemId),info=marketItemInfo(itemId);
  m.balance.available-=amount;m.balance.reserved+=amount;
  const offer={id:marketUid("myo"),itemId,amount,at:Date.now(),resolveAt:Date.now()+marketRandom(12,24)*1000,status:"pending",listingPrice:rec.listing?.price||null};
  m.myOffers.push(offer);
  rec.offers.push({id:offer.id,from:"あなた",amount,at:offer.at,expiresAt:offer.at+MARKET_DAY_MS,status:"open",mine:true});
  pushMarketLedger({type:"offer_hold",title:`オファー金額を確保（${info.name}）`,amount:-amount,itemId,offerId:offer.id,status:"hold"});
  pushMarketActivity({type:"offer",itemId,price:amount,from:"あなた",to:rec.owner,mine:true});
  log("market_offer_made",{item_id:itemId,amount_yen:amount,listing_price_yen:offer.listingPrice,floor_yen:collectionFloor(info.collection.id)});
}
function resolveMyOffer(offer){
  const m=marketState(),rec=marketRecord(offer.itemId),info=marketItemInfo(offer.itemId),wallet=activeWallet();
  const recOffer=rec.offers.find(o=>o.id===offer.id),holdEntry=m.ledger.find(l=>l.offerId===offer.id&&l.type==="offer_hold");
  const threshold=rec.listing?rec.listing.price*MARKET_OFFER_ACCEPT_RATIO:marketFairYen(offer.itemId)*1.1;
  const accepted=!!wallet&&!!info&&!marketOwnedByMe(offer.itemId)&&offer.amount>=threshold;
  m.balance.reserved=Math.max(0,m.balance.reserved-offer.amount);
  offer.status=accepted?"accepted":"declined";offer.resolvedAt=Date.now();
  if(recOffer)recOffer.status=offer.status;
  if(accepted){
    const seller=rec.listing?.seller||rec.owner||marketHandle();
    const entry={tokenId:`PM-${Date.now().toString().slice(-8)}`,itemId:offer.itemId,collectionId:info.collection.id,purchasedAt:now(),acquisitionType:"market_offer",paymentMethod:"balance",priceYen:offer.amount,sellerName:seller,ownerWalletId:wallet.id,ownerAddress:wallet.address};
    if(info.isTicket)entry.ticketId=info.collection.ticketId;
    state.ownedNfts.push(entry);
    rec.listing=null;rec.owner=null;rec.lastSalePrice=offer.amount;rec.lastSaleAt=Date.now();
    if(holdEntry){holdEntry.status="done";holdEntry.title=`オファー成立（${info.name}）`}
    pushMarketActivity({type:"sale",itemId:offer.itemId,price:offer.amount,from:seller,to:"あなた",mine:true});
    log("market_offer_accepted_by_seller",{item_id:offer.itemId,amount_yen:offer.amount,token_id:entry.tokenId,seller});
    pushMarketNotice("offer_accepted","オファーが承諾されました",`${info.name} を ${fmtYen(offer.amount)} で購入しました。PassWalletに追加されています`,offer.itemId);
  }else{
    m.balance.available+=offer.amount;
    if(holdEntry)holdEntry.status="released";
    pushMarketLedger({type:"offer_refund",title:`オファー不成立の返金（${info?.name||"NFT"}）`,amount:offer.amount,itemId:offer.itemId});
    log("market_offer_declined_by_seller",{item_id:offer.itemId,amount_yen:offer.amount,threshold_yen:Math.round(threshold)});
    pushMarketNotice("offer_declined","オファーは見送られました",`${info?.name||"NFT"} へのオファー（${fmtYen(offer.amount)}）は成立しませんでした。確保していた金額は残高に戻りました`,offer.itemId);
  }
  refreshMarketViews();
}
function runBackgroundMarketEvent(){
  const m=marketState(),view=tradeView();
  const busy=new Set([view.page==="item"?view.id:null,state.marketOrder?.itemId,marketModalItemId,...m.myOffers.filter(o=>o.status==="pending").map(o=>o.itemId),...Object.keys(m.favorites)]);
  const others=MARKET_CATALOG.map(item=>item.id).filter(id=>!busy.has(id)&&!marketOwnedByMe(id));
  const listed=others.filter(id=>m.items[id]?.listing),unlisted=others.filter(id=>!m.items[id]?.listing);
  if(!others.length)return;
  const ratio=listed.length/others.length,roll=Math.random();
  const pickId=list=>list[Math.floor(Math.random()*list.length)];
  let event=null;
  if(listed.length&&(roll<.5&&ratio>.5||!unlisted.length)){
    const id=pickId(listed),rec=m.items[id],seller=rec.listing.seller,buyer=marketHandle(seller),price=rec.listing.price;
    rec.lastSalePrice=price;rec.lastSaleAt=Date.now();rec.owner=buyer;rec.listing=null;
    event={type:"sale",itemId:id,price,from:seller,to:buyer};
  }else if(unlisted.length&&(roll<.85||ratio<.5)){
    const id=pickId(unlisted),rec=m.items[id],c=marketItemInfo(id).collection;
    const target=c.kind==="ticket"&&!c.noCap?marketTicketFaceYen(c)*marketRandom(.86,1):marketFairYen(id)*marketRandom(1,1.32);
    rec.owner=rec.owner||marketHandle();
    rec.listing={price:marketBoundPrice(c,target),listedAt:Date.now(),expiresAt:Date.now()+14*MARKET_DAY_MS,seller:rec.owner};
    event={type:"list",itemId:id,price:rec.listing.price,from:rec.owner,to:null};
  }else if(listed.length){
    const id=pickId(listed),rec=m.items[id],c=marketItemInfo(id).collection,price=marketBoundPrice(c,rec.listing.price*.95);
    if(price>=rec.listing.price)return;
    rec.listing.price=price;
    event={type:"price",itemId:id,price,from:rec.listing.seller,to:null};
  }
  if(!event)return;
  pushMarketActivity(event);
  updateTradeLiveTicker();
  if(state.currentApp==="trade"&&!view.page&&!view.query&&view.tab==="activity")renderTrade();
}

/* ---------- 出金 ---------- */
function marketBankLabel(bank){return bank?`${bank.bankName} ${bank.branch} ${bank.type} ****${String(bank.number).slice(-3)}`:"未登録"}
function requestWithdrawal(amount){
  const m=marketState(),bank=m.bankAccount;
  const w={id:marketUid("wd"),amount,fee:WITHDRAW_FEE_YEN,net:amount-WITHDRAW_FEE_YEN,at:Date.now(),completesAt:Date.now()+WITHDRAW_DELAY_MS,status:"processing",bank:marketBankLabel(bank)};
  m.balance.available-=amount;m.balance.pending+=amount;
  m.withdrawals.push(w);
  pushMarketLedger({type:"withdraw",title:`銀行口座へ出金（${w.bank}）`,amount:-amount,fee:w.fee,net:w.net,withdrawalId:w.id,status:"processing"});
  log("market_withdrawal_requested",{withdrawal_id:w.id,amount_yen:amount,fee_yen:w.fee,net_yen:w.net});
  return w;
}
function completeWithdrawal(w){
  const m=marketState();
  w.status="completed";w.completedAt=Date.now();
  m.balance.pending=Math.max(0,m.balance.pending-w.amount);m.balance.withdrawn+=w.net;
  const ledger=m.ledger.find(l=>l.withdrawalId===w.id);if(ledger)ledger.status="done";
  log("market_withdrawal_completed",{withdrawal_id:w.id,net_yen:w.net});
  pushMarketNotice("withdraw","銀行口座への振込が完了しました",`${w.bank} に ${fmtYen(w.net)} を振り込みました`);
  refreshMarketViews();
}
function debitTradeBalance(amount,{title,itemId=null,ticketId=null}){
  const m=marketState();
  if(m.balance.available<amount)return false;
  m.balance.available-=amount;
  pushMarketLedger({type:"purchase",title,amount:-amount,itemId,ticketId});
  return true;
}

/* ---------- 画面の更新 ---------- */
function refreshMarketViews(){if(state.participantId)renderAll();else updateTradeChrome()}
function updateTradeChrome(){
  const balanceValue=document.getElementById("tradeBalanceValue"),side=document.getElementById("sideTradeBalance");
  const balance=state.market?fmtYen(tradeBalance()):"¥0";
  if(balanceValue)balanceValue.textContent=balance;
  if(side)side.textContent=balance;
  const unread=state.market?state.market.notifications.filter(n=>!n.read).length:0,badge=document.getElementById("tradeNoticeCount");
  if(badge){badge.textContent=unread>9?"9+":String(unread);badge.classList.toggle("hidden",!unread)}
}
function updateMarketCountdowns(){
  document.querySelectorAll("[data-offer-countdown]").forEach(el=>{
    const offer=state.market?.myOffers.find(o=>o.id===el.dataset.offerCountdown);
    if(offer?.status==="pending"){const s=Math.max(0,Math.ceil((offer.resolveAt-Date.now())/1000));el.textContent=`出品者の回答待ち（目安：あと約${s}秒）`}
  });
  document.querySelectorAll("[data-withdraw-countdown]").forEach(el=>{
    const w=state.market?.withdrawals.find(item=>item.id===el.dataset.withdrawCountdown);
    if(w?.status==="processing"){const s=Math.max(0,Math.ceil((w.completesAt-Date.now())/1000));el.textContent=`振込手続き中（デモ：あと約${s}秒）`}
  });
}
function updateTradeLiveTicker(){
  const el=document.getElementById("tradeLiveTicker");if(!el)return;
  el.innerHTML=tradeLiveTickerMarkup();
}
function tradeLiveTickerMarkup(){
  const latest=[...marketState().activity].reverse().find(a=>a.type==="sale"||a.type==="list");
  if(!latest)return "";
  const info=marketItemInfo(latest.itemId);if(!info)return "";
  const verb=latest.type==="sale"?"が購入されました":"が出品されました";
  return `<span class="pm-live-dot" aria-hidden="true"></span><b>LIVE</b><span class="pm-live-text"><strong>${escapeHtml(info.name)}</strong>${verb}・${fmtYen(latest.price)}</span><small>${marketRelTime(latest.at)}</small>`;
}

/* ---------- ナビゲーション ---------- */
function setTradeTab(tab){
  const view=tradeView();
  view.tab=tab;view.page=null;view.id=null;view.history=[];view.query="";view.visible=24;
  const search=document.getElementById("tradeSearch");if(search)search.value="";
  log("trade_tab_opened",{tab});
  renderTrade();scrollTradeTop();
}
function tradeNavigate(page,id){
  const view=tradeView();
  view.history.push({page:view.page,id:view.id,tab:view.tab});
  if(view.history.length>12)view.history.splice(0,view.history.length-12);
  view.page=page;view.id=id;view.query="";
  const search=document.getElementById("tradeSearch");if(search)search.value="";
  renderTrade();scrollTradeTop();
}
function tradeBack(){
  const view=tradeView(),previous=view.history.pop();
  if(previous){view.page=previous.page;view.id=previous.id;view.tab=previous.tab||view.tab}else{view.page=null;view.id=null}
  renderTrade();scrollTradeTop();
}
function openTradeItem(itemId){
  if(!marketItemInfo(itemId))return;
  const rec=marketRecord(itemId);if(!marketOwnedByMe(itemId))rec.views=(rec.views||0)+1;
  log("market_item_viewed",{item_id:itemId,listed:!!rec.listing,price_yen:rec.listing?.price||null,mine:marketOwnedByMe(itemId)});
  tradeNavigate("item",itemId);
}
function openTradeCollection(collectionId){
  if(!marketCollection(collectionId))return;
  log("market_collection_viewed",{collection_id:collectionId});
  tradeNavigate("collection",collectionId);
}
function openTradeItemFromApp(itemId){
  const view=tradeView();
  view.tab="account";view.page="item";view.id=itemId;view.history=[{page:null,id:null,tab:"account"}];view.query="";
  closeModal();switchApp("trade");
}
function scrollTradeTop(){
  const app=document.getElementById("tradeApp");if(!app||app.classList.contains("hidden"))return;
  const top=app.getBoundingClientRect().top+window.scrollY-(window.matchMedia("(max-width: 760px)").matches?70:90);
  if(window.scrollY>top)window.scrollTo({top:Math.max(0,top),behavior:"auto"});
}
function toggleMarketFavorite(itemId){
  const m=marketState(),rec=marketRecord(itemId),on=!m.favorites[itemId];
  if(on)m.favorites[itemId]=true;else delete m.favorites[itemId];
  rec.favCount=Math.max(0,(rec.favCount||0)+(on?1:-1));
  log(on?"market_item_favorited":"market_item_unfavorited",{item_id:itemId});
  document.querySelectorAll(`[data-fav="${itemId}"]`).forEach(button=>{button.classList.toggle("on",on);button.setAttribute("aria-pressed",String(on));const count=button.querySelector("b");if(count)count.textContent=rec.favCount});
}

/* ---------- 共通パーツ ---------- */
function tierBadge(info){return info.collection.kind==="ticket"?`<span class="pm-tier ticket">NFT TICKET</span>`:`<span class="pm-tier t${info.tier}">${escapeHtml(info.tierLabel)}</span>`}
function tradeItemCard(itemId){
  const info=marketItemInfo(itemId);if(!info)return "";
  const rec=marketRecord(itemId),mine=marketOwnedByMe(itemId),listing=rec.listing,fav=!!marketState().favorites[itemId];
  const badge=mine?`<span class="pm-own-badge${listing?" listed":""}">${listing?"出品中":"保有中"}</span>`:"";
  return `<article class="pm-card${mine?" mine":""}" data-trade-item="${itemId}" role="button" tabindex="0" aria-label="${escapeHtml(info.name)}の詳細を開く">
    <div class="pm-card-media${info.isTicket?" ticket":""}"><img src="${info.image}" alt="" loading="lazy" decoding="async">${tierBadge(info)}${badge}<button class="pm-fav${fav?" on":""}" data-fav="${itemId}" type="button" aria-pressed="${fav}" aria-label="お気に入り">♥<b>${rec.favCount||0}</b></button></div>
    <div class="pm-card-body"><small>${escapeHtml(info.collection.name)}${info.collection.verified?MARKET_VERIFIED:""}</small><strong>${escapeHtml(info.name)}</strong>
      <div class="pm-card-price">${listing?`<span>価格</span><b>${fmtYen(listing.price)}</b>`:`<span>未出品</span>`}</div>
      <small class="pm-card-last">${rec.lastSalePrice?`最終取引 ${fmtYen(rec.lastSalePrice)}`:"取引履歴なし"}</small></div>
    ${!mine&&listing?`<button class="pm-card-buy" data-trade-action="buy" data-id="${itemId}" type="button">今すぐ購入</button>`:mine&&!listing?`<button class="pm-card-buy sell" data-trade-action="list" data-id="${itemId}" type="button">出品する</button>`:""}
  </article>`;
}
function tradeItemGrid(ids,emptyText="条件に合うアイテムがありません"){
  return ids.length?`<div class="pm-grid">${ids.map(tradeItemCard).join("")}</div>`:`<div class="pm-empty"><span>✦</span><p>${emptyText}</p></div>`;
}
function sortMarketItems(ids,sort){
  const m=marketState(),price=id=>m.items[id]?.listing?.price;
  const listedFirst=(a,b)=>(price(a)?0:1)-(price(b)?0:1);
  const byTier=id=>marketItemInfo(id)?.tier||0;
  const sorters={
    recommended:(a,b)=>listedFirst(a,b)||((m.items[b]?.favCount||0)+byTier(b)*6)-((m.items[a]?.favCount||0)+byTier(a)*6),
    price_asc:(a,b)=>listedFirst(a,b)||(price(a)||0)-(price(b)||0),
    price_desc:(a,b)=>listedFirst(a,b)||(price(b)||0)-(price(a)||0),
    recent:(a,b)=>(m.items[b]?.listing?.listedAt||m.items[b]?.lastSaleAt||0)-(m.items[a]?.listing?.listedAt||m.items[a]?.lastSaleAt||0),
    rarity:(a,b)=>byTier(b)-byTier(a)||listedFirst(a,b)
  };
  return [...ids].sort(sorters[sort]||sorters.recommended);
}
function tradeSortSelect(name,value){
  const options=[["recommended","おすすめ順"],["price_asc","価格の安い順"],["price_desc","価格の高い順"],["recent","新着順"],["rarity","レア度順"]];
  return `<label class="pm-select"><span class="sr-only">並び替え</span><select data-trade-select="${name}">${options.map(([key,label])=>`<option value="${key}" ${key===value?"selected":""}>${label}</option>`).join("")}</select></label>`;
}
function tradeCategoryChips(active,name="category"){
  return `<div class="pm-chips" role="tablist" aria-label="カテゴリ">${MARKET_CATEGORIES.map(([key,label])=>`<button class="pm-chip${key===active?" active":""}" data-trade-chip="${name}" data-value="${key}" type="button" role="tab" aria-selected="${key===active}">${label}</button>`).join("")}</div>`;
}
function tradeCollectionCard(c){
  const floor=collectionFloor(c.id),mosaic=collectionMosaic(c.id);
  return `<article class="pm-collection-card" data-trade-collection="${c.id}" role="button" tabindex="0" aria-label="${escapeHtml(c.name)}を開く">
    <div class="pm-collection-banner${mosaic.length>1?" mosaic":""}">${mosaic.map(src=>`<img src="${src}" alt="" loading="lazy" decoding="async">`).join("")}</div>
    <div class="pm-collection-card-body"><img class="pm-avatar" src="${collectionCover(c.id)}" alt="" loading="lazy"><strong>${escapeHtml(c.name)}${c.verified?MARKET_VERIFIED:""}</strong>
      <dl><div><dt>フロア価格</dt><dd>${floor?fmtYen(floor):"—"}</dd></div><div><dt>7日間の取引額</dt><dd>${fmtYenCompact(collectionVolume(c.id))}</dd></div></dl></div>
  </article>`;
}
function tradeChangeLabel(change){
  const pct=Math.abs(change*100).toFixed(1);
  if(Math.abs(change)<.0005)return `<span class="pm-change flat">±0.0%</span>`;
  return change>0?`<span class="pm-change up">▲ ${pct}%</span>`:`<span class="pm-change down">▼ ${pct}%</span>`;
}
function tradeActivityLabel(type){return {sale:"販売",list:"出品",cancel:"出品取消",price:"価格変更",offer:"オファー",mint:"発行"}[type]||type}
function tradeActivityIcon(type){return {sale:"¥",list:"⇡",cancel:"×",price:"↘",offer:"✋",mint:"✦"}[type]||"・"}
function tradeActivityRows(events,{showItem=true}={}){
  if(!events.length)return `<div class="pm-empty compact"><p>まだアクティビティはありません</p></div>`;
  return `<div class="pm-activity${showItem?"":" no-item"}" role="table" aria-label="アクティビティ">
    <div class="pm-activity-row head" role="row"><span role="columnheader">イベント</span>${showItem?'<span role="columnheader">アイテム</span>':""}<span role="columnheader">価格</span><span role="columnheader">送り手</span><span role="columnheader">受け手</span><span role="columnheader">日時</span></div>
    ${events.map(a=>{
      const info=marketItemInfo(a.itemId);
      return `<div class="pm-activity-row${a.mine?" mine":""}" role="row">
        <span class="pm-event ${a.type}" role="cell"><i aria-hidden="true">${tradeActivityIcon(a.type)}</i>${tradeActivityLabel(a.type)}</span>
        ${showItem?`<span class="pm-activity-item" role="cell">${info?`<button data-trade-item="${a.itemId}" type="button"><img src="${info.image}" alt="" loading="lazy"><span>${escapeHtml(info.name)}<small>${escapeHtml(info.collection.name)}</small></span></button>`:"—"}</span>`:""}
        <span class="pm-activity-price" role="cell">${a.price?fmtYen(a.price):"—"}</span>
        <span class="pm-activity-user from${a.from==="あなた"?" me":""}" role="cell"><small>送り手</small>${escapeHtml(a.from||"—")}</span>
        <span class="pm-activity-user to${a.to==="あなた"?" me":""}" role="cell"><small>受け手</small>${escapeHtml(a.to||"—")}</span>
        <span class="pm-activity-time" role="cell">${marketRelTime(a.at)}</span>
      </div>`;
    }).join("")}
  </div>`;
}
function tradeChartBlock(collectionId,title){
  const points=collectionHistory(collectionId),table=points.filter((_,i)=>i%5===4||i===points.length-1);
  return `<section class="pm-panel pm-chart-panel">
    <div class="pm-panel-head"><h2>${title}</h2><span>過去30日</span></div>
    <div class="pm-chart" data-chart="${collectionId}" role="img" aria-label="${escapeHtml(marketCollection(collectionId).name)}の過去30日の価格推移"></div>
    <details class="pm-chart-table"><summary>データを表で見る</summary><table><thead><tr><th>日付</th><th>価格</th></tr></thead><tbody>${table.map(p=>`<tr><td>${new Date(p.at).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"})}</td><td>${fmtYen(p.value)}</td></tr>`).join("")}</tbody></table></details>
  </section>`;
}
function hydrateTradeCharts(){
  document.querySelectorAll("#tradeContent [data-chart]").forEach(container=>{
    const points=collectionHistory(container.dataset.chart),width=Math.max(260,container.clientWidth),height=190;
    const pad={l:58,r:62,t:16,b:28},values=points.map(p=>p.value);
    let min=Math.min(...values),max=Math.max(...values);
    const span=max-min||max*.1||1;min=Math.max(0,min-span*.25);max=max+span*.2;
    const raw=(max-min)/3,mag=10**Math.floor(Math.log10(raw)),step=[1,2,2.5,5,10].map(s=>s*mag).find(s=>s>=raw);
    const lo=Math.floor(min/step)*step,hi=Math.ceil(max/step)*step;
    const x=i=>pad.l+i*(width-pad.l-pad.r)/(points.length-1),y=v=>pad.t+(hi-v)/(hi-lo||1)*(height-pad.t-pad.b);
    const line=points.map((p,i)=>`${i?"L":"M"}${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`).join(" ");
    const ticks=[];for(let v=lo;v<=hi+step/2;v+=step)ticks.push(v);
    const last=points[points.length-1],dayLabel=at=>new Date(at).toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"});
    container.innerHTML=`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-hidden="true">
      ${ticks.map(v=>`<line x1="${pad.l}" x2="${width-pad.r}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" class="pm-grid-line"/><text x="${pad.l-8}" y="${(y(v)+4).toFixed(1)}" text-anchor="end" class="pm-axis">${fmtYenCompact(v)}</text>`).join("")}
      <path d="${line} L${x(points.length-1).toFixed(1)} ${y(lo).toFixed(1)} L${pad.l} ${y(lo).toFixed(1)} Z" class="pm-area"/>
      <path d="${line}" class="pm-line"/>
      <text x="${pad.l}" y="${height-8}" class="pm-axis">${dayLabel(points[0].at)}</text><text x="${(pad.l+width-pad.r)/2}" y="${height-8}" text-anchor="middle" class="pm-axis">${dayLabel(points[15].at)}</text><text x="${width-pad.r}" y="${height-8}" text-anchor="end" class="pm-axis">今日</text>
      <circle cx="${x(points.length-1).toFixed(1)}" cy="${y(last.value).toFixed(1)}" r="4.5" class="pm-end-dot"/>
      <text x="${(x(points.length-1)+9).toFixed(1)}" y="${(y(last.value)+4).toFixed(1)}" class="pm-end-label">${fmtYenCompact(last.value)}</text>
      <line class="pm-crosshair" x1="0" x2="0" y1="${pad.t}" y2="${height-pad.b}" visibility="hidden"/>
      <circle class="pm-hover-dot" r="4.5" visibility="hidden"/>
      <rect class="pm-hit" x="${pad.l}" y="0" width="${width-pad.l-pad.r}" height="${height}" fill="transparent"/>
    </svg><div class="pm-tooltip" hidden><strong></strong><span></span></div>`;
    const svgEl=container.querySelector("svg"),tip=container.querySelector(".pm-tooltip"),cross=container.querySelector(".pm-crosshair"),dot=container.querySelector(".pm-hover-dot");
    const move=event=>{
      const rect=svgEl.getBoundingClientRect(),px=event.clientX-rect.left;
      const i=Math.max(0,Math.min(points.length-1,Math.round((px-pad.l)/((width-pad.l-pad.r)/(points.length-1)))));
      const cx=x(i),cy=y(points[i].value);
      cross.setAttribute("x1",cx);cross.setAttribute("x2",cx);cross.setAttribute("visibility","visible");
      dot.setAttribute("cx",cx);dot.setAttribute("cy",cy);dot.setAttribute("visibility","visible");
      tip.hidden=false;tip.querySelector("strong").textContent=fmtYen(points[i].value);tip.querySelector("span").textContent=i===points.length-1?"今日（現在のフロア価格）":dayLabel(points[i].at);
      tip.style.left=`${Math.min(width-tip.offsetWidth-4,Math.max(4,cx-tip.offsetWidth/2))}px`;tip.style.top=`${Math.max(0,cy-tip.offsetHeight-12)}px`;
    };
    const leave=()=>{tip.hidden=true;cross.setAttribute("visibility","hidden");dot.setAttribute("visibility","hidden")};
    const hit=container.querySelector(".pm-hit");
    hit.addEventListener("pointermove",move);hit.addEventListener("pointerdown",move);hit.addEventListener("pointerleave",leave);
  });
}

/* ---------- ページ：探す ---------- */
function tradeExplorePage(){
  const view=tradeView(),m=marketState();
  const collections=MARKET_COLLECTIONS.filter(c=>view.category==="all"||c.category===view.category);
  const allIds=allMarketItemIds();
  const listedCount=allIds.filter(id=>m.items[id]?.listing).length;
  const volume=MARKET_COLLECTIONS.reduce((sum,c)=>sum+collectionVolume(c.id),0);
  const artCollections=MARKET_COLLECTIONS.filter(c=>c.kind==="art");
  const spotlight=artCollections[Math.floor(Date.now()/MARKET_DAY_MS)%artCollections.length];
  const spotlightMosaic=MARKET_CATALOG.filter(item=>item.collectionId===spotlight.id).slice(0,4).map(item=>marketItemInfo(item.id).image);
  const trending=[...MARKET_COLLECTIONS].sort((a,b)=>collectionVolume(b.id)-collectionVolume(a.id)).slice(0,8);
  let ids=allIds.filter(id=>{const info=marketItemInfo(id);return info&&(view.category==="all"||info.collection.category===view.category)&&(!view.listedOnly||m.items[id]?.listing)});
  ids=sortMarketItems(ids,view.sort);
  const visible=ids.slice(0,view.visible);
  const spotlightFloor=collectionFloor(spotlight.id);
  return `
    <section class="pm-hero">
      <div class="pm-hero-copy">
        <span class="pm-eyebrow">PASSMARKET · 日本円でNFTを売買</span>
        <h1>欲しいNFTを、<br>いつもの決済で。</h1>
        <p>NFTチケット、アート、ゲーム、御朱印、会員権まで。クレジットカードやQRコード決済で購入でき、保有するNFTは自分で決めた価格で出品できます。売上は残高に貯まり、いつでも銀行口座へ出金できます。</p>
        <div class="pm-hero-actions"><button class="pm-btn primary" data-trade-action="scroll-items" type="button">NFTを探す</button><button class="pm-btn ghost" data-trade-tab="account" type="button">保有NFTを出品する</button></div>
        <dl class="pm-hero-stats"><div><dt>コレクション</dt><dd>${MARKET_COLLECTIONS.length}</dd></div><div><dt>出品中</dt><dd>${listedCount}</dd></div><div><dt>7日間の取引額</dt><dd>${fmtYenCompact(volume)}</dd></div></dl>
      </div>
      <article class="pm-spotlight" data-trade-collection="${spotlight.id}" role="button" tabindex="0" aria-label="${escapeHtml(spotlight.name)}を開く">
        <div class="pm-spotlight-art">${spotlightMosaic.map(src=>`<img src="${src}" alt="" decoding="async">`).join("")}</div>
        <div class="pm-spotlight-info"><span>今日の注目コレクション</span><strong>${escapeHtml(spotlight.name)}${spotlight.verified?MARKET_VERIFIED:""}</strong><small>by ${escapeHtml(spotlight.creator)}</small><dl><div><dt>フロア価格</dt><dd>${spotlightFloor?fmtYen(spotlightFloor):"—"}</dd></div><div><dt>24時間</dt><dd>${tradeChangeLabel(collectionChange(spotlight.id))}</dd></div></dl></div>
      </article>
    </section>
    <div id="tradeLiveTicker" class="pm-live" aria-live="off">${tradeLiveTickerMarkup()}</div>
    ${tradeCategoryChips(view.category)}
    <section class="pm-section">
      <div class="pm-section-head"><div><span class="kicker">COLLECTIONS</span><h2>注目のコレクション</h2></div></div>
      <div class="pm-collection-row">${collections.map(tradeCollectionCard).join("")||'<div class="pm-empty compact"><p>このカテゴリのコレクションはありません</p></div>'}</div>
    </section>
    <section class="pm-section">
      <div class="pm-section-head"><div><span class="kicker">TRENDING</span><h2>トレンドのコレクション</h2></div><button class="pm-link" data-trade-tab="rankings" type="button">ランキングを見る →</button></div>
      <div class="pm-trend-grid">${trending.map((c,i)=>`<button class="pm-trend-row" data-trade-collection="${c.id}" type="button"><span class="pm-rank">${i+1}</span><img src="${collectionCover(c.id)}" alt="" loading="lazy"><span class="pm-trend-name"><strong>${escapeHtml(c.name)}${c.verified?MARKET_VERIFIED:""}</strong><small>フロア ${collectionFloor(c.id)?fmtYen(collectionFloor(c.id)):"—"}</small></span><span class="pm-trend-value"><strong>${fmtYenCompact(collectionVolume(c.id))}</strong>${tradeChangeLabel(collectionChange(c.id))}</span></button>`).join("")}</div>
    </section>
    <section class="pm-section" id="tradeItemsSection">
      <div class="pm-section-head"><div><span class="kicker">ITEMS</span><h2>${view.listedOnly?"出品中のアイテム":"すべてのアイテム"}</h2></div><div class="pm-controls"><label class="pm-toggle"><input type="checkbox" data-trade-toggle="listedOnly" ${view.listedOnly?"checked":""}><span>出品中のみ</span></label>${tradeSortSelect("sort",view.sort)}</div></div>
      ${tradeItemGrid(visible)}
      ${ids.length>visible.length?`<button class="pm-more" data-trade-action="more" type="button">さらに表示（残り${ids.length-visible.length}件）</button>`:""}
    </section>
    <section class="pm-section">
    <div class="pm-section-head"><div><span class="kicker">HOW IT WORKS</span><h2>PassMarketの使い方</h2></div><button class="pm-link" data-trade-action="guide" type="button">はじめてガイドを見る</button></div>
    <div class="pm-how">
      <div><span>1</span><h3>いつもの決済で購入</h3><p>クレジットカード、PayPay、その他のQRコード決済、売上残高で購入。NFTはPassWalletに届きます。</p></div>
      <div><span>2</span><h3>自分で価格を決めて出品</h3><p>相場の範囲内の価格なら、数十秒で他のユーザーが購入します。高すぎる場合はオファーが届くことも。</p></div>
      <div><span>3</span><h3>売上を銀行口座へ</h3><p>売上は手数料を差し引いて売上残高に貯まり、好きなタイミングで銀行口座へ出金できます。</p></div>
    </div>
    </section>`;
}

/* ---------- ページ：コレクション ---------- */
function tradeCollectionPage(collectionId){
  const c=marketCollection(collectionId);if(!c)return tradeMissingPage();
  const view=tradeView(),m=marketState(),floor=collectionFloor(c.id),ids=collectionItemIds(c.id);
  const listedCount=ids.filter(id=>m.items[id]?.listing).length;
  let shown=ids.filter(id=>!view.collectionListedOnly||m.items[id]?.listing);
  shown=sortMarketItems(shown,view.collectionSort);
  const face=marketTicketFaceYen(c),mosaic=collectionMosaic(c.id,4);
  const events=[...m.activity].reverse().filter(a=>marketItemCollectionId(a.itemId)===c.id).slice(0,8);
  return `
    <button class="pm-back" data-trade-action="back" type="button">← 戻る</button>
    <section class="pm-collection-hero">
      <div class="pm-collection-banner large${mosaic.length>1?" mosaic":""}">${mosaic.map(src=>`<img src="${src}" alt="" decoding="async">`).join("")}</div>
      <div class="pm-collection-head"><img class="pm-avatar large" src="${collectionCover(c.id)}" alt=""><div><span class="pm-category-pill">${marketCategoryLabel(c.category)}</span><h1>${escapeHtml(c.name)}${c.verified?MARKET_VERIFIED:""}</h1><p>by <strong>${escapeHtml(c.creator)}</strong></p></div></div>
      <p class="pm-desc">${escapeHtml(c.description)}</p>
      <dl class="pm-stats">
        <div><dt>フロア価格</dt><dd>${floor?fmtYen(floor):"—"}</dd></div>
        <div><dt>24時間の変動</dt><dd>${tradeChangeLabel(collectionChange(c.id))}</dd></div>
        <div><dt>7日間の取引額</dt><dd>${fmtYenCompact(collectionVolume(c.id))}</dd></div>
        <div><dt>発行数</dt><dd>${c.supply.toLocaleString("ja-JP")}</dd></div>
        <div><dt>保有者</dt><dd>${collectionOwners(c).toLocaleString("ja-JP")}</dd></div>
        <div><dt>出品中</dt><dd>${listedCount}件</dd></div>
        <div><dt>クリエイター収益</dt><dd>${(c.royalty*100).toFixed(1).replace(/\.0$/,"")}%</dd></div>
      </dl>
      ${face?`<div class="pm-note ticket"><b>公式リセール</b><span>主催者の設定により、定価（${fmtYen(face)}）を超える価格では出品できません。NFTのスマートコントラクトで転売価格の上限を管理しています。</span></div>`:""}
      ${c.category==="local"?`<div class="pm-note local"><b>地域への還元</b><span>売買が成立するたびに、販売額の${Math.round(c.royalty*100)}%がクリエイター収益として地域の観光振興に還元されます。</span></div>`:""}
    </section>
    ${tradeChartBlock(c.id,"フロア価格の推移")}
    <section class="pm-section">
      <div class="pm-section-head"><div><span class="kicker">ITEMS</span><h2>アイテム <small>${shown.length}件</small></h2></div><div class="pm-controls"><label class="pm-toggle"><input type="checkbox" data-trade-toggle="collectionListedOnly" ${view.collectionListedOnly?"checked":""}><span>出品中のみ</span></label>${tradeSortSelect("collectionSort",view.collectionSort)}</div></div>
      ${tradeItemGrid(shown)}
    </section>
    <section class="pm-section"><div class="pm-section-head"><div><span class="kicker">ACTIVITY</span><h2>最近のアクティビティ</h2></div></div>${tradeActivityRows(events)}</section>`;
}

/* ---------- ページ：アイテム ---------- */
function tradeItemPage(itemId){
  const info=marketItemInfo(itemId);if(!info)return tradeMissingPage();
  const c=info.collection,m=marketState(),rec=marketRecord(itemId),entry=myEntryForItem(itemId),mine=!!entry,listing=rec.listing;
  const fav=!!m.favorites[itemId],floor=collectionFloor(c.id),range=marketPriceRange(itemId);
  const myPending=m.myOffers.find(o=>o.itemId===itemId&&o.status==="pending");
  const lastSold=[...state.ownedNfts].reverse().find(e=>e.soldAt&&marketItemIdForEntry(e)===itemId);
  const owner=mine?"あなた":rec.owner||"—";
  let priceBox;
  if(mine&&listing){
    const zoneNote={low:"相場より安い価格で出品中です。",fair:"売れやすい価格で出品中です。",high:`相場より高い価格です。${fmtYen(range.low)}〜${fmtYen(range.high)}に変更すると売れやすくなります。`}[listing.zone]||"";
    priceBox=`<span class="pm-price-label">あなたの出品価格</span><strong class="pm-price">${fmtYen(listing.price)}</strong>
      <p class="pm-price-sub">${zoneNote}出品期限：${new Date(listing.expiresAt).toLocaleDateString("ja-JP")}</p>
      <div class="pm-price-actions"><button class="pm-btn primary" data-trade-action="edit" data-id="${itemId}" type="button">価格を変更</button><button class="pm-btn ghost" data-trade-action="cancel" data-id="${itemId}" type="button">出品を取り消す</button></div>`;
  }else if(mine){
    priceBox=`<span class="pm-price-label">あなたが保有しています</span><strong class="pm-price small">売れやすい価格帯 ${fmtYen(range.low)}〜${fmtYen(range.high)}</strong>
      <p class="pm-price-sub">${floor?`フロア価格 ${fmtYen(floor)}・`:""}${rec.lastSalePrice?`最終取引 ${fmtYen(rec.lastSalePrice)}`:"取引履歴はまだありません"}</p>
      ${range.face?`<p class="pm-price-sub">公式リセールの上限価格：${fmtYen(range.cap)}（定価）</p>`:""}
      <div class="pm-price-actions"><button class="pm-btn primary" data-trade-action="list" data-id="${itemId}" type="button">出品する</button>${info.isTicket?`<button class="pm-btn ghost" data-trade-action="open-wallet" data-id="${itemId}" type="button">PassWalletで開く</button>`:""}</div>`;
  }else if(listing){
    priceBox=`<span class="pm-price-label">現在の価格</span><strong class="pm-price">${fmtYen(listing.price)}</strong>
      <p class="pm-price-sub">出品者 ${escapeHtml(listing.seller)}・出品期限 ${new Date(listing.expiresAt).toLocaleDateString("ja-JP")}</p>
      ${myPending?`<div class="pm-status pending"><span class="pm-pulse" aria-hidden="true"></span><span data-offer-countdown="${myPending.id}">出品者の回答待ち</span></div>`:""}
      <div class="pm-price-actions"><button class="pm-btn primary" data-trade-action="buy" data-id="${itemId}" type="button">今すぐ購入</button><button class="pm-btn ghost" data-trade-action="offer" data-id="${itemId}" type="button" ${myPending?"disabled":""}>オファーを出す</button></div>
      <p class="pm-pay-methods"><span>CARD</span><span class="paypay">PayPay</span><span>QR決済</span><span>売上残高</span></p>`;
  }else{
    priceBox=`<span class="pm-price-label">現在は出品されていません</span><strong class="pm-price small">${rec.lastSalePrice?`最終取引 ${fmtYen(rec.lastSalePrice)}`:"取引履歴なし"}</strong>
      ${lastSold?`<p class="pm-price-sub">あなたが ${fmtYen(lastSold.soldPriceYen)} で売却しました（${new Date(lastSold.soldAt).toLocaleString("ja-JP")}）</p>`:`<p class="pm-price-sub">保有者にオファーを送って、購入を打診できます。</p>`}
      ${myPending?`<div class="pm-status pending"><span class="pm-pulse" aria-hidden="true"></span><span data-offer-countdown="${myPending.id}">出品者の回答待ち</span></div>`:""}
      <div class="pm-price-actions"><button class="pm-btn primary" data-trade-action="offer" data-id="${itemId}" type="button" ${myPending?"disabled":""}>オファーを出す</button></div>`;
  }
  const offers=[...rec.offers].reverse().filter(o=>o.status==="open"||o.mine).slice(0,8);
  const events=[...m.activity].reverse().filter(a=>a.itemId===itemId).slice(0,10);
  const contract=marketContractAddress(c.id);
  return `
    <button class="pm-back" data-trade-action="back" type="button">← 戻る</button>
    <div class="pm-item-layout">
      <div class="pm-item-media${info.isTicket?" ticket":""}"><img src="${info.image}" alt="${escapeHtml(info.name)}">${tierBadge(info)}<button class="pm-fav large${fav?" on":""}" data-fav="${itemId}" type="button" aria-pressed="${fav}" aria-label="お気に入り">♥<b>${rec.favCount||0}</b></button></div>
      <div class="pm-item-main">
        <button class="pm-item-collection" data-trade-collection="${c.id}" type="button">${escapeHtml(c.name)}${c.verified?MARKET_VERIFIED:""}</button>
        <h1>${escapeHtml(info.name)}</h1>
        <div class="pm-item-meta"><span>所有者 <b class="${mine?"me":""}">${escapeHtml(owner)}</b></span><span>👁 ${rec.views||0}回表示</span><span>♥ ${rec.favCount||0}</span></div>
        <section class="pm-price-box">${priceBox}</section>
        <section class="pm-panel"><div class="pm-panel-head"><h2>オファー</h2><span>${offers.length}件</span></div>
          ${offers.length?`<div class="pm-offers">${offers.map(o=>`<div class="pm-offer-row ${o.status}"><span><strong>${fmtYen(o.amount)}</strong><small>${floor?`フロア比 ${Math.round((o.amount/floor-1)*100)>=0?"+":""}${Math.round((o.amount/floor-1)*100)}%`:""}</small></span><span>${escapeHtml(o.from)}<small>${marketRelTime(o.at)}</small></span><span>${mine&&!o.mine&&o.status==="open"?`<button class="pm-mini solid" data-trade-action="accept-offer" data-id="${itemId}" data-offer="${o.id}" type="button">承諾</button><button class="pm-mini" data-trade-action="decline-offer" data-id="${itemId}" data-offer="${o.id}" type="button">辞退</button>`:`<em>${{open:"受付中",accepted:"成立",declined:"不成立",closed:"終了",expired:"期限切れ"}[o.status]||""}</em>`}</span></div>`).join("")}</div>`:`<p class="pm-muted">まだオファーはありません</p>`}
        </section>
      </div>
    </div>
    ${tradeChartBlock(c.id,"価格推移（コレクションのフロア価格）")}
    <div class="pm-item-lower">
      <section class="pm-panel"><div class="pm-panel-head"><h2>特性</h2><span>${info.traits.length}件</span></div><div class="pm-traits">${info.traits.map(t=>`<div><span>${escapeHtml(t.label)}</span><strong>${escapeHtml(t.value)}</strong>${t.share?`<small>保有率 ${t.share}%</small>`:""}</div>`).join("")}</div></section>
      <section class="pm-panel"><div class="pm-panel-head"><h2>詳細</h2></div><dl class="pm-details">
        <div><dt>コントラクト</dt><dd>${contract.slice(0,8)}…${contract.slice(-4)}</dd></div>
        <div><dt>トークンID</dt><dd>${escapeHtml(info.tokenLabel)}</dd></div>
        <div><dt>トークン規格</dt><dd>ERC-721</dd></div>
        <div><dt>クリエイター</dt><dd>${escapeHtml(c.creator)}</dd></div>
        <div><dt>クリエイター収益</dt><dd>${(c.royalty*100).toFixed(1).replace(/\.0$/,"")}%</dd></div>
        <div><dt>マーケット手数料</dt><dd>${(MARKET_FEE_RATE*100).toFixed(1)}%</dd></div>
      </dl><p class="pm-muted">${escapeHtml(c.description)}</p></section>
    </div>
    <section class="pm-section"><div class="pm-section-head"><div><span class="kicker">ITEM ACTIVITY</span><h2>このアイテムのアクティビティ</h2></div></div>${tradeActivityRows(events,{showItem:false})}</section>`;
}
function tradeMissingPage(){return `<button class="pm-back" data-trade-action="back" type="button">← 戻る</button><div class="pm-empty"><span>?</span><p>このページは表示できません</p></div>`}

/* ---------- ページ：ランキング ---------- */
function tradeRankingsPage(){
  const view=tradeView();
  const sorters={volume:c=>collectionVolume(c.id),floor:c=>collectionFloor(c.id)||0,change:c=>collectionChange(c.id)};
  const rows=MARKET_COLLECTIONS.filter(c=>view.rankCategory==="all"||c.category===view.rankCategory).sort((a,b)=>sorters[view.rankSort](b)-sorters[view.rankSort](a));
  return `
    <div class="dashboard-title"><div><span class="kicker">RANKINGS</span><h1>コレクションランキング</h1><p>取引額・フロア価格・価格変動でコレクションを比較できます。</p></div></div>
    ${tradeCategoryChips(view.rankCategory,"rankCategory")}
    <div class="pm-rank-controls"><span>並び替え</span>${[["volume","7日間の取引額"],["floor","フロア価格"],["change","24時間の変動"]].map(([key,label])=>`<button class="pm-chip small${view.rankSort===key?" active":""}" data-trade-chip="rankSort" data-value="${key}" type="button">${label}</button>`).join("")}</div>
    <div class="pm-rank-table" role="table" aria-label="コレクションランキング">
      <div class="pm-rank-row head" role="row"><span role="columnheader">#</span><span role="columnheader">コレクション</span><span role="columnheader">フロア価格</span><span role="columnheader">24時間</span><span role="columnheader">7日間の取引額</span><span role="columnheader">出品中</span><span role="columnheader">保有者</span></div>
      ${rows.map((c,i)=>`<button class="pm-rank-row" data-trade-collection="${c.id}" type="button" role="row"><span class="pm-rank" role="cell">${i+1}</span><span class="pm-rank-name" role="cell"><img src="${collectionCover(c.id)}" alt="" loading="lazy"><span><strong>${escapeHtml(c.name)}${c.verified?MARKET_VERIFIED:""}</strong><small>${marketCategoryLabel(c.category)}</small></span></span><span role="cell"><small>フロア</small>${collectionFloor(c.id)?fmtYen(collectionFloor(c.id)):"—"}</span><span role="cell"><small>24時間</small>${tradeChangeLabel(collectionChange(c.id))}</span><span role="cell"><small>7日間</small>${fmtYenCompact(collectionVolume(c.id))}</span><span role="cell"><small>出品中</small>${collectionListings(c.id).length}</span><span role="cell"><small>保有者</small>${collectionOwners(c).toLocaleString("ja-JP")}</span></button>`).join("")}
    </div>`;
}

/* ---------- ページ：アクティビティ ---------- */
function tradeActivityPage(){
  const view=tradeView(),filters=[["all","すべて"],["sale","販売"],["list","出品"],["offer","オファー"],["mine","自分の取引"]];
  const events=[...marketState().activity].reverse().filter(a=>view.activityFilter==="all"||(view.activityFilter==="mine"?a.mine:a.type===view.activityFilter)).slice(0,60);
  return `
    <div class="dashboard-title"><div><span class="kicker">ACTIVITY</span><h1>マーケットのアクティビティ</h1><p>PassMarket全体の販売・出品・オファーをリアルタイムで表示します。</p></div><span class="pm-live-badge"><i aria-hidden="true"></i>LIVE</span></div>
    <div class="pm-chips">${filters.map(([key,label])=>`<button class="pm-chip${view.activityFilter===key?" active":""}" data-trade-chip="activityFilter" data-value="${key}" type="button">${label}</button>`).join("")}</div>
    ${tradeActivityRows(events)}`;
}

/* ---------- ページ：マイページ ---------- */
function tradeAccountPage(){
  const view=tradeView(),wallet=activeWallet(),m=marketState();
  if(!wallet)return `<div class="pm-empty large"><span>P</span><h2>PassWalletがまだありません</h2><p>Ticket Store または PassMarket でNFTを購入すると、パスキー（顔認証・指紋認証）でPassWalletが作成されます。</p><button class="pm-btn primary" data-trade-tab="explore" type="button">マーケットでNFTを探す</button></div>`;
  const entries=myMarketEntries();
  const ownedIds=entries.map(({owned})=>marketItemIdForEntry(owned)).filter(id=>marketItemInfo(id));
  const listedIds=ownedIds.filter(id=>marketRecord(id).listing);
  const soldEntries=state.ownedNfts.filter(e=>e.soldAt);
  const incoming=ownedIds.flatMap(id=>marketRecord(id).offers.filter(o=>!o.mine&&o.status==="open").map(o=>({...o,itemId:id})));
  const favIds=Object.keys(m.favorites).filter(id=>marketItemInfo(id));
  const tabs=[["owned","保有アイテム",ownedIds.length],["listed","出品中",listedIds.length],["offers","オファー",incoming.length+m.myOffers.filter(o=>o.status==="pending").length],["favorites","お気に入り",favIds.length],["history","取引履歴",null]];
  let body="";
  if(view.accountTab==="owned")body=ownedIds.length?`<div class="notice info pm-inline-note">保有しているNFTは、自分で価格を決めて出品できます。相場の範囲内なら数十秒で売れます。</div>${tradeItemGrid(ownedIds)}`:`<div class="pm-empty"><span>✦</span><p>保有しているNFTはありません。マーケットやTicket StoreでNFTを購入すると表示されます。</p></div>`;
  if(view.accountTab==="listed")body=listedIds.length?`<div class="pm-listing-list">${listedIds.map(id=>{const info=marketItemInfo(id),l=marketRecord(id).listing;return `<div class="pm-listing-row"><button class="pm-listing-item" data-trade-item="${id}" type="button"><img src="${info.image}" alt=""><span><strong>${escapeHtml(info.name)}</strong><small>${escapeHtml(info.collection.name)}</small></span></button><span class="pm-listing-price">${fmtYen(l.price)}</span><span class="pm-listing-actions"><button class="pm-mini" data-trade-action="edit" data-id="${id}" type="button">価格を変更</button><button class="pm-mini" data-trade-action="cancel" data-id="${id}" type="button">取り消す</button></span></div>`}).join("")}</div>`:`<div class="pm-empty"><span>⇡</span><p>出品中のNFTはありません。「保有アイテム」から出品できます。</p></div>`;
  if(view.accountTab==="offers"){
    const mine=[...m.myOffers].reverse().slice(0,20);
    body=`<section class="pm-panel"><div class="pm-panel-head"><h2>届いたオファー</h2><span>${incoming.length}件</span></div>${incoming.length?`<div class="pm-offers">${incoming.map(o=>{const info=marketItemInfo(o.itemId);return `<div class="pm-offer-row open"><span><strong>${fmtYen(o.amount)}</strong><small>${escapeHtml(info.name)}</small></span><span>${escapeHtml(o.from)}<small>${marketRelTime(o.at)}</small></span><span><button class="pm-mini solid" data-trade-action="accept-offer" data-id="${o.itemId}" data-offer="${o.id}" type="button">承諾</button><button class="pm-mini" data-trade-action="decline-offer" data-id="${o.itemId}" data-offer="${o.id}" type="button">辞退</button></span></div>`}).join("")}</div>`:`<p class="pm-muted">届いているオファーはありません。相場より高い価格で出品すると、購入希望者からオファーが届くことがあります。</p>`}</section>
      <section class="pm-panel"><div class="pm-panel-head"><h2>送ったオファー</h2><span>${mine.length}件</span></div>${mine.length?`<div class="pm-offers">${mine.map(o=>{const info=marketItemInfo(o.itemId);return `<div class="pm-offer-row ${o.status}"><span><strong>${fmtYen(o.amount)}</strong><small>${escapeHtml(info?.name||"—")}</small></span><span>${o.status==="pending"?`<small data-offer-countdown="${o.id}">出品者の回答待ち</small>`:`<small>${marketRelTime(o.resolvedAt||o.at)}</small>`}</span><span><em>${{pending:"回答待ち",accepted:"成立",declined:"不成立"}[o.status]}</em></span></div>`}).join("")}</div>`:`<p class="pm-muted">送ったオファーはありません。気になるアイテムのページから、売上残高を使ってオファーを送れます。</p>`}</section>`;
  }
  if(view.accountTab==="favorites")body=tradeItemGrid(favIds,"お気に入りに登録したアイテムはありません。アイテムの ♥ を押すと登録できます");
  if(view.accountTab==="history")body=tradeActivityRows([...m.activity].reverse().filter(a=>a.mine).slice(0,40));
  return `
    <section class="pm-profile">
      <div class="pm-profile-avatar" aria-hidden="true">${escapeHtml(wallet.address.slice(2,4))}</div>
      <div class="pm-profile-copy"><span class="kicker">MY PAGE</span><h1>あなたのアカウント</h1><p>PassWallet · ${escapeHtml(shortWalletAddress(wallet.address))}</p></div>
      <dl class="pm-profile-stats"><div><dt>保有</dt><dd>${ownedIds.length}</dd></div><div><dt>出品中</dt><dd>${listedIds.length}</dd></div><div><dt>売却</dt><dd>${soldEntries.length}</dd></div><div><dt>累計売上</dt><dd>${fmtYen(m.balance.earned)}</dd></div></dl>
    </section>
    <div class="pm-subtabs" role="tablist">${tabs.map(([key,label,count])=>`<button class="${view.accountTab===key?"active":""}" data-trade-chip="accountTab" data-value="${key}" type="button" role="tab" aria-selected="${view.accountTab===key}">${label}${count!==null?`<b>${count}</b>`:""}</button>`).join("")}</div>
    ${body}`;
}
function myMarketEntries(){
  const wallet=activeWallet();
  return state.ownedNfts.map((owned,index)=>({owned,index})).filter(({owned})=>!owned.soldAt&&(!wallet||nftOwnerWalletId(owned)===wallet.id));
}

/* ---------- ページ：売上・出金 ---------- */
function tradeBalancePage(){
  const m=marketState(),b=m.balance,bank=m.bankAccount;
  const ledger=[...m.ledger].reverse().slice(0,40);
  const lastSale=[...m.ledger].reverse().find(l=>l.type==="sale");
  const statusLabel={done:"完了",processing:"振込手続き中",hold:"確保中",released:"返金済み"};
  return `
    <div class="dashboard-title"><div><span class="kicker">PROCEEDS</span><h1>売上・出金</h1><p>NFTの売上は手数料を差し引いて売上残高に貯まり、好きなタイミングで銀行口座へ出金できます。</p></div></div>
    <section class="pm-balance-grid">
      <div class="pm-balance-card"><span>売上残高（出金可能額）</span><strong>${fmtYen(b.available)}</strong><dl><div><dt>累計売上</dt><dd>${fmtYen(b.earned)}</dd></div><div><dt>オファーで確保中</dt><dd>${fmtYen(b.reserved)}</dd></div><div><dt>出金手続き中</dt><dd>${fmtYen(b.pending)}</dd></div></dl>
        <div class="pm-balance-actions"><button class="pm-btn light" data-trade-action="withdraw" type="button">銀行口座へ出金する</button><button class="pm-btn outline-light" data-trade-tab="account" type="button">NFTを出品する</button></div></div>
      <div class="pm-bank-card"><div class="pm-panel-head"><h2>振込先口座</h2>${bank?`<button class="pm-link" data-trade-action="bank" type="button">変更</button>`:""}</div>
        ${bank?`<div class="pm-bank"><span class="pm-bank-icon" aria-hidden="true">銀</span><div><strong>${escapeHtml(bank.bankName)}</strong><small>${escapeHtml(bank.branch)}・${escapeHtml(bank.type)} ****${escapeHtml(String(bank.number).slice(-3))}</small><small>${escapeHtml(bank.holder)}</small></div></div>`:`<p class="pm-muted">出金するには振込先の銀行口座を登録してください。</p><button class="pm-btn primary" data-trade-action="bank" type="button">銀行口座を登録する</button>`}
        <ul class="pm-fee-list"><li><span>出金手数料</span><b>${fmtYen(WITHDRAW_FEE_YEN)}／回</b></li><li><span>最低出金額</span><b>${fmtYen(WITHDRAW_MIN_YEN)}</b></li><li><span>振込までの目安</span><b>1〜3営業日</b></li></ul>
      </div>
    </section>
    ${lastSale?`<section class="pm-panel pm-breakdown"><div class="pm-panel-head"><h2>直近の売上の内訳</h2><span>${escapeHtml(lastSale.title)}</span></div><div class="summary"><div class="summary-row"><span>販売価格（購入者の支払額）</span><strong>${fmtYen(lastSale.gross)}</strong></div><div class="summary-row"><span>マーケット手数料（${(MARKET_FEE_RATE*100).toFixed(1)}%）</span><strong>−${fmtYen(lastSale.platformFee)}</strong></div><div class="summary-row"><span>クリエイター収益（主催者・制作者へ還元）</span><strong>−${fmtYen(lastSale.royalty)}</strong></div><div class="summary-row total"><span>売上残高に追加</span><strong>${fmtYen(lastSale.amount)}</strong></div></div></section>`:""}
    <section class="pm-panel"><div class="pm-panel-head"><h2>残高の履歴</h2><span>${ledger.length}件</span></div>
      ${ledger.length?`<div class="pm-ledger">${ledger.map(l=>`<div class="pm-ledger-row ${l.amount>=0?"plus":"minus"}"><span class="pm-ledger-icon" aria-hidden="true">${{sale:"¥",purchase:"⇣",withdraw:"⇢",offer_hold:"✋",offer_refund:"↺"}[l.type]||"・"}</span><span class="pm-ledger-title"><strong>${escapeHtml(l.title)}</strong><small>${new Date(l.at).toLocaleString("ja-JP")}${l.type==="withdraw"?`・振込額 ${fmtYen(l.net)}（手数料 ${fmtYen(l.fee)}）`:""}</small></span><span class="pm-ledger-amount">${l.amount>=0?"+":"−"}${fmtYen(Math.abs(l.amount))}<small ${l.withdrawalId&&l.status==="processing"?`data-withdraw-countdown="${l.withdrawalId}"`:""}>${statusLabel[l.status]||""}</small></span></div>`).join("")}</div>`:`<p class="pm-muted">まだ履歴はありません。NFTが売れると、ここに売上が表示されます。</p>`}
    </section>
    <div class="prototype-strip">研究用の疑似処理です。実際の振込・銀行口座との連携は行いません。</div>`;
}

/* ---------- ページ：検索 ---------- */
function tradeSearchPage(){
  const q=tradeView().query.trim().toLowerCase();
  const collections=MARKET_COLLECTIONS.filter(c=>[c.name,c.creator,marketCategoryLabel(c.category)].some(v=>v.toLowerCase().includes(q)));
  const ids=sortMarketItems(allMarketItemIds().filter(id=>{const info=marketItemInfo(id);return info&&[info.name,info.collection.name,...info.traits.map(t=>t.value)].some(v=>String(v).toLowerCase().includes(q))}),"recommended").slice(0,48);
  return `
    <div class="dashboard-title"><div><span class="kicker">SEARCH</span><h1>「${escapeHtml(tradeView().query.trim())}」の検索結果</h1><p>コレクション ${collections.length}件・アイテム ${ids.length}件</p></div><button class="pm-link" data-trade-action="clear-search" type="button">検索をクリア ×</button></div>
    ${collections.length?`<section class="pm-section"><div class="pm-section-head"><h2>コレクション</h2></div><div class="pm-collection-row">${collections.map(tradeCollectionCard).join("")}</div></section>`:""}
    <section class="pm-section"><div class="pm-section-head"><h2>アイテム</h2></div>${tradeItemGrid(ids,"一致するアイテムが見つかりませんでした")}</section>`;
}

/* ---------- はじめてガイド（マーケットを初めて開いたとき） ---------- */
const TRADE_GUIDE_STEPS=[
  {target:".pm-hero",mobileTarget:".pm-hero-copy",label:"二次流通",title:"NFTはマーケットプレイスで売買できます",description:"運営元が二次流通（転売）を認めている場合、購入したNFTをマーケットプレイスで売買できます。"},
  {target:null,wide:true,label:"運営への還元",title:"公認の二次流通では、運営にも手数料が入ります",description:"転売が公式に認められた形で行えます。メルカリなどの従来のCtoCサービスとは違い、売買が成立すると、その手数料の一部が運営側に入ります。このマーケットでも、販売額の一部が「クリエイター収益」として運営元・制作元に還元され、継続的な財源の確保に繋がります。",
    image:{src:"./assets/guide/resale-fee-diagram.png",alt:"従来のサービスでは売買の手数料がマーケットプレイスのみに入るのに対し、NFTの二次流通ではマーケットプレイスと製作元・運営の両方に手数料が入ることを示す図"}},
  {target:".pm-collection-row",label:"使用後も残る価値",title:"使用後のNFTチケットも取引されることがあります",description:"NFTチケットの場合、アートとしての価値がある、長期的な特典が付いている、サインが入っているといった付加価値があれば、イベントで使用した後も売買される可能性があります。"},
  {target:"#tradeLiveTicker",label:"NFTだからできること",title:"所有者と取引履歴を記録できるNFTだからこそ",description:"使用後も価値が残り、取引が続くことは、通常の電子チケットでは難しいことです。所有者や取引履歴を記録し、本物であること（真正性）を証明できるNFTだからこそ実現できる仕組みです。"},
  {target:".pm-chips",label:"さまざまなジャンル",title:"NFTチケット以外にも、さまざまなNFTがあります",description:"マーケットには、NFTチケットのほかにも、アート、ゲーム、観光の記念品など、さまざまなジャンルのNFTが出品されています。例えば、NFTゲームでは、獲得したキャラクターやアイテムがNFTとなり、外部ウォレットに移してマーケットで他のユーザーと売買できます。取引には暗号資産や日本円などが使われます。レア度が高く高個体なものほど価格が高くなるといったように、資産性を持つようになります。"},
  {target:".pm-hero-actions",label:"体験してみましょう",title:"実際に売買を体験してみましょう",description:"ぜひ、ウォレットにある購入済みのチケットを売却したり、マーケットでNFTを購入したりして、NFTの売買を体験してみてください。"}
];
let tradeGuideStep=0;
let tradeGuideTarget=null;
let tradeGuideScheduled=false;
function tradeGuideOpen(){const guide=document.getElementById("tradeGuide");return !!guide&&!guide.classList.contains("hidden")}
function maybeStartTradeGuide(){
  const view=tradeView();
  if(state.tradeGuideCompleted||tradeGuideScheduled||tradeGuideOpen()||state.currentApp!=="trade"||view.page||view.query.trim()||view.tab!=="explore")return;
  tradeGuideScheduled=true;
  // 先に達成した手順の通知を表示し終えてから、マーケットのガイドを開く。
  if(missionCompletionNoticeActive||missionCompletionNoticeQueue.length||progressGuideOpen()){
    setTimeout(()=>{tradeGuideScheduled=false;maybeStartTradeGuide()},250);
    return;
  }
  requestAnimationFrame(()=>{tradeGuideScheduled=false;if(!state.tradeGuideCompleted&&state.currentApp==="trade")startTradeGuide()});
}
function startTradeGuide(replay=false){
  if(tradeGuideOpen()||!$("modal").classList.contains("hidden")||progressGuideOpen()||positionedGuideOpen())return;
  const view=tradeView();
  if(view.page||view.query.trim()||view.tab!=="explore")setTradeTab("explore");
  tradeGuideStep=0;
  document.documentElement.classList.add("trade-guide-open");document.body.classList.add("trade-guide-open");
  $("tradeGuideBackdrop").classList.remove("hidden");$("tradeGuideBackdrop").setAttribute("aria-hidden","false");
  $("tradeGuide").classList.remove("hidden");
  log("trade_guide_started",{replay});
  startGuideGeometryMonitor();
  renderTradeGuideStep();
}
function tradeGuideSelector(step){
  if(!step.target)return null;
  return `#tradeContent ${window.matchMedia("(max-width: 760px)").matches&&step.mobileTarget?step.mobileTarget:step.target}`;
}
function tradeGuideStepTarget(step){const selector=tradeGuideSelector(step);return selector?document.querySelector(selector):null}
function setTradeGuideTarget(target){
  tradeGuideTarget?.classList.remove("wallet-guide-highlight","pm-guide-highlight");
  tradeGuideTarget=target||null;
  tradeGuideTarget?.classList.add("wallet-guide-highlight","pm-guide-highlight");
}
function formatTradeGuideDescription(description){
  const highlights=["売買が成立すると、その手数料の一部が運営側に入ります。", "継続的な財源の確保に繋がります。", "所有者や取引履歴を記録し、本物であること（真正性）を証明できるNFTだからこそ実現できる仕組みです。", "例えば、NFTゲームでは、獲得したキャラクターやアイテムがNFTとなり、外部ウォレットに移してマーケットで他のユーザーと売買できます。", "レア度が高く高個体なものほど価格が高くなるといったように、資産性を持つようになります。"];
  return highlights.reduce((html,text)=>html.replace(escapeHtml(text),`<strong class="trade-guide-emphasis">${escapeHtml(text)}</strong>`),escapeHtml(description));
}
function renderTradeGuideStep(){
  const step=TRADE_GUIDE_STEPS[tradeGuideStep],last=tradeGuideStep===TRADE_GUIDE_STEPS.length-1;
  setTradeGuideTarget(tradeGuideStepTarget(step));
  $("tradeGuide").classList.toggle("trade-guide-wide",!!step.wide);
  const figure=$("tradeGuideFigure");
  figure.classList.toggle("hidden",!step.image);
  if(step.image&&figure.getAttribute("src")!==step.image.src){figure.onload=positionTradeGuide;figure.src=step.image.src}
  figure.alt=step.image?.alt||"";
  $("tradeGuideLabel").textContent=`${tradeGuideStep+1} / ${TRADE_GUIDE_STEPS.length} · ${step.label}`;
  $("tradeGuideTitle").textContent=step.title;
  $("tradeGuideDescription").innerHTML=formatTradeGuideDescription(step.description);
  $("tradeGuideDots").innerHTML=TRADE_GUIDE_STEPS.map((_,index)=>`<i class="${index<tradeGuideStep?"done":index===tradeGuideStep?"active":""}"></i>`).join("");
  $("tradeGuideNext").innerHTML=last?'はじめる <span aria-hidden="true">✓</span>':'次へ <span aria-hidden="true">→</span>';
  $("tradeGuide").scrollTop=0;
  log("trade_guide_step_viewed",{step:tradeGuideStep+1,topic:step.label});
  const placeGuide=()=>{if(tradeGuideOpen()&&TRADE_GUIDE_STEPS[tradeGuideStep]===step){keepTradeGuideTargetInView();positionTradeGuide()}};
  requestAnimationFrame(()=>{
    if(!tradeGuideOpen())return;
    placeGuide();
    $("tradeGuideNext").focus({preventScroll:true});
    whenScrollSettles(placeGuide);
  });
}
function refreshTradeGuideTarget(){
  if(!tradeGuideOpen())return;
  const target=tradeGuideStepTarget(TRADE_GUIDE_STEPS[tradeGuideStep]);
  if(target!==tradeGuideTarget)setTradeGuideTarget(target);
  positionTradeGuide();
}
function keepTradeGuideTargetInView(){
  if(!tradeGuideTarget?.isConnected)return;
  const mobile=window.matchMedia("(max-width: 760px)").matches,rect=tradeGuideTarget.getBoundingClientRect();
  const top=mobile?84:110,bottom=window.innerHeight-(mobile?$("tradeGuide").offsetHeight+28:16);
  if(rect.top<top||rect.bottom>bottom)window.scrollTo({top:Math.max(0,rect.top+window.scrollY-top),behavior:"auto"});
}
function positionTradeGuide(){
  if(!tradeGuideOpen())return;
  const bubble=$("tradeGuide");
  ["top","right","bottom","left"].forEach(side=>bubble.style.removeProperty(side));
  if(window.matchMedia("(max-width: 760px)").matches)return;
  if(!tradeGuideTarget?.isConnected){
    bubble.style.left=`${Math.max(16,(window.innerWidth-bubble.offsetWidth)/2)}px`;bubble.style.top=`${Math.max(16,(window.innerHeight-bubble.offsetHeight)/2)}px`;bubble.style.right="auto";
    return;
  }
  const r=tradeGuideTarget.getBoundingClientRect(),margin=16,gap=18,width=bubble.offsetWidth,height=bubble.offsetHeight,W=window.innerWidth,H=window.innerHeight;
  const clampX=x=>Math.min(W-width-margin,Math.max(margin,x)),clampY=y=>Math.min(H-height-margin,Math.max(margin,y));
  let left,top;
  if(r.right+gap+width<=W-margin){left=r.right+gap;top=clampY(r.top+(r.height-height)/2)}
  else if(r.left-gap-width>=margin){left=r.left-gap-width;top=clampY(r.top+(r.height-height)/2)}
  else if(r.bottom+gap+height<=H-margin){top=r.bottom+gap;left=clampX(r.left)}
  else if(r.top-gap-height>=margin){top=r.top-gap-height;left=clampX(r.left)}
  else{top=H-height-margin;left=W-width-margin}
  bubble.style.left=`${left}px`;bubble.style.top=`${top}px`;bubble.style.right="auto";
}
function advanceTradeGuide(){
  if(!tradeGuideOpen())return;
  if(tradeGuideStep>=TRADE_GUIDE_STEPS.length-1){closeTradeGuide();return}
  tradeGuideStep++;renderTradeGuideStep();
}
function closeTradeGuide(){
  if(!tradeGuideOpen())return;
  setTradeGuideTarget(null);
  $("tradeGuideBackdrop").classList.add("hidden");$("tradeGuideBackdrop").setAttribute("aria-hidden","true");
  $("tradeGuide").classList.add("hidden");
  document.documentElement.classList.remove("trade-guide-open");document.body.classList.remove("trade-guide-open");
  state.tradeGuideCompleted=true;
  log("trade_guide_completed",{step:tradeGuideStep+1});
  renderMission();
  persistState();
  scheduleMissionCompletionNoticeResume();
}

/* ---------- 描画とイベント ---------- */
function renderTrade(){
  updateTradeChrome();
  const content=document.getElementById("tradeContent");
  if(!content||!state.participantId||state.currentApp!=="trade")return;
  const view=tradeView();
  document.querySelectorAll("#tradeTabs button").forEach(button=>button.classList.toggle("active",!view.query.trim()&&button.dataset.tradeTab===view.tab));
  let html;
  if(view.query.trim())html=tradeSearchPage();
  else if(view.page==="item")html=tradeItemPage(view.id);
  else if(view.page==="collection")html=tradeCollectionPage(view.id);
  else html=({explore:tradeExplorePage,rankings:tradeRankingsPage,activity:tradeActivityPage,account:tradeAccountPage,balance:tradeBalancePage}[view.tab]||tradeExplorePage)();
  content.innerHTML=html;
  hydrateTradeCharts();
  if(tradeGuideOpen())refreshTradeGuideTarget();else maybeStartTradeGuide();
}
function handleTradeClick(event){
  const target=event.target;
  const fav=target.closest("[data-fav]");if(fav){event.stopPropagation();toggleMarketFavorite(fav.dataset.fav);return}
  const tab=target.closest("[data-trade-tab]");if(tab){setTradeTab(tab.dataset.tradeTab);return}
  const chip=target.closest("[data-trade-chip]");
  if(chip){const view=tradeView();view[chip.dataset.tradeChip]=chip.dataset.value;if(chip.dataset.tradeChip==="category")view.visible=24;renderTrade();return}
  const action=target.closest("[data-trade-action]");
  if(action){event.stopPropagation();runTradeAction(action.dataset.tradeAction,action.dataset.id,action.dataset.offer);return}
  const collection=target.closest("[data-trade-collection]");if(collection){openTradeCollection(collection.dataset.tradeCollection);return}
  const item=target.closest("[data-trade-item]");if(item){openTradeItem(item.dataset.tradeItem)}
}
function runTradeAction(action,itemId,offerId){
  if(action==="back")tradeBack();
  else if(action==="buy")openMarketCheckout(itemId);
  else if(action==="offer")openMakeOfferModal(itemId);
  else if(action==="list")openListingModal(itemId,"create");
  else if(action==="edit")openListingModal(itemId,"edit");
  else if(action==="cancel")openCancelListingModal(itemId);
  else if(action==="accept-offer")openAcceptOfferModal(itemId,offerId);
  else if(action==="decline-offer")declineIncomingOffer(itemId,offerId);
  else if(action==="withdraw")openWithdrawModal();
  else if(action==="bank")openBankAccountModal();
  else if(action==="more"){tradeView().visible+=24;renderTrade()}
  else if(action==="guide")startTradeGuide(true);
  else if(action==="scroll-items")document.getElementById("tradeItemsSection")?.scrollIntoView({behavior:"smooth",block:"start"});
  else if(action==="clear-search"){tradeView().query="";const search=document.getElementById("tradeSearch");if(search)search.value="";renderTrade()}
  else if(action==="open-wallet"){
    const entryIndex=state.ownedNfts.findIndex(e=>!e.soldAt&&marketItemIdForEntry(e)===itemId);
    if(entryIndex<0)return;
    state.currentWalletTab="wallet-nft";switchApp("wallet");requestAnimationFrame(()=>openOwnedNftDetail(entryIndex));
  }
}
function handleTradeChange(event){
  const view=tradeView(),select=event.target.closest("[data-trade-select]"),toggle=event.target.closest("[data-trade-toggle]");
  if(select){view[select.dataset.tradeSelect]=select.value;renderTrade()}
  if(toggle){view[toggle.dataset.tradeToggle]=toggle.checked;view.visible=24;renderTrade()}
}
function handleTradeKeydown(event){
  if(event.key!=="Enter"&&event.key!==" ")return;
  const card=event.target.closest("[data-trade-item],[data-trade-collection]");
  if(!card||card!==event.target||card.tagName==="BUTTON")return;
  event.preventDefault();
  if(card.dataset.tradeItem)openTradeItem(card.dataset.tradeItem);else openTradeCollection(card.dataset.tradeCollection);
}
function handleTradeSearch(event){
  clearTimeout(tradeSearchTimer);
  tradeSearchTimer=setTimeout(()=>{
    const view=tradeView();view.query=event.target.value;
    if(view.query.trim()){view.page=null;view.id=null;log("market_search",{query:view.query.trim()})}
    renderTrade();
  },300);
}
function openTradeNotifications(){
  const m=marketState(),items=[...m.notifications].reverse();
  items.forEach(n=>{n.read=true});updateTradeChrome();
  log("market_notifications_opened",{count:items.length});
  openModal("NOTIFICATIONS","お知らせ",items.length?`<div class="pm-notices">${items.map(n=>`<button class="pm-notice ${n.kind}" ${n.itemId&&marketItemInfo(n.itemId)?`data-notice-item="${n.itemId}"`:'data-notice-balance="1"'} type="button"><span aria-hidden="true">${{sold:"¥",offer:"✋",offer_accepted:"✓",offer_declined:"↺",withdraw:"⇢",expired:"⏱"}[n.kind]||"・"}</span><span><strong>${escapeHtml(n.title)}</strong><small>${escapeHtml(n.body)}</small><em>${marketRelTime(n.at)}</em></span></button>`).join("")}</div>`:`<div class="pm-empty compact"><p>お知らせはまだありません。NFTが売れたり、オファーが届いたりするとここに表示されます。</p></div>`);
  document.querySelectorAll("[data-notice-item]").forEach(button=>button.onclick=()=>{closeModal();if(state.currentApp!=="trade")switchApp("trade");const view=tradeView();view.query="";openTradeItem(button.dataset.noticeItem)});
  document.querySelectorAll("[data-notice-balance]").forEach(button=>button.onclick=()=>{closeModal();if(state.currentApp!=="trade")switchApp("trade");setTradeTab("balance")});
}
function onMarketModalClosed(){
  marketModalItemId=null;clearTimeout(marketPasskeyTimer);
  if(state.marketOrder?.status==="selecting")state.marketOrder=null;
}

/* ---------- パスキー承認（出品・オファー・出金） ---------- */
function runMarketPasskey(title,detail,onApproved){
  openModal("PASSKEY","パスキーで承認",`<div class="transaction-status"><div class="passkey-visual scanning">${PASSKEY_SVG}</div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(detail)}</p></div>`,false);
  clearTimeout(marketPasskeyTimer);
  marketPasskeyTimer=setTimeout(onApproved,PASSKEY_PROMPT_MS);
}
function marketModalItemHeader(info){
  return `<div class="pm-modal-item"><img src="${info.image}" alt=""><div><small>${escapeHtml(info.collection.name)}</small><strong>${escapeHtml(info.name)}</strong><span>${info.isTicket?"NFTチケット":escapeHtml(info.tierLabel)}・トークンID ${escapeHtml(info.tokenLabel)}</span></div></div>`;
}

/* ---------- 出品 ---------- */
function openListingModal(itemId,mode="create"){
  const entry=myEntryForItem(itemId),info=marketItemInfo(itemId);
  if(!entry||!info){error("このNFTは保有していません");return}
  const rec=marketRecord(itemId);
  if(mode==="edit"&&!rec.listing){mode="create"}
  if(mode==="create"&&rec.listing){mode="edit"}
  const range=marketPriceRange(itemId),floor=collectionFloor(info.collection.id);
  const suggested=mode==="edit"?rec.listing.price:Math.min(range.cap,niceYen((range.low+range.high)/2));
  listingDurationDays=rec.listing?.durationDays||7;
  log("market_listing_form_opened",{item_id:itemId,mode,fair_range_yen:range});
  openModal(mode==="edit"?"EDIT LISTING":"LIST FOR SALE",mode==="edit"?"出品価格を変更":"マーケットに出品",`
    ${marketModalItemHeader(info)}
    <div class="pm-market-ref">
      <div class="main"><span>売れやすい価格帯</span><strong>${fmtYen(range.low)} 〜 ${fmtYen(range.high)}</strong></div>
      <div><span>フロア価格</span><strong>${floor?fmtYen(floor):"—"}</strong></div>
      <div><span>最終取引</span><strong>${rec.lastSalePrice?fmtYen(rec.lastSalePrice):"—"}</strong></div>
    </div>
    ${range.face?`<div class="pm-note ticket compact"><b>公式リセール</b><span>主催者の設定により、定価（${fmtYen(range.cap)}）を超える価格では出品できません。</span></div>`:""}
    <label class="pm-field-label" for="listingPrice">出品価格</label>
    <div class="amount-box pm-price-input"><input id="listingPrice" class="input" inputmode="numeric" autocomplete="off" value="${suggested}" aria-describedby="listingEstimate"><span>円</span></div>
    <div class="pm-quick-prices">
      <button type="button" data-listing-quick="${range.low}">相場の下限</button>
      <button type="button" data-listing-quick="${Math.min(range.cap,niceYen((range.low+range.high)/2))}">相場の中央</button>
      <button type="button" data-listing-quick="${range.high}">相場の上限</button>
      ${floor?`<button type="button" data-listing-quick="${Math.min(range.cap,floor)}">フロアに合わせる</button>`:""}
    </div>
    <div class="pm-gauge" aria-hidden="true"><div class="pm-gauge-track"><i class="low" id="listingZoneLow"></i><i class="fair" id="listingZoneFair"></i><i class="high" id="listingZoneHigh"></i></div><b id="listingGaugeMarker"></b><div class="pm-gauge-labels"><span>安い</span><span>売れやすい</span><span>${range.face?"上限超え":"高い"}</span></div></div>
    <p id="listingEstimate" class="pm-estimate" role="status"></p>
    ${mode==="create"?`<div class="pm-field-label">出品期間</div><div class="pm-duration" role="radiogroup" aria-label="出品期間">${[[1,"1日"],[3,"3日"],[7,"7日"],[30,"1か月"]].map(([days,label])=>`<button type="button" role="radio" data-listing-days="${days}" aria-checked="${days===listingDurationDays}" class="${days===listingDurationDays?"active":""}">${label}</button>`).join("")}</div>`:""}
    <div class="summary pm-fee-summary" id="listingFees"></div>
    <label class="check pm-low-confirm hidden" id="listingLowConfirmWrap"><input id="listingLowConfirm" type="checkbox"><span>相場より安い価格で出品することを確認しました</span></label>
    <button id="submitListing" class="primary pm-modal-primary" type="button">${mode==="edit"?"パスキーで承認して価格を変更":"パスキーで承認して出品する"}</button>
    <div class="prototype-strip payment-prototype-strip">研究用の疑似取引です。売れやすい価格帯で出品すると、数十秒で他のユーザーが購入します。</div>`);
  marketModalItemId=itemId;
  const input=$("listingPrice");
  bindNumericInput(input,value=>value.replace(/\D/g,"").slice(0,7),()=>updateListingPreview(itemId));
  document.querySelectorAll("[data-listing-quick]").forEach(button=>button.onclick=()=>{input.value=button.dataset.listingQuick;updateListingPreview(itemId);log("market_listing_quick_price",{item_id:itemId,price_yen:Number(button.dataset.listingQuick),label:button.textContent})});
  document.querySelectorAll("[data-listing-days]").forEach(button=>button.onclick=()=>{listingDurationDays=Number(button.dataset.listingDays);document.querySelectorAll("[data-listing-days]").forEach(b=>{b.classList.toggle("active",b===button);b.setAttribute("aria-checked",String(b===button))})});
  $("listingLowConfirm").onchange=()=>updateListingPreview(itemId);
  $("submitListing").onclick=()=>submitListing(itemId,mode);
  updateListingPreview(itemId);
}
function listingInputPrice(){return Number(($("listingPrice")?.value||"").replace(/\D/g,""))||0}
function listingValidation(itemId,price){
  const cap=marketPriceCap(itemId);
  if(price<MARKET_MIN_PRICE)return `${fmtYen(MARKET_MIN_PRICE)}以上の金額を入力してください`;
  if(price>cap)return cap<MARKET_MAX_PRICE?`主催者の設定により、定価（${fmtYen(cap)}）を超える価格では出品できません`:`${fmtYen(MARKET_MAX_PRICE)}以下の金額を入力してください`;
  return null;
}
function updateListingPreview(itemId){
  const info=marketItemInfo(itemId);if(!info||!$("listingEstimate"))return;
  const price=listingInputPrice(),range=marketPriceRange(itemId),invalid=listingValidation(itemId,price);
  const min=Math.max(0,range.low*.5),max=range.face?range.cap*1.12:range.high*1.6,pos=v=>Math.max(0,Math.min(100,(v-min)/(max-min)*100));
  $("listingZoneLow").style.width=`${pos(range.low)}%`;$("listingZoneFair").style.width=`${pos(range.high)-pos(range.low)}%`;$("listingZoneHigh").style.width=`${100-pos(range.high)}%`;
  $("listingGaugeMarker").style.left=`${pos(price)}%`;$("listingGaugeMarker").classList.toggle("hidden",!price);
  const est=marketSaleEstimate(itemId,price),estimate=$("listingEstimate");
  let text,tone;
  if(invalid){text=invalid;tone="error"}
  else if(est.zone==="low"){text=`相場より安い価格です。約10秒以内に売れる見込みです。`;tone="low"}
  else if(est.zone==="fair"){text=`売れやすい価格です。約${Math.max(5,est.seconds-5)}〜${est.seconds+5}秒で売れる見込みです。`;tone="fair"}
  else {text="相場より高いため、すぐには売れにくい価格です。購入希望者からオファーが届くことがあります。";tone="high"}
  estimate.textContent=text;estimate.className=`pm-estimate ${tone}`;
  const fees=marketFees(price,info.collection);
  $("listingFees").innerHTML=`<div class="summary-row"><span>販売価格</span><strong>${price?fmtYen(price):"—"}</strong></div><div class="summary-row"><span>マーケット手数料（${(MARKET_FEE_RATE*100).toFixed(1)}%）</span><strong>−${fmtYen(fees.platform)}</strong></div><div class="summary-row"><span>クリエイター収益（${(info.collection.royalty*100).toFixed(1).replace(/\.0$/,"")}%）</span><strong>−${fmtYen(fees.royalty)}</strong></div><div class="summary-row total"><span>受取予定額（売上残高へ）</span><strong>${price?fmtYen(fees.net):"—"}</strong></div>`;
  const lowWrap=$("listingLowConfirmWrap"),needsConfirm=!invalid&&est.zone==="low";
  lowWrap.classList.toggle("hidden",!needsConfirm);
  $("submitListing").disabled=!!invalid||(needsConfirm&&!$("listingLowConfirm").checked);
}
function submitListing(itemId,mode){
  const price=listingInputPrice(),invalid=listingValidation(itemId,price);
  if(invalid){error(invalid);return}
  if(!myEntryForItem(itemId)){error("このNFTは保有していません");closeModal();return}
  const info=marketItemInfo(itemId),days=listingDurationDays;
  runMarketPasskey(mode==="edit"?"価格の変更を承認しています":"出品を承認しています",`${info.name} を ${fmtYen(price)} で${mode==="edit"?"出品し直します":"出品します"}。秘密鍵が外部に送られることはありません。`,()=>{
    const ok=mode==="edit"?updateMyListing(itemId,price):createMyListing(itemId,price,days);
    if(!ok){closeModal();error("このNFTはすでに売却済みか、出品状態が変わりました");refreshMarketViews();return}
    renderAll();showListingDone(itemId,mode);
  });
}
function showListingDone(itemId,mode){
  const info=marketItemInfo(itemId),listing=marketRecord(itemId).listing;
  if(!info||!listing){closeModal();return}
  openModal("LISTED",mode==="edit"?"価格を変更しました":"出品が完了しました",`
    <div class="completion-card pm-done"><div class="success-check">✓</div><h2>${fmtYen(listing.price)}</h2><p>${escapeHtml(info.name)} を PassMarket に出品しました。</p></div>
    <p class="pm-muted center">売れると通知が届き、売上残高に反映されます。この画面を閉じても取引は続きます。</p>
    <div class="button-row"><button id="listingDoneView" class="primary" type="button">アイテムページを見る</button><button id="listingDoneClose" class="secondary" type="button">閉じる</button></div>`);
  marketModalItemId=itemId;
  $("listingDoneClose").onclick=closeModal;
  $("listingDoneView").onclick=()=>openTradeItemFromApp(itemId);
}
function openCancelListingModal(itemId){
  const info=marketItemInfo(itemId),listing=marketRecord(itemId).listing;
  if(!info||!listing||listing.seller!=="me")return;
  openModal("CANCEL LISTING","出品を取り消しますか？",`${marketModalItemHeader(info)}
    <div class="summary" style="margin-top:14px"><div class="summary-row"><span>現在の出品価格</span><strong>${fmtYen(listing.price)}</strong></div></div>
    <p class="pm-muted">取り消すと、このNFTは購入されなくなります。届いているオファーも終了します。</p>
    <div class="button-row"><button id="confirmCancelListing" class="danger-btn" type="button">出品を取り消す</button><button id="keepListing" class="secondary" type="button">出品を続ける</button></div>`);
  marketModalItemId=itemId;
  $("keepListing").onclick=closeModal;
  $("confirmCancelListing").onclick=()=>{
    if(!cancelMyListing(itemId)){closeModal();error("この出品はすでに終了しています");refreshMarketViews();return}
    closeModal();refreshMarketViews();toast("出品を取り消しました");
  };
}
function openAcceptOfferModal(itemId,offerId){
  const info=marketItemInfo(itemId),offer=marketRecord(itemId).offers.find(o=>o.id===offerId&&o.status==="open");
  if(!info||!offer||!marketOwnedByMe(itemId)){error("このオファーは受け付けを終了しました");refreshMarketViews();return}
  const fees=marketFees(offer.amount,info.collection);
  openModal("ACCEPT OFFER","オファーを承諾しますか？",`${marketModalItemHeader(info)}
    <div class="summary" style="margin-top:14px"><div class="summary-row"><span>オファー金額（${escapeHtml(offer.from)}）</span><strong>${fmtYen(offer.amount)}</strong></div><div class="summary-row"><span>マーケット手数料</span><strong>−${fmtYen(fees.platform)}</strong></div><div class="summary-row"><span>クリエイター収益</span><strong>−${fmtYen(fees.royalty)}</strong></div><div class="summary-row total"><span>受取額（売上残高へ）</span><strong>${fmtYen(fees.net)}</strong></div></div>
    <p class="pm-muted">承諾するとNFTは購入者のウォレットへ移動し、出品も終了します。</p>
    <div class="button-row"><button id="confirmAcceptOffer" class="primary" type="button">パスキーで承認して売却</button><button id="cancelAcceptOffer" class="secondary" type="button">戻る</button></div>`);
  marketModalItemId=itemId;
  $("cancelAcceptOffer").onclick=closeModal;
  $("confirmAcceptOffer").onclick=()=>runMarketPasskey("売却を承認しています",`${info.name} を ${fmtYen(offer.amount)} で ${offer.from} に売却します。`,()=>{
    const current=marketRecord(itemId).offers.find(o=>o.id===offerId&&o.status==="open");
    if(!current||!marketOwnedByMe(itemId)){closeModal();error("このオファーは受け付けを終了しました");refreshMarketViews();return}
    log("market_offer_accepted",{item_id:itemId,amount_yen:offer.amount,from:offer.from});
    marketModalItemId=null;
    completeMyMarketSale(itemId,offer.amount,"offer",offer.from,offerId);
    openModal("SOLD","売却が完了しました",`<div class="completion-card pm-done"><div class="success-check">✓</div><h2>${fmtYen(fees.net)}</h2><p>売上残高に追加しました。銀行口座へはいつでも出金できます。</p></div><div class="button-row" style="margin-top:15px"><button id="soldToBalance" class="primary" type="button">売上・出金を見る</button><button id="soldClose" class="secondary" type="button">閉じる</button></div>`);
    $("soldClose").onclick=closeModal;
    $("soldToBalance").onclick=()=>{closeModal();if(state.currentApp!=="trade")switchApp("trade");setTradeTab("balance")};
  });
}

/* ---------- オファーを出す ---------- */
function openMakeOfferModal(itemId){
  const info=marketItemInfo(itemId);if(!info)return;
  if(marketOwnedByMe(itemId)){error("自分が保有しているNFTにはオファーできません");return}
  const m=marketState(),rec=marketRecord(itemId),floor=collectionFloor(info.collection.id),balance=tradeBalance();
  if(m.myOffers.some(o=>o.itemId===itemId&&o.status==="pending")){error("このアイテムには回答待ちのオファーがあります");return}
  if(!activeWallet()||balance<MARKET_MIN_PRICE){
    openModal("MAKE OFFER","オファーには売上残高を使います",`${marketModalItemHeader(info)}
      <div class="notice info" style="margin-top:14px">オファーの金額は売上残高から一時的に確保され、不成立の場合は残高に戻ります。現在の売上残高は ${fmtYen(balance)} です。</div>
      <p class="pm-muted">保有しているNFTを出品して売却すると、売上残高が貯まります。すぐに購入したい場合は「今すぐ購入」からクレジットカードやQRコード決済も利用できます。</p>
      <div class="button-row">${rec.listing?`<button id="offerBuyInstead" class="primary" type="button">今すぐ購入する</button>`:""}<button id="offerToAccount" class="secondary" type="button">保有NFTを出品する</button></div>`);
    if($("offerBuyInstead"))$("offerBuyInstead").onclick=()=>openMarketCheckout(itemId);
    $("offerToAccount").onclick=()=>{closeModal();setTradeTab("account")};
    return;
  }
  const listing=rec.listing,max=listing?Math.min(balance,listing.price-10):balance;
  const suggestions=[listing?niceYen(listing.price*.9):null,floor?niceYen(floor*.95):null,niceYen(marketFairYen(itemId))].filter(v=>v&&v>=MARKET_MIN_PRICE&&v<=max);
  openModal("MAKE OFFER","オファーを出す",`${marketModalItemHeader(info)}
    <div class="pm-market-ref"><div class="main"><span>${listing?"出品価格":"最終取引"}</span><strong>${listing?fmtYen(listing.price):rec.lastSalePrice?fmtYen(rec.lastSalePrice):"—"}</strong></div><div><span>フロア価格</span><strong>${floor?fmtYen(floor):"—"}</strong></div><div><span>売上残高</span><strong>${fmtYen(balance)}</strong></div></div>
    <label class="pm-field-label" for="offerAmount">オファー金額</label>
    <div class="amount-box pm-price-input"><input id="offerAmount" class="input" inputmode="numeric" autocomplete="off" value="${suggestions[0]||""}"><span>円</span></div>
    ${suggestions.length?`<div class="pm-quick-prices">${[...new Set(suggestions)].map(v=>`<button type="button" data-offer-quick="${v}">${fmtYen(v)}</button>`).join("")}</div>`:""}
    <p class="pm-estimate fair" id="offerHint">${listing?`出品価格の${Math.round(MARKET_OFFER_ACCEPT_RATIO*100)}%以上のオファーは承諾されやすくなります。`:"相場より高めのオファーほど、保有者に承諾されやすくなります。"}</p>
    <div class="notice info">オファー金額は売上残高から一時的に確保されます。不成立の場合は残高に戻ります。有効期限は24時間です。</div>
    <button id="submitOffer" class="primary pm-modal-primary" type="button">パスキーで承認してオファーを送る</button>`);
  marketModalItemId=itemId;
  const input=$("offerAmount");
  bindNumericInput(input,value=>value.replace(/\D/g,"").slice(0,7));
  document.querySelectorAll("[data-offer-quick]").forEach(button=>button.onclick=()=>{input.value=button.dataset.offerQuick});
  $("submitOffer").onclick=()=>{
    const amount=Number(input.value)||0,current=marketRecord(itemId).listing;
    if(amount<MARKET_MIN_PRICE){error(`${fmtYen(MARKET_MIN_PRICE)}以上の金額を入力してください`);return}
    if(amount>tradeBalance()){error("売上残高が不足しています");return}
    if(current&&amount>=current.price){error("出品価格以上の場合は「今すぐ購入」をご利用ください");return}
    runMarketPasskey("オファーを承認しています",`${info.name} に ${fmtYen(amount)} のオファーを送ります。`,()=>{
      if(amount>tradeBalance()||marketOwnedByMe(itemId)){closeModal();error("オファーを送れませんでした");return}
      placeMyOffer(itemId,amount);renderAll();
      openModal("OFFER SENT","オファーを送りました",`<div class="completion-card pm-done"><div class="success-check">✓</div><h2>${fmtYen(amount)}</h2><p>${escapeHtml(info.name)} の保有者にオファーを送りました。</p></div><div class="pm-status pending block"><span class="pm-pulse" aria-hidden="true"></span><span data-offer-countdown="${marketState().myOffers[marketState().myOffers.length-1].id}">出品者の回答待ち</span></div><div class="button-row" style="margin-top:14px"><button id="offerDone" class="secondary" type="button">閉じる</button></div>`);
      $("offerDone").onclick=closeModal;updateMarketCountdowns();
    });
  };
}

/* ---------- 銀行口座・出金 ---------- */
function openBankAccountModal(afterSave=null){
  const bank=marketState().bankAccount||{bankName:MARKET_BANKS[0],branch:"本店営業部",type:"普通",number:"1234567",holder:"ケンキュウ タロウ"};
  openModal("BANK ACCOUNT","振込先口座の登録",`
    <div class="form-grid payment-form">
      <div class="field full"><label for="bankName">金融機関</label><select id="bankName" class="select">${MARKET_BANKS.map(name=>`<option ${name===bank.bankName?"selected":""}>${name}</option>`).join("")}</select></div>
      <div class="field"><label for="bankBranch">支店名</label><input id="bankBranch" class="input" autocomplete="off" value="${escapeHtml(bank.branch)}"></div>
      <div class="field"><label for="bankType">口座種別</label><select id="bankType" class="select">${["普通","当座"].map(type=>`<option ${type===bank.type?"selected":""}>${type}</option>`).join("")}</select></div>
      <div class="field"><label for="bankNumber">口座番号（7桁）</label><input id="bankNumber" class="input" inputmode="numeric" autocomplete="off" maxlength="7" value="${escapeHtml(bank.number)}"></div>
      <div class="field"><label for="bankHolder">口座名義（カタカナ）</label><input id="bankHolder" class="input" autocomplete="off" value="${escapeHtml(bank.holder)}"></div>
    </div>
    <div class="prototype-strip payment-prototype-strip">研究用のデモ口座が入力されています。実在する口座情報は入力しないでください。</div>
    <div class="button-row" style="margin-top:14px"><button id="saveBankAccount" class="primary" type="button">この口座を登録する</button><button id="cancelBankAccount" class="secondary" type="button">キャンセル</button></div>`);
  bindNumericInput($("bankNumber"),value=>value.replace(/\D/g,"").slice(0,7));
  $("cancelBankAccount").onclick=closeModal;
  $("saveBankAccount").onclick=()=>{
    const account={bankName:$("bankName").value,branch:$("bankBranch").value.trim(),type:$("bankType").value,number:$("bankNumber").value.trim(),holder:$("bankHolder").value.trim().replace(/\s+/g," ")};
    if(!account.branch){error("支店名を入力してください");return}
    if(!/^\d{7}$/.test(account.number)){error("口座番号を7桁で入力してください");return}
    if(!/^[ァ-ヶー\s　]+$/.test(account.holder)){error("口座名義をカタカナで入力してください");return}
    marketState().bankAccount=account;
    log("market_bank_account_registered",{bank:account.bankName,type:account.type});
    if(afterSave){afterSave();return}
    closeModal();refreshMarketViews();toast("振込先口座を登録しました");
  };
}
function openWithdrawModal(){
  const m=marketState();
  if(!m.bankAccount){openBankAccountModal(openWithdrawModal);return}
  const balance=tradeBalance();
  if(balance<WITHDRAW_MIN_YEN){
    openModal("WITHDRAW","出金できる残高がありません",`<div class="notice warning">出金は ${fmtYen(WITHDRAW_MIN_YEN)} 以上から申請できます。現在の売上残高は ${fmtYen(balance)} です。</div><p class="pm-muted">保有しているNFTを出品して売却すると、売上残高が貯まります。</p><div class="button-row"><button id="withdrawToAccount" class="primary" type="button">NFTを出品する</button><button id="withdrawClose" class="secondary" type="button">閉じる</button></div>`);
    $("withdrawClose").onclick=closeModal;
    $("withdrawToAccount").onclick=()=>{closeModal();if(state.currentApp!=="trade")switchApp("trade");setTradeTab("account")};
    return;
  }
  openModal("WITHDRAW","銀行口座へ出金",`
    <div class="pm-bank compact"><span class="pm-bank-icon" aria-hidden="true">銀</span><div><strong>${escapeHtml(m.bankAccount.bankName)}</strong><small>${escapeHtml(marketBankLabel(m.bankAccount).replace(m.bankAccount.bankName,"").trim())}・${escapeHtml(m.bankAccount.holder)}</small></div><button id="withdrawChangeBank" class="pm-link" type="button">変更</button></div>
    <div class="pm-market-ref"><div class="main"><span>出金可能額</span><strong>${fmtYen(balance)}</strong></div></div>
    <label class="pm-field-label" for="withdrawAmount">出金額</label>
    <div class="amount-box pm-price-input"><input id="withdrawAmount" class="input" inputmode="numeric" autocomplete="off" value="${balance}"><span>円</span></div>
    <div class="pm-quick-prices"><button type="button" data-withdraw-quick="${balance}">全額</button>${[10000,5000,1000].filter(v=>v<balance).map(v=>`<button type="button" data-withdraw-quick="${v}">${fmtYen(v)}</button>`).join("")}</div>
    <div class="summary pm-fee-summary" id="withdrawSummary"></div>
    <p class="pm-muted">実際のサービスでは、振込まで通常1〜3営業日かかります（研究用デモでは数秒で完了します）。</p>
    <button id="submitWithdraw" class="primary pm-modal-primary" type="button">パスキーで承認して出金する</button>`);
  const input=$("withdrawAmount");
  const update=()=>{
    const amount=Number(input.value)||0,ok=amount>=WITHDRAW_MIN_YEN&&amount<=tradeBalance();
    $("withdrawSummary").innerHTML=`<div class="summary-row"><span>出金額</span><strong>${fmtYen(amount)}</strong></div><div class="summary-row"><span>出金手数料</span><strong>−${fmtYen(WITHDRAW_FEE_YEN)}</strong></div><div class="summary-row total"><span>振込金額</span><strong>${ok?fmtYen(amount-WITHDRAW_FEE_YEN):"—"}</strong></div>`;
    $("submitWithdraw").disabled=!ok;
  };
  bindNumericInput(input,value=>value.replace(/\D/g,"").slice(0,8),update);
  document.querySelectorAll("[data-withdraw-quick]").forEach(button=>button.onclick=()=>{input.value=button.dataset.withdrawQuick;update()});
  $("withdrawChangeBank").onclick=()=>openBankAccountModal(openWithdrawModal);
  $("submitWithdraw").onclick=()=>{
    const amount=Number(input.value)||0;
    if(amount<WITHDRAW_MIN_YEN){error(`${fmtYen(WITHDRAW_MIN_YEN)}以上の金額を入力してください`);return}
    if(amount>tradeBalance()){error("売上残高が不足しています");return}
    runMarketPasskey("出金を承認しています",`${fmtYen(amount)} を ${m.bankAccount.bankName} へ出金します。`,()=>{
      if(amount>tradeBalance()){closeModal();error("売上残高が不足しています");return}
      const w=requestWithdrawal(amount);renderAll();
      openModal("WITHDRAW","出金を受け付けました",`<div class="completion-card pm-done"><div class="success-check">✓</div><h2>${fmtYen(w.net)}</h2><p>${escapeHtml(w.bank)} へ振り込みます（手数料 ${fmtYen(w.fee)}）。</p></div><div class="pm-status fair block"><span class="pm-pulse" aria-hidden="true"></span><span data-withdraw-countdown="${w.id}">振込手続き中</span></div><div class="button-row" style="margin-top:14px"><button id="withdrawDone" class="secondary" type="button">閉じる</button></div>`);
      $("withdrawDone").onclick=closeModal;updateMarketCountdowns();
    });
  };
  update();
}

/* ---------- 購入（クレジットカード・QR・売上残高） ---------- */
function openMarketCheckout(itemId){
  const info=marketItemInfo(itemId),rec=marketRecord(itemId);
  if(!info||!rec.listing||marketOwnedByMe(itemId)){error("このアイテムは現在購入できません");refreshMarketViews();return}
  if(state.pendingPurchaseTicketId||(state.marketOrder&&state.marketOrder.status!=="selecting")){error("処理中の購入があります。完了までお待ちください");return}
  state.marketOrder={itemId,priceYen:rec.listing.price,seller:rec.listing.seller,method:null,status:"selecting",openedAt:now()};
  checkoutMode="market";
  log("market_checkout_opened",{item_id:itemId,price_yen:rec.listing.price,seller:rec.listing.seller});
  renderCheckoutMethods();
  marketModalItemId=itemId;
}
function marketCheckoutOrder(){
  const order=state.marketOrder,info=marketItemInfo(order?.itemId);
  return {kicker:"CHECKOUT",heading:"NFTを購入",title:info?.name||"NFT",detail:info?`${info.collection.name}・出品者 ${order.seller}`:"",amountYen:order?.priceYen||0,payee:"PassMarket",image:info?.image||null,
    note:"購入手数料はかかりません。購入したNFTはPassWalletに届き、あとからPassMarketで出品することもできます。",logId:{item_id:order?.itemId}};
}
function beginMarketPayment(){
  const order=state.marketOrder,rec=order?marketRecord(order.itemId):null,info=marketItemInfo(order?.itemId);
  if(!order||!info||!rec.listing||rec.listing.price!==order.priceYen||marketOwnedByMe(order.itemId)){
    state.marketOrder=null;closeModal();error("この出品は購入できなくなりました");refreshMarketViews();return;
  }
  if(!order.method){error("お支払い方法を選択してください");return}
  if(order.method==="balance"&&!debitTradeBalance(order.priceYen,{title:`${info.name} を購入（残高払い）`,itemId:order.itemId})){error("売上残高が不足しています");return}
  order.status="processing";order.startedAt=now();order.completesAt=Date.now()+PAYMENT_DELAY_MS;
  log("market_payment_submitted",{item_id:order.itemId,method:order.method,amount_yen:order.priceYen});
  showMarketPaymentProcessing();scheduleMarketOrder(completeMarketPayment,PAYMENT_DELAY_MS);
}
function scheduleMarketOrder(fn,delay){clearTimeout(marketOrderTimer);marketOrderTimer=setTimeout(fn,Math.max(0,delay))}
function showMarketPaymentProcessing(){
  openModal("PAYMENT","お支払いを処理しています",`<div class="transaction-status"><div class="spinner"></div><h3>${fmtTicketYen(state.marketOrder?.priceYen)}のお支払いを確認中です</h3><p>この画面を閉じずに、そのままお待ちください。</p></div>`,false);
}
function showMarketDelivering(){
  openModal("NFT TRANSFER","NFTを受け取っています",`<div class="transaction-status"><div class="spinner"></div><h3>PassWalletへ移動しています</h3><p>出品者のウォレットからあなたのPassWalletへ、NFTの所有権を移転しています。</p></div>`,false);
}
function completeMarketPayment(){
  const order=state.marketOrder;if(!order||order.status!=="processing")return;
  order.paidAt=now();
  log("market_payment_completed",{item_id:order.itemId,method:order.method,amount_yen:order.priceYen});
  if(!state.passkeyCreated||!activeWallet()){order.status="awaiting_passkey";order.completesAt=null;showPasskeySetup();return}
  continueMarketOrderAfterPasskey();
}
function continueMarketOrderAfterPasskey(){
  const order=state.marketOrder;if(!order)return;
  order.status="delivering";order.completesAt=Date.now()+PURCHASE_DELAY_MS;
  showMarketDelivering();scheduleMarketOrder(deliverMarketPurchase,PURCHASE_DELAY_MS);
}
function deliverMarketPurchase(){
  const order=state.marketOrder;if(!order||order.status!=="delivering")return;
  const info=marketItemInfo(order.itemId),rec=marketRecord(order.itemId),wallet=activeWallet();
  if(!info||!wallet){state.marketOrder=null;closeModal();error("NFTを受け取れませんでした");return}
  const seller=order.seller||rec.owner||marketHandle();
  const entry={tokenId:`PM-${Date.now().toString().slice(-8)}`,itemId:order.itemId,collectionId:info.collection.id,purchasedAt:now(),acquisitionType:"market_purchase",paymentMethod:order.method,priceYen:order.priceYen,sellerName:seller,ownerWalletId:wallet.id,ownerAddress:wallet.address};
  if(info.isTicket)entry.ticketId=info.collection.ticketId;
  state.ownedNfts.push(entry);
  rec.listing=null;rec.owner=null;rec.lastSalePrice=order.priceYen;rec.lastSaleAt=Date.now();
  rec.offers.forEach(o=>{if(o.status==="open"&&!o.mine)o.status="closed"});
  const m=marketState();
  m.myOffers.filter(o=>o.itemId===order.itemId&&o.status==="pending").forEach(o=>{o.status="declined";o.resolvedAt=Date.now();m.balance.reserved=Math.max(0,m.balance.reserved-o.amount);m.balance.available+=o.amount;pushMarketLedger({type:"offer_refund",title:`オファーの取り消し（${info.name}）`,amount:o.amount,itemId:order.itemId})});
  pushMarketActivity({type:"sale",itemId:order.itemId,price:order.priceYen,from:seller,to:"あなた",mine:true});
  log("market_nft_purchased",{item_id:order.itemId,token_id:entry.tokenId,collection_id:info.collection.id,price_yen:order.priceYen,method:order.method,seller});
  state.marketOrder=null;closeModal();renderAll();
  openModal("PURCHASED","NFTを購入しました",`
    <div class="pm-purchased"><img src="${info.image}" alt=""><div><span>✓ PassWalletに追加しました</span><h3>${escapeHtml(info.name)}</h3><small>${escapeHtml(info.collection.name)}</small></div></div>
    <div class="summary" style="margin-top:14px"><div class="summary-row"><span>お支払い</span><strong>${fmtTicketYen(entry.priceYen)}</strong></div><div class="summary-row"><span>支払い方法</span><strong>${{credit_card:"クレジットカード",paypay:"PayPay",qr_payment:"QRコード決済",balance:"売上残高"}[entry.paymentMethod]||"—"}</strong></div><div class="summary-row"><span>トークンID</span><strong>${entry.tokenId}</strong></div></div>
    <div class="button-row" style="margin-top:15px"><button id="purchasedToWallet" class="primary" type="button">PassWalletで確認する</button><button id="purchasedToItem" class="secondary" type="button">アイテムページを見る</button></div>`);
  $("purchasedToWallet").onclick=()=>{closeModal();state.currentWalletTab="wallet-nft";switchApp("wallet")};
  $("purchasedToItem").onclick=()=>{closeModal();if(state.currentApp!=="trade")switchApp("trade");const view=tradeView();if(view.page!=="item"||view.id!==order.itemId)openTradeItem(order.itemId);else renderTrade()};
}
function resumeMarketOperations(){
  const order=state.marketOrder;
  if(order){
    if(order.status==="selecting"||!marketItemInfo(order.itemId))state.marketOrder=null;
    else{
      checkoutMode="market";
      const remaining=(Number(order.completesAt)||Date.now())-Date.now();
      if(order.status==="processing"){showMarketPaymentProcessing();scheduleMarketOrder(completeMarketPayment,remaining)}
      else if(order.status==="awaiting_passkey")showPasskeySetup();
      else if(order.status==="delivering"){showMarketDelivering();scheduleMarketOrder(deliverMarketPurchase,remaining)}
    }
  }
  startMarketEngine();
}

/* ---------- PassWallet 連携 ---------- */
function walletMarketCallout(entry){
  const itemId=marketItemIdForEntry(entry),listing=marketListingForEntry(entry),range=marketPriceRange(itemId);
  return `<section class="pm-wallet-callout${listing?" listed":""}"><div><span>PASSMARKET</span><h3>${listing?`${fmtYen(listing.price)} で出品中`:"このNFTをマーケットで売る"}</h3>${listing?"":`<p>売れやすい価格帯：${fmtYen(range.low)}〜${fmtYen(range.high)}。売上は売上残高に貯まり、銀行口座へ出金できます。</p>`}</div><button id="walletMarketAction" type="button">${listing?"出品を管理する":"出品する"} <b>→</b></button></section>`;
}
function bindWalletMarketCallout(entry){
  const itemId=marketItemIdForEntry(entry),button=$("walletMarketAction");if(!button)return;
  marketModalItemId=itemId;
  button.onclick=()=>marketListingForEntry(entry)?openTradeItemFromApp(itemId):openListingModal(itemId,"create");
}
function walletCollectibleCard(entry,index){
  const info=marketItemInfo(marketItemIdForEntry(entry));if(!info)return "";
  const listing=marketListingForEntry(entry);
  return `<article class="ticket-card owned-ticket-card collectible-card" data-owned-index="${index}" role="button" tabindex="0" aria-label="${escapeHtml(info.name)}の詳細を開く">
    <div class="ticket-art collectible-art"><img src="${info.image}" alt="" aria-hidden="true" loading="lazy" decoding="async"><span>${escapeHtml(info.collection.name)}</span><span>${escapeHtml(info.tierLabel)}</span></div>
    <div class="ticket-info"><h3>${escapeHtml(info.name)}</h3><p>${escapeHtml(marketCategoryLabel(info.collection.category))}・${escapeHtml(info.collection.creator)}<br>${entry.acquisitionType==="market_offer"?"オファーで取得":"PassMarketで購入"}・${fmtYen(entry.priceYen||0)}</p>
      ${listing?`<div class="wallet-listing-badge"><span>PassMarketで出品中</span><b>${fmtYen(listing.price)}</b></div>`:`<div class="added-benefit-badge collectible-badge"><span>✦</span> 詳細・出品 <b>→</b></div>`}</div></article>`;
}
function openWalletCollectibleDetail(index){
  const owned=state.ownedNfts[index],info=marketItemInfo(marketItemIdForEntry(owned));
  if(!owned||!info)return;
  log("owned_nft_opened",{item_id:info.id,token_id:owned.tokenId,collection_id:info.collection.id});
  openModal("OWNED NFT",info.name,`
    <div class="pm-owned-visual"><img src="${info.image}" alt="${escapeHtml(info.name)}"></div>
    <div class="summary owned-token-summary"><div class="summary-row"><span>コレクション</span><strong>${escapeHtml(info.collection.name)}</strong></div><div class="summary-row"><span>トークンID</span><strong>${escapeHtml(owned.tokenId)}</strong></div><div class="summary-row"><span>所有ウォレット</span><strong>${escapeHtml(walletById(nftOwnerWalletId(owned))?.name||"PassWallet")}</strong></div><div class="summary-row"><span>取得方法</span><strong>${owned.acquisitionType==="market_offer"?"オファーが成立":"PassMarketで購入"}（${escapeHtml(owned.sellerName||"—")}から）</strong></div><div class="summary-row"><span>取得価格</span><strong>${fmtYen(owned.priceYen||0)}</strong></div><div class="summary-row"><span>取得日時</span><strong>${new Date(owned.purchasedAt).toLocaleString("ja-JP")}</strong></div></div>
    <div class="pm-traits compact">${info.traits.map(t=>`<div><span>${escapeHtml(t.label)}</span><strong>${escapeHtml(t.value)}</strong>${t.share?`<small>保有率 ${t.share}%</small>`:""}</div>`).join("")}</div>
    ${walletMarketCallout(owned)}`);
  bindWalletMarketCallout(owned);
}
function marketResultData(){
  const m=state.market;
  if(!m)return null;
  return {balance:m.balance,bank_account_registered:!!m.bankAccount,
    sold_nfts:state.ownedNfts.filter(e=>e.soldAt).map(e=>({token_id:e.tokenId,item_id:marketItemIdForEntry(e),sold_at:e.soldAt,price_yen:e.soldPriceYen,net_yen:e.saleNetYen,via:e.soldVia,buyer:e.soldTo})),
    market_purchases:state.ownedNfts.filter(e=>e.acquisitionType==="market_purchase"||e.acquisitionType==="market_offer"),
    active_listings:Object.entries(m.items).filter(([,rec])=>rec.listing?.seller==="me").map(([id,rec])=>({item_id:id,price_yen:rec.listing.price,zone:rec.listing.zone,listed_at:new Date(rec.listing.listedAt).toISOString()})),
    offers_made:m.myOffers,withdrawals:m.withdrawals,ledger:m.ledger,favorites:Object.keys(m.favorites),
    my_activity:m.activity.filter(a=>a.mine)};
}

/* ---------- 初期化（DOMイベント） ---------- */
(()=>{
  const content=document.getElementById("tradeContent");
  if(content){content.addEventListener("click",handleTradeClick);content.addEventListener("change",handleTradeChange);content.addEventListener("keydown",handleTradeKeydown)}
  document.querySelectorAll("#tradeTabs button").forEach(button=>button.addEventListener("click",()=>setTradeTab(button.dataset.tradeTab)));
  document.getElementById("tradeSearch")?.addEventListener("input",handleTradeSearch);
  document.getElementById("tradeBalanceChip")?.addEventListener("click",()=>setTradeTab("balance"));
  document.getElementById("tradeNoticeButton")?.addEventListener("click",openTradeNotifications);
  document.getElementById("tradeGuideNext")?.addEventListener("click",advanceTradeGuide);
  window.addEventListener("resize",()=>{clearTimeout(tradeChartResizeTimer);tradeChartResizeTimer=setTimeout(()=>{if(state.currentApp==="trade")hydrateTradeCharts()},150)});
})();
