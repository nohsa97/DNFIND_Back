import { UserData } from "./params";
import dotenv from "dotenv";

import express from "express";
import axios from "axios";

const app = express();
var cors = require("cors");
const dot = dotenv.config();

app.use(cors());

//캐릭터 찾기
app.get("/findUser", function (req, res) {
  const { server } = req.query;
  const { characterName } = req.query;

  const apiKey: string | undefined = process.env.API_KEY;

  const BASEURL =
    `https://api.neople.co.kr/df/servers/${server}/characters?characterName=${characterName}&limit=28&wordType=full&apikey=` +
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

//유저 인포 (아이템)
app.get("/userInfo", function (req, res) {
  const { server } = req.query;
  const { characterId } = req.query;

  const apiKey: string | undefined = process.env.API_KEY;

  const BASEURL =
    `https://api.neople.co.kr/df/servers/${server}/characters/${characterId}/equip/equipment?apikey=` +
    apiKey;

  axios
    .get(BASEURL)
    .then((result) => {
      // const Data: UserData[] = result.data.rows;
      console.log(`송신 완료. ${server} ${characterId} `);
      console.log("전송");

      // console.log(result);
      res.send(result.data);
    })
    .catch((error) => {
      res.send("잘못된 접근입니다." + error);
      throw error;
    });
});

app.listen(5000, () => {
  console.log("포트 ㅓㅈㅂ속");
});
