<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    const test = {}
    return {
      msg: "Welcome to Your Vue.js App, bundled with Brunch!"
    };
  }
};
</script>

<style lang="sass" scoped>
@import './../variables.scss';

.test {
  a {
    font-size: 19px;
    display: flex;
    color: $vue-blue;
  }
}
</style>