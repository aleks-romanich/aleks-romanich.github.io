(function( $ ) {
	  $.fn.feedback = function(options) {
			var settings = $.extend( {
			  'theme'			: '',			
			  'minname'         : 4,
			  'minmessage' 		: 5,
			  'sender'			: 'php/sendmail.php'
			}, options);
			var $this = this;  
			var fields = 	{
							'name': 	function check_name(){
											var err = '';
											var s = $this.find('[name=name]').val();
											if(s.length == 0){
												err += error('Для отправки сообщения необходимо ввести имя');
											} else if (s.length < settings.minname) {
												err += error('Длина введенного имени не должна быть меньше '+settings.minname);
											}
											return err;
										},
							'email': 	function check_email(){
											var err = '';
											var s = $this.find('[name=email]').val();
											if(s.length == 0){
												err += error('Для отправки сообщения необходимо ввести почту, чтобы мы могли Вам ответить');
											} else {
												var r = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
												if (!r.test(s)) {
													err += error('Вы некорректно ввели Вашу почту, исправьте, пожалуйста');											
												}

											}
											
											return err;
										},
							'message': 	function check_message(){
											var err = '';
											var s = $this.find('[name=message]').val();
											if(s.length == 0){
												err += error('Для отправки необходимо ввести сообщение');
											} else if (s.length < settings.minmessage) {
												err += error('Длина введенного сообщения должна быть больше '+settings.minmessage);
											}
											return err;
										}
				
						};
			this.find('#jdisabled').remove();
			this.find('#jenable').removeClass('turnoff');
			if(settings.theme!='' && settings.theme!='classic'){
				this.find('.field-container').addClass(settings.theme+'Border');
				this.find('.field-name').addClass(settings.theme+'Field');
				this.find('.message-container').addClass(settings.theme+'TextAreaBorder');
				this.find('.textarea-name').addClass(settings.theme+'TextArea');
				this.find('#send').addClass(settings.theme+'Btn');
			} else {
				this.find('.field-container').removeClass(settings.theme+'Border');
				this.find('.field-name').removeClass(settings.theme+'Field');
				this.find('.message-container').removeClass(settings.theme+'TextAreaBorder');
				this.find('.textarea-name').removeClass(settings.theme+'TextArea');
				this.find('#send').removeClass(settings.theme+'Btn');
			}
			this.keypress(function(event){
				if (event.which == 13) {
					send();
				};
			});	
			this.find('#send').bind('click', function(){
			  send();
			});	
			this.find('.checkfield').each(function(){
				$(this).bind('change', function(){
					CheckSingleField($(this).attr('name'));
				});
			});	
			function send(){	
				EnableFields();
				if (CheckAllFields()){			
					ajaxSend($this.find('[name=name]').val(),$this.find('[name=email]').val(),$this.find('[name=message]').val());
				}
			}
			function ajaxSend(userfrom, emailfrom, message){		
				DisableFields();
				$this.find('.buttons').empty().append('<div class="loading">Отправка сообщения...</div>');
				var url = settings.sender;
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
			function CheckAllFields(){
				var result = true;
				$this.find('.error').each(function(){
					$(this).remove();
				});
				$this.find('.checkfield').each(function(){
					var fname = $(this).attr('name');
					var errors = '';
					errors = checkfield(fname);		
					if (errors != ''){
						$(this).parent().parent().parent().append('<div class="error alerticon"><div class="message"><ul>'+errors+'</ul></div></div>');
						result = false;
					}
				});
				return result;
			}
			function CheckSingleField(fname){
					$this.find('[name='+fname+']').parent().parent().parent().find('.error').remove();
					if ($this.find('[name='+fname+']').val() != ''){
						var errors = '';
						errors = checkfield(fname);		
						if (errors != ''){
							$this.find('[name='+fname+']').parent().parent().parent().append('<div class="error alerticon"><div class="message"><ul>'+errors+'</ul></div></div>');
							$this.find('[name='+fname+']').focus();
						}
					}
			}
			function DisableFields(){
				for(var field in fields){
					$this.find('[name='+field+']').attr('disabled', 'disabled');
				}
			}
			function EnableFields(){
				for(var field in fields){
					$this.find('[name='+field+']').removeAttr('disabled');
				}
			}	
			function error(s){
				var result = s;
				if(s != ''){
					result = '<li>'+result+'</li>';
				}
				return result;
			}
			function checkfield(field){
				if(field != ''){
					return fields[field]();		
				}
			}
	  };
})(jQuery);





