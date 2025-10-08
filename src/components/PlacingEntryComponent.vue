<template>
    <!--<iframe id="belgianSearch" src="https://belgianregistry.com/Search/All" height="500" width="500" title="Iframe Example"></iframe>
    <Button icon="pi pi-search" severity="warning" @click="SearchRegistry" />
    -->

    <Sidebar v-model:visible="visibleSearchRight" position="right">
        <textarea>test</textarea>
    </Sidebar>
    <Card width="100%">
        <!--<template #title>{{ ShowClass }}</template>-->

        <template #content>
            {{ entryMode }}
            <!--<form @submit.prevent="handleSubmit" class="placing-form">-->
            <table style="border: 1px" :id="ShowClass.class" width="100%">
                <thead>
                    <tr>

                        <template v-if="this.entryMode == 'Youth'">
                            <th style="text-align: left;">Placing</th>
                            <th style="text-align: left;">Exhibitor</th>
                            <th style="text-align: left;">Championship Points</th>
                            <th style="text-align: left;">Points</th>
                            <th></th>
                        </template>
                        <template v-else-if="this.entryMode == 'Hitch'">
                            <th style="text-align: left;">Placing</th>
                            <th style="text-align: left;">Hitch/Farm Name</th>
                            <th style="text-align: left;">Membership #</th>
                            <th style="text-align: left;">Championship Points</th>
                            <th style="text-align: left;">Points</th>
                            <th></th>
                        </template>
                        <template v-else>
                            <th style="text-align: left;">Placing</th>
                            <th style="text-align: left;">Registration Number</th>
                            <th style="text-align: left;">Horse</th>
                            <th style="text-align: left;">Owner</th>
                            <th style="text-align: left;">Sire</th>
                            <th style="text-align: left;">Dam</th>
                            <th style="text-align: left;">Championship Points</th>
                            <th style="text-align: left;">Points</th>
                            <th></th>
                        </template>


                        <!--<th style="text-align: left;">Calculated Points</th>-->
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(placing, index) in Placings" :key="placing" style="text-align: left;">
                        <td>
                            <div v-if="index > 4">
                                <InputText type="text" v-model="placing.placing" class="p-inputtext-sm"
                                    style="width:40px;" @change="valueChange()" />
                            </div>
                            <div v-else>
                                {{ placing.placing }}
                            </div>
                        </td>

                        <td v-if="this.entryMode == 'Youth'">
                            <div class="p-inputgroup flex-1">
                                <AutoComplete v-model="placing.exhibitor" optionLabel="value.exhibitor"
                                    class="p-inputtext-sm" :suggestions="filteredOwnerItems" @complete="searchOwner"
                                    @item-select="selectedOwner(placing)" />
                                <!--<InputText type="text" id="registrationNumber" v-model="placing.registrationNumber"
                                    class="p-inputtext-sm" @change="updateValue(Placings, ShowClass, ClassCount)" />
                                <Button icon="pi pi-search" severity="warning" @click="SearchRegistry" />-->
                            </div>
                            <!--<InputText type="text" v-model="placing.owner" class="p-inputtext-sm"
                                @change="valueChange()" /> -->
                        </td>
                        <template v-else-if="this.entryMode == 'Hitch'">
                            <td>
                                <div class="p-inputgroup flex-1">
                                    <AutoComplete v-model="placing.hitchFarmName" optionLabel="value.exhibitor"
                                        class="p-inputtext-sm" :suggestions="filteredOwnerItems" style="width:200x;"
                                        @complete="searchOwner" @item-select="selectedOwner(placing)" />
                                    <!--<InputText type="text" id="registrationNumber" v-model="placing.registrationNumber"
                                    class="p-inputtext-sm" @change="updateValue(Placings, ShowClass, ClassCount)" />
                                <Button icon="pi pi-search" severity="warning" @click="SearchRegistry" />-->
                                </div>

                            </td>
                            <td>
                                <div class="p-inputgroup flex-1">
                                    <AutoComplete v-model="placing.membershipNum" optionLabel="membership number"
                                        class="p-inputtext-sm" :suggestions="filteredRegistrationItems"
                                        style="width:200x;" @complete="searchRegistration"
                                        @item-select="selectedRegistration(placing)" />
                                    <!--<InputText type="text" id="registrationNumber" v-model="placing.registrationNumber"
                                    class="p-inputtext-sm" @change="updateValue(Placings, ShowClass, ClassCount)" />
                                <Button icon="pi pi-search" severity="warning" @click="SearchRegistry" />-->
                                </div>

                            </td>
                        </template>
                        <template v-else>
                            <td>
                                <div class="p-inputgroup flex-1">
                                    <AutoComplete v-model="placing.registrationNumber" optionLabel="name"
                                        class="p-inputtext-sm" :suggestions="filteredRegistrationItems"
                                        style="width:200x;" @complete="searchRegistration"
                                        @item-select="selectedRegistration(placing)" />
                                    <!--<InputText type="text" id="registrationNumber" v-model="placing.registrationNumber"
                                    class="p-inputtext-sm" @change="updateValue(Placings, ShowClass, ClassCount)" />
                                <Button icon="pi pi-search" severity="warning" @click="SearchRegistry" />-->
                                </div>

                            </td>
                            <td>
                                <div class="p-inputgroup flex-1">
                                    <AutoComplete v-model="placing.horseName" optionLabel="value.horseName"
                                        class="p-inputtext-sm" :suggestions="filteredHorseItems" @complete="searchHorse"
                                        @item-select="selectedHorse(placing)" />
                                    <!--<InputText type="text" v-model="placing.horseName" class="p-inputtext-sm"
                                @change="valueChange()" />-->
                                </div>
                            </td>
                            <td>
                                <div class="p-inputgroup flex-1">
                                    <AutoComplete v-model="placing.owner" optionLabel="value.owner"
                                        class="p-inputtext-sm" :suggestions="filteredOwnerItems" @complete="searchOwner"
                                        @item-select="selectedOwner(placing)" />
                                    <!--<InputText type="text" id="registrationNumber" v-model="placing.registrationNumber"
                                    class="p-inputtext-sm" @change="updateValue(Placings, ShowClass, ClassCount)" />
                                <Button icon="pi pi-search" severity="warning" @click="SearchRegistry" />-->
                                </div>
                                <!--<InputText type="text" v-model="placing.owner" class="p-inputtext-sm"
                                @change="valueChange()" /> -->
                            </td>
                            <td>
                                <div class="p-inputgroup flex-1">
                                    <InputText type="text" v-model="placing.sire" class="p-inputtext-sm"
                                        @change="valueChange()" />
                                </div>
                            </td>
                            <td>
                                <div class="p-inputgroup flex-1">
                                    <InputText type="text" v-model="placing.dam" class="p-inputtext-sm"
                                        @change="valueChange()" />
                                </div>
                            </td>
                        </template>
                        <td>
                            <div class="p-inputgroup flex-1">
                                <InputNumber v-model.number="placing.championshipPoints" @change="valueChange()" />
                            </div>
                        </td>
                        <td>
                            <div v-if="index > 4">
                                <InputText type="text" v-model="placing.placingPoints" class="p-inputtext-sm"
                                    style="width:40px;" @change="valueChange()" />
                            </div>
                            <div v-else>
                                {{ placing.placingPoints }}
                            </div>

                        </td>
                        <td v-if="index > 4 && index === Placings.length - 1">
                            <Button label="" icon="pi pi-minus-circle" class="mr-1" @click="RemoveRow(index)" />
                        </td>
                        <!--<td>
                            {{ calculatePoints(placing,this.classType,this.halterHorseCount) }}
                        </td>-->
                    </tr>


                </tbody>
            </table>
            <Button label="" icon="pi pi-plus" class="mr-2" @click="AddNewRow" />
            <!--</form>-->
        </template>
        <template #footer>
        </template>
    </Card>
