
const overlaying = ()=>{
    $('.product-content-all').css('opacity','0')
    $('.product-content-all').css('visibility','hidden')
    $('body').css('overflow-y','hidden')
    $('nav').css('opacity','0')
    $('nav').css('visibility','hidden')
    $('.overflow').css('opacity','1')
    $('.overflow').css('visibility','visible')
    $('.content-modal').css('opacity','1')
    $('.content-modal').css('visibility','visible')
    window.setTimeout(()=>{
        window.scrollTo(0, 0);
    },300)
}
const comeBack = ()=>{
    $('.product-content-all').css('opacity','1')
    $('.product-content-all').css('visibility','visible')

    $('nav').css('opacity','1')
    $('nav').css('visibility','visible')
    $('.overflow').css('opacity','0')
    $('.overflow').css('visibility','hidden')
    $('.content-modal').css('opacity','0')
    $('.content-modal').css('visibility','hidden')
    window.setTimeout(()=>{
        window.scrollTo(0, 0);
        $('body').css('overflow-y','scroll')
    },800)
    
}

// fungsi yang dijalankan jika product button di click
$('.button-product').on('click', overlaying);
$('.overflow').on('click',comeBack);
$('#exit').on('click',comeBack);