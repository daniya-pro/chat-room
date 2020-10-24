function checkingNameInLocalStorage() {
      if (!localStorage.getItem("NameOfUser")) {

            $('.ui.name.modal').modal({
                  closable: false
            }).modal('show')

      } else {

            $('.ui.name.modal').modal('hide')

      }
}
a = false

function getMessages() {

      var inp2 = document.getElementById('messageInp')

      if (!a) {

            firebase.database().ref('/userData/').on("child_added", function (valuesOfUserData) {
                  a = true

                  console.log('not val', valuesOfUserData.key, 'val==', valuesOfUserData.val())

                  var chatBox = document.getElementById("chatBox")
                  if (localStorage.getItem('IdOfUser') !== valuesOfUserData.val().userId) {
                        chatBox.innerHTML += `<div id='${valuesOfUserData.key}'> <br> <div id="leftMessageContainer">
            
            
            <div  class="leftMessage">
      <p id='Lname' class="LP">${valuesOfUserData.val().userName}</p>
      <span class="leftMessage lC lP" id="rl${valuesOfUserData.key}" >
      <span id="MessageValueSp">
      ${valuesOfUserData.val().userMessage?.replace(/(<([^>]+)>)/ig, "")}    </span></span>
      </div</div><br>
      </div>
       `
                  } else {


                        chatBox.innerHTML += `<div id='${valuesOfUserData.key}'><br>  <div id="rightMessageContainer">
            
            
            <div  class="rightMessage">
      <p  style="margin-bottom: 0;padding: 5px;" id='Rname' class="rP">${localStorage.getItem("NameOfUser")}</p>
      <span class="rightMessage rC rP" id="rl${valuesOfUserData.key}">    
        <span id="MessageValueSp">
      ${valuesOfUserData.val().userMessage?.replace(/(<([^>]+)>)/ig, "")}    </span></span>
      
      <button  class='ui inverted blue button' onclick="updated('${valuesOfUserData.key}')">update</button> 
      <button   class='ui inverted red button' onclick="deleted('${valuesOfUserData.key}')">delete</button> 
      </div</div>
      <br> </div>
      
`
                  }


                  scrollchatbox()

                  //scrollchatbox()


            });





      }
}
checkingNameInLocalStorage()


document.getElementById('sub').addEventListener('click', submitName)


getMessages()


function submitName() {

      var inp = document.getElementById("nameOfUser")



      if (inp.value.trim() === '') {

            document.getElementById('error1').style.display = 'block'


            setTimeout(function () { document.getElementById("error1").display = "none" }, 3000)



      } else {
            localStorage.setItem('NameOfUser', inp.value)
            var id = new Date().getTime() + "_" + localStorage.getItem(`NameOfUser`)

            localStorage.setItem('IdOfUser', id)

            $('.ui.name.modal').modal('hide')
            getMessages()
            location.reload()


      }
}


document.getElementById('sendNow').addEventListener('click', sendMessages)

function sendMessages() {

      var inp2 = document.getElementById('messageInp')
      if (inp2.value !== '') {

            firebase.database().ref('/userData/').push({

                  userId: localStorage.getItem('IdOfUser'),
                  userName: localStorage.getItem("NameOfUser"),
                  userMessage: inp2.value
            })
            var chatBox = document.getElementById("chatBox")

      }

}

function scrollchatbox() {
      var y = document.getElementById("chatBox").scrollHeight;
      console.log(`ScrollTo: ${y} `)
      document.getElementById("chatBox").scrollTo(0, y)

}

function deleted(idofmess) {


      var adaRef = firebase.database().ref(`userData/${idofmess}`);
      adaRef.remove()
            .then(function () {
                  console.log("Remove succeeded.", idofmess)
            })
            .catch(function (error) {
                  console.log("Remove failed: " + error.message)
            });


}
firebase.database().ref('/userData/').on('child_removed', function (data) {
      var keyOfData = data.key
      console.log(keyOfData)
      document.getElementById(`${keyOfData}`).remove()


});

function updated(idofmess) {
      var messageAfterUpdate = document.getElementById('messageAfterUpdate')
      messageAfterUpdate.value = document.getElementById(`MessageValueSp`).innerText
      console.log(document.getElementById(`${idofmess}`).innerText)
      $('.ui.updateTheMessage.modal').modal({
            closable: false
      }).modal('show')



      document.getElementById('updatingMessage').addEventListener('click', function () {
            if (messageAfterUpdate.value.trim() === '') {

                  document.getElementById('error2').style.display = 'block'

            } else {
                  firebase.database().ref(`/userData/${idofmess}`).update({ userMessage: messageAfterUpdate.value })


                  $('.ui.updateTheMessage.modal').modal('hide')
            }



      })
}

firebase.database().ref(`/userData/`).on('child_changed', function (data) {

      document.getElementById(`rl${data.key}`).innerHTML = `${data.val().userMessage?.replace(/(<([^>]+)>)/ig, "")}`

      console.log(data.val())
});