</template>

<script>
import axios from 'axios'
import { store } from '../classess/store.js'

export default {
    props: {
        EntryMode: String,
        Show: String,
        ShowClass: String,
        HalterHorseCount: Number,
        HitchHorseCount: Number,
        YouthCount: Number,
        RidingCount: Number,
        ClassType: String,
        ClassCount: Number,
        HorseData: null,

        Placings: {
            type: Object,
            required: true,
            default: () => []
        }
    },
    emits:
        ['input', 'valueChange'],
    data() {
        return {
            entryMode: this.EntryMode,
            placings: [
                {
                    "placing": 1,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "championshipPoints": "",
                    "placingPoints": 10
                },
                {
                    "placing": 2,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "championshipPoints": "",
                    "placingPoints": 7
                },
                {
                    "placing": 3,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "championshipPoints": "",
                    "placingPoints": 5
                },
                {
                    "placing": 4,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "championshipPoints": "",
                    "placingPoints": 3
                },
                {
                    "placing": 5,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "championshipPoints": "",
                    "placingPoints": 2
                }
            ],
            visibleSearchRight: false,
            registrationItems: this.HorseData,
            filteredRegistrationItems: null,
            filteredOwnerItems: null,
            filteredHorseItems: null,
            halterHorseCount: this.HalterHorseCount,
            hitchHorseCount: this.HitchHorseCount,
            youthCount: this.YouthCount,
            ridingCount: this.RidingCount,
            classType: this.classType,
            showClass: this.ShowClass
        }
    },
    methods: {
        AddNewRow: function () {
            var placingNew = {};
            if (this.entryMode == "Youth") {
                placingNew = {
                    "placing": 6,
                    "exhibitor": "",
                    "championshipPoints": 0,
                    "placingPoints": 0
                }
            }
            else if (this.entryMode == "Hitch") {
                placingNew = {
                    "placing": 6,
                    "hitchFarmName": "",
                    "membershipNum": "",
                    "championshipPoints": 0,
                    "placingPoints": 0
                }
            }
            else {
                placingNew = {
                    "placing": 6,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "championshipPoints": 0,
                    "placingPoints": 0
                }
            }


            var tbodyRef = document.getElementById(this.ShowClass.class).getElementsByTagName('tbody')[0];
            placingNew.placing = tbodyRef.rows.length + 1;

            this.Placings.push(placingNew);

        },
        RemoveRow: function (index) {
            this.Placings.splice(index, 1);
        },
        calculatePoints: function (placing, classType, halterHorseCount) {
            let points = store.sumTotalPoints(placing, classType, halterHorseCount);
            return points;
        },
        updateValue: function (placing, show, classCount) {
            //this.visibleSearchRight = true
            this.$emit('input', placing, show, classCount);

        },
        valueChange: function () {
            this.$emit('valueChange')
        },
        selectedRegistration(originalEvent, value) {
            if (this.entryMode == "Youth") {

            }
            else if (this.entryMode == "Hitch") {
                var selectedValue = originalEvent.membershipNum.value;
                if (!originalEvent.membershipNum.value.exhibitor && selectedValue.value.hitchFarmName) {
                    originalEvent.value.hitchFarmName = selectedValue.value.hitchFarmName;
                }
               
                originalEvent.membershipNum = selectedValue.value.membershipNum;
                this.valueChange();
            }
            else {
                var selectedValue = originalEvent.registrationNumber;
                if (!originalEvent.sire && selectedValue.value.sire) {
                    originalEvent.sire = selectedValue.value.sire;
                }
                if (!originalEvent.horseName && selectedValue.value.horseName) {
                    originalEvent.horseName = selectedValue.value.horseName;
                }
                if (!originalEvent.dam && selectedValue.value.dam) {
                    originalEvent.dam = selectedValue.value.dam;
                }
                if (!originalEvent.owner && selectedValue.value.owner) {
                    originalEvent.owner = selectedValue.value.owner;
                }
                originalEvent.registrationNumber = selectedValue.name;
                this.valueChange();
            }


        },
        searchRegistration(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredRegistrationItems = [...this.HorseData.registrationNumber];
                } else {
                    var filteredItems;
                    const arr = [...this.HorseData].map(([name, value]) => ({ name, value }));

                    if (this.entryMode == "Youth") {
                        filteredItems = arr.filter((v) => {

                            return v.value.registrationNumber.toLowerCase().startsWith(event.query.toLowerCase());
                        });

                        this.filteredRegistrationItems = filteredItems;
                    }
                    else if (this.entryMode == "Hitch") {
                        filteredItems = arr.filter((v) => {

                            return v.value.membershipNum.toLowerCase().startsWith(event.query.toLowerCase());
                        });

                        this.filteredRegistrationItems = filteredItems;
                    }
                    else {
                        filteredItems = arr.filter((v) => {

                            return v.value.registrationNumber.toLowerCase().startsWith(event.query.toLowerCase());
                        });

                        this.filteredRegistrationItems = filteredItems;
                    }


                }
            }, 250);
        },
        selectedOwner(originalEvent, value) {
            if (this.entryMode == "Youth") {

                var selectedValue = originalEvent.owner;

                originalEvent.owner = selectedValue.name;
                this.valueChange();
            }
            else if (this.entryMode == "Hitch") {

                var selectedValue = originalEvent.hitchFarmName;
                if (!originalEvent.membershipNum && selectedValue.value.membershipNum) {
                    originalEvent.membershipNum = selectedValue.value.membershipNum;
                }
                originalEvent.hitchFarmName = selectedValue.name;
                this.valueChange();
            }
            else {

                var selectedValue = originalEvent.owner;

                originalEvent.owner = selectedValue.name;
                this.valueChange();
            }
        },
        searchOwner(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredOwnerItems = [...this.HorseData.owner];
                } else {
                    var filteredItems;
                    const arr = [...this.HorseData].map(([name, value]) => ({ name, value }));

                    filteredItems = arr.filter((v) => {
                        if (this.entryMode == "Youth") {
                            return v.value.exhibitor.toLowerCase().startsWith(event.query.toLowerCase());
                        }
                        else if (this.entryMode == "Hitch") {
                            return v.value.exhibitor.toLowerCase().startsWith(event.query.toLowerCase());
                        }
                        else {
                            return v.value.owner.toLowerCase().startsWith(event.query.toLowerCase());
                        }
                    });

                    if (this.entryMode == "Youth") {
                        let newFilteredItems = new Map();
                        filteredItems.forEach(x => {
                            if (newFilteredItems.has(x.value.exhibitor)) {
                                var foundExhibitor = newFilteredItems.get(x.value.exhibitor);

                                foundExhibitor.exhibitor.push({
                                    "exhibitor": x.value.exhibitor,
                                })
                            }
                            else {
                                var newExhibitor = {

                                    "exhibitor": x.value.exhibitor,
                                };
                                newFilteredItems.set(x.value.exhibitor, newExhibitor)
                            }
                        })

                        this.filteredOwnerItems = [...newFilteredItems].map(([name, value]) => ({ name, value }));
                    }
                    else if (this.entryMode == "Hitch") {
                        let newFilteredItems = new Map();
                        filteredItems.forEach(x => {
                            if (newFilteredItems.has(x.value.exhibitor)) {
                                var foundExhibitor = newFilteredItems.get(x.value.exhibitor);

                                foundExhibitor.exhibitor.push({
                                    "exhibitor": x.value.exhibitor,
                                    "membershipNum": x.value.membershipNum,
                                })
                            }
                            else {
                                var newExhibitor = {

                                    "exhibitor": x.value.exhibitor,
                                    "membershipNum": x.value.membershipNum,
                                };
                                newFilteredItems.set(x.value.exhibitor, newExhibitor)
                            }
                        })

                        this.filteredOwnerItems = [...newFilteredItems].map(([name, value]) => ({ name, value }));
                    }
                    else {
                        let newFilteredItems = new Map();
                        filteredItems.forEach(x => {
                            if (newFilteredItems.has(x.value.owner)) {
                                var foundOwner = newFilteredItems.get(x.value.owner);

                                foundOwner.horses.push({
                                    "registrationNumber": x.value.registrationNumber,
                                    "horseName": x.value.horseName,
                                    "sire": x.value.sire,
                                    "dam": x.value.dam,
                                })
                            }
                            else {
                                var newOwner = {

                                    "owner": x.value.owner,
                                    "horses": [{
                                        "registrationNumber": x.value.registrationNumber,
                                        "horseName": x.value.horseName,
                                        "sire": x.value.sire,
                                        "dam": x.value.dam,
                                    }]
                                };
                                newFilteredItems.set(x.value.owner, newOwner)
                            }
                        })

                        this.filteredOwnerItems = [...newFilteredItems].map(([name, value]) => ({ name, value }));
                    }


                }
            }, 250);
        },
        selectedHorse(originalEvent, value) {
            var selectedValue = originalEvent.horseName;
            if (!originalEvent.sire && selectedValue.value.sire) {
                originalEvent.sire = selectedValue.value.sire;
            }
            if (!originalEvent.registrationNumber && selectedValue.value.registrationNumber) {
                originalEvent.registrationNumber = selectedValue.value.registrationNumber;
            }
            if (!originalEvent.dam && selectedValue.value.dam) {
                originalEvent.dam = selectedValue.value.dam;
            }
            if (!originalEvent.owner && selectedValue.value.owner) {
                originalEvent.owner = selectedValue.value.owner;
            }
            originalEvent.horseName = selectedValue.name;
            this.valueChange();
        },
        searchHorse(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredHorseItems = [...this.HorseData.horseName];
                } else {
                    var filteredItems;
                    const arr = [...this.HorseData].map(([name, value]) => ({ name, value }));

                    filteredItems = arr.filter((v) => {
                        return v.value.horseName.toLowerCase().startsWith(event.query.toLowerCase());
                    });

                    let newFilteredItems = new Map();
                    filteredItems.forEach(x => {
                        if (newFilteredItems.has(x.value.horseName)) {
                        }
                        else {
                            var newHorse = {
                                "registrationNumber": x.value.registrationNumber,
                                "horseName": x.value.horseName,
                                "owner": x.value.owner,
                                "sire": x.value.sire,
                                "dam": x.value.dam,
                            };
                            newFilteredItems.set(x.value.horseName, newHorse)
                        }
                    })

                    this.filteredHorseItems = [...newFilteredItems].map(([name, value]) => ({ name, value }));
                }
            }, 250);
        },
        SearchRegistry: function () {
            let result;
            const params = {
                "type": '0',
                "value": 'Orndorf',
                "offset": '0',
                "action": '0'
            }

            let url = `https://belgianregistry.com/search/all`;
            const proxyurl = "http://www.whateverorigin.org/get?url="; // "https://cors-anywhere.herokuapp.com/";



            let req = new Request(proxyurl + encodeURIComponent(url), {
                method: 'POST',
                headers: {

                    /*'Authentication': `Basic ${value.username}:${value.password}`,*/
                    'Content-Type': 'application/x-www-form-urlencoded',
                    /*'mode': 'no-cors'*/

                }
            });


            fetch(req)
                .then(response => response.text())
                .then((contents) => {
                    result = JSON.parse(contents);
                    console.log(JSON.parse(contents).data)
                    if (result.data) {
                        // do something
                    } else {
                        // do something
                    }
                })
                .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

            /*const params = new URLSearchParams()
            params.append('type', '0')
            params.append('value', 'Orndorf')
            params.append('offset', '0')
            params.append('action', '0')
            
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin' : 'https://belgianregistry.com/'
                }
            }
            axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
            axios.defaults.headers.post['Access-Control-Allow-Origin'] ='*';
            axios.post("https://belgianregistry.com/search/all", params, config)
                .then((result) => {
                    const htmlResponse = response.data;
                })
                .catch((err) => {
                    // Do somthing
                })*/
        }

    },
    computed: {
        //horseData() {
        //    //var x = showViewData.showIndex(45);
        //    if (this.entryMode == "Youth") {
        //        var youthList = new showViewData(store.youthShowData).ReturnDistinctYouthList()
        //        

        //        return youthList
        //    }
        //    else if (this.entryMode == "Hitch") {
        //        return new showViewData(store.hitchShowData).ReturnDistinctHitchList()
        //    }
        //    else {
        //        return new showViewData(store.showData).ReturnDistinctHorseList()
        //    }

        //},

    },
}
</script>

<!-- 
    "placings": [
                    {
                        "placing": 1,
                        "registrationNumber": "S7000",
                        "horseName": "T-Rex",
                        "owner": "smith, sam",
                        "sire": "tt",
                        "dam": "ff",
                        "championshipPoints": 6,
                        "placingPoints": 10
                    }]
-->