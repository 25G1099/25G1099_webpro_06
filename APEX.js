"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let charactors = [
  {id: 1, name: "バリスティック", ability: "ウィスラー", ability_ex: "当たると敵が銃を撃つにつれてオーバーヒートする弾を撃つ。オーバーヒートするとダメージを受ける。戦術アビリティをホールドでロックオンする。", ult: "テンペスト", ult_ex: "発動すると、付近の仲間のリロード速度、武器装備中の移動速度が上昇し、所持弾薬が無限になる。バリスティックはスリング武器を装備し、スリング武器はゴールドにアップグレードする。"},
  {id: 2, name: "バンガロール", ability: "スモークランチャー", ability_ex: "虚空を通り、安全かつ迅速に移動する。ダメージは一切受けない。", ult: "ローリングサンダー", ult_ex: "一帯をゆっくりと巡る支援砲撃を要請する。"},
  {id: 3, name: "ヒューズ", ability: "ナックルクラスター", ability_ex: "着弾時に空中炸裂式の爆発物を連続射出するクラスター爆弾を発射する。", ult: "マザーロード", ult_ex: "一帯を炎の壁で包み込む爆撃を行う。"},
  {id: 4, name: "マッドマギー", ability: "ライオットドリル", ability_ex: "障害物を突破して敵を焼き払うドリルを放つ。", ult: "鉄球", ult_ex: "スピードブーストパッドを放ち、敵の近くで爆発するボールを投げる。"},
  {id: 5, name: "レヴナント", ability: "シャドウパウンス", ability_ex: " 前方に力強く飛び掛かる。長押しでチャージして、更に遠くまで飛ぶ。", ult: "フォージシャドウ", ult_ex: " 周囲にダメージを防ぎ、破壊後に再生する硬化した影を作り上げる。シャドウと戦術アビリティはノックダウン時にリセットする。"},
  {id: 6, name: "ホライゾン", ability: "グラビティリフト", ability_ex: "重力の流れを逆転させてプレイヤーを上に運び、脱出時にブーストをかける。", ult: "ブラックホール", ult_ex: "発動すると、付近の仲間のリロード速度、武器装備中の移動速度が上昇し、所持弾薬が無限になる。バリスティックはスリング武器を装備し、スリング武器はゴールドにアップグレードする。"},
  {id: 7, name: "オクタン", ability: "興奮剤", ability_ex: "移動速度が6秒間、30%上昇する。発動時に体力を消費。", ult: "発射台", ult_ex: "仲間を空中へ射出するジャンプパッドを展開する。"},
  {id: 8, name: "アッシュ", ability: "アークスネア", ability_ex: " 回転するスネアを投げると最初に近づいてきた敵にダメージを与え、拘束することができる。", ult: "フェーズティア", ult_ex: "狙った場所に一方通行のポータルを開く。"},
  {id: 9, name: "オルター", ability: "ヴォイドパッセージ", ability_ex: " 物体を通り抜けられるポータルを作成する。", ult: "ヴォイドネクサス", ult_ex: "すべての仲間が遠隔操作できる合流ポイントを作成する。これを使用することでフェーズトンネルが開き、合流地点に戻ることが可能。世界には二つの虚無のネクサスが存在することがあります。"},
  {id: 10, name: "パスファインダー", ability: "グラップリングフック", ability_ex: "グラップリングで、移動の難しい場所へ素早く移動できる。", ult: "ジップラインガン", ult_ex: "誰もが使えるジップラインを作成します。 エネルギーが充填されている間、ライダーは受けるダメージが50%減少します。"},
  {id: 11, name: "レイス", ability: "虚空へ", ability_ex: " 虚空を通り、安全かつ迅速に移動する。ダメージは一切受けない。", ult: "ディメンションリフト", ult_ex: "2地点間をポータルで45秒間連結し、チーム全体で使用できるようにする。"},
  {id: 12, name: "ブラッドハウンド", ability: "全能の目", ability_ex: "短い間だけ眼前の全構造物を見通して、敵や罠、手掛かりを見破る。", ult: "ビーストハンター", ult_ex: "五感が研ぎ澄まされることで動きが速くなり、獲物がハイライト表示されるようになる。"},
  {id: 13, name: "クリプト", ability: "スパイドローン", ability_ex: "飛行ドローンを展開して、周辺区域を上空から観察する。ドローンが破壊された場合、次の機体の展開まで40秒のクールダウンが必要。", ult: "ドローンEMP", ult_ex: "スパイドローンはシールドダメージを与え、動きを遅くし、罠を無効化するEMP波を放出する。"},
  {id: 14, name: "ヴァルキリー", ability: "ミサイルワーム", ability_ex: "複数の小型ロケットを斉射して敵にダメージを与え、混乱に陥れる。", ult: "スカイハイダイブ", ult_ex: " 仲間も離陸システムで上昇可能。"},
  {id: 15, name: "ヴァンテージ", ability: "エコー配置", ability_ex: " 翼を持つコンパニオンのエコーを配置し、その後、エコーに向かって飛んで行く。エコーを出撃させるには視界が必要です。", ult: "スナイパーのマーク", ult_ex: "カスタムのスナイパーライフルを使って敵の標的をマークできる。マークした敵に対して、自分とチームのダメージボーナスが適用される。"},
  {id: 16, name: "シア", ability: "フォーカス・オブ・アテンション", ability_ex: " シアはマイクロドローンを呼び出して、敵を妨害し明らかにする遅延爆風を放出する。この効果は壁を貫通する。", ult: "ショーケース", ult_ex: "マイクロドローンの球体を作り出し、範囲内で素早く移動したり、射撃している敵の位置を明らかにする。"},
  {id: 17, name: "スパロー", ability: "トラッカーダーツ", ability_ex: "ガントレットからトラッカーを発射し、範囲内を歩く敵を明らかにする。 これらのダーツは、遠距離から調査ビーコンを起動することも可能。", ult: "スティンガーボルト", ult_ex: "着弾した場所に固定する大きなアローを放つ。チャージが完了すると範囲内の敵にショックを放ってダメージを与え、動きを鈍らせる。"},
  {id: 18, name: "コンジット", ability: "レイディアントトランスファー", ability_ex: "仲間にエネルギーを一気に放出し、危機に陥った仲間とコンジットに一時的なシールドを生成する。", ult: "エネルギーバリケード", ult_ex: "敵にダメージを与えて動きを鈍らせるジャミングデバイスの一団を展開する。"},
  {id: 19, name: "ジブラルタル", ability: "プロテクトドーム", ability_ex: "攻撃をブロックするドームシールドを投下する。", ult: "防衛爆撃", ult_ex: "マークされた位置への迫撃砲の集中攻撃を要請します。"},
  {id: 20, name: "ライフライン", ability: "D.O.C.ヒールドローン", ability_ex: " D.O.C.が近くの味方を回復する。D.O.C.を展開すると、味方を指定して追従するよう指示を出すことができる。", ult: "D.O.C.ヘイロー", ult_ex: "D.O.C.を放つとヘイローシールドシステムが起動する。範囲内の全プレイヤーが、体力とシールドの消耗アイテムをより早く使用できる。"},
  {id: 21, name: "ローバ", ability: "盗賊の相棒", ability_ex: "ジャンプドライブ・ブレスレットを投げ、たどり着きづらい場所にテレポートしたり、窮地から一瞬で脱する。", ult: "ブラックマーケット", ult_ex: "付近のアイテムをインベントリ内にテレポートさせられるポータブルデバイスを配置する。敵味方を問わず、各レジェンドは最大2個のアイテムを回収できる。"},
  {id: 22, name: "ミラージュ", ability: "サイクアウト", ability_ex: "ホログラフのデコイを発生させて、敵を混乱させる。", ult: "パーティの生活", ult_ex: "デコイ集団を展開して敵の注意を引く。"},
  {id: 23, name: "ニューキャッスル", ability: "モバイルシールド", ability_ex: "操作可能なドローンを投げると、移動エネルギーシールドを生成する。", ult: "城壁", ult_ex: "標的にした味方やエリアに向かって飛び、地面に叩きつけて強固なストロングホールドを構築する。"},
  {id: 24, name: "カタリスト", ability: "スパイクストリップ", ability_ex: "敵が近づくとスパイクに変化する磁性流体を投げる。カタリストは敵のスパイクから影響を受けない（最大2個）。", ult: "フェロバリケード", ult_ex: "磁性流体の透過可能な壁を作る。壁を通った敵は移動速度が低下し、一時的に視界が悪くなる。"},
  {id: 25, name: "コースティック", ability: "Noxガストラップ", ability_ex: " 敵に撃たれたり、接近される、強力なNoxガスを放出する容器を落とす。", ult: "Noxガスグレネード", ult_ex: " 広いエリアをNoxガスで包む。"},
  {id: 26, name: "ランパート", ability: "増幅バリケード", ability_ex: " 遮蔽物を設置すると、全体を覆う増幅バリケードが出現する。敵の銃弾をブロックし、バリケード内からの攻撃を強化する。", ult: "モバイルシーラ", ult_ex: "大容量マガジンを備えたモバイルシエラを使用します。誰でも使える固定式でリロード可能なタレットとして配置します。"},
  {id: 27, name: "ワットソン", ability: "周辺セキュリティ", ability_ex: "ノードを接続して、敵にダメージを与え、動きを遅くする電気フェンスを作成します。ドアの近くのフェンスはドアを帯電させます。", ult: "インターセプターパイロン", ult_ex: "着弾する兵器を破壊し、損傷したシールドを修復する電気パイロンを設置します。迎撃された兵器はアークスターに変換されます。"},
]

