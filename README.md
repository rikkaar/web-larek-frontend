# Проектная работа "Веб-ларек"

## Архитектура

Проект применяет паттерн **MVP (Model-View-Presenter)**, следует принципам **SOLID**.

**Стек:** HTML, SCSS, TypeScript, Webpack, Zod

### Основные части архитектуры

**Model (AppState)** — хранит состояние приложения (каталог, корзина, выбранный товар, открытая модалка). При изменении вызывает callback `onChange`, который эмитит события через `AppStateEmitter`.

**View (Screen/View)** — отображает данные пользователю. `View` — базовые компоненты, `Screen` — верхнеуровневые экраны, которые сами создают вложенные View и получают Controller как settings.

**Presenter (Controller)** — реализует интерфейс settings для Screen. Содержит callbacks для UI-событий (клики, ввод), вызывает методы Model.

**AppStateEmitter** — обёртка над AppState, наследует EventEmitter. При изменениях Model эмитит события `AppStateChanges` и `AppStateModals`.

**index.ts** — Composition Root. Создаёт все зависимости, подписывается на события, обновляет Screen'ы.

---

## Инструкция по сборке и запуску

```bash
npm install
npm run start
```

## Сборка

```bash
npm run build
```

---

## Базовые классы

### EventEmitter

**Назначение:** Брокер событий (паттерн Observer).

**Класс:** `EventEmitter`

**Поля:**
- `protected events: EventsMap` — карта событий и их обработчиков

**Конструктор:**
```typescript
constructor()
```

**Методы:**
- `on(eventName: string, handler: EventHandler): void` — подписаться на событие
- `off(eventName: string, handler: EventHandler): void` — отписаться от события
- `emit(eventName: string, data: object): void` — отправить событие
- `reset(): void` — сбросить все обработчики
- `bindEmitter(events: EventsMap): void` — привязать внешнюю карту событий

---

### Api

**Назначение:** Базовый HTTP-клиент для REST API.

**Класс:** `Api`

**Поля:**
- `readonly baseUrl: string` — базовый URL для всех запросов
- `protected options: RequestInit` — опции запроса (headers, credentials и др.)

**Конструктор:**
```typescript
constructor(baseUrl: string, options: RequestInit = {})
```

**Методы:**
- `protected handleResponse<T>(response: Response): Promise<T>` — обработка ответа: парсинг JSON, обработка ошибок
- `get<T>(uri: string): Promise<T>` — GET-запрос
- `post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>` — POST/PUT/DELETE-запрос с телом

---

### LarekApi extends Api

**Назначение:** Сервис для работы с API магазина.

**Класс:** `LarekApi extends Api implements ILarekApi`

**Поля:**
- `readonly cdn: string` — URL CDN для изображений

**Конструктор:**
```typescript
constructor(cdn: string, baseUrl: string, options?: RequestInit)
```

**Методы:**
- `private getCdnUrl(url: string): string` — получить полный URL изображения
- `getProducts(): Promise<Product[]>` — получить список всех товаров
- `getProduct(id: string): Promise<Product>` — получить товар по ID
- `createOrder(order: OrderRequest): Promise<OrderResult>` — создать заказ

---

### View<T, S, E>

**Назначение:** Базовый абстрактный класс для всех View-компонентов.

**Класс:** `View<T, S extends object = object, E extends HTMLElement = HTMLElement> implements IView<T, S, E>`

**Generic параметры:**
- `T` — тип данных для рендеринга
- `S` — тип настроек компонента (callbacks, вложенные View)
- `E` — тип корневого DOM-элемента (по умолчанию HTMLElement)

**Поля:**
- `['constructor']!: new (element: E, settings: S) => this` — трюк для копирующего конструктора
- `protected cache: Record<string, HTMLElement>` — кеш DOM-элементов
- `public element: E` — корневой DOM-элемент компонента
- `protected readonly settings: S` — настройки компонента

**Конструктор:**
```typescript
constructor(element: E, settings: S)
```

