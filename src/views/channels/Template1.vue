<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <blog-list/>
      </div>
      <div class="layui-col-md4">
        <blog-hotlist/>
        <blog-ads/>
        <blog-links/>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/contents/List'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
export default {
  name: 'template1',
  components: {
    'blog-list': List,
    'blog-hotlist': HotList,
    'blog-ads': Ads,
    'blog-links': Links
  }
}
</script>

<style>

</style>
