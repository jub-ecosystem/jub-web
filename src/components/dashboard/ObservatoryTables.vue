<template>
  <v-card rounded="xl">
    <v-table class="text-center" >
      <thead>
        <tr class="bg-grey text-black" >
          <th class="text-center">Nombre</th>
          <th class="text-center">Porcentaje</th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.obid">
          <td>{{ item.title }}</td>
          <td>100%</td>
          <td>
            <v-btn size="small" variant="text" color="primary" @click="$emit('show-details', item)">
              Ver detalles
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup>
defineProps(['items']);
defineEmits(['show-details']);
</script>