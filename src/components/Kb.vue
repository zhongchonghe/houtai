<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>口碑管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <span style="margin-right: 10px">状态</span>
      <el-radio v-model="radio" label="1">全部</el-radio>
      <el-radio v-model="radio" label="2">待审核</el-radio>
      <el-radio v-model="radio" label="2">审核通过</el-radio>
      <el-radio v-model="radio" label="2">审核失败</el-radio>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        style="margin: 20px 0 0 -11px"
      >
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择来源">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button type="primary">筛选</el-button>
    </el-card>
    <el-card style="margin-top: 30px">
      <p>根据条件筛选供查询1234条结果:</p>
      <el-table :data="kblist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="封面" prop="img"></el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">审核通过</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
              >待审核</el-tag
            >
            <el-tag type="warning" v-else>审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" prop="date"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="removeUserById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        date: "",
      },
      kblist: [
        {
          img: "图片",
          title: "标题1",
          date: "2020-10-17",
        },
      ],
      radio: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>