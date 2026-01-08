<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="toggleTheme">
        🌗
      </ion-fab-button>
    </ion-fab>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonFab, IonFabButton } from '@ionic/vue';

export default {
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonFab,
    IonFabButton,
  },
  methods: {
    toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');

    }
  }
};
</script>

<style>

ion-fab-button {
  --background: #1976d2;
  --color: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
</style>
