export default {
  install(Vue, options) {
    Vue.prototype.$message = function(mess) {
      M.toast({
        html: `<span class="white-text text-flow"><strong>[INFO]: ${mess}</strong></span>`,
        classes: 'rounded green',
        completeCallback() {
          M.Toast.dismissAll()
        },
      })
    }
  },
}
