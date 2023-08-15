import { store } from '../classess/store.js'

export class showViewData {
    constructor(showJSON) {
        this.showJSON = showJSON;
        //this.shows = this.GetShowsData();
    }
    GetShowsData() {
        let itemShows = new Map();

        for (var i = 0; i < this.showJSON.length; i++) {
            let showItem = new showResults();
            showItem = this.showJSON[i];
            itemShows.set(showItem.show, showItem);
        }


        return itemShows;
    }
    CleanupShowData() {
        //let shows = [];

        if (this.showJSON.year != undefined) {
            this.showJSON = this.showJSON.shows;
        }

        for (var i = this.showJSON.length - 1; i >= 0; i--) {
            //let showItem = new showResults();
            //showItem = this.showJSON[i];
            for (var c = this.showJSON[i].classes.length - 1; c >= 0; c--) {
                //let clsItem = new classes();
                //clsItem =  this.showJSON[i].classes[c];

                for (var p = this.showJSON[i].classes[c].placings.length - 1; p >= 0; p--) {
                    //let placeItem = new placings();
                    //placeItem = this.showJSON[i].classes[c].placings[p];
                    if (this.showJSON[i].classes[c].placings[p].registrationNumber == '' && this.showJSON[i].classes[c].placings[p].horseName == '') {
                        //remove
                        this.showJSON[i].classes[c].placings.splice(p, 1);
                    }
                    else {
                        if (!this.showJSON[i].classes[c].placings[p].registrationNumber) {
                            if(!this.showJSON[i].classes[c].placings[p].horseName){
                                this.showJSON[i].classes[c].placings[p].registrationNumber =
                                "Pending (" + this.showJSON[i].classes[c].placings[p].owner + ")"
                            }
                            else{
                                this.showJSON[i].classes[c].placings[p].registrationNumber =
                                "Pending (" + this.showJSON[i].classes[c].placings[p].horseName + ")"
                            }
                        }
                        if (this.showJSON[i].classes[c].placings[p].registrationNumber.toLowerCase() == 'pending') {
                            if(!this.showJSON[i].classes[c].placings[p].horseName){
                                this.showJSON[i].classes[c].placings[p].registrationNumber =
                                this.showJSON[i].classes[c].placings[p].registrationNumber + "(" + this.showJSON[i].classes[c].placings[p].owner + ")"
                            }
                            else{
                                this.showJSON[i].classes[c].placings[p].registrationNumber =
                                this.showJSON[i].classes[c].placings[p].registrationNumber + "(" + this.showJSON[i].classes[c].placings[p].horseName + ")"
                            }
                        }
                        
                        this.showJSON[i].classes[c].placings[p].pointsTotal = store.sumTotalPoints(
                            this.showJSON[i].classes[c].placings[p],
                            this.showJSON[i].classes[c].classType,
                            this.showJSON[i].halterHorseCount
                        )

                    }
                    if (this.showJSON[i].classes[c].placings.length == 0) {
                        //remove class
                        this.showJSON[i].classes.splice(c, 1);
                    }
                }
            }
        }

        return this.showJSON;
    }

    ReturnHorseResults() {
        let itemHorses = new Map();

        for (var i = 0; i < this.showJSON.length; i++) {
            let showItem = new showResults();
            showItem = this.showJSON[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (itemHorses.has(placeItem.registrationNumber)) {
                        var foundHorse = itemHorses.get(placeItem.registrationNumber);

                        foundHorse.shows.push({
                            "show": showItem.show,
                            "horseCount": showItem.halterHorseCount,
                            "class": clsItem.class,
                            "placing": placeItem.placing,
                            "championshipPoints": placeItem.championshipPoints,
                            "placingPoints": placeItem.placingPoints,
                            "pointsTotal": placeItem.pointsTotal
                        })
                    }
                    else {
                        var newHorse = {
                            "registrationNumber": placeItem.registrationNumber,
                            "horseName": placeItem.horseName,
                            "owner": placeItem.owner,
                            "sire": placeItem.sire,
                            "dam": placeItem.dam,
                            "showTotals": 0,
                            "shows": [{
                                "show": showItem.show,
                                "horseCount": showItem.halterHorseCount,
                                "class": clsItem.class,
                                "placing": placeItem.placing,
                                "championshipPoints": placeItem.championshipPoints,
                                "placingPoints": placeItem.placingPoints,
                                "pointsTotal": placeItem.pointsTotal
                            }]
                        };
                        itemHorses.set(placeItem.registrationNumber, newHorse)
                    }
                }
            }
        }

