var square = document.querySelector('.square');

var pressTimer = 500;

square.addEventListener("mouseup", () => {
    
    clearTimeout(pressTimer);

})

square.addEventListener("mousedown", (e) => {

    if(e.which == 1) {
    
        pressTimer = window.setTimeout(() => {
        e.target.classList.toggle('expand');
        
        },500);
    }
})