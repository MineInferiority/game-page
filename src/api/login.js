import request from "@/utils/request";

// 登录接口
export const loginApi = (user) => {
  return request({
    url: "/login",
    method: "post",
    data: user,
  });
}