<template>
  <div class="my-container">
    <!-- 未登录状态-->
    <div v-if="!user"
         class="header not-login">
      <div class="to-login"
           @click="$router.push('/login')">
        <img src="~@/assets/mobile.png"
             class="mobile-img"
             alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 登录状态 -->
    <div v-else
         class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avater"
                     round
                     fit="cover"
                     :src="userInfo.photo" />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini"
                      round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <div class="count">{{userInfo.art_count}}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.follow_count}}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.fans_count}}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{userInfo.like_count}}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>

    <!-- 导航 -->
    <van-grid :column-num="2"
              class="grid-nav"
              clickable>
      <van-grid-item class="grid-item">
        <i slot="icon"
           class="toutiao toutiao-shoucang"></i>
        <span slot="text"
              class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon"
           class="toutiao toutiao-lishi"></i>
        <span slot="text"
              class="text">历史</span>
      </van-grid-item>
    </van-grid>

  <!-- 单元格 -->
    <van-cell title="消息通知"
              is-link />
    <van-cell title="小智同学"
              is-link />
    <van-cell title="退出登录"
              class="logout-cell"
              v-if="user"
              @click="onLogout"
               />

  </div>
</template>

<style lang="less" scope>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
    .to-login {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .mobile-img {
      padding-bottom: 10px;
      width: 142px;
    }
    .text {
      color: #fff;
      font-size: 30px;
    }
  }
  .not-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        color: #fff;
        .avater {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 25px;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 10px;
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
      .logout-cell{
        margin-top: 10px;
        color: #d86262;
        text-align: center;
      }
}
</style>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'

export default {
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出吗'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },

    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取用户信息失败,请稍后再试')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }

}
</script>
