$(document).ready(function(){

  $(window).scroll(function() {
  var top = $(document).scrollTop();
  if (top > 0) {
                $('.floating').addClass('fixed');               
            } 
  else {
    $('.floating').removeClass('fixed'); 
  }
 });

var lastId,
    
    topMenu = $("#menu"),
    topMenuHeight = topMenu.outerHeight()-200,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

   $('.menu-item-link').click( function(){ 
      var scroll_el = $(this).attr('href'); 
        if ($(scroll_el).length != 0) { 
      $('html, body').stop().animate({ scrollTop: $(scroll_el).offset().top }, 750);
        }
      return false; 
    });

$(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   } 
                   
}); 



$('.submit').click(function(){
    validateForm();   
});

function validateForm(){


    var nameReg = /^[A-Za-z]+$/;
    var numberReg =  /^[0-9]+$/;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    var names = $('#nameInput').val();
    var company = $('#companyInput').val();
    var email = $('#emailInput').val();
    var telephone = $('#telInput').val();
    var message = $('#messageInput').val();

    var inputVal = new Array(names, company, email, telephone, message);

    var inputMessage = new Array("name", "company", "email address", "telephone number", "message");

     $('.error').hide();

        if(inputVal[0] == ""){
            $('#nameInput').after('<span class="error"> Please enter your ' + inputMessage[0] + '</span>').addClass('err-border');

        } 
        else if(!nameReg.test(names)){
            $('#nameInput').after('<span class="error"> Letters only</span>');
        }

        if(inputVal[1] == ""){
            $('#companyLabel').after('<span class="error"> Please enter your ' + inputMessage[1] + '</span>');
        }

        if(inputVal[2] == ""){
            $('#emailInput').after('<span class="error"> Please enter your ' + inputMessage[2] + '</span>').addClass('err-border');
        } 
        else if(!emailReg.test(email)){
            $('#emailInput').after('<span class="error"> Please enter a valid email address</span>');
        }

        if(inputVal[3] == ""){
            $('#telephoneLabel').after('<span class="error"> Please enter your ' + inputMessage[3] + '</span>');
        } 
        else if(!numberReg.test(telephone)){
            $('#telephoneLabel').after('<span class="error"> Numbers only</span>');
        }

        if(inputVal[4] == ""){
            $('#messageInput').after('<span class="error"> Please enter your ' + inputMessage[4] + '</span>').addClass('err-border');
        }       
}  

  function ajaxSend(userfrom, emailfrom, message){    
        DisableFields();
        $this.find('.form-btn').empty().append('<div class="loading">Отправка сообщения...</div>');
        var url = '../php/sendmail.php';
        $.ajax({
          url: url,
          type: "POST",
          data: {userfrom: userfrom, emailfrom: emailfrom, message: message},
          dataType: "text",
          success: function(ret) {
            EnableFields();
            $('#send').removeClass('loadinicon').addClass('sendicon');
            if(ret==''){        
              $this.empty().append('<div class="pushmessage"><p>Спасибо,</p><p>Ваше сообщение успешно отправлено!</p></div>');
            } else {
              $this.empty().append('<div class="pushmessage">'+ret+'</div>');
            }
          },
          error: function(xhr, ajaxOptions, thrownError) { jAlert('Ошибка запроса', 'Ошибка', 'Продолжить'); }
        });
        EnableFields();
        $this.empty().append('<div class="pushmessage"><p>Спасибо,</p><p>Ваше сообщение успешно отправлено!</p></div>');
        
      }
      $('#send').bind('click', function(){
        ajaxSend($this.find('[name=name]').val(),$this.find('[name=email]').val(),$this.find('[name=message]').val());
      });


 $('.menu-btn').click(function(){
    $('#menu').slideToggle('slow', function() {
      $('.menu-item-link').click(function(){
      $('#menu').slideUp('fast');
   });
 });

 });

});