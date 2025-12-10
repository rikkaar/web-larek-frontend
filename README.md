# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base — папка с базовым кодом

Содержит базовые классы для компонентов: Api, EventEmitter
- src/components/view - папка с view-компонентами
- src/components/model - папка с model-компонентами
- src/components/controller - папка с controller-компонентами
- src/components/base/ — папка с базовым кодом
- src/types

Структура директории с типами точно повторяет структуру директории с компонентами

- src/utils - папка с утилитами
- src/config - папка с конфигурационными файлами

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

Проект применяет паттерн MVC, следует принципу SOLID, коммуникация между модулями обеспечена с помощью EventEmitter, код написан на Классах

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
