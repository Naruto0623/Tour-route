<template>
  <div id="box">
    <div class="search">
      <div>
        <select name="" id="" v-model="search.routename" class="search-select">
          <option value="">请选择线路</option>
          <option v-for="(item,key) in routeList" :key="key" :value="item.routeid">{{ item.routename }}</option>
      </select>
      </div>
      <p style="width: 0.5rem"></p>
      <div>
        <input @click="openTime" placeholder="请选择创建时间" type="text" v-model="selectTime" class="search-input">
        <mt-datetime-picker
          ref="picker"
          type="date"
          :start-date="startTime"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          v-model="search.createtime">
        </mt-datetime-picker>
      </div>
    </div>
    <ul
      v-infinite-scroll="pullList"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li class="main-list" v-for="(item,key) in listData" :key="key" @click="listDetail(item)">
        <h4 class="list-title">{{ item.sitename }}</h4>
        <div class="list-info">
          <p class="list-left">联系人：{{ item.contactname }}</p>
          <p class="list-right">电话：{{ item.phone }}</p>
        </div>
        <div>地址：{{ item.location }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import res from '../assets/listJson'

  export default {
    name: 'HelloWorld',
    data(){
      return {
        routeList: [],
        startTime: new Date("2018"),
        listData: {},
        loading: false,
        search: {
          routename: '',
          createtime: ''
        }
      }
    },
    computed: {
      selectTime(){
        let time = +this.search.createtime == 0? '' : +this.search.createtime;
        return this.timeChange(time) == 0? '' : this.timeChange(time)
      }
    },
    methods: {
      //日期格式转换
      timeChange( createtime ){
        createtime = Number(createtime);
        if (createtime == '') {
          return createtime;
        } else {
          return new Date(createtime).getYear() + 1900 + '-' + (new Date(createtime).getMonth() + 1) + '-' + new Date(createtime).getDate();
        }
      },
      // 获取列表数据
      pullList(){
        this.loading = true;
        let url = '';
        let params = {
          page: 1,
          pagesize: 10,
          routename: this.search.routename,
          createtime: this.search.createtime
        };
        this.listData = res.listJson;
        axios.get(url, params).then(res =>{
          if (res.data.code == '200') {
            this.listData = res.data.listdata;
            this.loading = false;
          }
        });
      },
      //获取线路下拉框
      pullrouteList() {
        let url = '';
        this.routeList = res.selectOption;
        axios.get(url).then(res =>{
          if (res.data.code == '200') {
            this.listData = res.data.listdata;
            this.loading = false;
          }
        });
      },
      //点击进入详情
      listDetail( item ){
        this.$router.push({
          name: 'detail',
          params: {
            info: item
          }
        });
      },
      //打开时间选择器
      openTime(){
        this.$refs.picker.open();
      }
    },
    created(){
      this.pullrouteList();
    }
  }
</script>

<style scoped>
  .search {
    display: flex;
    margin-bottom: 0.2rem;
  }

  .search > div {
    flex: 1;
  }
  .search-select {
    width: 100%;
    padding: 0.2rem;
    border-radius: 2px;
    background-color: #fff;
  }
  .search-input {
    width: 95%;
    padding: 0.3rem;
    border-radius: 2px;
    background-color: #fff;
  }
  .main-list {
    border-bottom: 1px solid #f0f0f0;
    border-radius: 0.5rem;
    background-color: #fff;
    padding: 0.6rem;
    margin-bottom: 2px;
  }

  .list-title {
    font-size: 1.2rem;
  }

  .list-info {
    display: flex;
  }

  .list-info > p {
    flex: 1;
  }

</style>
