export default {
	data() {
		return {
			initialTheme: null,
			optionValues: {},
			sections: [],
		}
	},

	mounted() {
		document.addEventListener('keydown', this.onKeydown)
		this.initOptions()
	},

	beforeUnmount() {
		document.removeEventListener('keydown', this.onKeydown)
	},

	methods: {
		async initOptions() {
			const res = await fetch('/config/options')
			const json = await res.json()

			const optionValues = {}
			const sections = {}

			for (const option of json) {
				if (! sections[option.section]) {
					sections[option.section] = {
						name: option.section,
						options: [],
					}
				}

				optionValues[option.key] = option.value
				sections[option.section].options.push(option)
			}

			this.initialTheme = optionValues.theme
			this.optionValues = optionValues
			this.sections = Object.values(sections)
		},

		onKeydown(e) {
			// on Ctrl+S, save changes
			if (
				e.key.toLowerCase() === 's'
				&& ! e.altKey
				&& e.ctrlKey
				&& ! e.metaKey
				&& ! e.shiftKey
			) {
				e.preventDefault()
				e.stopImmediatePropagation()
				return this.save()
			}
		},

		async save() {
			await fetch('/config/options', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(this.optionValues),
			})

			if (this.optionValues.theme !== this.initialTheme) {
				window.location.reload()
			}
		},

		async forceHudRefresh() {
			await fetch('/config/force-hud-refresh', { method: 'POST' })
		},
	},
}
