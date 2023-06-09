import { teamColorClass } from '/hud/helpers/team-color-class.js'

export default {
	props: [
		'position',
		'team',
	],

	computed: {
		colorClass() {
			return this.teamColorClass(this.team)
		},

		positionClass() {
			return `--${this.position}`
		},

		isActive() {
			return this.$round.isFreezetime
				|| (this.$round.phase === 'live' && this.$round.phaseEndsInSec >= (this.$opts['cvars.mp_roundtime'] * 60 - this.$opts['preferences.sidebar.teamEquipment.activeIntoRoundSec']))
		},

		lossBonusValue() {
			return this.$opts['cvars.cash_team_loser_bonus'] + this.team.consecutiveRoundLosses * this.$opts['cvars.cash_team_loser_bonus_consecutive_rounds']
		},

		teamMoney() {
			return this.team.players.reduce((sum, player) => sum + player.money, 0)
		},

		teamEquipmentValue() {
			return this.team.players.reduce((sum, player) => sum + player.equipmentValue, 0)
		},
	},

	methods: {
		teamColorClass,
	},
}
