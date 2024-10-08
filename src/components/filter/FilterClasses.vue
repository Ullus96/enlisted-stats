<template>
	<div class="filter__classes-block">
		<div class="filter__group filter__group--btns-only">
			<button
				class="filter__class filter__class--no-icons btn btn-m btn-tertiary"
				@click="removeClass"
			>
				Все
			</button>
			<button
				class="filter__class filter__class--no-icons btn btn-m btn-tertiary"
				@click="setClass('custom')"
			>
				Акционные
			</button>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img src="@/assets/soldier_icons/rifleman.svg" class="filter__icon" />
				<span>Боец: </span>
			</div>
			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('rifleman1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('rifleman2')"
				>
					<span>II</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('rifleman3')"
				>
					<span>III</span>
				</button>
			</div>
		</div>

		<div class="filter__group filter__group--btns-only">
			<button
				class="filter__class btn btn-m btn-tertiary"
				@click="setClass('medic')"
			>
				<img src="@/assets/soldier_icons/medic.svg" class="filter__icon" />
				<span>Медик</span>
			</button>
			<button
				class="filter__class btn btn-m btn-tertiary"
				@click="setClass('partisan2')"
			>
				<img src="@/assets/soldier_icons/partisan.svg" class="filter__icon" />
				<span>Партизан</span>
			</button>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img src="@/assets/soldier_icons/assaulter.svg" class="filter__icon" />
				<span>Штурмовик: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('assaulter1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('assaulter2')"
				>
					<span>II</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('assaulter3')"
				>
					<span>III</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('assaulter4')"
				>
					<span>IV</span>
				</button>
			</div>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img src="@/assets/soldier_icons/engineer.svg" class="filter__icon" />
				<span>Инженер: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('engineer1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('engineer2')"
				>
					<span>II</span>
				</button>
			</div>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img src="@/assets/soldier_icons/sniper.svg" class="filter__icon" />
				<span>Снайпер: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('sniper1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('sniper2')"
				>
					<span>II</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('sniper3')"
				>
					<span>III</span>
				</button>
			</div>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img src="@/assets/soldier_icons/antitank.svg" class="filter__icon" />
				<span>Бронебойщик: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('at1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('at2')"
				>
					<span>II</span>
				</button>
			</div>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img src="@/assets/soldier_icons/mg.svg" class="filter__icon" />
				<span>Пулемётчик: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('mg1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('mg2')"
				>
					<span>II</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('mg3')"
				>
					<span>III</span>
				</button>
			</div>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img src="@/assets/soldier_icons/radio.svg" class="filter__icon" />
				<span>Радист: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('radio1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('radio2')"
				>
					<span>II</span>
				</button>
			</div>
		</div>

		<div class="filter__group filter__group--btns-only">
			<button
				class="filter__class btn btn-m btn-tertiary"
				@click="setClass('mortar')"
			>
				<img src="@/assets/soldier_icons/mortar.svg" class="filter__icon" />
				<span>Миномётчик</span>
			</button>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img
					src="@/assets/soldier_icons/flamethrower.svg"
					class="filter__icon"
				/>
				<span>Огнемётчик: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('flamethrower1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('flamethrower2')"
				>
					<span>II</span>
				</button>
			</div>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img
					src="@/assets/soldier_icons/pilot-fighter.svg"
					class="filter__icon"
				/>
				<span>Пилот-истребитель: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('pilot-fighter1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('pilot-fighter2')"
				>
					<span>II</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('pilot-fighter3')"
				>
					<span>III</span>
				</button>
			</div>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img
					src="@/assets/soldier_icons/pilot-attacker.svg"
					class="filter__icon"
				/>
				<span>Пилот-штурмовик: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('pilot-attacker1')"
				>
					<span> I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('pilot-attacker2')"
				>
					<span>II</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('pilot-attacker3')"
				>
					<span>III</span>
				</button>
			</div>
		</div>

		<div class="filter__group">
			<div class="filter__group-title">
				<img src="@/assets/soldier_icons/tank.svg" class="filter__icon" />
				<span>Танкист: </span>
			</div>

			<div class="filter__group-levels">
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('tank1')"
				>
					<span>I</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('tank2')"
				>
					<span>II</span>
				</button>
				<button
					class="filter__class btn btn-m btn-tertiary"
					@click="setClass('tank3')"
				>
					<span>III</span>
				</button>
			</div>
		</div>

		<div class="filter__group filter__group--btns-only">
			<button
				class="filter__class btn btn-m btn-tertiary"
				@click="setClass('moto1')"
			>
				<img src="@/assets/soldier_icons/moto.svg" class="filter__icon" />
				<span>Мотоциклист</span>
			</button>
			<button
				class="filter__class btn btn-m btn-tertiary"
				@click="setClass('apc-driver')"
			>
				<img src="@/assets/soldier_icons/apc-driver.svg" class="filter__icon" />
				<span>Водитель БТР</span>
			</button>
		</div>
	</div>
	<Teleport to="body">
		<div class="page-mask" @click="close"></div>
	</Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SoldierID } from '@/type/Soldier';

export default defineComponent({
	emits: ['close', 'clickHandle'],
	setup(props, context) {
		function close() {
			context.emit('close');
		}

		function setClass(soldierClass: SoldierID) {
			context.emit('clickHandle', soldierClass);
			context.emit('close');
		}

		function removeClass() {
			context.emit('clickHandle', false);
			context.emit('close');
		}

		return {
			close,
			setClass,
			removeClass,
		};
	},
});
</script>
