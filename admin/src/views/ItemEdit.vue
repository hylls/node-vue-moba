<template>
  <div id="edit">
    <h1>{{id ? '编辑' : '创建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="createCategoryList">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL.replace(/\/rest/, '') + '/upload'"
          :headers="mixinGetAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        name: '',
        icon: ''
      },
    };
  },
  methods: {
    afterUpload(res) {
      this.model.icon = res.url
      console.log(res);
    },
    async createCategoryList() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/items/${this.id}`, this.model);
        this.$router.push("/items/list");
      } else {
        res = await this.$http.post(`/items`, this.model);
        this.$router.push("/items/list");
      }
      if (res) {
        this.$message({
          type: "success",
          message: this.id ? "保存成功" : "创建成功"
        });
      }
    },
    async getItem() {
      const res = await this.$http.get(`items/${this.id}`);
      this.model.name = res.data.name;
      this.model.icon = res.data.icon;
    },
  },
  async created() {
    this.id && this.getItem();
  } 
};
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>