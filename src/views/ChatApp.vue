<template>
  <v-container fluid class="fill-height">
    <div class="app-name">
      <h2>vuichat.herokuapp.com</h2>
    </div>
    <v-sheet
      :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
      class="pa-3"
      v-if="!this.user"
      width="100%"
    >
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        type="card-heading"
      ></v-skeleton-loader>
    </v-sheet>
    <v-row v-else class="list-messages">
      <v-col class="pb-14 pt-4">
        <div ref="messagesContainer">
          <v-list>
            <custom-message
              v-for="item in filterMessages"
              :key="item._id"
              :item="item"
            ></custom-message>
          </v-list>
        </div>
      </v-col>
    </v-row>
    <div class="custom-text-input white py-1">
      <div class="d-flex">
        <v-text-field
          label="Message"
          placeholder="Placeholder"
          v-model="message"
          class="m-0"
          solo
          hide-details="auto"
          @keyup.enter="sendMessage"
        ></v-text-field>
        <v-btn
          class="ml-3 mr-1 blue white--text"
          elevation="2"
          height="auto"
          @click="sendMessage"
          ><v-icon dark> mdi-chevron-right </v-icon></v-btn
        >
      </div>
    </div>
  </v-container>
</template>

<script>
import { APIService } from "@/infra/apiService";
import { mapGetters } from "vuex";
import Message from "@/components/Message.vue";

export default {
  name: "chat-app",

  components: {
    "custom-message": Message,
  },

  inject: {
    theme: {
      default: { isDark: false },
    },
  },

  data: () => ({
    listMessages: [],
    message: "",
    loading: true,
  }),

  computed: {
    ...mapGetters(["user"]),

    filterMessages() {
      return this.listMessages.map((msg) => {
        return {
          ...msg,
          received: msg.userId !== this.user._id,
        };
      });
    },
  },

  watch: {
    user(newValue) {
      if (newValue) {
        this.fetchMessages();
      }
    },
  },

  sockets: {
    connect() {
      console.log("connected");
    },

    getMessages(data) {
      this.listMessages = [...this.listMessages, data];
    },
  },

  methods: {
    sendMessage() {
      if (!this.message) {
        return;
      }

      this.$socket.emit("sendMessage", {
        username: this.user.name,
        userId: this.user._id,
        message: this.message,
        createdDate: new Date().toISOString(),
      });

      this.message = "";
      this.scrollToEnd();
    },

    scrollToEnd() {
      // const content = this.$refs.messagesContainer;
      // content.scrollTop = content.scrollHeight;
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      );
    },

    async fetchMessages() {
      const res = await APIService.get("/messages");
      this.listMessages = res.data;
    },
  },

  async created() {
    if (this.user) {
      await this.fetchMessages();
    }
  },

  updated() {
    this.scrollToEnd();
  },
};
</script>

<style lang="sass">
.app-name
  position: fixed
  top: 0
  left: 0
  width: 100%
  z-index: 100
  background: white
  padding: 5px 10px
.list-messages
  height: calc(100vh - 40px)

.custom-text-input
  position: fixed
  bottom: 0
  left: 0
  width: 100%
</style>
