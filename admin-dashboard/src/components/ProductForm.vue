<template>
  <form @submit.prevent="saveProduct" class="product-form">
    <div class="form-group">
      <label>Nome do Produto</label>
      <input v-model="product.name" required placeholder="Ex: Notebook Dell" />
    </div>

    <div class="form-group">
      <label>Categoria</label>
      <select v-model="product.category" @change="updateSubcategories" required>
        <option disabled value="">Selecione</option>
        <option v-for="cat in Object.keys(categories)" :key="cat">{{ cat }}</option>
      </select>
    </div>

    <div class="form-group" v-if="product.category">
      <label>Subcategoria</label>
      <select v-model="product.subcategory" required>
        <option disabled value="">Selecione</option>
        <option v-for="sub in categories[product.category]" :key="sub">{{ sub }}</option>
      </select>
    </div>

    <div class="form-group">
      <label>Preço</label>
      <input type="number" v-model.number="product.price" required min="0" />
    </div>

    <div class="form-group">
      <label>Estoque</label>
      <input type="number" v-model.number="product.stock" required min="0" />
    </div>

    <button type="submit">Salvar Produto</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emitSave = defineEmits(['save'])

const product = ref({
  name: '',
  category: '',
  subcategory: '',
  price: 0,
  stock: 0
})


const categories: Record<string, string[]> = {
  Eletrônicos: ['Celulares', 'Computadores', 'Acessórios'],
  Roupas: ['Masculina', 'Feminina', 'Infantil'],
  Alimentos: ['Perecíveis', 'Não perecíveis', 'Bebidas']
}

function updateSubcategories() {
  product.value.subcategory = ''
}

function saveProduct() {
  emitSave('save', { ...product.value })
  product.value = {
    name: '',
    category: '',
    subcategory: '',
    price: 0,
    stock: 0
  }
}
</script>

<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
input, select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #219150;
}
</style>
