class Rss
{
   constructor(_parent,{title,description,image139X80,link})
   {
      const NumberOfLyrics = 13;
      this.parent = _parent;
      this.title = title;
      this.description = description;
      let shortLyrcisAr = this.description.split(" ").splice(0,NumberOfLyrics);
      this.shortLyrcis = shortLyrcisAr.filter(item=>{
         return (!item.includes("<"))?true:false;
      });
      this.image = image139X80;
      this.link = link;
   }
   render()
   {
      const minLength = 10;
      if(this.shortLyrcis.length >=minLength)
      {
         this.shortLyrcis.push(" - קרא עוד")
         let newDiv = document.createElement("div");
         newDiv.className = "col-12 mb-3";
         newDiv.innerHTML = `<a href='${this.link}' target='_blank'><img src=${this.image} class='w-100'></a>
         <span class="text-center font-weight-bold d-block w-100">${this.shortLyrcis.join(" ")}</span>
         `;
         document.querySelector(this.parent).append(newDiv);
         document.querySelector(this.parent).className = "col-12  m-auto text-center gridForFive";
      }
   }
}
export default Rss;
