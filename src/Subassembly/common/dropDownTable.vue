<template>
  <div class="dropDown_wrap">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <div
              class="customer_tags"
              ref="tags"
              v-if="multiple"
              :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
            <span v-if="collapseTags && tagsNumber&&multipleSelection.length">
                <el-tag
                :closable="!selectDisabled"
                :size="collapseTagSize"
                v-for="(item,index) of tagsList"
                :key="getValueKey(item)"
                type="info"
                @close="handleClose($event, index)"
                disable-transitions>
                <span class="customer__tags-text">{{ item[`${tagsLabel}`] }}</span>
                </el-tag>
                <el-tag
                  v-if="multipleSelection.length > tagsNumber"
                  :closable="false"
                  :size="collapseTagSize"
                  type="info"
                  disable-transitions
                  >
                  <span class="customer__tags-text">+ {{ multipleSelection.length - tagsList.length }}</span>
                </el-tag>
            </span>
            <!-- 不折叠 -->
            <transition-group @afterEnter="resetInputHeight" @afterLeave="resetInputHeight" v-if="!collapseTags">
              <el-tag
                v-for="(item,index) in tagsList"
                :key="getValueKey(item)"
                :closable="!selectDisabled"
                :size="collapseTagSize"
                type="info"
                @close="handleClose($event, index)"
                disable-transitions>
                <span class="customer__tags-text">{{ item[`${tagsLabel}`] }}</span>
              </el-tag>
            </transition-group>
          </div>
          <el-input
              ref='innerInput'
              type="text"
              :name="name"
              :size="selectSize"
              :disabled="selectDisabled"
              :readonly="readonly"
          >
            <template slot="suffix">
              <i
                v-show="!showClose"
                :class="['el-input__icon','customer_select', 'el-icon-' + iconClass,isReverse]"
                @click="handleReserve"
                ></i>
            </template>
          </el-input>
        </span>
        <el-dropdown-menu slot="dropdown">
           <el-table
                ref="multipleTable"
                size="mini"
                :stripe="true"
                :data="tableData"
                :fit='true'
                row-key='id'
                height="175"
                style="width: 100%"
                :header-cell-style="styleCallBack?styleCallBack:()=>{}"
                @selection-change="handleSelectionChange"
                >
                 <el-table-column
                  type="selection"
                  >
                </el-table-column>
                <el-table-column
                  v-for="(item,index) in fieldList"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.minWidth"
                >

                </el-table-column>
          </el-table>
          </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event';
