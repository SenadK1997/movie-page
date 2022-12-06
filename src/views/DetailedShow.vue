<script lang="js">
import DetailShow from "../components/DetailShow.vue";
export default {
  name: "detailed-show",
  data() {
    return {};
  },
  components: { DetailShow },
};
</script>

<template>
  <DetailShow />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
