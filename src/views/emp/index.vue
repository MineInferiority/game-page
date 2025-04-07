<script setup>
import { ref , watch ,onMounted} from 'vue'
import { queryPageApi ,addEmpApi  , queryEmpByIdApi ,updateEmpApi,deleteEmpByIdsApi} from '@/api/emp'
import { queryAllApi as queryAllDeptApi} from '@/api/dept'
import { ElMessage,ElMessageBox } from 'element-plus'



//元数据
//职位列表数据
const jobs = ref([{ name: '班主任', value: 1 },{ name: '讲师', value: 2 },{ name: '学工主管', value: 3 },{ name: '教研主管', value: 4 },{ name: '咨询师', value: 5 },{ name: '其他', value: 6 }])
//性别列表数据
const genders = ref([{ name: '男', value: 1 }, { name: '女', value: 2 }])
//部门列表数据
const depts = ref([])
//token
const token = ref('')
//查询全部部门
const queryAllDept = async () => {
  const res = await queryAllDeptApi() 
  if(res.code){
    depts.value = res.data
  }
}

//钩子函数
onMounted(() => {
  search() 
  queryAllDept()
  getToken()
})
//获取token
const getToken = () => {
  const LoginUser = JSON.parse(localStorage.getItem('LoginUser'))
  if(LoginUser&&LoginUser.token){
    token.value = LoginUser.token 
  }
}
// 员工表格数据
const empList = ref([])
// 搜素表单对象
const searchEmp = ref({
  name: '',gender : '',date : [],  begin : '',end : '',
})
//Emp watch监听函数
watch(()=> searchEmp.value.date,(newValue,oldValue)=>{
  if(newValue.length ==2){
    searchEmp.value.begin = newValue[0]
    searchEmp.value.end = newValue[1]
  }else{
    searchEmp.value.begin = ''
    searchEmp.value.end = '' 
  }
})
// 分页
const currentPage4 = ref(1) // 当前页码
const pageSize4 = ref(10)  // 每页显示的条数
const background = ref(true)  // 是否显示分页背景
const total = ref(100)  // 总条数
// 分页配置项 每页展示记录数变化时触发
const handleSizeChange = (val) => {
  search()
}
// 分页配置项 当前页码变化时触发
const handleCurrentChange = (val) => {
  search()
}

const size = ref('default')
// 搜素
const search = async () => {
  const res = await queryPageApi(
  searchEmp.value.name,
  searchEmp.value.gender,
  searchEmp.value.begin,
  searchEmp.value.end,
  currentPage4.value,
  pageSize4.value)
  if(res.code){
    empList.value = res.data.rows
    total.value = res.data.total
  }
}
// 清空
const clear = () => {
  searchEmp.value = {name: '',gender : '',date : [], begin : '',end : '', }
  search()
}

//新增/修改表单
const employee = ref({
  username: '',
  name: '',
  gender: '',
  phone: '',
  job: '',
  salary: '',
  deptId: '',
  entryDate: '',
  image: '',
  exprList: []
})

// 控制弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('新增员工')