export default {
  name: 'CSTMSelect',
  model:{
    prop:'multipleSelection',
    event:'change'
  },
  props:{
    name: String,
    multiple:Boolean,
    selectDisabled:Boolean,
    // noWrap:Boolean,
    collapseTags:Boolean,
    readonly:Boolean,
    showClose:Boolean,
    selectSize:{
      type:String,
      default:'mini'
    },
    iconClass:{
      type:String,
      default:'arrow-up'
    },
    collapseTagSize:{
      type:String,
      default:'mini'
    },
    multipleSelection:{
      type:Array,
      default:()=>{
        return []
      }
    },
    tagsLabel:{
      type:String,
      required:true,
      default:'',
    },
    tagsNumber:{
      type:Number,
      default:2
    },
    fieldList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    tableData:{
      type:Array,
      default:()=>{
        return []
      }
    },
    styleCallBack:{
      type:Function,
    },
    tagsValueFlag:{
      type:String,
      default:()=>{
        return 'id'
      }
    }
  },
  data() {
        return {
          selectedAddress:"",
          initialInputHeight:0,
          isReverse:false,
          inputWidth: 0,
        }
      },
  computed:{
    tagsList(){
      //折叠
      if(this.multiple&&this.collapseTags){
        let list=[]
        this.multipleSelection.slice(0,this.tagsNumber).forEach(element => {
          let obj={
            [this.tagsLabel]:element[this.tagsLabel],
            [this.tagsValueFlag]:element[this.tagsValueFlag],
            uuid:element.uuid
          }
          list.push(obj);
        });
        return list
      }
      if(this.multiple&&!this.collapseTags){
        let list=[]
        this.multipleSelection.forEach(element => {
          let obj={
            [this.tagsLabel]:element[this.tagsLabel],
            [this.tagsValueFlag]:element[this.tagsValueFlag],
            uuid:element.uuid
          }
          list.push(obj);
        });
        return list
      }
    }
  },
  watch:{
    tableData(v){
      console.log(v)
      if(v.length>0){
        this.toggleSelection(this.multipleSelection)
      }
    }
  },
  mounted(){
    const innerInput = this.$refs.innerInput;
    const table=this.$refs.multipleTable;
    addResizeListener(this.$el, this.handleResize);
    if (innerInput && innerInput.$el) {
        const sizeMap = {
          medium: 36,
          small: 32,
          mini: 28
        };
      const input = innerInput.$el.querySelector('input');
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
    }
    this.$nextTick(() => {
        if (innerInput && innerInput.$el) {
          this.inputWidth = innerInput.$el.getBoundingClientRect().width;
        }
        if(table&&table.$el){
          const ul=table.$el.parentNode
          ul.style.width=this.inputWidth+'px'
        }
      });
      // this.$nextTick(()=>{
      //   this.toggleSelection(this.multipleSelection)
      // })
  },
  methods:{
    //用来做数据回显的（编辑回显数据）
    toggleSelection(arr,selected=true){
      let that=this
      if(arr.length!==0){
        this.$nextTick(()=>{
          let bool;
          that.tableData.forEach((row)=>{
             bool=!!arr.find(i=>{
               return i[that.tagsValueFlag]==row[that.tagsValueFlag]
             })
            if(bool){
              that.$refs.multipleTable.toggleRowSelection(row,selected)
            }
          })
          console.log(bool)
        })
      }else{
        this.$nextTick(()=>{
          this.$refs.multipleTable.clearSelection()
        })
      }
    },
    handleClose(e,val){
      this.$emit("CloseTags",val)
      this.$nextTick(()=>{
        this.toggleSelection(this.multipleSelection,false)
      })
    },
    handleResize() {
        this.resetInputWidth();
        this.resetTableWidth();
      },
    handleReserve(){
      if(!this.isReverse){
        this.isReverse='is_reverse'
      }else{
        this.isReverse=''
      }
    },
      handleSelectionChange(val){
        // alert(val)
        // this.multipleSelection=val;
        this.$emit('change',val)
      },
      getValueKey(item) {
      if (Object.prototype.toString.call(item).toLowerCase() === '[object object]') {
        return item[this.tagsValueFlag];
      } else {
        return item.uuid;
      }
    },
    resetTableWidth(){
      const table=this.$refs.multipleTable;
      if(table&&table.$el){
        const ul=table.$el.parentNode
        ul.style.width=this.inputWidth+'px'
      }
    },
    resetInputWidth() {
        this.inputWidth = this.$refs.innerInput.$el.getBoundingClientRect().width;
    },
    resetInputHeight(){
      if(this.collapseTag)return;
      this.$nextTick(()=>{
        if (!this.$refs.innerInput) return;
        let inputChildNodes = this.$refs.innerInput.$el.childNodes;
        let input =[].filter.call(inputChildNodes,item=>item.tagName==='INPUT')[0];
        const tags = this.$refs.tags;
        const sizeInMap = this.initialInputHeight || 40;
        input.style.height = this.tagsList.length === 0
        ? sizeInMap + 'px'
        : Math.max(
          tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
          sizeInMap
        ) + 'px';
      })
    }
  },
   beforeDestroy() {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize);
  }
}
</script>

<style lang="scss" scoped>
.customer_select{
  color: #c0c4cc;
  font-size: 14px;
  transition: transform .3s;
  transform: rotate(180deg);
  cursor: pointer;
}
.is_reverse{
  transform: rotate(0deg);
}
.dropDown_wrap{
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
  /deep/.el-dropdown{
    width: 100%;
    height: 100%;
    .customer_tags{
      position: absolute;
      line-height: normal;
      white-space: normal;
      z-index: 1;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .el-input{
        position: relative;
        font-size: 14px;
        display: block;
        width: 100%;
        .el-input__suffix{
          position: absolute;
          height: 100%;
          right: 5px;
          top: 0;
          right: 5px;
          text-align: center;
          color: #c0c4cc;
          transition: all .3s;
          pointer-events: none;
          .el-input__suffix-inner{
            pointer-events: all;
          }
        }
      }
    }
  }
}
</style>
