import { ChipLabelMap, ChipClassMap } from '@/types/components/view/chip';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

/**
 * Маппинг категории на текст (для DI в ChipView)
 */
export const chipLabelMap: ChipLabelMap = {
	'софт-скил': 'софт-скил',
	'хард-скил': 'хард-скил',
	'другое': 'другое',
	'дополнительное': 'дополнительное',
	'кнопка': 'кнопка',
};

/**
 * Маппинг категории на CSS-класс (для DI в ChipView)
 */
export const chipClassMap: ChipClassMap = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	'другое': 'card__category_other',
	'дополнительное': 'card__category_additional',
	'кнопка': 'card__category_button',
};

/**
 * Связующие элементы для View слоя: querySelectors, Статические данные, lc-ключи, параметры компонента и т.д.
 */
export const settings = {
	/** Настройки Chip (категории) */
	chip: {
		labels: chipLabelMap,
		classes: chipClassMap,
	},

	/** Шаблоны */
	templates: {
		productPreview: '#card-catalog',
		productModal: '#card-preview',
		basketProduct: '#card-basket',
		basketModal: '#basket',
		orderForm: '#order',
		contactsForm: '#contacts',
		orderSuccess: '#success',
	},

	/** Селекторы страницы */
	page: {
		wrapper: '.page__wrapper',
		header: '.header',
		basketButton: '.header__basket',
		basketCounter: '.header__basket-counter',
		gallery: '.gallery',
		lockedClass: 'page__wrapper_locked',
	},

	/** Селекторы модалки */
	modal: {
		container: '#modal-container',
		closeButton: '.modal__close',
		content: '.modal__content',
		activeClass: 'modal_active',
		title: '.modal__title',
		actions: '.modal__actions',
	},

	/** Селекторы карточки продукта */
	productCard: {
		category: '.card__category',
		title: '.card__title',
		image: '.card__image',
		price: '.card__price',
		description: '.card__text',
		button: '.card__button',
		/** Модификаторы категорий */
		categoryModifiers: {
			'софт-скил': 'card__category_soft',
			'хард-скил': 'card__category_hard',
			'другое': 'card__category_other',
			'дополнительное': 'card__category_additional',
			'кнопка': 'card__category_button',
		},
	},

	/** Селекторы корзины */
	basket: {
		list: '.basket__list',
		totalPrice: '.basket__price',
		submitButton: '.basket__button',
		/** Элемент корзины */
		item: {
			index: '.basket__item-index',
			title: '.card__title',
			price: '.card__price',
			deleteButton: '.basket__item-delete',
		},
	},

	/** Селекторы формы (общие) */
	form: {
		input: '.form__input',
		label: '.form__label',
		errors: '.form__errors',
		submitButton: 'button[type=submit]',
	},

	/** Селекторы формы заказа */
	orderForm: {
		paymentCard: 'button[name=card]',
		paymentCash: 'button[name=cash]',
		paymentActiveClass: 'button_alt-active',
		addressInput: 'input[name=address]',
	},

	/** Селекторы формы контактов */
	contactsForm: {
		emailInput: 'input[name=email]',
		phoneInput: 'input[name=phone]',
	},

	/** Селекторы успешного заказа */
	orderSuccess: {
		title: '.order-success__title',
		description: '.order-success__description',
		closeButton: '.order-success__close',
	},

	/** Текстовые константы */
	text: {
		currency: 'синапсов',
		priceless: 'Бесценно',
		addToBasket: 'В корзину',
		removeFromBasket: 'Убрать',
	},
} as const;
