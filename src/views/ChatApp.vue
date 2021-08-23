<template>
  <div>
    <h2>chatttt</h2>
    <ul>
      <li v-for="msg in listMessages" :key="msg._id">
        {{ msg.message }}
      </li>
    </ul>
    <v-text-field
      label="Message"
      placeholder="Placeholder"
      outlined
      v-model="message"
      @keyup.enter="sendMessage"
    ></v-text-field>
    <v-btn elevation="2" @click="sendMessage">Send</v-btn>
  </div>
</template>

<script>
export default {
  // name: "chat-app",

  data: () => ({
    listMessages: [],
    message: "",
  }),

  sockets: {
    connect() {
      console.log(">>>>>> connect");
    },

    getMessages(data) {
      this.listMessages = [...this.listMessages, data];
    },
  },

  methods: {
    sendMessage() {
      this.$socket.emit("sendMessage", {
        user: "minh",
        message: this.message,
        createdDate: new Date().toISOString(),
      });

      this.message = "";
    },

    formatKey(msg) {
      return `${msg.name}-${msg.date}`;
    },

    async fetchMessages() {
      const res = await fetch("http://192.168.0.10:3000/messages");
      const result = await res.json();
      this.listMessages = result;
    },
  },

  async created() {
    await this.fetchMessages();
  },
};
</script>
