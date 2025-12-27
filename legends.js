"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let charactors = [
  {id: 1, name: "超サイヤ人孫悟空", coller: "RED", type: "打撃タイプ"},
  {id: 2, name: "ベジータ", coller: "PUR", type: "射撃タイプ"},
  {id: 3, name: "超一星龍", coller: "RED", type: "防御タイプ"},
  {id: 4, name: "超ゴジータ", coller: "BLE", type: "打撃タイプ"},
  {id: 5, name: "ヒット", coller: "RED", type: "打撃タイプ"},
  {id: 6, name: "超サイヤ人ゴッドSSベジット", coller: "RED", type: "打撃タイプ"},
  {id: 7, name: "身勝手の極意”兆”", coller: "YEL", type: "射撃タイプ"},
  {id: 8, name: "超サイヤ人2孫悟飯:少年期", coller: "GRN", type: "射撃タイプ"},
  {id: 9, name: "超サイヤ人4ゴジータ", coller: "PUR", type: "打撃タイプ"},
  {id: 10, name: "ビースト孫悟飯", coller: "YEL", type: "打撃タイプ"},
  {id: 11, name: "パーフェクトセル", coller: "RED", type: "射撃タイプ"},
  {id: 12, name: "超サイヤ人孫悟空", coller: "YEL", type: "打撃タイプ"},
  {id: 13, name: "最終形態フリーザ:フルパワー", coller: "GLN", type: "射撃タイプ"},
  
]

//一覧
app.get("/legends",(req,res) => {
  res.render('legends',{data: charactors})
});

// Create
app.get("/legends/create", (req, res) => {
  res.redirect('/public/legends_new.html');
});

// Read
app.get("/legends/:number", (req, res) => {
  const number = req.params.number;
  const detail = charactors[ number ];
  res.render('legends_detail', {id: number, data: detail} );
});

// Delete
app.get("/legends/deletecf/:number", (req, res) => {
  const number = req.params.number
  const detail = charactors[ number ];
  res. render('legends_deletecf',{id: number, data: detail});
});

app.get("/legends/delete/:number", (req, res) => {
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  charactors.splice( req.params.number, 1 );
  res.redirect('/legends' );
});

// Create
app.post("/legends", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = charactors.length + 1;
  const name = req.body.name;
  const coller = req.body.coller;
  const type = req.body.type;
  charactors.push( { id: id, name: name, coller: coller, type: type } );
  console.log( charactors );
  res.render('legends', {data: charactors} );
});

// Edit
app.get("/legends/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = charactors[ number ];
  res.render('legends_edit', {id: number, data: detail} );
});

// Update
app.post("/legends/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  charactors[req.params.number].name = req.body.name;
  charactors[req.params.number].coller = req.body.coller;
  charactors[req.params.number].type = req.body.type;
  console.log( charactors );
  res.redirect('/legends' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));