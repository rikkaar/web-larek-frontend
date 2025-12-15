import './scss/styles.scss';

import { API_URL, CDN_URL } from '@/utils/constants';

// API
import { LarekApi } from '@/components/api/larekApi';

// Model
import { AppState } from '@/components/model/appState';
import { AppStateEmitter } from '@/components/model/appStateEmitter';
import { AppStateChanges, AppStateModals } from '@/types/components/model/appState';

// Validators
import { FormValidator } from '@/components/common/FormValidator';
import {
	orderFormSchema,
	orderFormInitialValues,
	contactsFormSchema,
	contactsFormInitialValues,
	OrderFormValues,
	ContactsFormValues,
} from '@/types/components/common/formSchemas';

// Controllers
import { PageController } from '@/components/controller/PageController';
import { ProductController } from '@/components/controller/ProductController';
import { BasketController } from '@/components/controller/BasketController';
import { OrderController } from '@/components/controller/OrderController';
import { ContactsController } from '@/components/controller/ContactsController';
import { SuccessController } from '@/components/controller/SuccessController';

// Screens
import { PageScreen } from '@/components/view/PageScreen';
import { ProductScreen } from '@/components/view/ProductScreen';
import { BasketScreen } from '@/components/view/BasketScreen';
import { OrderScreen } from '@/components/view/OrderScreen';
import { ContactsScreen } from '@/components/view/ContactsScreen';
import { SuccessScreen } from '@/components/view/SuccessScreen';

// ============================================================================
// Инициализация
// ============================================================================

const api = new LarekApi(CDN_URL, API_URL);

const orderValidator = new FormValidator<OrderFormValues>(
	orderFormSchema,
	orderFormInitialValues
);

const contactsValidator = new FormValidator<ContactsFormValues>(
	contactsFormSchema,
	contactsFormInitialValues
);

const app = new AppStateEmitter(api, AppState, {
	orderValidator,
	contactsValidator,
});

// ============================================================================
// Screens
// ============================================================================

// Page Screen (главная страница)
const pageScreen = new PageScreen(new PageController(app.model));

const modal = {
	[AppStateModals.product]: new ProductScreen(new ProductController(app.model)),
	[AppStateModals.basket]: new BasketScreen(new BasketController(app.model)),
	[AppStateModals.order]: new OrderScreen(new OrderController(app.model)),
	[AppStateModals.contacts]: new ContactsScreen(new ContactsController(app.model, api)),
	[AppStateModals.success]: new SuccessScreen(new SuccessController(app.model)),
};

// ============================================================================
// Подписки
// ============================================================================

// Обновление галереи при загрузке продуктов
app.on(AppStateChanges.products, () => {
	pageScreen.render({ products: app.model.products });
});

// Закрытие всех модалок кроме текущей + блокировка страницы
app.on(AppStateChanges.modal, () => {
	const current = app.model.openedModal;

	// Блокировка страницы
	pageScreen.render({ locked: current !== AppStateModals.none });

	// Закрытие других модалок
	Object.entries(modal).forEach(([key, screen]) => {
		if (key !== current) {
			screen.render({ isActive: false });
		}
	});
});

// Открытие модалки продукта
app.on(AppStateModals.product, () => {
	const productId = app.model.selectedProduct;
	if (!productId) return;

	const product = app.model.getProduct(productId);
	if (!product) return;

	modal[AppStateModals.product].render({
		...product,
		isInBasket: app.model.isInBasket(productId),
		isActive: true,
	});
});

// Обновление при изменении корзины
app.on(AppStateChanges.basket, () => {
	// Обновляем счётчик на странице
	pageScreen.render({ basketCount: app.model.getBasketCount() });

	// Обновляем модалку продукта
	if (app.model.openedModal === AppStateModals.product) {
		const productId = app.model.selectedProduct;
		if (productId) {
			modal[AppStateModals.product].render({
				isInBasket: app.model.isInBasket(productId),
			});
		}
	}

	// Обновляем модалку корзины
	if (app.model.openedModal === AppStateModals.basket) {
		const products = app.model.getBasketProducts();
		modal[AppStateModals.basket].render({
			items: products.map((p, i) => ({
				id: p.id,
				index: i + 1,
				title: p.title,
				price: p.price,
			})),
			total: app.model.getBasketTotal(),
			isDisabled: products.length === 0,
		});
	}
});

// Открытие модалки корзины
app.on(AppStateModals.basket, () => {
	const products = app.model.getBasketProducts();
	modal[AppStateModals.basket].render({
		items: products.map((p, i) => ({
			id: p.id,
			index: i + 1,
			title: p.title,
			price: p.price,
		})),
		total: app.model.getBasketTotal(),
		isDisabled: products.length === 0,
		isActive: true,
	});
});

// Открытие формы заказа
app.on(AppStateModals.order, () => {
	const validator = app.model.orderValidator;
	const values = validator.getValues();

	modal[AppStateModals.order].render({
		payment: values.payment ?? null,
		error: validator.getErrorsArray()[0],
		valid: validator.valid,
		isActive: true,
	});
	modal[AppStateModals.order].setFieldValue('address', values.address);
});

// Обновление формы заказа (при изменении полей)
app.on(AppStateChanges.order, () => {
	const validator = app.model.orderValidator;
	const values = validator.getValues();

	modal[AppStateModals.order].render({
		payment: values.payment ?? null,
		error: validator.getErrorsArray()[0],
		valid: validator.valid,
	});
});

// Открытие формы контактов
app.on(AppStateModals.contacts, () => {
	const validator = app.model.contactsValidator;
	const values = validator.getValues();

	modal[AppStateModals.contacts].render({
		error: validator.getErrorsArray()[0],
		valid: validator.valid,
		isActive: true,
	});
	modal[AppStateModals.contacts].setFieldValue('email', values.email);
	modal[AppStateModals.contacts].setFieldValue('phone', values.phone);
});

// Обновление формы контактов (при изменении полей)
app.on(AppStateChanges.contacts, () => {
	const validator = app.model.contactsValidator;

	modal[AppStateModals.contacts].render({
		error: validator.getErrorsArray()[0],
		valid: validator.valid,
	});
});

// Открытие успешного заказа
app.on(AppStateModals.success, () => {
	modal[AppStateModals.success].render({
		total: app.model.getBasketTotal(), // корзина ещё не очищена
		isActive: true,
	});
});

// ============================================================================
// Запуск
// ============================================================================

// Инициализация PageScreen
pageScreen.render({});

// Загрузка продуктов
api.getProducts()
	.then((products) => app.model.setProducts(products))
	.catch(console.error);
