# 云函数说明

本目录存放微信云开发云函数。

当前云环境 ID：

```text
cloud1-d6geemhftac318bc0
```

已创建云函数：

| 云函数 | 作用 |
|---|---|
| `login` | 获取当前微信用户的 `openid` 等云开发身份信息 |
| `postService` | 社区动态列表、详情、发布、点赞、评论、删除、重置 |
| `orderService` | 订单列表、创建订单、重置 |
| `favoriteService` | 收藏列表、收藏状态检测、收藏/取消收藏、重置 |
| `weatherService` | 通过 Open-Meteo 获取雪场实时天气，前端不直接请求第三方接口 |

使用方式：

1. 在微信开发者工具中右键云函数目录，例如 `login`。
2. 选择“上传并部署：云端安装依赖”。
3. 部署成功后，可在小程序中调用 `wx.cloud.callFunction({ name: 'login' })` 测试。
