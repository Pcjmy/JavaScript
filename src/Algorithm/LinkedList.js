// 定义一个节点类
class Node {
  constructor(data) {
    this.data = data; // 节点的数据
    this.next = null; // 指向下一个节点的指针
  }
}

// 定义一个链表类
class LinkedList {
  constructor() {
    this.head = null; // 链表的头节点
    this.length = 0; // 链表的长度
  }

  // 在链表尾部添加一个节点
  append(data) {
    // 创建一个新节点
    let newNode = new Node(data);
    // 如果链表为空，直接将头节点指向新节点
    if (this.length === 0) {
      this.head = newNode;
    } else {
      // 否则，从头节点开始遍历，找到最后一个节点
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      // 将最后一个节点的指针指向新节点
      current.next = newNode;
    }
    // 链表长度加一
    this.length++;
  }

  // 在链表指定位置插入一个节点
  insert(position, data) {
    // 判断位置是否合法
    if (position < 0 || position > this.length) {
      return false;
    }
    // 创建一个新节点
    let newNode = new Node(data);
    // 如果插入位置为0，即头部插入
    if (position === 0) {
      // 将新节点的指针指向原来的头节点
      newNode.next = this.head;
      // 将头节点更新为新节点
      this.head = newNode;
    } else {
      // 否则，从头节点开始遍历，找到插入位置的前一个节点
      let index = 0;
      let current = this.head;
      let previous = null;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      // 将前一个节点的指针指向新节点，将新节点的指针指向当前节点
      previous.next = newNode;
      newNode.next = current;
    }
    // 链表长度加一
    this.length++;
    return true;
  }

  // 在链表指定位置删除一个节点
  removeAt(position) {
    // 判断位置是否合法
    if (position < 0 || position >= this.length) {
      return null;
    }
    // 如果删除位置为0，即头部删除
    if (position === 0) {
      // 将头节点更新为原来头节点的下一个节点
      let oldHead = this.head;
      this.head = oldHead.next;
      // 返回被删除的数据
      return oldHead.data;
    } else {
      // 否则，从头节点开始遍历，找到删除位置的前一个节点和当前节点
      let index = 0;
      let current = this.head;
      let previous = null;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      // 将前一个节点的指针指向当前节点的下一个节点，断开当前节点的连接
      previous.next = current.next;
      // 返回被删除的数据
      return current.data;
    }
    // 链表长度减一
    this.length--;
  }

  // 在链表中查找一个数据，返回其位置，如果不存在返回-1
  indexOf(data) {
    // 从头节点开始遍历，记录索引值
    let index = 0;
    let current = this.head;
    while (current) {
      // 如果找到匹配的数据，返回索引值
      if (current.data === data) {
        return index;
      }
      // 否则，继续遍历下一个节点，索引值加一
      current = current.next;
      index++;
    }
    // 如果遍历完毕还没有找到匹配的数据，返回-1
    return -1;
  }

  // 在链表中修改一个数据，返回是否成功
  update(position, data) {
    // 判断位置是否合法
    if (position < 0 || position >= this.length) {
      return false;
    }
    // 从头节点开始遍历，找到修改位置的节点
    let index = 0;
    let current = this.head;
    while (index < position) {
      current = current.next;
      index++;
    }
    // 将节点的数据更新为新数据
    current.data = data;
    return true;
  }

  // 打印链表中的所有数据
  print() {
    // 从头节点开始遍历，将数据拼接成一个字符串
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data + " ";
      current = current.next;
    }
    // 打印结果
    console.log(result);
  }
}

// 创建一个链表实例
let list = new LinkedList();
// 在链表尾部添加一些数据
list.append(1);
list.append(2);
list.append(3);
list.append(4);
// 打印链表
list.print(); // 1 2 3 4
// 在链表头部插入一个数据
list.insert(0, 0);
// 打印链表
list.print(); // 0 1 2 3 4
// 在链表中间插入一个数据
list.insert(3, 5);
// 打印链表
list.print(); // 0 1 2 5 3 4
// 在链表头部删除一个数据
list.removeAt(0);
// 打印链表
list.print(); // 1 2 5 3 4
// 在链表中间删除一个数据
list.removeAt(2);
// 打印链表
list.print(); // 1 2 3 4
// 查找一个数据的位置
console.log(list.indexOf(3)); // 2
console.log(list.indexOf(6)); // -1
// 修改一个数据
list.update(1, 7);
// 打印链表
list.print(); // 1 7 3 4