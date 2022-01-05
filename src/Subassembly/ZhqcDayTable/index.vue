<!--Main-->
<template>
  <div
    class="table-content"
    :class="className" v-if="data">
    <!-- 显示表格 -->
    <el-table
      ref="table"
      v-loading="listInfo.loading"
      :data="data"
      border
      :height="tableHeight || fixedHeight"
      style="width:100%"
      :cell-class-name="cellClassName"
      @select-all="handleSelectionChange"
      @selection-change="handleSelectionChange">
      <el-table-column
        v-for="(item, index) in fieldList"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :type="item.type"
        :align="item.align || 'center'"
        :width="item.width"
        :selectable="item.selectable"
        :min-width="item.minWidth || '100px'"
        :formatter="item.formatter"
        :show-overflow-tooltip="item.value!='portAbbr'? overflow:false">
        <template slot="header" slot-scope="scope">
          <template v-if="item.hasOwnProperty('_checked')">
            <el-checkbox v-model="item._checked" @change="handleClick(item._checkEvent, item, scope)"></el-checkbox> {{item.label}}
          </template>
          <template v-else>{{item.label}}</template>
        </template>
        <template v-slot="scope" v-if="item.type === 'slot'">
          <!-- solt 自定义列-->
          <template v-if="item.type === 'slot'">
            <slot
              :name="'col-' + item.value"
              :row="scope.row"
            />
          </template>
          <!-- 标签 -->
          <el-tag v-else-if="item.type === 'tag'">
            {{ scope.row[item.value] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="handle !== null"
        :key="'handle'"
        :fixed="handle.fixed"
        :align="handle.align || 'center'"
        :label="handle.label"
        :width="handle.width"
      >
        <template v-slot="scope">
          <template v-for="(item, index) in handle.btList">
            <!-- 自定义操作类型 -->
            <slot
              v-if="item.slot"
              :name="'bt-' + item.event"
              :data="{item, row: scope.row}"
            />
            <!-- 操作按钮 -->
            <el-button
              v-if="item.show"
              :key="index"
              v-waves
              size="mini"
              :type="item.type"
              :icon="item.icon"
              :disabled="item.disabled"
              :loading="item.loading"
              @click="handleClick(item.event, scope.row)"
            >
              {{ item.label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      cellClassName: {
        type: Function,
        default: function() {
          return ''
        }
      },
      replyShow:{
        type: Boolean,
        default: () => {
          return false
        }
      },
      viewShow:{
        type: Boolean,
        default: () => {
          return false
        }
      },
      refObj:{
        type: Object
      },
      overflow:{
        type: Boolean,
        default: () => {
          return true
        }
      },
      // 自定义类名
      className: {
        type: String
      },
      // 类型列表
      listTypeInfo: {
        type: Object
      },
      // 表格字段配置
      fieldList: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 操作栏配置
      handle: {
        type: Object,
        default: () => {
          return null
        }
      },
      handleList:{
        type: Object,
        default: () => {
          return null
        }
      },
      // 列表数据
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      // 监听高度
      height:{
        type: Number,
        default:500
      },
      contentHeight:{
        type: Number,
        default:550
      },
      fixedHeight:{
        type: Number,
        default:null
      },
      toggleRowSelections:{
        type : Array,
        default: () => {
          return null
        }
      }
    },
    data () {
      return {
        // 列表相关
        listInfo: {
          loading: false, // 加载动画
        },
        tableHeight:  0,
      }
    },
    watch: {
      height(value) {
        if (value) {
          this.tableHeight = this.getTableHeight();
        }
      },
      contentHeight(value) {
        if (value) {
          this.tableHeight = this.getTableHeight();
        }
      },
      //toggleRowSelections
      data: {
        handler: function (val) {
          this.$emit('update:refObj', this.$refs.table)
          this.$nextTick(()=>{
            this.toggleRowData()
          })
        },
        deep: true // 深度监听
      },
      // toggleRowSelections: {
      //   handler: function (val) {
      //     alert('深度')
      //     this.$emit('update:refObj', this.$refs.table)
      //   },
      //   deep: true // 深度监听
      // },
    },
    mounted () {
      this.$emit('update:refObj', this.$refs.table)
      this.toggleRowData()
    },
    methods: {
      handleSizeChange (val) {
        const query = this.listInfo.query
        query.pageSize = val // 每页条数
        query.curPage = 1 // 每页条数切换，重置当前页
      },
      handleCurrentChange (val) {
        this.listInfo.query.curPage = val // 当前页
      },
      // 派发按钮点击事件
      handleClick (event, data) {
        this.$emit('handleClick', event, data)
      },
      // 选中数据
      handleSelectionChange (rows) {
        this.$emit('handleEvent', 'tableCheck', rows)
      },
      //
      toggleRowData(){
        this.$emit('update:refObj', this.$refs.table)
        if (!this.toggleRowSelections) return;
        this.data.forEach((items, indexs)=>{
          this.$refs.table.toggleRowSelection(this.data[indexs],true);
        })
      },
      //
      getTableHeight(){
        //
        const boxH = document.body.clientHeight
        const navH = document.getElementsByClassName('navbar')[0] ? document.getElementsByClassName('navbar')[0].clientHeight : 0
        const tagH = document.getElementsByClassName('tags-view-container')[0] ? document.getElementsByClassName('tags-view-container')[0].clientHeight : 0
        const searchH = document.getElementsByClassName('fn-layout-vertical-form')[0] ? document.getElementsByClassName('fn-layout-vertical-form')[0].clientHeight : 0
        const pagerH = document.getElementsByClassName('fn-layout-vertical-operation')[0] ? document.getElementsByClassName('fn-layout-vertical-operation')[0].clientHeight : 0
        const bottomH = document.getElementsByClassName('fn-layout-vertical-pagination')[0] ? document.getElementsByClassName('fn-layout-vertical-pagination')[0].clientHeight : 0
        return boxH - (navH + tagH + searchH + pagerH + bottomH);
      }
    }
  }
</script>
