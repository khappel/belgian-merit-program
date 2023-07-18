// store.js
import { reactive } from 'vue'

export const store = reactive({
  /*count: 0,*/
  showData: [],
  /*increment() {
    this.count++
  }*/
  showIndex: function (horseCount) {
    switch (true) {
      case horseCount >= 200:
        return 9;
        break;
      case horseCount >= 175:
        return 8;
        break;
      case horseCount >= 150:
        return 7;
        break;
      case horseCount >= 125:
        return 6;
        break;
      case horseCount >= 100:
        return 5;
        break;
      case horseCount >= 75:
        return 4;
        break;
      case horseCount >= 50:
        return 3;
        break;
      case horseCount >= 25:
        return 2;
        break;

      default:
        return 1;
    }
  },
  sumTotalPoints: function (item) {
    return (item.placingPoints + (item.championshipPoints ?? 0)) * this.showIndex(item.horseCount);
},
  pointsSummary(itemClasses) {
    return itemClasses.reduce((partialSum, a) => partialSum + this.sumTotalPoints(a), 0);
  }
})