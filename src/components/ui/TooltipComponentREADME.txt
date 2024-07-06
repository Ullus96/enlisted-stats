<TooltipComponent :direction="'right'" :width="30" :color="'dark'">
  <p>При нажатии по иконке скилла:</p>
  <p><span class="hotkey">ЛКМ</span> - повысить уровень на 1</p>
  <p><span class="hotkey">ПКМ</span> - понизить уровень на 1</p>
</TooltipComponent>

Содержание:
1. Подготовка
2. Пропсы

1. Для начала, на родителя (откуда будет исходить тултип)
   вешается класс .tooltip-anchor.
   Если родитель имеет position: absolute, то вешаем
   класс .tooltip-anchor--no-relative.

   Внутри тултипа юзаются <p>, если не нужно делать какую-то более
   продвинутую структуру.


2. Пропсы

  -  Направление. По названию понятно. Top (default), bottom, right, left.
  direction: {
    required: false,
    type: String as PropType<'top' | 'bottom' | 'right' | 'left'>,
    default: 'top',
  },

  -  Базовая ширина (в rem). При сужении размеров экрана
     будет подстраиваться под размер экрана
  width: {
    required: false,
    type: Number,
    default: 20,
  },

  -  Цвет фона. По дефолту - $color-bg-500. При dark - $color-bg-800.
		color: {
			required: false,
			type: String as PropType<'normal' | 'dark'>,
			default: 'normal',
		},