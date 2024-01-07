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
        <template slot="title"><i class="el-icon-message"></i>测试申请</template>
        <el-menu-item-group>
          <template slot="title">测试任务</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
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
          
        <el-input style="width: 200px;" placeholder="请输入测试任务名称" suffix-icon="el-icon-search"></el-input>
        <el-input style="width: 200px;" placeholder="请输入测试任务编号" suffix-icon="el-icon-search"></el-input>
        <el-button class="ml-5" type="primary">搜索</el-button>
      </div>
      <div style="padding: 10px 0;">
      <el-button type="primary">新增测试任务<i class="el-icon-circle-plus"></i></el-button>
      <el-button type="primary">删除测试任务<i class="el-icon-remove"></i></el-button>
      </div>
      <div><el-table :data="tableData" border stripe  header-cell-class-name="headerbg">
        <el-table-column prop="username" label="用户名" width="140">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button type="success">编辑<i class="el-icon-edit"></i></el-button>
            <el-button type="danger">删除<i class="el-icon-delete"></i></el-button>
           
          </template>
        </el-table-column>
      </el-table>
    </div>
      <div style="padding: 10px 0;">
           <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[2, 5, 10, 20]"
              :page-size="2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
              :currentPage="pageNum"
           </el-pagination>
      </div>
    </el-main>
  </el-container>
</el-container>


</div>



</template>


<!-- 下面代码首先定义了tableData为数组，total定义为0，将接口返回的data.data赋值给tabledata，后将data.pageTotal赋值给total  -->
<script>

export default {
  data() {
    return {                
      tableData: [], // 表格数据
      total: 0, // 总条数
      pageNum: 1, // 每页条数
      pageSize: 2, // 每页条数
      currentPage: 1 // 当前页码
    }
  },
  mounted() {
  
    const apiUrl = 'http://localhost:9091/user/page?pageNum='+this.pageNum+'&pageSize='+this.pageSize;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.tableData = data.data;
        this.total = data.pageTotal;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods:{
    load(){const apiUrl = 'http://localhost:9091/user/page?pageNum='+this.pageNum+'&pageSize='+this.pageSize;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.tableData = data.data;
        this.total = data.pageTotal;
      })
      .catch(error => {
        console.error(error);
      });

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
