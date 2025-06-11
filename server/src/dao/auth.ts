import BaseDao from "../db/baseDao";
const menu = [
  {
    name: "首页",
    path: "/",
    icon: "House",
    disabled: false,
  },
  {
    name: "基础表格",
    icon: "TakeawayBox",
    path: "/table_demo/base/",
  },
  {
    name: "左侧栏目表格",
    icon: "Wallet",
    path: "/table_demo/aside/",
  },
  {
    name: "组件",
    path: "/component",
    icon: "Memo",
    children: [
      {
        name: "表格示例",
        icon: "Tickets",
        path: "/table_demo/default",
      },
      {
        name: "表格",
        icon: "Tickets",
        path: "/table",
      },
      {
        name: "上传",
        icon: "Upload",
        path: "/upload",
      },
    ],
  },
  {
    name: "多级菜单",
    path: "/rr",
    icon: "Paperclip",
    disabled: false,
    children: [
      {
        name: "一级菜单1",
        path: "/menu",
        icon: "Discount",
      },
      {
        name: "一级菜单2",
        path: "/navigator-one/item-two",
      },
      {
        name: "一级菜单3",
        path: "/navigator-one/item-three",
      },
      {
        name: "一级菜单4",
        path: "/navigator-one/item-four",
        children: [
          {
            name: "二级菜单1",
            path: "/navigator-one/item-four/item-one",
          },
        ],
      },
    ],
  },

  {
    name: "关于",
    path: "/about",
    icon: "Coffee",
  },
];

export default class Auth extends BaseDao {
  constructor(table: string) {
    super(table);
  }
  async create(
    params = {},
    fields = [],
    session = { userid: "" }
  ): Promise<any> {
    return G.jsResponse(G.STCODES.SUCCESS, "", { data: menu });
  }
}
