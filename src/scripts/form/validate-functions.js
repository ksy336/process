export function validateInn(inn, textError) {
	let result = false;
	if (typeof inn === 'number') {
		inn = inn.toString();
	} else if (typeof inn !== 'string') {
		inn = '';
	}
	if (!inn.length) {
		textError.customErrorText = 'ИНН пуст';
	} else if (/[^0-9]/.test(inn)) {
		textError.customErrorText = 'ИНН может состоять только из цифр';
	} else if ([10, 12].indexOf(inn.length) === -1) {
		textError.customErrorText = 'ИНН может состоять только из 10 или 12 цифр';
	} else {
		const checkDigit = function (num, coefficients) {
			let n = 0;
			for (const i in coefficients) {
				n += coefficients[i] * num[i];
			}
			return parseInt((n % 11) % 10);
		};
		switch (inn.length) {
			case 10: {
				const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if (n10 === parseInt(inn[9])) {
					result = true;
				}
				break;
			}
			case 12: {
				const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
				if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
					result = true;
				}
				break;
			}
			default:
				break;
		}
		if (!result) {
			textError.customErrorText = 'Неправильное контрольное число';
		}
	}
	return result;
}

export function validateBik(bik, textError) {
	let result = false;
	if (typeof bik === 'number') {
		bik = bik.toString();
	} else if (typeof bik !== 'string') {
		bik = '';
	}
	if (!bik.length) {
		textError.customErrorText = 'БИК пуст';
	} else if (/[^0-9]/.test(bik)) {
		textError.customErrorText = 'БИК может состоять только из цифр';
	} else if (bik.length !== 9) {
		textError.customErrorText = 'БИК может состоять только из 9 цифр';
	} else {
		result = true;
	}
	return result;
}

export function validateKpp(kpp, textError) {
	let result = false;
	if (typeof kpp === 'number') {
		kpp = kpp.toString();
	} else if (typeof kpp !== 'string') {
		kpp = '';
	}
	if (!kpp.length) {
		textError.customErrorText = 'КПП пуст';
	} else if (kpp.length !== 9) {
		textError.customErrorText =
			'КПП может состоять только из 9 знаков (цифр или заглавных букв латинского алфавита от A до Z)';
	} else if (!/^[0-9]{4}[0-9A-Z]{2}[0-9]{3}$/.test(kpp)) {
		textError.customErrorText = 'Неправильный формат КПП';
	} else {
		result = true;
	}
	return result;
}

export function validateSnils(snils, textError) {
	let result = false;
	if (typeof snils === 'number') {
		snils = snils.toString();
	} else if (typeof snils !== 'string') {
		snils = '';
	}
	if (!snils.length) {
		textError.customErrorText = 'СНИЛС пуст';
	} else if (/[^0-9]/.test(snils)) {
		textError.customErrorText = 'СНИЛС может состоять только из цифр';
	} else if (snils.length !== 11) {
		textError.customErrorText = 'СНИЛС может состоять только из 11 цифр';
	} else {
		let sum = 0;
		for (let i = 0; i < 9; i++) {
			sum += parseInt(snils[i]) * (9 - i);
		}
		let checkDigit = 0;
		if (sum < 100) {
			checkDigit = sum;
		} else if (sum > 101) {
			checkDigit = parseInt(sum % 101);
			if (checkDigit === 100) {
				checkDigit = 0;
			}
		}
		if (checkDigit === parseInt(snils.slice(-2))) {
			result = true;
		} else {
			textError.customErrorText = 'Неправильное контрольное число';
		}
	}
	return result;
}

export function validateOgrn(ogrn, textError) {
	let result = false;
	if (typeof ogrn === 'number') {
		ogrn = ogrn.toString();
	} else if (typeof ogrn !== 'string') {
		ogrn = '';
	}
	if (!ogrn.length) {
		textError.customErrorText = 'ОГРН пуст';
	} else if (/[^0-9]/.test(ogrn)) {
		textError.customErrorText = 'ОГРН может состоять только из цифр';
	} else if (ogrn.length !== 13) {
		textError.customErrorText = 'ОГРН может состоять только из 13 цифр';
	} else {
		const n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
		if (n13 === parseInt(ogrn[12])) {
			result = true;
		} else {
			textError.customErrorText = 'Неправильное контрольное число';
		}
	}
	return result;
}

export function validateOgrnip(ogrnip, textError) {
	let result = false;
	if (typeof ogrnip === 'number') {
		ogrnip = ogrnip.toString();
	} else if (typeof ogrnip !== 'string') {
		ogrnip = '';
	}
	if (!ogrnip.length) {
		textError.customErrorText = 'ОГРНИП пуст';
	} else if (/[^0-9]/.test(ogrnip)) {
		textError.customErrorText = 'ОГРНИП может состоять только из цифр';
	} else if (ogrnip.length !== 15) {
		textError.customErrorText = 'ОГРНИП может состоять только из 15 цифр';
	} else {
		const n15 = parseInt((parseInt(ogrnip.slice(0, -1)) % 13).toString().slice(-1));
		if (n15 === parseInt(ogrnip[14])) {
			result = true;
		} else {
			textError.customErrorText = 'Неправильное контрольное число';
		}
	}
	return result;
}

export function validateRs(rs, bik, textError) {
	let result = false;
	if (validateBik(bik)) {
		if (typeof rs === 'number') {
			rs = rs.toString();
		} else if (typeof rs !== 'string') {
			rs = '';
		}
		if (!rs.length) {
			textError.customErrorText = 'Р/С пуст';
		} else if (/[^0-9]/.test(rs)) {
			textError.customErrorText = 'Р/С может состоять только из цифр';
		} else if (rs.length !== 20) {
			textError.customErrorText = 'Р/С может состоять только из 20 цифр';
		} else {
			const bikRs = bik.toString().slice(-3) + rs;
			let checksum = 0;
			const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
			for (const i in coefficients) {
				checksum += coefficients[i] * (bikRs[i] % 10);
			}
			if (checksum % 10 === 0) {
				result = true;
			} else {
				textError.customErrorText = 'Неправильное контрольное число';
			}
		}
	}
	return result;
}

export function validateKs(ks, bik, textError) {
	let result = false;
	if (validateBik(bik)) {
		if (typeof ks === 'number') {
			ks = ks.toString();
		} else if (typeof ks !== 'string') {
			ks = '';
		}
		if (!ks.length) {
			textError.customErrorText = 'К/С пуст';
		} else if (/[^0-9]/.test(ks)) {
			textError.customErrorText = 'К/С может состоять только из цифр';
		} else if (ks.length !== 20) {
			textError.customErrorText = 'К/С может состоять только из 20 цифр';
		} else {
			const bikKs = `0${bik.toString().slice(4, 6)}${ks}`;
			let checksum = 0;
			const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
			for (const i in coefficients) {
				checksum += coefficients[i] * (bikKs[i] % 10);
			}
			if (checksum % 10 === 0) {
				result = true;
			} else {
				textError.customErrorText = 'Неправильное контрольное число';
			}
		}
	}
	return result;
}
