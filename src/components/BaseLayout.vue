<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary" class="flex items-center">
        <ion-buttons slot="start" v-if="showBack">
          <ion-back-button default-href="/" />
        </ion-buttons>

        <ion-title class="text-center flex-1">{{ title }}</ion-title>

        <slot name="header-end"></slot>
      </ion-toolbar>
    </ion-header>

    <ion-content class="p-4">
      <div class="flex flex-col items-center justify-center text-center min-h-[80vh]">
        <slot></slot> 
     </div>
    </ion-content>

    <div class="fixed bottom-6 right-6 z-50 ">
      <slot name="actions"></slot>
    </div>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
} from "@ionic/vue"

export default {
  name: "BaseLayout",
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent },
  props: {
    title: { type: String, required: true },
    showBack: { type: Boolean, default: false }
  }
}
</script>