<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-green-11 text-black" elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleMenuDrawer" />
        <q-toolbar-title> 台鐵動態資訊查詢 </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="menuOpen" side="left" overlay behavior="mobile" elevated>
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              v-ripple
              :to="menuItem.link"
              :active="menuItem.label === menuSelect"
              @click="menuSelect = menuItem.label"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="sass"></style>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const menuOpen = ref(false);
    const menuSelect = ref('');

    const menuList = [
      {
        icon: 'search',
        label: '查詢',
        link: '/search',
        separator: false,
      },
      {
        icon: 'favorite',
        label: '我的最愛',
        link: '/favorite',
        separator: false,
      },
      {
        icon: 'history',
        label: '歷史紀錄',
        link: '/history',
        separator: true,
      },
      {
        icon: 'info',
        label: '關於',
        link: '/about',
        separator: false,
      },
    ];

    function toggleMenuDrawer() {
      menuOpen.value = !menuOpen.value;
    }

    return {
      menuList,
      menuSelect,
      menuOpen,
      toggleMenuDrawer,
    };
  },
});
</script>
