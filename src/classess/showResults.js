import { store } from '../classess/store.js'

export class showViewData {
    constructor(showJSON) {
        this.data = showJSON;
        //this.shows = this.GetShowsData();
        //if (this.data.shows.year != undefined) {
        //    this.showYear = this.data.shows.year;
        //}
    }
    GetShowsData() {
        let itemShows = new Map();

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
            itemShows.set(showItem.show, showItem);
        }


        return itemShows;
    }
    CleanupShowData() {
        //let shows = [];

        //if (this.data.shows.year != undefined) {
        //    this.showYear = this.data.shows.year;
        //    this.data.shows = this.data.shows.shows;
        //}

        for (var i = this.data.shows.length - 1; i >= 0; i--) {
            //let showItem = new showResults();
            //showItem = this.data.shows[i];
            for (var c = this.data.shows[i].classes.length - 1; c >= 0; c--) {
                //let clsItem = new classes();
                //clsItem =  this.data.shows[i].classes[c];

                for (var p = this.data.shows[i].classes[c].placings.length - 1; p >= 0; p--) {
                    //let placeItem = new placings();
                    //placeItem = this.data.shows[i].classes[c].placings[p];
                    //todo: if youth need to account for owner not registraiton and horse
                    if (this.data.shows[i].classes[c].placings[p].registrationNumber == '' && this.data.shows[i].classes[c].placings[p].horseName == '') {
                        //remove
                        this.data.shows[i].classes[c].placings.splice(p, 1);
                    }
                    else {
                        if (!this.data.shows[i].classes[c].placings[p].registrationNumber) {
                            if (!this.data.shows[i].classes[c].placings[p].horseName) {
                                this.data.shows[i].classes[c].placings[p].registrationNumber =
                                    "Pending (" + this.data.shows[i].classes[c].placings[p].owner + ")"
                            }
                            else {
                                this.data.shows[i].classes[c].placings[p].registrationNumber =
                                    "Pending (" + this.data.shows[i].classes[c].placings[p].horseName + ")"
                            }
                        }
                        if (this.data.shows[i].classes[c].placings[p].registrationNumber.toLowerCase() == 'pending') {
                            if (!this.data.shows[i].classes[c].placings[p].horseName) {
                                this.data.shows[i].classes[c].placings[p].registrationNumber =
                                    this.data.shows[i].classes[c].placings[p].registrationNumber + "(" + this.data.shows[i].classes[c].placings[p].owner + ")"
                            }
                            else {
                                this.data.shows[i].classes[c].placings[p].registrationNumber =
                                    this.data.shows[i].classes[c].placings[p].registrationNumber + "(" + this.data.shows[i].classes[c].placings[p].horseName + ")"
                            }
                        }

                        var horseCount = 0;
                        if (this.data.shows[i].classes[c].classType == "Hitch") {
                            if (this.data.shows[i].classes[c].class == "English Riding" ||
                                this.data.shows[i].classes[c].class == "Western Riding") {
                                //horseCount = this.data.shows[i].classes[c].classCount;
                                horseCount = this.data.shows[i].ridingCount
                            }
                            else {
                                horseCount = this.data.shows[i].hitchHorseCount;
                            }

                        }
                        else {
                            horseCount = this.data.shows[i].halterHorseCount;
                        }

                        this.data.shows[i].classes[c].placings[p].pointsTotal = store.sumTotalPoints(
                            this.data.shows[i].classes[c].placings[p],
                            this.data.shows[i].classes[c].classType,
                            this.data.shows[i].classes[c].class,
                            horseCount
                        )

                    }
                    if (this.data.shows[i].classes[c].placings.length == 0) {
                        //remove class
                        this.data.shows[i].classes.splice(c, 1);
                    }
                }
            }
        }

        return this.data; // this.data.shows;
    }
    CleanupYouthShowData() {
        //let shows = [];

        //if (this.data.shows.year != undefined) {
        //    this.data.shows = this.data.shows.shows;
        //}

        for (var i = this.data.shows.length - 1; i >= 0; i--) {
            //let showItem = new showResults();
            //showItem = this.data.shows[i];
            for (var c = this.data.shows[i].classes.length - 1; c >= 0; c--) {
                //let clsItem = new classes();
                //clsItem =  this.data.shows[i].classes[c];

                for (var p = this.data.shows[i].classes[c].placings.length - 1; p >= 0; p--) {
                    //let placeItem = new placings();
                    //placeItem = this.data.shows[i].classes[c].placings[p];
                    //todo: if youth need to account for owner not registraiton and horse
                    if (this.data.shows[i].classes[c].placings[p].exhibitor == '' ||
                        this.data.shows[i].classes[c].placings[p].exhibitor == undefined) {
                        //remove
                        this.data.shows[i].classes[c].placings.splice(p, 1);
                    }
                    else {
                        var youthCount = this.data.shows[i].youthCount;
                        //var classType = (this.data.shows[i].classes[c].class.includes("Decorating"))? "YouthDecorating" :"Youth";

                        //if (classType == "YouthDecorating"){
                        //     this.data.shows[i].classes[c].placings[p].placingPoints = this.data.shows[i].classes[c].placings[p].placingPoints * 2;                            
                        //}
                        this.data.shows[i].classes[c].placings[p].pointsTotal = store.sumTotalPoints(
                            this.data.shows[i].classes[c].placings[p],
                            "Youth",
                            this.data.shows[i].classes[c].class,
                            youthCount
                        )

                    }
                    if (this.data.shows[i].classes[c].placings.length == 0) {
                        //remove class
                        this.data.shows[i].classes.splice(c, 1);
                    }
                }
            }
        }

        return this.data; //.shows;
    }
    CleanupHitchShowData() {
        //let shows = [];

        //if (this.data.shows.year != undefined) {
        //    this.data.shows = this.data.shows.shows;
        //}

        for (var i = this.data.shows.length - 1; i >= 0; i--) {
            //let showItem = new showResults();
            //showItem = this.data.shows[i];
            for (var c = this.data.shows[i].classes.length - 1; c >= 0; c--) {
                //let clsItem = new classes();
                //clsItem =  this.data.shows[i].classes[c];

                for (var p = this.data.shows[i].classes[c].placings.length - 1; p >= 0; p--) {
                    //let placeItem = new placings();
                    //placeItem = this.data.shows[i].classes[c].placings[p];
                    //todo: if youth need to account for owner not registraiton and horse
                    if (this.data.shows[i].classes[c].placings[p].membershipNum == '' ||
                        this.data.shows[i].classes[c].placings[p].membershipNum == undefined) {
                        //remove
                        this.data.shows[i].classes[c].placings.splice(p, 1);
                    }
                    else {
                        var hitchCount = 0;
                        if (this.data.shows[i].classes[c].class == "English Riding" ||
                            this.data.shows[i].classes[c].class == "Western Riding") {
                            //hitchCount = this.data.shows[i].classes[c].classCount;
                            hitchCount = this.data.shows[i].ridingCount;
                        }
                        else {
                            hitchCount = this.data.shows[i].hitchCount;
                        }


                        this.data.shows[i].classes[c].placings[p].pointsTotal = store.sumTotalPoints(
                            this.data.shows[i].classes[c].placings[p],
                            "Hitch",
                            this.data.shows[i].classes[c].class,
                            hitchCount
                        )

                    }
                    if (this.data.shows[i].classes[c].placings.length == 0) {
                        //remove class
                        this.data.shows[i].classes.splice(c, 1);
                    }
                }
            }
        }

        return this.data; //.shows;
    }
    ReturnDistinctHorseList() {
        let itemHorses = new Map();

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (itemHorses.has(placeItem.registrationNumber)) {
                        //var foundHorse = itemHorses.get(placeItem.registrationNumber)
                    }
                    else {
                        var newHorse = {
                            "registrationNumber": placeItem.registrationNumber,
                            "horseName": placeItem.horseName,
                            "owner": placeItem.owner,
                            "sire": placeItem.sire,
                            "dam": placeItem.dam,
                        };
                        itemHorses.set(placeItem.registrationNumber, newHorse)
                    }
                }
            }
        }

        return itemHorses;

    }
    ReturnDistinctHitchList() {
        let itemExhibitors = new Map();
        let hitchExhibitors = new Map();

        for (var i = 0; i < this.data?.shows?.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (placeItem.hitchFarmName.length > 0) {
                        if (itemExhibitors.has(placeItem.hitchFarmName.replace(/ /g, ''))) {

                        }
                        else {
                            var newExhibitor = {
                                "exhibitor": placeItem.hitchFarmName,
                                "membershipNum": placeItem.membershipNum,
                            };

                            itemExhibitors.set(placeItem.hitchFarmName.replace(/ /g, ''), newExhibitor)
                        }
                    }
                }
            }
        }

        
        return itemExhibitors; //hitchExhibitors; 
    }
    ReturnDistinctYouthList() {
        let itemExhibitors = new Map();
        let youthExhibitors = new Map();

        for (var i = 0; i < this.data?.shows?.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (placeItem?.exhibitor?.length > 0) {
                        if (itemExhibitors.has(placeItem.exhibitor.replace(/ /g, ''))) {

                        }
                        else {
                            var newExhibitor = {
                                "exhibitor": placeItem.exhibitor
                            };

                            itemExhibitors.set(placeItem.exhibitor.replace(/ /g, ''), newExhibitor)
                        }
                    }
                }
            }
        }

        //split into youth 10-14 and 15-18
        //var youngYouth = {"title":"Youth 10-14",
        //    "youth": []
        //}
        //var olderYouth = {"title":"Youth 15-18",
        //    "youth": []
        //};

        //itemExhibitors.forEach(h => (h.shows[0].class.includes("10-14")) ? youngYouth.youth.push(h): olderYouth.youth.push(h));

        //youthExhibitors.set(youngYouth.title, youngYouth);
        //youthExhibitors.set(olderYouth.title, olderYouth);

        return itemExhibitors; //youthExhibitors; 
    }
    ReturnHorseResults() {
        let itemHorses = new Map();

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
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

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
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

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
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

        //check for flag to include only dams with >1 horses
        if (this.data.year > '2023') {
            itemHorses.forEach(h => {
                var registrations = [];

                h.shows.forEach(s => {
                    if (!registrations.includes(s.registrationNumber)) {
                        registrations.push(s.registrationNumber);
                    }
                })
                if (registrations.length < 2) {
                    itemHorses.delete(h.dam);
                }
            })
        }

        //for (var c = itemHorses.size - 1; c >= 0; c--){
        //    var registration = [];

        //itemHorses[c].shows.forEach(s => {
        //    if (!registration.has(s.registrationNumber)) {
        //        registrations.push(s.registrationNumber);
        //    }
        //})
        //if (registration.length < 1){
        //    itemHorses.splice[c,1];
        //}
        //}

        itemHorses.forEach(h => h.showTotals = store.pointsSummary(h.shows));
        return itemHorses;

    }
    ReturnOwnerResults() {
        let itemOwners = new Map();

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (placeItem.owner.length > 0) {
                        if (itemOwners.has(placeItem.owner.replace(/ /g, ''))) {
                            var foundOwner = itemOwners.get(placeItem.owner.replace(/ /g, ''));

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

                            itemOwners.set(placeItem.owner.replace(/ /g, ''), newOwner)
                        }
                    }
                }
            }
        }

        itemOwners.forEach(h => h.showTotals = store.pointsSummary(h.shows));
        return itemOwners;

    }
    ReturnClassResults() {
        let itemClasses = new Map();

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
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
    ReturnYouthClassResults() {
        let itemClasses = new Map();

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new youthShowResults();
            showItem = this.data.shows[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (itemClasses.has(clsItem.class)) {
                        var foundClass = itemClasses.get(clsItem.class);

                        const foundYouth = foundClass.youth.find(({ exhibitor }) =>
                            exhibitor === placeItem.exhibitor)
                        //if (foundClass.has(placeItem.registrationNumber)) 
                        if (foundYouth) {
                            //var foundHorse = placeItem.get(placeItem.registrationNumber)
                            foundYouth.shows.push({
                                "show": showItem.show,
                                "youthCount": showItem.youthCount,
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
                            foundClass.youth.push({
                                "exhibitor": placeItem.exhibitor,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "youthCount": showItem.youthCount,
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
                            "youth": [{
                                "exhibitor": placeItem.exhibitor,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "youthCount": showItem.youthCount,
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

        itemClasses.forEach(c => c.youth.forEach(h => h.showTotals = store.pointsSummary(h.shows)));
        return itemClasses;

    }
    ReturnYouthExhibitorResults() {
        let itemExhibitors = new Map();
        let youthExhibitors = new Map();

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (placeItem.exhibitor.length > 0) {
                        if (itemExhibitors.has(placeItem.exhibitor.replace(/ /g, ''))) {
                            var foundExhibitor = itemExhibitors.get(placeItem.exhibitor.replace(/ /g, ''));

                            foundExhibitor.shows.push({
                                "show": showItem.show,
                                "youthCount": showItem.youthCount,
                                "class": clsItem.class,
                                "placing": placeItem.placing,
                                "championshipPoints": placeItem.championshipPoints,
                                "placingPoints": placeItem.placingPoints,
                                "pointsTotal": placeItem.pointsTotal
                            })
                        }
                        else {
                            var newExhibitor = {
                                "exhibitor": placeItem.exhibitor,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "youthCount": showItem.youthCount,
                                    "class": clsItem.class,
                                    "placing": placeItem.placing,
                                    "championshipPoints": placeItem.championshipPoints,
                                    "placingPoints": placeItem.placingPoints,
                                    "pointsTotal": placeItem.pointsTotal
                                }]
                            };

                            itemExhibitors.set(placeItem.exhibitor.replace(/ /g, ''), newExhibitor)
                        }
                    }
                }
            }
        }

        itemExhibitors.forEach(h => h.showTotals = store.pointsSummary(h.shows));

        //split into youth 10-14 and 15-18
        var youngYouth = {
            "title": "Youth 10-14",
            "youth": []
        }
        var olderYouth = {
            "title": "Youth 15-18",
            "youth": []
        };

        itemExhibitors.forEach(h => (h.shows[0].class.includes("10-14")) ? youngYouth.youth.push(h) : olderYouth.youth.push(h));

        youthExhibitors.set(youngYouth.title, youngYouth);
        youthExhibitors.set(olderYouth.title, olderYouth);

        return youthExhibitors;

    }
    ReturnHitchClassResults() {
        let itemClasses = new Map();

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new hitchShowResults();
            showItem = this.data.shows[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (itemClasses.has(clsItem.class)) {
                        var foundClass = itemClasses.get(clsItem.class);

                        const foundHitch = foundClass.hitch.find(({ membershipNum }) =>
                            membershipNum === placeItem.membershipNum)
                        //if (foundClass.has(placeItem.registrationNumber)) 
                        if (foundHitch) {
                            //var foundHorse = placeItem.get(placeItem.registrationNumber)
                            foundHitch.shows.push({
                                "show": showItem.show,
                                "hitchCount": showItem.youthCount,
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
                            foundClass.hitch.push({
                                "hitchFarmName": placeItem.hitchFarmName,
                                "membershipNum": placeItem.membershipNum,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "hitchCount": showItem.youthCount,
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
                            "hitch": [{
                                "hitchFarmName": placeItem.hitchFarmName,
                                "membershipNum": placeItem.membershipNum,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "hitchCount": showItem.youthCount,
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

        itemClasses.forEach(c => c.hitch.forEach(h => h.showTotals = store.pointsSummary(h.shows)));
        return itemClasses;

    }
    ReturnHitchExhibitorResults() {
        let itemExhibitors = new Map();

        for (var i = 0; i < this.data.shows.length; i++) {
            let showItem = new showResults();
            showItem = this.data.shows[i];
            for (var c = 0; c < showItem.classes.length; c++) {
                let clsItem = new classes();
                clsItem = showItem.classes[c];

                for (var p = 0; p < clsItem.placings.length; p++) {
                    let placeItem = new placings();
                    placeItem = clsItem.placings[p];

                    if (placeItem.membershipNum.length > 0) {
                        if (itemExhibitors.has(placeItem.membershipNum.replace(/ /g, ''))) {
                            var foundExhibitor = itemExhibitors.get(placeItem.membershipNum.replace(/ /g, ''));

                            foundExhibitor.shows.push({
                                "show": showItem.show,
                                "hitchCount": showItem.hitchCount,
                                "class": clsItem.class,
                                "placing": placeItem.placing,
                                "championshipPoints": placeItem.championshipPoints,
                                "placingPoints": placeItem.placingPoints,
                                "pointsTotal": placeItem.pointsTotal
                            })
                        }
                        else {
                            var newExhibitor = {
                                "hitchFarmName": placeItem.hitchFarmName,
                                "membershipNum": placeItem.membershipNum,
                                "showTotals": 0,
                                "shows": [{
                                    "show": showItem.show,
                                    "hitchCount": showItem.hitchCount,
                                    "class": clsItem.class,
                                    "placing": placeItem.placing,
                                    "championshipPoints": placeItem.championshipPoints,
                                    "placingPoints": placeItem.placingPoints,
                                    "pointsTotal": placeItem.pointsTotal
                                }]
                            };

                            itemExhibitors.set(placeItem.membershipNum.replace(/ /g, ''), newExhibitor)
                        }
                    }
                }
            }
        }

        itemExhibitors.forEach(h => h.showTotals = store.pointsSummary(h.shows));

        return itemExhibitors;

    }
    ReturnVersatilityResults() {
        //let itemHorses = new Map();

        let versatilityHorses = new Map();
        for (var s = 0; s < this.data.shows.length; s++) {
            let showItem = new showResults();
            showItem = this.data.shows[s];

            let hitchHorses = new Map();
            let halterHorses = new Map();

            showItem.classes.forEach(c => {
                if (c.classType == "Hitch") {
                    //grab all horses in the two hitch classes
                    c.placings.forEach(p => {
                        if (p.registrationNumber) {
                            p.show = showItem.show;
                            p.halterHorseCount = showItem.halterHorseCount;
                            p.hitchHorseCount = showItem.hitchHorseCount;
                            p.class = c.class;
                            p.classType = c.classType;
                            hitchHorses.set(p.registrationNumber, p)
                        }
                    })
                }
                else {
                    //grab all the horses in the rest of the classes
                    c.placings.forEach(p => {
                        if (p.registrationNumber) {
                            p.show = showItem.show;
                            p.halterHorseCount = showItem.halterHorseCount;
                            p.hitchHorseCount = showItem.hitchHorseCount;
                            p.class = c.class;
                            p.classType = c.classType;
                            halterHorses.set(p.registrationNumber, p)
                        }
                    })
                }
            });

            hitchHorses.forEach(hitch => {
                halterHorses.forEach(halter => {
                    if (hitch.registrationNumber == halter.registrationNumber) {
                        if (versatilityHorses.has(halter.registrationNumber)) {
                            var foundHorse = versatilityHorses.get(halter.registrationNumber);

                            //see if found horse shows contains this hitch class  
                            let foundShowClass = foundHorse.shows.find(s => s.show == hitch.show && s.class == hitch.class)
                            if (foundShowClass == undefined) {
                                foundHorse.shows.push({
                                    "show": hitch.show,
                                    "halterHorseCount": hitch.halterHorseCount,
                                    "hitchHorseCount": hitch.hitchHorseCount,
                                    "class": hitch.class,
                                    "placing": hitch.placing,
                                    "championshipPoints": hitch.championshipPoints,
                                    "placingPoints": hitch.placingPoints,
                                    "pointsTotal": hitch.pointsTotal
                                })
                            }
                            foundHorse.shows.push({
                                "show": halter.show,
                                "halterHorseCount": halter.halterHorseCount,
                                "hitchHorseCount": halter.hitchHorseCount,
                                "class": halter.class,
                                "placing": halter.placing,
                                "championshipPoints": halter.championshipPoints,
                                "placingPoints": halter.placingPoints,
                                "pointsTotal": halter.pointsTotal
                            })
                        }
                        else {
                            var newHorse = {
                                "registrationNumber": hitch.registrationNumber,
                                "horseName": hitch.horseName,
                                "owner": hitch.owner,
                                "sire": hitch.sire,
                                "dam": hitch.dam,
                                "showTotals": 0,
                                "shows": [{
                                    "show": hitch.show,
                                    "halterHorseCount": hitch.halterHorseCount,
                                    "hitchHorseCount": hitch.hitchHorseCount,
                                    "class": hitch.class,
                                    "placing": hitch.placing,
                                    "championshipPoints": hitch.championshipPoints,
                                    "placingPoints": hitch.placingPoints,
                                    "pointsTotal": hitch.pointsTotal
                                },
                                {
                                    "show": halter.show,
                                    "halterHorseCount": halter.halterHorseCount,
                                    "hitchHorseCount": halter.hitchHorseCount,
                                    "class": halter.class,
                                    "placing": halter.placing,
                                    "championshipPoints": halter.championshipPoints,
                                    "placingPoints": halter.placingPoints,
                                    "pointsTotal": halter.pointsTotal
                                }]
                            };

                            versatilityHorses.set(hitch.registrationNumber, newHorse)
                        }
                    }
                })

            })

            versatilityHorses.forEach(h => h.showTotals = store.pointsSummary(h.shows));

        }

        return versatilityHorses;
    }
}
class showResults {
    constructor(show, horseCount, classes) {
        this.show = show;
        this.horseCount = horseCount;
        this.classes = classes;
    }
}

class youthShowResults {
    constructor(show, youthCount, classes) {
        this.show = show;
        this.youthCount = youthCount;
        this.classes = classes;
    }
}

class hitchShowResults {
    constructor(show, hitchCount, classes) {
        this.show = show;
        this.hitchCount = hitchCount;
        this.classes = classes;
    }
}
class classes {
    constructor(_class, classType, placings) {
        this._class = _class;
        this.classType = classType;
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