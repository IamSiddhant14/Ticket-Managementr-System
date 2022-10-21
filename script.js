let addBtn = document.querySelector(".add-btn");

let modalCont = document.querySelector(".modal-cont");// Text input

let mainCont = document.querySelector('.main-cont');// Ticket

let colors = ['lightpink' , 'lightblue' , 'lightgreen' , 'black']

let modalPriorityColor = colors[colors.length-1] // black

let allPriorityColors = document.querySelectorAll('.priority-color')//This will return us a nodeList

let flag = true;

let taskAreaCont = document.querySelector('.textarea-cont')

let removeBtn = document.querySelector('.remove-btn')

let toolBoxColors = document.querySelectorAll('.color')
// console.log(toolBoxColors)

let removeFlag = false;

let ticketsArr = []

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

if(localStorage.getItem('tickets')){
  ticketsArr = JSON.parse(localStorage.getItem('tickets'))
  ticketsArr.forEach(function(ticket){
    createTicket(ticket.ticketColor , ticket.ticketTask , ticket.ticketID)
  })
}

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
              createTicket(modalPriorityColor, taskAreaCont.value); // this function will generate the ticket
              modalCont.style.display = 'none'
              flag = false;
              taskAreaCont.value = '';
       }
})



function createTicket(ticketColor, ticketTask , ticketID) {

       let id = ticketID || shortid()
       let ticketCont = document.createElement('div')
       ticketCont.setAttribute('class', 'ticket-cont')

       ticketCont.innerHTML = `   

       <div class="ticketcolor ${ticketColor}"></div>
       <div class="ticket-id">ID: ${id}</div>
       <div class="task-area">${ticketTask}</div>
       <div class="ticket-lock">
           <i class="fa-solid fa-lock"></i>
       </div>
  `
       mainCont.appendChild(ticketCont)
       handleRemoval(ticketCont , id);
       handleLock(ticketCont , id);
       handleColor(ticketCont , id);

       if(!ticketID){
        ticketsArr.push({ticketColor , ticketTask , ticketID:id})
        localStorage.setItem('tickets' , JSON.stringify(ticketsArr) )
       }
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

function handleRemoval(ticket , id){
       ticket.addEventListener('click' , function(){

        if (!removeFlag) return

        let idx = getTicketIdx(id) // idx
    
        // localStorgae removal of ticket
    
        ticketsArr.splice(idx , 1)
    
        let strTicketArray = JSON.stringify(ticketsArr)
    
        localStorage.setItem('tickets' , strTicketArray)
    
        ticket.remove();

       })
}
     
function handleLock(ticket , id) {

  let ticketLockElem = ticket.querySelector(".ticket-lock");//All the childer inside this class comes in the form of a nodelist
//   console.log(ticketLockElem)

  let ticketLock = ticketLockElem.children[0];
//   console.log(ticketLock)
  let ticketTaskArea = ticket.querySelector('.task-area')

  ticketLock.addEventListener("click", function (e) {
    if (ticketLock.classList.contains(lockClass)) {
      ticketLock.classList.remove(lockClass);
      ticketLock.classList.add(unlockClass);
      ticketTaskArea.setAttribute('contenteditable' , 'true')

    } else {
      ticketLock.classList.remove(unlockClass);
      ticketLock.classList.add(lockClass);
      ticketTaskArea.setAttribute('contenteditable' , 'false')
    }

    let ticketIdx = getTicketIdx(id)
    ticketsArr[ticketIdx].ticketTask = ticketTaskArea.innerText
    localStorage.setItem('tickets' , JSON.stringify(ticketsArr))

  });
}


function handleColor(ticket , id){

  let ticketColorBand = ticket.querySelector('.ticketcolor')

  ticketColorBand.addEventListener('click' , function(e){
        let currentTicketColor = ticketColorBand.classList[1]

        let currentTicketColoridx = colors.findIndex(function(color){
          return currentTicketColor === color
        })

        currentTicketColoridx++

        let newTicketColorIdx = currentTicketColoridx%colors.length
        let newTicketColor = colors[newTicketColorIdx]

        ticketColorBand.classList.remove(currentTicketColor)
        ticketColorBand.classList.add(newTicketColor)

        let ticketIdx = getTicketIdx(id)

        ticketsArr[ticketIdx].ticketColor = newTicketColor
        localStorage.setItem('tickets' , JSON.stringify(ticketsArr))

            // modify with new color

    ticketsArr[ticketIdx].ticketColor = newTicketColor
    localStorage.setItem('tickets' , JSON.stringify(ticketsArr))


  })
}

//Filter tickets with respect to colors

for(let i=0 ; i<toolBoxColors.length ; i++){

  toolBoxColors[i].addEventListener('click' , function(e){
    let currentToolBoxColor =  toolBoxColors[i].classList[0]
    // console.log(currentToolBoxColor)


    let filteredTickets = ticketsArr.filter(function(ticketObj){
      return currentToolBoxColor === ticketObj.ticketColor
    })

    // remove previous Tickets
     let allTickets = document.querySelectorAll(".ticket-cont")

     for(let i=0 ; i<allTickets.length ; i++){
        allTickets[i].remove()
     }
       // filtered tickets Di
     filteredTickets.forEach(function(filteredObj){
             createTicket(filteredObj.ticketColor , filteredObj.ticketTask , filteredObj.ticketID)
     })

  })

  toolBoxColors[i].addEventListener('dblclick' , function(e){
    let allTickets = document.querySelectorAll(".ticket-cont");

    for (let i = 0; i < allTickets.length; i++) {
      allTickets[i].remove();
    }

    ticketsArr.forEach(function(ticketObj){

      createTicket(ticketObj.ticketColor , ticketObj.ticketTask , ticketObj.ticketID)

    })
  })
}

function getTicketIdx(id){
  
  let ticketIdx = ticketsArr.findIndex(function(ticketObj){
          return ticketObj.ticketID === id
  }) 

  return ticketIdx
}

