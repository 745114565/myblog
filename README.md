# myblog
the demo use node web framework express

## 下载并启动项目 ##

* 下载项目
      
   采用git clone 或其他方式下载项目
   
* 安装依赖

  进入项目根目录myblog,运行 npm install 安装package.json中的依赖包
  
* 启动项目

   * 安装supervisor
   
    运行命令 npm install -g supervisor
    
   * 启动项目 
   
    运行命令：supervisor --harmony index 
    
    
    --简单的：可以直接 node index.js启动
    
 * 准备
      <br/>
>     *本项目数据库使用的是mongoDB，数据库配置见项目config目录下default.js文件中的<br/>
>   mongodb:'mongodb://myblog:123456@localhost:27017/myblog'配置。<br/>
>              'mongodb://用户名:密码@数据库地址:端口/数据库<br/>
>   请按照自己的需求自己配置。<br/>
      * 项目由nodejs开发，需安装nodeJs。
