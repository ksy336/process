import {
	validateInn,
	validateBik,
	validateKpp,
	validateSnils,
	validateOgrn,
	validateOgrnip,
	// validateRs,
	// validateKs,
} from './validate-functions';

export function validateForm(baseElem = document) {
	if (baseElem == null) return;

	// В объекте указаны тексты ошибок
	const regularTypes = {
		name: ['^([a-z|а-яё|\\s]){1,}([-])*([a-z|а-яё|\\s])*$'],
		phone: ['^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$'],
		email: ['[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+'],
		birthday: ['^[0-3]{1}[0-9]{1}.[0-1]{1}[0-9]{1}.[1-2]{1}[0|9]{1}[0-9]{2}$'],
		INN: ['^([0-9]{12}|[0-9]{10})$', validateInn],
		KPP: ['^[0-9]{9}$', validateKpp],
		SNILS: ['^[0-9]{11}$', validateSnils],
		BIK: ['^[0-9]{9}$', validateBik],
		OGRN: ['^[0-9]{13}$', validateOgrn],
		OGRNIP: ['^[0-9]{15}$', validateOgrnip],
		PaymentAccount: ['^[0-9]{20}$'],
		CorrespondentAccount: ['^[0-9]{20}$'],
	};

	const textError = {
		emptyInput: '',
		uncorrectData: 'Некорректные данные',
		customErrorText: '',
	};

	const removeTextError = closestLabel => {
		const spanError = closestLabel.querySelector('.text-error');
		if (spanError) {
			closestLabel.removeChild(spanError);
		}
	};

	// Изменение текста ошибки
	const changeTextError = (item, closestLabel, inputValue, ruleType = null) => {
		let text = '';
		if (ruleType != null) {
			text = textError.customErrorText;
		} else {
			inputValue ? (text = textError.uncorrectData) : (text = textError.emptyInput);
		}

		if (closestLabel.classList.contains('validate-error')) {
			if (!closestLabel.querySelector('.text-error')) {
				item.addEventListener('blur', function () {
					inputValue = item.value;
					inputValue ? (text = textError.uncorrectData) : (text = textError.emptyInput);
				});
				const spanError = `<span class="text-error">${text}</span>`;
				closestLabel.insertAdjacentHTML('beforeend', spanError);
			} else {
				closestLabel.querySelector('.text-error').textContent = text;
			}
		} else {
			removeTextError(closestLabel);
		}
	};

	const addClass = (item, className) => {
		item.classList.add(className);
	};

	const removeClass = (item, className) => {
		item.classList.remove(className);
	};

	const allFormBtns = Array.from(baseElem.querySelectorAll('input[type="submit"]'));
	const allValidateInputs = Array.from(baseElem.querySelectorAll('.js-validation'));

	const checkInput = (item, closestLabel, rules, ruleType) => {
		let inputValue = item.value;
		let checkRequired = false;
		item.getAttribute('required') == '' ? (checkRequired = true) : (checkRequired = false);
		let regexp = rules;
		const validateFunc = ruleType != undefined && regularTypes[ruleType][1];

		//Класс validate-error добавляется в случаях:
		//1.если поле обязательное, но пустое или не соответствует паттерну,
		//2.если поле не обязательное, но не соотвествует паттерну
		if ((checkRequired || inputValue) && !inputValue.match(regexp)) {
			if (rules) {
				addClass(closestLabel, 'validate-error');
				if (regularTypes[item.dataset.rules].length > 1) {
					validateFunc(inputValue, textError);
					changeTextError(item, closestLabel, inputValue, ruleType);
				} else {
					changeTextError(item, closestLabel, inputValue);
				}
			} else {
				!inputValue || !inputValue.match(/\S/)
					? addClass(closestLabel, 'validate-error')
					: removeClass(closestLabel, 'validate-error');
				changeTextError(item, closestLabel, inputValue);
			}
		} else if (regexp && inputValue.match(regexp) && regularTypes[item.dataset.rules].length > 1) {
			validateFunc(inputValue, textError)
				? removeClass(closestLabel, 'validate-error')
				: addClass(closestLabel, 'validate-error');
			changeTextError(item, closestLabel, inputValue, ruleType);
		} else {
			removeClass(closestLabel, 'validate-error');
			changeTextError(item, closestLabel, inputValue);
			// removeTextError(closestLabel);
		}
	};

	// Добавляем кнопке класс test, если есть хотя бы один label с классом validate-error
	const checkAllInputs = (closestForm, formBtn) => {
		let allInputs = Array.from(closestForm.querySelectorAll('label'));
		function checkErrors(element) {
			return element.classList.contains('validate-error');
		}
		// allInputs.some(checkErrors)
		// 	? formBtn.setAttribute('disabled', 'disabled')
		// 	: formBtn.removeAttribute('disabled');
	};

	// Добавляем всем инпутам с классом js-validation обработчики с проверкой
	allValidateInputs.forEach(function (item) {
		let closestLabel = item.closest('label');
		let closestForm = item.closest('form');
		const formBtn = closestForm.querySelector('input[type="submit"]');
		const regexpRule = new RegExp(regularTypes[item.dataset.rules][0], 'i');
		const ruleType = item.dataset.rules;
		item.addEventListener('blur', function () {
			//Проверяем поле на соответствие паттерну
			checkInput(item, closestLabel, regexpRule, ruleType);
			//Проверяем нужно ли добавлять кнопке класс test
			checkAllInputs(closestForm, formBtn);
		});

		//При фокусе инпута удаляем disabled с кнопки отправки для возможности исправить ошибку и отправить форму
		// item.addEventListener('focus', function () {
		// 	formBtn.removeAttribute('disabled');
		// });
	});

	//Проверяем все инпуты по нажатию на кнопку отправить
	allFormBtns.forEach(function (item) {
		const closestForm = item.closest('form');
		if (closestForm) {
			item.addEventListener('click', function (e) {
				const allThisInputs = Array.from(closestForm.querySelectorAll('input'));

				//Проверяем наличие пустых инпутов. Если инпут пустой, но required функция checkInput добавит класс validate-error
				allThisInputs.forEach(function (item) {
					//item.blur();
					const closestLabel = item.closest('label');
					if (closestLabel) {
						checkInput(item, closestLabel);
					}
				});
				//Проверяем есть ли класс validate-error на всех label в форме
				checkAllInputs(closestForm, item);
			});
		}
	});
}
