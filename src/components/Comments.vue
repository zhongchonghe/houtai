<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="date" label="标题"> </el-table-column>
        <el-table-column prop="name" label="评论数"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.switch"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        layout="total, prev, pager, next"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          date: "2016-05-02",
          name: "王小虎",
          status: "关闭",
          switch: false,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          status: "正常",
          switch: true,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          status: "关闭",
          switch: false,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          status: "正常",
          switch: true,
        },
      ],
      total: 4,
    };
  },
};
</script>

<style scoped>
.el-pagination {
  float: right;
}
</style>