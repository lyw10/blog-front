<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item,index) in items" :key="'listitem'+index">
        <!-- 点击用户头像，跳转到他的首页 -->
        <router-link :to="{name: 'home'}" class="fly-avatar">
          <img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">
        </router-link>
        <h2>
          <a class="layui-badge">{{item.catalog}}</a>
          <router-link :to="{name: 'detail', params: {tid: item._id}}">{{item.title}}</router-link>
        </h2>
        <div class="fly-list-info">
          <a link>
            <cite class="mr1">{{item.uid && item.uid.name}}</cite>
            <!-- <i class="iconfont icon-renzheng" title="认证信息：XXX"></i> -->
            <i class="layui-badge fly-badge-vip" v-if="item.uid && item.uid.isVip !== '0'">{{'VIP' + item.uid.isVip}}</i>
          </a>
          <span>{{item.created | moment}}</span>
          <span class="fly-list-kiss layui-hide-xs"><i class="iconfont icon-kiss"></i> {{item.fav}}</span>
          <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.isEnd === '1'">已结</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i>
            {{item.answer}}
          </span>
        </div>
        <div class="fly-list-badge" v-show="item.tags.length">
          <span class="layui-badge layui-bg-red" v-for="(tag,index) in item.tags" :key="'tag'+index" :class="tag.class">{{tag.name}}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShow">
      <div class="laypage-main" v-if="!isEnd">
        <a @click.prevent="more()" class="laypage-next">更多求解</a>
      </div>
      <div class="nomore gray" v-else>
        没有更多了
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Config from '@/mixin/config'
export default {
  name: 'listItem',
  mixins: [Config],
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items () {
      _.map(this.list, item => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'advice':
            item.catalog = '建议'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'discuss':
            item.catalog = '讨论'
            break
        }
      })
      return this.lists
    }
  },
  methods: {
    more () {
      this.$emit('nextpage')
    }
  }
}
</script>

<style lang="scss" scoped>
.nomore {
  font-size: 16px;
  padding: 30px 0;
}
</style>
