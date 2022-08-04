const data = {
    item1: 'aa',
    elements: ['one', 'two', 'three']
};
const test_list = [
    {
        text: 'aaa',
        color: 'pink'
    },
    {
        text: 'bbb',
        color: 'orange'
    },
    {
        text: 'ccc',
        color: 'yellow'
    }
];
let jsx =
    <View id="main">
        <ul className="list">
            <li className="item" style={{ background: 'blue', color: 'pink' }} onClick={() => alert(1)}>{data.item1}</li>
            {data.elements.map(item => <li className="item">{item}</li>)}
        </ul >
        <List id="list" textColor={'#00f'} list={test_list} />
    </View>;
render(jsx, document.getElementById('root'));



