<template>
  <div class="products-container">
    <h2>Produtos</h2>
<button v-if="isAdmin" @click="showForm = !showForm">
  {{ showForm ? 'Fechar Formulário' : 'Novo Produto' }}
</button>



<ProductForm
  v-if="showForm"
  :initialProduct="editingProduct"
  @save="handleSaveProduct"
/>

<ProductTable
  :products="products"
  :canEdit="isAdmin"
  :canBuy="isUser"
  @delete="handleDelete"
  @update="handleUpdateProduct"
  @buy="handleBuy"
  
/>



  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import ProductForm from '../components/ProductForm.vue'
import ProductTable from '../components/ProductTable.vue'
import { useAuth } from '../auth/useAuth'



interface Product {
  name: string
  category: string
  subcategory: string
  price: number
  stock: number
}

const products = ref<Product[]>([])
const editingProduct = ref<Product | null>(null)
const showForm = ref(false)

const { isAdmin, user } = useAuth()
const isUser = computed(() => user?.role === 'user')


function openEditProduct(product: Product) {
  editingProduct.value = { ...product }
  showForm.value = true
}


function openEditProductForm(product: Product) {
  editingProduct.value = { ...product }
  showForm.value = true
}


function handleDelete(name: string) {
  products.value = products.value.filter((p) => p.name !== name)
}

function handleUpdateProduct(updatedProduct: Product) {
  const index = products.value.findIndex((p) => p.name === updatedProduct.name)
  if (index !== -1) {
    products.value[index] = updatedProduct
  }
  showForm.value = false
}

function handleSaveProduct(updated: Product) {
  const index = products.value.findIndex(p => p.name === updated.name)
  if (index !== -1) {
    products.value[index] = updated
  } else {
    products.value.push(updated)
  }
  showForm.value = false
}





function handleBuy(name: string) {
  const product = products.value.find(p => p.name === name)
  if (product && product.stock > 0) {
    product.stock -= 1
    // Atualiza o localStorage automaticamente pelo watch que você já tem
  }
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
