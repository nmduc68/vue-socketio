import "./registerServiceWorker";

import App from "./App.vue";
import SocketIO from "socket.io-client";
import Vue from "vue";
import VueSocketIO from "vue-socket.io";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

const options = { path: "/chat-app/" };

// Using socket.io-client Instance
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO(process.env.VUE_APP_API_HOST, options),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
