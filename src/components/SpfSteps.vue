<template>
  <div class="spf-steps">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="{
        'spf-step': true,
        'spf-step--active': active === index
      }"
    >
      <div class="spf-step__head">
        <div class="spf-step__line" />
        <div class="spf-step__icon" />
      </div>
      <div class="spf-step__main">
        <div class="spf-step__title">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpfSteps',
  props: {
    active: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
$border-gray: #8A94A6;
$border-blue: #283EB2;

.spf-steps {
  display: flex;
  height: 100%;
  flex-flow: column;
  .spf-step {
    display: flex;
    flex-basis: 20%;
    flex-shrink: 1;
    &:last-of-type {
      .spf-step__line {
        display: none;
      }
    }
    &__head {
      position: relative;
      flex-grow: 0;
      width: 13px;
    }
    &__line {
      position: absolute;
      margin-right: 0px;
      width: 2px;
      top: 3px;
      bottom: 0;
      left: 5.5px;
      border-color: inherit;
      background-color: $border-gray;
    }
    &__icon {
      position: relative;
      border: 2px solid $border-gray;
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 13px;
      height: 13px;
      box-sizing: border-box;
      background: $border-gray;
      transition: .15s ease-out;
      z-index: 1;
    }
    &__main {
      padding-left: 10px;
      flex-grow: 1;
      white-space: normal;
      text-align: left;
    }
    &__title {
      line-height: 23px;
      font-size: 13px;
      padding-bottom: 36px;
      color: $border-gray;
      cursor: pointer;
    }
  }
  .spf-step--active {
    .spf-step__head {
      width: 15px;
    }
    .spf-step__icon {
      border: 2px solid $border-blue;
      background: $border-blue;
      width: 15px;
      height: 15px;
      margin-left: -1px;
    }
    .spf-step__title {
      color: $border-blue;
      font-size: 14px;
      font-weight: 600;
      line-height: 19px;
    }
  }
}
</style>
