window.onload =async()=>
{
   let header = getHeader().then(data=>{
      document.querySelector("header").innerHTML=data;
   });
}