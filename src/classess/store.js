// store.js
import { reactive } from 'vue'
import { Dropbox } from 'dropbox';
import { showViewData } from '../classess/showResults.js'

export const store = reactive({
  /*count: 0,*/
  showData: [],
  youthShowData: [],
  hitchShowData: [],
  showListData: [],
  halterClassListData: [],
  hitchClassListData: [],
  youthClassListData: [],
  halterShowYears: [],
  hitchShowYears: [],
  youthShowYears: [],
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
  async getShowDef() {

    if (Object.keys(store.ACCESS_TOKEN).length === 0) {
      store.getAccessToken();
    }

    var dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });

    dbx.filesDownload({ path: '/Definition Files/Shows.json' })
      .then(function (response) {
        var blob = response.result.fileBlob;
        var reader = new FileReader();

        reader.addEventListener("loadend", function () {
          //clean up shows
          store.showListData = JSON.parse(reader.result);
        });

        if (blob != undefined) {
          reader.readAsText(blob);
        }


      })
      .catch(function (error) {
      })


  },
  async getHitchClassDef() {
    if (Object.keys(store.ACCESS_TOKEN).length === 0) {
      store.getAccessToken();
    }

    var dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });

    dbx.filesDownload({ path: '/Definition Files/HitchClasses.json' })
      .then(function (response) {
        var blob = response.result.fileBlob;
        var reader = new FileReader();

        reader.addEventListener("loadend", function () {
          //clean up shows
          store.hitchClassListData = JSON.parse(reader.result);
        });

        if (blob != undefined) {
          reader.readAsText(blob);
        }


      })
      .catch(function (error) {
      })
  },
  async getHalterClassDef() {
    if (Object.keys(store.ACCESS_TOKEN).length === 0) {
      store.getAccessToken();
    }

    var dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });

    dbx.filesDownload({ path: '/Definition Files/Classes.json' })
      .then(function (response) {
        var blob = response.result.fileBlob;
        var reader = new FileReader();

        reader.addEventListener("loadend", function () {
          //clean up shows
          store.halterClassListData = JSON.parse(reader.result);
        });

        if (blob != undefined) {
          reader.readAsText(blob);
        }


      })
      .catch(function (error) {
      })
  },
  async getYouthClassDef() {
    if (Object.keys(store.ACCESS_TOKEN).length === 0) {
      store.getAccessToken();
    }

    var dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });

    dbx.filesDownload({ path: '/Definition Files/YouthClasses.json' })
      .then(function (response) {
        var blob = response.result.fileBlob;
        var reader = new FileReader();

        reader.addEventListener("loadend", function () {
          //clean up shows
          store.youthClassListData = JSON.parse(reader.result);
        });

        if (blob != undefined) {
          reader.readAsText(blob);
        }


      })
      .catch(function (error) {
      })
  },
  async getShowFiles(show) {  // fileYearsRef, defaultFileSelectedRef) {
    if (Object.keys(store.ACCESS_TOKEN).length === 0) {
      await store.getAccessToken();
    }

    if (Object.keys(store.ACCESS_TOKEN).length > 0) {
      const dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });

      let pathString = '';
      switch (show) {
        case "Halter":
          pathString = '/Master Files';
          break;
        case "Hitch":
          pathString = '/Hitch Master Files';
          break;
        case "Youth":
          pathString = '/Youth Master Files';
          break;
      }

      try {
        const response = await dbx.filesListFolder({ path: pathString });

        const fileYearEntries = response.result.entries.map(entry => ({
          year: entry.name.replace(".json", ""),
          file: entry.id
        }));

        fileYearEntries.sort((a, b) => b.year.localeCompare(a.year));

        if (fileYearEntries.length > 0) {
          this.defaultFileSelected = fileYearEntries[0];
          this.downloadFile(show, this.defaultFileSelected.file);
          return fileYearEntries;




          // this.changeView(); // Uncomment if needed
        }
      } catch (err) {
        console.error("Dropbox error:", err);
      }
    }
  },
  async getShowFilesDEP(show, fileYears, defaultFileSelected) {
    if (Object.keys(store.ACCESS_TOKEN).length === 0) {
      await store.getAccessToken();
    }

    if (Object.keys(store.ACCESS_TOKEN).length > 0) {
      var dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });
      var pathString;
      var fileYearEntries;

      switch (show) {
        case "Halter":
          pathString = '/Master Files';
          break;
        case "Hitch":
          pathString = '/Hitch Master Files';
          break;
        case "Youth":
          pathString = '/Youth Master Files';
          break;
      }

      dbx.filesListFolder({ path: pathString })
        .then((response) => {

          fileYearEntries = response.result.entries.map(entry => ({
            year: entry.name.replace(".json", ""),
            file: entry.id
          }));
          //response.result.entries.forEach(entry => {
          //  fileYearEntries.push({
          //    year: entry.name.replace(".json", ""), // use replace instead of trim
          //    file: entry.id
          //  })

          // Sort in descending order by year
          fileYearEntries.sort((a, b) => {
            if (a.year < b.year) return 1;
            if (a.year > b.year) return -1;
            return 0;
          });

          if (fileYearEntries.length > 0) {
            fileYears = fileYearEntries;

            defaultFileSelected = fileYears[0];
            this.downloadFile(show, defaultFileSelected.file);
            //this.changeView();
          }
        })
        .catch((err) => {
          console.log(err);
        });

    }
  },
  async downloadFile(show, filePath, clean = true) {
    if (Object.keys(store.ACCESS_TOKEN).length === 0) {
      await store.getAccessToken(); // if async
    }

    const dbx = new Dropbox({ accessToken: store.ACCESS_TOKEN.access_token });

    try {
      const response = await dbx.filesDownload({ path: filePath });
      const blob = response.result.fileBlob;

      if (!blob) throw new Error("No file blob returned");

      const fileText = await this.readBlobAsText(blob);
      const parsedData = JSON.parse(fileText);
      const viewData = new showViewData(parsedData);

      switch (show) {
        case "Halter":
          if (clean == false) {
            store.showData = viewData.data;
          }
          else {
            store.showData = viewData.CleanupShowData();
          }

          break;
        case "Hitch":
          if (clean == false) {
            store.hitchShowData = viewData.data;
          }
          else {
            store.hitchShowData = viewData.CleanupHitchShowData();
          }
          break;
        case "Youth":
          if (clean == false) {
            store.youthShowData = viewData.data;
          }
          else {
            store.youthShowData = viewData.CleanupYouthShowData();
          }
          break;
      }

      return true; // ✅ resolve when done
    } catch (error) {
      console.error("Download or read failed:", error);
      throw error;
    }
  },
  readBlobAsText(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  },
  halterShowIndex: function (horseCount) {
    switch (true) {
      case horseCount > 200:
        return 9;
        break;
      case horseCount >= 176:
        return 8;
        break;
      case horseCount >= 151:
        return 7;
        break;
      case horseCount >= 126:
        return 6;
        break;
      case horseCount >= 101:
        return 5;
        break;
      case horseCount >= 76:
        return 4;
        break;
      case horseCount >= 51:
        return 3;
        break;
      case horseCount >= 26:
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
      case horseCount >= 19:
        return 5;
        break;
      case horseCount >= 13:
        return 4;
        break;
      case horseCount >= 8:
        return 3;
        break;
      case horseCount >= 4:
        return 2;
        break;
      default:
        return 1;
    }
  },
  ridingClassShowIndex: function (horseCount) {
    switch (true) {
      case horseCount >= 31:
        return 9;
        break;
      case horseCount >= 26:
        return 6;
        break;
      case horseCount >= 19:
        return 5;
        break;
      case horseCount >= 13:
        return 4;
        break;
      case horseCount >= 8:
        return 3;
        break;
      case horseCount >= 4:
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
  cartShowIndex: function (horseCount) {
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
  sumTotalPoints: function (item, classType, itemClass, itemCount) {
    if (classType != "Hitch" && classType != "Halter") {
      if (classType?.includes("Cart") && classType != "Youth") {
        classType = "Hitch";
      }
    }

    var champPoints = item.championshipPoints * 1;
    var placePoints = item.placingPoints * 1;

    if (classType == "Hitch") {
      if (itemClass == "English Riding" || itemClass == "Western Riding") {
        return (placePoints + (champPoints ?? 0)) * this.ridingClassShowIndex(itemCount);
      }
      else if (itemClass == "Mare Cart" || itemClass == "Gelding Cart") {
        return (placePoints + (champPoints ?? 0)) * this.cartShowIndex(itemCount);
      }
      else {
        return (placePoints + (champPoints ?? 0)) * this.hitchShowIndex(itemCount);
      }

    }
    else if (classType == "Youth" || classType == "YouthDecorating") {
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