document.getElementsByTagName("body")[0].style.backgroundSize=`
${document.getElementsByTagName("body")[0].offsetHeight
}px`
//ACSB=after clicking send button
var database = firebase.database();

function ACSB(){
    return firebase.database().ref('/users/on/njj').once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        alert(username)
        // ...
      }).catch((e)=>{console.log(e)});
    

}


document.getElementById("send").addEventListener("click",ACSB)