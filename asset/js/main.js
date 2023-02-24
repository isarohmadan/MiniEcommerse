const getLeftArrow = document.getElementById('slideLeft')
const getRightArrow = document.getElementById('slideRight')
getLeftArrow.addEventListener('click',()=>{
    document.getElementById('top-product-cards').scrollLeft -= 600;
})
getRightArrow.addEventListener('click',()=>{
    document.getElementById('top-product-cards').scrollLeft += 600;
})

const gambar = document.querySelector('#About_us .content .pict')

window.addEventListener('scroll',()=>{
    if (window.pageYOffset > 2300) {
        gambar.classList.add('colored');
        gambar.classList.remove('beforecolored');
    }else{
        gambar.classList.remove('colored');
        gambar.classList.add('beforecolored');
    }
})