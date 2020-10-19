<template>
  <el-container style="height: 100vh">
    <el-header style="text-align: right; font-size: 12px">
      <el-row>
        <el-col class="left" :span="6"
          ><img src="../assets/logo.png" class="img" alt="" width="50"
        /></el-col>
        <el-col :span="12"
          ><h2 style="text-align: center" class="title">
            后台管理系统
          </h2></el-col
        >
        <el-col :span="6">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><span @click="logout">退出</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ msg }}</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height: 500px">
      <el-aside
        :width="isCollapse ? '28px' : '200px'"
        style="background-color: #515b61"
      >
        <div class="suo" @click="zhanshi">|||</div>
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          style="background-color: #515b61"
          active-text-color="#121212"
        >
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/content"
                ><span>文章列表</span></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i><span>用户管理</span></template
            >
            <el-menu-item-group>
              <el-menu-item index="/user"><span>用户列表</span></el-menu-item>
              <!-- <el-menu-item index="2-2"><span>选项2</span></el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/kb-manage" style="padding-left:0">
            <i class="el-icon-menu"></i>
            <span slot="title">口碑管理</span>
          </el-menu-item>
          <el-menu-item index="/fb-manage" style="padding-left:0">
            <i class="el-icon-menu"></i>
            <span slot="title">发布口碑</span>
          </el-menu-item>
          <el-menu-item index="/material" style="padding-left:0">
            <i class="el-icon-menu"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/comments" style="padding-left:0">
            <i class="el-icon-menu"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-setting"></i><span>订单管理</span></template
            >
            <el-menu-item-group>
              <el-menu-item index="4-1"><span>订单列表</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      msg: "",
    };
  },
  mounted() {
    /* this.$parent.$on("add", (msg) => {
      this.msg = msg;
      console.log(this.msg);
    }); */
    this.$http.get("/list").then((res) => {
      this.msg = res.data.myres.name;
      // this.msg = res.data.name;
    });
  },
  methods: {
    zhanshi() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      window.localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/deep/.el-submenu__title {
  padding-left: 0px !important;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-menu-item-group span {
  margin-left: 15px;
}
.el-aside {
  color: #333;
}

html,
body {
  padding: 0px;
  margin: 0px;
}
.suo {
  height: 24px;
  background-color: #475162;
  text-align: center;
  letter-spacing: 1px;
  cursor: pointer;
  color: #fff;
}
.title {
  line-height: 35px;
}
.left {
  text-align: left;
  margin-top: 5px;
  line-height: 19px;
}
</style>