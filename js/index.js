document.getElementsByTagName("body")[0].style.backgroundSize=`
${document.getElementsByTagName("body")[0].offsetHeight
}px`
//WBIR=when body is loaded 

var database = firebase.database();
i=0
function WBIR(){

  var inp=document.getElementById("nameOfUser")

if(!localStorage.getItem("userName")){

  $('.ui.modal')
  .modal('show');
document.getElementById('sub').addEventListener("click",function(){

var errr=document.getElementById("error1")
if(inp.value===''){
errr.style.display="block"

setTimeout(()=>{errr.style.display='none'},1000)
}
else{

localStorage.setItem("userName",`${inp.value}`)
$('.ui.modal')
.modal('hide');
}

})  

}else{
 var id= new Date().getTime()
  document.getElementById("sendNow").addEventListener("click",function(){
  var inp2=document.getElementById("pagal");
    if(inp2.value !==''){
      localStorage.setItem("user_Message",inp2.value)
      localStorage.setItem("IdOfUser",id+"_"+localStorage.getItem("userName"))

  var rightmessages=document.getElementById("rightMessageContainer")
  rightmessages.innerHTML+=`<br> <div  class="rightMessage">
  <p  style="margin-bottom: 0;padding: 5px;" id='name' class="rP">${localStorage.getItem(`userName`)}</p>
  <p class="rightMessage rC rP" id="addValue">
  ${localStorage.getItem('user_Message')}    </p>
  </div>
  <br>`
  firebase.database().ref('/messages/').push({
  userMessage: localStorage.getItem("user_Message"),
  name: localStorage.getItem(`userName`),
  luserId:`${id}_${localStorage.getItem("userName")}`
  
  })
   

    }
  
  })}

}
WBIR()
