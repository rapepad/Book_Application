<template>
  <ion-card class="product-card">
    <img :src="product.image" />
    <ion-card-header>
      <ion-card-title>{{ product.name }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p> ราคา:<span>{{ product.price }} บาท</span></p>
      <ion-button
        expand="block"
        fill="solid"
        class="lux-button"
        @click="goDetail"
      >
        ดูรายละเอียด
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true
    },
  },
  setup(props) {
    const router = useRouter();
    const goDetail = () => {
      router.push(`/products/${props.product.id}`);
    };
    return { goDetail };
  }
};
</script>
<style scoped>
.product-card {
  border-radius: 18px;
  transition: 0.25s ease;
}
.product-card:hover {
  transform: translateY(-4px);
}
img {
  width: 100%;
  height: 360px;
  object-fit: cover;
}
p {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 12px;
}
span {
  color: #059669;
  font-weight: 700;
}
.lux-button {
  --background: linear-gradient(
    135deg,
    #0b0b0b,
    #2a2a2a,
    #111111
  ) !important;

  --background-hover: linear-gradient(
    135deg,
    #1a1a1a,
    #3a3a3a,
    #1f1f1f
  );

  --background-activated: #000000;

  --color: #ffffff;

  --border-radius: 14px;

  --box-shadow:
    0 8px 22px rgba(0, 0, 0, 0.55),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);

  font-weight: 600;
  letter-spacing: 0.6px;
}
</style>
