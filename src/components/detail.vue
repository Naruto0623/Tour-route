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
            <option v-for="(item,key) in routeList" :key="key" :value="item.routeid">{{ item.routename }}</option>
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
    <div class="border-botm">
      <div class="image-upload">
        <div style="width: 30%">
          <span class="mint-cell-text">用途：</span>
        </div>
        <div style="display: flex;flex-wrap: wrap;">
          <span v-for="(item,key) in checkList" :key="key" style="width: 6rem">
            <input type="checkbox" :value="item.useid">{{ item.usename }}
          </span>
        </div>
      </div>
    </div>
    <div class="border-botm">
      <div class="image-upload">
        <div style="width: 30%">
          <span class="mint-cell-text">联系人名片：</span>
        </div>
        <div class="" style="width: 60%">
          <form enctype="multipart/form-data">
            <input id="cardUpload" type="file" v-show="false" multiple="multiple" name="fileAttach" @change="selectCardImg($event.target,'0')"/>
          </form>
        </div>
        <div style="display: flex;flex-wrap: wrap;">
          <div v-for="(item,key) in cardUploadData" :key="key" class="image-show">
            <img :src="item" alt="" height="100%" width="100%">
          </div>
          <div class="select-img" @click="chooseImg(0)">+</div>
        </div>
      </div>
    </div>
    <div class="border-botm">
      <div class="image-upload">
        <div style="width: 30%">
          <span class="mint-cell-text">照片：</span>
        </div>
        <div class="" style="width: 60%">
          <form enctype="multipart/form-data">
            <input id="photoUpload" type="file" v-show="false" multiple="multiple" name="fileAttach" @change="selectCardImg($event.target,'1')"/>
          </form>
        </div>
        <div style="display: flex;flex-wrap: wrap;">
          <div v-for="(item,key) in photoUploadData" :key="key" class="image-show">
            <img :src="item" alt="" height="100%" width="100%">
          </div>
          <div class="select-img" @click="chooseImg(1)">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import res from '../assets/listJson'

  export default {
    name: "detail",
    data(){
      return {
        options: [
          {
            label: 'disabled option',
            value: 'valueF',
            disabled: true
          },
          {
            label: 'checked disabled',
            value: 'valueE',
            disabled: true
          },
          {
            label: 'optionA',
            value: 'valueA'
          },
          {
            label: 'optionB',
            value: 'valueB'
          }
        ],
        //名片图片base64
        cardUploadData: [],
        //照片图片base64
        photoUploadData: [],
        //上传多张名片信息
        uploadCard: [],
        //上传多张照片信息
        uploadPhoto: [],
        //线路下拉框
        routeList: [],
        //用途复选框
        checkList: [],
        info: {
          //景点名称
          sitename: '',
          routename: '',
          //线路名称
          //地址
          location: '',
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
      //编辑后保存
      saveInfo(){

      },
      //选择图片
      chooseImg( num ){
        var cardUpload = document.getElementById('cardUpload');
        var photoUpload = document.getElementById('photoUpload');
        num == 0? cardUpload.click(): photoUpload.click();
      },
      //获取选中图片信息
      selectCardImg( obj, type ){
        var that = this;
        var fl = obj.files.length;
        for (var i = 0; i < fl; i++) {
          var file = obj.files[ i ];
          var fileObj = {};
          fileObj = {
            name: file.name,
            size: file.size,
            type: file.type
          };
          var reader = new FileReader();
          reader.onload = function ( e ){
            type == 0? that.cardUploadData.push(e.target.result): that.photoUploadData.push(e.target.result);
          };
          reader.readAsDataURL(file);
          type == 0? that.uploadCard.push(fileObj): that.uploadPhoto.push(fileObj);
        }
      },
      //获取地理位置
      getLocation2(){
        var that = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function ( r ){
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            let arr = [];
            arr.push(r.longitude);
            arr.push(r.latitude);
            that.info.coordinate = arr.toString();
            that.info.location = r.address.province + r.address.city + r.address.district;
          }
          else {
            alert('failed' + this.getStatus());
          }
        })
      },
      //获取坐标
      showPosition( position ){
        var that = this;
        that.info.coordinate = position.coords.longitude + "," + position.coords.latitude;
        var point = new BMap.Point(position.coords.longitude, position.coords.latitude);
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function ( rs ){
          var addComp = rs.addressComponents;
          that.info.location = addComp.province + addComp.city + addComp.district
            + addComp.street + addComp.streetNumber;
        });
      },
      getLocation(){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
        }
        else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      },
      //获取复选框值
      pullcheckList() {
        let url = '';
        this.checkList = res.checkOption;
        axios.get(url).then(res =>{
          if (res.data.code == '200') {
            this.checkList = res.data.selectOption;
          }
        });
      },
      //获取线路下拉框
      pullrouteList(){
        let url = '';
        this.routeList = res.selectOption;
        axios.get(url).then(res =>{
          if (res.data.code == '200') {
            this.routeList = res.data.selectOption;
          }
        });
      }
    },
    created(){
      this.pullrouteList();
      this.pullcheckList();
      if (this.$route.params.info) {
        this.info = this.$route.params.info;
      } else {
        this.getLocation();
      }
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

  .image-upload {
    background-color: #fff;
    padding: 0.5rem;
  }

  .image-show {
    width: 5rem;
    height: 5rem;
    margin: 3px;
    background-color: #f2f2f2;
  }

  .select-img {
    width: 5rem;
    height: 5rem;
    margin: 3px;
    background-color: #f2f2f2;
    text-align: center;
    line-height: 5rem;
    color: #aeaeae;
    font-size: 1.6rem;
  }
</style>
