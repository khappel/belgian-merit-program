// store.js
import { reactive } from 'vue'

export const store = reactive({
  /*count: 0,*/
  showData: [],
  youthShowData: [],
  hitchShowData: [],
  ACCESS_TOKEN: {},
  /*increment() {
    this.count++
  }*/
  /*async getAccessToken() {
    const REFRESH_TOKEN = "qUeWkhRi2LkAAAAAAAAAAYOQK2eHCE3MZX3EIFoM9x4WxnglJcoHj7I_e-Z4Jkc1";
    const CI = "54g6f5g8af25kk4";
    const CS = "09b2xez7yiy40uj";*/
    async getAccessToken() {
      const REFRESH_TOKEN = "o1chJiRKhNEAAAAAAAAAAR731QCUZWqjdMj2mAcbKsTLw8W02Vcr6-XKh-YMy7fj";
      const CI = "p81l8agjkz0mxbz";
      const CS = "v9l639z4bv9qsp4";
    

    //await fetch("https://api.dropbox.com/oauth2/token?refresh_token=qUeWkhRi2LkAAAAAAAAAAYOQK2eHCE3MZX3EIFoM9x4WxnglJcoHj7I_e-Z4Jkc1&grant_type=refresh_token&client_id=54g6f5g8af25kk4&client_secret=09b2xez7yiy40uj", {
      await fetch("https://api.dropbox.com/oauth2/token?refresh_token=o1chJiRKhNEAAAAAAAAAAR731QCUZWqjdMj2mAcbKsTLw8W02Vcr6-XKh-YMy7fj&grant_type=refresh_token&client_id=p81l8agjkz0mxbz&client_secret=v9l639z4bv9qsp4", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.status === 404) {
          throw new Error('404 (Not Found)');
        } else {
          return response.json().then((json) => {
            console.log('save poster response: ', json);
            this.ACCESS_TOKEN = json;
          });
        }
      });

    /*axios.get("https://api.dropbox.com/oauth2/token", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'text/plain; charset=dropbox-cors-hack'
        },
        params: {

            refresh_token: REFRESH_TOKEN,
            grant_type: "refresh_token",
            client_id: CI,
            client_secret: CS,
        },
    })
        .then((response) => { this.ACCESS_TOKEN = response.data })*/


  },
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
  youthShowIndex: function (youthCount) {
    switch (true) {
      case youthCount >= 17:
        return 9;
        break;
      case youthCount >= 15:
        return 8;
        break;
      case youthCount >= 13:
        return 7;
        break;
      case youthCount >= 11:
        return 6;
        break;
      case youthCount >= 9:
        return 5;
        break;
      case youthCount >= 7:
        return 4;
        break;
      case youthCount >= 5:
        return 3;
        break;
      case youthCount >= 3:
        return 2;
        break;
      default:
        return 1;
    }
  },
  sumTotalPoints: function (item, classType, itemCount) {
    if (classType != "Hitch" && classType != "Halter") {
      if (classType?.includes("Cart") && classType != "Youth") {
        classType = "Hitch";
      }
    }
  
    var champPoints = item.championshipPoints*1;
    var placePoints = item.placingPoints*1;
    
    if (classType == "Hitch") {
      return (placePoints + (champPoints ?? 0)) * this.hitchShowIndex(itemCount);
    }
    else if (classType == "Youth" || classType == "YouthDecorating"){
      //if(classType == "YouthDecorating"){
      //  placePoints = placePoints * 2;
      //}

      return (placePoints + (champPoints ?? 0)) * this.youthShowIndex(itemCount);
    }
    else {
      return (placePoints + (champPoints ?? 0)) * this.halterShowIndex(itemCount);
    }

  },
  pointsSummary(itemClasses) {
    //let classType = "Halter";
    //let classString = itemClasses[0].class;

    //if (classString.includes("Cart")){
    //  classType = "Hitch";
    //}
    return itemClasses.reduce((partialSum, a) => partialSum + a.pointsTotal, 0); //this.sumTotalPoints(a,classType,a.horseCount), 0);
  }
})