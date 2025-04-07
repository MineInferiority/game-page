import request from "@/utils/request";

// 查询员工列表数据
export const queryPageApi = (name,gender,begin,end,page,pageSize) => {
  return request({
    url: "/emps",
    method: "get",
    params:{
      name,gender,begin,end,page,pageSize
    }
  })
}

// 新增员工
export const addEmpApi = (emp) => {
  return request({
    url: "/emps",
    method: "post",
    data: emp,  // 将员工数据传递给接口
  }) 
}

// 根据id查询
export const queryEmpByIdApi = (id) => {
  return request({
    url: `/emps/${id}`,
    method: "get",
  }) 
}

//修改
export const updateEmpApi = (emp) => {
  return request({
    url: `/emps`,
    method: "put",
    data: emp,  // 将员工数据传递给接口
  })
}
//根据id删除
  export const deleteEmpByIdsApi = (ids) => {
  return request({
    url: `/emps?ids=${ids}`,  // 通过查询参数传递 ids
    method: "delete",
  });
};



