<script>
import axios from "axios";
import TitleCard from "./TitleCard.vue";
export default {
  name: "body-page",
  data() {
    return {
      movies: [],
      tvShows: [],
      searchedMovies: [],
      searchValue: "",
      tvActive: true,
      moviesActive: false,
      debounce: null,
    };
  },
  created() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=44c041bf84331a8709e82710faa32ffb"
      )
      .then((response) => {
        const movies = response.data.results;
        for (let i = 0; i < 10; i++) {
          this.movies.push(movies[i]);
        }
      });
    axios
      .get(
        "https://api.themoviedb.org/3/tv/popular?api_key=44c041bf84331a8709e82710faa32ffb&language=en-US&page=1"
      )
      .then((response) => {
        const tvShows = response.data.results;
        for (let i = 0; i < 10; i++) {
          this.tvShows.push(tvShows[i]);
        }
      });
  },
  methods: {
    activateFilter(filter) {
      this.searchValue = "";
      if (filter === "movies") {
        this.tvActive = false;
        this.moviesActive = true;
      } else {
        this.tvActive = true;
        this.moviesActive = false;
      }
    },
    getAllSearched() {
      this.moviesActive = false;
      this.tvActive = false;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios
          .get(
            "https://api.themoviedb.org/3/search/multi?api_key=44c041bf84331a8709e82710faa32ffb&language=en-US&page=1&include_adult=false&query=" +
              this.searchValue
          )
          .then((response) => (this.searchedMovies = response.data.results));
      }, 1000);
    },
    detailedMovies(code) {
      this.$router.push({ name: "detailed-view", params: { code: code } });
      console.log(code);
    },
    detailedShow(code) {
      this.$router.push({ name: "detailed-show", params: { code: code } });
    },
    resetActive() {
      if (!this.moviesActive && !this.tvActive) {
        this.tvActive = true;
      }
    },
    onGoDetail(data) {
      if (data.media_type === "movie") {
        return this.detailedMovies(data.id);
      }
      return this.detailedShow(data.id);
    },
  },
  computed: {
    searchActive() {
      if (this.searchValue.length >= 3) {
        this.getAllSearched();
        return true;
      }
      this.resetActive();
      return false;
    },
  },
  components: { TitleCard },
};
</script>
<template>
  <div class="c-parent">
    <div class="c-parent__btns">
      <button
        @click="activateFilter('movies')"
        class="c-btns-movie"
        :class="{ 'is-active': moviesActive }"
      >
        Movies
      </button>
      <button
        @click="activateFilter('tv-shows')"
        class="c-btns-tv"
        :class="{ 'is-active': tvActive }"
      >
        TV Shows
      </button>
    </div>
    <div class="c-parent__search">
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 1024 1024"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
        ></path>
      </svg>
      <input type="search" placeholder="search" v-model="searchValue" />
    </div>
    <section class="c-section__cards" v-if="!searchActive">
      <div v-if="moviesActive" class="c-section__parent">
        <TitleCard
          v-for="movie in movies"
          :key="movie.id"
          :title="movie"
          :is-movie="true"
        />
      </div>
      <div v-else-if="tvActive" class="c-section__parent">
        <TitleCard
          v-for="tvShow in tvShows"
          :key="tvShow.id"
          :title="tvShow"
          :is-movie="false"
        />
      </div>
    </section>
    <section v-else>
      <div class="c-section__parent">
        <TitleCard
          v-for="searchedMovie in searchedMovies"
          :key="searchedMovie.id"
          :title="searchedMovie"
          :is-movie="searchedMovie.media_type === 'movie'"
        />
      </div>
    </section>
  </div>
</template>
<style scoped>
.c-parent {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1268px;
  margin: 0 auto;
  justify-content: center;
  gap: 30px;
}
.c-parent__btns {
  display: flex;
  gap: 10px;
}
.c-btns-movie {
  padding: 5px 10px;
  border: 1px solid lightgrey;
  background-color: aliceblue;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px 0px 3px lightgrey;
}
.c-btns-tv {
  padding: 5px 10px;
  border: 1px solid lightgrey;
  background-color: aliceblue;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px 0px 3px lightgrey;
}
.c-parent__btns button:hover {
  background-color: rgb(231, 231, 231);
}
.c-parent__search {
  display: flex;
  align-items: center;
  position: relative;
}
.c-parent__search input {
  border-radius: 99px;
  border: 1px solid lightgrey;
  width: 100%;
  font-size: 14px;
  padding-left: 25px;
  line-height: 25px;
}
.c-parent__search svg {
  position: absolute;
  left: 5px;
  z-index: 1;
}
.c-section__cards {
  display: flex;
  flex-wrap: wrap;
  max-width: 1268px;
  justify-content: space-between;
}
.c-section__parent {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 60px;
}
.c-section__card {
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid grey;
  box-shadow: 0px 0px 15px lightgrey;
  margin-bottom: 50px;
  max-width: 600px;
}
.is-active {
  background-color: lightblue;
  padding: 5px 10px;
  border: 1px solid lightgrey;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px 0px 3px lightgrey;
}
.c-section__card h1 {
  font-size: 32px;
}
.c-section__card img {
  width: 600px;
  max-width: 100%;
  cursor: pointer;
}
</style>
