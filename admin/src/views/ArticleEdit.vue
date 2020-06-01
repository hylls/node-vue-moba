<template>
  <div id="edit">
    <h1>{{id ? '编辑' : '创建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="createCategoryList">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{ isSave }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from 'axios'
export default {
  components: {
    VueEditor
  },
  props: {
    id: {
      type: String
    }
  },
  computed: {
    isSave() {
      return this.id ? "保存" : "创建";
    }
  },
  data() {
    return {
      model: {
        name: "",
        body: ''
      },
      categories: []
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post('http://localhost:3000/admin/api/upload', formData)
      let url = res.data.url;
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
    async createCategoryList() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/articles/${this.id}`, this.model);
        this.$router.push("/articles/list");
      } else {
        res = await this.$http.post(`/articles`, this.model);
        this.$router.push("/articles/list");
      }
      if (res) {
        this.$message({
          type: "success",
          message: this.id ? "保存成功" : "创建成功"
        });
      }
    },
    async getCategory() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`categories`);
      this.categories = res.data;
    }
  },
  async created() {
    this.id && this.getCategory();
    this.fetchCategories();
  }
};
</script>

<style>
</style>