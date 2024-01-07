<template>
  <div style="height: 100%;">
    <el-container style="height: 100%; ">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']" style="min-height: 100% ; overflow-x: hidden;" background-color="rgb(48,65,86)"
      active-text-color="#ffd04b" 
      text-color="#fff"
      
      
      >
       <div style="height: 60px; line-height: 60px; text-align: center;" >
        <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; margin-right: 5px;">    
        <b style="color: white;">测试管理系统</b>
       </div>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>测试用例管理</template>
          </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style=" font-size: 12px"  display: flex>
        <div style="flex: 1  font-size: 18px">
          
        </div>
        <div style="text-align: right;">
          <el-dropdown style="width: 50px" cursor:pointer >
          <span>王小虎</span><i class="el-icon-bottom"></i>
          
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
        
      </el-header>
      
      <el-main>
        <div style="padding: 10px 0;">
            
          <el-input style="width: 200px;" placeholder="请输入测试用例编号" suffix-icon="el-icon-search" v-model="testcaseid"></el-input>
          <el-input style="width: 200px;" placeholder="请输入测试用例名称" suffix-icon="el-icon-search" v-model="testcasename"></el-input>
          <el-input style="width: 200px;" placeholder="请输入测试模块名称" suffix-icon="el-icon-search" v-model="testcasemodule"></el-input>
          <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
          <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
        </div>
        <div style="padding: 10px 0;">
        <el-button type="primary" @click="addtestcase" >新增测试用例<i class="el-icon-circle-plus"></i></el-button>
        <el-button type="danger" @click="deletebatchtestcase" >批量删除测试用例<i class="el-icon-delete"></i></el-button>
        <el-upload action="http://localhost:9091/testcase/import" :show-file-list="false" :on-success="importSuccess" style="display: inline-block;" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
           <el-button type="primary" class="ml-5" >导入测试用例<i class="el-icon-upload2"></i></el-button>
        </el-upload>
        <el-button type="primary" class="ml-5" @click="exporttestcase" >导出测试用例<i class="el-icon-download"></i></el-button>
        </div>
        <div>
          <el-table :data="tableData" border stripe  header-cell-class-name="headerbg" @selection-change="handleSelectionChange" :key="tableKey">
          <el-table-column type="selection" width="55">
        </el-table-column>
          <el-table-column prop="testcaseid" label="测试用例编号" width="140">
          </el-table-column>
          <el-table-column prop="testcasename" label="测试用例名称" width="120"></el-table-column>
          <el-table-column prop="testcasemodule" label="模块" width="120"></el-table-column>
          <el-table-column prop="testcaserunstep" label="步骤" width="120"></el-table-column>
          <el-table-column prop="testcaseexpectedresult" label="预期结果" width="120"></el-table-column>
          <el-table-column prop="testcaserunresult" label="实际结果" width="120"></el-table-column>
          
          <el-table-column prop="testcaseactualresult" label="执行状态" width="120">
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button type="primary" @click="runtestcase(scope.row)">测试用例执行<i class="el-icon-video-play"></i></el-button>
              <el-button type="success" @click="eidttestcase(scope.row)">测试用例编辑<i class="el-icon-edit"></i></el-button>
              <el-popconfirm confirm-button-text='确定' cancel-button-text='再想想' icon="el-icon-info"
                 icon-color="red" title="确定删除此条测试用例？"  @confirm="deletetestcase(scope.row.testcaseid)">

               <el-button type="danger" slot="reference" class="ml-5">测试用例删除<i class="el-icon-delete"></i></el-button>
               </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <div style="padding: 10px 0;">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[ 10, 20]"
                :page-size="2"
                layout="total, sizes, prev, pager, next, jumper"
                :total="testcasetotal">
                :currentPage="pageNum"
             </el-pagination>
        </div>
        <el-dialog title="测试用例编辑" :visible.sync="dialogFormVisible">
              <el-form :model="form">
             <el-form-item label="测试用例名称" :label-width="formLabelWidth">
             <el-input v-model="form.testcasename" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="测试用例模块" :label-width="formLabelWidth">
             <el-input v-model="form.testcasemodule" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="测试用例步骤" :label-width="formLabelWidth">
             <el-input v-model="form.testcaserunstep" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="测试用例预期结果" :label-width="formLabelWidth">
             <el-input v-model="form.testcaseexpectedresult" autocomplete="off"></el-input> 
            </el-form-item>
             <el-form-item label="测试用例实际结果" :label-width="formLabelWidth">
              
             <el-input v-model="form.testcaserunresult" autocomplete="off"></el-input>
            </el-form-item>



  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="测试执行" :visible.sync="dialogruntestcase">
              <el-form :model="form">
             <el-form-item label="测试用例名称" :label-width="formLabelWidth">
             <el-input v-model="form.testcasename" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="测试用例模块" :label-width="formLabelWidth">
             <el-input v-model="form.testcasemodule" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="测试用例步骤" :label-width="formLabelWidth">
             <el-input v-model="form.testcaserunstep" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="测试用例预期结果" :label-width="formLabelWidth">
             <el-input v-model="form.testcaseexpectedresult" autocomplete="off"></el-input> 
            </el-form-item>
             <el-form-item label="测试用例实际结果" :label-width="formLabelWidth">
             <el-input v-model="form.testcaserunresult" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="执行状态" :label-width="formLabelWidth">
              <el-select v-model="form.testcaseactualresult" placeholder="请选择用例执行状态">
        <el-option label="执行通过" value="执行通过"></el-option>
        <el-option label="不适用" value="不适用"></el-option>
        <el-option label="执行失败" value="执行失败"></el-option>
      </el-select>
            
            </el-form-item>


  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogruntestcase = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </div>
