<template>
  <div class="body">
    <img width="278" src="../assets/logo-big.png">
    <div class="catchword">
      Search web app
    </div>
    <div class="search-input">
      <input type="text" v-model="inputValue" v-on:keyup.enter="$router.push({ path: 'results', query: { searchText: inputValue } })">
      <router-link
          tag="button"
          :to="{ path: 'results', query: { searchText: inputValue } }">Search</router-link>
    </div>
    <div class="suggest-box" v-if="showSuggestion">
      <div class="result">
        <div v-for="element in filteredResults" :key="element.id" class="result-item">
          <div class="result-item-title">{{element.title}}</div>
          <div class="result-item-description">{{element.name}}, {{new Date(element.createdAt.replace(/\s/g, '')).getFullYear()}}</div>
          <div class="result-item-line"></div>
        </div>
      </div>
      <div class="suggest-box-show-more">
        <router-link
            tag="button"
            :to="{ path: 'results', query: { searchText: inputValue } }">Show more</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import json from '/src/data/generated.json'

const filter = function (array, keyword) {
  return array.filter((x) => {
    let keywordUpper = keyword.toUpperCase();
    let titleUpper = x.title.toUpperCase();
    let nameUpper = x.name.toUpperCase();
    return titleUpper.includes(keywordUpper) || nameUpper.includes(keywordUpper);
  });
}

export default {
 data() {
   return {
     inputValue: "",
     searchText: this.$route.query.searchText,
     myJson: json,
     filteredResults: [],
     showSuggestion: false
   }
 },
 watch: {
   inputValue: function (to) {
     if (to === '') {
       this.filteredResults = [];
       this.showSuggestion = false;
       return;
     }
     this.filteredResults = filter(this.myJson, to);
     this.filteredResults.sort((a, b) => {
       const x = a.name;
       const y = b.name;
       if (x < y) return -1;
       if (x > y) return 1;
       if (x === y) return 0;
     });
     this.filteredResults = this.filteredResults.slice(0,3);
     this.showSuggestion = this.filteredResults.length > 0;
   }
 }
}
</script>


<style scoped>
  .body {
    margin-top: 256px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .search-input {
    display: flex;
    align-items: center;
    margin-top: 18px;
    margin-left: 154px;
  }

  .search-input input {
    width: 709px;
    height: 44px;
    text-align: center;
    border: black 1px solid;
    border-radius: 6px;
    font-size: 24px;
    padding: 0 10px;
    margin-right: 16px;
  }

  .search-input button {
    width: 138px;
    height: 46px;
    background: #204080;
    border-radius: 8px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
    border-width: 0px;
    cursor: pointer;
  }

  .catchword {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #484848;
    margin-top: 18px;
    margin-left: 300px;
  }

  .suggest-box {
    width: 709px;
    background: #FFFFFF;
    border: 1px solid #484848;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-top: 18px;
    margin-left: 154px;
  }

  .suggest-box-show-more {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
    margin-top: 24px;
    margin-bottom: 18px;
  }

  .result {
    margin: 18px 32px;
  }

  .result-item {
    margin-bottom: 18px;
  }

  .result-item-description {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    color: #686868;
  }

  .result-item-title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #484848;
  }

  .result-item-line {
    width: 100%;
    height: 1px;
    background-color: #585858;
    margin-top: 8px;
  }
</style>
