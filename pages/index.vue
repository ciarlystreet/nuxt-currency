<template>
  <div class="col-10 offset-1 col-sm-8 offset-sm-2 pt-5 pb-5">
    <blockquote class="blockquote">
      <h1 class="mb-0">Currency</h1>
      <footer class="blockquote-footer">Last updated {{ date }}</footer>
    </blockquote>
    <b-form v-if="show" @submit.prevent="" @reset="onReset">
      <div class="row">
        <div class="col-10">
          <b-input-group :prepend="baseCurrency">
            <b-form-input
              v-model="baseValue"
              type="number"
              required
              @focus="clearValue"
            >
            </b-form-input>
          </b-input-group>
          <hr />
        </div>
        <div class="col-2"></div>
      </div>

      <draggable
        draggable=".item"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <currencyInput
            v-for="currency in currencies"
            :key="currency.key"
            :currencies="currencies"
            :currency="currency"
            :base-value="baseValue"
            :base-currency="baseCurrency"
            class="item"
          />
        </transition-group>
      </draggable>

      <div class="row">
        <div class="col-10 text-right">
          <hr />
          <b-button type="reset" variant="danger" right @click="onReset">
            Cancella
          </b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import currencyInput from '~/components/currencyInput.vue'
import draggable from 'vuedraggable'
export default {
  components: {
    currencyInput,
    draggable
  },
  data() {
    return {
      currencies: [],
      show: true,
      drag: false
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
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
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
        currencies,
        date: data.date
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
