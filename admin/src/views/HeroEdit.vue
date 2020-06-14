<template>
  <div id="edit">
    <h1>{{id ? '编辑' : '创建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="createCategoryList">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL.replace(/\/rest/, '') + '/upload'"
              :headers="mixinGetAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL.replace(/\/rest/, '') + '/upload'"
              :headers="mixinGetAuthHeaders()"
              :show-file-list="false"
              :on-success="res => model.banner = res.url"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" style="max-width: 10rem">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.survice"></el-rate>
          </el-form-item>
          <el-form-item label="顺丰出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL.replace(/\/rest/, '') + '/upload'"
                  :headers="mixinGetAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="model.skills.splice(i, 1)" size="small" type="danger">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button type="text" @click="model.partners.push({})"><i class="el-icon-plus"></i>添加英雄</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.partners" :key="i">
              <el-form-item label="英雄">
                <el-select filterable v-model="item.hero">
                  <el-option 
                    v-for="hero in heroes"
                    :key="hero._id"
                    :label="hero.name"
                    :value="hero._id"  
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
                <el-button @click="model.partners.splice(i, 1)" size="small" type="danger">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
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
      categories: [],
      items: [],
      heroes: [],
      model: {
        name: "",
        avatar: "",
        banner: "",
        title: "",
        partners: [],
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survice: 0
        },
        skills: []
      }
    };
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    async createCategoryList() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/heroes/${this.id}`, this.model);
        this.$router.push("/heroes/list");
      } else {
        res = await this.$http.post(`/heroes`, this.model);
        this.$router.push("/heroes/list");
      }
      if (res) {
        this.$message({
          type: "success",
          message: this.id ? "保存成功" : "创建成功"
        });
      }
    },
    async getItem() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = { ...this.model, ...res.data };
    },
    async fetchCategories() {
      const res = await this.$http.get(`/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`/items`);
      this.items = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get(`/heroes`);
      this.heroes = res.data;
    },
  },
  async created() {
    this.id && this.getItem();
    this.fetchCategories();
    this.fetchItems();
    this.fetchHeroes();
  }
};
</script>

<style scoped>

</style>