<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"
                 class="page-nav-bar">

        <van-icon slot="left" name="cross" @click="$router.back()"/>

    </van-nav-bar>
    <!-- 表单 -->
    <van-form ref="loginRef"
              @submit="onSubmit">
      <van-field name="mobile"
                 type="number"
                 maxlength="11"
                 v-model="user.mobile"
                 left-icon="like"
                 :rules="userFormRules.mobile"
                 placeholder="请输入手机号">
        <i slot="left-icon"
           class="toutiao toutiao-shouji"></i>
      </van-field>

      <van-field v-model="user.code"
                 name="code"
                 type="number"
                 maxlength="6"
                 :rules="userFormRules.code"
                 placeholder="请输入验证码">
        <i slot="left-icon"
           class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- time倒计时时间 -->
          <van-count-down v-if="isCountDownShow"
                          :time="1000 * 60"
                          format="ss s"
                          @finish="isCountDownShow=false" />
          <van-button size="small"
                      v-else
                      class="send-sms-btn"
                      @click="onSendSms"
                      native-type="button"
                      round>发送验证码</van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button block
                    class="login-btn"
                    type="info"
                    native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendsSms } from '@/api/user.js'

export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|6|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 是否展示倒计时
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user

      // Toast 轻提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 如果为0,持续展示
      })
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data)
        this.$toast.success('登录成功')

        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },
    // 发送验证码
    async onSendSms () {
      // 效验手机号
      try {
        await this.$refs.loginRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败' + err)
      }
      // 倒计时 countDown
      this.isCountDownShow = true
      // 请求发送验证码
      try {
        await sendsSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送频繁,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less">
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  background-color: #ededed;
  width: 152px;
  line-height: 46px;
  height: 46px;
  font-size: 22px;
  color: #666;
  padding: 0;
}
.login-btn-wrap {
  padding: 53px 33px;
}
.login-btn {
  background-color: #6db4fb;
  border-radius: 8px;
  border: 0;
}

</style>
