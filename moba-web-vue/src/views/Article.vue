<template>
  <div class="page-article w-100" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-card-hero text-blue"></div>
      <strong class="flex-1 pl-2 pr-1 text-ellipsis text-blue">{{model.title}}</strong>
      <div class="text-grey fs-xs">{{'2020-06-15'}}</div>
    </div>
    <div v-html="model.body" class="body px-3 fs-lg"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont icon-card-hero"></i>
        <strong class="text-blue fs-lg">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link
          class="py-2"
          tag="div"
          :to="`/artiles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
        >
          {{item.title}}
        </router-link>
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
      model: {}
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
  watch: {
    id() {
      this.fetch()
    }
  },
};
</script>

<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>