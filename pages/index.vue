<template>
  <div>
    <b-form v-if="show" @submit.prevent="" @reset="onReset">
      <b-input-group :prepend="baseCurrency">
        <b-form-input
          v-model="baseValue"
          type="number"
          required
          @focus="clearValue"
        >
        </b-form-input>
      </b-input-group>

      <currencyInput
        v-for="currency in currencies"
        :key="currency.key"
        :currencies="currencies"
        :currency="currency"
        :base-value="baseValue"
        :base-currency="baseCurrency"
      />

      <b-button type="reset" variant="danger" @click="onReset">
        Cancella
      </b-button>
    </b-form>
  </div>
</template>

<script>
import currencyInput from '~/components/currencyInput.vue'
export default {
  components: {
    currencyInput
  },
  data() {
    return {
      currencies: [],
      show: true
    }
  },
  computed: {
    baseValue: {
      get: function() {
        return this.$store.state.currencies.base.value
      },
      set: function(newVal) {
        // Aggiorno il valore della valura di base nello store
        this.$store.dispatch(
          'currencies/updateValuteEditing',
          this.baseCurrency
        )
        this.$store.commit('currencies/updateBaseValue', newVal)
        this.updateNoBaseCurrencies(newVal)
      }
    },
    baseCurrency() {
      return this.$store.state.currencies.base.key
    },
    valuteEditing() {
      return this.$store.state.currencies.valuteEditing
    }
  },
  async asyncData({ $axios, error, params }) {
    try {
      const { data } = await $axios.get(
        '/latest.json', // 'https://api.exchangeratesapi.io/latest',
        {
          params: {
            base: 'EUR'
            // symbols: 'JPY'
          }
        }
      )
      const currencies = []
      Object.keys(data.rates).forEach(key => {
        const valute = data.rates[key]
        const currency = {
          key: key,
          valute: valute,
          value: valute
        }
        currencies.push(currency)
      })
      return {
        data,
        currencies
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Impossibile ottenere le valute di cambio correnti'
      })
    }
  },
  methods: {
    updateNoBaseCurrencies(newBaseValue) {
      // Scorro tutte le valute
      Object.keys(this.currencies).forEach(key => {
        const currency = this.currencies[key]
        // Escludo la valuta di base
        if (this.baseCurrency === currency.key) return false
        // Calcolo il nuovo valore della valuta corrente
        const currencyNewValue = (currency.valute * newBaseValue) / 1
        // Aggiorno il valore della valuta corrente
        this.currencies[key].value = parseFloat(currencyNewValue).toFixed(4)
      })
    },
    onReset() {
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.baseValue = 0
      this.$nextTick(() => {
        this.show = true
      })
    },
    clearValue() {
      this.baseValue = null
    }
  }
}
</script>
