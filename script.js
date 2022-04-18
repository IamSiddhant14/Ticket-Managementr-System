let addBtn = document.querySelector(".add-btn");

let modalCont = document.querySelector(".modal-cont");

let mainCont = document.querySelector('.main-cont')

let flag = true;

addBtn.addEventListener("click", function (e) {
       //Display the Modal

       if( flag ){
              modalCont.style.display = "flex"
              flag = false;
       }else{
              modalCont.style.display = "none"
              flag = true;
       }

});



// Generating a Ticket

modalCont.addEventListener('keydown', function (e) {
       let key = e.key

       if (key == 'Shift') {
              createTicket() // this function will generate the ticket
              modalCont.style.display = 'none'
       }
})



function createTicket() {
       let ticketCont = document.createElement('div')
       ticketCont.setAttribute('class', 'ticket-cont')

       ticketCont.innerHTML = `   
       <div class="ticketcolor"></div>
       <div class="ticket-id"></div>
       <div class="task-area"></div>
  `

       mainCont.appendChild(ticketCont)


}
