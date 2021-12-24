<template>
  <div class="layui-container fly-marginTop">
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title">
        <li><router-link :to="{name: 'login'}">登入</router-link></li>
        <li class="layui-this">注册</li>
      </ul>
      <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
        <ValidationObserver ref="observer" v-slot="{ validate }">
        <div class="layui-tab-item layui-show">
          <div class="layui-form layui-form-pane">
            <form method="post">
              <div class="layui-form-item">
                <label for="L_email" class="layui-form-label">邮箱</label>
                <validation-provider name="username" rules="required|email" v-slot="{errors}">
                  <div class="layui-input-inline">
                    <input v-model="username" type="text" id="L_email" name="email" required lay-verify="email" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                  <div class="layui-row">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <label for="L_username" class="layui-form-label">昵称</label>
                <validation-provider name="name" rules="required|min:4" v-slot="{errors}">
                  <div class="layui-input-inline">
                    <input v-model="name" type="text" id="L_username" name="username" required lay-verify="required" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <label for="L_pass" class="layui-form-label">密码</label>
                <validation-provider name="password" rules="required|min:6|max:16|confirmed:confirmation" v-slot="{errors}">
                  <div class="layui-input-inline">
                    <input v-model="password" type="password" id="L_pass" name="password" required lay-verify="required" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                  <div class="layui-row">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <validation-provider name="password" vid="confirmation" v-slot="{errors}">
                  <div class="layui-row">
                    <label for="L_repass" class="layui-form-label">确认密码</label>
                    <div class="layui-input-inline">
                      <input v-model="repassword" type="password" id="L_repass" name="repass" required lay-verify="required" autocomplete="off" class="layui-input">
                    </div>
                  </div>
                  <div class="layui-row">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <label for="L_vercode" class="layui-form-label">验证码</label>
                <validation-provider name="code" rules="required|length:4" v-slot="{errors}">
                  <div class="layui-input-inline">
                    <input v-model="code" type="text" id="L_vercode" name="vercode" required lay-verify="required" placeholder="请回答后面的问题" autocomplete="off" class="layui-input">
                  </div>
                  <div>
                    <span class="svg" style="color: #c00;" @click="_getCode()" v-html="svg"></span>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <button class="layui-btn" type="button" @click.prevent="validate().then(submit)">立即注册</button>
              </div>
              <div class="layui-form-item fly-form-app">
                <span>或者直接使用社交账号快捷注册</span>
                <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
              </div>
            </form>
          </div>
        </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCode, reg } from '@/api/login'
export default {
  data () {
    return {
      svg: '',
      username: '',
      name: '',
      password: '',
      repassword: '',
      code: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    this._getCode()
  },
  methods: {
    _getCode () {
      let sid = this.$store.state.sid
      getCode(sid).then(res => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) return
      reg({
        username: this.username,
        name: this.name,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.username = ""
          this.name = ""
          this.password = ""
          this.repassword = ""
          this.code = ""
          requestAnimationFrame(() => {
            this.$refs.observer.reset()
          })
          // 跳转到登录界面，让用户登录
          this.$alert('注册成功！')
          setTimeout(() => {
            this.$router.push('/login')
          }, 100)
        } else {
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.svg{
  position: relative;
  top: -4px;
}
</style>
