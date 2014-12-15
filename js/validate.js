$(document).ready(function ()
    {
	$("#myForm .input_button").click(validate);
	
	function getCookie(name) { var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")); return matches ? decodeURIComponent(matches[1]) : undefined;} 
	
	function validate()
	    {
		var isValid = true;
		
		if ($(".name").val().length==0){
       $(".name").attr("placeholder", "*ааВаЕаДаИбаЕ аВаАбаЕ аИаМб");
       isValid = false;
   }  
   
   if ($(".email").val().length==0){
       $(".email").attr("placeholder", "*ааВаЕаДаИбаЕ аВаАб Email");
          isValid = false;
   }  
   if ($(".message").val().length==0){
       $(".message").attr("placeholder", "*ааВаЕаДаИбаЕ аВаАбаЕ баОаОаБбаЕаНаИаЕ");
          isValid = false;
   }  
		            
		if(isValid)
		    {
			fpath = $('#myForm .path').val();
			var msg   = $('#myForm').serialize();
			$.ajax({
			    type: 'POST',
			    url: fpath,
			    data: msg,
			    success: function(data) {
				$(".name").val('');
				$(".email").val('');
				$(".subject").val('');
				$(".message").val('');
			    },
			    error:  function(xhr, str){
				alert('ааОаЗаНаИаКаЛаА аОбаИаБаКаА: ' + xhr.responseCode);
			    }
			});
		    }
	    }
    }
)
