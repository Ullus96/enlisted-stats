Тащемта синтаксис такой и как использовать:

Содержание:
  1. Пропсы (с пояснениями)
  2. Эмиты
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

  - Required
required: {
  required: false,
  type: Boolean,
  default: false,
},

  - Передать в компонент стартовое значение инпута.
presetInput: {
  required: false,
  type: [String, Number],
},



2. Эмиты

  - Получить значение в переменную из Инпута
@onChange="(val) => {newName = val}"

  - Выполнить действие при нажатии inline-кнопки
@onConfirm="updateDisplayName"

  - Вернуть true boolean-значение, если компонент имеет ошибки
@hasErrors="(val) => {isInputHasErrors = val}"


3. Синтаксис Родительского компонента:

<InputComponent
  :label="'Отображаемое имя'"
  :placeholder="$store.state.user.displayName"
  :inlineButton="true"
  :counter="32"
  :presetInput="$store.state.user.displayName"
  :required="true"
  @onChange="(val) => {newName = val}"
  @onConfirm="updateDisplayName"
  @hasErrors="(val) => {isInputHasErrors = val}"
/>

Пояснение: @onChange меняет переменную из Родительского компонента
           Если есть ошибки внутри, newName задан не будет.