**Методы:**
- `protected init(): void` — метод жизненного цикла: инициализация (переопределяется в дочерних классах)
- `copy(settings?: Partial<S>): this` — копирующий конструктор (клонирует element и объединяет settings)
- `render(data?: Partial<T>): E` — рендер компонента с данными
- `protected ensure<T extends HTMLElement>(query: SelectorElement<T>, root?: HTMLElement): T` — найти элемент по селектору с кешированием
- `protected setImage(query: SelectorElement<HTMLImageElement>, src: string, alt?: string): void` — установить изображение
- `protected setDisabled(query: SelectorElement<DisableableElement>, disabled: boolean): void` — установить disabled-состояние
- `protected toggleClass(query: SelectorElement<HTMLElement>, className: string, force?: boolean): void` — переключить CSS-класс
- `protected setValue<T extends HTMLElement>(query: SelectorElement<T>, value: ElementValue<T>): void` — универсальная установка значения элемента

---

### Screen<T, S> extends View

**Назначение:** Базовый класс для экранов верхнего уровня.

Screen получает Controller как settings и сам создаёт вложенные View в `init()`.

**Класс:** `Screen<T, S extends object> extends View<T, S>`

**Generic параметры:**
- `T` — тип данных для рендеринга
- `S` — тип настроек (обычно Controller)

**Конструктор:**
```typescript
constructor(settings: S)
```

---

### FormValidator<T>

**Назначение:** Валидатор форм через Standard Schema (Zod).

**Класс:** `FormValidator<T extends Record<string, unknown>> implements IFormValidator<T>`

**Generic параметры:**
- `T` — тип данных формы

**Поля:**
- `private values: Partial<T>` — текущие значения полей
- `private state: FormState<T>` — состояние формы (values, errors, valid)
- `private readonly initialValues: Partial<T>` — начальные значения
- `private readonly schema: StandardSchemaV1<T>` — схема валидации

**Конструктор:**
```typescript
constructor(schema: StandardSchemaV1<T>, initialValues: Partial<T>)
```

**Методы:**
- `setValue<K extends keyof T>(field: K, value: T[K]): void` — установить значение поля
- `getState(): FormState<T>` — получить текущее состояние
- `getValues(): Partial<T>` — получить текущие значения
- `getErrorsArray(): string[]` — получить ошибки как массив строк
- `get valid(): boolean` — валидна ли форма
- `reset(): void` — сбросить форму к начальным значениям

---

## Модель состояния

### AppState

**Назначение:** Централизованное хранилище состояния приложения.

**Класс:** `AppState implements IAppState`

**Поля:**
- `private _products: Map<ProductId, NormalizedProduct>` — каталог продуктов
- `private _basket: Set<ProductId>` — корзина
- `private _openedModal: AppStateModals` — текущее модальное окно
- `private _selectedProduct: ProductId | null` — ID выбранного продукта
- `private readonly settings: AppStateSettings` — настройки (onChange, валидаторы)

**Конструктор:**
```typescript
constructor(_api: ILarekApi, settings: AppStateSettings)
```

**Методы:**
- `protected notify(changed: AppStateChanges): void` — уведомить об изменении состояния
- `get products(): NormalizedProduct[]` — получить список всех продуктов
- `setProducts(products: Product[]): void` — загрузить продукты в каталог (нормализует price: null → 0)
- `getProduct(id: ProductId): NormalizedProduct | undefined` — получить продукт по ID
- `get basket(): ProductId[]` — получить ID товаров в корзине
- `addToBasket(id: ProductId): void` — добавить товар в корзину
- `removeFromBasket(id: ProductId): void` — удалить товар из корзины
- `clearBasket(): void` — очистить корзину
- `isInBasket(id: ProductId): boolean` — проверить, есть ли товар в корзине
- `getBasketTotal(): number` — получить общую сумму корзины
- `getBasketCount(): number` — получить количество товаров в корзине
- `getBasketProducts(): NormalizedProduct[]` — получить список продуктов в корзине
- `get openedModal(): AppStateModals` — получить текущее открытое модальное окно
- `openModal(modal: AppStateModals): void` — открыть модальное окно
- `get selectedProduct(): ProductId | null` — получить ID выбранного продукта
- `selectProduct(id: ProductId): void` — выбрать продукт для просмотра
- `get orderValidator(): IFormValidator<OrderFormValues>` — получить валидатор формы заказа
- `get contactsValidator(): IFormValidator<ContactsFormValues>` — получить валидатор формы контактов
- `resetValidators(): void` — сбросить валидаторы
- `notifyOrderChange(): void` — уведомить об изменении формы заказа
- `notifyContactsChange(): void` — уведомить об изменении формы контактов

