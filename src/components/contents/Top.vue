<template>
  <div class="fly-panel" v-show="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
    </div>
    <list-item :lists="lists" @nextpage="nextPage()" :isShow="false"/>
  </div>
</template>

<script>
import ListItem from '@/components/contents/ListItem'
import ListMix from '@/mixin/list'
export default {
  name: 'top',
  mixins: [ListMix],
  data () {
    return {
      isTop: "1"
    }
  },
  components: {
    ListItem
  }
}
</script>

<style>

</style>
