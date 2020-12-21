<template>
  <div class="login-container">
    <div class="login-form-wrap">
        <div class="login-head">
            <div class="logo"></div>
        </div>
        <el-form class="login-form" ref="form" :model="user">
            <el-form-item>
                <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
    // onLogin () {
    //   // 获取表单数据（根据接口要求绑定数据）
    //   // const user = this.user

    //   // 表单验证
    //   // validate 方法是异步的
    //   this.$refs['login-form'].validate(valid => {
    //     // 如果表单验证失败，停止请求提交
    //     if (!valid) {
    //       return
    //     }

    //     // 验证通过，请求登录
    //     this.login()
    //   })
    // },

    // login () {
    //   // 开启登陆中 loading...
    //   this.loginLoading = true

    //   // 对于代码中的请求操作
    //   // 1、接口请求可能需要重用
    //   // 2、实际工作中，接口非常容易变动，改起来麻烦
    //   // 我们建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理
    //   // 这样做的好处就是：管理维护更方便，也好重用
    //   login(this.user).then(res => {
    //     // console.log(res)

    //     // 登录成功
    //     this.$message({
    //       message: '登录成功',
    //       type: 'success'
    //     })

    //     // 关闭 loading
    //     this.loginLoading = false

    //     // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
    //     // 本地存储只能存储字符串
    //     // 如果需要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
    //     window.localStorage.setItem('user', JSON.stringify(res.data.data))

    //     // 跳转到首页
    //     // this.$router.push('/')

    //     this.$router.push({
    //       name: 'home'
    //     })
    //   }).catch(err => { // 登录失败
    //     console.log('登录失败', err)
    //     this.$message.error('登录失败，手机号或验证码错误')

    //     // 关闭 loading
    //     this.loginLoading = false
    //   })
    // }
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
