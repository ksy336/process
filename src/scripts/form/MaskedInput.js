import Inputmask from 'inputmask';

export default function MaskedInput(selector, mask, placeholder, pasteOnFocus, baseElem = document) {
	if (baseElem == null) return;

	for (const item of baseElem.querySelectorAll(selector)) {
		Inputmask(mask).mask(item);

		if (placeholder) {
			item.setAttribute('placeholder', placeholder);
		}

		item.addEventListener('blur', function () {
			if (this.value.indexOf('_') > -1 || this.value.length !== mask.length) {
				this.value = '';
			}
		});

		if (pasteOnFocus) {
			['keydown', 'keypress', 'keyup', 'change', 'focus'].map(event => {
				item.addEventListener(event, function () {
					if (!this.value) {
						this.value = pasteOnFocus;
					}
				});
			});

			/** Не дает удалить pasteOnFocus */
			item.addEventListener('keydown', function (e) {
				if (
					(e.key === 'backspace' && this.value === pasteOnFocus) ||
					(e.key === 'backspace' && this.value === placeholder)
				) {
					e.preventDefault();
					return false;
				}
			});
		}
	}
}
