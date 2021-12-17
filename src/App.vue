<template>
  <div id="app">
    <blog-header/>
    <router-view></router-view>
    <blog-footer/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    'blog-header': Header,
    'blog-footer': Footer
  }
}
</script>

<style lang="scss">
@import 'assets/layui/css/layui.css';
@import 'assets/css/global.css';
@import 'assets/layui/css/modules/layer/default/layer.css';
</style>
