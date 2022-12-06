<script>
export default {
  name: "TitleCard",
  data() {
    return {};
  },
  props: {
    title: {
      required: true,
    },
    isMovie: {
      required: true,
    },
  },
  methods: {
    onToDetails() {
      if (this.isMovie) {
        return this.$router.push({
          name: "detailed-view",
          params: { code: this.title.id },
        });
      }
      return this.$router.push({
        name: "detailed-show",
        params: { code: this.title.id },
      });
    },
  },
};
</script>
<template>
  <div class="c-card">
    <img
      :src="'https://image.tmdb.org/t/p/w500' + title.backdrop_path"
      alt="Error loading image"
      @click="onToDetails(title.id)"
    />
    <h1>{{ isMovie ? title.title : title.name }}</h1>
  </div>
</template>
<style scoped>
.c-card {
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid grey;
  box-shadow: 0px 0px 15px lightgrey;
  margin-bottom: 50px;
  max-width: 600px;
}
.c-card h1 {
  font-size: 32px;
}
.c-card img {
  width: 600px;
  max-width: 100%;
  cursor: pointer;
}
</style>