---

### AppStateEmitter extends EventEmitter

**Назначение:** Обёртка над AppState с поддержкой событий.

**Класс:** `AppStateEmitter extends EventEmitter`

**Поля:**
- `public model: IAppState` — доступ к модели

**Конструктор:**
```typescript
constructor(api: ILarekApi, Model: AppStateConstructor, settings: AppStateEmitterSettings)
```

**Методы:**
- `onModelChange = (changed: AppStateChanges): void` — обработка изменений модели (эмитит события)

При `AppStateChanges.modal` эмитит:
1. `AppStateChanges.modal` — для закрытия предыдущих модалок
2. `AppStateModals.X` — для открытия текущей модалки

---

## События приложения

### AppStateChanges (изменения модели)

```typescript
enum AppStateChanges {
    products = 'state:products',   // Загружены продукты
    basket = 'state:basket',       // Изменена корзина
    modal = 'state:modal',         // Изменена модалка
    order = 'state:order',         // Изменена форма заказа
    contacts = 'state:contacts',   // Изменена форма контактов
}
```

### AppStateModals (модальные окна)

```typescript
enum AppStateModals {
    none = 'modal:none',
    product = 'modal:product',
    basket = 'modal:basket',
    order = 'modal:order',
    contacts = 'modal:contacts',
    success = 'modal:success',
}
```

---

## View-компоненты

### ButtonView<T>

**Назначение:** Отображение типовой кнопки.

**Класс:** `ButtonView<T = void> extends View<ButtonData, ButtonSettings<T>, HTMLButtonElement>`

**Generic параметры:**
- `T` — тип данных, передаваемых в onClick (по умолчанию void)

**Конструктор:**
```typescript
constructor(element: HTMLButtonElement, settings: ButtonSettings<T>)
```

**Методы:**
- `protected init(): void` — навешивает обработчик клика
- `set label(value: string)` — установить текст кнопки
- `set disabled(value: boolean)` — установить disabled-состояние
- `set active(value: boolean)` — установить активное состояние (если activeClass указан в settings)
- `static create(label: string, creator: ElementCreator<HTMLButtonElement>, onClick: (event: MouseEvent) => void): HTMLButtonElement` — фабричный метод для быстрого создания кнопки

---

### ChipView

**Назначение:** Простой View для отображения категории (chip/tag).

**Класс:** `ChipView extends View<ChipData, ChipSettings>`

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: ChipSettings)
```

**Методы:**
- `set category(value: ProductCategory)` — установить категорию (устанавливает label и CSS-класс)
- `static create(category: ProductCategory, creator: ElementCreator, settings: ChipSettings): HTMLElement` — фабричный метод для быстрого создания чипа

---

### ProductPreviewView

**Назначение:** View для карточки продукта в галерее.

**Класс:** `ProductPreviewView extends View<ProductPreviewData, ProductPreviewSettings, HTMLButtonElement>`

**Поля:**
- `private currentId!: ProductId` — ID текущего продукта для callback

**Конструктор:**
```typescript
constructor(element: HTMLButtonElement, settings: ProductPreviewSettings)
```

**Методы:**
- `protected init(): void` — навешивает обработчик клика
- `set id(value: ProductId)` — установить ID продукта
- `set category(value: ProductCategory)` — установить категорию (делегирует в ChipView)
- `set title(value: string)` — установить название
- `set image(value: string)` — установить изображение
- `set price(value: number | null)` — установить цену

---

### ProductModalView

**Назначение:** View для карточки продукта в модальном окне.

**Класс:** `ProductModalView extends View<ProductModalData, ProductModalSettings>`

**Поля:**
- `private buttonView: ButtonView` — кнопка "В корзину"
- `private chipView: ChipView` — чип категории

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: ProductModalSettings)
```

