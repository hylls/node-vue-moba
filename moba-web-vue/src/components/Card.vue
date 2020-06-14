<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header pb-3 d-flex">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xxl px-2 flex-1">{{title}}</div>
      <i class="iconfont icon-card-hero"></i>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, require: true },
    icon: { type: String, require: true }
  }
};
</script>

<style lang="scss" scoped>
@import '~assets/style.scss';
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>