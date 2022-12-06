<script>
import DetailPage from "../components/DetailPage.vue";

export default {
  name: "detail-view",
  data() {
    return {};
  },
  components: { DetailPage },
};
</script>

<template>
  <DetailPage />
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
