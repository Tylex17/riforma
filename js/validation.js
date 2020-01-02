const o2Validation =
{
	init()
	{
		const self = this;
		$('form ._required').on('focusout', function(e)
		{
			self.changeInputState(this);
			self.changeInputStateSiblignsInputs(this);
		});

	},
	// проверка инпута
	validateInput(input)
	{
		var result = this.validateSimple(input);
		if(result.valid)
		{
			if($(input).hasClass('_phone-mask'))
				result = this.validatePhone(input);

			if($(input).hasClass('_emvail-mask'))
				result = this.validateEmail(input);

			if($(input).hasClass('_passwords'))
				result = this.comparePasswords(input);

			return result;
		}
		else
			return result;
	},

	// валиация соседних полей
	changeInputStateSiblignsInputs(input)
	{
		$(input).parents('form').find('._required:visible').each((index, field) =>
		{
			if(input != field)
				this.changeInputState(field);
			else
				return false;
		});
	},

	// проверка адреса
	validateSimple(input)
	{
		var value = $(input).val().trim();
		if(value)
			return {
				el: input,
				valid: true,
				message: ''
			}
		else
			return {
				el: input,
				valid: false,
				message: 'Поле является обязательным для заполнения.'
			}
	},

	// проверка адреса
	validatePhone(input)
	{
		var phone = $(input).val().trim().replace(/[^0-9.]/g,'');
		if(!phone)
			return {
				el: input,
				valid: false,
				message: 'Поле является обязательным для заполнения.'
			}

		if(phone.length >= 11)
			return {
				el: input,
				valid: true,
				message: ''
			}
		else
			return {
				el: input,
				valid: false,
				message: 'Введите действительный номер телефона.'
			}

	},
	// проверка адреса
	validateEmail(input)
	{
		var email = $(input);
		if(!$(input).val())
			return {
				el: input,
				valid: false,
				message: 'Поле является обязательным для заполнения.'
			}

		// валидация мыла
		if(email.length >= 11)
			return {
				el: input,
				valid: true,
				message: ''
			}
		else
			return {
				el: input,
				valid: false,
				message: 'Введите действительный адрес электронной почты.'
			}

	},
	// проверка паролей
	comparePasswords(input)
	{
		var passwordInputs = $(input).parents('form').find('._passwords:visible');

		if(!$(input).val())
			return {
				el: passwordInputs,
				valid: false,
				message: 'Поле является обязательным для заполнения.'
			}

		if($(passwordInputs[0]).val() === $(passwordInputs[1]).val())
			return {
				el: passwordInputs,
				valid: true,
				message: ''
			}
		else
			return {
				el: passwordInputs,
				valid: false,
				message: 'Пароли не совпадают'
			}

	},

	// убираем ошибку и ставим галочку
	removeError(input)
	{
		$(input).removeClass('input_error');
	},

	// добавляем ошибку и убираем галочку
	setError(result)
	{
		$(result.el).addClass('input_error');
		$(result.el).siblings('.input__sub-text_error').html(result.message);
	},

	// проверяем поля и меняем их состояния на соответствующие
	changeInputState(input)
	{
		const validationResult = this.validateInput(input);
		if(validationResult.valid)
			this.removeError(input);
		else
			this.setError(validationResult);
	},

	// проверка валидности формы
	formIsValid(form)
	{
		let valid = false;
		const self = this;
		$(form).find('._required:visible').each((index, input) =>
		{
			if(!self.validateInput(input).valid)
			{
				valid = false;
				return false;
			}
			else
			{
				valid = true;
			}
		});

		return valid;
	},

	validateForm(form)
	{
		$(form).find('._required:visible').each((index, input) =>
		{
			this.changeInputState(input);
		});
		$(form).find('.input_error:visible').first().focus();

		return this.formIsValid(form);
	},

	// проверяем готовности формы к отправке
	updateFormSubmitState(form)
	{
		const submitBtn = $(form).find('button[type="submit"]');

		if(this.formIsValid(form))
			$(submitBtn).removeClass('btn_disabled');
		else
			$(submitBtn).addClass('btn_disabled');
	},

	// следим за изменениями полей формы и вызываем проверку готовности формы
	changeSubmitBtnState(form)
	{
		$(form).on('keyup blur change', 'input, textarea', (event) =>
		{
			// this.validation.updateFormSubmitState($(this).parents('form'));
		});
	},
}