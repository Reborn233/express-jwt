# node-express api服务


使用`Docker Compose`创建环境容器,nginx 创建web服务

```
docker-compose up --build
```
没有安装`Docker Compose`的：
  ```
    cd app
    npm install
    npm start
  ```

启动服务后

访问 `http://localhost:3000/api/test?id=123`
```
{
    "code": 0,
    "data": {
        "id": "123"
    },
    "message": "测试 api 不需要登录"
}
```
访问 `http://localhost:3000/api/testAuth?id=123`
请求带token并且token正确
```
{
    "code": 0,
    "data": {
        "id": "123"
    },
    "message": "测试 api 需要登录"
}
```
token校验不正确
```
{
    "code": -1,
    "message": {
        "name": "JsonWebTokenError",
        "message": "invalid signature"
    }
}
```
请求不带token
```
{
    "code": -1,
    "message": "没有权限"
}
```
调用login接口`http://localhost:3000/api/login`
用户名: `reborn` 密码: `19931104`
登录成功
```
{
    "code": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYm9ybiIsImlkIjoxLCJpYXQiOjE1NDUwMzMzMzksImV4cCI6MTU0NTAzNjkzOX0.5siAKR5W3lPTnPJgPMENIi1LE1jRbXYGc4FKGhonJFc"
}
```




