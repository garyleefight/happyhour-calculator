class Caculator {

    constructor(budget, peoples, pts) {
        this.budget = budget;
        this.peoples = peoples;
        this.pts = pts;
        this.remaining = budget;
        this.moneyPerCredit = (this.budget + 0.0)/(this.peoples * this.pts + 0.0);
    }

    calProduct(product) {
        const price = product.price;
        const id = product.id;
        let totalCredit = 0;
        const items = product.CreditLogs.items;
        for (let index in items) {
            totalCredit += items[index].creditChange;
        }

        const itemToBuy = Math.floor(totalCredit*this.moneyPerCredit / price);
        const itemWillBuy = (totalCredit*this.moneyPerCredit - itemToBuy*price) / (price + 0.0);
        this.remaining -= (totalCredit*this.moneyPerCredit);
        return {
            itemToBuy,
            itemWillBuy,
            id,
            price
        };
    }

    // ['link', 'price','number']
    useRemainingBudget(itemWillBuyList, itemWillBuyObject) {
        itemWillBuyList.sort ( (a, b) => {
            return b[1] - a[1];
        });
        for (let index in itemWillBuyList) {
            const price = itemWillBuyList[index][1];
            const link = itemWillBuyList[index][0];
            if (this.remaining - price < 0) {
                console.log('in');
                console.log(this.remaining);
                continue;
            } 
            this.remaining -= price;
            itemWillBuyObject[link] = itemWillBuyObject[link] ? itemWillBuyObject[link] + 1: 1;
        }
        return itemWillBuyObject;
    };
}

export default Caculator;