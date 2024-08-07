// import { UserData, UserDataSet } from "./params";

const express = require("express");
const axios = require("axios");

const app = express();
var cors = require("cors");

app.use(cors());

app.get("/findUser", function (req, res) {
  const test = req.query;
  const { server } = req.query;
  const { characterName } = req.query;
  const apiKey = process.env.API_KEY;

  const BASEURL =
    `https://api.neople.co.kr/df/servers/${server}/characters?characterName=${characterName}&wordType=full&apikey=` +
    apiKey;

  axios.get(BASEURL).then((result) => {
    console.log(result.data.rows);
  });
  console.log(server);
  console.log(characterName);
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("포트 ㅓㅈㅂ속");
});
