
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
                            "horseCount": showItem.horseCount,
                            "class": clsItem.class,
                            "placing": placeItem.placing,
                            "championshipPoints": placeItem.championshipPoints,
                            "placingPoints": placeItem.placingPoints
                        })
                    }
                    else {
                        var newHorse = {
                            "registrationNumber": placeItem.registrationNumber,
                            "horseName": placeItem.horseName,
                            "owner": placeItem.owner,
                            "sire": placeItem.sire,
                            "dam": placeItem.dam,
                            "shows": [{
                                "show": showItem.show,
                                "horseCount": showItem.horseCount,
                                "class": clsItem.class,
                                "placing": placeItem.placing,
                                "championshipPoints": placeItem.championshipPoints,
                                "placingPoints": placeItem.placingPoints,
                                "pointsTotal": ""
                            }]
                        };
                        itemHorses.set(placeItem.registrationNumber, newHorse)
                    }
                }
            }
        }

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
                            "placingPoints": placeItem.placingPoints
                        })
                    }
                    else {
                        var newHorse = {
                            "sire": placeItem.sire,                            
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
                                "placingPoints": placeItem.placingPoints
                            }]
                        };
                        itemHorses.set(placeItem.sire, newHorse)
                    }
                }
            }
        }

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
                            "placingPoints": placeItem.placingPoints
                        })
                    }
                    else {
                        var newHorse = {
                            "dam": placeItem.dam,                            
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
                                "placingPoints": placeItem.placingPoints
                            }]
                        };
                        itemHorses.set(placeItem.dam, newHorse)
                    }
                }
            }
        }

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
                            "placingPoints": placeItem.placingPoints
                        })
                    }
                    else {
                        var newOwner = {
                            "owner": placeItem.owner,
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
                                "pointsTotal": ""
                            }]
                        };
                        itemOwners.set(placeItem.owner, newOwner)
                    }
                }
            }
        }

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

                        const foundHorse = foundClass.horses.find(({ registrationNumber }) => registrationNumber === placeItem.registrationNumber)
                        //if (foundClass.has(placeItem.registrationNumber)) 
                        if (foundHorse){
                            //var foundHorse = placeItem.get(placeItem.registrationNumber)
                            foundHorse.shows.push({
                                "show": showItem.show,
                                "horseCount": showItem.horseCount,
                                "class": clsItem.class,
                                "placing": placeItem.placing,
                                "championshipPoints": placeItem.championshipPoints,
                                "placingPoints": placeItem.placingPoints
                            })
                        }
                        else {
                            foundClass.horses.push({
                                "registrationNumber": placeItem.registrationNumber,
                                "horseName": placeItem.horseName,
                                "owner": placeItem.owner,
                                "sire": placeItem.sire,
                                "dam": placeItem.dam,
                                "shows": [{
                                    "show": showItem.show,
                                    "horseCount": showItem.horseCount,
                                    "class": clsItem.class,
                                    "placing": placeItem.placing,
                                    "championshipPoints": placeItem.championshipPoints,
                                    "placingPoints": placeItem.placingPoints
                                }]

                            })
                        }
                    }
                    else {
                        var newClass = {
                            "class": clsItem.class,
                            "horses": [{
                                "registrationNumber": placeItem.registrationNumber,
                                "horseName": placeItem.horseName,
                                "owner": placeItem.owner,
                                "sire": placeItem.sire,
                                "dam": placeItem.dam,
                                "shows": [{
                                    "show": showItem.show,
                                    "horseCount": showItem.horseCount,
                                    "class": clsItem.class,
                                    "placing": placeItem.placing,
                                    "championshipPoints": placeItem.championshipPoints,
                                    "placingPoints": placeItem.placingPoints
                                }]
                            }]
                        };
                        itemClasses.set(clsItem.class, newClass)
                    }
                }
            }
        }

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