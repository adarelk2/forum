export const declareViewEvents =
{
   header:()=>
   {
      let burger = document.getElementById("burger");
      let id_PM = document.getElementById("id_PM");
      let alertIco = document.getElementById("alert_ico");
      let settings = document.getElementById("id_Settings");
      let lightBoxBtn = document.getElementById("closeLightBox");
      if(burger)
      {
         burger.addEventListener("click",()=>
         {
            let nav = document.querySelector("nav");
            if(nav.style.display =="none"){nav.style.display ="block";}
            else{nav.style.display ="none";}
         });
      }
      if(id_PM)
      {
         id_PM.addEventListener("click",()=>
         {
            let LightBox = document.querySelector(".LightBox");
            LightBox.className = "LightBox d-flex align-items-center justify-content-center";
         });
      }
      if(alertIco)
      {
         alertIco.addEventListener("click",()=>
         {
            let LightBox = document.querySelector(".LightBox");
            LightBox.className = "LightBox d-flex align-items-center justify-content-center";
         });
      }
      if(settings)
      {
         settings.addEventListener("click",()=>
         {
            let LightBox = document.querySelector(".LightBox");
            LightBox.className = "LightBox d-flex align-items-center justify-content-center";
         });
      }
      if(lightBoxBtn)
      {
         lightBoxBtn.addEventListener("click",()=>
         {
            let LightBox = document.querySelector(".LightBox");
            LightBox.className = "LightBox d-none align-items-center justify-content-center";
            let LightBoxSubject = document.querySelector("#LightBoxSubject");
            LightBoxSubject.innerHTML ="";
         });
      }
   }

}