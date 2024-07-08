import { PopUp } from '@/store';

export const example: PopUp = {
	type: '',
	title: '',
	desc: '',
	duration: 5,
};

export const POPUP_LOGOUT_SUCCESS: PopUp = {
	type: 'success',
	title: '',
	desc: 'Вы успешно вышли из аккаунта',
	duration: 3,
};

export const POPUP_LOGIN_SUCCESS: PopUp = {
	type: 'success',
	title: 'Авторизация успешна',
	desc: '',
	duration: 3,
};

export const POPUP_LOGIN_ERROR: PopUp = {
	type: 'danger',
	title: 'Что-то пошло не так!',
	desc: 'Попробуйте позднее. Если ошибка повторится - свяжитесь с администратором.',
	duration: 8,
};

export const POPUP_CHANGE_NAME_SUCCESS: PopUp = {
	type: 'success',
	title: 'Имя изменено',
	desc: '',
	duration: 3,
};

export const POPUP_CHANGE_NAME_ERROR: PopUp = {
	type: 'danger',
	title: 'Что-то пошло не так!',
	desc: 'Попробуйте позднее. Если ошибка повторится - свяжитесь с администратором.',
	duration: 8,
};

export const POPUP_DELETE_USER_SUCCESS: PopUp = {
	type: 'success',
	title: 'Учетная запись была удалена',
	desc: '',
	duration: 8,
};

export const POPUP_DELETE_USER_ERROR: PopUp = {
	type: 'danger',
	title: 'Что-то пошло не так!',
	desc: 'Попробуйте позднее. Если ошибка повторится - свяжитесь с администратором, для удаления профиля напрямую.',
	duration: 12,
};

export const POPUP_DELETE_BUILD_SUCCESS: PopUp = {
	type: 'success',
	title: 'Сборка успешно удалена',
	desc: '',
	duration: 3,
};

export const POPUP_BUILD_VISIBILITY_CHANGED: PopUp = {
	type: 'success',
	title: 'Видимость сборки изменена',
	desc: '',
	duration: 3,
};

export const POPUP_NOT_ENOUGH_POINTS: PopUp = {
	type: 'danger',
	title: 'Недостаточно очков!',
	desc: 'Навык стоит больше, чем у тебя имеется очков в распоряжении.',
	duration: 2,
};

export const POPUP_BUILD_CREATED: PopUp = {
	type: 'success',
	title: 'Сборка успешно создана!',
	desc: 'Теперь ты можешь найти ее во вкладке "Мои сборки".',
	duration: 5,
};

export const POPUP_BUILD_MODIFIED: PopUp = {
	type: 'success',
	title: 'Сборка успешно обновлена!',
	desc: 'Все изменения были сохранены.',
	duration: 5,
};
