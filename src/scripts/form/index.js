import MaskedInput from './MaskedInput';
import { Inputs, InputPassword, InputFile, Select } from './Inputs';
import { validateForm } from './validate';

export default function initForms(baseElem = document) {
	if (baseElem == null) return;

	validateForm(baseElem);

	/** Навешивает на все инпуты класс focus, если value не пустое */
	new Inputs({ baseElem });

	/** Добавляет переключаетль показать/скрыть пароль */
	new InputPassword({ baseElem });

	/** Кастомный input[type="file"] */
	new InputFile({ baseElem });

	/** Кастомный select */
	new Select({ baseElem });

	/** input с маской */
	MaskedInput('.js-inputmask-phone input', '+7 (999) 999 99-99', '+7 (___) ___ __-__', '+7 (', baseElem);
	MaskedInput('.js-inputmask-date input', '99.99.9999', 'dd.mm.YYYY', '', baseElem);
}
