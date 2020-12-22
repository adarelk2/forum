const getHeader = async()=>
{
let resp =await fetch("template/header.html");
let data = await resp.text();
return data;
}
