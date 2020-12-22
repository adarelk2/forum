import {doApi} from "../apiService/sevice.js";
import Rss from "../class/Rss.js";
import { declareViewEvents } from "../declareViewEvents.js";
window.onload =async()=>
{
   init();
}

const init = async()=>
{
   let header = await getHeader()
   .then(data=>
   {
      document.querySelector("header").innerHTML=data;
   });
   let getRss = await doApi("https://v1.nocodeapi.com/adarelk2/xml_to_json/fDVjiryMfvEuJYSO?url=https://rcs.mako.co.il/rss/12bce76404864110VgnVCM1000004801000aRCRD.xml")
   .then(data=>makeRss(data.rss.channel.item));
   let declareHeader = await declareViewEvents.header();
}

const makeRss =(_ar)=>
{
   let rows = 3;
   let boxInRow = 5;
    _ar.splice(rows*boxInRow,_ar.length);
   document.getElementById("id_NewsTopic").innerHTML = "";
   _ar.map(item=>
   {
      let rss  = new Rss("#id_NewsTopic",item)
      rss.render();
   })
}