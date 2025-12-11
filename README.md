# Проектная работа "Веб-ларек"

## Архитектура

Проект применяет паттерн **MVC**, следует принципам **SOLID**.
Коммуникация между модулями обеспечена через **EventEmitter**.

**Стек:** HTML, SCSS, TypeScript, Webpack, Zod

### Основные части архитектуры

Архитектура построена на паттерне **Model-View-Controller (MVC)**:

**Model (Модель)** — хранит состояние приложения (каталог, корзина, данные заказа), инкапсулирует бизнес-логику (валидация, расчёты), работает с внешним API. При изменении данных уведомляет подписчиков через события.

**View (Представление)** — отображает данные пользователю, обрабатывает пользовательский ввод (клики, ввод текста), генерирует UI-события для Controller. Не содержит бизнес-логики.

**Controller (Контроллер)** — связующее звено между Model и View. Подписывается на события от обоих слоёв, обновляет Model в ответ на действия пользователя, обновляет View при изменении данных.

**EventEmitter** — брокер событий, обеспечивающий слабую связанность между Model и View. Компоненты не знают друг о друге напрямую, а общаются через события. Controller подписывается на события и координирует взаимодействие.


## Инструкция по сборке и запуску

```bash
npm install
npm run start
```

или

```bash
yarn
yarn start
```

## Сборка

```bash
npm run build
```

или

```bash
yarn build
```

## Описание базовых классов, их предназначение и функции

Базовые классы находятся в `src/components/base/` и предоставляют фундаментальную функциональность для всех компонентов приложения.

---

### EventEmitter

**Назначение:** Брокер событий, реализующий паттерн «Наблюдатель» (Observer). Обеспечивает слабую связанность между компонентами приложения — компоненты не знают друг о друге, а общаются через события.

**Имплементирует интерфейс:** `IEvents`

```typescript
interface IEvents {
    // Подписаться на событие
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    // Инициировать событие с данными
    emit<T extends object>(event: string, data?: T): void;
    // Создать callback-триггер, генерирующий событие при вызове
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

**Используемые типы:**

```typescript
// Имя события — строка или регулярное выражение (для паттернов)
type EventName = string | RegExp;

// Функция-обработчик события
type Subscriber = Function;

// Событие для подписки на все события (onAll)
type EmitterEvent = {
    eventName: string;  // Имя произошедшего события
    data: unknown;      // Данные события
};
```

**Конструктор:**
```typescript
constructor()
```
Инициализирует пустую `Map` для хранения подписчиков.

**Свойства:**

| Свойство | Тип | Описание |
|----------|-----|----------|
| `_events` | `Map<EventName, Set<Subscriber>>` | Хранилище подписчиков: ключ — имя события, значение — множество обработчиков |

**Методы:**

| Метод | Сигнатура | Описание |
|-------|-----------|----------|
| `on` | `on<T>(event: EventName, callback: (data: T) => void): void` | Подписаться на событие. Поддерживает строки и RegExp для паттернов |
| `off` | `off(event: EventName, callback: Subscriber): void` | Отписаться от события |
| `emit` | `emit<T>(event: string, data?: T): void` | Инициировать событие. Вызывает всех подписчиков, включая паттерны и `*` |
| `onAll` | `onAll(callback: (event: EmitterEvent) => void): void` | Подписаться на все события (для отладки) |
| `offAll` | `offAll(): void` | Сбросить все подписки |
| `trigger` | `trigger<T>(event: string, context?: Partial<T>): (data: T) => void` | Создать функцию, которая при вызове генерирует событие |

---

### Api

**Назначение:** Базовый HTTP-клиент для работы с REST API. Инкапсулирует логику запросов, обработку ответов и ошибок.

**Конструктор:**
```typescript
constructor(baseUrl: string, options: RequestInit = {})
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `baseUrl` | `string` | Базовый URL API (например, `https://api.example.com`) |
| `options` | `RequestInit` | Дополнительные опции fetch (headers, credentials и др.) |

