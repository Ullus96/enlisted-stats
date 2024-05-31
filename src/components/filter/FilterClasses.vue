<template>
	<div class="filter__classes-block">
		<div class="filter__group">
			<button
				class="filter__class filter__class--no-icons btn"
				@click="removeClass"
			>
				Все
			</button>
			<button
				class="filter__class filter__class--no-icons btn"
				@click="setClass('custom')"
			>
				Акционные
			</button>
		</div>
		<div class="filter__group">
			<button class="filter__class gap-none btn" @click="setClass('rifleman1')">
				<img src="@/assets/soldier_icons/rifleman.svg" class="filter__icon" />
				<span>Боец I</span>
			</button>
			<button class="filter__class gap-none btn" @click="setClass('rifleman2')">
				<img src="@/assets/soldier_icons/rifleman.svg" class="filter__icon" />
				<span>Боец II</span>
			</button>
			<button class="filter__class gap-none btn" @click="setClass('rifleman3')">
				<img src="@/assets/soldier_icons/rifleman.svg" class="filter__icon" />
				<span>Боец III</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('medic')">
				<img src="@/assets/soldier_icons/medic.svg" class="filter__icon" />
				<span>Медик</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('assaulter1')">
				<img src="@/assets/soldier_icons/assaulter.svg" class="filter__icon" />
				<span>Штурмовик I</span>
			</button>
			<button class="filter__class btn" @click="setClass('assaulter2')">
				<img src="@/assets/soldier_icons/assaulter.svg" class="filter__icon" />
				<span>Штурмовик II</span>
			</button>
			<button class="filter__class btn" @click="setClass('assaulter3')">
				<img src="@/assets/soldier_icons/assaulter.svg" class="filter__icon" />
				<span>Штурмовик III</span>
			</button>
			<div class="filter__class btn" @click="setClass('assaulter4')">
				<img src="@/assets/soldier_icons/assaulter.svg" class="filter__icon" />
				<span>Штурмовик IV</span>
			</div>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('engineer1')">
				<img src="@/assets/soldier_icons/engineer.svg" class="filter__icon" />
				<span>Инженер I</span>
			</button>
			<button class="filter__class btn" @click="setClass('engineer2')">
				<img src="@/assets/soldier_icons/engineer.svg" class="filter__icon" />
				<span>Инженер II</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('sniper1')">
				<img src="@/assets/soldier_icons/sniper.svg" class="filter__icon" />
				<span>Снайпер I</span>
			</button>
			<button class="filter__class btn" @click="setClass('sniper2')">
				<img src="@/assets/soldier_icons/sniper.svg" class="filter__icon" />
				<span>Снайпер II</span>
			</button>
			<button class="filter__class btn" @click="setClass('sniper3')">
				<img src="@/assets/soldier_icons/sniper.svg" class="filter__icon" />
				<span>Снайпер III</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('at1')">
				<img src="@/assets/soldier_icons/antitank.svg" class="filter__icon" />
				<span>Бронебойщик I</span>
			</button>
			<button class="filter__class btn" @click="setClass('at2')">
				<img src="@/assets/soldier_icons/antitank.svg" class="filter__icon" />
				<span>Бронебойщик II</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('mg1')">
				<img src="@/assets/soldier_icons/mg.svg" class="filter__icon" />
				<span>Пулемётчик I</span>
			</button>
			<button class="filter__class btn" @click="setClass('mg2')">
				<img src="@/assets/soldier_icons/mg.svg" class="filter__icon" />
				<span>Пулемётчик II</span>
			</button>
			<button class="filter__class btn" @click="setClass('mg3')">
				<img src="@/assets/soldier_icons/mg.svg" class="filter__icon" />
				<span>Пулемётчик III</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('radio1')">
				<img src="@/assets/soldier_icons/radio.svg" class="filter__icon" />
				<span>Радист I</span>
			</button>
			<button class="filter__class btn" @click="setClass('radio2')">
				<img src="@/assets/soldier_icons/radio.svg" class="filter__icon" />
				<span>Радист II</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('mortar')">
				<img src="@/assets/soldier_icons/mortar.svg" class="filter__icon" />
				<span>Миномётчик</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('flamethrower1')">
				<img
					src="@/assets/soldier_icons/flamethrower.svg"
					class="filter__icon"
				/>
				<span>Огнемётчик I</span>
			</button>
			<button class="filter__class btn" @click="setClass('flamethrower2')">
				<img
					src="@/assets/soldier_icons/flamethrower.svg"
					class="filter__icon"
				/>
				<span>Огнемётчик II</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('pilot-fighter1')">
				<img
					src="@/assets/soldier_icons/pilot-fighter.svg"
					class="filter__icon"
				/>
				<span>Пилот-истр. I</span>
			</button>
			<button class="filter__class btn" @click="setClass('pilot-fighter2')">
				<img
					src="@/assets/soldier_icons/pilot-fighter.svg"
					class="filter__icon"
				/>
				<span>Пилот-истр. II</span>
			</button>
			<button class="filter__class btn" @click="setClass('pilot-fighter3')">
				<img
					src="@/assets/soldier_icons/pilot-fighter.svg"
					class="filter__icon"
				/>
				<span>Пилот-истр. III</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('pilot-attacker1')">
				<img
					src="@/assets/soldier_icons/pilot-attacker.svg"
					class="filter__icon"
				/>
				<span>Пилот-штурм. I</span>
			</button>
			<button class="filter__class btn" @click="setClass('pilot-attacker2')">
				<img
					src="@/assets/soldier_icons/pilot-attacker.svg"
					class="filter__icon"
				/>
				<span>Пилот-штурм. II</span>
			</button>
			<button class="filter__class btn" @click="setClass('pilot-attacker3')">
				<img
					src="@/assets/soldier_icons/pilot-attacker.svg"
					class="filter__icon"
				/>
				<span>Пилот-штурм. III</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('tank1')">
				<img src="@/assets/soldier_icons/tank.svg" class="filter__icon" />
				<span>Танкист I</span>
			</button>
			<button class="filter__class btn" @click="setClass('tank2')">
				<img src="@/assets/soldier_icons/tank.svg" class="filter__icon" />
				<span>Танкист II</span>
			</button>
			<button class="filter__class btn" @click="setClass('tank3')">
				<img src="@/assets/soldier_icons/tank.svg" class="filter__icon" />
				<span>Танкист III</span>
			</button>
		</div>

		<div class="filter__group">
			<button class="filter__class btn" @click="setClass('moto1')">
				<img src="@/assets/soldier_icons/moto.svg" class="filter__icon" />
				<span>Мотоциклист</span>
			</button>
			<button class="filter__class btn" @click="setClass('apc-driver')">
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
