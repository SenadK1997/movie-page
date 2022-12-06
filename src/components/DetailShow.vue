<script>
import axios from "axios";

export default {
  name: "detail-show",
  data() {
    return {
      tvShow: [],
    };
  },
  created() {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/" +
          this.$route.params.code +
          "?api_key=44c041bf84331a8709e82710faa32ffb&language=en-US"
      )
      .then((response) => {
        this.tvShow = response.data;
        console.log(this.tvShow);
      });
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<template>
  <div class="c-parent">
    <div class="c-parent__btn" @click="goBack">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1.5em"
        width="1.5em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 11L6.414 11 11.707 5.707 10.293 4.293 2.586 12 10.293 19.707 11.707 18.293 6.414 13 21 13z"
        ></path>
      </svg>
      <button>Back</button>
    </div>
    <section class="c-section">
      <div class="c-section__title">
        <img
          :src="'https://image.tmdb.org/t/p/w500' + tvShow.backdrop_path"
          alt="Error Loading Image"
        />
        <h1>{{ tvShow.name }}</h1>
      </div>
      <div class="c-section__overview">
        <h2>Movie Overview :</h2>
        <p>"{{ tvShow.overview }}"</p>
      </div>
    </section>
  </div>
</template>
<style scoped>
.c-parent {
  width: 100%;
  max-width: 1268px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 50px;
  margin-top: 20px;
}
.c-parent__btn {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.c-parent__btn svg {
  cursor: pointer;
}
.c-parent__btn button {
  padding: 10px 20px;
  border: 1px solid lightgrey;
  background-color: transparent;
  cursor: pointer;
  font-size: 16px;
  border: none;
  border-radius: 15px;
}
.c-parent__btn button:hover {
  background-color: rgb(231, 231, 231);
}
.c-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.c-section__title {
  display: flex;
  flex-direction: column;
}
.c-section__title h1 {
  font-size: 40px;
  font-weight: 700;
  text-shadow: 0px 0px 3px lightgrey;
}
.c-section img {
  width: 100%;
  border-radius: 15px 100px;
  box-shadow: 0px 0px 5px rgb(44, 7, 7);
  max-height: 600px;
}
.c-section__overview {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.c-section__overview h2 {
  font-size: 28px;
}

@media (max-width: 500px) {
  .c-parent {
    width: 100%;
    max-width: 500px;
  }
  .c-parent__btn button {
    padding: 10px 20px;
    border: 1px solid lightgrey;
    background-color: transparent;
    cursor: pointer;
    font-size: 16px;
    border: none;
    border-radius: 15px;
    color: aliceblue;
  }
  .c-parent__btn button:hover {
    background-color: rgb(231, 231, 231);
  }
  .c-section__overview h2 {
    font-size: 28px;
  }
}
</style>
