<template>
  <div class="products-container">
    <h2>Produtos</h2>
    <button @click="showForm = !showForm">
      {{ showForm ? 'Fechar Formulário' : 'Novo Produto' }}
    </button>

    <ProductForm v-if="showForm" @save="handleSaveProduct" />
    <ProductTable :products="products" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ProductForm from '../components/ProductForm.vue'
import ProductTable from '../components/ProductTable.vue'

interface Product {
  name: string
  category: string
  subcategory: string
  price: number
  stock: number
}

const showForm = ref(false)
const products = ref<Product[]>([])

function handleSaveProduct(product: Product) {
  products.value.push(product)
  showForm.value = false
}

onMounted(() => {
  const stored = localStorage.getItem('products')
  if (stored) products.value = JSON.parse(stored)
})

watch(products, (newVal) => {
  localStorage.setItem('products', JSON.stringify(newVal))
}, { deep: true })
</script>

<style scoped>
.products-container {
  padding: 20px;
}
button {
  margin-bottom: 12px;
  padding: 10px 16px;
  background-color: #3498db;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #2980b9;
}
</style>