//文件上传
// 图片上传成功后触发
const handleAvatarSuccess = (response) => {
  employee.value.image = response.data
}
// 文件上传之前触发
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('只支持上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('只能上传10M以内图片')
    return false
  }
  return true
}
// 新增员工
const addEmp = () => {
  dialogTitle.value = '新增员工' 
  dialogVisible.value = true
  employee.value = {username: '',name: '',gender: '',phone: '',job: '',salary: '',deptId: '',entryDate: '',image: '',exprList: []}
  if (EmpFormRef.value) { // 重置表单
    EmpFormRef.value.resetFields();
  }
}
//添加工作经历
const addExprItem = () => {
  employee.value.exprList.push({
    company: '',
    job: '',
    begin: '',
    end: '',
    exprDate:[],   
  })
}
//删除工作经历
const delExprItem = (index) => {
  employee.value.exprList.splice(index, 1)
}
//Expr watch监听函数
watch(()=> employee.value.exprList,(newValue,oldValue)=>{
  newValue.forEach((expr, index) => {
      // 如果 exprDate 有值，且长度为2，则更新 begin 和 end
      if (expr.exprDate.length === 2) {
        expr.begin = expr.exprDate[0];
        expr.end = expr.exprDate[1];
      } else {
        expr.begin = '';
        expr.end = '';
      }
    });
  },
  { deep: true } // 深度监听，确保对子项的变化能够及时反应
)
//表单引用
const EmpFormRef = ref(null)
// 保存
const save = async () => {
  if (EmpFormRef.value) {
    // 表单校验
    const valid = await EmpFormRef.value.validate();
    if (!valid) {
      ElMessage.error('请填写完整的表单');
      return;
    }
  }
//根据id判断是新增还是修改
 let res 
if (employee.value.id) {
 res = await updateEmpApi(employee.value) // 调用更新接口
}else{
   res = await addEmpApi(employee.value) // 调用新增接口
  }
  if(res.code){
    ElMessage.success('保存成功')
    dialogVisible.value = false
    search()
  }else{
    ElMessage.error(res.msg)
  }
}

//表单校验规则
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度应在2到20个字符之间', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '姓名长度应在2到10个字符之间', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
  ]
});

//编辑
const edit = async (id) => {
  const res = await queryEmpByIdApi(id)
  if(res.code){
    dialogTitle.value = '编辑员工'
    dialogVisible.value = true
    employee.value = res.data 
  }
  // 重置 exprList 的 exprDate 属性
  employee.value.exprList.forEach(expr => {
    expr.exprDate = [expr.begin, expr.end]; // 将 begin 和 end 赋值给 exprDate
  });
}
//删除
const deleteById = (ids) => {
  ElMessageBox.confirm('确定删除该员工吗？', '提示',
 {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
    }).then(async () => {
      const res = await deleteEmpByIdsApi(ids)
      if(res.code){
        ElMessage.success('删除成功')
        search()
      }else{
        ElMessage.error(res.msg)
      }
    }).catch(() => {
     ElMessage.info('已取消删除')
    })
}
//复选框发生选中项的id
const selectedIds = ref([])
const handleSelectionChange = (val) => { // val是选中项的数组
  selectedIds.value = val.map(item => item.id)
}
//批量删除
const deleteByIds = () => {
  ElMessageBox.confirm('确定删除该员工吗？', '提示',
 {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
    }).then(async () => {
      if(selectedIds.value.length&&selectedIds.value.length>0){
       const res = await deleteEmpByIdsApi(selectedIds.value)
      if(res.code){
        ElMessage.success('删除成功')
        search()
      }else{
        ElMessage.error(res.msg)
      }
      }else{
        ElMessage.error('请选择要删除的项')
      }
    }).catch(() => {
     ElMessage.info('已取消删除')
    })
}


</script>

<template>
  <h1>员工管理</h1>
  <!-- 搜索栏 -->
  <div class="container">
    <el-form :inline="true" :model="searchEmp" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="searchEmp.name" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="性别">
      <el-select
        v-model="searchEmp.gender"
        placeholder="请选择"
        clearable
      >
        <el-option label="男" value="1" />
        <el-option label="女" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="入职时间">
     <el-date-picker
     v-model="searchEmp.date"
     type="daterange"
     range-separator="到" 
     start-placeholder="开始日期"
     end-placeholder="结束日期"
     value-format="YYYY-MM-DD"
      format="YYYY-MM-DD"
