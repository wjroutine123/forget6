import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    AlignCenterOutlined,
    BulbOutlined,
    AuditOutlined,
    DeleteColumnOutlined,
    GlobalOutlined
  } from '@ant-design/icons';

  const menus = [
      {
          title:'首页',
          key:'/home',
          icons:DesktopOutlined,
          permission:[1,2,3]
      },
      {
          title:'用户管理',
          key:'/user-manage',
          icons:PieChartOutlined,
          permission:[3],
          children:[
              {
                title:'用户列表',
                key:'/user-manage/users',
                icons:PieChartOutlined,
                permission:[3],
              }
          ]
      },
      {
          title:'权限管理',
          key:'/rights-manage',
          icons:FileOutlined,
          permission:[3],
          children:[
              {
                title:'角色列表',
                key:'/rights-manage/roles',
                icons:FileOutlined,
                permission:[3]
              },
              {
                title:'权限列表',
                key:'/rights-manage/rights',
                icons:FileOutlined,
                permission:[3]
              },
          ]
      },
      {
          title:'电影信息',
          key:'/films-mange',
          icons:TeamOutlined,
          permission:[1,2,3],
          children:[
              {
                title:'广告插入',
                key:'/films-mange/swipers',
                icons:TeamOutlined,
                permission:[1,2,3],
              },
              {
                title:'上映电影',
                key:'/films-mange/oncoming',
                icons:TeamOutlined,
                permission:[1,2,3],
              },
              {
                title:'热映电影',
                key:'/films-mange/hot',
                icons:TeamOutlined,
                permission:[1,2,3],
              },
              {
                title:'电影详情',
                key:'/films-mange/moviedetail',
                icons:TeamOutlined,
                permission:[1,2,3],
              },
              {
                title:'影院信息',
                key:'/films-mange/movies',
                icons:TeamOutlined,
                permission:[2,3],
              },
              {
                title:'城市定位',
                key:'/films-mange/buliding',
                icons:TeamOutlined,
                permission:[2,3],
              }
          ]
      },
      {
        title:'app用户',
        key:'/desk-user',
        icons:AlignCenterOutlined,
        permission:[3],
        children:[
          {
            title:'用户数据',
            key:'/desk-user/toview',
            icons:AlignCenterOutlined,
            permission:[3],
          }
        ]
      },
      {
        title:'员工打卡',
        key:'/exployees-clock',
        icons:BulbOutlined,
        permission:[1,2,3],
        children:[
          {
            title:'打卡记录',
            key:'/exployees-clock/sign',
            icons:BulbOutlined,
            permission:[3],
          }
        ]
      },
      {
        title:'招聘人员',
        key:'/recruitment',
        icons:AuditOutlined,
        permission:[2,3],
        children:[
          {
            title:'发布信息',
            key:'/recruitment/release',
            icons:AuditOutlined,
            permission:[2,3],
          }
        ]
      },
      {
        title:'员工请假',
        key:'/exployees-askleave',
        icons:DeleteColumnOutlined,
        permission:[1,2,3],
        children:[
          {
            title:'请假管理',
            key:'/exployees-askleave/mangement',
            icons:DeleteColumnOutlined,
            permission:[2,3],
          }
        ]
      },
      {
        title:'考勤管理',
        key:'/atten-mange',
        icons:GlobalOutlined,
        permission:[1,2,3],
        children:[
          {
            title:'签到人员',
            key:'/atten-mange/records',
            icons:GlobalOutlined,
            permission:[1,2,3],
          },
          {
            title:'请假人员',
            key:'/atten-mange/askleave',
            icons:GlobalOutlined,
            permission:[2,3],
          }
        ]
      }
  ]
  export default menus