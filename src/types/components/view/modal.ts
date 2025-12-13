/**
 * Типы для Modal View
 */

import { IView } from '@/types/components/base/view';
import { ButtonData } from './button';

// ============================================================================
// Modal Title (заголовок)
// ============================================================================

/**
 * Данные для заголовка модалки
 */
export interface ModalTitleData {
	title: string;
}

// ============================================================================
// Modal Actions (футер с кнопкой)
// ============================================================================

/**
 * Данные для футера модалки (универсальный)
 * secondary — любой текст (ошибка, цена и т.д.), форматирование снаружи
 */
export interface ModalActionsData {
	button: ButtonData;
	secondary?: string;
}

/**
 * Настройки для футера модалки
 */
export interface ModalActionsSettings {
	/** Инжектированный View кнопки */
	buttonView: IView<ButtonData>;
	/** Селектор вторичного элемента (ошибка, цена и т.д.) */
	secondarySelector: string;
}

// ============================================================================
// Modal Container (контейнер модалки)
// ============================================================================

/**
 * Данные для модалки-контейнера
 */
export interface ModalData {
	content: HTMLElement | null;
}

/**
 * Настройки для модалки-контейнера
 */
export interface ModalSettings {
	onClose: () => void;
}

/**
 * Интерфейс модалки-контейнера
 */
export interface IModal {
	open(): void;
	close(): void;
	setContent(content: HTMLElement): void;
}

// ============================================================================
// Modal Content (базовый интерфейс контента модалок)
// ============================================================================

/**
 * Базовые данные для контента модалки
 */
export interface ModalContentData {
	title?: string;
}

/**
 * Базовые настройки для контента модалки
 * Содержит инжектированные View для header и footer
 */
export interface ModalContentSettings {
	/** View для заголовка (опционально) */
	titleView?: IView<ModalTitleData>;
	/** View для футера (опционально) */
	actionsView?: IView<ModalActionsData>;
}

/**
 * Интерфейс контента модалки
 */
export interface IModalContent<D extends ModalContentData> {
	element: HTMLElement;
	render(data?: Partial<D>): HTMLElement;
}
