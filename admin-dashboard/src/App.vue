<template>
  <router-view v-slot="{ Component }">
    <component
      :is="Component"
      v-if="$route.meta.layout === false"
    />
    <div v-else class="layout">
      <Sidebar />
      <div class="content">
        <Header />
        <component :is="Component" />
      </div>
    </div>
  </router-view>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
</script>

<style>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
