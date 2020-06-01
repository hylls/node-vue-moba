<template>
  <div id="category-list">
    <h1>文章列表</h1>
    <el-table :data="article_list">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="categories" label="所属分类">
        <template slot-scope="scope">
          <el-tag 
          v-for="(item, index) in scope.row.categories"
          :key="index"
          >
          {{item.name}}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="body" label="详情"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="openEditPages(scope.row._id)" type="primary" size="small">编辑</el-button>
          <el-button @click="removeCategory(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article_list: []
    };
  },
  methods: {
    async getCategoryList() {
      const res = await this.$http.get("articles");
      this.article_list = res.data;
    },
    openEditPages(id) {
      this.$router.push(`/articles/edit/${id}`);
    },
    async removeCategory(row) {
      this.$confirm(`是否要删除 "${row.title}" `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`articles/${row._id}`)
        res.data.success && this.$message({
          type: "success",
          message: "删除成功!"
        })
        this.getCategoryList()
      })
    }
  },
  created() {
    this.getCategoryList();
  }
};
</script>

<style scoped>
</style>