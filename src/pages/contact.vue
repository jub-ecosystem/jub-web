<template>
  <div class="contact-container">
    <h1>CONTACTO</h1>

    <table v-if="usersStore.catalogs.length > 0" class="catalog-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th> <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in usersStore.catalogs" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Cargando datos...</p>
    
    <button @click="usersStore.fetchUsers">Refrescar Datos</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUsersStore } from '@/stores/users'; // Ajusta la ruta a tu archivo de store

// 1. Instanciamos el store
const usersStore = useUsersStore();

// 2. Ejecutamos la función de carga cuando el componente se monta
onMounted(() => {
  usersStore.fetchUsers();
});

definePage({
    name: 'Contact',
    meta: {
        requiresAuth: false,
        layout: 'default',
    },
});
</script>

<style scoped lang="sass">
.catalog-table
  width: 100%
  border-collapse: collapse
  margin-top: 20px

  th, td
    border: 1px solid #ddd
    padding: 8px
    text-align: left

  th
    background-color: #f4f4f4
</style>