//一覧
app.get("/APEX",(req,res) => {
  res.render('APEX',{data: charactors})
});

// Create
app.get("/APEX/create", (req, res) => {
  res.redirect('/public/APEX_new.html');
});

// Read
app.get("/APEX/:number", (req, res) => {
  const number = req.params.number;
  const detail = charactors[ number ];
  res.render('APEX_detail', {id: number, data: detail} );
});

// Delete
app.get("/APEX/deletecf/:number", (req, res) => {
  const number = req.params.number
  const detail = charactors[ number ];
  res. render('APEX_deletecf',{id: number, data: detail});
});

app.get("/APEX/delete/:number", (req, res) => {
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  charactors.splice( req.params.number, 1 );
  res.redirect('/APEX' );
});

// Create
app.post("/APEX", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = charactors.length + 1;
  const name = req.body.name;
  const ability = req.body.ability;
  const ability_ex = req.body.ability_ex;
  const ult = req.body.ult;
  const ult_ex = req.body.ult_ex;
  charactors.push( { id: id, name: name, ability: ability, ability_ex: ability_ex, ult: ult, ult_ex: ult_ex } );
  console.log( charactors );
  res.render('APEX', {data: charactors} );
});

// Edit
app.get("/APEX/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = charactors[ number ];
  res.render('APEX_edit', {id: number, data: detail} );
});

// Update
app.post("/APEX/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  charactors[req.params.number].name = req.body.name;
  charactors[req.params.number].ability = req.body.ability;
  charactors[req.params.number].ability_ex = req.body.ability_ex;
  charactors[req.params.number].ult = req.body.ult;
  charactors[req.params.number].ult_ex = req.body.ult_ex;
  console.log( charactors );
  res.redirect('/APEX' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));