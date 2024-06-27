Тащемта синтаксис такой и как использовать:

Содержание:
  1. Пропсы (с пояснениями)
  2. Синтаксис Родительского компонента


1. Пропсы с пояснениями:

  - Название инпута (сверху-слева)
label: {
	required: false,
	type: String,
},

  - Плейсхолдер
placeholder: {
	required: false,
	type: [String, Number],
},

  - Уточнение справа-снизу. 🔺 Взаимозаменяемый с counter 
desc: {
	required: false,
	type: [String, Number],
},

  - Счетчик, выше которого компонент не будет возвращать значения,
    либо будет недоступным внутренняя кнопка (если есть)
counter: {
	required: false,
	type: Number,
},

  - Внутренняя кнопка, которая при нажатии возвращает emit @onConfirm,
    так же обнуляет инпуты.
inlineButton: {
	required: false,
	type: Boolean,
},

  - Тип инпута
type: {
	required: false,
	type: String as PropType<'text' | 'number' | 'datetime-local'>,
	default: 'text',
},

  - Передать в компонент стартовое значение инпута.
presetInput: {
  required: false,
  type: [String, Number],
},



2. Синтаксис Родительского компонента:

<InputComponent
  :label="'Отображаемое имя'"
  :placeholder="$store.state.user.displayName"
  :inlineButton="true"
  :counter="32"
  :presetInput="$store.state.user.displayName"
  @onChange="(val) => {newName = val}"
  @onConfirm="updateDisplayName"
/>

Пояснение: @onChange меняет переменную из Родительского компонента
           Если есть ошибки внутри, newName задан не будет.