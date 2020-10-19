<template>
  <div>
    <el-container>
      <el-main>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button class="add" @click="addBook" type="primary"
          >添加文章</el-button
        >
        <el-card>
          <el-table
            border
            :data="
              list.slice((currentPage - 1) * pagesize, currentPage * pagesize)
            "
            stripe
          >
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="author" label="作者"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="slot">
                <el-button
                  type="primary"
                  @click="editDialog(slot.row)"
                  icon="el-icon-edit"
                ></el-button>
                <el-button
                  @click="deleteDialog(slot.row.title_id)"
                  type="danger"
                  icon="el-icon-delete"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </el-card>
      </el-main>
    </el-container>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑文章" :visible.sync="editDialogVisible" width="30%">
      <el-form
        :model="editRuleForm"
        :rules="editRules"
        ref="editRef"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="editRuleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="editRuleForm.author"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加对话框 -->
    <el-dialog
      title="添加文章"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addClose"
    >
      <el-form
        :model="addRuleForm"
        :rules="editRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="addRuleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="author">
          <el-input v-model="addRuleForm.author"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      editDialogVisible: false,
      addDialogVisible: false,
      editRuleForm: {
        title: "",
        author: "",
      },
      currentPage: 1,
      pagesize: 5,
      total: 0,
      addRuleForm: {
        title: "",
        author: "",
      },
      editRules: {
        title: [{ required: true, message: "请输入文章名称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { data } = await this.$http.get("/list");
      console.log(data);
      this.list = data.result;
      this.total = data.result.length;
    },
    editDialog(value) {
      this.editDialogVisible = true;
      this.editRuleForm.title = value.title;
      this.editRuleForm.author = value.author;
      this.editRuleForm.title_id = value.title_id;
    },
    async deleteDialog(id) {
      const confirm = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirm == "confirm") {
        const { data } = await this.$http.delete("/list", {
          params: {
            title_id: id,
          },
        });
        if (data.status !== 201) {
          return this.$message.error("删除数据失败! ");
        }
        this.$message.success("删除成功! ");
        this.getList();
      } else {
        this.$message.info("已取消删除! ");
      }
    },
    editForm() {
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return;
        const { data } = await this.$http.post("/list", this.editRuleForm);
        if (data.status !== 200) {
          return this.$message.error("更新数据错误!");
        }
        this.$message.success("更新数据成功! ");
        this.editDialogVisible = false;
        this.getList();
      });
    },
    addBook() {
      this.addDialogVisible = true;
      console.log(this.$refs);
    },
    addClose() {
      this.$refs.addRef.resetFields();
      // this.addRuleForm.author = "";
    },
    addForm() {
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请填写必要表单项! ");
        const { data: res } = await this.$http.post("/book", this.addRuleForm);
        // console.log(res);
        if (res.status !== 200) return this.$message.error("添加失败! ");
        this.$message.success("添加成功! ");
        this.getList();
        this.addDialogVisible = false;
      });
    },
    // 分页操作
    handleSizeChange(newSize) {
      this.pagesize = newSize;
      this.getList();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.getList();
    },
  },
};
</script>

<style >
.add {
  margin-bottom: 15px !important;
  margin-top: -20px;
}
.el-pagination {
  margin-top: 15px;
}
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>