import { ChipLabelMap, ChipClassMap } from '@/types/components/view/chip';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const chipLabelMap: ChipLabelMap = {
	'софт-скил': 'софт-скил',
	'хард-скил': 'хард-скил',
	другое: 'другое',
	дополнительное: 'дополнительное',
	кнопка: 'кнопка',
};

export const chipClassMap: ChipClassMap = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	другое: 'card__category_other',
	дополнительное: 'card__category_additional',
	кнопка: 'card__category_button',
};

export const settings = {
	chip: {
		labels: chipLabelMap,
		classes: chipClassMap,
	},

	templates: {
		productPreview: '#card-catalog',
		productModal: '#card-preview',
		basketProduct: '#card-basket',
		basketModal: '#basket',
		orderForm: '#order',
		contactsForm: '#contacts',
		orderSuccess: '#success',
	},

	page: {
		wrapper: '.page__wrapper',
		header: '.header',
		basketButton: '.header__basket',
		basketCounter: '.header__basket-counter',
		gallery: '.gallery',
		lockedClass: 'page__wrapper_locked',
	},

	modal: {
		container: '#modal-container',
		closeButton: '.modal__close',
		content: '.modal__content',
		activeClass: 'modal_active',
		title: '.modal__title',
		actions: '.modal__actions',
	},

	productCard: {
		category: '.card__category',
		title: '.card__title',
		image: '.card__image',
		price: '.card__price',
		description: '.card__text',
		button: '.card__button',

		categoryModifiers: {
			'софт-скил': 'card__category_soft',
			'хард-скил': 'card__category_hard',
			другое: 'card__category_other',
			дополнительное: 'card__category_additional',
			кнопка: 'card__category_button',
		},
	},

	basket: {
		list: '.basket__list',
		totalPrice: '.basket__price',
		submitButton: '.basket__button',

		item: {
			index: '.basket__item-index',
			title: '.card__title',
			price: '.card__price',
			deleteButton: '.basket__item-delete',
		},
	},

	form: {
		input: '.form__input',
		label: '.form__label',
		errors: '.form__errors',
		submitButton: 'button[type=submit]',
	},

	orderForm: {
		online: 'button[name=card]',
		cash: 'button[name=cash]',
		paymentActiveClass: 'button_alt-active',
		addressInput: 'input[name=address]',
	},

	contactsForm: {
		emailInput: 'input[name=email]',
		phoneInput: 'input[name=phone]',
	},

	orderSuccess: {
		title: '.order-success__title',
		description: '.order-success__description',
		closeButton: '.order-success__close',
	},

	text: {
		currency: 'синапсов',
		priceless: 'Бесценно',
		addToBasket: 'В корзину',
		removeFromBasket: 'Убрать',
		next: 'Далее',
		pay: 'Оплатить',
		newPurchases: 'За новыми покупками',
		checkout: 'Оформить',
	},
} as const;
