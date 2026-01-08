<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>ผู้แต่ง: {{ author }}</p>
      <p>ราคา: {{ price }} บาท</p>
      <ion-button color="danger"
      expand="block"
      @click="deleteBook">
        ลบหนังสือ
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>
<script>
export default {
  name: "BookCard",
  props: {
    title: {type: String,required: true},
    author: {type: String,required: true},
    price: {type: Number,required: true}
  },
  methods: {
    deleteBook() {
      this.$emit("remove");
    }
  }
};
</script>
<style scoped>
ion-card {
  margin-bottom: 10px;
}
ion-card-title {
  font-weight: bold;
  font-size: 1.2rem;
}
ion-button {
  margin-top: 10px;
}
</style>