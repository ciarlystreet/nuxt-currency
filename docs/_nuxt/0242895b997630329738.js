(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{277:function(e,t,r){"use strict";r.r(t);r(35),r(7),r(85),r(58);var n=r(16),c={props:["currencies","currency","baseValue","baseCurrency"],data:function(){return{options:[{text:"",value:this.currency.key}],selected:this.currency.key}},computed:{valuteEditing:function(){return this.$store.state.currencies.valuteEditing}},watch:{currency:{handler:function(e){if(null!==this.valuteEditing)return!1;this.$store.dispatch("currencies/updateValuteEditing",e.key);var t=1*e.value/e.valute;this.$store.commit("currencies/updateBaseValue",t),this.updateOtherNoBaseCurrencies(e.key)},deep:!0},selected:function(e,t){console.log(e+" <- "+t)}},methods:{updateOtherNoBaseCurrencies:function(e){var t=this;Object.keys(this.currencies).forEach(function(r){var n=t.currencies[r];if(t.baseCurrency===n.key||e===n.key)return!1;var c=n.valute*t.baseValue/1;t.currencies[r].value=parseFloat(c).toFixed(4)})},clearValue:function(){this.currency.value=null}}},o=r(47),l=Object(o.a)(c,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"show",rawName:"v-show",value:e.selected,expression:"selected"}],staticClass:"row"},[r("div",{staticClass:"col-10"},[r("b-input-group",{attrs:{prepend:e.currency.key}},[r("b-form-input",{attrs:{id:"currency-"+e.currency.key,type:"number",required:""},on:{focus:e.clearValue},model:{value:e.currency.value,callback:function(t){e.$set(e.currency,"value",t)},expression:"currency.value"}})],1)],1),e._v(" "),r("div",{staticClass:"col-2"},[r("b-form-group",{attrs:{label:""}},[r("b-form-checkbox-group",{attrs:{options:e.options,switches:""},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1)],1)])},[],!1,null,"0523093a",null).exports,d=r(275),v={components:{currencyInput:l,draggable:r.n(d).a},data:function(){return{currencies:[],show:!0,drag:!1}},computed:{baseValue:{get:function(){return this.$store.state.currencies.base.value},set:function(e){this.$store.dispatch("currencies/updateValuteEditing",this.baseCurrency),this.$store.commit("currencies/updateBaseValue",e),this.updateNoBaseCurrencies(e)}},baseCurrency:function(){return this.$store.state.currencies.base.key},valuteEditing:function(){return this.$store.state.currencies.valuteEditing},dragOptions:function(){return{animation:200,group:"description",disabled:!1,ghostClass:"ghost"}}},asyncData:function(){var e=Object(n.a)(regeneratorRuntime.mark(function e(t){var r,n,c,data,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$axios,n=t.error,t.params,e.prev=1,e.next=4,r.get("/latest.json",{params:{base:"EUR"}});case 4:return c=e.sent,data=c.data,o=[],Object.keys(data.rates).forEach(function(e){var t=data.rates[e],r={key:e,valute:t,value:t};o.push(r)}),e.abrupt("return",{data:data,currencies:o,date:data.date});case 11:e.prev=11,e.t0=e.catch(1),n({statusCode:503,message:"Unable to get current exchange rates, please try again later."});case 14:case"end":return e.stop()}},e,null,[[1,11]])}));return function(t){return e.apply(this,arguments)}}(),methods:{updateNoBaseCurrencies:function(e){var t=this;Object.keys(this.currencies).forEach(function(r){var n=t.currencies[r];if(t.baseCurrency===n.key)return!1;var c=n.valute*e/1;t.currencies[r].value=parseFloat(c).toFixed(4)})},onReset:function(){var e=this;this.show=!1,this.baseValue=0,this.$nextTick(function(){e.show=!0})},clearValue:function(){this.baseValue=null}}},f=Object(o.a)(v,function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"col-10 offset-1 col-sm-8 offset-sm-2 pt-5 pb-5"},[r("blockquote",{staticClass:"blockquote"},[r("h1",{staticClass:"mb-0"},[e._v("Currency")]),e._v(" "),r("footer",{staticClass:"blockquote-footer"},[e._v("Last updated on "+e._s(e.date))])]),e._v(" "),e.show?r("b-form",{on:{submit:function(e){e.preventDefault()},reset:e.onReset}},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-10"},[r("b-input-group",{attrs:{prepend:e.baseCurrency}},[r("b-form-input",{attrs:{type:"number",required:""},on:{focus:e.clearValue},model:{value:e.baseValue,callback:function(t){e.baseValue=t},expression:"baseValue"}})],1),e._v(" "),r("hr")],1),e._v(" "),r("div",{staticClass:"col-2"})]),e._v(" "),r("draggable",e._b({attrs:{draggable:".item"},on:{start:function(t){e.drag=!0},end:function(t){e.drag=!1}}},"draggable",e.dragOptions,!1),[r("transition-group",{attrs:{type:"transition",name:e.drag?null:"flip-list"}},e._l(e.currencies,function(t){return r("currencyInput",{key:t.key,staticClass:"item",attrs:{currencies:e.currencies,currency:t,"base-value":e.baseValue,"base-currency":e.baseCurrency}})}),1)],1),e._v(" "),r("div",{staticClass:"row"},[r("div",{staticClass:"col-10 text-right"},[r("hr"),e._v(" "),r("b-button",{attrs:{type:"reset",variant:"danger",right:""},on:{click:e.onReset}},[e._v("\n          Reset\n        ")])],1)])],1):e._e()],1)},[],!1,null,null,null);t.default=f.exports}}]);