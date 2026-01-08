<template>
  <BaseLayout title="รายการหนังสือ">
    <ion-searchbar v-model="q" placeholder="ค้นหา..." />

    <!-- ปุ่มเพิ่มหนังสือ -->
    <ion-button
      expand="block"
      color="primary"
      class="m-4"
      @click="goAddBook"
    >
      เพิ่มหนังสือ
    </ion-button>

    <ion-list>
      <BookCard
        v-for="b in filtered"
        :key="b.id"
        :book="b"
        @select="open"
      >
        <template #extra>
          <ion-badge
            :style="{
              '--background': b.available_copies > 0
                ? 'var(--badge-available)'
                : 'var(--ion-color-danger)',
              color: 'var(--text-color)'
            }"
          >
            {{ b.available_copies > 0 ? 'ว่าง' : 'ถูกยืม' }}
          </ion-badge>
        </template>
      </BookCard>
    </ion-list>

    <!-- Modal เพิ่มหนังสือ -->
    <ion-modal :is-open="showModal" @didDismiss="closeModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>เพิ่มหนังสือ</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModal">ปิด</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-item>
          <ion-input v-model="form.title" placeholder="ชื่อหนังสือ" />
        </ion-item>

        <ion-item>
          <ion-input v-model="form.author" placeholder="ผู้แต่ง" />
        </ion-item>

        <ion-item>
          <ion-input v-model.number="form.price" type="number" placeholder="ราคา" />
        </ion-item>

        <ion-item>
          <ion-input v-model.number="form.available_copies" type="number" placeholder="จำนวน" />
        </ion-item>

        <!-- Upload รูป -->
        <input
          ref="fileInput"
          type="file"
          hidden
          accept="image/*"
          @change="onImageChange"
        />

        <ion-button expand="block" @click="selectImage">
          เลือกรูปปก
        </ion-button>

        <ion-img
          v-if="form.cover_url"
          :src="form.cover_url"
          class="mt-3"
        />

        <ion-button
          expand="block"
          color="success"
          class="mt-4"
          @click="saveBook"
        >
          บันทึก
        </ion-button>
      </ion-content>
    </ion-modal>
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import BaseLayout from "../components/BaseLayout.vue";
import BookCard from "../views/BookCard.vue";
import {
  IonButton,
  IonButtons,
  IonModal,
  IonInput,
  IonItem,
  IonContent,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonImg
} from "@ionic/vue";

const router = useRouter();
const store = useStore();

/* search */
const q = ref("");
const books = computed(() => store.getters.allBooks);
const filtered = computed(() => {
  const t = q.value.toLowerCase();
  return books.value.filter(
    (b) =>
      b.title.toLowerCase().includes(t) ||
      b.author.toLowerCase().includes(t)
  );
});

/* open detail */
function open(id) {
  router.push({ name: "BookDetail", params: { id } });
}

/* modal เพิ่มหนังสือ */
const showModal = ref(false);
function goAddBook() {
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}

/* form หนังสือใหม่ */
const form = ref({
  title: "",
  author: "",
  price: 0,
  available_copies: 1,
  cover_url: ""
});

/* upload image */
const fileInput = ref(null);
function selectImage() {
  fileInput.value.click();
}
function onImageChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  form.value.cover_url = URL.createObjectURL(file);
}

/* บันทึกหนังสือ */
function saveBook() {
  if (!form.value.title || !form.value.author) {
    alert("กรุณากรอกชื่อหนังสือและผู้แต่ง");
    return;
  }

  store.commit("ADD_BOOK", { id: Date.now(), ...form.value });

  // reset form
  form.value = {
    title: "",
    author: "",
    price: 0,
    available_copies: 1,
    cover_url: ""
  };

  showModal.value = false;
}
</script>

<style scoped>
ion-searchbar {
  margin: 10px;
}

ion-img {
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
</style>

<style scoped>
ion-content {
  --background: var(--background-color);
}

ion-toolbar {
  --background: var(--toolbar-background);
  --color: var(--toolbar-color);
}

ion-searchbar {
  --background: var(--searchbar-bg);
  --ion-searchbar-input-background: var(--searchbar-input-bg);
  color: var(--text-color);
}

ion-item {
  --background: var(--background-item);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
}

ion-label h2 {
  color: var(--text-color);
}

ion-label p {
  color: var(--text-color-soft);
}


/* Badge */
ion-badge[slot="end"] {
  background: var(--badge-available);
}

ion-badge[slot="end"]:nth-child(2) {
  background: var(--badge-unavailable);
}

</style>


