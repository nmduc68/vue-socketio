<template>
  <v-app>
    <v-main>
      <router-view />
      <v-col cols="auto">
        <v-dialog
          transition="dialog-top-transition"
          max-width="300"
          persistent
          v-model="isShow"
        >
          <v-form v-model="valid" @submit.prevent>
            <v-card class="px-4 py-4">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="15"
                label="Enter your name"
                required
                :disabled="isCreatingUser"
                @keyup.enter.prevent="createUser"
              ></v-text-field>
              <v-btn
                class="center"
                color="success"
                :disabled="!valid || isCreatingUser"
                :loading="isCreatingUser"
                @click="createUser"
                >Join
                <template v-slot:loader>
                  <span>Joining...</span>
                </template></v-btn
              >
            </v-card>
          </v-form>
        </v-dialog>
      </v-col>
    </v-main>
  </v-app>
</template>

<script>
import { APIService } from "@/infra/apiService";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "App",

  data: () => ({
    valid: false,
    isShow: false,
    name: "",
    isCreatingUser: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 15 || "Name must be less than 10 characters",
    ],
  }),

  computed: {
    ...mapGetters(["user"]),
  },

  methods: {
    ...mapMutations(["SET_USER"]),

    async createUser() {
      try {
        this.isCreatingUser = true;
        if (this.valid) {
          const res = await APIService.post("/users", { name: this.name });
          this.SET_USER(res.data);
          this.closeDialog();
        }
      } catch (error) {
        console.log(">>>>errr", error);
      } finally {
        this.isCreatingUser = false;
      }
    },

    showDialog() {
      this.isShow = true;
    },

    closeDialog() {
      this.isShow = false;
    },
  },

  created() {
    if (!this.user) {
      this.showDialog();
    }
  },
};
</script>
