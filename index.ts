import { UserData } from "./params";
import dotenv from "dotenv";

import express from "express";
import axios from "axios";

const app = express();
var cors = require("cors");
const dot = dotenv.config();

app.use(cors());

app.get("/findUser", function (req, res) {
  const test = req.query;
  const { server } = req.query;
  const { characterName } = req.query;

  const apiKey: string | undefined = process.env.API_KEY;

  const BASEURL =
    `https://api.neople.co.kr/df/servers/${server}/characters?characterName=${characterName}&wordType=full&apikey=` +
    apiKey;

  axios
    .get(BASEURL)
    .then((result) => {
      const Data: UserData[] = result.data.rows;
      console.log(`송신 완료. ${server} ${characterName} `);
      console.log("전송");
      res.send(Data);
    })
    .catch((error) => {
      res.send("잘못된 접근입니다." + error);
      throw error;
    });
});

app.listen(5000, () => {
  console.log("포트 ㅓㅈㅂ속");
});
