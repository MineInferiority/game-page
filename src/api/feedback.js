import request from "@/utils/request";

// 将前端建议反馈内容提交给后端
export const FeedbackApi = (feedback) => {
  return request({
    url: "/feedback",
    method: "post",
    data: feedback,  // 将反馈数据传递给接口 
  })
}