<template>
  <div class="list-main">
    <div class="search-line" >
      <div class="list-search-box-content" >
        <div class="list-search-box-detail">

        </div>
        <div style="float: right;margin-right:50px">

          <el-upload
            class="upload-demo"
            action="/web/attachedFile/uploadAttachedFile"
            :data="saveAttachedFileDTO"
            :on-success="uploadFileSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
          >
          <el-tooltip content="上传" placement="top" effect="light">
            <el-button type="info" icon="el-icon-upload" circle ></el-button>
          </el-tooltip>
          </el-upload>

        </div>
        <div style="float: right;margin-right:420px" >
          <el-button type="primary" size="medium" icon="el-icon-search" @click="initData">搜索</el-button>
        </div>
        <div>
          <el-input class="input-text" size="medium" style="float:right;width: 80px;padding: 0;margin-right: 20px"
                    v-model="searchForm.fileName"></el-input>
          <span style="float:right;margin-right: 10px;font-size: 12px">文件名称：</span>
          <el-input class="input-text" size="medium" style="float:right;width: 80px;padding: 0;margin-right: 20px"
                    v-model="searchForm.uploadedBy"></el-input>
          <span style="float:right;margin-right: 10px;font-size: 12px">上传者：</span>
          <select-config-option name="fileType" v-model="searchForm.fileType" style="float:right;width: 150px;padding: 0;margin-right: 20px"></select-config-option>
          <span style="float:right;margin-right: 10px;font-size: 12px">文件类型：</span>
        </div>
      </div>
    </div>
    <div class="list-table-content">

      <div class="list-table-data">
        <el-table
          v-loading="loading"
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            type="index"
            width="83"
            header-align="center">
          </el-table-column>
          <el-table-column
            label="文件编号"
            prop="fileNo"
            header-align="center"
            width="300px">
          </el-table-column>
          <el-table-column
            label="上传者"
            prop="uploadedBy"
            header-align="center"
            width="100px">
          </el-table-column>
          <el-table-column
            label="文件类型"
            prop="fileType"
            header-align="right"
            width="200x">
          </el-table-column>
          <el-table-column
            label="文件名称"
            prop="fileName"
            header-align="center"
          width="300px">
          </el-table-column>
          <el-table-column
            label="操作"
            header-align="center">
            <template slot-scope="scope">

              <el-tooltip content="下载" placement="top" effect="light">
                <el-button type="success" icon="el-icon-download" circle @click="downLoadFile(scope.row.id)"></el-button>
              </el-tooltip>

              <el-tooltip content="删除" placement="top" effect="light">
                <el-button type="danger" icon="el-icon-delete" circle ></el-button>
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="list-table-page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="searchForm.rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div>
      <el-dialog title="新增实验室" v-model="addDialogVisible" :visible.sync="addDialogVisible" width="500px"
                 :close-on-click-modal="false">
        <template v-if="addDialogVisible">
          <add-laboratory :close="controlAddDialog" :getList="initData"></add-laboratory>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import fileAPI from '../../api/file/FileAPI'

  import selectConfigOption from '../../components/SelectConfigOption'

  export default {
    name: "laboratory",
    data() {
      return {
        searchForm: {
          page: 1,
          rows: 10,
          fileName: '',
          uploadedBy: '',
          floor:'',
        },

        saveAttachedFileDTO: {
          fileType: 5
        },

        id: 0,
        total: 0,
        tableData: [],
        loading: false,
        // 新增界面弹出层
        addDialogVisible: false,
        editDialogVisible: false,
        detailDialogVisible: false,
      }
    },

    mounted() {
      let self = this;
      self.initData();
    },

    methods: {
      async initData() {
        let self = this;

        self.loading = true;
        //后台获取数据
        let result = await fileAPI.getAttachedFileList(self.searchForm);
        if (!result.status) {
          return self.$message({
            message: result.reason,
            type: 'warning'
          });
        }
        //对数据进行赋值
        self.tableData = result.records;
        self.total = result.total;
        self.loading = false;
      },

      uploadFileSuccess() {
        let self = this;
        self.$message({
          message: "文件上传成功",
          type: 'success'
        });
        self.initData();
      },

      // 下载文件
      downLoadFile(id) {
         window.location.assign("http://localhost:8080/attachedFile/downloadFile?id="+id);
      },

      handleSelectionChange(val) {
        let self = this;
        self.multipleSelection = val;
      },
      handleSizeChange(rows) {
        let self = this;
        self.searchForm.rows = rows;
        this.initData();
      },
      handleCurrentChange(page) {
        let self = this;
        self.searchForm.page = page;
        this.initData();
      },


      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    },

    components: {
      selectConfigOption
    }


  }

</script>

<style scoped>
.search-line{
  width: 100%;
  height: 40px;
  background: #fff;
  float: left;
  margin:0;
  padding: 0;

}
</style>
