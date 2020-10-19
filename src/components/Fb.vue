<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布口碑</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <template>
            <!-- Two-way Data-Binding -->
            <quill-editor ref="myQuillEditor" v-model="form.content" />
          </template>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            action="http://localhost:3000/upload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :headers="headerObj"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="来源">
          <el-select v-model="form.origin" placeholder="请选择来源">
            <el-option label="同学" value="同学"></el-option>
            <el-option label="朋友" value="朋友"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createFrom">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        // pic: "",
        origin: "",
      },
      headerObj: {
        Authorization: window.sessionStorage.getItem("token"),
      },
    };
  },
  methods: {
    async createFrom() {
      const { data } = await this.$http.post("/up", this.form);
      console.log(data);
    },
    handleSuccess(response) {
      console.log(response);
    },
    handleRemove() {},
  },
};
</script>

<style scoped>
</style>