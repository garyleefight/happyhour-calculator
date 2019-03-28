import config from './aws-exports';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import Caculator from './caculator';
import * as queries from './queries';

const budget = 150;
const people = 50;
const pts = 5;

Amplify.configure(config);
const caculator = new Caculator(budget, people, pts);
const setAllData = () => {
  API.graphql(graphqlOperation(queries.listItems)).then(result => {
    const products = result.data.listItems.items;
    let willBuyArray = [];
    let itemList = {};
    //First time cal
    for(let index in products) {
      const product = products[index];
      let result = caculator.calProduct(product);
      console.log(result);
      willBuyArray.push([result.id, result.price, result.itemWillBuy]);
      itemList[result.id] = result.itemToBuy;
    }
    //Cal remaining;
    console.log(itemList);
    console.log(caculator.useRemainingBudget(willBuyArray, itemList));
    console.log(caculator.remaining);
    console.log(caculator.moneyPerCredit);
  })
 };

 setAllData();