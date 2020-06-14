<template>
  <m-card :title="this.title" :icon="this.icon">
    <div class="pt-2 bg-white">
      <div class="nav jc-between mb-3">
        <div class="nav-item" 
          v-for="(item, i) in this.categories"
          :key="i"
          :class="{'active': currentIndex === i}"
          @click="$refs.list.$swiper.slideTo(i)"
          >
          <div class="nav-link">{{item.name}}</div>
        </div>
      </div>
      <swiper 
        ref="list"
        :options="{autoHeight: true}"
        @slide-change="() => currentIndex = $refs.list.$swiper.realIndex">
        <swiper-slide v-for="(category, i) in this.categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      currentIndex: 0
    }
  },
}
</script>

<style>

</style>