<template>
  <div id="edit">
    <h1>{{id ? '编辑' : '创建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="createCategoryList">
      <el-form-item label="账号">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{ isSave }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  computed: {
    isSave() {
      return this.id ? '保存' : '创建'
    }
  },
  data() {
    return {
      model: {
        username: '',
        password: ''
      },
      parents: [],
    };
  },
  methods: {
    async createCategoryList() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/admin_users/${this.id}`, this.model);
        this.$router.push("/admin_users/list");
      } else {
        res = await this.$http.post('/admin_users', this.model)
        this.$router.push("/admin_users/list");
      }
      if (res) {
        this.$message({
          type: "success",
          message: this.id ? "保存成功" : "创建成功"
        });
      }
    },
    async getCategory() {
      const res = await this.$http.get(`admin_users/${this.id}`);
      this.model = res.data
    },
  },
  async created() {
    this.id && this.getCategory()
  }
};
</script>

<style>
</style>