<template>
  <div>
    <zhqc-transit />
  </div>
</template>

<script>
import router from './../../../src/router'
import zhqcTransit from '@/Subassembly/ZhqcTransit'
import LangSelect from '@/Subassembly/LangSelect'
export default {
  name: 'Login',
  components: {
    LangSelect,
    zhqcTransit
  },
  data: function() {
    return {
      submitData: {
        userNo: '',
        pwd: ''
      },
      loading: false,
      passwordType: 'password',
      ruleForm: {
        userNo: '',
        pwd: '',
        userLanguage: 'zh-CN'
      },
      rules: {
        userNo: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      languageList: [{ langKey: 1, langName: '中文', langValue: 'zh-CN' }, { langKey: 2, langName: 'English', langValue: 'en' }],

      fmMenus: [
      ]
    }
  },
  computed: {
    addRouters() {
      return this.$store.state.login.addRouters
    }
  },
  created() {
    this.$store.dispatch('tagsView/toggleSideBar')
  },
  mounted() {
    this.toLogin()
  },
  methods: {
  //
    toLogin() {
      // const queryParam = window.location.search
      // const Datascreen = window.localStorage.getItem('Datascreen')
      // if (queryParam && queryParam !== '') {
      //   const query = decodeURI(window.location.search.substring(1))
      //   const vars = query.split('&')
      //   let code
      //   for (let i = 0; i < vars.length; i++) {
      //     const pair = vars[i].split('=')
      //     if (pair[0] === 'code') {
      //       code = pair[1]
      //       break
      //     }
      //   }
      //   if (code) {
      //     this.$store.dispatch('login/getTokenByCode', { 'code': code }).then(() => {
      //       const resp = this.$store.state.login.tokenByCodeResp
      //       if (resp) {
      //         if (resp.code === 200) {
      //           const userNo = window.localStorage.getItem('ms_userNo')
      //           this.$store.dispatch('login/getUserInfoByUserNo', { userNo: userNo }).then(() => {
      //             const resp2 = this.$store.state.login.UserInfo
      //             if (resp2.code === 200) {
      //               window.localStorage.setItem('UserInfo', JSON.stringify({ userType: resp2.obj.userType, idRecord: resp2.obj.idRecord }))
      //             }
      //           })
      //           console.log('addRouters', JSON.stringify(this.addRouters))
      //           debugger
      //           this.$router.addRoutes(this.addRouters)
      //           this.$router.push('/')
      //         } else if (resp.code === 401) {
      //           window.location = window.location.origin
      //         } else {
      //           window.location = window.localStorage.getItem('ssoUrl')
      //         }
      //       }
      //     })
      //   }
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-wrap{
    width:100%;
    height:100%;
    overflow: hidden;
    background-color:#036fe8;
    .login-form {
      position: relative;
      width: 420px;
      max-width: 100%;
      padding: 50px 35px 0;
      margin: 0 auto;
      margin-top: 13%;
      /*overflow: hidden;*/
      background: #fff;
      border-radius: 10px;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      position: absolute;
      top: 3px;
      z-index: 1000;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 32px;
        margin: 0px auto 18px auto;
        text-align: center;
        font-weight: bold;
        color: #409eff;
      }
      .set-language {
        position: absolute;
        top: 3px;
        font-size:18px;
        right: 0px;
        cursor: pointer;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
</style>
