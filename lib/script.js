
/*$(function() {
    $('#id_popup_booking').click(function(e) {
        $('.open-box').toggleClass('active');
        $('#id_popup_booking').toggleClass('active');
        e.preventDefault();
        e.stopPropagation();
    });
});*/
$('#id_popup_booking').click(function() {
    $('.open-box').slideDown(90);
    return false;
});
$('.close-popup').click(function(){
    //$(this).closest('.popup').fadeOut("slow");
    //$('.popup-wrapper').fadeOut("slow");

    $(this).closest('.popup').fadeOut("slow");
    $(this).closest('.popup-wrapper').fadeOut("slow");
    
    return false;
});
$('#popup-success').click(function(){
    $('.popup-wrapper').fadeIn("slow");
    $('.popup-success').fadeIn("slow");
    return false;
});
$('#popup-payment').click(function(){
    $('.popup-wrapper').fadeIn("slow");
    $('.popup-payment').fadeIn("slow");
    return false;
});
$('#popup-timezone').click(function(){
    $('.popup-wrapper').fadeIn("slow");
    $('.popup-timezone').fadeIn("slow");
    return false;
});
$('#popup-terms').click(function(){
    $('.popup-wrapper').fadeIn("slow");
    $('.popup-terms').fadeIn("slow");
    return false;
});
$(document).click(function(event){
    if( $(event.target).closest(".open-box").length ) 
    return;
    //1 $(".open-box").slideUp(90);
    $(".open-box").fadeOut("slow");
    event.stopPropagation();
});