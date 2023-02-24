let i;
let divs = document.querySelectorAll('.card-text'); 

for (let i = 0; i < divs.length; i++) {
    divs[i].innerHTML = divs[i].innerHTML.substring(0,40) + " ....";
}