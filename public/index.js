const data = {
  item1: 'aa',
  elements: ['one', 'two', 'three']
};
const test_list = [{
  text: 'aaa',
  color: 'pink'
}, {
  text: 'bbb',
  color: 'orange'
}, {
  text: 'ccc',
  color: 'yellow'
}];
let jsx = createElement(View, {
  id: "main"
}, createElement("ul", {
  className: "list"
}, createElement("li", {
  className: "item",
  style: {
    background: 'blue',
    color: 'pink'
  },
  onClick: () => alert(1)
}, data.item1), data.elements.map(item => createElement("li", {
  className: "item"
}, item))), createElement(List, {
  id: "list",
  textColor: '#00f',
  list: test_list
}));
render(jsx, document.getElementById('root'));