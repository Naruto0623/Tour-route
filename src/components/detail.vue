<template>
  <div class="detail-Box">
    <div class="border-botm">
      <div class="info-list">
        <div style="width: 30%">
          <span class="mint-cell-text">线路：</span>
        </div>
        <div class="" style="width: 60%">
          <select name="" id="" class="mint-field-core">
            <option value="">请选择线路</option>
            <option value="">北京——天津</option>
            <option value="">北京——上海</option>
          </select>
        </div>
      </div>
    </div>
    <div class="border-botm">
      <div class="info-list">
        <div style="width: 30%">
          <span class="mint-cell-text">景点：</span>
        </div>
        <div class="" style="width: 60%">
          <input placeholder="请输入景点名称" v-model="info.sitename" type="text">
        </div>
      </div>
    </div>
    <div class="border-botm">
      <div class="info-list">
        <div style="width: 30%">
          <span class="mint-cell-text">地址：</span>
        </div>
        <div class="" style="width: 60%">
          <input readonly v-model="info.location" type="text">
        </div>
      </div>
    </div>
    <div class="border-botm">
      <div class="info-list">
        <div style="width: 30%">
          <span class="mint-cell-text">坐标：</span>
        </div>
        <div class="" style="width: 60%">
          <input readonly v-model="info.coordinate" type="text">
        </div>
      </div>
    </div>
    <div class="border-botm">
      <div class="info-list">
        <div style="width: 30%">
          <span class="mint-cell-text">当地联系人：</span>
        </div>
        <div class="" style="width: 60%">
          <input placeholder="请输入联系人名称" v-model="info.contactname" type="text">
        </div>
      </div>
    </div>
    <div class="border-botm">
      <div class="info-list">
        <div style="width: 30%">
          <span class="mint-cell-text">联系人电话：</span>
        </div>
        <div class="" style="width: 60%">
          <input placeholder="请输入电话号码" v-model="info.phone" type="text">
        </div>
      </div>
    </div>
    <div class="border-botm">
      <div class="info-list">
        <div style="width: 30%">
          <span class="mint-cell-text">描述：</span>
        </div>
        <div class="" style="width: 60%">
          <textarea placeholder="请输入简单描述" rows="4" v-model="info.describe"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data(){
      return {
        info: {
          //景点名称
          sitename: '',
          //地址
          location: '',
          //线路名称
          routename: '',
          //坐标
          coordinate: '',
          //当地联系人
          contactname: '',
          //联系人电话
          phone: '',
          //景点描述
          describe: '',
          //用途
          purpose: '',
          //照片
          photoList: [],
          //联系人名片
          contactcard: []
        }
      }
    },
    methods: {
      getLocation(){
        var that = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            // debugger;
            let arr = [];
            arr.push(r.point.lng);
            arr.push(r.point.lat);
            that.info.coordinate = arr.toString();
          }
          else {
            alert('failed'+this.getStatus());
          }
        })
      }
    },
    created(){
      this.$route.params? this.info = this.$route.params : '';
      // if(this.$route.params) {
      //
      // }
      // this.info = this.$route.params;
      this.getLocation();
    }
  }
</script>

<style scoped>
  .border-botm {
    border: 1px solid #f0f0ff;
  }

  .info-list {
    background-color: #fff;
    padding: 0.5rem;
    display: flex
  }
</style>
