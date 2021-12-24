<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <blog-top/>
        <blog-list/>
      </div>
      <div class="layui-col-md4">
        <blog-tips/>
        <blog-sign/>
        <blog-hotlist/>
        <blog-ads/>
        <blog-links/>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/contents/List'
import Top from '@/components/contents/Top'
import Tips from '@/components/sidebar/Tips'
import Sign from '@/components/sidebar/Sign'
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
export default {
  name: 'index',
  components: {
    'blog-list': List,
    'blog-top': Top,
    'blog-tips': Tips,
    'blog-sign': Sign,
    'blog-hotlist': HotList,
    'blog-ads': Ads,
    'blog-links': Links,
  }
}
</script>

<style>

</style>
