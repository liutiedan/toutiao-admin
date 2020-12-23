<template>
    <el-container class="layout-container">
        <el-aside class="aside" width="auto">
          <app-aside
          class="aside-menu"
          :is-collapse="isCollapse"
          />
        </el-aside>
        <el-container>
            <el-header class="header">
              <i
                :class="{
                  'el-icon-s-fold': !isCollapse,
                  'el-icon-s-unfold': isCollapse
                }"
                @click="isCollapse = !isCollapse"
              ></i>
              <el-dropdown class="">
                <span class="el-dropdown-link">
                  {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>设置</el-dropdown-item>
                  <!-- 组件默认不识别原生事件，除非内部做了处理 -->
                  <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
  <!-- <div class="layout-container">
    <div>顶部导航栏</div>
    <router-view />
    <div>侧边导航栏</div>
  </div> -->
</template>
<script>
import AppAside from './component/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      user () {},
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log('用户信息', res.data.data)
        this.user = res.data.data
      })
    },
    onLogout () {
      console.log('onLogout')
      window.localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.header {
  // background: #b3c0d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // border-bottom: 1px solid #ccc;
  // .avatar-wrap {
  //   display: flex;
  //   align-items: center;
  //   .avatar {
  //     width: 30px;
  //     height: 30px;
  //     border-radius: 50%;
  //     margin-right: 10px;
  //   }
  // }
}

.main {
  background-color: #e9eef3;
}
</style>
