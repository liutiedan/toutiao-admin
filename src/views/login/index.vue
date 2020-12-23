<template>
  <div class="login-container">
    <div class="login-form-wrap">
        <div class="login-head">
            <div class="logo"></div>
        </div>
        <el-form :model="user" :rules="formRules" class="login-form" ref="login-form">
            <el-form-item props="mobile">
                <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item props="code">
                <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn"
                  type="primary" @click="onLogin"
                  :loading="loginLoading"
                >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
// import request from '@/utils/request'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13933333333',
        code: '246810'
      },
      checked: false,
      loginLoading: false,
      formRules: { // 表单验证规则配置
        // 要验证的数据名称：规则列表[]
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ]
        // agree: [
        //     {
        //     // 自定义校验规则：https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
        //     // 验证通过：callback()
        //     // 验证失败：callback(new Error('错误消息'))
        //     validator: (rule, value, callback) => {
        //         if (value) {
        //         callback()
        //         } else {
        //         callback(new Error('请同意用户协议'))
        //         }
        //     },
        //     // message: '请勾选同意用户协议',
        //     trigger: 'change'
        //     }
        // ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据（根据接口要求绑定数据）
    //   const user = this.user

      //  表单验证
      //   this.$refs['login-form'].validate((valid) => {
      //     console.log(valid)
      //     if (valid) {
      //       alert('submit!')
      //     } else {
      //       console.log('error submit!!')
      //       return false
      //     }
      //     // 验证通过，请求登录
      //     this.login()
      //   })
      // 验证通过，请求登录
      this.login()
    },
    login () {
      this.loginLoading = true
      login(this.user).then(res => {
        console.log('res', res)

        // 成功提示消息
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        this.loginLoading = false
        //  本地存储只能存字符串，如果需要对象、数组类型地数据，则把他们转为JSON格式字符串存储
        window.localStorage.setItem('user', JSON.stringify(res.data.data))

        //  跳转到首页
        // this.$router.push('/')
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('手机号或验证码错误')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
      .logo {
        width: 259px;
        height: 57px;
        background: url("../../assets/logo_index.png") no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
