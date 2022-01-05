<template>
  <div class="navbar" style="z-index: 105">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <zhqc-property-search id="header-search" class="right-menu-item" />
      <screenfull class="right-menu-item hover-effect" />
      <div class="right-menu-item hover-effect">
        <svg-icon class-name="international-icon" icon-class="language" />
      </div>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <!-- <div class="message" @click.stop="handleMessage">
            <span class="tips" v-show="message > 0">{{
              message > 99 ? `99+` : message
            }}</span>
            <img src="../../assets/img/tongzhi.png" alt="" />
          </div> -->
          <span class="text">{{ userName }}</span>
          <!--          <i class="el-icon-caret-bottom"/>-->
          <img src="../../assets/log_mini.png" class="user-avatar">
          <!-- <span style="font-size: 14px" class="text">{{ warehouseName }}</span> -->
        </div>
        <el-dropdown-menu slot="dropdown">
          <div @click="backToPortal">
            <el-dropdown-item> 返回首页 </el-dropdown-item>
          </div>
          <div @click="gotoChange">
            <el-dropdown-item> 修改密码 </el-dropdown-item>
          </div>
          <el-dropdown-item divided>
            <span style="display: block" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="sidebar-background" />
    <password :show-custom-popup="isShow" @closePop="closePop" />
  </div>
</template>

<script>
import Hamburger from '@/Subassembly/Hamburger'
import Screenfull from '@/Subassembly/Screenfull'
import { fmUserLoginOut, getChangeToken } from '@/view/api/ajax'
import password from './password'
//
import { getmessage } from '@/api/api'
export default {
  inject: ['reload'],
  components: {
    Hamburger,
    Screenfull,
    password
  },
  data() {
    return {
      isShow: false,
      Interval: null
    }
  },
  computed: {
    warehouseName() {
      return localStorage.getItem('warehouseName')
    },
    sidebar() {
      return this.$store.state.tagsView.sidebar
    },
    userName() {
      return localStorage.getItem('ms_username')
    },
    message() {
      return this.$store.getters.message
    }
  },
  created() {
    // this.Interval = setInterval(() => {
    //   getmessage().then((res) => {
    //     this.$store.dispatch("tagsView/getMessage", res.obj);
    //   });
    // }, 30000);
  },
  beforeDestroy() {
    window.clearInterval(this.Interval)
  },
  methods: {
    async backToPortal() {
      const res = await getChangeToken()
      if (res.code === 200) {
        window.localStorage.setItem('temp-disabled-default', 'true') // 跳转PORTAL门户禁止默认登录
        const token = res.obj.token
        window.location.href = process.env.VUE_APP_PORTAL + '?token=' + token
      }
    },
    handleMessage() {
      this.$router.push({
        path: '/page_messageManager_messageDetail_messageDetail'
      })
    },
    toggleSideBar() {
      this.$store.dispatch('tagsView/toggleSideBar')
    },
    async logout() {
      const query = {}
      query.platForm = 'Web'
      const res = await fmUserLoginOut(query)
      if (res.code === 200 || res.data.code === 200) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        localStorage.removeItem('ms_userno')
        localStorage.removeItem('ms_username')
        localStorage.removeItem('warehouseName')
        sessionStorage.clear()
        location.reload()
      } else {
        if (res.msg) {
          this.$message.error(res.msg)
        } else if (res.data) {
          this.$message.error(res.data.msg)
        }
      }
    },
    gotoChange() {
      this.isShow = true
    },
    closePop(data) {
      this.isShow = data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  flex-shrink: 0;
  height: 50px;
  overflow: hidden;
  background-color: #f6f6f6;
  /*z-index: 2000;*/
  z-index: 99;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  line-height: 50px;
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right: 5px;
      .avatar-wrapper {
        position: relative;
        height: 50px;
        .text {
          display: inline-block;
          vertical-align: top;
          height: 50px;
          line-height: 50px;
          font-size: 15px;
        }
        .message {
          width: 25px;
          height: 50px;
          display: inline-block;
          vertical-align: top;
          padding-top: 7px;
          margin-right: 25px;
          position: relative;
          .tips {
            display: block;
            position: absolute;
            top: 5px;
            right: -11px;
            width: 20px;
            height: 20px;
            background-color: red;
            overflow: hidden;
            line-height: 20px;
            border-radius: 20px;
            font-size: 12px;
            text-align: center;
          }
          img {
            max-width: 100%;
          }
        }
        .user-avatar {
          margin-left: 10px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          margin-top: 3px;
          display: inline-block;
          -webkit-border-radius: 20px;
          -moz-border-radius: 20px;
          border-radius: 20px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          vertical-align: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
