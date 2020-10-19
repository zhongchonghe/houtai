<template>
  <div>
    <el-container>
      <el-main>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片 -->
        <el-card>
          <!-- 搜索与添加内容 -->
          <!-- <el-row :gutter="20">
            <el-col :span="7">
              <el-input
                placeholder="请输入内容"
                v-model="queryInfo.query"
                clearable
                @clear="getUserList"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getUserList"
                ></el-button>
              </el-input>
            </el-col>
           
          </el-row> -->

          <!-- 用户列表区域 -->
          <el-table :data="userlist" border stripe>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column label="用户" prop="username"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="电话" prop="phone"></el-table-column>
            <el-table-column label="操作" width="180px">
              <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row)"
                ></el-button>
                <!-- 删除按钮 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeUserById(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页区域 -->
          <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination> -->
        </el-card>
      </el-main>

      <!-- 编辑对话框 -->
      <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="30%">
        <el-form
          :model="editForm"
          :rules="editRules"
          ref="editRef"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editF">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const r = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; // 正整数

      if (!value) {
        callback();
      } else if (!r.test(value)) {
        callback(new Error("请输入正确的邮箱! "));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      const r = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; // 正整数
      if (!value) {
        callback();
      } else if (!r.test(value)) {
        callback(new Error("请输入正确的手机号! "));
      } else {
        callback();
      }
    };
    return {
      userlist: [],
      /*  username: "",
        email: "",
        mobile: "", */
      addDialogVisible: false,
      editDialogVisible: false,
      queryInfo: {},
      editForm: {},
      addForm: {},
      editRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        email: [
          {
            required: false,
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: false,
            validator: checkPhone,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    showEditDialog(value) {
      this.editDialogVisible = true;
      this.editForm = value;
    },
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除用户! ");
      }
      const { data: res } = await this.$http.delete("deleteuser/", {
        params: { id: id },
      });
      if (res.status !== 201) return this.$message.error("删除用户失败! ");
      this.$message.success("删除用户成功! ");
      this.getUserList();
    },
    async getUserList() {
      const { data: res } = await this.$http.get("/user");
      this.userlist = res;
      console.log(res);
    },
    editF() {
      this.$refs.editRef.validate(async (valid) => {
        if (!valid) return;
        const { data } = await this.$http.post("/user", this.editForm);
        console.log(data);
        // console.log(typeof(this.editForm.phone));
        if (data.status !== 201) {
          return this.$message.error("数据更新失败! ");
        }
        this.$message.success("数据更新成功! ");
        this.getUserList();
        this.editDialogVisible = false;
      });
    },
    addF() {
      this.$refs.addRef.validate(async (valid) => {
        if (!valid) return;
        const { data } = await this.$http.post("/user", this.addForm);
        console.log(data);
        // console.log(typeof(this.editForm.phone));
        if (data.status !== 201) {
          return this.$message.error("用户添加失败! ");
        }
        this.$message.success("用户添加成功! ");
        this.getUserList();
        this.addDialogVisible = false;
      });
    },
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-table {
  margin-top: 15px;
}
</style>