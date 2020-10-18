document.getElementsByTagName("body")[0].style.backgroundSize=`
${document.getElementsByTagName("body")[0].offsetHeight
}px`
//WBIR=when body is loaded 

var database = firebase.database();
function WBIR(){

if(!localStorage.getItem("userName")){

  $('.ui.modal')
  .modal('show');
document.getElementById('sub').addEventListener("click",function(){

var inp=document.getElementById("nameOfUser")
var errr=document.getElementById("error1")
if(inp.value===''){
errr.style.display="block"


}
else{

localStorage.setItem("userName",`${inp.value}`)
$('.ui.modal')
.modal('hide');
}

})  

}else{
  
  document.getElementById("sendNow").addEventListener("click",function(){
  var inp2=document.getElementById("pagal");
    if(inp2.value !==''){
  var rightmessages=document.getElementById("rightMessageContainer")
  rightmessages.innerHTML+=`<br> <div  class="rightMessage">
  <p  style="margin-bottom: 0;padding: 5px;" class="rP"></p>
  <p class="rightMessage rC rP" id="addValue">
  
  </p>
  </div>`
  document.getElementById("addValue").innerText=`${inp2.value}`
    }
  
  })}

}
WBIR()
document.getElementById("sendNow").addEventListener("click",function(){

WBIR()



})
