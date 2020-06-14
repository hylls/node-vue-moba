<template>
  <div class="page-hero" v-if="model">
    <div class="tabbar bg-black py-2 px-3 d-flex ai-center">
      <img src="~/assets/img/logo.png" height="30">
      <div class="px-3 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2 text-white">攻略站</span>
      </div>
      <router-link
        class="text-white" 
        to="/"
        tag="div">
        更多英雄 &gt;
      </router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 d-flex flex-column jc-end h-100">
        <div>{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div>{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-grey">{{model.scores.survice}}</span>
          </div>
          <router-link tag="span" class="text-grey" to="/">
            皮肤: 2 &gt;
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
};
</script>

<style lang="scss" scoped>
.page-hero {
  .top {
    height: 50vw;
    background: #fff top center no-repeat;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: .9rem;
        border-radius: 50%;
        text-align: center;
        font-size: 0.6rem;
        border: 1px solid rgba(255,255,255,.2)
      }
    }
  }
}
</style>