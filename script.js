let addBtn = document.querySelector('.add-btn')
let flag = true;

addBtn.addEventListener('click' , function(e){
       // Display a Modal
       let addcard = document.querySelector('.modal-cont')
       if( flag ){
              addcard.style.display = "flex"
              flag = false;
       }else{
              addcard.style.display = "none"
              flag = true;
       }


       // Add a Card



})