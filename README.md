# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

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

## Архитектура

Проект применяет паттерн **MVC**, следует принципам **SOLID**.
Коммуникация между модулями обеспечена через **EventEmitter**.

## Иерархия View-компонентов

```
IView<T, S>                              # Базовый интерфейс
│
├── Layouts (структурные контейнеры)
│   ├── Page                             # Главная страница
│   │   ├── basketCounter                # Счётчик корзины
│   │   ├── gallery: HTMLElement[]       # Слот для карточек
│   │   └── locked                       # Блокировка скролла
│   │
│   └── Modal                            # Контейнер модалки
│       └── content: HTMLElement         # Слот для контента
│
├── Items (элементы списков)
│   ├── ProductPreview                   # Карточка в галерее
│   └── BasketProduct                    # Элемент корзины
│
├── Screens (контент модалок) — IModalContent<D>
│   ├── ProductModal                     # Карточка продукта
│   ├── BasketModal                      # Корзина
│   │   └── itemView: IView              # Инжектированный View элемента
│   ├── OrderForm                        # Форма: оплата + адрес
│   ├── ContactsForm                     # Форма: email + телефон
│   └── OrderSuccess                     # Успешный заказ
│
└── Reusable (инжектируемые View)
    ├── ModalTitle                       # Заголовок модалки
    ├── ModalActions                     # Футер с кнопкой + ошибка
    └── BasketActions                    # Футер корзины (кнопка + сумма)
```

## Схема наследования базовых классов

```
                              ┌─────────────┐
                              │   IEvents   │
                              └──────┬──────┘
                                     │ implements
                              ┌──────▼──────┐
                              │EventEmitter │
                              └─────────────┘


                              ┌─────────────┐
                              │     Api     │
                              └──────┬──────┘
                                     │ extends
                              ┌──────▼──────┐
                              │  LarekApi   │
                              │             │
                              │ implements  │
                              │ ILarekApi   │
                              └─────────────┘


                   ┌────────────────────────────────────────────────────────┐
                   │                        IView<T,S>                      │
                   └─────────────────────────────┬──────────────────────────┘
                                                 │ implements
       ┌─────────────────────┬───────────────────┼───────────────────┬──────────────────┐
       │                     │                   │                   │                  │
┌──────▼──────┐       ┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐    ┌──────▼──────┐
│    Page     │       │   Modal     │     │ ModalTitle  │     │ModalActions │    │BasketActions│
└─────────────┘       └─────────────┘     └─────────────┘     └─────────────┘    └─────────────┘
                                                ▲                    ▲                  ▲
                                                │                    │                  │
                                                └────────────────────┴──────────────────┘
                                                          injected via settings
                                                                    │
                              ┌──────────────────────────────┬──────┴──────────────────────────┐
                              │                              │                                 │
                       ┌──────▼──────┐                ┌──────▼──────┐                   ┌──────▼──────┐
                       │ BasketModal │                │  OrderForm  │                   │ProductModal │
                       │             │                │ContactsForm │                   │OrderSuccess │
                       └─────────────┘                └─────────────┘                   └─────────────┘
                              │
                              │ itemView: IView<BasketProductData>
                              ▼
                       ┌─────────────┐
                       │BasketProduct│
                       └─────────────┘


                         ┌──────────────────┐
                         │ IFormValidator<T>│
                         └────────┬─────────┘
                                  │ implements
                         ┌────────▼─────────┐
                         │  FormValidator   │
                         │                  │
                         │  uses zod schema │
                         └──────────────────┘
```

---

## Потоки данных

### View → EventEmitter → Controller → Model → EventEmitter → Controller → View

```
┌─────────┐         ┌─────────────┐         ┌────────────┐         ┌─────────┐
│  View   │  emit   │EventEmitter │   on    │ Controller │  update │  Model  │
│         │────────→│             │────────→│            │────────→│         │
└─────────┘         └─────────────┘         └────────────┘         └─────────┘
     ▲                     ▲                      │                     │
     │                     │                      │                     │
     │ render(data)        │                      │ on                  │ emit
     │                     └──────────────────────┘◀────────────────────┘
     │                                            │
     └────────────────────────────────────────────┘
```

### Пример: добавление товара в корзину

```
1. [View: ProductModal]     Пользователь нажимает "В корзину"
              │
              │ events.emit('product:toggle', { id })
              ▼
2. [EventEmitter]     
              │
              │ Controller подписан: events.on('product:toggle', ...)
              ▼
3. [Controller]       
              │ appState.addToBasket(id)
              ▼
4. [Model: AppState]         
              │ this.basket.push(id)
              │ events.emit('basket:changed', { items, total })
              ▼
5. [EventEmitter]     
              │
              │ Controller подписан: events.on('basket:changed', ...)
              ▼
6. [Controller]       
              │ page.render({ basketCounter: items.length })
              │ productModal.render({ button: { label: 'Убрать' } })
              ▼
7. [View]             UI обновлён
```

## FormValidator: архитектурное решение

### Проблема

Текущая вёрстка форм использует **кастомные элементы** (toggle-кнопки для оплаты), 
которые не являются стандартными `<input type="radio">`. 

Изначально рассматривался вариант использования **HTML5 Constraint Validation API**:

```html
<!-- Стандартный подход -->
<input type="radio" name="payment" value="online" required />
<input type="radio" name="payment" value="cash" />
```

Однако в текущей вёрстке:

```html
<!-- Фактическая вёрстка -->
<button name="card" type="button">Онлайн</button>
<button name="cash" type="button">При получении</button>
```

### Принятое решение

Использование HTML5 Constraint Validation API в данном случае привело бы к размазыванию ответственности: часть валидации происходила бы нативно через атрибуты `required`, `pattern`, а часть — через JavaScript для кастомных элементов вроде toggle-кнопок. Такой гибрид усложняет понимание логики и делает поведение формы непредсказуемым.

Кастомный JavaScript-валидатор на базе zod показался более перспективным решением. Он позволяет держать всю логику валидации в одном месте, работает одинаково для любых элементов UI независимо от их HTML-реализации, и при этом обеспечивает типобезопасность — zod-схемы автоматически выводят TypeScript-типы для данных формы.

### Архитектура FormValidator

```
FormValidator — инструмент Controller'а

View (глупый):
  - Слушает DOM-события
  - emit в EventEmitter
  - render(data) — только отображение

Controller (умный):
  - Слушает события от View
  - Использует FormValidator
  - Принимает решения
  - Обновляет View

FormValidator (чистый):
  - Хранит состояние формы
  - Валидирует через zod
  - Возвращает результаты
  - НЕ emit событий
  - НЕ обновляет DOM
```

Это решение соответствует принципу **SRP** — каждый компонент имеет одну ответственность,
и **DIP** — Controller зависит от абстракции (IFormValidator), а не от конкретной реализации.

---

## Установка и запуск

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
