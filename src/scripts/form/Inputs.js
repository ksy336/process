export class Inputs {
	constructor(config) {
		this.defaultConfig = {
			baseElem: document,
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});

		if (config.baseElem == null) return;

		this.init();
	}

	init() {
		const { baseElem } = this.config;

		for (const input of baseElem.querySelectorAll('input')) {
			input.addEventListener('blur', () => this.addFocus());
		}
		this.addFocus();
	}

	addFocus() {
		const { baseElem } = this.config;

		for (const input of baseElem.querySelectorAll('input')) {
			if (input.value) {
				input.classList.add('focus');
			} else {
				input.classList.remove('focus');
			}
		}
	};
}
export class InputPassword {
	constructor(config) {
		this.defaultConfig = {
			selector: '.js-input-password',
			toggleSelector: '.js-input-password-toggle',
			baseElem: document,
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});

		if (config.baseElem == null) return;

		this.init();
	}

	init() {
		const { selector, toggleSelector, baseElem } = this.config;

		for (const wrapper of baseElem.querySelectorAll(selector)) {
			const input = wrapper.querySelector('input');
			const toggle = wrapper.querySelector(toggleSelector);

			if (toggle) {
				toggle.addEventListener('click', () => this.togglePassword(toggle, input));
			}
		}
	}

	togglePassword(toggle, input) {
		toggle.classList.toggle('show');

		if (input.type === 'password') {
			input.type = 'text';
			input.classList.add('showed');
		} else {
			input.type = 'password';
			input.classList.remove('showed');
		}
	}
}

// TODO: multiple
export class InputFile {
	constructor(config) {
		this.defaultConfig = {
			wrapperSelector: '.js-input-file',
			fakeSelector: '.js-input-file-fake',
			baseElem: document,
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});

		if (config.baseElem == null) return;

		this.init();
	}

	init() {
		const { baseElem, wrapperSelector } = this.config;

		for (const wrapper of baseElem.querySelectorAll(wrapperSelector)) {
			for (const input of wrapper.querySelectorAll('input')) {
				input.addEventListener('change', () => this.setInputFile(input, wrapper));
			}
		}
	}

	setInputFile(input, wrapper) {
		const { fakeSelector } = this.config;

		const fakeInput = wrapper.querySelector(fakeSelector);
		const defaultText = fakeInput.innerText;
		let fileName = '';

		fakeInput.setAttribute('data-inputfile-text', defaultText);

		if (input.files && input.files.length > 1) {
			fileName = (input.getAttribute('data-multiple-caption') || '').replace('{count}', input.files.length);
		} else {
			fileName = input.value.split('\\').pop();
		}

		if (fileName) {
			fakeInput.innerText = fileName;
			wrapper.classList.add('loaded');
			wrapper.classList.add('focus');
		} else {
			fakeInput.innerText = defaultText;
			wrapper.classList.remove('loaded');
			wrapper.classList.remove('focus');
		}
	}
}

// TODO: multiple
export class Select {
	constructor(config) {
		this.defaultConfig = {
			selectSelector: '.js-select',
			selectTextSelector: '.js-select-selected',
			selectListSelector: '.js-select-list',
			selectListItemSelector: '.js-select-list-item',
			baseElem: document,
		};
		this.config = Object.assign({}, this.defaultConfig, config || {});

		if (config.baseElem == null) return;

		// // matches polyfill
		// (function (e) {
		// 	e.matches
		// 		|| (e.matches =					e.matchesSelector
		// 			|| function (selector) {
		// 				const matches = document.querySelectorAll(selector);
		// 				const th = this;
		// 				return Array.prototype.some.call(matches, e => e === th);
		// 			});
		// }(Element.prototype));

		this.bindedCloseList = this.closeList.bind(this);
		this.init();
	}

	init() {
		const { selectSelector, selectTextSelector, selectListItemSelector, baseElem } = this.config;

		for (const select of baseElem.querySelectorAll(selectSelector)) {
			const text = select.querySelector(selectTextSelector);
			text.addEventListener('click', () => this.toggleList(select));
		}

		for (const select of baseElem.querySelectorAll(selectSelector)) {
			const options = select.querySelectorAll(selectListItemSelector);
			for (let i = 0; i < options.length; i++) {
				options[i].addEventListener('click', () => this.checkOption(options[i], i, select));
			}
		}
	}

	toggleList(select) {
		const { baseElem, selectSelector } = this.config;

		const isOpen = select.classList.contains('open');
		for (const item of baseElem.querySelectorAll(selectSelector)) {
			item.classList.remove('open');
		}
		if (isOpen) {
			select.classList.remove('open');
		} else {
			select.classList.add('open');
		}

		if (!isOpen) {
			setTimeout(() => {
				baseElem.addEventListener('click', this.bindedCloseList);
			}, 10);
		} else {
			baseElem.removeEventListener('click', this.bindedCloseList);
		}
	}

	closeList(e) {
		const { baseElem, selectSelector } = this.config;

		let parent = e.target;
		let isParent = false;
		while (parent != baseElem) {
			if (parent.matches(selectSelector)) {
				isParent = true;
				break;
			}
			parent = parent.parentNode;
		}
		if (!isParent) {
			for (const select of baseElem.querySelectorAll(selectSelector)) {
				select.classList.remove('open');
			}
		}
		baseElem.removeEventListener('click', this.bindedCloseList);
	}

	checkOption(fakeOption, index, selectContainer) {
		const { selectTextSelector } = this.config;

		const selectText = selectContainer.querySelector(selectTextSelector);
		selectContainer.querySelector('select').selectedIndex = index;

		const selectChildren = Array.from(selectContainer.querySelector('select').children);
		selectChildren.forEach(function (item) {
			item.removeAttribute('selected');
			item.selected = false;
		});
		selectContainer.querySelector('select')[index].setAttribute('selected', true);
		selectContainer.querySelector('select')[index].selected = true;

		selectText.innerText = fakeOption.innerText;
		selectContainer.classList.remove('open');
	}
}
