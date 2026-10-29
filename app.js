
const WALLET_ADDRESS = "0x7A4F2C9B6E18D4A1F335B9C8705E1199AB8E93C2";
const SEED_WORD_BANK = [
  "orbit","harbor","velvet","maple","crystal","planet","silver","echo","canvas","river","gentle","sunset",
  "nebula","anchor","lunar","copper","meadow","prism","aurora","drift","summit","flame","willow","comet",
  "forest","marble","cobalt","breeze","lantern","ocean","amber","feather","valley","coral","thunder","olive",
  "galaxy","bridge","pearl","canyon","violet","island","meteor","cedar","horizon","frost","clover","dawn"
];
const NETWORK_FEE_ETH = 0.0032;
const PURCHASE_GAS_ETH = 0.0028;
const STORAGE_KEY = "nft-journey-lab-passkey-session-v1";
const GAME_STORAGE_KEYS = ["hoshiwatari-momo-best","tokyo-digital-art-night-jump-best","skyline-music-fest-bounce-best-score","anime-creator-expo-tower-best-score","momo-spike-wall-best"];
const TRANSFER_DELAY_MS = 2200;
const PAYMENT_DELAY_MS = 900;
const PURCHASE_DELAY_MS = 1500;
const PASSKEY_PROMPT_MS = 1400;
const VENUE_SCAN_MS = 1200;
const WALLET_CREATION_NOTICE_MS = 2600;
const MISSION_COMPLETION_NOTICE_MS = 3600;
const AIRDROP_PURCHASE_THRESHOLD = 3;
const AIRDROP_TICKET_ID = "nexus-future-pass";
const MAX_WALLETS = 5;
const TICKET_PRICE_REFERENCE_ETH_YEN = 542800;
const WALLET_SECURITY_GUIDE_STEPS = [
  {tab:"wallet-home",targets:[".wallet-overview-title",".wallet-balance"],label:"1 / 4 · ウォレット",title:"ウォレットが作成されました",description:"実際のウォレットアプリでは、ウォレットを無制限に作成できます。\nこのサイト内では、体験用として最大5個まで作成できるようにしています。",action:"次へ"},
  {tab:"wallet-receive",target:".address-box",label:"2 / 4 · 公開鍵",title:"公開鍵は、暗号資産の受取先を伝えるアドレスです",description:"取引所から暗号資産を送るとき、この公開鍵を送金先へ貼り付けます。\n公開鍵は、暗号資産を受け取るために相手へ共有できます。",action:"次へ"},
  {tab:"wallet-receive",target:".seed-phrase-display",reveal:"seed",label:"3 / 4 · シードフレーズ",title:"ウォレットを復旧するための12単語です",description:"端末の紛失や故障時に、ウォレットを復旧できます。\n実際のウォレットでは、表示する際にパスワードの入力を求められます。\nこの12単語を知る人はウォレットを復旧できるため、第三者には共有しないでください。\nスクリーンショットではなく、紙に手書きして安全な場所に保管することをおすすめします。",action:"次へ"},
  {tab:"wallet-receive",target:".private-key-display",reveal:"private",label:"4 / 4 · 秘密鍵",title:"資産を操作するための最も重要な情報です",description:"秘密鍵を知る人は、ウォレット内の資産を操作できます。\n実際のウォレットでは、表示する際にパスワードの入力を求められます。\n絶対に第三者へ共有しないでください。\nスクリーンショットではなく、紙に手書きして安全な場所に保管することをおすすめします。",action:"閉じる"}
];
const NFT_OWNERSHIP_GUIDE_STEPS = [
  {
    label:"1 / 2 · 購入完了",title:"NFTチケットがウォレットに追加されました",
    body:"<p>ハイライトされているカードが、今回初めて購入したNFTです。この体験では疑似的にウォレットへ追加しています。カードを押すと、会場で開くチケットや保有者向け特典を確認できます。</p><ul><li><strong>使用後も記録として残り、1つのウォレットで管理できる</strong><span><strong style='display:inline;color:#1769ff;font-size:inherit;font-weight:700;line-height:inherit'>使用済みになってもNFTチケットの見た目は変わらず、参加の記録として残ります。さまざまなイベントのチケットを、1つのウォレットでまとめて管理できます。</strong></span></li></ul>",action:"詳細なNFTの説明を読む"
  },
  {
    label:"ポイント 1 / 4 · 所有の記録",title:"NFTは1点ずつ識別して所有者を確認できます",
    body:"<p>実際のNFTでは、コントラクトアドレスとトークンIDの組み合わせで資産を識別し、ブロックチェーン上の所有者を確認できます。</p><p>この仕組みは、チケットの真正性確認や偽造対策、入場管理にも活用できます。</p>",action:"次へ"
  },
  {
    label:"ポイント 2 / 4 · 運営元・地域のメリット",title:"保有者との関係を継続し、再訪や地域経済への波及につなげられます",
    body:"<ul><li><strong>保有者との継続的な関係</strong><span>所有者を確認できるため、保有者限定イベント、コミュニティ参加、追加配布、限定商品の販売などを継続して案内できます。訪問後もNFTが地域との関係を示す形で残り、接点をつくりやすくなります。</span></li><li><strong>二次流通（転売）からの還元</strong><span>一般的なCtoC（メルカリなど）では、売買手数料が商品の開発元へ還元されません。NFTでは、対応する販売サービスを通じて二次流通の売上の一部を運営元へ還元する仕組みを設定でき、地方自治体などの継続的な財源確保につながる可能性があります。</span></li><li><strong>第三者による特典の付与</strong><span>NFTの保有情報はブロックチェーン上で確認できるため、第三者も対象のNFTを保有するウォレットを判別できます。例えば、イベント付近の飲食店がクーポン自体をNFT（クーポンNFT）として対象ウォレットへ配布できます。これにより、イベントとその参加者だけでなく、周辺店舗を含む地域経済への波及が期待できます。</span></li></ul>",action:"次へ"
  },
  {
    label:"ポイント 3 / 4 · 保有者のメリット",title:"チケットをまとめて保存し、転売対策にも活用できます",
    body:"<ul><li><strong>1つのウォレットで保存</strong><span>異なるライブやイベントのNFTチケットを1つのウォレットで保存できます。来場記録と連携したNFTは、イベント終了後も参加の証明や思い出として確認できます。</span></li><li><strong>保有者限定の体験や特典</strong><span>NFTの保有を証明することで、保有者限定イベント、デジタルコンテンツ、コミュニティ、クーポンなどを利用できる場合があります。</span></li><li><strong>SBTによる転売防止</strong><span>運営元がSBT（ソウルバウンドトークン）という形態のNFTを発行すると、転売を不可能にすることができ、本当に欲しい人だけが購入することができます。</span></li></ul>",action:"次へ"
  },
  {
    label:"ポイント 4 / 4 · 安全に利用するために",title:"公開情報と偽サイトに注意してください",
    body:"<p>NFTの保有状況や取引履歴は公開される場合があります。特典を装う偽サイトでは署名や承認をしないでください。</p><p>紹介したメリットは、NFTの設計、保存方法、対応サービス、運営方針によって異なります。</p>",action:"閉じる"
  }
];
const NFT_BENEFIT_PROGRAMS = {
  "nova-live":{
    gameName:"星わたり モモ",challengeTitle:"NOVA LIVE 2026 特典チャレンジ",
    gameSrc:"./experience-game/index.html?v=4.5.3",frameTitle:"星わたり モモ",messageType:"nova-live-game-score",
    benefits:[
      {score:10,title:"グッズ 10%OFFクーポン",short:"10%OFF",code:"NOVA10"},
      {score:30,title:"グッズ 20%OFFクーポン",short:"20%OFF",code:"NOVA20"},
      {score:50,title:"限定グッズプレゼント",short:"限定グッズ",code:null}
    ]
  },
  "digital-art":{
    gameName:"星わたりジャンプ モモ",challengeTitle:"TOKYO DIGITAL ART NIGHT 特典チャレンジ",
    gameSrc:"./digital-art-game/index.html?v=1.0.4",frameTitle:"星わたりジャンプ モモ",messageType:"digital-art-game-score",
    benefits:[
      {score:3000,title:"10%OFFクーポン",short:"10%OFF",code:"TDAN10"},
      {score:5000,title:"20%OFFクーポン",short:"20%OFF",code:"TDAN20"},
      {score:10000,title:"限定グッズプレゼント",short:"限定グッズ",code:null}
    ]
  },
  "skyline-fest":{
    gameName:"星くずバウンド モモ",challengeTitle:"SKYLINE MUSIC FEST 特典チャレンジ",
    gameSrc:"./skyline-game/index.html?v=1.0.5",frameTitle:"星くずバウンド モモ",messageType:"skyline-fest-game-score",
    benefits:[
      {score:10,title:"10%OFFクーポン",short:"10%OFF",code:"SKYLINE10"},
      {score:20,title:"20%OFFクーポン",short:"20%OFF",code:"SKYLINE20"},
      {score:30,title:"限定グッズプレゼント",short:"限定グッズ",code:null}
    ]
  },
  "creator-expo":{
    gameName:"星くずタワー モモ",challengeTitle:"ANIME CREATOR EXPO 特典チャレンジ",
    gameSrc:"./creator-expo-game/index.html?v=1.0.7",frameTitle:"星くずタワー モモ",messageType:"creator-expo-game-score",
    benefits:[
      {score:10,title:"10%OFFクーポン",short:"10%OFF",code:"ACE10"},
      {score:20,title:"20%OFFクーポン",short:"20%OFF",code:"ACE20"},
      {score:30,title:"限定グッズプレゼント",short:"限定グッズ",code:null}
    ]
  },
  "light-show":{
    gameName:"モモのトゲかべタップ",challengeTitle:"BAY AREA LIGHT SHOW 特典チャレンジ",
    gameSrc:"./light-show-game/index.html?v=1.0.2",frameTitle:"モモのトゲかべタップ",messageType:"light-show-game-score",
    benefits:[
      {score:10,title:"10%OFFクーポン",short:"10%OFF",code:"BAYLIGHT10"},
      {score:20,title:"20%OFFクーポン",short:"20%OFF",code:"BAYLIGHT20"},
      {score:30,title:"限定グッズプレゼント",short:"限定グッズ",code:null}
    ]
  }
};

const tickets = [
  {id:"nova-live",title:"NOVA LIVE 2026",category:"音楽ライブ",date:"2026.10.18",venue:"Tokyo Bay Hall",price:0.038,code:"NL",benefit:"限定ライブ映像・デジタルポスター",image:"assets/tickets/nova-live.webp"},
  {id:"digital-art",title:"TOKYO DIGITAL ART NIGHT",category:"デジタルアート",date:"2026.09.12",venue:"Odaiba Art Dock",price:0.021,code:"DA",benefit:"限定アート作品・優先入場",image:"assets/tickets/digital-art.webp"},
  {id:"skyline-fest",title:"SKYLINE MUSIC FEST",category:"音楽フェス",date:"2026.11.03",venue:"Yokohama Harbor Stage",price:0.028,code:"SF",benefit:"出演者ボイス・会場限定特典",image:"assets/tickets/skyline-fest.webp"},
  {id:"creator-expo",title:"ANIME CREATOR EXPO",category:"展示・交流イベント",date:"2026.12.06",venue:"Makuhari Event Hall",price:0.016,code:"AC",benefit:"デジタルパンフレット・抽選参加権",image:"assets/tickets/creator-expo.webp"},
  {id:"light-show",title:"BAY AREA LIGHT SHOW",category:"観光・ナイトイベント",date:"2026.08.29",venue:"Toyosu Seaside Park",price:0.012,code:"BL",benefit:"記念NFT・提携施設クーポン",image:"assets/tickets/light-show.webp"},
  {id:AIRDROP_TICKET_ID,title:"NEXUS FUTURE PASS",category:"エアドロップ限定",date:"SPECIAL ACCESS",venue:"Nexus Gateway",price:0,code:"NX",benefit:"NFTチケット3枚購入者限定・未来体験への特別アクセス",image:"assets/tickets/nexus-future-pass.webp",airdropOnly:true}
];

const markets = {
  BTC:{name:"Bitcoin",price:16482000,change:1.82},
  ETH:{name:"Ethereum",price:TICKET_PRICE_REFERENCE_ETH_YEN,change:2.14},
  XRP:{name:"XRP",price:428.4,change:-.63},
  SOL:{name:"Solana",price:27860,change:3.09},
  DOGE:{name:"Dogecoin",price:38.72,change:-1.18}
};

const missions = [
  ["select","NFTチケットを選択","希望するイベントを選ぶ"],
  ["payment","クレジットカード等で決済","日本円でお支払い"],
  ["wallet","パスキーを設定してウォレット作成","顔認証・指紋認証でPassWalletを作成"],
  ["acquire","NFTチケットを取得","PassWalletへ自動で追加"],
  ["scan","会場でチケットを開き、QRを読み取る","会場側のQRコードを読み取る"],
  ["admission","入館処理を完了する","パスキーで認証し、チケットを使用済みにする"],
  ["trade","マーケットを開く","マーケットの説明を最後まで確認する"]
];

const missionHints = {
  select:{service:"Ticket Store",summary:"一般的な電子チケットと同じように、希望するイベントを一覧から選びます。",steps:["画面上部の「チケット購入」を開きます。","イベントの内容と日本円価格を確認します。","希望するチケットの「選択する」を押します。"],tip:"価格はチケットごとに異なります。ログインは不要です。",app:"market",tab:null,action:"チケットを選ぶ"},
  payment:{service:"Ticket Store",summary:"クレジットカードなど、使い慣れた日本円決済でお支払いします。",steps:["購入内容と金額を確認します。","支払い方法を1つ選びます。","表示された金額の支払いボタンを押します。"],tip:"実際の請求は発生せず、入力済みのテストカードを使用します。",app:"market",tab:null,action:"選択したチケットを確認する"},
  wallet:{service:"PassWallet",summary:"決済完了後、パスキー（顔認証や指紋認証）を設定すると、PassWalletのウォレットが作成されます。",steps:["決済完了後に表示される「パスキーを設定する」を押します。","顔認証または指紋認証の確認を完了します。","PassWalletのウォレットが自動で作成されます。"],tip:"パスワードや秘密鍵、シードフレーズの入力・保管は不要です。",app:"market",tab:null,action:"パスキーを設定する"},
  acquire:{service:"PassWallet",summary:"ウォレット作成後、NFTチケットは自動でPassWalletへ追加されます。",steps:["チケット発行が完了するまで待ちます。","獲得画面の「閉じる」を押します。","画面上部の「PassWallet」を開き、チケットを確認します。"],tip:"専門的な承認や追加の手数料操作は必要ありません。",app:"wallet",tab:"wallet-nft",action:"PassWalletを開く"},
  scan:{service:"PassWallet",summary:"会場でNFTチケットを開き、会場側に掲示されているQRコードを読み取ります。",steps:["画面上部の「PassWallet」を開き、保有チケットをタップします。","「会場でチケットを開く」を押します。","「会場のQRコードを読み取る」を押し、会場のQRコードを読み取ります。"],tip:"QRコードは研究用の疑似画面です。カメラは使用しません。",app:"wallet",tab:"wallet-nft",action:"保有チケットを開く"},
  admission:{service:"PassWallet",summary:"会場QRの読み取り後、パスキー（顔認証や指紋認証）で本人確認をすると、NFTチケットが使用済みになり入場できます。",steps:["「パスキーで認証して入場」を押します。","顔認証または指紋認証の確認を完了します。","NFTチケットが使用済みになり、入場が完了します。"],tip:"使用済みになったNFTチケットは再利用できません。",app:"wallet",tab:"wallet-nft",action:"保有チケットを開く"},
  trade:{service:"マーケット",summary:"NFTの売買ができるマーケットを開き、出品されているNFTを確認します。",steps:["画面上部の「マーケット」を押します。","表示される説明を「次へ」で最後まで読みます。","最後の説明で「はじめる」を押します。"],tip:"マーケットの説明を最後まで読み、「はじめる」を押すと、この進捗は完了します。購入や出品は必須ではありません。",app:"trade",tab:null,action:"マーケットを開く"}
};

function createDefaultState(){
  return {
    participantId:null, startedAt:null, completedAt:null, completionProgressGuideCompleted:false,
    currentApp:"market", currentWalletTab:"wallet-nft",
    appSwitchCount:0, helpOpenCount:0, copyCount:0, pasteCount:0, signatureCount:0, validationErrors:0,
    appEnteredAt:null, appTimes:{wallet:0,market:0,trade:0},
    passkeyCreated:false, passkeyCreatedAt:null, accountBalanceGuideCompleted:true, ethPurchased:false, walletCreated:false, seedConfirmed:false, privateKey:null,
    wallets:[], activeWalletId:null, connectedWalletId:null, copiedWalletId:null,
    walletSecurityGuideCompleted:false, nftOwnershipGuideCompleted:false, firstPurchasedNftTokenId:null, airdropGuideCompleted:false, admissionResaleGuideShown:false,
    addressCopied:false, addressPasted:false, transferSent:false, transferReceived:false, receiptChecked:false, walletReceiptGuideCompleted:false, transferPending:false, transferCompletesAt:null, transferDestinationWalletId:null, lastReceivedAmount:0, lastReceivedWalletId:null,
    marketConnected:false, connectionSigned:false, selectedTicketId:null, ticketSelectedAt:null,
    paymentMethod:null, paymentStatus:null, paymentStartedAt:null, paymentCompleted:false, paymentCompletedAt:null,
    purchaseSigned:false, nftOwned:false, ownedNfts:[], pendingPurchaseTicketId:null, pendingPurchaseWalletId:null, purchaseCompletesAt:null, admissionPassViewed:false,
    exchangeYen:100000, exchangeEth:0, walletEth:0, purchasedEth:0, purchaseYen:"",
    buyAgreementChecked:false, ethPriceAtPurchase:null, purchaseHistory:[],
    destinationAddress:"", transferAmount:"",
    activeGameTicketId:null,
    market:null, tradeOpened:false, tradeGuideCompleted:false, passkeyGuideShown:false, marketOrder:null, tradeView:null,
    gameProgress:Object.fromEntries(Object.keys(NFT_BENEFIT_PROGRAMS).map(ticketId=>[ticketId,{bestScore:0,lastScore:0,playCount:0,benefitsUnlockedAt:{}}])),
    eventLog:[]
  };
}

function loadSavedState(){
  const defaults=createDefaultState();
  try{
    const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");
    if(!saved?.state||saved.version!==2)return defaults;
    const restored={...defaults,...saved.state};
    restored.appTimes={...defaults.appTimes,...saved.state.appTimes};
    restored.gameProgress=Object.fromEntries(Object.keys(defaults.gameProgress).map(ticketId=>[
      ticketId,
      {...defaults.gameProgress[ticketId],...saved.state.gameProgress?.[ticketId],benefitsUnlockedAt:{...defaults.gameProgress[ticketId].benefitsUnlockedAt,...saved.state.gameProgress?.[ticketId]?.benefitsUnlockedAt}}
    ]));
    restored.ownedNfts=Array.isArray(saved.state.ownedNfts)?saved.state.ownedNfts:[];
    restored.purchaseHistory=Array.isArray(saved.state.purchaseHistory)?saved.state.purchaseHistory:[];
    restored.eventLog=Array.isArray(saved.state.eventLog)?saved.state.eventLog:[];
    if(!["wallet","market","trade"].includes(restored.currentApp))restored.currentApp="market";
    if(!["wallet-nft","wallet-benefits"].includes(restored.currentWalletTab))restored.currentWalletTab="wallet-nft";
        if(typeof saved.state.walletReceiptGuideCompleted!=="boolean")restored.walletReceiptGuideCompleted=!!saved.state.receiptChecked;
    if(typeof saved.state.walletSecurityGuideCompleted!=="boolean")restored.walletSecurityGuideCompleted=!!saved.state.walletCreated;
    const savedWallets=Array.isArray(saved.state.wallets)?saved.state.wallets:[];
    restored.wallets=savedWallets.map((wallet,index)=>({
      id:String(wallet.id||`wallet-${index+1}`),
      name:String(wallet.name||`ウォレット ${index+1}`),
      address:/^0x[0-9a-f]{40}$/i.test(wallet.address||"")?wallet.address:generateDemoWalletAddress(),
      privateKey:/^0x[0-9a-f]{64}$/i.test(wallet.privateKey||"")?wallet.privateKey:generateDemoPrivateKey(),
      ethBalance:Math.max(0,Number(wallet.ethBalance)||0),
      createdAt:wallet.createdAt||restored.startedAt||now(),
      seedPhrase:Array.isArray(wallet.seedPhrase)&&wallet.seedPhrase.length===12?wallet.seedPhrase.map(String):seedWordsForWallet(index+1)
    }));
    if(!restored.wallets.length&&restored.walletCreated){
      restored.wallets.push({id:"wallet-1",name:"ウォレット 1",address:WALLET_ADDRESS,privateKey:/^0x[0-9a-f]{64}$/i.test(restored.privateKey||"")?restored.privateKey:generateDemoPrivateKey(),ethBalance:Math.max(0,Number(restored.walletEth)||0),createdAt:restored.startedAt||now(),seedPhrase:seedWordsForWallet(1)});
    }
    restored.walletCreated=restored.wallets.length>0;
    restored.seedConfirmed=restored.wallets.length>0;
    if(!restored.wallets.some(wallet=>wallet.id===restored.activeWalletId))restored.activeWalletId=restored.wallets[0]?.id||null;
    const activeRestoredWallet=restored.wallets.find(wallet=>wallet.id===restored.activeWalletId)||null;
    restored.privateKey=activeRestoredWallet?.privateKey||null;
    restored.walletEth=activeRestoredWallet?.ethBalance||0;
    if(restored.addressCopied&&!restored.wallets.some(wallet=>wallet.id===restored.copiedWalletId))restored.copiedWalletId=activeRestoredWallet?.id||null;
    if(restored.transferPending&&!restored.wallets.some(wallet=>wallet.id===restored.transferDestinationWalletId)){
      restored.transferDestinationWalletId=restored.wallets.find(wallet=>wallet.address.toLowerCase()===String(restored.destinationAddress||"").toLowerCase())?.id||activeRestoredWallet?.id||null;
    }
    if(restored.transferReceived&&!restored.wallets.some(wallet=>wallet.id===restored.lastReceivedWalletId))restored.lastReceivedWalletId=activeRestoredWallet?.id||null;
    if(restored.marketConnected&&!restored.wallets.some(wallet=>wallet.id===restored.connectedWalletId))restored.connectedWalletId=restored.wallets[0]?.id||null;
    if(!restored.walletCreated||!restored.seedConfirmed||!restored.connectedWalletId){restored.marketConnected=false;restored.connectionSigned=false;restored.connectedWalletId=null}
    const fallbackOwner=restored.wallets[0]||null;
    restored.ownedNfts=restored.ownedNfts.map(item=>{
      const owner=restored.wallets.find(wallet=>wallet.id===item.ownerWalletId)||fallbackOwner;
      return {...item,ownerWalletId:owner?.id||null,ownerAddress:item.ownerAddress||owner?.address||null};
    });
    const restoredPurchases=restored.ownedNfts.filter(item=>item.acquisitionType!=="airdrop");
    if(!restoredPurchases.some(item=>item.tokenId===restored.firstPurchasedNftTokenId))restored.firstPurchasedNftTokenId=restoredPurchases[0]?.tokenId||null;
    if(typeof saved.state.nftOwnershipGuideCompleted!=="boolean")restored.nftOwnershipGuideCompleted=false;
    if(typeof saved.state.admissionResaleGuideShown!=="boolean")restored.admissionResaleGuideShown=restored.ownedNfts.some(item=>!!item.admissionUsedAt);
    if(restored.pendingPurchaseTicketId&&!restored.wallets.some(wallet=>wallet.id===restored.pendingPurchaseWalletId))restored.pendingPurchaseWalletId=restored.connectedWalletId||activeRestoredWallet?.id||null;
    if(!restored.transferReceived)restored.receiptChecked=false;
    restored.appEnteredAt=null;
    restored.activeGameTicketId=null;
    return restored;
  }catch(error){
    console.warn("保存されたセッションを読み込めませんでした。",error);
    return defaults;
  }
}

