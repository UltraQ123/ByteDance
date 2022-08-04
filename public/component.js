const ListAdd = {
  list: [],

  //订阅
  subscribe(func) {
    this.list.push(func);
  },

  //发布
  publish(arg) {
    this.list.forEach(func => {
      func && func(arg);
    });
  }

};
const ListDel = {
  list: [],

  //订阅
  subscribe(func) {
    this.list.push(func);
  },

  //发布
  publish(arg) {
    this.list.forEach(func => {
      func && func(arg);
    });
  }

};

function Item(props) {
  return createElement("li", {
    className: "item",
    style: props.style
  }, " ", props.children, " ", createElement("a", {
    href: "#",
    onClick: props.onRemoveItem
  }, " X "));
}

class View extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return createElement("div", {
      className: "view",
      style: this.props.style
    }, " ", this.props.children);
  }

}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };

    if (this.props.list) {
      this.state = {
        list: [...this.props.list]
      };
    }

    ListAdd.subscribe(this.handleAdd.bind(this));
    ListDel.subscribe(this.handleItemRemove.bind(this));
  }

  handleItemRemove(edata) {
    this.setState({
      list: this.state.list.filter((item, i) => i !== edata["index"])
    });
  }

  handleAdd(edata) {
    this.setState({
      list: [...this.state.list, {
        text: edata["value"]
      }]
    });
  }

  render() {
    return createElement("div", null, createElement("ul", {
      className: "list"
    }, this.state.list.map((item, index) => {
      return createElement(Item, {
        style: {
          background: item.color,
          color: this.props.textColor
        },
        onRemoveItem: () => {
          let tmp = {
            listdel: this.props.id,
            index: index
          };
          logicWorker.postMessage(JSON.stringify(tmp));
        }
      }, item.text);
    })), createElement("div", null, createElement("input", {
      ref: ele => {
        this.ref = ele;
      }
    }), createElement("button", {
      onclick: () => {
        let tmp = {
          listadd: this.props.id,
          value: this.ref.value
        };
        logicWorker.postMessage(JSON.stringify(tmp));
      }
    }, "Add")));
  }

}

var logicWorker;

if (typeof Worker !== "undefined") {
  if (typeof logicWorker == "undefined") {
    logicWorker = new Worker("logic.js");
  }

  logicWorker.onmessage = e => {
    var edata = JSON.parse(e.data);

    if ("listdel" in edata) {
      ListDel.publish(edata);
    }

    if ("listadd" in edata) {
      ListAdd.publish(edata);
    }
  };
} else {
  alert("错误：你的浏览器不支持WebWorker");
}