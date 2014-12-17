$(document).ready(function ()
    {
	$("#send").click(validate);
	
	function getCookie(name) { var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")); return matches ? decodeURIComponent(matches[1]) : undefined;} 
	
	function validate()
	    {
		var isValid = true;
		
		if ($(".form-name").val().length==0){
       $(".form-name").attr("placeholder", "*ааВаЕаДаИбаЕ аВаАбаЕ аИаМб");
       isValid = false;
   }  
   
   if ($(".form-email").val().length==0){
       $(".form-email").attr("placeholder", "*ааВаЕаДаИбаЕ аВаАб Email");
          isValid = false;
   }  
   if ($(".form-textarea").val().length==0){
       $(".form-textarea").attr("placeholder", "*ааВаЕаДаИбаЕ аВаАбаЕ баОаОаБбаЕаНаИаЕ");
          isValid = false;
   }  
		            
		if(isValid)
		    {
			fpath = $('.form .path').val();
			var msg   = $('.form').serialize();
			$.ajax({
			    type: 'POST',
			    url: fpath,
			    data: msg,
			    success: function(data) {
				$(".form-name").val('');
				$(".form-email").val('');
				$(".subject").val('');
				$(".form-textarea").val('');
			    },
			    error:  function(xhr, str){
				alert('ааОаЗаНаИаКаЛаА аОбаИаБаКаА: ' + xhr.responseCode);
			    }
			});
		    }
	    }
    }
)
