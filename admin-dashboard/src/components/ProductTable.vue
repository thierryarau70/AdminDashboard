<template>
  <table class="product-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Subcategoria</th>
        <th>Preço</th>
        <th>Estoque</th>
        <th>Ação</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.name + product.category">
        <td>{{ product.name }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.subcategory }}</td>
        <td>R$ {{ product.price.toFixed(2) }}</td>
        <td>{{ product.stock }}</td>
       <td>
  <button
    v-if="canEdit"
    class="delete-button"
    @click="$emit('delete', product.name)"
  >
    Deletar
  </button>

  <button
    v-if="canBuy && product.stock > 0"
    class="buy-button"
    @click="$emit('buy', product.name)"
  >
    Comprar
  </button>

  <span v-if="canBuy && product.stock === 0" style="color: gray; font-style: italic;">
    Esgotado
  </span>
</td>


      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useAuth } from '../auth/useAuth';

const { isAdmin } = useAuth()
const isUser = !isAdmin

defineProps<{
  products: {
    name: string
    category: string
    subcategory: string
    price: number
    stock: number
  }[],
  canEdit: boolean,
  canBuy: boolean
}>()



defineEmits<{
  (e: 'delete', name: string): void
    (e: 'buy', name: string): void
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

.delete-button {
  background-color: #e74c3c;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background-color: #c0392b;
}

.buy-button {
  background-color: #2ecc71;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 6px;
  transition: background-color 0.2s;
}

.buy-button:hover {
  background-color: #27ae60;
}

</style>
