<template>
  <div class="home">
    <!-- 轮播图 -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="~assets/img/swiper-1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="~assets/img/swiper-2.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="~assets/img/swiper-3.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 py-1" slot="pagination"></div>
    </swiper>
    <!-- 导航栏 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="(item, index) in 10" :key="index">
          <i class="nav_icon nav_news"></i>
          <div class="py-2">爆料站{{item}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="nav_icon nav_arraw mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- 新闻资讯 -->

    <!-- <m-card title="新闻资讯" icon="Menu">
      <div class="pt-2 bg-white">
        <div class="nav jc-between">
          <div class="nav-item active">
            <div class="nav-link">新闻</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">新闻</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">新闻</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">新闻</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">新闻</div>
          </div>
        </div>
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="p-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>夏日版本啥都会撒娇打开</span>
              <span>06/03</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card> -->

    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="p-2 fs-lg d-flex" 
          v-for="(news, i) in category.newsList" 
          :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link 
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 fs-lg text-center" 
            style="width: 20%"
            v-for="(hero, i) in category.heroList" 
            :key="i">
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card title="英雄列表" icon="card-hero"></m-card>
    <m-card title="英雄列表" icon="card-hero"></m-card>
    <m-card title="英雄列表" icon="card-hero"></m-card>
    <m-card title="英雄列表" icon="card-hero"></m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: "Home",
  components: {},
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
        // Some Swiper option/callback...
      },
      newsCats: [],
      heroCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroesCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroesCats()
  },
};
</script>
<style lang="scss">
@import "~assets/style.scss";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border: none;
    }
  }
}
</style>
