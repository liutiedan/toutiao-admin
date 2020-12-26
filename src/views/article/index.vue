<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null" >全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
              label="全部"
              :value="null"
              >
            </el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
              >
            </el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date1"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getArticlesList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ total_count }} 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table
        :data="articlesList"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cover"
          label="封面"
          width="180">
          <template slot-scope="scope">
            <img class="article-cover" :src="scope.row.cover">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <!-- 自定义模板之后 prop 就没用了要删 -->
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">
              {{ articleStatus[scope.row.status].text }}
            </el-tag>
            <!-- <el-tag type="warning" v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="info" v-else-if="scope.row.status === 4">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="$router.push('/publish?id=' + scope.row.id)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="onDeleteArticle">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="total_count"
        @current-change="onCurrentChange"
      >
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>
<script>
import { getArticles, getArticleChannels, getTest } from '@/api/articles'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articlesList: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      total_count: 10,
      status: null,
      channels: [],
      channelId: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticlesList()
    this.getChannels()
    this.toTest()
  },
  mounted () {},
  methods: {
    getArticlesList (page = 1) {
      getArticles({
        // page: 2,
        page,
        page_size: 20,
        // 视频day409
        status,
        channel_id: this.channelId
      }).then(res => {
        console.log('articles:', res.data)
        const { articlesList, total_count: totalCount } = res.data.result
        this.articlesList = articlesList
        this.total_count = totalCount
      })
    },
    onCurrentChange (page) {
      console.log(page)
      this.getArticlesList(page)
    },
    getChannels () {
      getArticleChannels().then(res => {
        console.log('channels:', res)
        this.channels = res.data.data.channels
      })
    },
    onDeleteArticle () {
      console.log('删除')
    },
    toTest () {
      console.log('hahhahahahahh')
      getTest().then(res => {
        console.log('测试:', res)
      })
    }
  }
}
</script>
<style scoped lang='less'>
  .article-cover{
    width: 100px;
  }
</style>
