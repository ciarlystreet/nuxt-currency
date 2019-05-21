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

        // è cambiata una valuta non di base e devo aggiornare la valuta di base di conseguenza si aggiorneranno tutte le altre
        this.$store.dispatch('currencies/updateValuteEditing', newValue.key)
        const num = (1 * newValue.value) / newValue.valute
        this.$store.commit('currencies/updateBaseValue', num)
        this.updateOtherNoBaseCurrencies(newValue.key) // FIXME Fare in modo che, al varaire il valore di una valuta, si aggiornino anche i valori delle altre valute
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
      // Scorro tutte le valute
      Object.keys(this.currencies).forEach(key => {
        const currency = this.currencies[key]
        // Escludo la valuta di base
        if (
          this.baseCurrency === currency.key ||
          fromValuteKey === currency.key
        )
          return false
        // Calcolo il nuovo valore della valuta corrente
        const currencyNewValue = (currency.valute * this.baseValue) / 1
        // Aggiorno il valore della valuta corrente
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