**Методы:**
- `protected init(): void` — создаёт вложенные View (ChipView, ButtonView)
- `set image(value: string)` — установить изображение
- `set title(value: string)` — установить название
- `set category(value: ProductCategory)` — установить категорию
- `set description(value: string)` — установить описание
- `set price(value: number | null)` — установить цену
- `set button(value: ButtonData)` — установить данные кнопки

---

### BasketProductView

**Назначение:** View для элемента корзины.

**Класс:** `BasketProductView extends View<BasketProductData, BasketProductSettings>`

**Поля:**
- `private currentId?: ProductId` — ID текущего элемента для callback

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: BasketProductSettings)
```

**Методы:**
- `protected init(): void` — навешивает обработчик на кнопку удаления
- `set id(value: ProductId)` — установить ID товара
- `set index(value: number)` — установить индекс
- `set title(value: string)` — установить название
- `set price(value: number)` — установить цену

---

### BasketModalView

**Назначение:** View для модалки корзины.

**Класс:** `BasketModalView extends View<BasketModalData, BasketModalSettings>`

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: BasketModalSettings)
```

**Методы:**
- `set items(value: BasketProductData[])` — установить список товаров (копирует itemView для каждого элемента)
- `set total(value: number)` — установить общую сумму
- `set button(value: ButtonData)` — установить данные кнопки

---

### FormView<K, D, S>

**Назначение:** Базовый класс для форм.

**Класс:** `FormView<K extends string, D extends FormViewData, S extends FormViewSettings<K>> extends View<D, S, HTMLFormElement>`

**Generic параметры:**
- `K` — тип имени поля (string literal)
- `D` — тип данных формы
- `S` — тип настроек формы

**Поля:**
- `protected fieldInputs: Map<K, HTMLInputElement>` — карта полей формы
- `protected submitButton: ButtonView` — кнопка submit

**Конструктор:**
```typescript
constructor(element: HTMLFormElement, settings: S)
```

**Методы:**
- `protected init(): void` — создаёт слушатели на input-поля и кнопку submit
- `setFieldValue(name: K, value: string | undefined): void` — установить значение поля
- `set error(value: string | undefined)` — установить ошибку
- `set button(value: ButtonData)` — установить данные кнопки submit

---

### OrderFormView

**Назначение:** View для формы заказа (шаг 1).

**Класс:** `OrderFormView extends FormView<OrderFormField, OrderFormData, OrderFormSettings>`

**Поля:**
- `private paymentGroup: OptionGroupView<PaymentMethod>` — группа выбора способа оплаты

**Конструктор:**
```typescript
constructor(element: HTMLFormElement, settings: OrderFormSettings)
```

**Методы:**
- `protected init(): void` — вызывает super.init() и создаёт OptionGroupView для оплаты
- `set payment(value: PaymentMethod | null)` — установить выбранный способ оплаты

---

### OptionGroupView<T>

**Назначение:** View для группы опций — выбор одной из нескольких.

**Класс:** `OptionGroupView<T> extends View<OptionGroupData<T>, OptionGroupSettings<T>>`

**Generic параметры:**
- `T` — тип значения опции (например, PaymentMethod)

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: OptionGroupSettings<T>)
```

**Методы:**
- `set selected(value: T | null)` — установить выбранное значение (обновляет active у всех кнопок)

---

### PageView

**Назначение:** View для главной страницы.

**Класс:** `PageView extends View<PageData, PageSettings>`

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: PageSettings)
```

