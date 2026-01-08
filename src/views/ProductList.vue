 <template>
  <ion-page class="dark-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>รายการสินค้า</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col
            size="12"
            size-sm="6"
            size-md="4"
            v-for="item in products"
            :key="item.id"
          >
            <ProductCard :product="item" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/vue";
import ProductCard from "../views/ProductCard.vue";
export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    ProductCard,
  },
  data() {
    return {
      products: [
        { id: 1, name: "RTX 4090", price: 19000, image: "https://th.bing.com/th/id/OIP.rPLuur5bAS4-KVsvtrDgmAHaGn?w=194&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1" },
        { id: 2, name: "vivo x300 pro", price: 50000, image: "https://th.bing.com/th?id=OIF.eZMVB6rePy%2fpd9mrLuTIXg&w=163&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1" },
        { id: 3, name: "CANON EOS 2000+", price: 4000, image: "https://th.bing.com/th?id=OIF.GdjWbdDNv7ZS%2bENcipmBCQ&w=245&h=187&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1" }
      ]
    };
  }
};
</script>
<style scoped>
.dark-page {
  --background: #121212;
  background-color: #121212;
}
.dark-page ion-toolbar {
  --background: #1f1f1f;
  --color: #ffffff;
}
.dark-page ion-content {
  --background: #565656;
}
.dark-page ion-col {
  margin-bottom: 8px;
}
</style>