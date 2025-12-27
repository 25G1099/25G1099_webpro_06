"use strict";

const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


let titles = [
  {id: 1, name: "デモンズソウル", series: "ソウルシリーズ", release: "2010", score: "90"},
  {id: 2, name: "ダークソウル", series: "ソウルシリーズ", release: "2011", score: "85"},
  {id: 3, name: "ダークソウル2", series: "ソウルシリーズ", release: "2014", score: "92"},
  {id: 4, name: "ダークソウル3", series: "ソウルシリーズ", release: "2016", score: "89"},
  {id: 5, name: "ブラッドボーン", series: "ソウルシリーズ", release: "2015", score: "92"},
  {id: 6, name: "SEKIRO", series: "ソウルシリーズ", release: "2019", score: "90"},
  {id: 7, name: "エルデンリング", series: "ソウルシリーズ", release: "2022", score: "96"},
  {id: 8, name: "エルデンリング・ナイトレイン", series: "ソウルシリーズ", release: "2025", score: "77"},
  {id: 9, name: "アーマード・コア", series: "ACシリーズ", release: "1997", score: "80"},
  {id: 10, name: "アーマード・コア マスターオブアリーナ", series: "ACシリーズ", release: "1999", score: "76"},
  {id: 11, name: "アーマード・コア2", series: "ACシリーズ", release: "2000", score: "78"},
  {id: 12, name: "アーマード・コア アナザーエイジ", series: "ACシリーズ", release: "2001", score: "76"},
  {id: 13, name: "アーマード・コア3", series: "ACシリーズ", release: "2002", score: "85"},
  {id: 14, name: "アーマード・コア3 サイレントライン", series: "ACシリーズ", release: "2003", score: "78"},
  {id: 15, name: "アーマード・コア モバイルミッション", series: "ACシリーズ", release: "2004", score: "65"},
  {id: 16, name: "アーマード・コア4", series: "ACシリーズ", release: "2006", score: "82"},
  {id: 17, name: "アーマード・コア フォーアンサー", series: "ACシリーズ", release: "2008", score: "79"},
  {id: 18, name: "アーマード・コア5", series: "ACシリーズ", release: "2012", score: "82"},
  {id: 19, name: "アーマード・コア 6", series: "ACシリーズ", release: "2023", score: "86"},

]

//一覧
app.get("/fromsoftware",(req,res) => {
  res.render('fromsoftware',{data: titles})
});

// Create
app.get("/fromsoftware/create", (req, res) => {
  res.redirect('/public/fromsoftware_new.html');
});

// Read
app.get("/fromsoftware/:number", (req, res) => {
  const number = req.params.number;
  const detail = titles[ number ];
  res.render('fromsoftware_detail', {id: number, data: detail} );
});

// Delete
app.get("/fromsoftware/deletecf/:number", (req, res) => {
  const number = req.params.number
  const detail = titles[ number ];
  res. render('fromsoftware_deletecf',{id: number, data: detail});
});

app.get("/fromsoftware/delete/:number", (req, res) => {

  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  titles.splice( req.params.number, 1 );
  res.redirect('/fromsoftware' );
});

// Create
app.post("/fromsoftware", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = titles.length + 1;
  const name = req.body.name;
  const series = req.body.series;
  const release = req.body.release;
  const score = req.body.score;
  titles.push( { id: id, name: name, series: series, release: release, score: score} );
  console.log( titles );
  res.render('fromsoftware', {data: titles} );
});

// Edit
app.get("/fromsoftware/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = titles[ number ];
  res.render('fromsoftware_edit', {id: number, data: detail} );
});

// Update
app.post("/fromsoftware/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  titles[req.params.number].name = req.body.name;
  titles[req.params.number].series = req.body.series;
  titles[req.params.number].release = req.body.release;
  titles[req.params.number].score = req.body.score;
  console.log( titles );
  res.redirect('/fromsoftware' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));