</el-dialog>
      </el-main>
    </el-container>
  </el-container>
  
  
  </div>
  
  
  
  </template>
  
 
  <!-- 下面代码首先定义了tableData为数组，total定义为0，将接口返回的data.data赋值给tabledata，后将data.pageTotal赋值给total  -->
  <script>
import request from '@/utils/request';
import axios from 'axios';
import { Row } from 'element-ui';

  
  export default {
    data() {
      return {                
        tableData: [], // 表格数据
        testcasetotal: 0, // 总条数
        pageNum: 1, // 每页条数
        pageSize: 10, // 每页条数
        currentPage: 1, // 当前页码
        testcaseid:"",
        
        testcaseids: [] ,
        testcasename:"",
        testcasemodule:"",
        dialogFormVisible:false,
        dialogruntestcase:false,
        multipleSelection:[],
        selectionKey: 1,
        form:{},
        formLabelWidth: '100px',
        row:"",
           
      tableKey: 1,
    
      }
    },
    mounted() {
      axios.get("http://localhost:9091/testcase/testcasepage", {
  params: {
    pageNum: this.pageNum,
    pageSize: this.pageSize,
    testcaseid:this.testcaseid,
    testcasename:this.testcasename,
        testcasemodule:this.testcasemodule
  }
})
.then(res => {
          console.log(res);
          this.testcasetotal = res.data.testcasetotal;
          this.tableData = res.data.data;
          this.total = res.data.total;
          
        })
        .catch(error => {
          console.error(error);
        });
    },
    
      //const apiUrl = 'http://localhost:9091/testcase/testcasepage?pageNum='+this.pageNum+'&pageSize='+this.pageSize;
     // fetch(apiUrl)
        

    methods:{
      importSuccess(response) {
      if ( response === true) {
        this.$message.success("测试用例导入成功");
        
        this.load();
      }else {
    // 如果导入失败，可以在这里添加错误提示
    this.$message.error("测试用例导入失败");
  }
    },
      //导出测试用例方法
      exporttestcase(){
        window.open("http://localhost:9091/testcase/export", "_blank");
      },
          //批量删除时取数据
    handleSelectionChange(val) {
  // 输出选中的测试用例数据
  console.log(val);
  
  // 获取选中的测试用例编号

   this.testcaseids = val.map(item => item.testcaseid);
  console.log(this.testcaseids);
},
      deletebatchtestcase() {
  
  console.log(this.testcaseids)
  this.$confirm('您将删除所选中的测试用例，是否继续？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log(this.testcaseids)
    this.applytestcaseids=this.testcaseids
    axios({
  method: 'post',
  url: 'http://localhost:9091/testcase/testcasepage/batch',
  data: {
    testcaseids: this.applytestcaseids
  }
}).then(res => {
  if (res.data && res.data.length > 0) { // 如果返回的数据不为空
    this.$message.success(`测试用例 ${res.data.join(', ')} 删除成功`); // 展示删除成功信息
    this.load(); // 刷新页面以更新数据
  
      } else {
        this.$message.error('删除失败，请重试');
      }
    }).catch(err => {
      this.$message.error('删除失败，请稍后重试');
      console.error(err);
    });
  }).catch(() => {
    this.$message.info('已取消删除');
  });
},

      //删除测试用例方法
      deletetestcase(testcaseid){
        request.delete("http://localhost:9091/testcase/testcasepage/"+testcaseid).then(res => {
      if (res) {
        this.$message.success("删除成功");

        this.load()
      } else {
        this.$message.error("删除失败");
      }
    })

      },
      //执行测试用例方法
      runtestcase(row) 
      {
        this.form = { ...row }
        this.form.testcaseactualresult = this.form.testcaseactualresult
        this.dialogruntestcase = true
        this.form.testcaseactualresult = this.form.testcaseactualresult
        
    },
      //编辑测试用例方法
      eidttestcase(row){
        
        this.form=row
        this.dialogFormVisible=true
      },
      //新增测试用例方法
      addtestcase(){
        this.dialogFormVisible= true
        this.form={}
      },
      reset(){
        this.testcaseid="",
        this.testcasename="",
        this.testcasemodule="",
        this.load()
       
      },
      save() {
  request
    .post("http://localhost:9091/testcase/testcasepage", this.form)
    .then(res => {
      if (res) {
        this.$message.success("保存成功");
        this.dialogFormVisible=false;
        this.dialogruntestcase=false;
        this.load()
      } else {
        this.$message.error("保存失败");
      }
    })
    .catch(error => {
      // 处理请求错误
      console.error(error);
      this.$message.error("请求错误，保存失败");
    });
},
      load(){
        axios.get("http://localhost:9091/testcase/testcasepage", {
  params: {
    pageNum: this.pageNum,
    pageSize: this.pageSize,
    testcaseid:this.testcaseid,
    testcasename:this.testcasename,
        testcasemodule:this.testcasemodule
    
  }
}).then(res =>{console.log(res)
  this.tableData=res.data.data;
        this.total=res.data.total;
        this.testcasetotal = res.data.testcasetotal;})
        
        
        //下面代码注释掉，因为使用axios请求不再使用fetch
        /*const apiUrl = 'http://localhost:9091/testcase/testcasepage?pageNum='+this.pageNum+'&pageSize='+this.pageSize;   
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.testcasetotal = data.testcasetotal;
          this.tableData = data.data;
          this.total = data.testcasetotal;
        })
        .catch(error => {
          console.error(error);
        });  */
  
      },
    handleSizeChange(pageSize){
         console.log(pageSize)
         this.pageSize=pageSize
         this.load()
    },
    handleCurrentChange(pageNum){
      console.log(pageNum)
      this.pageNum=pageNum
      this.load()
    }
  
  }
  };
  
  </script>
  <style>
  .headerbg{
    background: #ececeb!important;
  }
  </style>
  