let persistTimer=null;
let resetInProgress=false;
function stateSnapshot(){
  const snapshot=JSON.parse(JSON.stringify(state));
  if(snapshot.participantId&&state.appEnteredAt!==null&&snapshot.appTimes[state.currentApp]!==undefined){
    snapshot.appTimes[state.currentApp]+=Math.max(0,Math.round((performance.now()-state.appEnteredAt)/1000));
  }
  snapshot.appEnteredAt=null;
  snapshot.activeGameTicketId=null;
  return snapshot;
}
function persistState(){
  clearTimeout(persistTimer);persistTimer=null;
  if(resetInProgress||!state.participantId)return;
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:2,savedAt:now(),state:stateSnapshot()}))}
  catch(error){console.warn("セッションを保存できませんでした。",error)}
}
function schedulePersist(){
  clearTimeout(persistTimer);persistTimer=setTimeout(persistState,0);
}
function makePersistent(target,cache=new WeakMap()){
  if(!target||typeof target!=="object")return target;
  if(cache.has(target))return cache.get(target);
  const proxy=new Proxy(target,{
    get(object,key,receiver){return makePersistent(Reflect.get(object,key,receiver),cache)},
    set(object,key,value,receiver){const changed=Reflect.get(object,key,receiver)!==value;const result=Reflect.set(object,key,value,receiver);if(changed)schedulePersist();return result},
    deleteProperty(object,key){const existed=Reflect.has(object,key);const result=Reflect.deleteProperty(object,key);if(existed)schedulePersist();return result}
  });
  cache.set(target,proxy);return proxy;
}
const state = makePersistent(loadSavedState());
const missionCompletionAnnounced=new Set(missions.filter(([key])=>missionStatus(key)).map(([key])=>key));

let tickerTimer=null;
let transferTimer=null;
let purchaseTimer=null;
let passkeyTimer=null;
let missionCompletionNoticeTimer=null;
let missionCompletionNoticeActive=false;
let missionCompletionNoticeCurrent=null;
let missionCompletionNoticeRequestTimer=null;
const missionCompletionNoticeQueue=[];
const missionCompletionNoticeLogged=new Set();
let completionProgressGuideTimer=null;
let progressGuideMode="intro";
let privateKeyVisible=false;
let seedPhraseVisible=false;
let walletSecurityGuideStep=0;
let walletSecurityGuideTarget=null;
let walletSecurityGuideTargets=[];
let walletSecurityGuideInitialScroll={x:0,y:0};
let nftOwnershipGuideStep=0;
let nftOwnershipGuideTarget=null;
let nftOwnershipGuideScheduled=false;
let nftOwnershipGuideMode="purchase";
let exchangeBalanceGuideTarget=null;
let exchangeBalanceGuideInitialScroll={x:0,y:0};
let exchangeBalanceGuideMode="account";
let signatureGuideTarget=null;
let signatureGuideWalletId=null;
let signatureGuideMode=null;
let guidePositionRefreshFrame=null;
let guidePositionRefreshPasses=0;
let guideGeometryMonitorFrame=null;
let guideGeometryKey="";
let mobileGuideTouchY=null;
let activeAdmissionIndex=null;
let admissionTimer=null;
let admissionResaleGuideTarget=null;
let chartSeries=[536400,538100,537300,540600,539900,541700,542800];

const $ = id => document.getElementById(id);
const landing=$("landing"),workspace=$("workspace"),appSwitcher=$("appSwitcher");
const walletApp=$("walletApp"),marketApp=$("marketApp"),tradeApp=$("tradeApp");
const walletContent=$("walletContent"),marketContent=$("marketContent");

