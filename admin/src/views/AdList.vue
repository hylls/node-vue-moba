<template>
  <div id="category-list">
    <h1>广告位列表</h1>
    <el-table :data="ad_list">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
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
      ad_list: []
    };
  },
  methods: {
    async getCategoryList() {
      const res = await this.$http.get("ads");
      this.ad_list = res.data;
    },
    openEditPages(id) {
      this.$router.push(`/ads/edit/${id}`);
    },
    async removeCategory(row) {
      this.$confirm(`是否要删除 "${row.title}" `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`ads/${row._id}`)
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