<template>
  <div class="login-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio label="1">单图</el-radio>
            <el-radio label="3">三图</el-radio>
            <el-radio label="0">无图</el-radio>
            <el-radio label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channel_id" placeholder="请选择频道">
            <el-option
              :label="channel.name"
              :value="channel.id"
              :key="index"
              v-for="(channel, index) in channels"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getArticleChannels, addArticle, getArticle } from '@/api/articles'

export default {
  name: 'publishIndex',
  components: {},
  props: {},
  data () {
    return {
      article: {
        title: '接口问题',
        content: '接口失效',
        cover: {
          type: 1,
          images: []
        }
      },
      channels: [],
      channel_id: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    onPublish (draft) {
      console.log('文章内容:', this.article)
      addArticle(this.article).then(res => {
        console.log('发布文章:', res)
      })
    },
    loadChannels () {
      getArticleChannels().then(({ data: { data } }) => {
        // console.log('发布-频道', data)
        this.channels = data.channels
      })
    },
    loadArticle () {
      console.log('loadArticle')
      getArticle(this.$route.query.id).then(res => {
        // this.article = res.data.data
        console.log('aaa', res.data.result.articlesList[this.$route.query.id])
        this.article = res.data.result.articlesList[this.$route.query.id]
      })
    }
  }
}
</script>
<style scoped lang='less'></style>
