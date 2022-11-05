// import Swiper, { Pagination } from 'swiper';
// import initForms from './form';
// // import createSideMenu from './components/CustomSideMenu';
// import createPopup from './components/CustomPopup';
// import createAccordion from './components/CustomAccordion';
// import createProgressBar from './components/CustomProgressBar';
// import createTabs from './components/CustomTabs';
// import scrollToElement from './utils/scroll-to-element';
//
// // import 'sideMenu.js';
// import './parallax';
// import 'swiper/css';
// import 'swiper/css/pagination';
//
import 'Styles/index.sass';
//
// // Полифилы match и closest
// import './utils/polyfill';
//
// let scene = document.getElementById('scene');
// let parallaxInstance = new Parallax(scene);
// let scene1 = document.getElementById('scene1');
// let newParallaxInstance = new Parallax(scene1);
//
// (function () {
// 	scrollToElement();
//
// 	initComponents();
// 	createPopup({ initHandler: initComponents });
// })();
//
// function initComponents(baseElem) {
// 	if (!baseElem) baseElem = document;
//
// 	initForms(baseElem);
//
// 	createAccordion({ baseElem });
// 	createTabs({ baseElem });
// 	createProgressBar({
// 		uploadFormSel: '.js-upload-form',
// 		progressFillSel: '.js-progress-bar-fill',
// 		progressTextSel: '.js-progress-bar-text',
// 		baseElem,
// 	});
//
// 	baseElem.querySelectorAll('.swiper').forEach(swiperElem => {
// 		new Swiper(swiperElem, {
// 			modules: [Pagination],
// 			slidesPerView: 1,
// 			spaceBetween: 30,
// 			pagination: {
// 				el: '.swiper-pagination',
// 				type: 'bullets',
// 			},
// 			breakpoints: {
// 				640: {
// 					slidesPerView: 3,
// 					spaceBetween: 30,
// 				},
// 			},
// 		});
// 	});
// }
//
// const burger = document.querySelector('.header__hamburger'),
// 	menu = document.querySelector('.navigation').cloneNode(1),
// 	popup = document.querySelector('.promo-popup-content'),
// 	header = document.querySelector('.promo-header'),
// 	body = document.body,
// 	buttonsShow = document.querySelectorAll('.question_show'),
// 	container = document.querySelector('.question-block'),
// 	menuAmount = document.querySelector('.promo-menu-orange');
//
// function checkText() {
// 	menuAmount.addEventListener("click", (e) => {
// 		const parent = e.target.closest('.menu-amount');
// 		const inputs = parent.querySelectorAll('.input-check');
// 		const textsToCheck = parent.querySelectorAll('.check-text');
//
// 		textsToCheck.forEach((text) => {
// 			text.classList.toggle('active');
// 		})
// 		inputs.forEach((input) => {
// 			if (Number(input.checked) === 0) {
// 				input.checked = 1
// 			} else if (Number(input.checked) === 1) {
// 				input.checked = 0
// 			}
// 			})
// 		inputs.forEach((input) => {
// 			if (input.checked) {
// 				textsToCheck.forEach((text) => {
// 					text.classList.add('active');
// 				})
// 			} else {
// 				textsToCheck.forEach((text) => {
// 					text.classList.remove('active');
// 				})
// 			}
// 		})
// 	})
// }
// checkText()
//
// function showProducts() {
// 		const buttonsAmount = document.querySelectorAll('.button-amount');
// 		let textsBlock = document.querySelectorAll('.promo-products-info');
//
// 		buttonsAmount.forEach((button, index) => {
//
// 			button.addEventListener("click", (e) => {
// 				buttonsAmount.forEach((el) => {
// 					el.classList.remove('active');
// 				})
// 				e.target.classList.add('active');
//
// 				textsBlock.forEach((text, i) => {
// 					text.classList.add('hidden');
// 					if (i === index) {
// 							textsBlock[i].classList.remove('hidden');
// 						}
// 					})
// 			})
// 		})
// }
// showProducts()
//
// function showBlocks() {
// 	const container = document.querySelector(".menu-scheme");
// 	//const buttons = document.querySelectorAll(".sign");
// 	container.addEventListener("click", (e) => {
// 			e.preventDefault()
// 			const blocks = document.querySelectorAll(".menu-main");
//
// 			blocks.forEach((block) => {
// 				block.classList.toggle("active");
// 			});
// 		});
// }
// showBlocks()
//
// function showBigBlocks() {
// 	const container = document.querySelector(".menu-main-big");
// 	//const buttons = document.querySelectorAll(".sign");
// 	container.addEventListener("click", (e) => {
// 		e.preventDefault()
// 		const blocks = container.querySelectorAll(".menu-main");
//
// 		blocks.forEach((block) => {
// 			block.classList.toggle("active");
// 		});
// 	});
// }
// showBigBlocks()
//
// function showElement() {
// 	container.addEventListener("click", function(e) {
// 		e.preventDefault()
// 		const parent = e.target.closest('.question-item');
// 		const text = parent.querySelectorAll('.answer-hidden');
//
// 		if (text) {
// 			text.forEach((textItem, i) => {
// 				console.log(buttonsShow[i])
// 				textItem.classList.toggle('active');
// 				})
// 			}
// 		const buttons = parent.querySelectorAll('.question_show');
// 		const buttonsHidden = parent.querySelectorAll('.question_hidden');
//
// 		if (buttons) {
// 			buttons.forEach((btn) => {
// 				btn.classList.toggle('hidden');
// 				buttonsHidden.forEach((btn) => {
// 					btn.classList.toggle('active');
// 					})
// 				})
// 			}
// 		})
// 	}
//
// 	showElement()
//
// // preventdefault
// const buttonDisabled = document.querySelector(".button_white");
// buttonDisabled.addEventListener("click", function(e) {
// 	e.preventDefault();
// })
//
// const anchors = document.querySelectorAll('a[href*="#"]');
//
// 	anchors.forEach((anchor) => {
// 		anchor.addEventListener("click",(e) => {
// 			e.preventDefault();
// 			const blockId = anchor.getAttribute("href");
// 			document.querySelector('' + blockId).scrollIntoView({
// 				behavior: "smooth",
// 				block: "start"
// 			})
// 		})
// 	})
//
//
//
// 	// Burger menu
// 	burger.addEventListener("click", function(e) {
// 		e.preventDefault();
// 		popup.classList.toggle('open');
// 		// close.classList.toggle('active');
// 		burger.classList.toggle('active');
// 		header.classList.toggle('fixed');
// 		body.classList.toggle("noscroll");
// 		renderPopup()
// 	})
//
// 	function renderPopup() {
// 		popup.appendChild(menu)
// 	}
//
// 	const links = Array.from(menu.children);
//
// 	links.forEach((link) => {
// 		link.addEventListener("click", function() {
// 			popup.classList.remove('open');
// 			burger.classList.remove('active');
// 			body.classList.remove('noscroll');
// 		})
// 	})
//
// // api request
// const email = document.querySelector('input[name="email"]');
// const name = document.querySelector('input[name="name"]');
// const message = document.querySelector('input[name="message"]');
// const blockAfterForm = document.querySelector('.form-answer');
// const currentForm = document.querySelector('.form-send');
// const answerAgain = document.querySelector('.answer-again');
//
// const API_URL = 'https://trybaby.fmake.ru/user/test/send-feedback-unauth-from-landing';
// document.addEventListener("submit", function(e){
// 	e.preventDefault();
// 	const formData = new FormData();
// 	formData.append('name', name.value);
// 	formData.append('email', email.value);
// 	formData.append('message', message.value);
//
// 	fetch(`${API_URL}`, {
// 		method: "POST",
// 		// headers: {
// 		// 	// 'accept': "*/*",
// 		// 	'Content-Type': 'multipart/form-data',
// 		// },
// 		body: formData,
// 	}).then(function (response) {
// 		if (response.ok) {
// 			const data = response.json();
//
// 			blockAfterForm.classList.remove("hidden");
// 			currentForm.classList.add('hidden');
// 			name.value = "";
// 			email.value = "";
// 			message.value = "";
// 			answerAgain.addEventListener("click", function(e) {
// 				e.preventDefault()
// 				blockAfterForm.classList.add("hidden");
// 				currentForm.classList.remove('hidden');
// 			})
// 			return data;
// 		}
// 	}).catch(function(error) {
// 		console.warn(error)
// 	});
//
// });





