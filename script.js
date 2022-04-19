let addBtn = document.querySelector(".add-btn");

let modalCont = document.querySelector(".modal-cont");// Text input

let mainCont = document.querySelector('.main-cont');// Ticket

let colors = ['lightpink' , 'lightblue' , 'lightgreen' , 'black']

let modalPriorityColor = colors[colors.length-1] // black

let allPriorityColors = document.querySelectorAll('.priority-color')//This will return us a nodeList

let flag = true;

let taskAreaCont = document.querySelector('.textarea-cont')

let removeBtn = document.querySelector('.remove-btn')
let removeFlag = false;


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
              createTicket(modalPriorityColor , taskAreaCont.value ) // this function will generate the ticket
              modalCont.style.display = 'none'
              flag = false;
              taskAreaCont.value = '';
       }
})



function createTicket(ticketKaColorClass  , task) {
       let ticketCont = document.createElement('div')
       ticketCont.setAttribute('class', 'ticket-cont')

       ticketCont.innerHTML = `   

       <div class="ticketcolor ${ticketKaColorClass}"></div>
       <div class="ticket-id">${'#sample id'}</div>
       <div class="task-area">${task}</div>
       <div class="ticket-lock">
           <i class="fa-solid fa-lock"></i>
       </div>
  `
       mainCont.appendChild(ticketCont)
       handleRemoval(ticketCont)

}


//Changing Priority Colors

allPriorityColors.forEach(function(colorElem){

       colorElem.addEventListener('click' , function(e){

            allPriorityColors.forEach(function(priorityColorElem){
               priorityColorElem.classList.remove('active')

            })

            colorElem.classList.add('active')

            modalPriorityColor = colorElem.classList[0];//Classlist is also a nodelist
            
       })
})

removeBtn.addEventListener('click' , function(){

       removeFlag = !removeFlag

       if(removeFlag==true){
         removeBtn.style.color = 'red';
       }
       else{
          removeBtn.style.color = 'white'
       }

})

function handleRemoval(ticket){
       ticket.addEventListener('click' , function(){
         if(removeFlag==true){
           ticket.remove()
         }
       })
}
     