**Свойства:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `baseUrl` | `readonly` | `string` | Базовый URL для всех запросов |
| `options` | `protected` | `RequestInit` | Опции запроса (заголовки `Content-Type: application/json` добавляются автоматически) |

**Методы:**

| Метод | Сигнатура | Описание |
|-------|-----------|----------|
| `get` | `get<T>(uri: string): Promise<T>` | GET-запрос. Возвращает типизированный результат |
| `post` | `post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>` | POST/PUT/DELETE-запрос с телом |
| `handleResponse` | `protected handleResponse<T>(response: Response): Promise<T>` | Обработка ответа: парсинг JSON, обработка ошибок |

**Используемые типы:**

```typescript
// Методы для запросов с телом
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Типичный ответ API со списком
type ApiListResponse<T> = {
    total: number;  // Общее количество элементов
    items: T[];     // Массив элементов
};
```

---

### IView (Интерфейс)

**Назначение:** Базовый контракт для всех View-компонентов. Определяет единый интерфейс работы с представлениями.

```typescript
interface IView<T, S = object> {
    element: HTMLElement;              // Корневой DOM-элемент компонента
    copy(settings?: S): IView<T>;      // Копирующий конструктор (клонирование шаблона)
    render(data?: Partial<T>): HTMLElement;  // Отрисовка с данными
}
```

| Generic | Описание |
|---------|----------|
| `T` | Тип данных для рендеринга (например, `ProductPreviewData`) |
| `S` | Тип настроек компонента (callbacks, вложенные View) |

**Дополнительные интерфейсы для View:**

```typescript
// Для кликабельных элементов (карточки, кнопки)
interface IClickable<T> {
    onClick: (args: { event: MouseEvent; item?: T }) => void;
}

// Для элементов с изменяемым значением (инпуты)
interface IChangeable<T> {
    onChange: (args: { event: Event; value?: T }) => void;
}

// Для выбираемых элементов (списки, радиокнопки)
interface ISelectable<T> {
    onSelect: (args: { event: Event; value?: T }) => void;
}
```

---

### View (Абстрактный класс)

**Назначение:** Базовый абстрактный класс для всех View-компонентов. Предоставляет общую функциональность работы с DOM-элементами и реализует паттерн «Шаблон» (Template Method).

**Имплементирует:** `IView<T, S>`

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings?: S)
```

| Параметр | Тип | Описание |
|----------|-----|----------|
| `element` | `HTMLElement` | Корневой DOM-элемент компонента (обычно клонируется из `<template>`) |
| `settings` | `S` | Настройки компонента: callbacks, вложенные View (опционально) |

**Свойства:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `element` | `readonly` | `HTMLElement` | Корневой DOM-элемент компонента |
| `settings` | `protected` | `S` | Настройки, переданные в конструктор |

**Методы:**

| Метод | Сигнатура | Описание |
|-------|-----------|----------|
| `render` | `render(data?: Partial<T>): HTMLElement` | Отрисовка компонента с данными. Возвращает корневой элемент |
| `copy` | `copy(settings?: S): IView<T>` | Создаёт копию View (клонирует element, применяет settings) |

---

## Описание компонентов, их функций и связей с другими компонентами

### Типы данных приложения

#### Доменные типы (API)

Типы данных, получаемых из API и используемых в бизнес-логике:

```typescript
// Брендированные типы для идентификаторов (предотвращают смешивание ID разных сущностей)
type ProductId = Brand<string, 'ProductId'>;
type OrderId = Brand<string, 'OrderId'>;

// Категории товаров
type ProductCategory = 'софт-скил' | 'хард-скил' | 'другое' | 'дополнительное' | 'кнопка';

// Способ оплаты
type PaymentMethod = 'online' | 'cash';
```

```typescript
// Товар
interface Product {
    id: ProductId;           // Уникальный идентификатор
    title: string;           // Название
    description: string;     // Описание
    image: string;           // URL изображения
    category: ProductCategory; // Категория
    price: number | null;    // Цена (null = бесценно)
}