/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="info" @click="clear">清空</el-button>
    </el-form-item>
  </el-form>
    </div>
    <!-- 功能按钮 -->
     <div class="container">
        <el-button type="primary" @click="addEmp">+新增员工</el-button>
        <el-button type="danger" @click="deleteByIds">-批量删除</el-button>
     </div>
     <!-- 数据展示表格 -->
  
     <div class="container">
         <el-table :data="empList" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column prop="name" label="姓名" width="120" align="center" />
        <el-table-column prop="gender" label="性别" width="120" align="center">
          <template #default="scope">
            {{ scope.row.gender == 1 ? '男' : '女' }}
          </template>
          </el-table-column>
        <el-table-column prop="image" label="头像" width="120" align="center">
          <template #default="scope">
            <img :src="scope.row.image" alt="" height="50px"> 
          </template>
          </el-table-column>
        <el-table-column prop="deptName" label="所属部门" width="120" align="center"/>
        <el-table-column prop="job" label="职位" width="120" align="center">
          <template #default="scope">
            <span v-if="scope.row.job == 1">班主任</span>
            <span v-else-if="scope.row.job == 2">讲师</span>
            <span v-else-if="scope.row.job == 3">学工主管</span>
            <span v-else-if="scope.row.job == 4">教研主管</span>
            <span v-else-if="scope.row.job == 5">咨询师</span>
            <span v-else>其他</span>
          </template>
          </el-table-column>
        <el-table-column prop="entryDate" label="入职日期" width="180" align="center"/>
        <el-table-column prop="updateTime" label="最后操作时间" width="180" align="center"/>
        <el-table-column label="操作" align="center">
          <template #default="scope">
        <el-button type="primary" size="small" @click="edit(scope.row.id)"><el-icon><EditPen /></el-icon>编辑</el-button>
        <el-button type="info" size="small" @click="deleteById(scope.row.id)"><el-icon><Delete /></el-icon>删除</el-button>
      </template>
          </el-table-column>
  </el-table>   
     </div>
     <!-- 分页条 -->
      <div class="container">
        <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 40]"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
      </div>
         <!-- 新增/修改员工的对话框 -->
  <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="employee" :rules="rules" ref="EmpFormRef" label-width="80px">
        <!-- 基本信息 -->
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="employee.username" placeholder="请输入员工用户名，2-20个字"></el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="employee.name" placeholder="请输入员工姓名，2-10个字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="employee.gender" placeholder="请选择性别" style="width: 100%;">
                <el-option v-for="gender in genders":key="gender.value" :label="gender.name" :value="gender.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="employee.phone" placeholder="请输入员工手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="职位">
              <el-select v-model="employee.job" placeholder="请选择职位" style="width: 100%;">
                <el-option v-for="j in jobs" :key="j.value" :label="j.name" :value="j.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="薪资">
              <el-input v-model="employee.salary" placeholder="请输入员工薪资"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门">
              <el-select v-model="employee.deptId" placeholder="请选择部门" style="width: 100%;">
                <el-option v-for="d in depts" :key="d.id" :label="d.name" :value="d.id"></el-option>
                
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期">
              <el-date-picker v-model="employee.entryDate" type="date" style="width: 100%;" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :headers="{'token': token}"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <img v-if="employee.image" :src="employee.image" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        

        <!-- 工作经历 -->
        <!-- 第六行 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="工作经历">
              <el-button type="success" size="small" @click="addExprItem">+ 添加工作经历</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 第七行 ...  工作经历 -->
        <el-row :gutter="3" v-for="(expr,index) in employee.exprList">
          <el-col :span="10">
            <el-form-item size="small" label="时间" label-width="80px">
              <el-date-picker type="daterange" v-model="expr.exprDate" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item size="small" label="公司" label-width="60px">
              <el-input v-model="expr.company" placeholder="请输入公司名称"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item size="small" label="职位" label-width="60px">
              <el-input v-model="expr.job" placeholder="请输入职位"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2">
            <el-form-item size="small" label-width="0px">
              <el-button type="danger" @click="delExprItem(index)" >- 删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      <!-- 底部按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </span>
      </template>
  </el-dialog>
</template>


<style scoped>
.container{
  margin: 10px 0px ;
}

.avatar {
  height: 40px;
}
.avatar-uploader .avatar {
  width: 78px;
  height: 78px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  text-align: center;
  border-radius: 10px;
  /* 添加灰色的虚线边框 */
  border: 1px dashed var(--el-border-color);
}
</style>