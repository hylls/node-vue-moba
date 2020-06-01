<template>
  <div id="edit">
    <h1>{{id ? '编辑' : '创建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="createCategoryList">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="text" @click="model.items.push({})">
          <i class="el-icon-plus"></i>添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="12" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL.replace(/\/rest/, '') + '/upload'"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button @click="model.items.splice(i, 1)" size="small" type="danger">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      return this.id ? "保存" : "创建";
    }
  },
  data() {
    return {
      model: {
        name: "",
        items: []
      }
    };
  },
  methods: {
    async createCategoryList() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/ads/${this.id}`, this.model);
        this.$router.push("/ads/list");
      } else {
        res = await this.$http.post("/ads", this.model);
        this.$router.push("/ads/list");
      }
      if (res) {
        this.$message({
          type: "success",
          message: this.id ? "保存成功" : "创建成功"
        });
      }
    },
    async getCategory() {
      const res = await this.$http.get(`ads/${this.id}`);
      this.model = { ...this.model, ...res.data };
    }
  },
  async created() {
    this.id && this.getCategory();
  }
};
</script>

<style>
</style>