**Методы:**
- `set basket(data: HeaderBasketData)` — обновить данные корзины в хедере
- `set gallery(items: HTMLElement[])` — установить галерею продуктов
- `set locked(value: boolean)` — заблокировать/разблокировать страницу

---

### HeaderBasketView

**Назначение:** View для кнопки корзины в хедере.

**Класс:** `HeaderBasketView extends View<HeaderBasketData, HeaderBasketSettings, HTMLButtonElement>`

**Конструктор:**
```typescript
constructor(element: HTMLButtonElement, settings: HeaderBasketSettings)
```

**Методы:**
- `protected init(): void` — навешивает обработчик клика
- `set counter(value: number)` — установить счётчик товаров

---

### OrderSuccessView

**Назначение:** View для экрана успешного заказа.

**Класс:** `OrderSuccessView extends View<OrderSuccessData, OrderSuccessSettings>`

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: OrderSuccessSettings)
```

**Методы:**
- `set total(value: number)` — установить сумму списания
- `set button(value: ButtonData)` — установить данные кнопки

---

### ModalView

**Назначение:** View для модального окна. Контейнер — один на всё приложение. Контент вставляется динамически.

**Класс:** `ModalView extends View<ModalData, ModalViewSettings> implements IModal`

**Поля:**
- `protected static _openedModal: ModalView | null` — текущая открытая модалка (всегда одна)
- `private static _listenersAttached: boolean` — флаг: слушатели уже навешены

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: ModalViewSettings)
```

**Методы:**
- `protected init(): void` — навешивает слушатели (только один раз для всего приложения)
- `protected handleClose(event?: MouseEvent): void` — обработчик закрытия
- `set content(value: HTMLElement | null)` — установить контент
- `open(): void` — открыть модалку
- `close(): void` — закрыть модалку программно (без вызова onClose)
- `setContent(content: HTMLElement): void` — установить контент (альтернатива сеттеру)
- `set isActive(value: boolean)` — открытие/закрытие через сеттер

---

## Screen-компоненты

### ModalScreen<T, S> extends Screen

**Назначение:** Базовый класс для модальных экранов.

Все модальные экраны используют один DOM-элемент `#modal-container` (не клонируют). Контент устанавливается при открытии, не при инициализации.

**Класс:** `ModalScreen<T, S extends ModalScreenSettings> extends Screen<T, S>`

**Generic параметры:**
- `T` — тип данных для рендеринга
- `S` — тип настроек (Controller)

**Поля:**
- `protected modal: ModalView` — контейнер модалки
- `protected content: HTMLElement` — контент модалки

**Конструктор:**
```typescript
constructor(settings: S)
```

**Методы:**
- `protected abstract initContent(): HTMLElement` — абстрактный метод: дочерние классы создают контент
- `protected init(): void` — создаёт ModalView и контент
- `set isActive(value: boolean)` — устанавливает контент и открывает/закрывает модалку

---

### PageScreen

**Назначение:** Экран главной страницы.

**Класс:** `PageScreen extends Screen<PageScreenData, PageScreenSettings>`

**Поля:**
- `private pageView: PageView` — View главной страницы
- `private productTemplate: ProductPreviewView` — шаблон карточки продукта

**Конструктор:**
```typescript
constructor(settings: PageScreenSettings)
```

**Методы:**
- `protected init(): void` — создаёт PageView, HeaderBasketView, ProductPreviewView
- `set products(items: NormalizedProduct[])` — рендер галереи продуктов
- `set basketCount(value: number)` — обновить счётчик корзины
- `set locked(value: boolean)` — блокировка страницы при открытой модалке

---

### ProductScreen extends ModalScreen

**Назначение:** Экран продукта в модалке.

**Класс:** `ProductScreen extends ModalScreen<ProductScreenData, ProductScreenSettings>`

**Поля:**
- `private productView: ProductModalView` — View продукта

**Конструктор:**
```typescript
constructor(settings: ProductScreenSettings)
```

