<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-col>
        <el-row>
          <el-radio-group v-model="radio1" size="medium">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="收藏"></el-radio-button>
          </el-radio-group>
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >上传图片</el-button
          >
        </el-row>
      </el-col>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: "全部",
      radio2: "收藏",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>