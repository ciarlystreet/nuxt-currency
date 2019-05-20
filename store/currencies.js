export const state = () => ({
  base: {
    key: 'EUR',
    value: 1,
    valute: 1
  },
  othersCurrences: {},
  valuteEditing: null,
  updatingOtherNoBaseCurrencies: false
})

export const mutations = {
  updateBaseValue(state, value) {
    state.base.value = Number(value)
  },
  updateOthers(state, othersCurrences) {
    state.othersCurrences = othersCurrences
  },
  updateValuteEditing(state, value) {
    state.valuteEditing = value
  }
}

export const actions = {
  unsetUpdateValuteEditing(context) {
    context.commit('updateValuteEditing', null)
  },
  updateValuteEditing(context, value) {
    context.commit('updateValuteEditing', value)
    setTimeout(() => context.dispatch('unsetUpdateValuteEditing'), 1)
  }
}