**Методы:**
- `protected initContent(): HTMLElement` — создаёт ProductModalView
- `set title(value: string)` — установить название
- `set image(value: string)` — установить изображение
- `set category(value: ProductCategory)` — установить категорию
- `set description(value: string)` — установить описание
- `set price(value: number)` — установить цену
- `set isInBasket(value: boolean)` — установить состояние кнопки (Screen сам определяет label)

---

### BasketScreen extends ModalScreen

**Назначение:** Экран корзины в модалке.

**Класс:** `BasketScreen extends ModalScreen<BasketScreenData, BasketScreenSettings>`

**Поля:**
- `private basketView: BasketModalView` — View корзины

**Конструктор:**
```typescript
constructor(settings: BasketScreenSettings)
```

**Методы:**
- `protected initContent(): HTMLElement` — создаёт BasketModalView, BasketProductView, ButtonView
- `set items(value: BasketProductData[])` — установить список товаров
- `set total(value: number)` — установить общую сумму
- `set isDisabled(value: boolean)` — установить состояние кнопки (Screen определяет disabled)

---

### OrderScreen extends ModalScreen

**Назначение:** Экран формы заказа (шаг 1).

**Класс:** `OrderScreen extends ModalScreen<OrderScreenData, OrderScreenSettings>`

**Поля:**
- `private orderView: OrderFormView` — View формы заказа

**Конструктор:**
```typescript
constructor(settings: OrderScreenSettings)
```

**Методы:**
- `protected initContent(): HTMLElement` — создаёт OrderFormView
- `set payment(value: PaymentMethod | null)` — установить способ оплаты
- `set error(value: string | undefined)` — установить ошибку
- `set valid(value: boolean)` — установить состояние кнопки submit
- `setFieldValue(field: OrderFormField, value: string | undefined): void` — установить значение поля

---

### ContactsScreen extends ModalScreen

**Назначение:** Экран формы контактов (шаг 2).

**Класс:** `ContactsScreen extends ModalScreen<ContactsScreenData, ContactsScreenSettings>`

**Поля:**
- `private formView: ContactsFormView` — View формы контактов

**Конструктор:**
```typescript
constructor(settings: ContactsScreenSettings)
```

**Методы:**
- `protected initContent(): HTMLElement` — создаёт ContactsFormView
- `set error(value: string | undefined)` — установить ошибку
- `set valid(value: boolean)` — установить состояние кнопки submit
- `setFieldValue(field: ContactsFormField, value: string | undefined): void` — установить значение поля

---

### SuccessScreen extends ModalScreen

**Назначение:** Экран успешного заказа.

**Класс:** `SuccessScreen extends ModalScreen<SuccessScreenData, SuccessScreenSettings>`

**Поля:**
- `private successView: OrderSuccessView` — View успешного заказа

**Конструктор:**
```typescript
constructor(settings: SuccessScreenSettings)
```

**Методы:**
- `protected initContent(): HTMLElement` — создаёт OrderSuccessView, ButtonView
- `set total(value: number)` — установить сумму списания

---

## Контроллеры

### Controller<T>

**Назначение:** Абстрактный базовый класс для всех контроллеров.

**Класс:** `Controller<T>`

**Generic параметры:**
- `T` — тип модели состояния

**Поля:**
- `protected model: T` — модель состояния (инжектируется через конструктор)

**Конструктор:**
```typescript
constructor(model: T)
```

---

### PageController extends Controller

**Назначение:** Контроллер главной страницы.

**Класс:** `PageController extends Controller<IAppState> implements PageScreenSettings`

**Конструктор:**
```typescript
constructor(model: IAppState)
```

**Методы:**
- `onProductClick = (id: ProductId) => void` — клик по карточке продукта (выбирает продукт и открывает модалку)
- `onBasketClick = () => void` — клик по кнопке корзины (открывает модалку корзины)

---

### ProductController extends Controller

**Назначение:** Контроллер модалки продукта.

**Класс:** `ProductController extends Controller<IAppState> implements ProductScreenSettings`

**Конструктор:**
```typescript
constructor(model: IAppState)
```

