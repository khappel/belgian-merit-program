// store.js
import { reactive } from 'vue'

export const store = reactive({
  /*count: 0,*/
  showData: [],
  /*increment() {
    this.count++
  }*/
  halterShowIndex: function (horseCount) {
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
  hitchShowIndex: function (horseCount) {
    switch (true) {
      case horseCount >= 31:
        return 7;
        break;
      case horseCount >= 26:
        return 6;
        break;
      case horseCount >= 21:
        return 5;
        break;
      case horseCount >= 16:
        return 4;
        break;
      case horseCount >= 11:
        return 3;
        break;
      case horseCount >= 6:
        return 2;
        break;
      default:
        return 1;
    }
  },
  sumTotalPoints: function (item, classType,horseCount) {
    if (classType !="Hitch" && classType != "Halter"){
      if (classType?.includes("Cart")){
        classType = "Hitch";
      }
    }

    if (classType == "Hitch"){
      return (item.placingPoints + (item.championshipPoints ?? 0)) * this.hitchShowIndex(horseCount);
    }
    else{
      return (item.placingPoints + (item.championshipPoints ?? 0)) * this.halterShowIndex(horseCount);
    }
    
},
  pointsSummary(itemClasses) {
    //let classType = "Halter";
    //let classString = itemClasses[0].class;

    //if (classString.includes("Cart")){
    //  classType = "Hitch";
    //}
    return itemClasses.reduce((partialSum, a) => partialSum + a.pointsTotal,0); //this.sumTotalPoints(a,classType,a.horseCount), 0);
  }
})