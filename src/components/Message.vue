<template>
  <v-list-item
    :key="item._id"
    :class="`d-block px-0 ${item.received ? 'pb-3' : ''}`"
  >
    <div class="d-block custom-name-user pl-2 ml-12" v-if="item.received">
      {{ item.username }}
    </div>
    <div
      :class="`d-flex justify-${
        item.received ? 'start' : 'end'
      } custom-list-item`"
    >
      <v-avatar
        size="40"
        v-if="item.received"
        class="user-avatar rounded-circle pa-1 blue-grey lighten-4 mr-2 mt-1"
      >
        <span class="font-weight-medium">{{ sortName }}</span>
      </v-avatar>
      <div
        :class="`${item.received ? 'blue-grey lighten-5' : 'blue lighten-1'} ${
          item.received ? 'mt-1' : 'mt-3'
        } rounded-xl py-3 px-3`"
      >
        <span :class="item.received ? 'black--text' : 'white--text'">{{
          item.message
        }}</span>
      </div>
    </div>
  </v-list-item>
</template>

<script>
export default {
  props: {
    item: {
      require: true,
    },
  },

  computed: {
    sortName() {
      return this.item.username.slice(0, 2);
    },
  },
};
</script>
<style lang="sass">
.list-messages
  height: calc(100vh - 40px)
  .custom-name-user
  font-size: 10px
  .custom-list-item
    font-size: 14px
    position: relative
</style>
