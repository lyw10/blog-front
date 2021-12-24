<template>
  <div>
    <blog-panel/>
    <router-view></router-view>
  </div>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  name: 'home',
  components: {
    'blog-panel': Panel,
  }
}
</script>

<style>

</style>
