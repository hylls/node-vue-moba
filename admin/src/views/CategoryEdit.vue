<template>
  <div id="edit">
    <h1>{{id ? '编辑' : '创建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="createCategoryList">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents" 
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
        name: ""
      },
      parents: [],
    };
  },
  methods: {
    async createCategoryList() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/categories/${this.id}`, this.model);
        this.$router.push("/categories/list");
      } else {
        res = await this.$http.post('/categories', this.model)
        this.$router.push("/categories/list");
      }
      if (res) {
        this.$message({
          type: "success",
          message: this.id ? "保存成功" : "创建成功"
        });
      }
    },
    async getCategory() {
      const res = await this.$http.get(`categories/${this.id}`);
      this.model.name = res.data.name;
    },
    async fetchParents() {
      const res = await this.$http.get(`categories`);
      this.parents = res.data;
    }
  },
  async created() {
    this.id && this.getCategory();
    this.fetchParents()
  }
};
</script>

<style>
</style>