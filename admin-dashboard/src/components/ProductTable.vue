<template>
  <table class="product-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Subcategoria</th>
        <th>Preço</th>
        <th>Estoque</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.name + product.category">
        <td>{{ product.name }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.subcategory }}</td>
        <td>R$ {{ product.price.toFixed(2) }}</td>
        <td>{{ product.stock }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  products: {
    name: string
    category: string
    subcategory: string
    price: number
    stock: number
  }[]
}>()
</script>

<style scoped>
.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
th {
  background-color: #ecf0f1;
  text-align: left;
}
</style>