        itemHorses.forEach(h => h.showTotals = store.pointsSummary(h.shows));

        return itemHorses;

    }
    ReturnSireResults() {
        let itemHorses = new Map();

        for (var i = 0; i < this.showJSON.length; i++) {
            let showItem = new showResults();
            showItem = this.showJSON[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (placeItem.sire) {
                        if (itemHorses.has(placeItem.sire)) {
                            var foundHorse = itemHorses.get(placeItem.sire);

                            foundHorse.shows.push({
                                "show": showItem.show,
                                "horseCount": showItem.horseCount,
                                "class": clsItem.class,
                                "registrationNumber": placeItem.registrationNumber,
                                "horseName": placeItem.horseName,
                                "owner": placeItem.owner,
                                "dam": placeItem.dam,
                                "placing": placeItem.placing,
                                "championshipPoints": placeItem.championshipPoints,
                                "placingPoints": placeItem.placingPoints,
                                "pointsTotal": placeItem.pointsTotal
                            })
                        }
                        else {
                            var newHorse = {
                                "sire": placeItem.sire,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "horseCount": showItem.horseCount,
                                    "class": clsItem.class,
                                    "registrationNumber": placeItem.registrationNumber,
                                    "horseName": placeItem.horseName,
                                    "owner": placeItem.owner,
                                    "dam": placeItem.dam,
                                    "placing": placeItem.placing,
                                    "championshipPoints": placeItem.championshipPoints,
                                    "placingPoints": placeItem.placingPoints,
                                    "pointsTotal": placeItem.pointsTotal
                                }]
                            };

                            itemHorses.set(placeItem.sire, newHorse)
                        }
                    }

                }
            }
        }

        itemHorses.forEach(h => h.showTotals = store.pointsSummary(h.shows));
        return itemHorses;

    }
    ReturnDamResults() {
        let itemHorses = new Map();

        for (var i = 0; i < this.showJSON.length; i++) {
            let showItem = new showResults();
            showItem = this.showJSON[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];
                    if (placeItem.dam) {
                        if (itemHorses.has(placeItem.dam)) {
                            var foundHorse = itemHorses.get(placeItem.dam);

                            foundHorse.shows.push({
                                "show": showItem.show,
                                "horseCount": showItem.horseCount,
                                "class": clsItem.class,
                                "registrationNumber": placeItem.registrationNumber,
                                "horseName": placeItem.horseName,
                                "owner": placeItem.owner,
                                "sire": placeItem.sire,
                                "placing": placeItem.placing,
                                "championshipPoints": placeItem.championshipPoints,
                                "placingPoints": placeItem.placingPoints,
                                "pointsTotal": placeItem.pointsTotal
                            })
                        }
                        else {
                            var newHorse = {
                                "dam": placeItem.dam,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "horseCount": showItem.horseCount,
                                    "class": clsItem.class,
                                    "registrationNumber": placeItem.registrationNumber,
                                    "horseName": placeItem.horseName,
                                    "owner": placeItem.owner,
                                    "sire": placeItem.sire,
                                    "placing": placeItem.placing,
                                    "championshipPoints": placeItem.championshipPoints,
                                    "placingPoints": placeItem.placingPoints,
                                    "pointsTotal": placeItem.pointsTotal
                                }]
                            };

                            itemHorses.set(placeItem.dam, newHorse)
                        }
                    }


                }
            }
        }

        itemHorses.forEach(h => h.showTotals = store.pointsSummary(h.shows));
        return itemHorses;

    }
    ReturnOwnerResults() {
        let itemOwners = new Map();

        for (var i = 0; i < this.showJSON.length; i++) {
            let showItem = new showResults();
            showItem = this.showJSON[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (itemOwners.has(placeItem.owner)) {
                        var foundOwner = itemOwners.get(placeItem.owner);

                        foundOwner.shows.push({
                            "show": showItem.show,
                            "horseCount": showItem.horseCount,
                            "class": clsItem.class,
                            "registrationNumber": placeItem.registrationNumber,
                            "horseName": placeItem.horseName,
                            "sire": placeItem.sire,
                            "dam": placeItem.dam,
                            "placing": placeItem.placing,
                            "championshipPoints": placeItem.championshipPoints,
                            "placingPoints": placeItem.placingPoints,
                            "pointsTotal": placeItem.pointsTotal
                        })
                    }
                    else {
                        var newOwner = {
                            "owner": placeItem.owner,
                            "showTotals": 0,
                            "shows": [{
                                "show": showItem.show,
                                "horseCount": showItem.horseCount,
                                "class": clsItem.class,
                                "registrationNumber": placeItem.registrationNumber,
                                "horseName": placeItem.horseName,
                                "sire": placeItem.sire,
                                "dam": placeItem.dam,
                                "placing": placeItem.placing,
                                "championshipPoints": placeItem.championshipPoints,
                                "placingPoints": placeItem.placingPoints,
                                "pointsTotal": placeItem.pointsTotal
                            }]
                        };

                        itemOwners.set(placeItem.owner, newOwner)
                    }
                }
            }
        }

        itemOwners.forEach(h => h.showTotals = store.pointsSummary(h.shows));
        return itemOwners;

    }
    ReturnClassResults() {
        let itemClasses = new Map();

        for (var i = 0; i < this.showJSON.length; i++) {
            let showItem = new showResults();
            showItem = this.showJSON[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (itemClasses.has(clsItem.class)) {
                        var foundClass = itemClasses.get(clsItem.class);

                        const foundHorse = foundClass.horses.find(({ registrationNumber, horseName }) =>
                            registrationNumber === placeItem.registrationNumber && horseName === placeItem.horseName)
                        //if (foundClass.has(placeItem.registrationNumber)) 
                        if (foundHorse) {
                            //var foundHorse = placeItem.get(placeItem.registrationNumber)
                            foundHorse.shows.push({
                                "show": showItem.show,
                                "horseCount": showItem.halterHorseCount,
                                "class": clsItem.class,
                                "classCount": clsItem.classCount,
                                "placing": placeItem.placing,
                                "championshipPoints": placeItem.championshipPoints,
                                "placingPoints": placeItem.placingPoints,
                                "pointsTotal": placeItem.pointsTotal
                            })
                        }
                        else {
                            foundClass.classCount += 1
                            foundClass.horses.push({
                                "registrationNumber": placeItem.registrationNumber,
                                "horseName": placeItem.horseName,
                                "owner": placeItem.owner,
                                "sire": placeItem.sire,
                                "dam": placeItem.dam,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "horseCount": showItem.halterHorseCount,
                                    "class": clsItem.class,
                                    "classCount": clsItem.classCount,
                                    "placing": placeItem.placing,
                                    "championshipPoints": placeItem.championshipPoints,
                                    "placingPoints": placeItem.placingPoints,
                                    "pointsTotal": placeItem.pointsTotal
                                }]

                            })
                        }
                    }
                    else {
                        var newClass = {
                            "class": clsItem.class,
                            "classCount": 1,
                            "horses": [{
                                "registrationNumber": placeItem.registrationNumber,
                                "horseName": placeItem.horseName,
                                "owner": placeItem.owner,
                                "sire": placeItem.sire,
                                "dam": placeItem.dam,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "horseCount": showItem.horseCount,
                                    "class": clsItem.class,
                                    "classCount": clsItem.classCount,
                                    "placing": placeItem.placing,
                                    "championshipPoints": placeItem.championshipPoints,
                                    "placingPoints": placeItem.placingPoints,
                                    "pointsTotal": placeItem.pointsTotal
                                }]
                            }]
                        };
                        itemClasses.set(clsItem.class, newClass)
                    }
                }
            }
        }

        itemClasses.forEach(c => c.horses.forEach(h => h.showTotals = store.pointsSummary(h.shows)));
        return itemClasses;

    }
}

class showResults {
    constructor(show, horseCount, classes) {
        this.show = show;
        this.horseCount = horseCount;
        this.classes = classes;
    }
}

class classes {
    constructor(_class, placings) {
        this._class = _class;
        this.placings = placings;
    }
}

class placings {
    constructor(placing, registrationNumber, horseName, owner, sire, dam, championshipPoints, placingPoints) {
        this.placing = placing;
        this.registrationNumber = registrationNumber;
        this.horseName = horseName;
        this.owner = owner;
        this.sire = sire;
        this.dam = dam;
        this.championshipPoints = championshipPoints;
        this.placingPoints = placingPoints;
        this.placingTotal = this.PlacingTotal;
    }
    PlacingTotal() {
        return (this.placingPoints * ShowIndex(4)) + this.championshipPoints;
    }
}