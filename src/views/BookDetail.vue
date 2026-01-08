<template>
  <BaseLayout title="รายละเอียดหนังสือ" :showBack="true"
  >
    <ion-list v-if="book" class="book-detail">
      <ion-item lines="none">
        <img :src="book.cover_url" class="w-30 h-40 object-cover rounded"/>
      </ion-item>

      <ion-item>
        <ion-label>
          <p class="font-bold text-lg">{{ book.title }}</p>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <p class="text-gray-700">ผู้แต่ง: {{ book.author }}</p>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <p class="text-gray-900 font-semibold">ราคา: {{ book.price }}</p>
        </ion-label>
      </ion-item>

      <ion-item lines="none">
    <ion-label class="text-center" :style="{ color: book.available_copies > 0 ? 'var(--badge-available)' : 'var(--badge-unavailable)'}">
      สถานะ: {{ book.available_copies > 0 ? 'ว่าง' : 'ถูกยืมแล้ว' }}
    </ion-label>
  </ion-item>
</ion-list>

    <!-- ปุ่ม -->
    <template #actions>
     <div class="flex flex-col gap-3 w-full mx-auto p-4" style="background-color: #3b82f6; border-radius: 8px;">
        <ion-button expand="full" color="success" :disabled="book?.available_copies === 0" @click="borrowBook">
          ยืมหนังสือ
        </ion-button>
        <ion-button expand="full" color="danger" @click="returnBook">
          คืนหนังสือ
        </ion-button>
      </div>
    </template>

    <ion-alert :is-open="alert.open" :header="alert.title" :message="alert.message" :buttons="['OK']" @didDismiss="alert.open = false"/>
  </BaseLayout>
</template>

<script>
import bookData from '../stores/books.json';
import { mapGetters, mapMutations } from 'vuex';
import BaseLayout from '../components/BaseLayout.vue';
import { IonButton, IonList, IonItem, IonLabel, IonAlert } from '@ionic/vue'
export default {
  name: 'BookDetail',
  
  components: { BaseLayout, IonButton, IonList, IonItem, IonLabel, IonAlert },

  data() {
    return {
      alert: {
        open: false,
        title: "",
        message:""
      },
    };
  },
computed: {
  book() {
    return this.$store.getters.getBookById(this.$route.params.id);
  }
},
  methods: {
    ...mapMutations(["BORROW_BOOK", "RETURN_BOOK"]),
    showAlert(title, massage) {
      this.alert = {
        open: true,
        title: title,
        message: massage
      };
    }
  },
  methods: {
  ...mapMutations(["BORROW_BOOK", "RETURN_BOOK"]),

  borrowBook() {
    if (this.book.available_copies > 0) {
      this.BORROW_BOOK(this.book.id);
      this.alert = {
        open: true,
        title: 'สำเร็จ',
        message: `คุณได้ยืมหนังสือเรียบร้อยแล้ว! "${this.book.title}"`
      };
    } else {
      this.alert = {
        open: true,
        title: 'ขออภัย',
        message: 'หนังสือเล่มนี้ถูกยืมหมดแล้ว'
      };
    }
  },

  returnBook() {
    this.RETURN_BOOK(this.book.id);
    this.alert = {
      open: true,
      title: 'คืนสำเร็จ',
      message: `คุณได้คืน "${this.book.title}" แล้ว`
    };
  }
}
};
</script>

<style>

ion-content {
  --background: var(--background-color);
  color: var(--text-color);
}

ion-list.book-detail {
  width: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

ion-item {
  --background: transparent;
  --inner-padding-start: 0;
  --inner-padding-end: 0;
  width: 100%;
}

ion-label {
  width: 100%;
}

/* ตัวหนังสือมีกรอบ */
.book-detail p {
  color: var(--text-color);
  padding: 10px 15px;
  border: 1px solid var(--text-color-soft); /* สีกรอบตามธีมอ่อน */
  border-radius: 8px;
  background-color: var(--background-color-soft); /* พื้นหลังกรอบ */
  margin: 5px 0;
}

/* ภาพอยู่ตรงกลาง */
.book-detail img {
  display: block;
  margin: 10 auto;
  width: 400px; /* ปรับขนาดตามต้องการ */
  height: 600px;
  border-radius: var(--card-radius);
}


.book-detail p {
  color: var(--text-color);
}


</style>
