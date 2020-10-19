
<template>
  <div class="login_container">
    <div class="login_box">
      <h2 style="text-align: center">注册账号</h2>
      <span>已有账号? <i @click="$router.push('/login')">登录</i></span>
      <!-- 登录表单 -->
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerRef"
        label-width="70px"
        class="login_form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input
            type="password"
            v-model="registerForm.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button @click="registerLoginForm">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        repassword: "",
      },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    registerLoginForm() {
      // this.$router.push("/register");
      this.$refs.registerRef.validate(async (valid) => {
        if (!valid) return;
        if (this.registerForm.password !== this.registerForm.repassword)
          return this.$message.error("密码确认失败! ");
        const { data: res } = await this.$http.post(
          "/register",
          this.registerForm
        );
        if (res.status !== 200) return this.$message.error("用户名已存在! ");
        this.$message.success("用户注册成功! ");
        this.$router.push("/login");
      });
    },
    /* login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.status !== 200)
          return this.$message.error("用户名或者密码错误,登录失败! ");
        this.$message.success("登录成功");
        window.localStorage.setItem("token", res.token);
        this.$router.push("/home");
        // console.log(res);
      });
    }, */
  },
};
</script>

<style scoped>
body {
  margin: 0 !important;
}
html {
  background-color: pink;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 23px;
  box-sizing: border-box;
  color: black;
}
.btns {
  /* padding: 12px 10px; */
}
.el-button {
  width: 400px;
  margin-left: -63px;
  border-radius: 30px;
  background-color: #bdcefc;
}
.login_container {
  background-color: #2b4b6b;
  height: 100vh;
}
.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
span {
  font-size: 14px;
  color: #9b9b9b;
  margin-right: 40px;
  float: right;
}
i {
  font-style: normal;
  color: #0f3cf2;
  cursor: pointer;
}
</style>
