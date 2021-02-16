<template>
  <div>
    <div class="header">
      <div @click="$router.push({ path: '/'})">
        <img width="149" src="../assets/logo.png">
      </div>
      <div class="search-input" >
        <input type="text" v-model="searchText" v-on:keyup.enter="filterData">
        <router-link
            tag="button"
            :to="{ path: 'results', query: { searchText: searchText } }">Search</router-link>
      </div>
    </div>

    <div class="body">
      <div class="sort">
        <div class="sort-button">
          <img width="26" src="../assets/iconfinder.png">
          <select v-model="orderBy">
            <option disabled selected value>
              Order By
            </option>
            <option value="1">Name ascending</option>
            <option value="2">Name descending</option>
            <option value="3">Year ascending</option>
            <option value="4">Year descending</option>
          </select>
        </div>
      </div>
      <div class="result">
        <div v-for="element in pageContent" :key="element.id" class="result-item">
          <div class="result-item-title">{{element.title}}</div>
          <div class="result-item-description">{{element.name}}, {{new Date(element.createdAt.replace(/\s/g, '')).getFullYear()}}</div>
          <div class="result-item-line"></div>
        </div>
      </div>
      <div>
        <vue-ads-pagination
            :total-items="filteredResults.length"
            :items-per-page="6"
            :max-visible-pages="5"
            :page="page"
            :loading="false"
            @page-change="pageChange"
            @range-change="rangeChange"
        >
          <template
              slot="buttons"
              slot-scope="props"
          >
            <vue-ads-page-button
                v-for="(button, key) in props.buttons"
                :key="key"
                v-bind="button"
                @page-change="page = button.page"
            />
          </template>
        </vue-ads-pagination>
      </div>
    </div>
  </div>
</template>


<script>
import json from '/src/data/generated.json'
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../../node_modules/vue-ads-pagination/dist/vue-ads-pagination.css';

import VueAdsPagination, { VueAdsPageButton } from 'vue-ads-pagination';

const filter = function (array, keyword) {
  return array.filter((x) => {
    let keywordUpper = keyword.toUpperCase();
    let titleUpper = x.title.toUpperCase();
    let nameUpper = x.name.toUpperCase();
    return titleUpper.includes(keywordUpper) || nameUpper.includes(keywordUpper);
  });
}

export default {
  components: {
    VueAdsPagination,
    VueAdsPageButton,
  },
  data() {
    return {
      searchText: this.$route.query.searchText,
      myJson: json,
      filteredResults: [],
      pageContent: [],
      page: 0,
      orderBy: ''
    }
  },
  watch: {
    '$route': function(to){
      this.filteredResults = filter(this.myJson, to.query.searchText);
      this.sortByNameAsc();
    },
    orderBy: function(to){
      switch (to) {
        case '1':
          this.sortByNameAsc();
          break;
        case '2':
          this.sortByNameDesc();
          break;
        case '3':
          this.sortByYearAsc();
          break;
        case '4':
          this.sortByYearDesc();
          break;
        default:
          break;
      }
    }
  },
  methods: {
    filterData: function(){
      this.filteredResults = filter(this.myJson, this.searchText);
      this.sortByNameAsc();
    },
    sortByYearAsc: function(){
      this.filteredResults.sort((a, b) => {
        const x = new Date(a.createdAt.replace(/\s/g, '')).getFullYear();
        const y = new Date(b.createdAt.replace(/\s/g, '')).getFullYear();
        if (x < y) return -1;
        if (x > y) return 1;
        if (x === y) return 0;
      });
      this.pageChange(0);
      this.rangeChange(0, 6);
    },
    sortByYearDesc: function(){
      this.filteredResults.sort((a, b) => {
        const x = new Date(a.createdAt.replace(/\s/g, '')).getFullYear();
        const y = new Date(b.createdAt.replace(/\s/g, '')).getFullYear();
        if (x < y) return 1;
        if (x > y) return -1;
        if (x === y) return 0;
      });
      this.pageChange(0);
      this.rangeChange(0, 6);
    },
    sortByNameAsc: function(){
      this.filteredResults.sort((a, b) => {
        const x = a.name;
        const y = b.name;
        if (x < y) return -1;
        if (x > y) return 1;
        if (x === y) return 0;
      });
      this.pageChange(0);
      this.rangeChange(0, 6);
    },
    sortByNameDesc: function(){
      this.filteredResults.sort((a, b) => {
        const x = a.name;
        const y = b.name;
        if (x < y) return 1;
        if (x > y) return -1;
        if (x === y) return 0;
      });
      this.pageChange(0);
      this.rangeChange(0, 6);
    },
    pageChange: function(page) {
      this.page = page;
      console.log(page);
    },
    rangeChange: function(start, end) {
      console.log(start, end);
      this.pageContent = this.filteredResults.slice(start, end);
    }
  },
  mounted() {
    this.filterData();
    console.log(this.filteredResults);
  }
}
</script>


<style scoped>
  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .header img {
    cursor: pointer;
  }

  .body {
    width: 644px;
    padding-top: 75px;
    margin-left: 184px;
  }

  .search-input {
    margin-left: 35px;
    display: flex;
    align-items: center;
  }

  .search-input input {
    width: 709px;
    height: 44px;
    border: black 1px solid;
    border-radius: 6px;
    font-size: 24px;
    padding: 0 10px;
    margin-right: 16px;
  }

  .search-input button {
    width: 138px;
    height: 46px;
    background: #4F75C2;
    border-radius: 8px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
    border-width: 0px;
    cursor: pointer;
  }

  .result {
  }

  .result-item {
    margin-bottom: 40px;
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

  .sort {
    display: flex;
    justify-content: flex-end;
  }

  .sort-button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .sort-button select {
    height: 24px;
    appearance: none;
    width: 80px;
    border: none;
    margin-left: 8px;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #484848;
    cursor: pointer;
  }

  .sort-button option:first-child{
    display: none;
  }
</style>
