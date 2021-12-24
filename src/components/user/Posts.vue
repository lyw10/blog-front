<template>
  <div class="fly-panel fly-panel-user" pad20>
    <!--
    <div class="fly-msg" style="margin-top: 15px;">
      您的邮箱尚未验证，这比较影响您的帐号安全，<a href="activate.html">立即去激活？</a>
    </div>
    -->
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <li>
          <router-link :to="{name:'mypost'}">我发的帖（<span>89</span>）</router-link>
        </li>
        <li>
          <router-link :to="{name:'mycollections'}">我收藏的帖（<span>16</span>）</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-posts'
}
</script>

<style>

</style>
