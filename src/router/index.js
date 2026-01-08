import { createRouter, createWebHistory } from '@ionic/vue-router';
import BookList from '../views/BookList.vue';
import BookDetail from '../views/BookDetail.vue';
import Books from '../views/Books.vue';
import ProductList from '../views/ProductList.vue';
const routes = [
  {
    path: '/',
    redirect: '/BookList'
  },
  {
    path: '/BookList',
    name: 'BookList',
    component: BookList
  },
  {
  path: '/Book/:id',  
  name: 'BookDetail',
  component: BookDetail,            
  },
  {
  name: 'Books',
  path: '/Books',  
  name: 'Books',
  component: Books
  },
  {
  path: '/ProductList',  
  name: 'ProductList',
  component: ProductList
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
