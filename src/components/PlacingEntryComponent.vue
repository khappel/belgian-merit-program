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
            <!--<form @submit.prevent="handleSubmit" class="placing-form">-->
            <Button label="" icon="pi pi-plus" class="mr-2" @click="AddEmptyRow" />
            <table id="{{this.showClass}}" width="100%">
                <thead>
                    <tr>
                        <th style="text-align: left;">Placing</th>                        
                        <th style="text-align: left;">Owner</th>
                        <th style="text-align: left;">Horse</th>
                        <th style="text-align: left;">Registration Number</th>
                        <th style="text-align: left;">Sire</th>
                        <th style="text-align: left;">Dam</th>
                        <th style="text-align: left;">Championship Points</th>
                        <th style="text-align: left;">Points</th>
                        <!--<th style="text-align: left;">Calculated Points</th>-->
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(placing, index) in Placings" :key="placing" style="text-align: left;">
                        <td>
                            {{ placing.placing }}
                        </td>
                        <td>
                            <InputText type="text" id="owner" v-model="placing.owner" class="p-inputtext-sm"
                                @change="valueChange()" />
                        </td>
                        <td>
                            <InputText type="text" id="horseName" v-model="placing.horseName" class="p-inputtext-sm"
                                @change="valueChange()" />
                        </td>
                        <td>
                            <div class="p-inputgroup flex-1">
                                <AutoComplete v-model="placing.registrationNumber" class="p-inputtext-sm"
                                :suggestions="registrationItems" @complete="searchRegistration"
                                />
                                <!--<InputText type="text" id="registrationNumber" v-model="placing.registrationNumber"
                                    class="p-inputtext-sm" @change="updateValue(Placings, ShowClass, ClassCount)" />
                                <Button icon="pi pi-search" severity="warning" @click="SearchRegistry" />-->
                            </div>

                        </td>
                        <td>
                            <InputText type="text" id="sire" v-model="placing.sire" class="p-inputtext-sm"
                                @change="valueChange()" />
                        </td>
                        <td>
                            <InputText type="text" id="dam" v-model="placing.dam" class="p-inputtext-sm"
                                @change="valueChange()" />
                        </td>
                        <td>
                            <InputNumber v-model="placing.championshipPoints" inputId="integeronly" id="championshipPoints"
                                @change="valueChange()" />
                        </td>
                        <td>
                            {{ placing.placingPoints }}
                        </td>
                        <!--<td>
                            {{ calculatePoints(placing,this.classType,this.halterHorseCount) }}
                        </td>-->
                    </tr>


                </tbody>
            </table>
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
        Show: String,
        ShowClass: String,
        HalterHorseCount: Number,
        HitchHorseCount: Number,
        ClassType: String,
        ClassCount: Number,
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
                    "placingPoints": 1
                }
            ],
            visibleSearchRight: false,
            registrationItems: ["abc","123","fff"],
            filteredRegistrationItems: null,
            halterHorseCount: this.HalterHorseCount,
            hitchHorseCount: this.HitchHorseCount,
            classType: this.classType
        }
    },
    methods: {
        AddNewRow: function() {
            var tr = '<tr><td></td><td>test</td></tr>'; // n.parentNode.parentNode.cloneNode(true);
            document.getElementById('tblPlacings').appendChild(tr);
        },
        calculatePoints: function(placing, classType, halterHorseCount){
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
        searchRegistration(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredRegistrationItems = [...this.registrationItems];
                } else {
                    this.filteredRegistrationItems = this.registrationItems.filter((regItem) => {
                        return regItem.toLowerCase().startsWith(event.query.toLowerCase());
                    });
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
    }
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