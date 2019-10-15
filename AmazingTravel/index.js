

// Slide-show -------------------------------------------------------------------------
let index = 0;
carousel();

function carousel()
{
    let mySlides = document.getElementsByClassName("mySlides");

    for (let i = 0; i < mySlides.length; i++) {
        mySlides[i].style.display = "none";
    }
    index++;
    
    if(index > mySlides.length)
    {
        index = 1;
    }
    mySlides[index - 1].style.display = "block";
    setTimeout(carousel, 3000);
};


//Login------------------------------------------------------------------------------
var modal = document.getElementById('id01');
modal.style.display = "none";
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//content pushing------------------------------------------------------------------------

/*
const navbarToggle = document.querySelector('.navbar-toggle');
navbarToggle.addEventListener('onclick', toggleFunction);

toggleFunction(){
    document.querySelector("#pushContent").slideToggle();
}*/
