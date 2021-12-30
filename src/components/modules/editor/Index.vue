<template>
  <div>
    <textarea
      id="edit"
      class="layui-textarea fly-editor"
      name="content"
      ref="textEdit"
      v-model="content"
      placeholder="快来说点什么吧！"
    ></textarea>
    <!-- @focus="focusEvent()"
      @blur="blurEvent()" -->
  </div>
</template>

<script>
export default {
  name: 'editor',
  data () {
    return {
      content: '',
    }
  },
  updated () {
    this.$emit('changeContent', this.content)
  }
}
</script>

<style>

</style>
