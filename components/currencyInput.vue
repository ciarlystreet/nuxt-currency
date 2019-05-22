<template>
  <div v-show="selected" class="row">
    <div class="col-10">
      <b-input-group :prepend="currency.key">
        <b-form-input
          :id="'currency-' + currency.key"
          v-model="currency.value"
          type="number"
          required
          @focus="clearValue"
        >
        </b-form-input>
      </b-input-group>
    </div>
    <div class="col-2">
      <b-form-group label="">
        <b-form-checkbox-group
          v-model="selected"
          :options="options"
          switches
        ></b-form-checkbox-group>
      </b-form-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currencies', 'currency', 'baseValue', 'baseCurrency'],
  data() {
    return {
      options: [{ text: '', value: this.currency.key }],
      selected: this.currency.key
    }
  },
  computed: {
    valuteEditing() {
      return this.$store.state.currencies.valuteEditing
    }
  },
  watch: {
    currency: {
      handler: function(newValue) {
        if (this.valuteEditing !== null) return false
        this.$store.dispatch('currencies/updateValuteEditing', newValue.key)
        const num = (1 * newValue.value) / newValue.valute
        this.$store.commit('currencies/updateBaseValue', num)
        this.updateOtherNoBaseCurrencies(newValue.key)
      },
      deep: true
    },
    selected(newVal, oldVal) {
      // eslint-disable-next-line no-console
      console.log(newVal + ' <- ' + oldVal)
    }
  },
  methods: {
    updateOtherNoBaseCurrencies(fromValuteKey) {
      // Scanning all the available currencies
      Object.keys(this.currencies).forEach(key => {
        const currency = this.currencies[key]
        // Excluding the base currency
        if (
          this.baseCurrency === currency.key ||
          fromValuteKey === currency.key
        )
          return false
        // Calculating the new value of the current currency
        const currencyNewValue = (currency.valute * this.baseValue) / 1
        // Updating the value of the current currency
        this.currencies[key].value = parseFloat(currencyNewValue).toFixed(4)
      })
    },
    clearValue() {
      this.currency.value = null
    }
  }
}
</script>

<style lang="scss" scoped></style>