// Запрос на создание заказа
interface OrderRequest {
    payment: PaymentMethod;  // Способ оплаты
    email: string;           // Email покупателя
    phone: string;           // Телефон
    address: string;         // Адрес доставки
    total: number;           // Сумма заказа
    items: ProductId[];      // ID товаров
}

// Результат создания заказа
interface OrderResult {
    id: OrderId;             // ID созданного заказа
    total: number;           // Списанная сумма
}
```

#### Типы состояния приложения

```typescript
// Данные формы заказа (шаг 1)
interface OrderData {
    payment: PaymentMethod | null;  // Выбранный способ оплаты
    address: string;                // Адрес доставки
}

// Данные формы контактов (шаг 2)
interface ContactsData {
    email: string;   // Email
    phone: string;   // Телефон
}

// Ошибки валидации форм
interface FormErrors {
    payment?: string;
    address?: string;
    email?: string;
    phone?: string;
}
```

---

### Компоненты Model-слоя

#### LarekApi

**Расположение:** `components/model/larekApi.ts`

**Назначение:** Клиент для работы с API магазина. Наследует базовый `Api`, добавляет специфичные методы и обработку CDN для изображений.

**Имплементирует:** `ILarekApi`

```typescript
interface ILarekApi {
    getProducts(): Promise<Product[]>;           // Получить каталог товаров
    getProduct(id: string): Promise<Product>;    // Получить товар по ID
    createOrder(order: OrderRequest): Promise<OrderResult>;  // Создать заказ
}
```

**Конструктор:**
```typescript
constructor(cdn: string, baseUrl: string, options?: RequestInit)
```

| Параметр | Описание |
|----------|----------|
| `cdn` | URL CDN для изображений |
| `baseUrl` | Базовый URL API |
| `options` | Опции fetch |

---

#### AppState

**Расположение:** `components/model/appState.ts`

**Назначение:** Централизованное хранилище состояния приложения. Управляет каталогом, корзиной, заказом. Генерирует события при изменениях.

**Имплементирует:** `IAppState`

```typescript
interface IAppState {
    // === Каталог ===
    products: Product[];                          // Список товаров
    setProducts(products: Product[]): void;       // Установить каталог
    getProduct(id: ProductId): Product | undefined; // Получить товар

    // === Корзина ===
    basket: ProductId[];                          // ID товаров в корзине
    addToBasket(id: ProductId): void;             // Добавить в корзину
    removeFromBasket(id: ProductId): void;        // Удалить из корзины
    clearBasket(): void;                          // Очистить корзину
    isInBasket(id: ProductId): boolean;           // Проверить наличие
    getBasketTotal(): number;                     // Сумма корзины
    getBasketCount(): number;                     // Количество товаров

    // === Заказ ===
    order: OrderData;                             // Данные заказа
    setOrderField(field: keyof OrderData, value: string | PaymentMethod): void;
    validateOrder(): FormErrors;                  // Валидация заказа

    // === Контакты ===
    contacts: ContactsData;                       // Данные контактов
    setContactsField(field: keyof ContactsData, value: string): void;
    validateContacts(): FormErrors;               // Валидация контактов