function now(){return new Date().toISOString()}
function participantId(){return `P-${Date.now().toString(36).toUpperCase().slice(-6)}`}
function generateDemoPrivateKey(){
  const bytes=new Uint8Array(32);
  if(globalThis.crypto?.getRandomValues)globalThis.crypto.getRandomValues(bytes);
  else for(let index=0;index<bytes.length;index++)bytes[index]=Math.floor(Math.random()*256);
  return `0x${Array.from(bytes,byte=>byte.toString(16).padStart(2,"0")).join("")}`;
}
function generateDemoWalletAddress(){
  const bytes=new Uint8Array(20);
  if(globalThis.crypto?.getRandomValues)globalThis.crypto.getRandomValues(bytes);
  else for(let index=0;index<bytes.length;index++)bytes[index]=Math.floor(Math.random()*256);
  return `0x${Array.from(bytes,byte=>byte.toString(16).padStart(2,"0")).join("").toUpperCase()}`;
}
function seedWordsForWallet(walletNumber){
  const start=((Math.max(1,Number(walletNumber)||1)-1)*12)%SEED_WORD_BANK.length;
  return Array.from({length:12},(_,index)=>SEED_WORD_BANK[(start+index)%SEED_WORD_BANK.length]);
}
function log(type,detail={}){state.eventLog.push({timestamp:now(),app:state.currentApp,type,...detail})}
function fmtEth(v){return `${Number(v||0).toFixed(4)} ETH`}
function fmtYen(v){return `¥${Math.round(Number(v||0)).toLocaleString("ja-JP")}`}
function fmtTicketYen(v){return `${Math.round(Number(v||0)).toLocaleString("ja-JP")}円`}
function ticket(){return tickets.find(t=>t.id===state.selectedTicketId)||null}
function ticketPriceYen(t){return Math.round(Number(t?.price||0)*TICKET_PRICE_REFERENCE_ETH_YEN/100)*100}
function ticketPriceYenById(ticketId){return ticketPriceYen(tickets.find(t=>t.id===ticketId))}
function escapeHtml(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function walletById(walletId){return state.wallets.find(wallet=>wallet.id===walletId)||null}
function walletByAddress(address){
  const normalized=String(address||"").trim().toLowerCase();
  return state.wallets.find(wallet=>wallet.address.toLowerCase()===normalized)||null;
}
function activeWallet(){return walletById(state.activeWalletId)||state.wallets[0]||null}
function connectedWallet(){return state.marketConnected?walletById(state.connectedWalletId):null}
function shortWalletAddress(address){return address?`${address.slice(0,10)}...${address.slice(-6)}`:"—"}
function syncLegacyWalletState(){
  const wallet=activeWallet();
  state.walletCreated=state.wallets.length>0;state.seedConfirmed=state.wallets.length>0;
  state.privateKey=wallet?.privateKey||null;state.walletEth=wallet?.ethBalance||0;
}
function nftOwnerWalletId(item){return item?.soldAt?null:item?.ownerWalletId||state.wallets[0]?.id||null}
function ownedNftsForWallet(walletId){return state.ownedNfts.filter(item=>nftOwnerWalletId(item)===walletId)}
function ownsTicket(ticketId,walletId=null){return state.ownedNfts.some(item=>item.ticketId===ticketId&&(!walletId||nftOwnerWalletId(item)===walletId))}
function purchasedNftCount(){return state.ownedNfts.filter(item=>item.acquisitionType==="fiat_purchase").length}
function airdropTicket(){return tickets.find(item=>item.id===AIRDROP_TICKET_ID)}
function maybeGrantAirdrop(trigger="purchase_threshold",ownerWalletId=null){
  if(purchasedNftCount()<AIRDROP_PURCHASE_THRESHOLD||ownsTicket(AIRDROP_TICKET_ID))return null;
  const owner=walletById(ownerWalletId)||connectedWallet()||activeWallet();
  const grantedAt=now();
  const reward={tokenId:`MG-AIR-${Date.now().toString().slice(-8)}`,ticketId:AIRDROP_TICKET_ID,purchasedAt:grantedAt,acquisitionType:"airdrop",airdropTriggerCount:purchasedNftCount(),ownerWalletId:owner?.id||null,ownerAddress:owner?.address||null};
  state.ownedNfts.push(reward);noteNftMinted(reward);
  log("nft_airdrop_received",{ticket_id:AIRDROP_TICKET_ID,token_id:reward.tokenId,purchased_nft_count:reward.airdropTriggerCount,wallet_id:owner?.id||null,trigger});
  return reward;
}
function benefitProgram(ticketId){return NFT_BENEFIT_PROGRAMS[ticketId]||null}
function gameProgress(ticketId){return state.gameProgress[ticketId]}
function benefitUnlocked(ticketId,benefit){return gameProgress(ticketId).bestScore>=benefit.score}
function nextBenefit(ticketId){return benefitProgram(ticketId)?.benefits.find(benefit=>!benefitUnlocked(ticketId,benefit))||null}
function fmtScore(value){return Number(value||0).toLocaleString("ja-JP")}
// 操作結果の通知を優先し、表示中だった達成通知はこの通知が消えた後に改めて表示する
function toast(message){
  suspendMissionCompletionNotice();
  const el=$("toast");el.className="toast";el.textContent=message;
  clearTimeout(toast.t);toast.t=setTimeout(()=>{el.classList.add("hidden");requestMissionCompletionNotice()},2100);
}
function showEthSuccess(title,detail,duration=4200,extraClass=""){
  if(!extraClass.includes("mission-completion-success-toast"))suspendMissionCompletionNotice();
  const el=$("toast");el.className=`toast eth-success-toast${extraClass?` ${extraClass}`:""}`;
  el.style.setProperty("--success-toast-duration",`${duration}ms`);
  el.innerHTML=`<span class="eth-success-toast-icon">✓</span><div><strong>${escapeHtml(title)}</strong><small>${escapeHtml(detail)}</small></div>`;
  clearTimeout(toast.t);toast.t=setTimeout(()=>{el.classList.add("hidden");requestMissionCompletionNotice()},duration);
}
function showEthPurchaseSuccess(received){
  showEthSuccess("ETHの購入が完了しました",`${Number(received).toFixed(6)} ETH を取引所残高に追加しました`);
}
function showEthTransferStarted(amount){
  showEthSuccess("ETHの送金を開始しました",`${Number(amount).toFixed(6)} ETH を Orbit Wallet へ送金しています`);
}
function showEthTransferCompleted(amount){
  showEthSuccess("ETHの送金が完了しました",`${Number(amount).toFixed(6)} ETH が Orbit Wallet に反映されました`);
}
function showWalletCreationSuccess(wallet){
  showEthSuccess("ウォレットの作成が完了しました",`${wallet.name}の公開鍵・シードフレーズ・秘密鍵を生成しました`,WALLET_CREATION_NOTICE_MS,"wallet-creation-success-toast");
}
function error(message){state.validationErrors++;log("validation_error",{message});toast(message)}

function positionedGuideOpen(){return exchangeBalanceGuideOpen()||walletSecurityGuideOpen()||nftOwnershipGuideOpen()||signatureGuideOpen()||admissionResaleGuideOpen()||tradeGuideOpen()||passkeyGuideOpen()}
function guideTargetGeometryKey(){
  const viewport=window.visualViewport;
  const values=[window.innerWidth,window.innerHeight,viewport?.width||0,viewport?.height||0,viewport?.offsetLeft||0,viewport?.offsetTop||0,viewport?.scale||1];
  const targets=[];
  if(exchangeBalanceGuideOpen()&&exchangeBalanceGuideTarget?.isConnected)targets.push(exchangeBalanceGuideTarget);
  if(walletSecurityGuideOpen())targets.push(...walletSecurityGuideTargets.filter(target=>target?.isConnected));
  if(nftOwnershipGuideOpen()&&nftOwnershipGuideTarget?.isConnected)targets.push(nftOwnershipGuideTarget);
  if(signatureGuideOpen()&&signatureGuideTarget?.isConnected)targets.push(signatureGuideTarget);
  if(admissionResaleGuideOpen()&&admissionResaleGuideTarget?.isConnected)targets.push(admissionResaleGuideTarget);
  if(tradeGuideOpen()&&tradeGuideTarget?.isConnected)targets.push(tradeGuideTarget);
  if(passkeyGuideOpen()&&passkeyGuideTarget?.isConnected)targets.push(passkeyGuideTarget);
  targets.forEach(target=>{const rect=target.getBoundingClientRect();values.push(rect.left,rect.top,rect.right,rect.bottom)});
  return values.map(value=>Math.round(value*100)/100).join("|");
}
function refreshOpenGuidePositions(){
  if(exchangeBalanceGuideOpen())positionExchangeBalanceGuide();
  if(walletSecurityGuideOpen())positionWalletSecurityGuide();
  if(nftOwnershipGuideOpen())positionNftOwnershipGuide();
  if(signatureGuideOpen())positionSignatureGuide();
  if(admissionResaleGuideOpen())positionAdmissionResaleGuide();
  if(tradeGuideOpen())positionTradeGuide();
  if(passkeyGuideOpen())positionPasskeyGuide();
}
function scheduleGuidePositionRefresh(passes=3){
  if(!positionedGuideOpen())return;
  guidePositionRefreshPasses=Math.max(guidePositionRefreshPasses,passes);
  if(guidePositionRefreshFrame!==null)return;
  const refresh=()=>{
    guidePositionRefreshFrame=null;
    if(!positionedGuideOpen()){guidePositionRefreshPasses=0;return}
    refreshOpenGuidePositions();
    guidePositionRefreshPasses--;
    if(guidePositionRefreshPasses>0)guidePositionRefreshFrame=requestAnimationFrame(refresh);
  };
  guidePositionRefreshFrame=requestAnimationFrame(refresh);
}
function startGuideGeometryMonitor(){
  suspendMobileMissionCompletionNotice();
  if(guideGeometryMonitorFrame!==null)return;
  guideGeometryKey="";
  const monitor=()=>{
    guideGeometryMonitorFrame=null;
    if(!positionedGuideOpen()){guideGeometryKey="";return}
    const nextKey=guideTargetGeometryKey();
    if(nextKey!==guideGeometryKey){guideGeometryKey=nextKey;scheduleGuidePositionRefresh(3)}
    guideGeometryMonitorFrame=requestAnimationFrame(monitor);
  };
  guideGeometryMonitorFrame=requestAnimationFrame(monitor);
}

function whenScrollSettles(callback){
  let lastY=window.scrollY,stableFrames=0,frames=0;
  const tick=()=>{
    const y=window.scrollY;
    stableFrames=Math.abs(y-lastY)<.5?stableFrames+1:0;lastY=y;frames++;
    if(stableFrames>=4||frames>=90)callback();else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function exchangeBalanceGuideOpen(){return !$("exchangeBalanceGuide").classList.contains("hidden")}
function startExchangeBalanceGuide(mode="account"){
  const isPurchaseGuide=mode==="purchase";
  const isWalletReceiptGuide=mode==="wallet-receipt";
  if((!isPurchaseGuide&&!isWalletReceiptGuide&&state.accountBalanceGuideCompleted)||(isPurchaseGuide&&!state.ethPurchased)||(isWalletReceiptGuide&&(!state.receiptChecked||state.walletReceiptGuideCompleted))||exchangeBalanceGuideOpen())return;
  exchangeBalanceGuideMode=isWalletReceiptGuide?"wallet-receipt":isPurchaseGuide?"purchase":"account";
  if(state.currentApp!=="wallet")switchApp("wallet");
  if(state.currentWalletTab!=="wallet-home"){state.currentWalletTab="wallet-home";renderWallet()}
  exchangeBalanceGuideTarget=document.querySelector(isWalletReceiptGuide?"#walletContent .wallet-balance":"#exchangeContent .exchange-balance");
  if(!exchangeBalanceGuideTarget)return;
  window.scrollTo({left:window.scrollX,top:window.scrollY,behavior:"auto"});
  exchangeBalanceGuideInitialScroll={x:window.scrollX,y:window.scrollY};
  document.documentElement.classList.add("exchange-balance-guide-open");
  document.body.classList.add("exchange-balance-guide-open");
  exchangeBalanceGuideTarget.classList.add("wallet-guide-highlight");
  $("exchangeBalanceGuide").classList.toggle("wallet-receipt-guide",isWalletReceiptGuide);
  $("exchangeBalanceGuideLabel").textContent=isWalletReceiptGuide?"GUIDE · 受取確認":isPurchaseGuide?"GUIDE · イーサリアム":"GUIDE · 取引所口座";
  $("exchangeBalanceGuideTitle").textContent=isWalletReceiptGuide?"ウォレットへの反映を確認しました":isPurchaseGuide?"イーサリアムを購入できました":"今回は10万円の疑似残高を用意しました";
  $("exchangeBalanceGuideDescription").textContent=isWalletReceiptGuide
    ?"暗号資産取引所からイーサリアムの送金が完了し、ウォレットへ反映されました。\n実際はウォレットに反映されるのに数分かかる場合があります。"
    :isPurchaseGuide?"暗号資産はビットコインが有名ですが、NFTの購入にはイーサリアムがよく使われます。\n暗号資産は株と同じように価格が変動しますので、ご注意ください。"
    :"本来は銀行口座を連携させて、日本円を取引所の口座に入金する必要があります。";
  $("exchangeBalanceGuideBackdrop").classList.remove("hidden");
  $("exchangeBalanceGuideBackdrop").setAttribute("aria-hidden","false");
  $("exchangeBalanceGuide").classList.remove("hidden");
  startGuideGeometryMonitor();scheduleGuidePositionRefresh(4);
  log("exchange_balance_guide_opened",{guide:exchangeBalanceGuideMode,yen_balance:state.exchangeYen,eth_balance:state.exchangeEth});
  requestAnimationFrame(()=>{
    if(!exchangeBalanceGuideOpen())return;
    for(let attempt=0;attempt<3;attempt++){
      positionExchangeBalanceGuide();
      if(!keepExchangeBalanceGuideTargetInView())break;
    }
    positionExchangeBalanceGuide();
    $("exchangeBalanceGuideClose").focus({preventScroll:true});
  });
}
function positionExchangeBalanceGuide(){
  if(!exchangeBalanceGuideOpen()||!exchangeBalanceGuideTarget?.isConnected)return;
  const targetRect=exchangeBalanceGuideTarget.getBoundingClientRect(),bubble=$("exchangeBalanceGuide");
  bubble.style.removeProperty("top");bubble.style.removeProperty("right");bubble.style.removeProperty("bottom");bubble.style.removeProperty("left");
  const viewportMargin=12,margin=16,bubbleWidth=bubble.offsetWidth,bubbleHeight=bubble.offsetHeight;
  const notice=$("toast"),noticeVisible=notice.classList.contains("eth-success-toast")&&!notice.classList.contains("hidden");
  const noticeBottom=noticeVisible?notice.getBoundingClientRect().bottom+12:viewportMargin;
  const minTop=Math.max(viewportMargin,noticeBottom),maxTop=Math.max(minTop,window.innerHeight-bubbleHeight-viewportMargin);
  if(window.matchMedia("(max-width: 760px)").matches){
    const canUseBelow=targetRect.bottom+margin+bubbleHeight<=window.innerHeight-viewportMargin;
    const canUseAbove=targetRect.top-margin-bubbleHeight>=minTop;
    let top;
    if(canUseBelow)top=targetRect.bottom+margin;
    else if(canUseAbove)top=targetRect.top-bubbleHeight-margin;
    else top=window.innerHeight-targetRect.bottom>=targetRect.top-minTop?targetRect.bottom+margin:targetRect.top-bubbleHeight-margin;
    bubble.style.top=`${Math.min(maxTop,Math.max(minTop,top))}px`;
    bubble.style.right=`max(12px,env(safe-area-inset-right))`;
    bubble.style.bottom="auto";
    bubble.style.left=`max(12px,env(safe-area-inset-left))`;
    return;
  }
  const canUseRight=targetRect.right+margin+bubbleWidth<=window.innerWidth-viewportMargin;
  const canUseLeft=targetRect.left-margin-bubbleWidth>=viewportMargin;
  let left,top;
  if(canUseRight||canUseLeft){
    left=canUseRight?targetRect.right+margin:targetRect.left-bubbleWidth-margin;
    top=targetRect.top+(targetRect.height-bubbleHeight)/2;
  }else{
    left=Math.min(window.innerWidth-bubbleWidth-viewportMargin,Math.max(viewportMargin,targetRect.left+(targetRect.width-bubbleWidth)/2));
    top=targetRect.bottom+margin+bubbleHeight<=window.innerHeight-viewportMargin?targetRect.bottom+margin:targetRect.top-bubbleHeight-margin;
  }
  bubble.style.left=`${left}px`;bubble.style.top=`${Math.min(maxTop,Math.max(minTop,top))}px`;
}
function keepExchangeBalanceGuideTargetInView(){
  if(!exchangeBalanceGuideOpen()||!exchangeBalanceGuideTarget?.isConnected)return false;
  const targetRect=exchangeBalanceGuideTarget.getBoundingClientRect(),bubbleRect=$("exchangeBalanceGuide").getBoundingClientRect();
  const viewportTop=12,viewportBottom=window.innerHeight-12;
  let delta=0;
  if(targetRect.height>viewportBottom-viewportTop)delta=targetRect.top-viewportTop;
  else if(targetRect.top<viewportTop)delta=targetRect.top-viewportTop;
  else if(targetRect.bottom>viewportBottom)delta=targetRect.bottom-viewportBottom;
  if(Math.abs(delta)>=1){window.scrollBy({top:delta,behavior:"auto"});return true}
  const overlaps=targetRect.right>bubbleRect.left&&targetRect.left<bubbleRect.right&&targetRect.bottom>bubbleRect.top&&targetRect.top<bubbleRect.bottom;
  if(!overlaps)return false;
  const margin=14;
  delta=(bubbleRect.top+bubbleRect.bottom)/2<(targetRect.top+targetRect.bottom)/2
    ?targetRect.top-(bubbleRect.bottom+margin)
    :targetRect.bottom-(bubbleRect.top-margin);
  if(Math.abs(delta)<1)return false;
  window.scrollBy({top:delta,behavior:"auto"});return true;
}
function closeExchangeBalanceGuide(){
  if(!exchangeBalanceGuideOpen())return;
  exchangeBalanceGuideTarget?.classList.remove("wallet-guide-highlight");exchangeBalanceGuideTarget=null;
  $("exchangeBalanceGuideBackdrop").classList.add("hidden");$("exchangeBalanceGuideBackdrop").setAttribute("aria-hidden","true");
  $("exchangeBalanceGuide").classList.add("hidden");document.body.classList.remove("exchange-balance-guide-open");
  document.documentElement.classList.remove("exchange-balance-guide-open");
  window.scrollTo({left:exchangeBalanceGuideInitialScroll.x,top:exchangeBalanceGuideInitialScroll.y,behavior:"auto"});
  if(exchangeBalanceGuideMode==="account")state.accountBalanceGuideCompleted=true;
  if(exchangeBalanceGuideMode==="wallet-receipt")state.walletReceiptGuideCompleted=true;
  log("exchange_balance_guide_completed",{guide:exchangeBalanceGuideMode});
  $("walletPrimary")?.focus({preventScroll:true});
  $("exchangeBalanceGuide").classList.remove("wallet-receipt-guide");
  if(state.wallets.length&&!state.walletSecurityGuideCompleted)requestAnimationFrame(startWalletSecurityGuide);
  scheduleMissionCompletionNoticeResume();
}

function configureProgressGuide(mode){
  const completion=mode==="completion",bubble=$("progressGuideBubble");
  bubble.classList.toggle("progress-guide-completion",completion);
  $("saveCompletedResultGuide").classList.toggle("hidden",!completion||progress()!==100);
  $("surveyGuideControls").classList.toggle("hidden",!completion||progress()!==100);
  $("progressGuideLabel").textContent=completion?"COMPLETE":"GUIDE";
  $("progressGuideTitle").textContent=completion?"すべての進捗を達成しました":"進捗フローを確認";
  $("progressGuideDescription").textContent=completion?"ここまで体験していただき、ありがとうございました。":"進捗フローを参考にNFTチケットを獲得してください。";
  $("progressGuideNote").textContent=completion?"「条件に応じて特典を付与する仕組み」を再現するため、各NFTチケットにゲームを用意しています。よろしければ、ゲームを楽しみながらNFTチケットを集めてみてください。また、マーケットではチケットを含む様々なNFTを売買できるようになっているので、興味があればぜひ体験してみてください。":"";
  $("progressGuideNote").classList.toggle("hidden",!completion);
  $("progressGuideScrollNote").classList.toggle("hidden",completion);
  $("progressGuideHintNote").innerHTML=completion?'<span aria-hidden="true">✓</span>最後に、アンケートへのご回答をお願いいたします。':'<span aria-hidden="true">?</span>操作に困ったら、各進捗の「？」をタップすると操作のヒントを見ることができます。';
  $("progressGuideStart").innerHTML=completion?'続けてマーケットを体験する <span aria-hidden="true">→</span>':'閉じる <span aria-hidden="true">→</span>';
}

function showProgressGuide(mode="intro"){
  if(progressGuideOpen())return;
  progressGuideMode=mode;configureProgressGuide(mode);
  $("progressGuideBubble").scrollTop=0;
  $("progressGuideBackdrop").classList.remove("hidden");
  $("progressGuideBackdrop").setAttribute("aria-hidden","false");
  $("progressGuideBubble").classList.remove("hidden");
  $("progressGuideBubble").setAttribute("aria-hidden","false");
  document.body.classList.add("progress-guide-open");
  document.body.classList.toggle("progress-guide-completion-open",mode==="completion");
  suspendMobileMissionCompletionNotice();
  log(mode==="completion"?"completion_progress_guide_opened":"progress_guide_opened");
  requestAnimationFrame(()=>$("progressGuideStart").focus({preventScroll:true}));
}

function closeProgressGuide(){
  if(!progressGuideOpen())return;
  const completion=progressGuideMode==="completion";
  $("progressGuideBackdrop").classList.add("hidden");
  $("progressGuideBackdrop").setAttribute("aria-hidden","true");
  $("progressGuideBubble").classList.add("hidden");
  $("progressGuideBubble").setAttribute("aria-hidden","true");
  document.body.classList.remove("progress-guide-open");
  document.body.classList.remove("progress-guide-completion-open");
  if(completion)state.completionProgressGuideCompleted=true;
  log(completion?"completion_progress_guide_closed":"progress_guide_completed");
  if(!completion)switchApp("market");
  document.querySelector(`.switcher-item[data-app="${state.currentApp}"]`)?.focus();
  scheduleMissionCompletionNoticeResume();
}

function showCompletionProgressGuide(){
  completionProgressGuideTimer=null;
  if(progress()!==100||state.completionProgressGuideCompleted||progressGuideOpen())return;
  if(missionCompletionNoticeActive||missionCompletionNoticeQueue.length||positionedGuideOpen()||!$("admissionPass").classList.contains("hidden")||!$("modal").classList.contains("hidden")){
    scheduleCompletionProgressGuide(500);return;
  }
  document.querySelector(".mission-panel")?.scrollTo({top:0,behavior:"auto"});
  window.scrollTo({top:0,behavior:"auto"});
  showProgressGuide("completion");
}

function scheduleCompletionProgressGuide(delay=450){
  clearTimeout(completionProgressGuideTimer);
  completionProgressGuideTimer=setTimeout(showCompletionProgressGuide,delay);
}

function progressGuideOpen(){return !$("progressGuideBubble").classList.contains("hidden")}
function walletSecurityGuideOpen(){return !$("walletSecurityGuide").classList.contains("hidden")}
function nftOwnershipGuideOpen(){return !$("nftOwnershipGuide").classList.contains("hidden")}
function signatureGuideOpen(){return !$("signatureGuide").classList.contains("hidden")}
function admissionResaleGuideOpen(){return !$("admissionResaleGuide").classList.contains("hidden")}
function recordMobileGuideTouchStart(event){
  if(window.matchMedia("(max-width: 760px)").matches&&(progressGuideOpen()||walletSecurityGuideOpen()||nftOwnershipGuideOpen()||exchangeBalanceGuideOpen()||signatureGuideOpen()||admissionResaleGuideOpen()))mobileGuideTouchY=event.touches[0]?.clientY??null;
}
function preventMobileGuideViewportScroll(event){
  if(!window.matchMedia("(max-width: 760px)").matches||(!progressGuideOpen()&&!walletSecurityGuideOpen()&&!nftOwnershipGuideOpen()&&!exchangeBalanceGuideOpen()&&!signatureGuideOpen()&&!admissionResaleGuideOpen()))return;
  const element=event.target?.nodeType===Node.ELEMENT_NODE?event.target:event.target?.parentElement;
  if(progressGuideOpen()&&element?.closest("#missionList"))return;
  const activeGuideSelector=progressGuideOpen()?"#progressGuideBubble":walletSecurityGuideOpen()?"#walletSecurityGuide":nftOwnershipGuideOpen()?"#nftOwnershipGuide":exchangeBalanceGuideOpen()?"#exchangeBalanceGuide":signatureGuideOpen()?"#signatureGuide":"#admissionResaleGuide";
  // 本文がスクロールしない場合も、外側のガイドがあふれていればそちらをスクロールできるようにする（幅の狭いスマホ）
  const scrollableBubble=[nftOwnershipGuideOpen()&&element?.closest("#nftOwnershipGuideBody"),admissionResaleGuideOpen()&&element?.closest(".admission-resale-guide-content"),element?.closest(activeGuideSelector)].find(candidate=>candidate&&candidate.scrollHeight>candidate.clientHeight);
  if(scrollableBubble){
    const maxScrollTop=scrollableBubble.scrollHeight-scrollableBubble.clientHeight;
    if(event.type==="wheel"){
      if((event.deltaY<0&&scrollableBubble.scrollTop>0)||(event.deltaY>0&&scrollableBubble.scrollTop<maxScrollTop-1))return;
    }else{
      const currentY=event.touches[0]?.clientY??mobileGuideTouchY,deltaY=currentY-mobileGuideTouchY;
      mobileGuideTouchY=currentY;
      if((deltaY>0&&scrollableBubble.scrollTop>0)||(deltaY<0&&scrollableBubble.scrollTop<maxScrollTop-1))return;
    }
  }
  event.preventDefault();
}
function startWalletSecurityGuide(){
  if(!state.wallets.length||state.walletSecurityGuideCompleted)return;
  if(state.currentApp!=="wallet")switchApp("wallet");
  state.currentWalletTab="wallet-home";renderWallet();
  document.documentElement.classList.add("wallet-security-guide-open");
  window.scrollTo({left:window.scrollX,top:window.scrollY,behavior:"auto"});
  walletSecurityGuideInitialScroll={x:window.scrollX,y:window.scrollY};
  walletSecurityGuideStep=0;
  $("walletSecurityGuideBackdrop").classList.remove("hidden");
  $("walletSecurityGuideBackdrop").setAttribute("aria-hidden","false");
  $("walletSecurityGuide").classList.remove("hidden");
  document.body.classList.add("wallet-security-guide-open");
  startGuideGeometryMonitor();scheduleGuidePositionRefresh(4);
  log("wallet_security_guide_started",{wallet_id:activeWallet()?.id||null});
  renderWalletSecurityGuideStep();
}
function renderWalletSecurityGuideStep(){
  const step=WALLET_SECURITY_GUIDE_STEPS[walletSecurityGuideStep];if(!step)return;
  $("walletSecurityGuide").classList.toggle("wallet-overview-guide",walletSecurityGuideStep===0);
  walletSecurityGuideTargets.forEach(target=>target.classList.remove("wallet-guide-highlight"));walletSecurityGuideTargets=[];walletSecurityGuideTarget=null;
  if(state.currentWalletTab!==step.tab){state.currentWalletTab=step.tab;renderWallet()}
  setSeedPhraseVisibility(step.reveal==="seed");
  setPrivateKeyVisibility(step.reveal==="private");
  const selectors=step.targets||[step.target];
  walletSecurityGuideTargets=selectors.map(selector=>document.querySelector(`#walletContent ${selector}`)).filter(Boolean);
  walletSecurityGuideTarget=walletSecurityGuideTargets[0]||null;
  if(!walletSecurityGuideTargets.length){closeWalletSecurityGuide();return}
  walletSecurityGuideTargets.forEach(target=>target.classList.add("wallet-guide-highlight"));
  $("walletSecurityGuideLabel").textContent=step.label;
  $("walletSecurityGuideTitle").textContent=step.title;
  $("walletSecurityGuideDescription").textContent=step.description;
  $("walletSecurityGuideNext").innerHTML=`${step.action}<span aria-hidden="true">${walletSecurityGuideStep===WALLET_SECURITY_GUIDE_STEPS.length-1?"✓":"→"}</span>`;
  $("walletSecurityGuideNext").setAttribute("aria-label",step.action);
  log("wallet_security_guide_step_viewed",{step:walletSecurityGuideStep+1,target:selectors.join(",")});
  requestAnimationFrame(()=>{
    if(!walletSecurityGuideOpen())return;
    for(let attempt=0;attempt<3;attempt++){
      positionWalletSecurityGuide();
      if(!keepWalletSecurityGuideTargetInView())break;
    }
    positionWalletSecurityGuide();
    $("walletSecurityGuideNext").focus({preventScroll:true});
  });
}
function walletSecurityGuideTargetRect(){
  const rects=walletSecurityGuideTargets.filter(target=>target.isConnected).map(target=>target.getBoundingClientRect());
  if(!rects.length)return null;
  const left=Math.min(...rects.map(rect=>rect.left)),top=Math.min(...rects.map(rect=>rect.top));
  const right=Math.max(...rects.map(rect=>rect.right)),bottom=Math.max(...rects.map(rect=>rect.bottom));
  return {left,top,right,bottom,width:right-left,height:bottom-top};
}
function positionWalletSecurityGuide(){
  const targetRect=walletSecurityGuideTargetRect();if(!walletSecurityGuideOpen()||!targetRect)return;
  const bubble=$("walletSecurityGuide");
  bubble.style.removeProperty("top");bubble.style.removeProperty("right");bubble.style.removeProperty("bottom");bubble.style.removeProperty("left");
  if(window.matchMedia("(max-width: 760px)").matches){
    const viewportMargin=12,margin=14,bubbleHeight=bubble.offsetHeight;
    const creationNotice=$("toast"),creationNoticeVisible=creationNotice.classList.contains("wallet-creation-success-toast")&&!creationNotice.classList.contains("hidden");
    const noticeBottom=creationNoticeVisible?creationNotice.offsetTop+creationNotice.offsetHeight+12:viewportMargin;
    const minTop=Math.max(viewportMargin,noticeBottom),maxTop=Math.max(minTop,window.innerHeight-bubbleHeight-viewportMargin);
    const canUseBelow=targetRect.bottom+margin+bubbleHeight<=window.innerHeight-viewportMargin;
    const canUseAbove=targetRect.top-margin-bubbleHeight>=viewportMargin;
    let top;
    if(canUseBelow)top=targetRect.bottom+margin;
    else if(canUseAbove)top=targetRect.top-bubbleHeight-margin;
    else{
      const spaceBelow=window.innerHeight-targetRect.bottom,spaceAbove=targetRect.top;
      top=spaceBelow>=spaceAbove?targetRect.bottom+margin:targetRect.top-bubbleHeight-margin;
    }
    bubble.style.top=`${Math.min(maxTop,Math.max(minTop,top))}px`;bubble.style.bottom="auto";
    return;
  }
  const margin=16,bubbleWidth=bubble.offsetWidth,bubbleHeight=bubble.offsetHeight;
  const creationNotice=$("toast"),creationNoticeVisible=creationNotice.classList.contains("wallet-creation-success-toast")&&!creationNotice.classList.contains("hidden");
  const minTop=creationNoticeVisible?creationNotice.offsetTop+creationNotice.offsetHeight+12:16,maxTop=Math.max(minTop,window.innerHeight-bubbleHeight-16);
  const canUseRight=targetRect.right+margin+bubbleWidth<=window.innerWidth-16;
  const canUseLeft=targetRect.left-margin-bubbleWidth>=16;
  let left,top;
  if(canUseRight||canUseLeft){
    left=canUseRight?targetRect.right+margin:targetRect.left-bubbleWidth-margin;
    top=Math.min(maxTop,Math.max(minTop,targetRect.top+(targetRect.height-bubbleHeight)/2));
  }else{
    left=Math.min(window.innerWidth-bubbleWidth-16,Math.max(16,targetRect.left+(targetRect.width-bubbleWidth)/2));
    const canUseBelow=targetRect.bottom+margin+bubbleHeight<=window.innerHeight-16;
    top=canUseBelow?targetRect.bottom+margin:targetRect.top-bubbleHeight-margin;
    top=Math.min(maxTop,Math.max(minTop,top));
  }
  bubble.style.left=`${left}px`;bubble.style.top=`${top}px`;
}
function keepWalletSecurityGuideTargetInView(){
  const targetRect=walletSecurityGuideTargetRect();if(!walletSecurityGuideOpen()||!targetRect)return false;
  const bubbleRect=$("walletSecurityGuide").getBoundingClientRect();
  const viewportTop=12,viewportBottom=window.innerHeight-12;
  let delta=0;
  if(targetRect.height>viewportBottom-viewportTop)delta=targetRect.top-viewportTop;
  else if(targetRect.top<viewportTop)delta=targetRect.top-viewportTop;
  else if(targetRect.bottom>viewportBottom)delta=targetRect.bottom-viewportBottom;
  if(Math.abs(delta)>=1){window.scrollBy({top:delta,behavior:"auto"});return true}
  const horizontallyOverlapping=targetRect.right>bubbleRect.left&&targetRect.left<bubbleRect.right;
  const verticallyOverlapping=targetRect.bottom>bubbleRect.top&&targetRect.top<bubbleRect.bottom;
  if(!horizontallyOverlapping||!verticallyOverlapping)return false;
  const margin=14;
  if((bubbleRect.top+bubbleRect.bottom)/2<(targetRect.top+targetRect.bottom)/2){
    delta=targetRect.top-(bubbleRect.bottom+margin);
  }else{
    delta=targetRect.bottom-(bubbleRect.top-margin);
  }
  if(Math.abs(delta)<1)return false;
  window.scrollBy({top:delta,behavior:"auto"});return true;
}
function advanceWalletSecurityGuide(){
  if(!walletSecurityGuideOpen())return;
  if(walletSecurityGuideStep>=WALLET_SECURITY_GUIDE_STEPS.length-1){closeWalletSecurityGuide();return}
  if(walletSecurityGuideStep===0){
    const creationNotice=$("toast");
    if(creationNotice.classList.contains("wallet-creation-success-toast")){clearTimeout(toast.t);creationNotice.classList.add("hidden")}
  }
  walletSecurityGuideStep++;renderWalletSecurityGuideStep();
}
function closeWalletSecurityGuide(){
  setSeedPhraseVisibility(false);setPrivateKeyVisibility(false);
  walletSecurityGuideTargets.forEach(target=>target.classList.remove("wallet-guide-highlight"));walletSecurityGuideTargets=[];walletSecurityGuideTarget=null;
  $("walletSecurityGuideBackdrop").classList.add("hidden");$("walletSecurityGuideBackdrop").setAttribute("aria-hidden","true");
  $("walletSecurityGuide").classList.add("hidden");$("walletSecurityGuide").classList.remove("wallet-overview-guide");document.body.classList.remove("wallet-security-guide-open");
  window.scrollTo({left:walletSecurityGuideInitialScroll.x,top:walletSecurityGuideInitialScroll.y,behavior:"auto"});
  document.documentElement.classList.remove("wallet-security-guide-open");
  state.walletSecurityGuideCompleted=true;log("wallet_security_guide_completed",{wallet_id:activeWallet()?.id||null});
  $("copyAddress")?.focus({preventScroll:true});
  scheduleMissionCompletionNoticeResume();
}

function firstPurchasedNftEntry(){
  let index=state.ownedNfts.findIndex(item=>item.tokenId===state.firstPurchasedNftTokenId&&item.acquisitionType!=="airdrop"&&!item.soldAt);
  if(index<0){
    index=state.ownedNfts.findIndex(item=>item.acquisitionType!=="airdrop"&&!item.soldAt);
    state.firstPurchasedNftTokenId=index>=0?state.ownedNfts[index].tokenId:null;
  }
  return index<0?null:{owned:state.ownedNfts[index],index};
}
function airdroppedNftEntry(){
  const index=state.ownedNfts.findIndex(item=>item.acquisitionType==="airdrop"&&item.ticketId===AIRDROP_TICKET_ID&&!item.soldAt);
  return index<0?null:{owned:state.ownedNfts[index],index};
}
function refreshNftOwnershipGuideTarget(){
  if(nftOwnershipGuideStep>0)return false;
  const entry=nftOwnershipGuideMode==="airdrop"?airdroppedNftEntry():firstPurchasedNftEntry();
  if(!entry)return false;
  const target=document.querySelector(`#walletContent [data-owned-index="${entry.index}"]`);
  if(!target)return false;
  if(nftOwnershipGuideTarget!==target){
    nftOwnershipGuideTarget?.classList.remove("wallet-guide-highlight","nft-purchase-guide-highlight","nft-airdrop-guide-highlight");
    nftOwnershipGuideTarget=target;
  }
  target.classList.add("wallet-guide-highlight","nft-purchase-guide-highlight");
  target.classList.toggle("nft-airdrop-guide-highlight",nftOwnershipGuideMode==="airdrop");
  return true;
}
function maybeStartAirdropGuide(){
  if(nftOwnershipGuideScheduled||nftOwnershipGuideOpen()||state.airdropGuideCompleted||state.currentApp!=="wallet"||state.currentWalletTab!=="wallet-nft")return false;
  const entry=airdroppedNftEntry(),wallet=activeWallet();
  if(!entry||!wallet||nftOwnerWalletId(entry.owned)!==wallet.id)return false;
  nftOwnershipGuideScheduled=true;
  requestAnimationFrame(()=>{nftOwnershipGuideScheduled=false;startAirdropGuide()});
  return true;
}
function startAirdropGuide(){
  if(state.airdropGuideCompleted||state.currentApp!=="wallet"||state.currentWalletTab!=="wallet-nft"||exchangeBalanceGuideOpen()||walletSecurityGuideOpen()||nftOwnershipGuideOpen()||signatureGuideOpen())return;
  const entry=airdroppedNftEntry(),wallet=activeWallet();
  if(!entry||!wallet||nftOwnerWalletId(entry.owned)!==wallet.id)return;
  const ticketInfo=tickets.find(item=>item.id===entry.owned.ticketId);
  nftOwnershipGuideTarget=document.querySelector(`#walletContent [data-owned-index="${entry.index}"]`);
  if(!nftOwnershipGuideTarget)return;
  nftOwnershipGuideMode="airdrop";nftOwnershipGuideStep=0;
  nftOwnershipGuideTarget.classList.add("wallet-guide-highlight","nft-purchase-guide-highlight","nft-airdrop-guide-highlight");
  document.documentElement.classList.add("nft-ownership-guide-open");document.body.classList.add("nft-ownership-guide-open","nft-airdrop-guide-open");
  $("nftOwnershipGuideBackdrop").classList.remove("hidden");$("nftOwnershipGuideBackdrop").setAttribute("aria-hidden","false");
  $("nftOwnershipGuide").classList.remove("hidden","nft-ownership-guide-detail");$("nftOwnershipGuide").classList.add("nft-airdrop-guide");
  $("nftOwnershipGuideLabel").textContent="GUIDE · AIRDROP";
  $("nftOwnershipGuideTitle").textContent="条件達成の特典としてNFTが届きました";
  $("nftOwnershipGuideTicket").textContent=ticketInfo?.title||"エアドロップされたNFT";
  $("nftOwnershipGuideToken").textContent=`トークンID ${entry.owned.tokenId}`;
  $("nftOwnershipGuideBody").innerHTML="<p>NFTでは、特定の条件を満たしたユーザーに対して、運営者がNFTを無料で配布することがあります。この配布方法を「エアドロップ」と呼びます。</p><p>今回は、NFTチケットを合計3枚購入した特典として、限定NFTがこのウォレットに自動で配布されました。</p>";
  $("nftOwnershipGuideNext").innerHTML='閉じる <span aria-hidden="true">✓</span>';$("nftOwnershipGuideNext").setAttribute("aria-label","閉じる");
  startGuideGeometryMonitor();scheduleGuidePositionRefresh(4);
  log("airdrop_guide_started",{wallet_id:wallet.id,token_id:entry.owned.tokenId,ticket_id:entry.owned.ticketId});
  const placeGuide=()=>{
    if(!nftOwnershipGuideOpen()||nftOwnershipGuideMode!=="airdrop")return;
    for(let attempt=0;attempt<3;attempt++){
      positionNftOwnershipGuide();
      if(!keepNftOwnershipGuideTargetInView())break;
    }
    positionNftOwnershipGuide();
  };
  requestAnimationFrame(()=>{
    if(!nftOwnershipGuideOpen()||nftOwnershipGuideMode!=="airdrop")return;
    placeGuide();$("nftOwnershipGuideBody").scrollTop=0;$("nftOwnershipGuideNext").focus({preventScroll:true});
    whenScrollSettles(placeGuide);
  });
}
function maybeStartNftOwnershipGuide(){
  if(nftOwnershipGuideScheduled||nftOwnershipGuideOpen()||state.nftOwnershipGuideCompleted||state.currentApp!=="wallet"||state.currentWalletTab!=="wallet-nft")return;
  const entry=firstPurchasedNftEntry(),wallet=activeWallet();
  if(!entry||!wallet||nftOwnerWalletId(entry.owned)!==wallet.id)return;
  nftOwnershipGuideScheduled=true;
  requestAnimationFrame(()=>{nftOwnershipGuideScheduled=false;startNftOwnershipGuide()});
}
function startNftOwnershipGuide(){
  if(state.nftOwnershipGuideCompleted||state.currentApp!=="wallet"||state.currentWalletTab!=="wallet-nft"||exchangeBalanceGuideOpen()||walletSecurityGuideOpen()||signatureGuideOpen())return;
  const entry=firstPurchasedNftEntry(),wallet=activeWallet();
  if(!entry||!wallet||nftOwnerWalletId(entry.owned)!==wallet.id)return;
  nftOwnershipGuideTarget=document.querySelector(`#walletContent [data-owned-index="${entry.index}"]`);
  if(!nftOwnershipGuideTarget)return;
  nftOwnershipGuideMode="purchase";
  $("nftOwnershipGuide").classList.remove("nft-airdrop-guide");
  nftOwnershipGuideTarget.classList.add("wallet-guide-highlight","nft-purchase-guide-highlight");
  nftOwnershipGuideStep=0;
  document.documentElement.classList.add("nft-ownership-guide-open");document.body.classList.add("nft-ownership-guide-open");
  $("nftOwnershipGuideBackdrop").classList.remove("hidden");$("nftOwnershipGuideBackdrop").setAttribute("aria-hidden","false");
  $("nftOwnershipGuide").classList.remove("hidden");
  startGuideGeometryMonitor();scheduleGuidePositionRefresh(4);
  log("nft_ownership_guide_started",{wallet_id:wallet.id,token_id:entry.owned.tokenId,ticket_id:entry.owned.ticketId});
  renderNftOwnershipGuideStep();
}
function renderNftOwnershipGuideStep(){
  const isOverview=nftOwnershipGuideStep>0;
  const step=NFT_OWNERSHIP_GUIDE_STEPS[0],entry=firstPurchasedNftEntry(),explanation=nftOwnershipGuideMode==="explanation";
  if(!step||(!entry&&!explanation)||(!isOverview&&!nftOwnershipGuideTarget?.isConnected)){closeNftOwnershipGuide(false);return}
  const ticketInfo=tickets.find(item=>item.id===entry?.owned.ticketId);
  $("nftOwnershipGuide").classList.toggle("nft-ownership-guide-detail",isOverview);
  if(isOverview)nftOwnershipGuideTarget?.classList.remove("wallet-guide-highlight","nft-purchase-guide-highlight");
  else nftOwnershipGuideTarget?.classList.add("wallet-guide-highlight","nft-purchase-guide-highlight");
  $("nftOwnershipGuideLabel").textContent=isOverview?`NFT GUIDE · ${NFT_OWNERSHIP_GUIDE_STEPS.length-1}つのポイント`:step.label;
  $("nftOwnershipGuideTitle").textContent=isOverview?"NFTの特徴と注意点":step.title;
  $("nftOwnershipGuideTicket").textContent=ticketInfo?.title||"購入したNFT";$("nftOwnershipGuideToken").textContent=entry?`トークンID ${entry.owned.tokenId}`:"";
  $("nftOwnershipGuideBody").innerHTML=isOverview?NFT_OWNERSHIP_GUIDE_STEPS.slice(1).map(item=>`<section class="nft-ownership-guide-section"><span class="nft-ownership-guide-section-label">${item.label}</span><h3>${item.title}</h3>${item.body}</section>`).join(""):step.body;
  const action=isOverview?"閉じる":step.action;
  $("nftOwnershipGuideNext").innerHTML=`${action}<span aria-hidden="true">${isOverview?"✓":"→"}</span>`;
  $("nftOwnershipGuideNext").setAttribute("aria-label",action);
  if(!explanation)log("nft_ownership_guide_step_viewed",{step:isOverview?2:1,sections:isOverview?NFT_OWNERSHIP_GUIDE_STEPS.length-1:1,token_id:entry.owned.tokenId});
  const placeGuide=()=>{
    if(!nftOwnershipGuideOpen())return;
    if(!isOverview){
      for(let attempt=0;attempt<3;attempt++){
        positionNftOwnershipGuide();
        if(!keepNftOwnershipGuideTargetInView())break;
      }
    }
    positionNftOwnershipGuide();
  };
  requestAnimationFrame(()=>{
    if(!nftOwnershipGuideOpen())return;
    placeGuide();
    $("nftOwnershipGuideBody").scrollTop=0;
    $("nftOwnershipGuideNext").focus({preventScroll:true});
    if(!isOverview)whenScrollSettles(placeGuide);
  });
}
function positionNftOwnershipGuide(){
  if(!nftOwnershipGuideOpen())return;
  const bubble=$("nftOwnershipGuide");
  bubble.style.removeProperty("top");bubble.style.removeProperty("right");bubble.style.removeProperty("bottom");bubble.style.removeProperty("left");
  if(nftOwnershipGuideStep>0)return;
  if(!refreshNftOwnershipGuideTarget())return;
  const targetRect=nftOwnershipGuideTarget.getBoundingClientRect();
  if(window.matchMedia("(max-width: 760px)").matches){
    const viewportMargin=10,gap=12,bubbleHeight=bubble.offsetHeight,maxTop=Math.max(viewportMargin,window.innerHeight-bubbleHeight-viewportMargin);
    const canUseBelow=targetRect.bottom+gap+bubbleHeight<=window.innerHeight-viewportMargin;
    const canUseAbove=targetRect.top-gap-bubbleHeight>=viewportMargin;
    let top;
    if(canUseBelow)top=targetRect.bottom+gap;
    else if(canUseAbove)top=targetRect.top-bubbleHeight-gap;
    else top=window.innerHeight-targetRect.bottom>=targetRect.top?targetRect.bottom+gap:targetRect.top-bubbleHeight-gap;
    bubble.style.top=`${Math.min(maxTop,Math.max(viewportMargin,top))}px`;bubble.style.bottom="auto";
    return;
  }
  const viewportMargin=16,gap=18,bubbleWidth=bubble.offsetWidth,bubbleHeight=bubble.offsetHeight,maxTop=Math.max(viewportMargin,window.innerHeight-bubbleHeight-viewportMargin);
  const canUseRight=targetRect.right+gap+bubbleWidth<=window.innerWidth-viewportMargin;
  const canUseLeft=targetRect.left-gap-bubbleWidth>=viewportMargin;
  let left,top;
  if(canUseRight||canUseLeft){
    left=canUseRight?targetRect.right+gap:targetRect.left-bubbleWidth-gap;
    top=Math.min(maxTop,Math.max(viewportMargin,targetRect.top+(targetRect.height-bubbleHeight)/2));
  }else{
    left=Math.min(window.innerWidth-bubbleWidth-viewportMargin,Math.max(viewportMargin,targetRect.left+(targetRect.width-bubbleWidth)/2));
    const canUseBelow=targetRect.bottom+gap+bubbleHeight<=window.innerHeight-viewportMargin;
    top=canUseBelow?targetRect.bottom+gap:targetRect.top-bubbleHeight-gap;
    top=Math.min(maxTop,Math.max(viewportMargin,top));
  }
  bubble.style.left=`${left}px`;bubble.style.top=`${top}px`;
}
function keepNftOwnershipGuideTargetInView(){
  if(!nftOwnershipGuideOpen()||nftOwnershipGuideStep>0||!nftOwnershipGuideTarget?.isConnected)return false;
  const targetRect=nftOwnershipGuideTarget.getBoundingClientRect(),bubbleRect=$("nftOwnershipGuide").getBoundingClientRect();
  const mobile=window.matchMedia("(max-width: 760px)").matches;
  const viewportTop=mobile?18:24,viewportBottom=window.innerHeight-(mobile?22:28);
  let delta=0;
  if(nftOwnershipGuideMode==="airdrop"){
    const groupTop=Math.min(targetRect.top,bubbleRect.top),groupBottom=Math.max(targetRect.bottom,bubbleRect.bottom);
    const groupHeight=groupBottom-groupTop,availableHeight=viewportBottom-viewportTop;
    if(groupHeight<=availableHeight){
      delta=(groupTop+groupBottom)/2-(viewportTop+viewportBottom)/2;
      if(Math.abs(delta)>=1){
        const previousScrollY=window.scrollY;window.scrollBy({top:delta,behavior:"auto"});
        if(Math.abs(window.scrollY-previousScrollY)>=1)return true;
      }
    }
  }
  if(targetRect.height>viewportBottom-viewportTop)delta=targetRect.top-viewportTop;
  else if(targetRect.top<viewportTop)delta=targetRect.top-viewportTop;
  else if(targetRect.bottom>viewportBottom)delta=targetRect.bottom-viewportBottom;
  if(Math.abs(delta)>=1){
    const previousScrollY=window.scrollY;window.scrollBy({top:delta,behavior:"auto"});
    if(Math.abs(window.scrollY-previousScrollY)>=1)return true;
  }
  const overlaps=targetRect.right>bubbleRect.left&&targetRect.left<bubbleRect.right&&targetRect.bottom>bubbleRect.top&&targetRect.top<bubbleRect.bottom;
  if(!overlaps)return false;
  const gap=12;
  delta=(bubbleRect.top+bubbleRect.bottom)/2<(targetRect.top+targetRect.bottom)/2?targetRect.top-(bubbleRect.bottom+gap):targetRect.bottom-(bubbleRect.top-gap);
  if(Math.abs(delta)<1)return false;
  const previousScrollY=window.scrollY;window.scrollBy({top:delta,behavior:"auto"});
  return Math.abs(window.scrollY-previousScrollY)>=1;
}
function advanceNftOwnershipGuide(){
  if(!nftOwnershipGuideOpen())return;
  if(nftOwnershipGuideMode==="airdrop"){closeNftOwnershipGuide();return}
  if(nftOwnershipGuideStep>0){closeNftOwnershipGuide();return}
  nftOwnershipGuideStep=1;renderNftOwnershipGuideStep();
}
function closeNftOwnershipGuide(focusTarget=true){
  if(!nftOwnershipGuideOpen())return;
  if(focusTarget&&nftOwnershipGuideMode==="purchase"&&nftOwnershipGuideStep===0)return;
  const target=nftOwnershipGuideTarget,closedMode=nftOwnershipGuideMode;
  target?.classList.remove("wallet-guide-highlight","nft-purchase-guide-highlight","nft-airdrop-guide-highlight");
  $("nftOwnershipGuideBackdrop").classList.add("hidden");$("nftOwnershipGuideBackdrop").setAttribute("aria-hidden","true");
  $("nftOwnershipGuide").classList.add("hidden");$("nftOwnershipGuide").classList.remove("nft-ownership-guide-detail","nft-airdrop-guide");
  document.documentElement.classList.remove("nft-ownership-guide-open");document.body.classList.remove("nft-ownership-guide-open","nft-airdrop-guide-open");
  if(closedMode==="explanation"){
    log("nft_explanation_closed");
  }else if(closedMode==="airdrop"){
    const entry=airdroppedNftEntry();state.airdropGuideCompleted=true;
    log("airdrop_guide_completed",{token_id:entry?.owned.tokenId||null,wallet_id:entry?nftOwnerWalletId(entry.owned):null});
  }else{
    state.nftOwnershipGuideCompleted=nftOwnershipGuideStep>0;
    log("nft_ownership_guide_completed",{step:nftOwnershipGuideStep+1,token_id:state.firstPurchasedNftTokenId});
    requestAnimationFrame(()=>{if(state.currentApp==="wallet"&&state.currentWalletTab==="wallet-nft"&&!nftOwnershipGuideOpen())renderWallet()});
  }
  nftOwnershipGuideTarget=null;nftOwnershipGuideMode="purchase";
  if(focusTarget)requestAnimationFrame(()=>target?.focus({preventScroll:true}));
  if(closedMode==="airdrop")requestAnimationFrame(maybeStartNftOwnershipGuide);
  scheduleMissionCompletionNoticeResume();
}

function openNftExplanationGuide(){
  if(nftOwnershipGuideOpen()||positionedGuideOpen())return;
  nftOwnershipGuideMode="explanation";nftOwnershipGuideStep=1;nftOwnershipGuideTarget=null;
  $("nftOwnershipGuide").classList.remove("nft-airdrop-guide");
  document.documentElement.classList.add("nft-ownership-guide-open");document.body.classList.add("nft-ownership-guide-open");
  $("nftOwnershipGuideBackdrop").classList.remove("hidden");$("nftOwnershipGuideBackdrop").setAttribute("aria-hidden","false");
  $("nftOwnershipGuide").classList.remove("hidden");
  log("nft_explanation_opened",{wallet_id:activeWallet()?.id||null});
  renderNftOwnershipGuideStep();
}
function nftExplanationButton(){
  if(!state.nftOwnershipGuideCompleted)return "";
  return `<button id="openNftExplanation" class="nft-explanation-button" type="button"><span class="nft-explanation-icon" aria-hidden="true">i</span><span><strong>NFTの詳しい説明を読む</strong><small>所有の記録、運営元・保有者のメリット、安全に利用するための注意点</small></span><b aria-hidden="true">→</b></button>`;
}
function openTransactionExplanationGuide({mode,walletId,targetSelector,label,title,subjectLabel,subjectValue,description,warningPrefix,riskWarning,warningSuffix}){
  signatureGuideTarget?.classList.remove("transaction-guide-highlight");
  signatureGuideTarget=document.querySelector(targetSelector);
  if(!signatureGuideTarget)return;
  signatureGuideTarget.classList.add("transaction-guide-highlight");
  signatureGuideMode=mode;signatureGuideWalletId=walletId;
  $("signatureGuideLabel").textContent=label;$("signatureGuideTitle").textContent=title;
  $("signatureGuideSubjectLabel").textContent=subjectLabel;$("signatureGuideWalletName").textContent=subjectValue;
  $("signatureGuideDescription").textContent=description;$("signatureGuideWarningPrefix").textContent=warningPrefix;
  $("signatureGuideRiskWarning").textContent=riskWarning;$("signatureGuideWarningSuffix").textContent=warningSuffix;
  document.documentElement.classList.add("signature-guide-open");document.body.classList.add("signature-guide-open");
  $("signatureGuideOverlay").classList.remove("hidden");$("signatureGuideOverlay").setAttribute("aria-hidden","false");
  $("signatureGuide").classList.remove("hidden");
  startGuideGeometryMonitor();scheduleGuidePositionRefresh(4);
  log("transaction_explanation_guide_opened",{guide:mode,wallet_id:walletId});
  requestAnimationFrame(()=>{
    if(!signatureGuideOpen())return;
    positionSignatureGuide();
    $("signatureGuideClose").focus({preventScroll:true});
  });
}
function startSignatureGuide(walletId){
  const wallet=walletById(walletId);if(!wallet)return;
  openTransactionExplanationGuide({
    mode:"signature",walletId:wallet.id,targetSelector:"#modalBody .connection-signature-card",label:"GUIDE · 署名",title:"NFTで使われる「署名」とは？",
    subjectLabel:"今回署名するウォレット",subjectValue:`${wallet.name}（${shortWalletAddress(wallet.address)}）`,
    description:"NFTマーケットプレイスへのウォレットの接続時やNFTの取引を実行する際に、署名を求められます。NFTの文脈で使われる「署名」とは、秘密鍵を使って「この操作を自分が承認した」ことを証明する手続きです。秘密鍵そのものが相手に渡ることはありません。",
    warningPrefix:"署名内容によってはNFTや暗号資産の移動が許可されるため、",riskWarning:"悪意のあるサイトに署名すると資産を盗まれる可能性があります。",
    warningSuffix:"必ず要求元・操作内容・金額・資産移動の有無を確認してください。今回の接続署名では、資産移動もガス代（手数料）も発生しません。"
  });
}
function startContractGuide(walletId){
  if(state.purchaseSigned||purchasedNftCount()>0)return;
  const wallet=walletById(walletId);if(!wallet)return;
  openTransactionExplanationGuide({
    mode:"contract",walletId:wallet.id,targetSelector:"#modalBody .purchase-signature-card",label:"GUIDE · コントラクト",title:"NFT取引で使われる「コントラクト」とは？",
    subjectLabel:"今回実行するコントラクト",subjectValue:"MintGate NFT販売（0x91D2...44AF）",
    description:"NFTの文脈で使われる「コントラクト（スマートコントラクト）」とは、ブロックチェーン上で動くプログラムです。あらかじめ定められた条件に従って、代金の支払いやNFTの発行・移動などを自動で実行します。",
    warningPrefix:"一度実行された取引は原則として取り消せません。",riskWarning:"悪意のあるコントラクトを承認すると、NFTや暗号資産を盗まれる可能性があります。",
    warningSuffix:"必ず要求元・操作内容・コントラクトアドレス・最大支払額を確認してください。今回の疑似取引では、表示中のNFTチケット購入のみを実行します。"
  });
}
function positionSignatureGuide(){
  if(!signatureGuideOpen()||!signatureGuideTarget?.isConnected)return;
  const targetRect=signatureGuideTarget.getBoundingClientRect(),bubble=$("signatureGuide");
  const mobile=window.matchMedia("(max-width: 760px)").matches,viewportMargin=mobile?10:16,gap=mobile?13:20;
  bubble.style.removeProperty("top");bubble.style.removeProperty("right");bubble.style.removeProperty("bottom");bubble.style.removeProperty("left");bubble.style.removeProperty("width");bubble.style.removeProperty("max-height");
  const availableLeft=targetRect.left-gap-viewportMargin,availableRight=window.innerWidth-targetRect.right-gap-viewportMargin;
  const stacked=mobile||Math.max(availableLeft,availableRight)<300;
  if(stacked){
    if(mobile){
      bubble.style.left=`max(${viewportMargin}px,env(safe-area-inset-left))`;
      bubble.style.right=`max(${viewportMargin}px,env(safe-area-inset-right))`;
    }else{
      const stackedWidth=Math.min(window.innerWidth>=1280?560:520,window.innerWidth-viewportMargin*2);
      bubble.style.width=`${stackedWidth}px`;
      bubble.style.left=`${Math.min(window.innerWidth-stackedWidth-viewportMargin,Math.max(viewportMargin,targetRect.left+(targetRect.width-stackedWidth)/2))}px`;
    }
    const naturalHeight=mobile?Math.min(bubble.scrollHeight,window.innerHeight-viewportMargin*2):bubble.offsetHeight;
    const spaceBelow=window.innerHeight-targetRect.bottom-gap-viewportMargin,spaceAbove=targetRect.top-gap-viewportMargin;
    if(mobile&&Math.max(spaceBelow,spaceAbove)<naturalHeight){
      bubble.style.maxHeight=`${naturalHeight}px`;
      bubble.style.top=`${Math.max(viewportMargin,window.innerHeight-viewportMargin-naturalHeight)}px`;
      return;
    }
    if(spaceBelow>=naturalHeight||spaceBelow>=spaceAbove){
      bubble.style.maxHeight=`${Math.max(72,spaceBelow)}px`;bubble.style.top=`${targetRect.bottom+gap}px`;
    }else{
      bubble.style.maxHeight=`${Math.max(72,spaceAbove)}px`;bubble.style.top=`${Math.max(viewportMargin,targetRect.top-gap-Math.min(naturalHeight,Math.max(72,spaceAbove)))}px`;
    }
    return;
  }
  const availableSideWidth=Math.max(availableLeft,availableRight);
  if(availableSideWidth>=300)bubble.style.width=`${Math.min(window.innerWidth>=1280?560:520,Math.floor(availableSideWidth))}px`;
  const bubbleWidth=bubble.offsetWidth,bubbleHeight=bubble.offsetHeight;
  const clampLeft=value=>Math.min(window.innerWidth-bubbleWidth-viewportMargin,Math.max(viewportMargin,value));
  const clampTop=value=>Math.min(window.innerHeight-bubbleHeight-viewportMargin,Math.max(viewportMargin,value));
  const candidates=[
    {fits:targetRect.left-gap-bubbleWidth>=viewportMargin,left:targetRect.left-gap-bubbleWidth,top:targetRect.top+(targetRect.height-bubbleHeight)/2},
    {fits:targetRect.right+gap+bubbleWidth<=window.innerWidth-viewportMargin,left:targetRect.right+gap,top:targetRect.top+(targetRect.height-bubbleHeight)/2},
    {fits:targetRect.bottom+gap+bubbleHeight<=window.innerHeight-viewportMargin,left:targetRect.left+(targetRect.width-bubbleWidth)/2,top:targetRect.bottom+gap},
    {fits:targetRect.top-gap-bubbleHeight>=viewportMargin,left:targetRect.left+(targetRect.width-bubbleWidth)/2,top:targetRect.top-gap-bubbleHeight}
  ];
  const chosen=candidates.find(candidate=>candidate.fits)||candidates.sort((a,b)=>Math.abs(clampTop(a.top)-a.top)-Math.abs(clampTop(b.top)-b.top))[0];
  bubble.style.left=`${clampLeft(chosen.left)}px`;bubble.style.top=`${clampTop(chosen.top)}px`;
}
function closeSignatureGuide(focusSignature=true){
  if(!signatureGuideOpen())return;
  const focusId=signatureGuideMode==="contract"?"txUnderstand":"connectUnderstand";
  $("signatureGuideOverlay").classList.add("hidden");$("signatureGuideOverlay").setAttribute("aria-hidden","true");
  $("signatureGuide").classList.add("hidden");signatureGuideTarget?.classList.remove("transaction-guide-highlight");
  document.documentElement.classList.remove("signature-guide-open");document.body.classList.remove("signature-guide-open");
  log("transaction_explanation_guide_closed",{guide:signatureGuideMode,wallet_id:signatureGuideWalletId});
  signatureGuideTarget=null;signatureGuideWalletId=null;signatureGuideMode=null;
  if(focusSignature)requestAnimationFrame(()=>$(focusId)?.focus({preventScroll:true}));
  scheduleMissionCompletionNoticeResume();
}

function start(){
  state.participantId=participantId();state.startedAt=now();state.appEnteredAt=performance.now();
  landing.classList.add("hidden");workspace.classList.remove("hidden");appSwitcher.classList.remove("hidden");
  $("participantText").textContent=`参加者ID：${state.participantId}`;log("experiment_started");
  startMarketEngine();renderAll();window.scrollTo(0,0);showProgressGuide();persistState();
}

function restoreSession(){
  if(!state.participantId)return;
  if(state.currentApp==="trade"&&!marketAccessAllowed())state.currentApp="wallet";
  const restoredAirdrop=maybeGrantAirdrop("session_restore");
  state.appEnteredAt=performance.now();
  landing.classList.add("hidden");workspace.classList.remove("hidden");appSwitcher.classList.remove("hidden");
  $("participantText").textContent=`参加者ID：${state.participantId}`;
  walletApp.classList.toggle("hidden",state.currentApp!=="wallet");
  marketApp.classList.toggle("hidden",state.currentApp!=="market");
  tradeApp.classList.toggle("hidden",state.currentApp!=="trade");
  document.querySelectorAll(".switcher-item").forEach(button=>button.classList.toggle("active",button.dataset.app===state.currentApp));
  log("session_restored");renderAll();resumePendingOperations();
  if(progress()===100&&!state.completionProgressGuideCompleted)requestAnimationFrame(()=>scheduleCompletionProgressGuide(120));
  if(restoredAirdrop)requestAnimationFrame(()=>showAirdropReward(restoredAirdrop));
}

function stopTicker(){if(tickerTimer){clearInterval(tickerTimer);tickerTimer=null}}
function missionStatus(key){
  const map={
    select:!!state.selectedTicketId,
    payment:state.paymentCompleted,
    wallet:state.passkeyCreated&&state.wallets.length>0,
    acquire:state.ownedNfts.some(item=>item.acquisitionType!=="airdrop"),
    scan:state.ownedNfts.some(item=>!!item.venueScannedAt||!!item.admissionUsedAt),
    admission:state.ownedNfts.some(item=>!!item.admissionUsedAt),
    trade:state.tradeGuideCompleted
  };return !!map[key];
}
function nextMissionKey(){return missions.find(([key])=>!missionStatus(key))?.[0]||null}
function progress(){
  const done=missions.filter(([k])=>missionStatus(k)).length;
  return Math.round(done/missions.length*100);
}
function mobileInstructionalGuideOpen(){
  return window.matchMedia("(max-width: 760px)").matches&&(progressGuideOpen()||positionedGuideOpen());
}
// 表示中の達成通知を中断し、画面やガイドを閉じた後に改めて表示する
function suspendMissionCompletionNotice(){
  if(!missionCompletionNoticeActive||!missionCompletionNoticeCurrent)return;
  clearTimeout(missionCompletionNoticeTimer);
  missionCompletionNoticeQueue.unshift(...missionCompletionNoticeCurrent);
  missionCompletionNoticeCurrent=null;missionCompletionNoticeActive=false;
  const notice=$("toast");
  if(notice.classList.contains("mission-completion-success-toast")){clearTimeout(toast.t);notice.classList.add("hidden")}
}
function suspendMobileMissionCompletionNotice(){
  if(window.matchMedia("(max-width: 760px)").matches)suspendMissionCompletionNotice();
}
// 達成の直後に購入画面などが開くと通知がすぐ隠れてしまうため、画面の切り替えが落ち着いてから表示する
function requestMissionCompletionNotice(){
  clearTimeout(missionCompletionNoticeRequestTimer);
  missionCompletionNoticeRequestTimer=setTimeout(showNextMissionCompletionNotice,80);
}
function scheduleMissionCompletionNoticeResume(){
  setTimeout(()=>{
    if(!mobileInstructionalGuideOpen())showNextMissionCompletionNotice();
    if(progress()===100&&!state.completionProgressGuideCompleted&&!positionedGuideOpen()&&$("admissionPass").classList.contains("hidden"))scheduleCompletionProgressGuide();
  },80);
}
function showNextMissionCompletionNotice(){
  if(missionCompletionNoticeActive||!missionCompletionNoticeQueue.length||mobileInstructionalGuideOpen()||passkeyGuideOpen()||admissionSheetOpen()||!$("modal").classList.contains("hidden"))return;
  if(!$("toast").classList.contains("hidden"))return; // ほかの通知の表示中は、消えてから表示する
  // 購入画面やガイドの表示中にたまった通知は、1件にまとめて表示する（関係のない画面で遅れて何件も出ないように）
  const group=missionCompletionNoticeQueue.splice(0).sort((a,b)=>a[2]-b[2]);
  missionCompletionNoticeCurrent=group;
  missionCompletionNoticeActive=true;
  const extraClass="mission-completion-success-toast";
  const steps=group.map(([,,index])=>index+1),titles=group.map(([,title])=>`「${title}」`);
  const contiguous=steps.every((step,i)=>i===0||step===steps[i-1]+1);
  const heading=steps.length===1?`進捗${steps[0]}`:contiguous?`進捗${steps[0]}〜${steps[steps.length-1]}`:`進捗${steps.join("・")}`;
  const detail=titles.length<=2?`${titles.join("")}が完了しました`:`${titles[0]}から${titles[titles.length-1]}までの${titles.length}件が完了しました`;
  showEthSuccess(`${heading}を達成しました`,detail,MISSION_COMPLETION_NOTICE_MS,extraClass);
  // 中断後の再表示では記録せず、表示ログは進捗ごとに1回だけにする
  group.forEach(([key,,index])=>{
    if(missionCompletionNoticeLogged.has(key))return;
    missionCompletionNoticeLogged.add(key);
    log("mission_completion_notice_shown",{mission:key,step:index+1,...(group.length>1?{combined_steps:steps}:{})});
  });
  clearTimeout(missionCompletionNoticeTimer);
  missionCompletionNoticeTimer=setTimeout(()=>{
    missionCompletionNoticeActive=false;missionCompletionNoticeCurrent=null;
    showNextMissionCompletionNotice();
  },MISSION_COMPLETION_NOTICE_MS+120);
}
function notifyNewlyCompletedMissions(){
  let completedNow=false;
  missions.forEach(([key,title],index)=>{
    if(!missionStatus(key)||missionCompletionAnnounced.has(key))return;
    missionCompletionAnnounced.add(key);
    missionCompletionNoticeQueue.push([key,title,index]);
    completedNow=true;
  });
  requestMissionCompletionNotice();
  if(completedNow&&progress()===100&&!state.completionProgressGuideCompleted)scheduleCompletionProgressGuide();
}
function renderMission(){
  const next=nextMissionKey();
  $("missionList").innerHTML=missions.map(([key,title,desc],i)=>{
    const done=missionStatus(key),active=key===next;
    return `<li class="mission-item ${done?"done":active?"active":""}">
      <span class="mission-dot">${done?"✓":i+1}</span><span class="mission-copy"><strong>${title}</strong><small>${desc}</small></span>
      <button class="mission-hint-button" data-mission-hint="${key}" type="button" aria-label="${title}の操作ヒントを表示">?</button></li>`;
  }).join("");
  document.querySelectorAll("[data-mission-hint]").forEach(button=>button.onclick=()=>openMissionHint(button.dataset.missionHint));
  const p=progress();$("progressPercent").textContent=`${p}%`;$("progressFill").style.width=`${p}%`;
  $("resultSavePanel").classList.toggle("hidden",p!==100);
  $("sideWalletBalance").textContent=state.passkeyCreated?"作成済み":"未作成";
  const acquired=missionStatus("acquire");
  $("sideNetworkStatus").innerHTML=acquired?`<i></i>${purchasedNftCount()}枚取得済み`:"<i></i>チケット未取得";
  $("sideNetworkStatus").classList.toggle("connected",acquired);
  updateTradeChrome();
  notifyNewlyCompletedMissions();
}

function openMissionHint(key){
  const hint=missionHints[key],mission=missions.find(([missionKey])=>missionKey===key);if(!hint||!mission)return;
  const done=missionStatus(key);
  log("mission_hint_opened",{mission:key,completed:done});
  openModal("操作ヒント",mission[1],`
    <div class="mission-hint-summary"><span class="mission-hint-service">${escapeHtml(hint.service)}</span><span class="mission-hint-state ${done?"done":""}">${done?"✓ 完了済み":"操作を確認"}</span><p>${escapeHtml(hint.summary)}</p></div>
    <ol class="mission-hint-steps">${hint.steps.map((step,index)=>`<li><span>${index+1}</span><p>${escapeHtml(step)}</p></li>`).join("")}</ol>
    <div class="mission-hint-tip"><span>TIP</span><p>${escapeHtml(hint.tip)}</p></div>
    <button id="missionHintClose" class="mission-hint-go ${hint.app}" type="button">閉じる</button>`);
  $("missionHintClose").onclick=closeModal;
}

function marketAccessAllowed(){return state.ownedNfts.some(item=>!!item.admissionUsedAt)}
function updateMarketAccessUi(){
  const allowed=marketAccessAllowed();
  document.querySelectorAll('[data-app="trade"]').forEach(button=>{
    button.disabled=!allowed;
    button.title=allowed?"マーケットを開く":"入館処理を完了すると利用できます";
    const label=button.querySelector("small");
    if(label)label.textContent=allowed?"PassMarket":"入館完了後に利用可能";
  });
  const banner=$("openPassMarket");
  if(banner){
    banner.disabled=!allowed;
    banner.innerHTML=allowed?'PassMarketを開く <b>→</b>':"入館完了後に利用できます";
  }
}
function switchApp(app){
  if(app==="trade"&&!marketAccessAllowed()){error("マーケットは入館処理を完了してから利用できます");return}
  if(app==="trade"&&!state.tradeOpened){state.tradeOpened=true;log("trade_opened");persistState()}
  if(state.currentApp!==app){
    if(state.appEnteredAt!==null)state.appTimes[state.currentApp]+=Math.round((performance.now()-state.appEnteredAt)/1000);
    state.currentApp=app;state.appEnteredAt=performance.now();state.appSwitchCount++;log("app_switched",{to:app});
  }
  walletApp.classList.toggle("hidden",app!=="wallet");marketApp.classList.toggle("hidden",app!=="market");tradeApp.classList.toggle("hidden",app!=="trade");
  document.querySelectorAll(".switcher-item").forEach(b=>b.classList.toggle("active",b.dataset.app===app));
  renderAll();window.scrollTo({top:0,behavior:"smooth"});
}
function renderAll(){renderMission();renderWallet();renderMarket();renderTrade()}

function mockQrMarkup(label){
  return `<div class="mock-qr-wrap"><div class="mock-qr-code" aria-label="${escapeHtml(label)}の研究用QRコード"><i></i><i></i><i></i></div><small>研究用QR</small></div>`;
}
function walletManagerPanel(){
  const wallet=activeWallet();
  return `<section class="wallet-manager-panel" aria-label="PassWallet">
    <div class="wallet-manager-heading"><div><span class="kicker">YOUR WALLET</span><h2>PassWallet</h2><p>パスキー（顔認証・指紋認証）で保護されています。${wallet?` ${escapeHtml(shortWalletAddress(wallet.address))}`:""}</p></div><span class="task-callout">パスキー設定済み</span></div>
  </section>`;
}
function bindWalletManager(){
  document.querySelectorAll("[data-wallet-switch]").forEach(button=>button.onclick=()=>{
    const wallet=walletById(button.dataset.walletSwitch);if(!wallet||wallet.id===state.activeWalletId)return;
    state.activeWalletId=wallet.id;privateKeyVisible=false;syncLegacyWalletState();
    log("active_wallet_changed",{wallet_id:wallet.id,address:wallet.address});renderAll();
  });
}
function renderWallet(){
  privateKeyVisible=false;seedPhraseVisible=false;
  const pendingAirdrop=!state.airdropGuideCompleted?airdroppedNftEntry():null;
  if(state.currentApp==="wallet"&&pendingAirdrop)state.currentWalletTab="wallet-nft";
  document.querySelectorAll("#walletTabs button").forEach(b=>b.classList.toggle("active",b.dataset.tab===state.currentWalletTab));
  if(!state.wallets.length){renderWalletCreate();return}
  if(!activeWallet()){state.activeWalletId=state.wallets[0].id;syncLegacyWalletState()}
  if(state.currentWalletTab==="wallet-nft"){
    const guideEntry=pendingAirdrop||(!state.nftOwnershipGuideCompleted?firstPurchasedNftEntry():null);
    const guideWallet=guideEntry?walletById(nftOwnerWalletId(guideEntry.owned)):null;
    if(guideWallet&&guideWallet.id!==state.activeWalletId){state.activeWalletId=guideWallet.id;syncLegacyWalletState()}
  }
  if(state.currentWalletTab==="wallet-nft")renderWalletNft();
  if(state.currentWalletTab==="wallet-benefits")renderWalletBenefits();
}
function renderWalletCreate(){
  walletContent.innerHTML=`
    <div class="dashboard-title"><div><span class="kicker">PASSWALLET</span><h1>PassWalletはまだ作成されていません</h1><p>チケットを購入し、パスキーを設定するとウォレットが作成されます。</p></div><span class="task-callout">パスキーで作成</span></div>
    <div class="balance-grid">
      <div class="action-card"><h3>チケットを選んで決済</h3><p>決済後にパスキー（顔認証や指紋認証）を設定すると、PassWalletが自動で作成されます。</p><p>画面上部の「チケット購入」からチケットを選んでください。</p></div>
      <div class="notice info">パスワードやシードフレーズの管理は必要ありません。</div>
    </div>`;
}
function maskedPrivateKey(){return `0x${"•".repeat(64)}`}
function privateKeyPanel(){
  const wallet=activeWallet();
  const visible=privateKeyVisible;
  return `<section class="private-key-vault">
    <div class="seed-phrase-vault">
      <div class="private-key-heading"><div><span class="kicker">RECOVERY</span><h2>シードフレーズ</h2></div><span>12単語・研究用疑似データ</span></div>
      <div id="seedPhraseDisplay" class="seed-phrase-display ${seedPhraseVisible?"visible":"masked"}" aria-label="${seedPhraseVisible?"シードフレーズを表示中":"シードフレーズは非表示"}">${seedPhraseWords(wallet,seedPhraseVisible)}</div>
      <button id="toggleSeedPhrase" class="private-key-toggle seed-phrase-toggle" type="button" aria-pressed="${seedPhraseVisible}">${seedPhraseVisible?"シードフレーズを隠す":"シードフレーズを表示する"}</button>
      <p>シードフレーズはウォレットを復旧できる重要な情報です。秘密鍵と同様に第三者へ共有しないでください。</p>
    </div>
    <div class="private-key-section">
      <div class="private-key-heading"><div><span class="kicker">SECURITY</span><h2>秘密鍵</h2></div><span>研究用疑似データ</span></div>
      <div id="privateKeyDisplay" class="private-key-display ${visible?"visible":"masked"}"><code id="privateKeyValue" aria-label="${visible?"秘密鍵を表示中":"秘密鍵は非表示"}">${visible?escapeHtml(wallet?.privateKey):maskedPrivateKey()}</code></div>
      <button id="togglePrivateKey" class="private-key-toggle" type="button" aria-pressed="${visible}">${visible?"秘密鍵を隠す":"秘密鍵を表示する"}</button>
      <p>実際の秘密鍵は第三者に共有せず、画面の録画やスクリーンショットにも残さないでください。</p>
    </div>
  </section>`;
}
function seedPhraseWords(wallet,visible){
  const words=Array.isArray(wallet?.seedPhrase)&&wallet.seedPhrase.length===12?wallet.seedPhrase:seedWordsForWallet(Math.max(1,state.wallets.findIndex(item=>item.id===wallet?.id)+1));
  return words.map((word,index)=>`<span><i>${index+1}</i><b>${visible?escapeHtml(word):"••••••"}</b></span>`).join("");
}
function setPrivateKeyVisibility(visible){
  const wallet=activeWallet();privateKeyVisible=!!visible;
  const display=$("privateKeyDisplay"),value=$("privateKeyValue"),button=$("togglePrivateKey");
  if(!wallet||!display||!value||!button)return;
  display.classList.toggle("visible",privateKeyVisible);display.classList.toggle("masked",!privateKeyVisible);
  value.textContent=privateKeyVisible?wallet.privateKey:maskedPrivateKey();
  value.setAttribute("aria-label",privateKeyVisible?"秘密鍵を表示中":"秘密鍵は非表示");
  button.textContent=privateKeyVisible?"秘密鍵を隠す":"秘密鍵を表示する";button.setAttribute("aria-pressed",String(privateKeyVisible));
}
function setSeedPhraseVisibility(visible){
  const wallet=activeWallet();seedPhraseVisible=!!visible;
  const display=$("seedPhraseDisplay"),button=$("toggleSeedPhrase");
  if(!wallet||!display||!button)return;
  display.classList.toggle("visible",seedPhraseVisible);display.classList.toggle("masked",!seedPhraseVisible);
  display.innerHTML=seedPhraseWords(wallet,seedPhraseVisible);
  display.setAttribute("aria-label",seedPhraseVisible?"シードフレーズを表示中":"シードフレーズは非表示");
  button.textContent=seedPhraseVisible?"シードフレーズを隠す":"シードフレーズを表示する";button.setAttribute("aria-pressed",String(seedPhraseVisible));
}
function bindPrivateKeyPanel(){
  const button=$("togglePrivateKey");if(!button)return;
  button.onclick=()=>{
    setPrivateKeyVisibility(!privateKeyVisible);
    log(privateKeyVisible?"private_key_revealed":"private_key_hidden");
  };
  const seedButton=$("toggleSeedPhrase");if(!seedButton)return;
  seedButton.onclick=()=>{
    const wallet=activeWallet();if(!wallet)return;
    setSeedPhraseVisibility(!seedPhraseVisible);
    log(seedPhraseVisible?"seed_phrase_revealed":"seed_phrase_hidden",{wallet_id:wallet.id});
  };
}
async function copyWalletAddress(){
  const wallet=activeWallet();if(!wallet){error("先にウォレットを作成してください");return}
  let copied=false;
  try{await navigator.clipboard.writeText(wallet.address);copied=true}catch(e){
    const ta=document.createElement("textarea");ta.value=wallet.address;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();
    try{copied=document.execCommand("copy")}catch(_){copied=false}ta.remove();
  }
  state.copyCount++;log("wallet_address_copy_attempted",{clipboard_success:copied,wallet_id:wallet.id,address:wallet.address});
  if(!copied){error("公開鍵をコピーできませんでした。ブラウザのクリップボード許可を確認してください");renderWallet();return}
  const completesMission=!missionStatus("copy");
  state.addressCopied=true;state.copiedWalletId=wallet.id;log("wallet_address_copied",{wallet_id:wallet.id,address:wallet.address});renderAll();if(!completesMission)toast(`${wallet.name}の公開鍵をコピーしました`);
}
function renderWalletNft(){
  const wallet=activeWallet();if(!wallet){renderWalletCreate();return}
  const ownedEntries=state.ownedNfts.map((owned,index)=>({owned,index})).filter(entry=>nftOwnerWalletId(entry.owned)===wallet.id);
  if(ownedEntries.length){
    walletContent.innerHTML=`
      ${walletManagerPanel()}
      <div class="dashboard-title"><div><span class="kicker">COLLECTIBLES</span><h1>${escapeHtml(wallet.name)}の保有NFT</h1><p>このウォレットで購入・受領したNFTチケットやコレクティブルが表示されます。</p></div><span class="task-callout">${ownedEntries.length} NFT</span></div>
      <div class="notice info nft-tap-guide">保有NFTをタップすると、会場で開くチケットや利用できる特典を確認できます。PassMarketで出品・売却することもできます。</div>
      ${nftExplanationButton()}
      <div class="ticket-grid">${ownedEntries.map(({owned,index},position)=>owned.ticketId?ticketCard(tickets.find(t=>t.id===owned.ticketId),false,true,position+1,index):walletCollectibleCard(owned,index)).join("")}</div>`;
    document.querySelectorAll("[data-owned-index]").forEach(card=>{
      card.onclick=()=>openOwnedNftDetail(Number(card.dataset.ownedIndex));
      card.onkeydown=event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();openOwnedNftDetail(Number(card.dataset.ownedIndex))}};
    });
  }else{
    walletContent.innerHTML=`${walletManagerPanel()}<div class="dashboard-title"><div><span class="kicker">COLLECTIBLES</span><h1>${escapeHtml(wallet.name)}の保有NFT</h1><p>現在、このウォレットが保有しているNFTはありません。</p></div></div><div class="notice info" style="margin-top:18px">NFTチケットを購入すると、ここに表示されます。</div>${nftExplanationButton()}`;
  }
  bindWalletManager();
  if($("openNftExplanation"))$("openNftExplanation").onclick=openNftExplanationGuide;
  if(!maybeStartAirdropGuide())maybeStartNftOwnershipGuide();
}

function benefitCards(ticketId,compact=false){
  const progress=gameProgress(ticketId);
  return benefitProgram(ticketId).benefits.map(benefit=>{
    const unlocked=benefitUnlocked(ticketId,benefit);
    const detail=benefit.code?`クーポンコード <code>${benefit.code}</code>`:"受取方法は後日ウォレットへお知らせ";
    return `<article class="benefit-card ${unlocked?"unlocked":"locked"}">
      <div class="benefit-score"><span>SCORE</span><strong>${fmtScore(benefit.score)}</strong></div>
      <div class="benefit-copy"><span class="benefit-status">${unlocked?"✓ 獲得済み":`あと ${fmtScore(Math.max(0,benefit.score-progress.bestScore))} 点`}</span><h3>${benefit.title}</h3>${!compact?`<p>${unlocked?detail:`スコア ${fmtScore(benefit.score)} でアンロック`}</p>`:""}</div>
    </article>`;
  }).join("");
}

function renderWalletBenefits(){
  const wallet=activeWallet();if(!wallet){renderWalletCreate();return}
  const ownedProgramIds=Object.keys(NFT_BENEFIT_PROGRAMS).filter(ticketId=>ownsTicket(ticketId,wallet.id));
  const unlockedTotal=ownedProgramIds.reduce((sum,ticketId)=>sum+benefitProgram(ticketId).benefits.filter(benefit=>benefitUnlocked(ticketId,benefit)).length,0);
  const benefitTotal=ownedProgramIds.reduce((sum,ticketId)=>sum+benefitProgram(ticketId).benefits.length,0);
  walletContent.innerHTML=`
    ${walletManagerPanel()}
    <div class="dashboard-title"><div><span class="kicker">HOLDER BENEFITS</span><h1>${escapeHtml(wallet.name)}のNFT特典</h1><p>このウォレットの保有NFTに追加された特典を確認できます。</p></div><span class="task-callout">${ownedProgramIds.length?`${unlockedTotal} / ${benefitTotal} 獲得`:`対象NFT未保有`}</span></div>
    ${ownedProgramIds.length?ownedProgramIds.map(ticketId=>{
      const t=tickets.find(item=>item.id===ticketId),program=benefitProgram(ticketId),progress=gameProgress(ticketId),next=nextBenefit(ticketId);
      return `<section class="benefit-program-block"><div class="benefit-hero">
        <div><span class="benefit-live-label">${t.title} · DYNAMIC BENEFITS</span><h2>購入後も、NFTに新しい体験と特典が追加されます。</h2><p>「${program.gameName}」のベストスコアに応じて、段階的に特典を獲得できます。</p><button class="benefit-play-button" data-benefit-game="${ticketId}" type="button">ゲームを開始する <span>→</span></button></div>
        <div class="best-score-orb"><span>BEST SCORE</span><strong>${fmtScore(progress.bestScore)}</strong><small>${next?`次は ${fmtScore(next.score)} 点`:`すべて獲得済み`}</small></div>
      </div>
      <div class="benefit-section-head"><div><span class="kicker">YOUR REWARDS</span><h2>${t.title} の特典</h2></div><span>最終プレイスコア ${fmtScore(progress.lastScore)}</span></div>
      <div class="benefit-grid">${benefitCards(ticketId)}</div></section>`;
    }).join(""):`<div class="empty-benefit-state"><span>✦</span><h2>対象NFTを保有すると特典が表示されます</h2><p>NOVA LIVE 2026、TOKYO DIGITAL ART NIGHT、SKYLINE MUSIC FEST、ANIME CREATOR EXPO、または BAY AREA LIGHT SHOW の購入後、ゲームをプレイしてスコアに応じたホルダー特典を獲得できます。</p></div>`}`;
  document.querySelectorAll("[data-benefit-game]").forEach(button=>button.onclick=()=>openGameExperience(button.dataset.benefitGame));
  bindWalletManager();
}

function openOwnedNftDetail(index){
  const owned=state.ownedNfts[index];
  if(owned&&!owned.ticketId){openWalletCollectibleDetail(index);return}
  const t=tickets.find(item=>item.id===owned?.ticketId);
  if(!owned||!t)return;
  const listing=marketListingForEntry(owned);
  log("owned_nft_opened",{ticket_id:t.id,token_id:owned.tokenId});
  const program=benefitProgram(t.id);
  const progress=program?gameProgress(t.id):null;
  openModal("OWNED NFT",t.title,`
    <div class="owned-detail-visual"><img src="${t.image}" alt=""><div><span>${t.category}</span><strong>${t.date}</strong></div></div>
    <div class="summary owned-token-summary"><div class="summary-row"><span>トークンID</span><strong>${owned.tokenId}</strong></div><div class="summary-row"><span>所有ウォレット</span><strong>${escapeHtml(walletById(nftOwnerWalletId(owned))?.name||"PassWallet")}</strong></div><div class="summary-row"><span>会場</span><strong>${t.venue}</strong></div><div class="summary-row"><span>${owned.acquisitionType==="airdrop"?"獲得日時":"購入日時"}</span><strong>${new Date(owned.purchasedAt).toLocaleString("ja-JP")}</strong></div>${owned.acquisitionType==="airdrop"?`<div class="summary-row"><span>獲得方法</span><strong>3枚購入エアドロップ</strong></div>`:owned.acquisitionType==="market_purchase"||owned.acquisitionType==="market_offer"?`<div class="summary-row"><span>取得方法</span><strong>PassMarketで購入（${escapeHtml(owned.sellerName||"—")}から）</strong></div>`:""}</div>
    <section class="admission-entry-callout${listing?" disabled":""}"><div><span>EVENT ENTRY</span><h3>会場でNFTチケットを開く</h3><p>${listing?"PassMarketで出品中のチケットは入場に使用できません。使用する場合は出品を取り消してください。":"会場側のQRコードを読み取り、パスキー（顔認証・指紋認証）で認証すると、チケットが使用済みになり入場できます。"}</p></div><button id="openAdmissionPass" type="button" ${listing?"disabled":""}>会場でチケットを開く <b>→</b></button></section>
    ${walletMarketCallout(owned)}
    ${program?`<section class="dynamic-benefit-callout"><span class="dynamic-pill">新しい特典が追加されました</span><h3>ゲームをプレイすることで追加の特典を獲得できます</h3><p>ベストスコア：<strong>${fmtScore(progress.bestScore)}</strong></p><div class="benefit-mini-list">${benefitCards(t.id,true)}</div><button id="nftStartGame" class="benefit-play-button" type="button">${program.gameName}を開始する <span>→</span></button><button id="openBenefitsPage" class="benefit-text-button" type="button">すべての特典を確認する</button></section>`:`<div class="notice info" style="margin-top:14px">現在利用できる特典：${t.benefit}</div>`}`);
  $("openAdmissionPass").onclick=()=>openAdmissionPass(index);
  bindWalletMarketCallout(owned);
  if(program){
    $("nftStartGame").onclick=()=>openGameExperience(t.id);
    $("openBenefitsPage").onclick=()=>{closeModal();state.currentWalletTab="wallet-benefits";renderWallet()};
  }
}

function positionAdmissionResaleGuide(){
  if(!admissionResaleGuideOpen()||!admissionResaleGuideTarget?.isConnected)return;
  const targetRect=admissionResaleGuideTarget.getBoundingClientRect(),bubble=$("admissionResaleGuide");
  const mobile=window.matchMedia("(max-width: 760px)").matches,viewportMargin=mobile?10:16,gap=mobile?12:18;
  bubble.style.removeProperty("top");bubble.style.removeProperty("right");bubble.style.removeProperty("bottom");bubble.style.removeProperty("left");bubble.style.removeProperty("width");bubble.style.removeProperty("max-height");
  const availableLeft=targetRect.left-gap-viewportMargin,availableRight=window.innerWidth-targetRect.right-gap-viewportMargin;
  const stacked=mobile||Math.max(availableLeft,availableRight)<300;
  if(stacked){
    if(mobile){
      bubble.style.left=`max(${viewportMargin}px,env(safe-area-inset-left))`;
      bubble.style.right=`max(${viewportMargin}px,env(safe-area-inset-right))`;
    }else{
      const stackedWidth=Math.min(window.innerWidth>=1280?560:520,window.innerWidth-viewportMargin*2);
      bubble.style.width=`${stackedWidth}px`;
      bubble.style.left=`${Math.min(window.innerWidth-stackedWidth-viewportMargin,Math.max(viewportMargin,targetRect.left+(targetRect.width-stackedWidth)/2))}px`;
    }
    const naturalHeight=bubble.offsetHeight,spaceBelow=window.innerHeight-targetRect.bottom-gap-viewportMargin,spaceAbove=targetRect.top-gap-viewportMargin,heightLimit=mobile?245:Infinity;
    const readableHeight=Math.min(naturalHeight,160);
    if(spaceBelow>=naturalHeight||(spaceBelow>=spaceAbove&&spaceBelow>=readableHeight)){
      bubble.style.maxHeight=`${Math.max(96,Math.min(spaceBelow,heightLimit))}px`;bubble.style.top=`${targetRect.bottom+gap}px`;
    }else if(spaceAbove>=readableHeight){
      const availableHeight=Math.max(96,Math.min(spaceAbove,heightLimit));
      bubble.style.maxHeight=`${availableHeight}px`;bubble.style.top=`${Math.max(viewportMargin,targetRect.top-gap-Math.min(naturalHeight,availableHeight))}px`;
    }else{
      // 画面の高さが低く上下どちらにも収まらない場合は、ハイライトに重ねてでも説明と「閉じる」を画面内に収める
      const height=Math.min(naturalHeight,heightLimit,window.innerHeight-viewportMargin*2);
      bubble.style.maxHeight=`${height}px`;bubble.style.top=`${window.innerHeight-viewportMargin-height}px`;
    }
    return;
  }
  const availableSideWidth=Math.max(availableLeft,availableRight);
  bubble.style.width=`${Math.min(window.innerWidth>=1280?560:520,Math.floor(availableSideWidth))}px`;
  const bubbleWidth=bubble.offsetWidth,bubbleHeight=bubble.offsetHeight;
  const left=availableRight>=availableLeft?targetRect.right+gap:targetRect.left-gap-bubbleWidth;
  bubble.style.left=`${Math.min(window.innerWidth-bubbleWidth-viewportMargin,Math.max(viewportMargin,left))}px`;
  bubble.style.top=`${Math.min(window.innerHeight-bubbleHeight-viewportMargin,Math.max(viewportMargin,targetRect.top+(targetRect.height-bubbleHeight)/2))}px`;
}

function keepAdmissionResaleGuideTargetInView(){
  if(!admissionResaleGuideOpen()||!admissionResaleGuideTarget?.isConnected)return false;
  const rect=admissionResaleGuideTarget.getBoundingClientRect(),mobile=window.matchMedia("(max-width: 760px)").matches;
  const viewportTop=(mobile?64:72)+10,viewportBottom=window.innerHeight-10;
  let delta=0;
  if(rect.height>viewportBottom-viewportTop)delta=rect.top-viewportTop;
  else if(rect.top<viewportTop)delta=rect.top-viewportTop;
  else if(rect.bottom>viewportBottom)delta=rect.bottom-viewportBottom;
  if(Math.abs(delta)<1)return false;
  $("admissionPass").scrollBy({top:delta,behavior:"auto"});return true;
}

function hideAdmissionResaleGuide(){
  admissionResaleGuideTarget?.classList.remove("wallet-guide-highlight","admission-resale-guide-highlight");
  $("admissionResaleGuideBackdrop").classList.add("hidden");$("admissionResaleGuideBackdrop").setAttribute("aria-hidden","true");
  $("admissionResaleGuide").classList.add("hidden");$("admissionResaleGuide").setAttribute("aria-hidden","true");
  document.documentElement.classList.remove("admission-resale-guide-open");document.body.classList.remove("admission-resale-guide-open");
  admissionResaleGuideTarget=null;
}

function startAdmissionResaleGuide(){
  const mobile=window.matchMedia("(max-width: 760px)").matches;
  if(admissionResaleGuideOpen()||(mobile&&state.admissionResaleGuideShown))return false;
  admissionResaleGuideTarget=$("admissionLiveScreen");
  if(!admissionResaleGuideTarget)return false;
  if(mobile)state.admissionResaleGuideShown=true;
  admissionResaleGuideTarget.classList.add("wallet-guide-highlight","admission-resale-guide-highlight");
  document.documentElement.classList.add("admission-resale-guide-open");document.body.classList.add("admission-resale-guide-open");
  $("admissionResaleGuideBackdrop").classList.remove("hidden");$("admissionResaleGuideBackdrop").setAttribute("aria-hidden","false");
  $("admissionResaleGuide").classList.remove("hidden");$("admissionResaleGuide").setAttribute("aria-hidden","false");
  startGuideGeometryMonitor();scheduleGuidePositionRefresh(5);
  log("admission_resale_guide_opened",{token_id:currentAdmissionOwned()?.tokenId||null});
  requestAnimationFrame(()=>{
    if(!admissionResaleGuideOpen())return;
    for(let attempt=0;attempt<3;attempt++){
      positionAdmissionResaleGuide();
      if(!keepAdmissionResaleGuideTargetInView())break;
    }
    positionAdmissionResaleGuide();$("admissionResaleGuideClose").focus({preventScroll:true});
  });
  return true;
}

function closeAdmissionResaleGuide(){
  if(!admissionResaleGuideOpen())return;
  const tokenId=currentAdmissionOwned()?.tokenId||null;
  hideAdmissionResaleGuide();
  log("admission_resale_guide_closed",{token_id:tokenId});
  scheduleMissionCompletionNoticeResume();
}

function currentAdmissionOwned(){
  return activeAdmissionIndex===null?null:state.ownedNfts[activeAdmissionIndex]||null;
}

function admissionSheetOpen(){
  return !$("admissionScanSheet").classList.contains("hidden")||!$("admissionSignatureSheet").classList.contains("hidden");
}

function closeAdmissionSheets(){
  clearTimeout(admissionTimer);admissionTimer=null;
  ["admissionScanSheet","admissionSignatureSheet"].forEach(id=>{$(id).classList.add("hidden");$(id).setAttribute("aria-hidden","true")});
  $("admissionSignatureBackdrop").classList.add("hidden");
  $("admissionSignatureBackdrop").setAttribute("aria-hidden","true");
  $("admissionScanViewfinder").classList.remove("scanning");
  $("admissionScanConfirm").disabled=false;$("admissionScanConfirm").textContent="QRコードを読み取る";
  $("admissionSignatureConfirm").disabled=false;$("admissionSignatureConfirm").textContent="顔認証・指紋認証で認証";
  requestMissionCompletionNotice();
}

function openAdmissionSheet(id){
  suspendMissionCompletionNotice(); // シートの見出しや説明に重ならないよう、達成通知はシートを閉じた後に表示する
  $("admissionSignatureBackdrop").classList.remove("hidden");
  $("admissionSignatureBackdrop").setAttribute("aria-hidden","false");
  $(id).classList.remove("hidden");
  $(id).setAttribute("aria-hidden","false");
}

function resetAdmissionState(){
  if(admissionResaleGuideOpen())hideAdmissionResaleGuide();
  closeAdmissionSheets();
}

function setAdmissionProofCheck(id,verified){
  $(id).classList.toggle("verified",verified);
}

function renderAdmissionState(){
  const owned=currentAdmissionOwned();
  if(!owned)return;
  const phase=owned.admissionUsedAt?"used":owned.venueScannedAt?"scanned":"pending";
  const text={
    pending:{status:"未入場",label:"VENUE QR REQUIRED",instruction:"会場に設置されたQRコードを読み取ってください",proof:"NFT TICKET",code:"READY",note:"会場のQRコードを読み取ってください"},
    scanned:{status:"QR確認済み",label:"VENUE QR CONFIRMED",instruction:"会場QRを確認しました。パスキー（顔認証・指紋認証）で認証してください",proof:"VENUE QR CONFIRMED",code:"QR OK",note:"パスキーで認証してください"},
    used:{status:"使用済み",label:"TICKET USED",instruction:"NFTチケットが使用済みになりました。入場できます",proof:"CHECKED IN",code:"USED",note:owned.admissionUsedAt?new Date(owned.admissionUsedAt).toLocaleString("ja-JP"):""}
  }[phase];
  const tone=phase==="used"?"used":phase==="scanned"?"verified":"pending";
  $("admissionValidStatus").className=`admission-valid-status ${tone}`;
  $("admissionLiveProof").className=`admission-live-proof ${tone}`;
  $("admissionStatusLabel").textContent=text.label;
  $("admissionStatusText").textContent=text.status;
  $("admissionInstruction").textContent=text.instruction;
  $("admissionLiveLabel").textContent=text.proof;
  $("admissionLiveCode").textContent=text.code;
  $("admissionLiveCountdown").textContent=text.note;
  setAdmissionProofCheck("admissionOwnershipCheck",true);
  setAdmissionProofCheck("admissionQrCheck",phase!=="pending");
  setAdmissionProofCheck("admissionPasskeyCheck",phase==="used");
  $("admissionScanButton").classList.toggle("hidden",phase!=="pending");
  $("admissionVerifyButton").classList.toggle("hidden",phase!=="scanned");
}

function beginVenueScan(){
  const owned=currentAdmissionOwned();
  if(!owned)return;
  if(owned.admissionUsedAt){error("このNFTチケットは使用済みです");return}
  openAdmissionSheet("admissionScanSheet");
  log("venue_qr_scan_started",{ticket_id:owned.ticketId,token_id:owned.tokenId});
  requestAnimationFrame(()=>$("admissionScanConfirm").focus({preventScroll:true}));
}

function confirmVenueScan(){
  const owned=currentAdmissionOwned();
  if(!owned){closeAdmissionSheets();return}
  $("admissionScanViewfinder").classList.add("scanning");
  $("admissionScanConfirm").disabled=true;$("admissionScanConfirm").textContent="読み取り中…";
  clearTimeout(admissionTimer);
  admissionTimer=setTimeout(()=>{
    if(currentAdmissionOwned()!==owned)return;
    owned.venueScannedAt=now();
    log("venue_qr_scanned",{ticket_id:owned.ticketId,token_id:owned.tokenId});
    closeAdmissionSheets();renderAdmissionState();renderMission();
    toast("会場のQRコードを確認しました");
  },VENUE_SCAN_MS);
}

function beginPasskeyAuthentication(){
  const owned=currentAdmissionOwned();
  if(!owned)return;
  if(owned.admissionUsedAt){error("このNFTチケットは使用済みです");return}
  if(!owned.venueScannedAt){error("先に会場のQRコードを読み取ってください");return}
  $("admissionSignatureToken").textContent=owned.tokenId;
  openAdmissionSheet("admissionSignatureSheet");
  log("passkey_auth_requested",{ticket_id:owned.ticketId,token_id:owned.tokenId});
  requestAnimationFrame(()=>$("admissionSignatureConfirm").focus({preventScroll:true}));
}

function confirmPasskeyAuthentication(){
  const owned=currentAdmissionOwned();
  if(!owned){closeAdmissionSheets();return}
  $("admissionSignatureConfirm").disabled=true;$("admissionSignatureConfirm").textContent="認証中…";
  clearTimeout(admissionTimer);
  admissionTimer=setTimeout(()=>{
    if(currentAdmissionOwned()!==owned)return;
    const completesMission=!missionStatus("admission");
    state.signatureCount++;owned.admissionUsedAt=now();
    log("passkey_authenticated",{ticket_id:owned.ticketId,token_id:owned.tokenId});
    log("admission_check_in_completed",{ticket_id:owned.ticketId,token_id:owned.tokenId,used_at:owned.admissionUsedAt});
    closeAdmissionSheets();renderAdmissionState();renderMission();
    if(completesMission&&progress()===100)scheduleCompletionProgressGuide();
    else if(!completesMission)toast("入場処理が完了しました");
    startAdmissionResaleGuide();
  },PASSKEY_PROMPT_MS);
}

function openAdmissionPass(index){
  const owned=state.ownedNfts[index],t=tickets.find(item=>item.id===owned?.ticketId);
  if(!owned||!t||owned.soldAt){error("チケットを表示できません");return}
  if(marketListingForEntry(owned)){error("出品中のチケットは入場に使用できません。先に出品を取り消してください");return}
  const ownerWallet=walletById(nftOwnerWalletId(owned));
  resetAdmissionState();activeAdmissionIndex=index;closeModal();
  $("admissionEventImage").src=t.image;$("admissionEventImage").alt=`${t.title} のチケットビジュアル`;
  $("admissionEventCategory").textContent=t.category.toUpperCase();
  $("admissionPassTitle").textContent=`${t.title} NFTチケット`;
  $("admissionEventDate").textContent=t.date;
  $("admissionEventTitle").textContent=t.title;
  $("admissionEventVenue").textContent=t.venue;
  $("admissionTokenId").textContent=owned.tokenId;
  $("admissionOwner").textContent=shortWalletAddress(owned.ownerAddress||ownerWallet?.address);
  $("admissionIssuedAt").textContent=new Date(owned.purchasedAt).toLocaleString("ja-JP");
  $("admissionPass").classList.remove("hidden");document.body.classList.add("admission-pass-open");
  renderAdmissionState();
  state.admissionPassViewed=true;renderMission();
  log("admission_pass_opened",{ticket_id:t.id,token_id:owned.tokenId,wallet_id:ownerWallet?.id||null});
  requestAnimationFrame(()=>$("admissionPassClose").focus());
}

function closeAdmissionPass(){
  if($("admissionPass").classList.contains("hidden"))return;
  resetAdmissionState();
  $("admissionPass").classList.add("hidden");document.body.classList.remove("admission-pass-open");
  log("admission_pass_closed");
  const previousIndex=activeAdmissionIndex;activeAdmissionIndex=null;
  document.querySelector(`[data-owned-index="${previousIndex}"]`)?.focus();
  if(progress()===100&&!state.completionProgressGuideCompleted)scheduleCompletionProgressGuide();
  scheduleMissionCompletionNoticeResume();
}

function showFirstBenefitGuide(){
  const pending=state.firstBenefitGuidePending;
  if(state.firstBenefitGuideCompleted||!pending||$("firstBenefitGuide")||$("gameExperience").classList.contains("hidden"))return;
  const benefit=benefitProgram(pending.ticketId)?.benefits.find(item=>item.score===pending.score);
  if(!benefit)return;
  const guide=document.createElement("section");
  guide.id="firstBenefitGuide";guide.className="first-benefit-guide";
  guide.setAttribute("role","dialog");guide.setAttribute("aria-modal","true");guide.setAttribute("aria-labelledby","firstBenefitGuideTitle");
  guide.innerHTML=`<div class="first-benefit-guide-content"><span class="kicker">初めての特典獲得</span><h2 id="firstBenefitGuideTitle">NFTを識別して、条件に応じた特典を届ける</h2><div class="first-benefit-highlight"><span>✓ 獲得した特典</span><strong>${escapeHtml(benefit.title)}</strong><small>${fmtScore(benefit.score)}点の条件を達成</small></div><p>NFTは、コントラクトアドレスとトークンIDの組み合わせによって、1点ずつ識別できます。運営者は、そのNFTの保有者と、ゲームのスコアなどの条件達成状況を確認し、対象となる保有者に特典を提供できます。</p><p>今回のゲームでは、目標スコアを達成すると、保有するNFTチケットに対応した特典が使えるようになる仕組みを体験しています。購入した後も、条件に応じて新しい楽しみやサービスを追加できることが、NFTの活用方法のひとつです。</p><p class="first-benefit-note">特典の内容や付与条件は運営者が設計します。NFTを持つだけで、すべての特典が自動的に付くわけではありません。</p><button id="firstBenefitGuideClose" class="primary" type="button">説明を閉じる</button></div>`;
  $("gameExperience").appendChild(guide);
  $("gameExperience").querySelector(".game-experience-header").inert=true;
  $("gameExperience").querySelector(".game-experience-body").inert=true;
  $("firstBenefitGuideClose").onclick=closeFirstBenefitGuide;
  log("first_benefit_guide_opened",pending);
  $("firstBenefitGuideClose").focus({preventScroll:true});
}
function closeFirstBenefitGuide(){
  const guide=$("firstBenefitGuide");if(!guide)return;
  guide.remove();
  $("gameExperience").querySelector(".game-experience-header").inert=false;
  $("gameExperience").querySelector(".game-experience-body").inert=false;
  state.firstBenefitGuideCompleted=true;state.firstBenefitGuidePending=null;
  log("first_benefit_guide_completed");
  $("gameClose").focus({preventScroll:true});
}

function updateGameOverlay(){
  const ticketId=state.activeGameTicketId,program=benefitProgram(ticketId),progress=gameProgress(ticketId);
  if(!program||!progress)return;
  $("gameBestScore").textContent=fmtScore(progress.bestScore);
  $("gameBenefitList").innerHTML=program.benefits.map(benefit=>`<li class="${benefitUnlocked(ticketId,benefit)?"unlocked":""}"><span>${benefitUnlocked(ticketId,benefit)?"✓":fmtScore(benefit.score)}</span><div><strong>${benefit.title}</strong><small>${benefitUnlocked(ticketId,benefit)?"獲得済み":`SCORE ${fmtScore(benefit.score)}`}</small></div></li>`).join("");
  const next=nextBenefit(ticketId);
  $("gameNextReward").textContent=next?`次の特典まであと ${fmtScore(Math.max(0,next.score-progress.bestScore))} 点`:`全ての特典を獲得しました！`;
}

function gameFullscreenElement(){
  return document.fullscreenElement||document.webkitFullscreenElement||null;
}
function collapseGameBrowserUi(){
  const nudge=()=>window.scrollTo(0,Math.max(1,window.scrollY+1));
  nudge();
  window.setTimeout(nudge,250);
}
function enterGameFullscreen(){
  const mobileViewport=window.matchMedia("(pointer: coarse)").matches||window.innerWidth<=760;
  if(!mobileViewport||navigator.standalone===true||gameFullscreenElement())return;
  const overlay=$("gameExperience");
  const standardRequest=overlay.requestFullscreen;
  const prefixedRequest=overlay.webkitRequestFullscreen||overlay.webkitRequestFullScreen;
  if(!standardRequest&&!prefixedRequest){collapseGameBrowserUi();return}
  try{
    const request=standardRequest?standardRequest.call(overlay,{navigationUI:"hide"}):prefixedRequest.call(overlay);
    Promise.resolve(request).catch(collapseGameBrowserUi);
  }catch(_error){collapseGameBrowserUi()}
}
function exitGameFullscreen(){
  const overlay=$("gameExperience"),fullscreen=gameFullscreenElement();
  if(!fullscreen||!(fullscreen===overlay||overlay.contains(fullscreen)))return;
  const exit=document.exitFullscreen||document.webkitExitFullscreen||document.webkitCancelFullScreen;
  if(!exit)return;
  try{Promise.resolve(exit.call(document)).catch(()=>{})}catch(_error){}
}

function openGameExperience(ticketId){
  const program=benefitProgram(ticketId),t=tickets.find(item=>item.id===ticketId);
  if(!program||!t)return;
  if(!ownsTicket(ticketId,activeWallet()?.id)){error(`このゲームは${t.title}の保有者限定です`);return}
  closeModal();
  state.activeGameTicketId=ticketId;
  const progress=gameProgress(ticketId);progress.playCount++;
  $("gameExperienceTitle").textContent=program.challengeTitle;
  const frame=$("gameFrame");frame.title=program.frameTitle;
  if(frame.dataset.ticketId!==ticketId){
    const separator=program.gameSrc.includes("?")?"&":"?";
    frame.src=`${program.gameSrc}${separator}run=${Date.now()}-${progress.playCount}`;
    frame.dataset.ticketId=ticketId;
  }
  log("benefit_game_opened",{ticket_id:ticketId,play_count:progress.playCount});
  updateGameOverlay();
  $("gameExperience").classList.remove("hidden");
  enterGameFullscreen();
  document.body.classList.add("game-open");
}
function closeGameExperience(){
  closeFirstBenefitGuide();
  const ticketId=state.activeGameTicketId,progress=ticketId?gameProgress(ticketId):null;
  exitGameFullscreen();
  $("gameExperience").classList.add("hidden");document.body.classList.remove("game-open");
  if(progress)log("benefit_game_closed",{ticket_id:ticketId,last_score:progress.lastScore,best_score:progress.bestScore});
  state.activeGameTicketId=null;
  const frame=$("gameFrame");
  frame.src="about:blank";
  delete frame.dataset.ticketId;
  renderWallet();
}

function renderMarket(){
  const hasWallet=state.passkeyCreated&&state.wallets.length>0;
  const accountWallet=activeWallet();
  $("marketWalletButton").textContent=hasWallet?"PassWallet 作成済み":"PassWallet 未作成";
  $("marketWalletButton").disabled=false;
  $("marketWalletButton").classList.toggle("connected",hasWallet);
  $("marketWalletButton").title=hasWallet?"PassWalletを開きます":"決済後にパスキーを設定すると作成されます";
  $("marketWalletButton").onclick=()=>hasWallet?switchApp("wallet"):toast("決済後にパスキーを設定すると、PassWalletが作成されます");
  const ownedCount=accountWallet?ownedNftsForWallet(accountWallet.id).length:0;
  const purchaseCount=purchasedNftCount(),rewardOwned=ownsTicket(AIRDROP_TICKET_ID),airdropRemaining=Math.max(0,AIRDROP_PURCHASE_THRESHOLD-purchaseCount);
  marketContent.innerHTML=`
    ${ownedCount?`<div class="completion-card"><div class="success-check">✓</div><h2>${ownedCount}枚のNFTチケットを保有しています</h2><p>別のチケットや同じチケットを続けて購入できます。</p><div class="button-row" style="justify-content:center;margin-top:15px"><button id="openOwnedNft" class="primary" type="button">PassWalletを見る</button></div></div>`:""}
    <div class="dashboard-title" style="margin-top:${ownedCount?22:0}px"><div><span class="kicker">EXPLORE TICKETS</span><h1>NFTチケットを選ぶ</h1><p>希望するイベントのチケットを選択してください。ログインは不要です。</p></div><span class="task-callout">日本円でお支払い</span></div>
    <section class="pm-store-banner"><div><span>PASSMARKET</span><h2>NFTの売買はPassMarketで</h2><p>購入したNFTチケットの公式リセールや、アート・トレカ・御朱印など様々なNFTを日本円で売買できます。</p></div><button id="openPassMarket" type="button">PassMarketを開く <b>→</b></button></section>
    <section class="airdrop-market-banner ${rewardOwned?"unlocked":""}"><div><span>${rewardOwned?"AIRDROP RECEIVED":"LIMITED AIRDROP"}</span><h2>${rewardOwned?"NEXUS FUTURE PASSを獲得しました":"NFTチケットを3枚購入して限定NFTを獲得"}</h2><p>${rewardOwned?"限定NFTはPassWalletから確認できます。":`同じチケットを複数購入しても対象です。現在${purchaseCount}枚購入済み、あと${airdropRemaining}枚。`}</p></div><div class="airdrop-mini-art"><img src="${airdropTicket().image}" alt="" aria-hidden="true"></div></section>
    <div class="ticket-grid">${tickets.filter(t=>!t.airdropOnly).map(t=>ticketCard(t,true,false)).join("")}</div>`;
  if($("openOwnedNft"))$("openOwnedNft").onclick=()=>{state.currentWalletTab="wallet-nft";switchApp("wallet")};
  $("openPassMarket").onclick=()=>{log("passmarket_banner_opened");switchApp("trade")};
  updateMarketAccessUi();
  document.querySelectorAll("[data-select-ticket]").forEach(b=>b.onclick=()=>{
    state.selectedTicketId=b.dataset.selectTicket;state.ticketSelectedAt=now();state.paymentMethod=null;state.paymentStatus=null;
    log("ticket_selected",{ticket_id:state.selectedTicketId,price_yen:ticketPriceYen(ticket())});renderMission();renderMarket();openPurchaseModal();
  });
}
function ticketCard(t,selectable,owned,holdingNumber=null,ownedIndex=null){
  if(!t)return"";
  const accountWallet=activeWallet();
  const count=state.ownedNfts.filter(item=>item.ticketId===t.id&&(!selectable||(accountWallet&&nftOwnerWalletId(item)===accountWallet.id))).length;
  const actionLabel=count?"もう一枚購入":"選択する";
  const listing=owned&&ownedIndex!==null?marketListingForEntry(state.ownedNfts[ownedIndex]):null;
  return `<article class="ticket-card ${owned?"owned-ticket-card":""} ${t.airdropOnly?"airdrop-ticket-card":""} ${state.selectedTicketId===t.id?"selected":""}" ${owned?`data-owned-index="${ownedIndex}" role="button" tabindex="0" aria-label="${t.title}の詳細と特典を開く"`:""}>
    <div class="ticket-art"><img src="${t.image}" alt="" aria-hidden="true" loading="lazy" decoding="async"><span>${t.category.toUpperCase()}</span><span>${t.date}</span></div>
    <div class="ticket-info"><h3>${t.title}</h3><p>${t.venue}<br>${t.benefit}</p><div class="ticket-price"><strong>${t.airdropOnly?"AIRDROP":fmtTicketYen(ticketPriceYen(t))}</strong>${selectable?`<button data-select-ticket="${t.id}" type="button">${actionLabel}</button>`:owned?`<span class="notice success" style="padding:6px 8px">${t.airdropOnly?"限定特典":`保有 #${holdingNumber}`}</span>`:""}</div>${listing?`<div class="wallet-listing-badge"><span>PassMarketで出品中</span><b>${fmtYen(listing.price)}</b></div>`:""}${owned&&benefitProgram(t.id)?`<div class="added-benefit-badge"><span>✦</span> ゲーム特典を確認 <b>→</b></div>`:""}${selectable&&count?`<p style="margin-top:8px;color:#0a7b55;font-weight:800">現在 ${count}枚保有</p>`:""}</div></article>`;
}

function showAirdropReward(reward){
  const t=airdropTicket();if(!t||!reward)return;
  openModal("SPECIAL AIRDROP","限定NFTチケットを獲得",`
    <div class="airdrop-reward-visual"><img src="${t.image}" alt="${t.title}の近未来的なチケットビジュアル"><div><span>3 TICKET REWARD</span><h3>${t.title}</h3></div></div>
    <div class="airdrop-reward-copy"><span>✓ AIRDROP COMPLETED</span><h3>NFTチケット3枚購入特典</h3><p>同じチケットを含む合計3枚の購入を達成したため、新しい限定NFTチケットをPassWalletへ自動で追加しました。</p></div>
    <div class="summary"><div class="summary-row"><span>トークンID</span><strong>${reward.tokenId}</strong></div><div class="summary-row"><span>価格</span><strong>無料エアドロップ</strong></div></div>
    <button id="viewAirdropReward" class="primary" style="width:100%;margin-top:15px" type="button">PassWalletで確認する</button>`);
  $("viewAirdropReward").onclick=()=>{closeModal();if(walletById(reward.ownerWalletId)){state.activeWalletId=reward.ownerWalletId;syncLegacyWalletState()}switchApp("wallet");state.currentWalletTab="wallet-nft";renderWallet()};
}
let checkoutMode="ticket";
function checkoutOrder(){
  if(checkoutMode==="market")return marketCheckoutOrder();
  const t=ticket();
  return {kicker:"CHECKOUT",heading:"デジタルチケットを購入",title:t?.title||"デジタルチケット",detail:t?`${t.date} · ${t.venue}`:"",amountYen:ticketPriceYen(t),payee:"Ticket Store",image:null,note:null,logId:{ticket_id:t?.id||null}};
}
function checkoutMethod(){return checkoutMode==="market"?state.marketOrder?.method||null:state.paymentMethod}
function setCheckoutMethod(method){if(checkoutMode==="market"){if(state.marketOrder)state.marketOrder.method=method}else state.paymentMethod=method}
function submitCheckoutPayment(){if(checkoutMode==="market")beginMarketPayment();else beginSimplifiedPayment()}
function openPurchaseModal(){
  if(!ticket())return;
  if(state.marketOrder?.status==="selecting")state.marketOrder=null;
  checkoutMode="ticket";renderCheckoutMethods();
}
function renderCheckoutMethods(){
  const order=checkoutOrder(),method=checkoutMethod(),balance=state.wallets.length?tradeBalance():0,shortBalance=balance<order.amountYen;
  const methodCard=(key,icon,iconClass,title,sub,disabled=false)=>`<button class="payment-method-card ${method===key?"selected":""}" data-payment-method="${key}" type="button" ${disabled?"disabled":""}><span class="payment-method-icon ${iconClass}">${icon}</span><span><strong>${title}</strong><small>${sub}</small></span><b>›</b></button>`;
  openModal(order.kicker,order.heading,`
    <div class="checkout-order">${order.image?`<img class="checkout-order-image" src="${order.image}" alt="">`:""}<div><span>ご注文内容</span><strong>${escapeHtml(order.title)}</strong><small>${escapeHtml(order.detail)}</small></div><b>${fmtTicketYen(order.amountYen)}</b></div>
    ${order.note?`<p class="checkout-note">${escapeHtml(order.note)}</p>`:""}
    <div class="checkout-total"><span>お支払い合計</span><strong>${fmtTicketYen(order.amountYen)}</strong></div>
    <div class="payment-section-title"><strong>お支払い方法を選択</strong><span>安全な疑似決済</span></div>
    <div class="payment-method-list">
      ${methodCard("credit_card","CARD","card-icon","クレジットカード","Visa / Mastercard / JCB")}
      ${methodCard("paypay","P","paypay-icon","PayPay","QRコード・アプリ決済")}
      ${methodCard("qr_payment","QR","qr-icon","その他のQRコード決済","d払い / 楽天ペイ / au PAY")}
      ${balance>0?methodCard("balance","¥","balance-icon","売上残高",`残高 ${fmtYen(balance)}${shortBalance?"・残高が不足しています":""}`,shortBalance):""}
    </div>
    <div class="prototype-strip payment-prototype-strip">研究用の疑似決済です。実際の請求は発生しません。</div>
    <div class="button-row" style="margin-top:15px"><button id="continuePurchase" class="primary" type="button" ${method&&!(method==="balance"&&shortBalance)?"":"disabled"}>お支払いへ進む</button><button id="cancelPurchase" class="secondary" type="button">キャンセル</button></div>`);
  $("cancelPurchase").onclick=closeModal;
  document.querySelectorAll("[data-payment-method]").forEach(button=>button.onclick=()=>{
    setCheckoutMethod(button.dataset.paymentMethod);
    document.querySelectorAll("[data-payment-method]").forEach(item=>item.classList.toggle("selected",item===button));
    $("continuePurchase").disabled=false;
    log("payment_method_selected",{method:button.dataset.paymentMethod,checkout:checkoutMode,...order.logId});
  });
  $("continuePurchase").onclick=openPaymentDetails;
}
function openPaymentDetails(){
  const method=checkoutMethod();
  if(method==="credit_card")renderCreditCardPayment();
  else if(method==="paypay")renderPayPayPayment();
  else if(method==="qr_payment")renderQrPayment();
  else if(method==="balance")renderBalancePayment();
  else error("お支払い方法を選択してください");
}
function paymentOrderHeader(provider){
  const order=checkoutOrder();
  return `<div class="payment-provider-head"><div><span>${escapeHtml(provider)}</span><strong>${escapeHtml(order.title)}</strong></div><b>${fmtTicketYen(order.amountYen)}</b></div>`;
}
function renderCreditCardPayment(){
  openModal("SECURE PAYMENT","クレジットカードで支払う",`
    <div class="realistic-payment card-payment">${paymentOrderHeader("カード決済")}
      <div class="demo-card-visual"><span>DEMO CARD</span><strong>4242&nbsp; 4242&nbsp; 4242&nbsp; 4242</strong><div><small>DEMO USER</small><b>12/30</b></div></div>
      <div class="form-grid payment-form"><div class="field full"><label>カード番号</label><input id="cardNumber" class="input" inputmode="numeric" autocomplete="off" value="4242 4242 4242 4242" maxlength="19"></div><div class="field"><label>有効期限</label><input id="cardExpiry" class="input" inputmode="numeric" autocomplete="off" value="12 / 30" maxlength="7"></div><div class="field"><label>セキュリティコード</label><input id="cardCvc" class="input" inputmode="numeric" autocomplete="off" value="123" maxlength="4"></div><div class="field full"><label>カード名義</label><input id="cardName" class="input" autocomplete="off" value="DEMO USER"></div></div>
      <label class="check payment-save-card"><input id="saveDemoCard" type="checkbox"><span>次回のためにこのデモカードを保存する</span></label>
      <div class="secure-payment-note"><span>🔒</span><p><strong>暗号化された安全な決済</strong><small>入力内容は保存・送信されません</small></p></div>
      <div class="button-row"><button id="submitCardPayment" class="primary" type="button">${fmtTicketYen(checkoutOrder().amountYen)}を支払う</button><button id="backToPaymentMethods" class="secondary" type="button">戻る</button></div>
      <div class="prototype-strip payment-prototype-strip">表示中の番号は研究用テストカードです。実在するカード情報は入力しないでください。</div>
    </div>`);
  bindNumericInput($("cardNumber"),value=>value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim());
  $("submitCardPayment").onclick=submitCreditCardPayment;
  $("backToPaymentMethods").onclick=renderCheckoutMethods;
}
function submitCreditCardPayment(){
  const number=toHalfWidthNumber($("cardNumber").value).replace(/\D/g,""),expiry=toHalfWidthNumber($("cardExpiry").value).replace(/／/g,"/").trim(),cvc=toHalfWidthNumber($("cardCvc").value).replace(/\D/g,""),name=$("cardName").value.trim();
  if(number.length!==16){error("カード番号を16桁で入力してください");return}
  if(!/^\d{2}\s*\/\s*\d{2}$/.test(expiry)){error("有効期限を確認してください");return}
  if(cvc.length<3||!name){error("カード情報を確認してください");return}
  log("payment_details_confirmed",{method:"credit_card",card_last4:number.slice(-4),saved:$("saveDemoCard").checked,checkout:checkoutMode});
  submitCheckoutPayment();
}
function renderPayPayPayment(){
  openModal("PAYPAY PAYMENT","PayPayで支払う",`
    <div class="realistic-payment qr-payment paypay-payment">${paymentOrderHeader("PayPay")}
      <div class="qr-payment-body"><span class="paypay-large-mark">P</span><h3>PayPayアプリでお支払い</h3><p>QRコードを読み取り、アプリ側で金額を確認する操作を再現します。</p>${mockQrMarkup("PayPay決済")}</div>
      <div class="qr-payment-details"><span>お支払い先 <strong>${escapeHtml(checkoutOrder().payee)}</strong></span><span>有効時間 <strong>あと5分</strong></span></div>
      <button id="confirmPayPayPayment" class="paypay-primary" type="button">PayPayで支払う（デモ）</button>
      <button id="backToPaymentMethods" class="secondary payment-back" type="button">お支払い方法を変更</button>
      <div class="prototype-strip payment-prototype-strip">研究用QRです。実際のPayPayアプリや残高は使用しません。</div>
    </div>`);
  $("confirmPayPayPayment").onclick=()=>{log("payment_details_confirmed",{method:"paypay",flow:"qr_app",checkout:checkoutMode});submitCheckoutPayment()};
  $("backToPaymentMethods").onclick=renderCheckoutMethods;
}
function renderQrPayment(){
  openModal("QR PAYMENT","QRコード決済で支払う",`
    <div class="realistic-payment qr-payment">${paymentOrderHeader("QRコード決済")}
      <div class="field qr-service-field"><label>決済サービス</label><select id="qrPaymentService" class="select"><option value="d_payment">d払い</option><option value="rakuten_pay">楽天ペイ</option><option value="au_pay">au PAY</option></select></div>
      <div class="qr-payment-body"><span class="generic-qr-mark">QR</span><h3>アプリでQRコードを読み取る</h3><p>選択した決済アプリで金額を確認し、支払いを完了する操作を再現します。</p>${mockQrMarkup("QRコード決済")}</div>
      <div class="qr-payment-details"><span>お支払い先 <strong>${escapeHtml(checkoutOrder().payee)}</strong></span><span>お支払い金額 <strong>${fmtTicketYen(checkoutOrder().amountYen)}</strong></span></div>
      <button id="confirmQrPayment" class="primary qr-primary" type="button">アプリで支払う（デモ）</button>
      <button id="backToPaymentMethods" class="secondary payment-back" type="button">お支払い方法を変更</button>
      <div class="prototype-strip payment-prototype-strip">研究用QRです。実際の決済アプリや残高は使用しません。</div>
    </div>`);
  $("confirmQrPayment").onclick=()=>{log("payment_details_confirmed",{method:"qr_payment",service:$("qrPaymentService").value,checkout:checkoutMode});submitCheckoutPayment()};
  $("backToPaymentMethods").onclick=renderCheckoutMethods;
}
function renderBalancePayment(){
  const order=checkoutOrder(),balance=tradeBalance();
  openModal("BALANCE PAYMENT","売上残高で支払う",`
    <div class="realistic-payment">${paymentOrderHeader("売上残高")}
      <div class="summary"><div class="summary-row"><span>現在の売上残高</span><strong>${fmtYen(balance)}</strong></div><div class="summary-row"><span>お支払い</span><strong>−${fmtYen(order.amountYen)}</strong></div><div class="summary-row total"><span>お支払い後の残高</span><strong>${fmtYen(balance-order.amountYen)}</strong></div></div>
      <div class="secure-payment-note"><span>🔒</span><p><strong>PassMarketの売上残高から支払います</strong><small>NFTを売却して得た売上を使用します</small></p></div>
      <button id="confirmBalancePayment" class="primary" type="button">${fmtTicketYen(order.amountYen)}を残高で支払う</button>
      <button id="backToPaymentMethods" class="secondary payment-back" type="button">お支払い方法を変更</button>
    </div>`);
  $("confirmBalancePayment").onclick=()=>{
    if(tradeBalance()<order.amountYen){error("売上残高が不足しています");return}
    log("payment_details_confirmed",{method:"balance",checkout:checkoutMode});submitCheckoutPayment();
  };
  $("backToPaymentMethods").onclick=renderCheckoutMethods;
}
function beginSimplifiedPayment(){
  const t=ticket();
  if(!t||!state.paymentMethod){error("お支払い方法を選択してください");return}
  if(state.paymentMethod==="balance"&&!debitTradeBalance(ticketPriceYen(t),{title:`${t.title} を購入（残高払い）`,ticketId:t.id})){error("売上残高が不足しています");return}
  state.paymentStatus="processing";state.paymentStartedAt=now();
  state.pendingPurchaseTicketId=t.id;state.pendingPurchaseWalletId=activeWallet()?.id||null;
  state.purchaseCompletesAt=Date.now()+PAYMENT_DELAY_MS;
  log("fiat_payment_submitted",{ticket_id:t.id,method:state.paymentMethod,amount_yen:ticketPriceYen(t)});
  showPaymentProcessing();schedulePaymentCompletion(PAYMENT_DELAY_MS);
}
function showPaymentProcessing(){
  openModal("PAYMENT","お支払いを処理しています",`<div class="transaction-status"><div class="spinner"></div><h3>${fmtTicketYen(ticketPriceYenById(state.pendingPurchaseTicketId))}のお支払いを確認中です</h3><p>この画面を閉じずに、そのままお待ちください。</p></div>`,false);
}
function completeSimplifiedPayment(){
  if(!state.pendingPurchaseTicketId)return;
  state.paymentCompleted=true;state.paymentCompletedAt=now();
  log("fiat_payment_completed",{ticket_id:state.pendingPurchaseTicketId,method:state.paymentMethod,amount_yen:ticketPriceYenById(state.pendingPurchaseTicketId)});
  if(!state.passkeyCreated||!activeWallet()){
    state.paymentStatus="awaiting_passkey";state.purchaseCompletesAt=null;
    renderMission();showPasskeySetup();return;
  }
  state.paymentStatus="paid";state.purchaseCompletesAt=Date.now()+PURCHASE_DELAY_MS;
  renderMission();showNftIssuing();schedulePurchaseCompletion(PURCHASE_DELAY_MS);
}
const PASSKEY_SVG='<svg viewBox="0 0 64 64" width="38" height="38" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" aria-hidden="true"><path d="M14 30a18 18 0 0 1 36 0"/><path d="M20 34a12 12 0 0 1 24 0v6"/><path d="M26 36a6 6 0 0 1 12 0v10a8 8 0 0 1-3 6"/><path d="M14 38v4a22 22 0 0 0 5 14"/><path d="M32 36v12a14 14 0 0 1-3 9"/></svg>';
function showPasskeySetup(){
  const nftLabel=state.marketOrder?.status==="awaiting_passkey"?"購入したNFT":"NFTチケット";
  openModal("PASSKEY SETUP","パスキーを設定",`
    <div class="passkey-setup">
      <div class="passkey-visual">${PASSKEY_SVG}</div>
      <h3>お支払いが完了しました</h3>
      <p>顔認証や指紋認証でパスキーを設定すると、PassWalletのウォレットが作成され、${nftLabel}が届きます。</p>
      <ol class="mission-hint-steps">
        <li><span>1</span><p>パスキーを設定（顔認証・指紋認証）</p></li>
        <li><span>2</span><p>PassWalletのウォレットを自動で作成</p></li>
        <li><span>3</span><p>${nftLabel}を受け取り</p></li>
      </ol>
      <button id="setupPasskey" class="primary passkey-primary" type="button">パスキーを設定する</button>
      <div class="prototype-strip payment-prototype-strip">研究用の疑似画面です。実際の生体情報は取得しません。</div>
    </div>`,false);
  $("setupPasskey").onclick=startPasskeySetup;
}
function startPasskeySetup(){
  log("passkey_setup_started",{ticket_id:state.pendingPurchaseTicketId,item_id:state.marketOrder?.itemId||null});
  openModal("PASSKEY SETUP","パスキーを確認しています",`<div class="transaction-status"><div class="passkey-visual scanning">${PASSKEY_SVG}</div><h3>顔認証または指紋認証を確認中です</h3><p>端末の案内に従って認証してください。</p></div>`,false);
  clearTimeout(passkeyTimer);passkeyTimer=setTimeout(completePasskeySetup,PASSKEY_PROMPT_MS);
}
function createPassWallet(){
  let wallet=activeWallet();
  if(!wallet){
    wallet={id:`passwallet-${Date.now()}`,name:"PassWallet",address:generateDemoWalletAddress(),privateKey:generateDemoPrivateKey(),ethBalance:0,createdAt:now(),seedPhrase:seedWordsForWallet(1)};
    state.wallets=[wallet];state.activeWalletId=wallet.id;
  }
  state.connectedWalletId=wallet.id;state.marketConnected=true;
  state.passkeyCreated=true;state.passkeyCreatedAt=now();state.currentWalletTab="wallet-nft";syncLegacyWalletState();
  log("passkey_created",{wallet_id:wallet.id});
  log("wallet_created",{wallet_id:wallet.id,address:wallet.address,wallet_type:"passwallet"});
  return wallet;
}
function completePasskeySetup(){
  const order=state.marketOrder;
  if(order?.status==="awaiting_passkey"){
    createPassWallet();
    // Ticket Storeと同じく、説明の表示中に再読み込みしてもパスキーを設定し直さずに受け取りを完了できるよう、先に受け取り中へ進める
    order.status="delivering";order.completesAt=Date.now()+PURCHASE_DELAY_MS;
    renderAll();
    showPasskeyGuide("NFTを受け取る","passmarket",continueMarketOrderAfterPasskey);return;
  }
  if(state.paymentStatus!=="awaiting_passkey")return;
  const wallet=createPassWallet();
  state.pendingPurchaseWalletId=wallet.id;state.paymentStatus="paid";state.purchaseCompletesAt=Date.now()+PURCHASE_DELAY_MS;
  renderAll();
  showPasskeyGuide("NFTチケットを受け取る","ticket_store",()=>{state.purchaseCompletesAt=Date.now()+PURCHASE_DELAY_MS;showNftIssuing();schedulePurchaseCompletion(PURCHASE_DELAY_MS)});
}
let passkeyGuideTarget=null;
let passkeyGuideContinue=null;
function passkeyGuideOpen(){return !$("passkeyGuide").classList.contains("hidden")}
function showPasskeyGuide(actionLabel,flow,onContinue){
  if(state.passkeyGuideShown||passkeyGuideOpen()){onContinue();return}
  state.passkeyGuideShown=true;passkeyGuideContinue=onContinue;
  const wallet=activeWallet(),button=$("marketWalletButton");
  passkeyGuideTarget=state.currentApp==="market"&&button?.offsetParent?button:null;
  passkeyGuideTarget?.classList.add("wallet-guide-highlight","passkey-guide-highlight");
  $("passkeyGuideIcon").innerHTML=PASSKEY_SVG;
  $("passkeyGuideAddress").textContent=wallet?`パスキーで保護 · ${shortWalletAddress(wallet.address)}`:"パスキーで保護";
  $("passkeyGuideNext").innerHTML=`${escapeHtml(actionLabel)} <span aria-hidden="true">→</span>`;
  document.documentElement.classList.add("passkey-guide-open");document.body.classList.add("passkey-guide-open");
  $("passkeyGuideBackdrop").classList.remove("hidden");$("passkeyGuideBackdrop").setAttribute("aria-hidden","false");
  $("passkeyGuide").classList.remove("hidden");
  closeModal(); // ガイドを開いてから閉じるので、達成通知はガイドの後に表示される
  log("passkey_guide_opened",{wallet_id:wallet?.id||null,flow});
  startGuideGeometryMonitor();
  const placeGuide=()=>{if(passkeyGuideOpen()){keepPasskeyGuideTargetInView();positionPasskeyGuide()}};
  requestAnimationFrame(()=>{placeGuide();$("passkeyGuideNext").focus({preventScroll:true});whenScrollSettles(placeGuide)});
}
function keepPasskeyGuideTargetInView(){
  if(!passkeyGuideTarget?.isConnected)return;
  const rect=passkeyGuideTarget.getBoundingClientRect(),mobile=window.matchMedia("(max-width: 760px)").matches;
  const top=mobile?84:96,bottom=window.innerHeight-(mobile?$("passkeyGuide").offsetHeight+28:16);
  if(rect.top<top||rect.bottom>bottom)window.scrollTo({top:Math.max(0,rect.top+window.scrollY-top),behavior:"auto"});
}
function positionPasskeyGuide(){
  if(!passkeyGuideOpen())return;
  const bubble=$("passkeyGuide");
  ["top","right","bottom","left"].forEach(side=>bubble.style.removeProperty(side));
  if(window.matchMedia("(max-width: 760px)").matches)return;
  const width=bubble.offsetWidth,height=bubble.offsetHeight,W=window.innerWidth,H=window.innerHeight,margin=16,gap=18;
  if(!passkeyGuideTarget?.isConnected){bubble.style.left=`${Math.max(margin,(W-width)/2)}px`;bubble.style.top=`${Math.max(margin,(H-height)/2)}px`;bubble.style.right="auto";return}
  const r=passkeyGuideTarget.getBoundingClientRect();
  const clampX=x=>Math.min(W-width-margin,Math.max(margin,x)),clampY=y=>Math.min(H-height-margin,Math.max(margin,y));
  let left,top;
  if(r.bottom+gap+height<=H-margin){top=r.bottom+gap;left=clampX(r.right-width)}
  else if(r.left-gap-width>=margin){left=r.left-gap-width;top=clampY(r.top)}
  else{top=clampY(r.top-gap-height);left=clampX(r.right-width)}
  bubble.style.left=`${left}px`;bubble.style.top=`${top}px`;bubble.style.right="auto";
}
function closePasskeyGuide(){
  if(!passkeyGuideOpen())return;
  passkeyGuideTarget?.classList.remove("wallet-guide-highlight","passkey-guide-highlight");passkeyGuideTarget=null;
  $("passkeyGuideBackdrop").classList.add("hidden");$("passkeyGuideBackdrop").setAttribute("aria-hidden","true");
  $("passkeyGuide").classList.add("hidden");
  document.documentElement.classList.remove("passkey-guide-open");document.body.classList.remove("passkey-guide-open");
  log("passkey_guide_completed");
  const next=passkeyGuideContinue;passkeyGuideContinue=null;
  next?.();
  scheduleMissionCompletionNoticeResume();
}
function showNftIssuing(){
  openModal("TICKET ISSUE","チケットを発行しています",`<div class="transaction-status"><div class="spinner"></div><h3>PassWalletへ追加しています</h3><p>PassWalletの準備が完了しました。NFTチケットの発行と受取は自動で行われます。</p></div>`,false);
}
function schedulePaymentCompletion(delay){
  clearTimeout(purchaseTimer);purchaseTimer=setTimeout(completeSimplifiedPayment,Math.max(0,delay));
}
function completePurchase(){
  const purchasedTicketId=state.pendingPurchaseTicketId,purchaseWallet=walletById(state.pendingPurchaseWalletId)||activeWallet();
  if(!purchasedTicketId)return;
  if(!purchaseWallet){state.pendingPurchaseTicketId=null;state.pendingPurchaseWalletId=null;state.purchaseCompletesAt=null;closeModal();error("チケットアカウントを確認できませんでした");return}
  const purchasedNft={tokenId:`MG-${Date.now().toString().slice(-8)}`,ticketId:purchasedTicketId,purchasedAt:now(),acquisitionType:"fiat_purchase",paymentMethod:state.paymentMethod,priceYen:ticketPriceYenById(purchasedTicketId),ownerWalletId:purchaseWallet.id,ownerAddress:purchaseWallet.address};
  state.ownedNfts.push(purchasedNft);noteNftMinted(purchasedNft);
  if(!state.firstPurchasedNftTokenId)state.firstPurchasedNftTokenId=purchasedNft.tokenId;
  state.nftOwned=true;if(!state.completedAt)state.completedAt=now();
  state.paymentStatus="completed";
  log("nft_automatically_issued",{ticket_id:purchasedTicketId,owned_count:state.ownedNfts.length,delivery:"embedded_account",payment_method:state.paymentMethod,price_yen:ticketPriceYenById(purchasedTicketId)});
  maybeGrantAirdrop("purchase_threshold",purchaseWallet.id);
  state.pendingPurchaseTicketId=null;state.pendingPurchaseWalletId=null;state.purchaseCompletesAt=null;closeModal();renderAll();
  showNftAcquisitionSuccess(purchasedNft);
}
function showNftAcquisitionSuccess(purchasedNft){
  const t=tickets.find(item=>item.id===purchasedNft.ticketId);
  openModal("TICKET ACQUIRED","NFTチケットを取得しました",`
    <div class="completion-card"><div class="success-check">✓</div><h2>${escapeHtml(t?.title||"デジタルチケット")}</h2><p>お支払いが完了し、NFTチケットがPassWalletへ自動で追加されました。</p></div>
    <div class="summary" style="margin-top:15px"><div class="summary-row"><span>お支払い</span><strong>${fmtTicketYen(purchasedNft.priceYen)}</strong></div><div class="summary-row"><span>受取状況</span><strong>追加済み</strong></div></div>
    <button id="closePurchasedTicket" class="primary" style="width:100%;margin-top:15px" type="button">閉じる</button>`,false);
  $("closePurchasedTicket").onclick=closeModal;
}
function schedulePurchaseCompletion(delay){
  clearTimeout(purchaseTimer);purchaseTimer=setTimeout(completePurchase,Math.max(0,delay));
}
function resumePendingOperations(){
  if(state.pendingPurchaseTicketId){
    const remaining=(Number(state.purchaseCompletesAt)||Date.now()+PURCHASE_DELAY_MS)-Date.now();
    if(state.paymentStatus==="processing"){
      showPaymentProcessing();schedulePaymentCompletion(remaining);
    }else if(state.paymentStatus==="awaiting_passkey"){
      showPasskeySetup();
    }else{
      showNftIssuing();schedulePurchaseCompletion(remaining);
    }
  }
  resumeMarketOperations();
}
function openResetConfirmation(){
  openModal("RESET PROGRESS","進捗をリセットしますか？",`
    <div class="notice danger">この参加者のPassWallet、購入履歴、保有NFT、ゲームスコア、操作ログがすべて削除されます。この操作は取り消せません。</div>
    <div class="button-row" style="margin-top:16px"><button id="confirmProgressReset" class="danger-btn" type="button">すべて削除してリセット</button><button id="cancelProgressReset" class="secondary" type="button">キャンセル</button></div>`);
  $("cancelProgressReset").onclick=closeModal;
  $("confirmProgressReset").onclick=resetProgress;
}
function resetProgress(){
  resetInProgress=true;
  clearTimeout(persistTimer);clearTimeout(transferTimer);clearTimeout(purchaseTimer);clearTimeout(passkeyTimer);clearTimeout(completionProgressGuideTimer);stopTicker();stopMarketEngine();
  try{
    localStorage.removeItem(STORAGE_KEY);
    GAME_STORAGE_KEYS.forEach(key=>localStorage.removeItem(key));
  }catch(error){console.warn("保存された進捗を削除できませんでした。",error)}
  location.reload();
}
function renderMarketComplete(){
  const t=ticket();
  const totalSec=Math.max(1,Math.round((new Date(state.completedAt)-new Date(state.startedAt))/1000));
  marketContent.innerHTML=`
    <div class="completion-card"><div class="success-check">✓</div><h2>NFTチケットを購入しました</h2><p>${t.title} がOrbit Walletへ追加されました。これは研究用の疑似取引です。</p></div>
    <div class="result-grid"><div class="result-card"><span>所要時間</span><strong>${formatDuration(totalSec)}</strong></div><div class="result-card"><span>サービス切替</span><strong>${state.appSwitchCount}回</strong></div><div class="result-card"><span>コピー・貼付</span><strong>${state.copyCount+state.pasteCount}回</strong></div><div class="result-card"><span>署名</span><strong>${state.signatureCount}回</strong></div></div>
    <div class="button-row" style="justify-content:center;margin-top:18px"><button id="openOwnedNft" class="primary" type="button">ウォレットでNFTを見る</button></div>`;
  $("openOwnedNft").onclick=()=>{switchApp("wallet");state.currentWalletTab="wallet-nft";renderWallet()};
}

function openModal(kicker,title,body,closable=true){
  suspendMissionCompletionNotice();
  $("modalKicker").textContent=kicker;$("modalTitle").textContent=title;$("modalBody").innerHTML=body;
  $("modal").classList.remove("hidden");$("modalBackdrop").classList.remove("hidden");
  $("modalClose").classList.toggle("hidden",!closable);$("modalBackdrop").onclick=closable?closeModal:null;
}
function closeModal(){closeSignatureGuide(false);onMarketModalClosed();$("modal").classList.add("hidden");$("modalBackdrop").classList.add("hidden");requestMissionCompletionNotice()}
function formatDuration(s){const m=Math.floor(s/60),r=s%60;return m?`${m}分${r}秒`:`${r}秒`}
function benefitResult(ticketId){
  const program=benefitProgram(ticketId),progress=gameProgress(ticketId);
  return {game_play_count:progress.playCount,last_score:progress.lastScore,best_score:progress.bestScore,
    unlocked:program.benefits.filter(benefit=>benefitUnlocked(ticketId,benefit)).map(benefit=>({score:benefit.score,title:benefit.title,code:benefit.code,unlocked_at:progress.benefitsUnlockedAt[benefit.score]}))};
}
function resultData(){
  if(state.appEnteredAt!==null){state.appTimes[state.currentApp]+=Math.round((performance.now()-state.appEnteredAt)/1000);state.appEnteredAt=performance.now()}
  const currentWallet=activeWallet();
  const lastPaidNft=[...state.ownedNfts].reverse().find(item=>item.acquisitionType==="fiat_purchase");
  return {participant_id:state.participantId,condition:"passkey_wallet_fiat_nft_flow",started_at:state.startedAt,completed_at:state.completedAt,
    completion_time_seconds:state.completedAt?Math.round((new Date(state.completedAt)-new Date(state.startedAt))/1000):null,
    app_switch_count:state.appSwitchCount,help_open_count:state.helpOpenCount,copy_count:state.copyCount,paste_count:state.pasteCount,
    signature_count:state.signatureCount,validation_error_count:state.validationErrors,app_times_seconds:state.appTimes,
    passkey:{created:state.passkeyCreated,created_at:state.passkeyCreatedAt,passwallet_created:!!currentWallet},
    payment:{method:state.paymentMethod,status:state.paymentStatus,amount_yen:state.paymentCompleted?(lastPaidNft?.priceYen??ticketPriceYenById(state.pendingPurchaseTicketId||state.selectedTicketId)):null,started_at:state.paymentStartedAt,completed_at:state.paymentCompletedAt},
    ticketing:{selected_ticket:state.selectedTicketId,selected_at:state.ticketSelectedAt,nft_owned:state.ownedNfts.length>0,nft_count:state.ownedNfts.length,purchased_nft_count:purchasedNftCount(),purchases:state.ownedNfts,admission_pass_viewed:state.admissionPassViewed,
      airdrop:{threshold:AIRDROP_PURCHASE_THRESHOLD,received:ownsTicket(AIRDROP_TICKET_ID),ticket_id:AIRDROP_TICKET_ID}},
    post_acquisition:{owned_nfts:state.ownedNfts,
      nova_live_benefits:benefitResult("nova-live"),digital_art_benefits:benefitResult("digital-art"),skyline_fest_benefits:benefitResult("skyline-fest"),anime_creator_expo_benefits:benefitResult("creator-expo"),bay_area_light_show_benefits:benefitResult("light-show")},
    marketplace:marketResultData(),
    event_log:state.eventLog};
}
function downloadResult(){
  const blob=new Blob([JSON.stringify(resultData(),null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`${state.participantId}_simplified_flow.json`;a.hidden=true;document.body.appendChild(a);
  try{a.click()}finally{a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}
  document.querySelectorAll("[data-survey-status]").forEach(el=>{el.textContent="JSONの保存を開始しました。ブラウザのダウンロード一覧をご確認ください。"});
}

$("startButton").onclick=start;
$("progressGuideStart").onclick=closeProgressGuide;
$("saveCompletedResult").onclick=downloadResult;
$("saveCompletedResultGuide").onclick=downloadResult;
$("exchangeBalanceGuideClose").onclick=closeExchangeBalanceGuide;
$("walletSecurityGuideNext").onclick=advanceWalletSecurityGuide;
$("nftOwnershipGuideNext").onclick=advanceNftOwnershipGuide;
$("passkeyGuideNext").onclick=closePasskeyGuide;
$("signatureGuideClose").onclick=closeSignatureGuide;
$("homeButton").onclick=()=>{if(workspace.classList.contains("hidden"))return;window.scrollTo({top:0,behavior:"smooth"})};
document.querySelectorAll(".switcher-item").forEach(b=>b.onclick=()=>switchApp(b.dataset.app));
document.querySelectorAll("#exchangeTabs button").forEach(b=>b.onclick=()=>setExchangeTab(b.dataset.tab));
document.querySelectorAll("#walletTabs button").forEach(b=>b.onclick=()=>{
  const tab=b.dataset.tab;if((tab==="wallet-nft"||tab==="wallet-benefits")&&!state.walletCreated){error("先にウォレットを作成してください");return}
  state.currentWalletTab=tab;renderWallet();
});
$("modalClose").onclick=closeModal;
$("helpButton").onclick=()=>{state.helpOpenCount++;log("help_opened");$("helpBackdrop").classList.remove("hidden");$("helpDrawer").classList.add("open");$("helpDrawer").setAttribute("aria-hidden","false")};
function closeHelp(){$("helpBackdrop").classList.add("hidden");$("helpDrawer").classList.remove("open");$("helpDrawer").setAttribute("aria-hidden","true")}
$("helpClose").onclick=closeHelp;$("helpBackdrop").onclick=closeHelp;
$("admissionPassClose").onclick=closeAdmissionPass;
$("admissionScanButton").onclick=beginVenueScan;
$("admissionScanConfirm").onclick=confirmVenueScan;
$("admissionScanCancel").onclick=closeAdmissionSheets;
$("admissionVerifyButton").onclick=beginPasskeyAuthentication;
$("admissionSignatureConfirm").onclick=confirmPasskeyAuthentication;
$("admissionSignatureCancel").onclick=closeAdmissionSheets;
$("admissionSignatureBackdrop").onclick=closeAdmissionSheets;
$("admissionResaleGuideClose").onclick=closeAdmissionResaleGuide;
$("gameClose").onclick=closeGameExperience;
$("resetProgressButton").onclick=openResetConfirmation;
window.addEventListener("pagehide",persistState);
window.addEventListener("resize",()=>{
  if(exchangeBalanceGuideOpen())requestAnimationFrame(()=>{positionExchangeBalanceGuide();keepExchangeBalanceGuideTargetInView();positionExchangeBalanceGuide()});
  if(walletSecurityGuideOpen())requestAnimationFrame(()=>{positionWalletSecurityGuide();keepWalletSecurityGuideTargetInView();positionWalletSecurityGuide()});
  if(nftOwnershipGuideOpen())requestAnimationFrame(()=>{positionNftOwnershipGuide();keepNftOwnershipGuideTargetInView();positionNftOwnershipGuide()});
  if(signatureGuideOpen())requestAnimationFrame(positionSignatureGuide);
  if(admissionResaleGuideOpen())requestAnimationFrame(()=>{positionAdmissionResaleGuide();keepAdmissionResaleGuideTargetInView();positionAdmissionResaleGuide()});
  scheduleGuidePositionRefresh(6);
});
window.addEventListener("scroll",()=>{
  if(exchangeBalanceGuideOpen())requestAnimationFrame(positionExchangeBalanceGuide);
  if(walletSecurityGuideOpen())requestAnimationFrame(positionWalletSecurityGuide);
  if(nftOwnershipGuideOpen())requestAnimationFrame(positionNftOwnershipGuide);
  if(signatureGuideOpen())requestAnimationFrame(positionSignatureGuide);
  if(admissionResaleGuideOpen())requestAnimationFrame(positionAdmissionResaleGuide);
  scheduleGuidePositionRefresh(2);
},{passive:true});
if(window.visualViewport){
  window.visualViewport.addEventListener("resize",()=>scheduleGuidePositionRefresh(6),{passive:true});
  window.visualViewport.addEventListener("scroll",()=>scheduleGuidePositionRefresh(3),{passive:true});
}
document.addEventListener("touchmove",preventMobileGuideViewportScroll,{passive:false});
document.addEventListener("touchstart",recordMobileGuideTouchStart,{passive:true});
window.addEventListener("wheel",preventMobileGuideViewportScroll,{passive:false});
window.addEventListener("message",event=>{
  const ticketId=state.activeGameTicketId,program=benefitProgram(ticketId);
  if(event.source!==$("gameFrame").contentWindow||!program||event.data?.type!==program.messageType)return;
  const score=Math.max(0,Math.floor(Number(event.data.score)||0));
  const progress=gameProgress(ticketId),previousBest=progress.bestScore;
  progress.lastScore=score;progress.bestScore=Math.max(progress.bestScore,score);
  program.benefits.forEach(benefit=>{
    if(previousBest<benefit.score&&progress.bestScore>=benefit.score){
      progress.benefitsUnlockedAt[benefit.score]=now();
      if(!state.firstBenefitGuideCompleted&&!state.firstBenefitGuidePending)state.firstBenefitGuidePending={ticketId,score:benefit.score};
      log("nft_benefit_unlocked",{ticket_id:ticketId,score:benefit.score,benefit:benefit.title,code:benefit.code});
    }
  });
  if(event.data.final)log("benefit_game_finished",{ticket_id:ticketId,score,best_score:progress.bestScore});
  updateGameOverlay();
  if(event.data.final)showFirstBenefitGuide();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){if($("firstBenefitGuide")){closeFirstBenefitGuide();return}if(tradeGuideOpen()||passkeyGuideOpen())return;if(admissionResaleGuideOpen())closeAdmissionResaleGuide();else if(signatureGuideOpen())closeSignatureGuide();else if(nftOwnershipGuideOpen())closeNftOwnershipGuide();else if(progressGuideOpen())closeProgressGuide();else if(admissionSheetOpen())closeAdmissionSheets();else if(!$("admissionPass").classList.contains("hidden"))closeAdmissionPass();else if(!$("gameExperience").classList.contains("hidden"))closeGameExperience();else{closeModal();closeHelp()}}});
restoreSession();
