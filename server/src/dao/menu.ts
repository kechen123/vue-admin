import BaseDao from "../db/baseDao";
// const menu = [
//   {
//     name: "首页",
//     path: "/",
//     icon: "House",
//     disabled: false,
//   },
//   {
//     name: "基础表格",
//     icon: "TakeawayBox",
//     path: "/table_demo/base/",
//   },
//   {
//     name: "左侧栏目表格",
//     icon: "Wallet",
//     path: "/table_demo/aside/",
//   },
//   {
//     name: "组件",
//     path: "/component",
//     icon: "Memo",
//     children: [
//       {
//         name: "表格示例",
//         icon: "Tickets",
//         path: "/table_demo/default",
//       },
//       {
//         name: "表格",
//         icon: "Tickets",
//         path: "/table",
//       },
//       {
//         name: "上传",
//         icon: "Upload",
//         path: "/upload",
//       },
//     ],
//   },
//   {
//     name: "多级菜单",
//     path: "/rr",
//     icon: "Paperclip",
//     disabled: false,
//     children: [
//       {
//         name: "一级菜单1",
//         path: "/menu",
//         icon: "Discount",
//       },
//       {
//         name: "一级菜单2",
//         path: "/navigator-one/item-two",
//       },
//       {
//         name: "一级菜单3",
//         path: "/navigator-one/item-three",
//       },
//       {
//         name: "一级菜单4",
//         path: "/navigator-one/item-four",
//         children: [
//           {
//             name: "二级菜单1",
//             path: "/navigator-one/item-four/item-one",
//           },
//         ],
//       },
//     ],
//   },

//   {
//     name: "关于",
//     path: "/about",
//     icon: "Coffee",
//   },
// ];

/**
 * 将列表转换为树结构
 * @param list 列表
 * @returns 树结构
 */

const sortTree = (nodes) => {
  nodes.sort((a, b) => a.order_num - b.order_num);
  nodes.forEach((node) => {
    if (node.children && node.children.length > 0) {
      sortTree(node.children);
    }
  });
};

const listToTree = (list) => {
  const map = {};
  const result = [];

  // 先把所有节点挂到map上
  list.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // 再组装树结构
  list.forEach((item) => {
    if (item.parent_id === "0") {
      result.push(map[item.id]);
    } else if (map[item.parent_id]) {
      map[item.parent_id].children.push(map[item.id]);
    }
  });

  // 递归对子节点排序
  sortTree(result);

  return result;
};

export default class Auth extends BaseDao {
  constructor(table: string) {
    super(table);
  }
  async create(params, fields = [], session = { userid: "" }): Promise<any> {
    if (
      !params ||
      (typeof params === "object" && Object.keys(params).length === 0)
    ) {
      params = undefined;
    }
    const menu = await new BaseDao("sys_menu").retrieve(
      params,
      fields,
      session
    );
    const tree = listToTree(menu.data);
    return G.jsResponse(G.STCODES.SUCCESS, "", { data: tree });
  }
}