**Методы:**
- `onToggleBasket = () => void` — добавить/убрать товар из корзины
- `onClose = () => void` — закрыть модалку

---

### BasketController extends Controller

**Назначение:** Контроллер корзины.

**Класс:** `BasketController extends Controller<IAppState> implements BasketScreenSettings`

**Конструктор:**
```typescript
constructor(model: IAppState)
```

**Методы:**
- `onRemove = (id: ProductId) => void` — удалить товар из корзины
- `onCheckout = () => void` — перейти к оформлению (открывает форму заказа)
- `onClose = () => void` — закрыть модалку

---

### OrderController extends Controller

**Назначение:** Контроллер формы заказа (шаг 1).

**Класс:** `OrderController extends Controller<IAppState> implements OrderScreenSettings`

**Конструктор:**
```typescript
constructor(model: IAppState)
```

**Методы:**
- `onPaymentChange = (method: PaymentMethod) => void` — изменение способа оплаты
- `onFieldChange = (field: OrderFormField, value: string) => void` — изменение поля формы
- `onSubmit = () => void` — submit формы (переход к контактам, если форма валидна)
- `onClose = () => void` — закрыть модалку

---

### ContactsController extends Controller

**Назначение:** Контроллер формы контактов (шаг 2).

**Класс:** `ContactsController extends Controller<IAppState> implements ContactsScreenSettings`

**Поля:**
- `private readonly api: ILarekApi` — API для отправки заказа

**Конструктор:**
```typescript
constructor(app: IAppState, api: ILarekApi)
```

**Методы:**
- `onFieldChange = (field: ContactsFormField, value: string) => void` — изменение поля формы
- `onSubmit = async () => Promise<void>` — submit формы (отправка заказа на сервер)
- `onClose = () => void` — закрыть модалку

---

### SuccessController extends Controller

**Назначение:** Контроллер успешного заказа.

**Класс:** `SuccessController extends Controller<IAppState> implements SuccessScreenSettings`

**Конструктор:**
```typescript
constructor(model: IAppState)
```

**Методы:**
- `onClose = () => void` — закрыть модалку, очистить корзину и сбросить валидаторы

---

## Типы данных

### Доменные типы (API)

```typescript
type ProductId = Brand<string, 'ProductId'>;
type OrderId = Brand<string, 'OrderId'>;
type ProductCategory = 'софт-скил' | 'хард-скил' | 'другое' | 'дополнительное' | 'кнопка';
type PaymentMethod = 'online' | 'cash';

interface Product {
    id: ProductId;
    title: string;
    description: string;
    image: string;
    category: ProductCategory;
    price: number | null;
}

interface NormalizedProduct extends Omit<Product, 'price'> {
    price: number;  // null → 0
}

interface OrderRequest {
    payment: PaymentMethod;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: ProductId[];
}

interface OrderResult {
    id: OrderId;
    total: number;
}
```

### Схемы форм (Zod)

```typescript
// Форма заказа (шаг 1)
const orderFormSchema = z.object({
    payment: z.enum(['online', 'cash']),
    address: z.string().min(5),
});
type OrderFormValues = z.infer<typeof orderFormSchema>;

// Форма контактов (шаг 2)
const contactsFormSchema = z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\+?[0-9\s\-()]{10,}$/),
});
type ContactsFormValues = z.infer<typeof contactsFormSchema>;
```

---

## Структура проекта

```
src/
├── components/
│   ├── base/          # EventEmitter, Api, View, Screen
│   ├── common/        # FormValidator
│   ├── view/          # View и Screen компоненты
│   ├── model/         # AppState, AppStateEmitter, LarekApi
│   └── controller/    # Контроллеры
├── types/
│   └── components/    # Типы (структура повторяет components/)
├── utils/
│   ├── constants.ts   # Селекторы, настройки
│   └── utils.ts       # Утилиты (formatPrice, cloneTemplate и др.)
├── scss/              # Стили
├── pages/
│   └── index.html     # HTML-шаблоны
└── index.ts           # Composition Root
```
