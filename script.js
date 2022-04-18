let addBtn = document.querySelector(".add-btn");

let modalCont = document.querySelector(".modal-cont");

let mainCont = document.querySelector('.main-cont');

let colors = ['lightpink' , 'lightblue' , 'lightgreen' , 'black']

let modalPriorityColor = colors[colors.length-1] // black

let allPriorityColors = document.querySelectorAll('.priority-color')

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
              createTicket(modalPriorityColor) // this function will generate the ticket
              modalCont.style.display = 'none'
       }
})



function createTicket(ticketKaColorClass) {
       let ticketCont = document.createElement('div')
       ticketCont.setAttribute('class', 'ticket-cont')

       ticketCont.innerHTML = `   
       <div class="ticketcolor ${ticketKaColorClass}"></div>
       <div class="ticket-id"></div>
       <div class="task-area"></div>
  `

       mainCont.appendChild(ticketCont)


}


//Changing Priority Colors

allPriorityColors.forEach(function(colorElem){
       colorElem.addEventListener('click' , function(e){
            allPriorityColors.forEach(function(priorityColorElem){
               priorityColorElem.classList.remove('active')
            })
            colorElem.classList.add('active')

            modalPriorityColor = colorElem.classList[0];
       })
     })
     