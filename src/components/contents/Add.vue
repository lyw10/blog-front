<template>
  <div class="layui-container fly-marginTop">
  <div class="fly-panel" pad20 style="padding-top: 5px;">
    <!--<div class="fly-none">没有权限</div>-->
    <div class="layui-form layui-form-pane">
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">发表新帖<!-- 编辑帖子 --></li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <form>
              <validation-observer ref="observer" v-slot="{ validate }">
              <div class="layui-row layui-col-space15 layui-form-item">
                <div class="layui-col-md3">
                  <validation-provider name="catalog" rules="is_not:请选择" v-slot="{errors}">
                  <label class="layui-form-label">所在专栏</label>
                  <div class="layui-input-block" @click="isSelectCatalog = !isSelectCatalog">
                    <div class="layui-unselect layui-form-select" :class="{'layui-form-selected': isSelectCatalog}">
                      <div class="layui-select-title">
                        <input v-model="catalog[cataIndex].text" type="text" placeholder="请选择" readonly class="layui-input layui-unselect">
                        <i class="layui-edge"></i>
                      </div>
                      <dl class="layui-anim layui-anim-upbit">
                        <dd v-for="(item,index) in catalog" :key="'addCatalog'+index" :class="{'layui-this':index === cataIndex}" @click="chooseCatalog(item,index)">{{item.text}}</dd>
                      </dl>
                    </div>
                  </div>
                  <div class="layui-row">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                  </validation-provider>
                </div>
                <div class="layui-col-md9">
                  <validation-provider name="title" rules="required" v-slot="{errors}">
                  <label for="L_title" class="layui-form-label">标题</label>
                  <div class="layui-input-block">
                    <input v-model="title" type="text" class="layui-input">
                    <!-- <input type="hidden" name="id" value="{{d.edit.id}}"> -->
                  </div>
                  <div class="layui-row">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </validation-provider>
                </div>
              </div>
              <Editor @changeContent="add"/>
              <div class="layui-form-item">
                <div class="layui-inline">
                  <label class="layui-form-label">悬赏飞吻</label>
                    <div class="layui-input-inline" style="width: 190px;">
                      <div class="layui-unselect layui-form-select" :class="{'layui-form-selected': isSelectFav}" @click="isSelectFav = !isSelectFav">
                        <div class="layui-select-title">
                          <input v-model="favList[favIndex]" type="text" placeholder="请选择" readonly class="layui-input layui-unselect">
                          <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                          <dd v-for="(item,index) in favList" :key="'addFav'+index" :class="{'layui-this':index === favIndex}" @click="chooseFav(item,index)">{{item}}</dd>
                        </dl>
                      </div>
                  </div>
                  <div class="layui-form-mid layui-word-aux">发表后无法更改飞吻</div>
                </div>
              </div>
              <div class="layui-form-item">
                <validation-provider
                  name="code"
                  ref="codefield"
                  rules="required|length:4"
                  v-slot="{errors}"
                >
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <input type="text" name="code" v-model="code" placeholder="请输入验证码" autocomplete="off" class="layui-input"/>
                    </div>
                    <div>
                      <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00;">{{errors[0]}}</span>
                    </div>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <!-- button的默认值是submit，submit有默认事件，button则没有 -->
                <button type="button" class="layui-btn" @click="validate().then(submit)">立即发布</button>
              </div>
              </validation-observer>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { addPost } from '@/api/content'
import Editor from '@/components/modules/editor/Index'
import CodeMix from '@/mixin/code'
export default {
  name: 'add',
  mixins: [CodeMix],
  components: {
    Editor
  },
  data () {
    return {
      content: '',
      title: '',
      isSelectCatalog: false,
      isSelectFav: false,
      cataIndex: 0,
      favIndex: 0,
      catalog: [
        {
          text: '请选择',
          value: '',
        },
        {
          text: '提问',
          value: 'ask',
        },
        {
          text: '分享',
          value: 'share',
        },
        {
          text: '讨论',
          value: 'discuss',
        },
        {
          text: '建议',
          value: 'advice',
        }
      ],
      favList: [20, 30, 40, 50, 60]
    }
  },
  methods: {
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    chooseFav (item, index) {
      this.favIndex = index
    },
    add (val) {
      this.content = val
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return
      // 文章内容是否为空的判断
      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空！')
        return
      }
      // 添加新的文章
      addPost({
        title: this.title,
        catalog: this.catalog[this.cataIndex].value,
        content: this.content,
        fav: this.favList[this.favIndex],
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          // 清空已经发布的内容
          // localStorage.setItem('addData', '')
          this.$pop('', '发贴成功!')
          setTimeout(() => {
            // this.$router.push({ name: 'detail', params: { tid: res.data._id } })
            this.$router.push({ name: 'index' })
          }, 2000)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
