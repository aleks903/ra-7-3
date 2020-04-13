import React from 'react';
import moment from 'moment';
import './App.css';

function YearTable(props) {
  console.log('YearTable', props);
  console.log(moment(props.date).format('YYYY'));

  return (
    <div>
      <h2>Year Table</h2>
      <table>
        <tr>
          <th>Year</th>
          <th>Amount</th>
        </tr>
        {props.list.map(item => (
          <tr>
            <td>{item.year}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

function SortTable(props) {
  console.log('SortTable', props);

  return (
    <div>
      <h2>Sort Table</h2>
      <table>
        <tr>
          <th>Date</th>
          <th>Amount</th>
        </tr>
        {props.list.map(item => (
          <tr>
            <td>{item.date}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

function MonthTable(props) {
  console.log('MonthTable', props);

  return (
    <div>
      <h2>Month Table</h2>
      <table>
        <tr>
          <th>Month</th>
          <th>Amount</th>
        </tr>
        {props.list.map(item => (
          <tr>
            <td>{item.month}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

// TODO:
// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// const test = process.env.REACT_APP_URL;
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state
export default class App extends React.Component {
  state = {
    list: []
  };

  render() {
    const {list} = this.state;
    const HOCMonth = ChangeTable(MonthTable, 'month', 'MMM');
    const HOCYear = ChangeTable(YearTable, 'year', 'YYYY');
    const HOCSortTable = ChangeTable(SortTable, 'date', 'YYYY-MM-DD');

    return (
      <div id="app">
        {/* <MonthTable list={list} />
        <YearTable list={list} />
        <SortTable list={list} /> */}
        <HOCMonth list={list} />
        <HOCYear list={list} />
        <HOCSortTable list={list} />
      </div>
    );
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_URL)
      .then((resonse) => resonse.json())
      .then((result) => this.setState(result));
  }
}

function ChangeTable(Component, propName, formatDate){
  return class extends React.Component {
    render() {
      this.props.list.sort((a, b) => moment(a.date).diff(moment(b.date)));
      if (propName === 'date') {
        this.props.list.reverse();
      }

      const arrMap = new Map();
      this.props.list.forEach((item) => {
        const pName = moment(item.date).format(formatDate);
        const pAmount = item.amount;
        if (arrMap.has(pName)) {
          const sumAmount = arrMap.get(pName).amount + pAmount;
          arrMap.set(pName, {[propName]: pName, amount: sumAmount});
        } else {
          arrMap.set(pName, {[propName]: pName, amount: pAmount});
        }
      });

      const groupList = [];
      for (let item of arrMap.values()) {
        groupList.push(item);
      }

      return <Component list={groupList} />;
    }
  };
}