    // === Общее ===
    formErrors: FormErrors;                       // Текущие ошибки
    clearOrder(): void;                           // Сбросить заказ
}
```

**Генерируемые события:**
- `products:changed` — при обновлении каталога
- `basket:changed` — при изменении корзины
- `order:changed` — при изменении данных заказа
- `contacts:changed` — при изменении контактов
- `formErrors:changed` — при изменении ошибок валидации

---

### Компоненты View-слоя

Все View-компоненты наследуют базовый класс `View` и реализуют интерфейс `IView<T, S>`. Это означает, что каждый компонент имеет:
- **`element`** — корневой DOM-элемент компонента
- **`render(data)`** — метод отрисовки, возвращающий `element`
- **`copy(settings)`** — метод клонирования View

Ниже описаны только **специфичные** свойства и методы каждого компонента.

Все View-компоненты следуют паттерну **Dependency Injection**: вложенные компоненты и callbacks передаются через `settings`, а не создаются внутри.

#### PageView

**Назначение:** Управление главной страницей — галереей товаров, счётчиком корзины, блокировкой при открытой модалке.

**Данные (`PageData`):**
```typescript
interface PageData {
    basketCounter: number;    // Число товаров в корзине
    gallery: HTMLElement[];   // Карточки товаров для галереи
    locked: boolean;          // Заблокирована ли страница (модалка открыта)
}
```

**Настройки (`PageSettings`):**
```typescript
interface PageSettings {
    onBasketClick: () => void;  // Callback клика по кнопке корзины
}
```

**Класс `PageView<PageData, PageSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `gallery` | `protected` | `HTMLElement` | Контейнер галереи (`.gallery`) |
| `basketButton` | `protected` | `HTMLButtonElement` | Кнопка корзины в хедере |
| `basketCounter` | `protected` | `HTMLElement` | Счётчик товаров в корзине |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: PageSettings)
```

---

#### ModalView

**Назначение:** Контейнер модального окна. Управляет открытием/закрытием, подстановкой контента.

**Данные (`ModalData`):**
```typescript
interface ModalData {
    content: HTMLElement | null;  // Контент модалки
}
```

**Настройки (`ModalSettings`):**
```typescript
interface ModalSettings {
    onClose: () => void;  // Callback закрытия модалки
}
```

**Интерфейс (`IModal`):**
```typescript
interface IModal {
    open(): void;                        // Открыть модалку
    close(): void;                       // Закрыть модалку
    setContent(content: HTMLElement): void;  // Установить контент
}
```

**Класс `ModalView<ModalData, ModalSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `contentContainer` | `protected` | `HTMLElement` | Элемент `.modal__content` для контента |
| `closeButton` | `protected` | `HTMLButtonElement` | Кнопка закрытия |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: ModalSettings)
```

---

#### Контент модалки (ModalContent)

Все модальные окна используют общий контейнер `ModalView`, в который подставляется контент. Контент модалок может включать опциональные View для заголовка и футера.

**Базовые данные контента (`ModalContentData`):**
```typescript
interface ModalContentData {
    title?: string;  // Заголовок модалки (опционально)
}
```

**Базовые настройки контента (`ModalContentSettings`):**
```typescript
interface ModalContentSettings {
    titleView?: IView<ModalTitleData>;     // Инжектируемый View заголовка
    actionsView?: IView<ModalActionsData>; // Инжектируемый View футера
}
```

---

#### ModalTitleView (Заголовок модалки)

**Назначение:** Отображение заголовка модального окна.

**Данные (`ModalTitleData`):**
```typescript
interface ModalTitleData {
    title: string;  // Текст заголовка
}
```

**Класс `ModalTitleView<ModalTitleData>`:**

**Конструктор:**
```typescript
constructor(element: HTMLElement)
```

---

#### ModalActionsView (Футер модалки)

**Назначение:** Футер модалки с кнопкой действия и отображением ошибок.

**Данные (`ModalActionsData`):**
```typescript
interface ModalActionsData {
    button: ButtonData;  // { label: string, disabled?: boolean }
    error?: string;      // Текст ошибки валидации
}
```

**Настройки (`ModalActionsSettings`):**
```typescript
interface ModalActionsSettings {
    onSubmit: () => void;  // Callback отправки
}
```

**Класс `ModalActionsView<ModalActionsData, ModalActionsSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `button` | `protected` | `HTMLButtonElement` | Кнопка действия |
| `errorElement` | `protected` | `HTMLElement` | Элемент для ошибок |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: ModalActionsSettings)
```

---

#### ProductPreviewView

**Назначение:** Карточка товара в галерее (каталоге).

**Данные (`ProductPreviewData`):**
```typescript
interface ProductPreviewData {
    id: ProductId;
    title: string;
    image: string;
    price: number | null;
    category: ProductCategory;
}
```

**Настройки (`ProductPreviewSettings`):**
```typescript
interface ProductPreviewSettings {
    onClick: (id: ProductId) => void;  // Клик по карточке
}
```

**Класс `ProductPreviewView<ProductPreviewData, ProductPreviewSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `titleElement` | `protected` | `HTMLElement` | Название товара |
| `imageElement` | `protected` | `HTMLImageElement` | Изображение |
| `priceElement` | `protected` | `HTMLElement` | Цена |
| `categoryElement` | `protected` | `HTMLElement` | Категория |
| `productId` | `protected` | `ProductId` | ID текущего товара |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: ProductPreviewSettings)
```

---

#### ProductModalView

**Назначение:** Детальная карточка товара в модалке с кнопкой добавления в корзину.

**Данные (`ProductModalData`):**
```typescript
interface ProductModalData extends ModalContentData {
    id: ProductId;
    image: string;
    price: number | null;
    category: ProductCategory;
    description: string;
    button: ButtonData;  // { label, disabled }
}
```

**Настройки (`ProductModalSettings`):**
```typescript
interface ProductModalSettings extends ModalContentSettings {
    actionsView: IView<ModalActionsData>;           // Инжектируемый View футера
    onToggleBasket: (id: ProductId) => void;        // Добавить/убрать из корзины
}
```

**Класс `ProductModalView<ProductModalData, ProductModalSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `titleElement` | `protected` | `HTMLElement` | Название товара |
| `imageElement` | `protected` | `HTMLImageElement` | Изображение |
| `priceElement` | `protected` | `HTMLElement` | Цена |
| `categoryElement` | `protected` | `HTMLElement` | Категория |
| `descriptionElement` | `protected` | `HTMLElement` | Описание |
| `buttonElement` | `protected` | `HTMLButtonElement` | Кнопка «В корзину» |
| `productId` | `protected` | `ProductId` | ID текущего товара |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: ProductModalSettings)
```

---

#### BasketModalView

**Назначение:** Модалка корзины со списком товаров и кнопкой оформления.

**Данные (`BasketModalData`):**
```typescript
interface BasketModalData extends ModalContentData {
    items: BasketProductData[];  // Товары в корзине
    total: number;               // Сумма
    button: ButtonData;          // Кнопка "Оформить"
}
```

**Настройки (`BasketModalSettings`):**
```typescript
interface BasketModalSettings extends ModalContentSettings {
    itemView: IView<BasketProductData>;      // View элемента корзины (DI)
    actionsView: IView<BasketActionsData>;   // View футера (DI)
    onDelete: (id: ProductId) => void;       // Удаление товара
    onSubmit: () => void;                    // Оформление заказа
}
```

**Класс `BasketModalView<BasketModalData, BasketModalSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `listElement` | `protected` | `HTMLUListElement` | Список товаров (`.basket__list`) |
| `totalElement` | `protected` | `HTMLElement` | Общая сумма |
| `button` | `protected` | `HTMLButtonElement` | Кнопка «Оформить» |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: BasketModalSettings)
```

---

#### BasketProductView (Элемент корзины)

**Назначение:** Отображение одного товара в списке корзины.

**Данные (`BasketProductData`):**
```typescript
interface BasketProductData {
    id: ProductId;     // ID товара
    title: string;     // Название
    price: number;     // Цена
}
```

**Настройки (`BasketProductSettings`):**
```typescript
interface BasketProductSettings {
    onDelete: (id: ProductId) => void;  // Удаление товара
}
```

**Класс `BasketProductView<BasketProductData, BasketProductSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `indexElement` | `protected` | `HTMLElement` | Номер позиции |
| `titleElement` | `protected` | `HTMLElement` | Название |
| `priceElement` | `protected` | `HTMLElement` | Цена |
| `deleteButton` | `protected` | `HTMLButtonElement` | Кнопка удаления |
| `productId` | `protected` | `ProductId` | ID товара |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: BasketProductSettings)
```

---

#### OrderFormView

**Назначение:** Форма заказа (шаг 1) — выбор оплаты и ввод адреса.

**Данные (`OrderFormData`):**
```typescript
interface OrderFormData extends ModalContentData {
    payment: PaymentMethod | null;  // Выбранный способ оплаты
    address: string;                // Адрес
    button: ButtonData;             // Кнопка "Далее"
    error?: string;                 // Текст ошибки
}
```

**Настройки (`OrderFormSettings`):**
```typescript
interface OrderFormSettings extends ModalContentSettings {
    actionsView: IView<ModalActionsData>;
    onPaymentChange: (method: PaymentMethod) => void;  // Смена оплаты
    onAddressChange: (value: string) => void;          // Ввод адреса
    onSubmit: () => void;                              // Отправка формы
}
```

**Класс `OrderFormView<OrderFormData, OrderFormSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `cardButton` | `protected` | `HTMLButtonElement` | Кнопка «Онлайн» |
| `cashButton` | `protected` | `HTMLButtonElement` | Кнопка «При получении» |
| `addressInput` | `protected` | `HTMLInputElement` | Поле адреса |
| `button` | `protected` | `HTMLButtonElement` | Кнопка «Далее» |
| `errorElement` | `protected` | `HTMLElement` | Элемент ошибок |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: OrderFormSettings)
```

---

#### ContactsFormView

**Назначение:** Форма контактов (шаг 2) — email и телефон.

**Данные (`ContactsFormData`):**
```typescript
interface ContactsFormData extends ModalContentData {
    email: string;
    phone: string;
    button: ButtonData;
    error?: string;
}
```

**Настройки (`ContactsFormSettings`):**
```typescript
interface ContactsFormSettings extends ModalContentSettings {
    actionsView: IView<ModalActionsData>;
    onEmailChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    onSubmit: () => void;
}
```

**Класс `ContactsFormView<ContactsFormData, ContactsFormSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `emailInput` | `protected` | `HTMLInputElement` | Поле email |
| `phoneInput` | `protected` | `HTMLInputElement` | Поле телефона |
| `button` | `protected` | `HTMLButtonElement` | Кнопка «Оплатить» |
| `errorElement` | `protected` | `HTMLElement` | Элемент ошибок |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: ContactsFormSettings)
```

---

#### OrderSuccessView

**Назначение:** Экран успешного оформления заказа.

**Данные (`OrderSuccessData`):**
```typescript
interface OrderSuccessData extends ModalContentData {
    total: number;       // Списанная сумма
    button: ButtonData;  // Кнопка "За новыми покупками"
}
```

**Настройки (`OrderSuccessSettings`):**
```typescript
interface OrderSuccessSettings extends ModalContentSettings {
    onClick: () => void;  // Клик по кнопке
}
```

**Класс `OrderSuccessView<OrderSuccessData, OrderSuccessSettings>`:**

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `titleElement` | `protected` | `HTMLElement` | Заголовок |
| `descriptionElement` | `protected` | `HTMLElement` | Описание (сумма списания) |
| `button` | `protected` | `HTMLButtonElement` | Кнопка «За новыми покупками» |

**Конструктор:**
```typescript
constructor(element: HTMLElement, settings: OrderSuccessSettings)
```

---

### События приложения

Все события типизированы через `AppEventMap`:

**UI Events (View → Controller):**
| Событие | Данные | Описание |
|---------|--------|----------|
| `basket:open` | — | Открыть корзину |
| `product:select` | `{ id: ProductId }` | Выбрать товар |
| `product:add` | `{ id: ProductId }` | Добавить в корзину |
| `product:remove` | `{ id: ProductId }` | Убрать из корзины |
| `basket:remove` | `{ id: ProductId }` | Удалить из корзины |
| `basket:submit` | — | Оформить заказ |
| `order:input` | `{ field, value }` | Ввод в форме заказа |
| `order:submit` | — | Отправить форму заказа |
| `contacts:input` | `{ field, value }` | Ввод в форме контактов |
| `contacts:submit` | — | Отправить форму контактов |
| `modal:close` | — | Закрыть модалку |
| `success:close` | — | Закрыть окно успеха |

**Model Events (Model → View):**
| Событие | Данные | Описание |
|---------|--------|----------|
| `products:changed` | `{ items: Product[] }` | Каталог обновлён |
| `basket:changed` | `{ items, total, count }` | Корзина изменена |
| `order:changed` | — | Данные заказа изменены |
| `contacts:changed` | — | Контакты изменены |
| `formErrors:changed` | `{ errors: FormErrors }` | Ошибки валидации |

---

### Компоненты Controller-слоя

Контроллеры связывают Model и View, подписываясь на события и координируя взаимодействие.

**Иерархия компонентов:**
- **Простые View** — компоненты без контроллера, управляются родительским View (`ProductPreviewView`, `BasketProductView`, `ModalTitleView`, `ModalActionsView`)
- **View с контроллером** — самостоятельные экраны приложения (`PageView`, `ModalView`, `ProductModalView`, `BasketModalView`, `OrderFormView`, `ContactsFormView`, `OrderSuccessView`)

---

#### Controller (Базовый класс)

**Назначение:** Абстрактный базовый класс для всех контроллеров. Хранит ссылку на модель.

```typescript
class Controller<T> {
    constructor(protected model: T) {}
}
```

| Свойство | Модификатор | Тип | Описание |
|----------|-------------|-----|----------|
| `model` | `protected` | `T` | Модель состояния (инжектируется через конструктор) |

---

#### MainController<AppState>

**Обслуживает:** `PageView`

**Назначение:** Управление главной страницей — галерея, хедер, блокировка при модалке.

**Слушает события:**
| Событие | Действие |
|---------|----------|
| `products:changed` | Рендерит галерею карточек |
| `basket:changed` | Обновляет счётчик в хедере |
| `modal:open` | Блокирует прокрутку страницы |
| `modal:close` | Разблокирует прокрутку страницы |

**Методы:**
| Метод | Описание |
|-------|----------|
| `init()` | Инициализация View, подписка на события |
| `renderGallery(products: Product[])` | Рендерит карточки товаров в галерею |
| `updateBasketCounter(count: number)` | Обновляет счётчик корзины |
| `handleProductClick(id: ProductId)` | Emit `product:select` |
| `handleBasketClick()` | Emit `basket:open` |
| `lockPage()` | Блокирует прокрутку |
| `unlockPage()` | Разблокирует прокрутку |

---

#### ModalController<AppState>

**Обслуживает:** `ModalView`

**Назначение:** Управление контейнером модалки — открытие, закрытие, подстановка контента.

**Слушает события:**
| Событие | Действие |
|---------|----------|
| `modal:close` | Закрывает модалку |

**Методы:**
| Метод | Описание |
|-------|----------|
| `init()` | Инициализация, подписка на события |
| `open(content: HTMLElement)` | Открывает модалку с контентом, emit `modal:open` |
| `close()` | Закрывает модалку |
| `handleClose()` | Обработчик закрытия — emit `modal:close` |

---

#### ProductController<AppState>

**Обслуживает:** `ProductModalView`

**Назначение:** Управление детальной карточкой товара в модалке.

**Слушает события:**
| Событие | Действие |
|---------|----------|
| `product:select` | Рендерит карточку и открывает модалку |
| `product:add` | Добавляет товар в корзину |
| `product:remove` | Убирает товар из корзины |

**Методы:**
| Метод | Описание |
|-------|----------|
| `init()` | Инициализация View, подписка на события |
| `showProduct(id: ProductId)` | Получает данные, рендерит карточку, открывает модалку |
| `handleToggleBasket(id: ProductId)` | Emit `product:add` или `product:remove` |
| `getButtonState(id: ProductId)` | Возвращает текст и состояние кнопки |

---

#### BasketController<AppState>

**Обслуживает:** `BasketModalView`

**Назначение:** Управление модалкой корзины.

**Слушает события:**
| Событие | Действие |
|---------|----------|
| `basket:open` | Рендерит корзину и открывает модалку |
| `basket:changed` | Перерисовывает содержимое корзины |
| `basket:remove` | Удаляет товар из корзины |

**Методы:**
| Метод | Описание |
|-------|----------|
| `init()` | Инициализация View, подписка на события |
| `showBasket()` | Рендерит корзину, открывает модалку |
| `renderBasket()` | Перерисовывает список товаров |
| `handleDelete(id: ProductId)` | Удаляет товар из модели |
| `handleSubmit()` | Emit `basket:submit` |

---

#### OrderController<AppState>

**Обслуживает:** `OrderFormView`

**Назначение:** Управление формой заказа (шаг 1).

**Слушает события:**
| Событие | Действие |
|---------|----------|
| `basket:submit` | Открывает форму заказа |
| `order:input` | Обновляет поле, валидирует |
| `formErrors:changed` | Обновляет отображение ошибок |

**Методы:**
| Метод | Описание |
|-------|----------|
| `init()` | Инициализация View, подписка на события |
| `showOrderForm()` | Рендерит форму, открывает модалку |
| `handlePaymentChange(method: PaymentMethod)` | Обновляет способ оплаты в модели |
| `handleAddressChange(value: string)` | Обновляет адрес в модели |
| `handleSubmit()` | Валидирует, emit `order:submit` |
| `updateErrors(errors: FormErrors)` | Обновляет отображение ошибок |

---

#### ContactsController<AppState>

**Обслуживает:** `ContactsFormView`

**Назначение:** Управление формой контактов (шаг 2).

**Слушает события:**
| Событие | Действие |
|---------|----------|
| `order:submit` | Открывает форму контактов |
| `contacts:input` | Обновляет поле, валидирует |
| `formErrors:changed` | Обновляет отображение ошибок |

**Методы:**
| Метод | Описание |
|-------|----------|
| `init()` | Инициализация View, подписка на события |
| `showContactsForm()` | Рендерит форму, открывает модалку |
| `handleEmailChange(value: string)` | Обновляет email в модели |
| `handlePhoneChange(value: string)` | Обновляет телефон в модели |
| `handleSubmit()` | Валидирует, отправляет заказ на сервер |
| `updateErrors(errors: FormErrors)` | Обновляет отображение ошибок |

---

#### SuccessController<AppState>

**Обслуживает:** `OrderSuccessView`

**Назначение:** Управление экраном успешного заказа.

**Слушает события:**
| Событие | Действие |
|---------|----------|
| `order:success` | Показывает экран успеха |

**Методы:**
| Метод | Описание |
|-------|----------|
| `init()` | Инициализация View, подписка на события |
| `showSuccess(total: number)` | Рендерит View с суммой списания |
| `handleClose()` | Очищает данные, emit `success:close` |

---

## Структура проекта

```
src/
├── components/
│   ├── base/          # Базовые классы (Api, EventEmitter, View)
│   ├── view/          # View-компоненты
│   ├── model/         # Model-компоненты
│   └── controller/    # Controller-компоненты
├── types/
│   └── components/    # Типы (структура повторяет components/)
│       ├── base/
│       ├── view/
│       ├── model/
│       └── common/    # Общие типы (FormValidator, схемы)
├── utils/
│   ├── constants.ts   # Конфигурация, селекторы
│   └── utils.ts       # Утилиты
├── pages/
│   └── index.html     # HTML-шаблоны
└── index.ts           # Точка входа (Controller)
```
