<template>
    <Card>
        <!--<template #title>{{ ShowClass }}</template>-->

        <template #content>
            <!--<form @submit.prevent="handleSubmit" class="placing-form">-->
            <table width="100%">
                <thead>
                    <tr>
                        <th style="text-align: left;">Placing</th>
                        <th style="text-align: left;">Registration Number</th>
                        <th style="text-align: left;">Horse</th>
                        <th style="text-align: left;">Sire</th>
                        <th style="text-align: left;">Dam</th>
                        <th style="text-align: left;">Championship Points</th>
                        <th style="text-align: left;">Points</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr v-for="(placing,index) in Placings" :key="placing" style="text-align: left;">
                        <td>
                            {{ placing.placing }}
                        </td>
                        <td>
                            <div class="p-inputgroup flex-1">
                                <InputText type="text" id="registrationNumber" v-model="placing.registrationNumber"
                                class="p-inputtext-sm" @change="updateValue(Placings,ShowClass)" />
                                <Button icon="pi pi-search" severity="warning" />
                            </div>
                            
                        </td>
                        <td>
                            <InputText type="text" id="horseName" v-model="placing.horseName"
                                class="p-inputtext-sm" />
                        </td>
                        <td>
                            <InputText type="text" id="sire" v-model="placing.sire" class="p-inputtext-sm" />
                        </td>
                        <td>
                            <InputText type="text" id="dam" v-model="placing.dam" class="p-inputtext-sm" />
                        </td>
                        <td>
                            <InputNumber v-model="placing.hampionshipPoints" inputId="integeronly" id="ChampionshipPoints" required />
                        </td>
                        <td>
                            {{ placing.placingPoints }}
                        </td>
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
export default {
    props: {
        Show: String,
        ShowClass: String,
        Placings: {
            type: Object,
            required: true,
            default: () => []
        }
    },
    emits: 
        ['input'],
        
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
                    "ChampionshipPoints": "",
                    "placingPoints": 10
                },
                {
                    "placing": 2,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "ChampionshipPoints": "",
                    "placingPoints": 7
                },
                {
                    "placing": 3,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "ChampionshipPoints": "",
                    "placingPoints": 5
                },
                {
                    "placing": 4,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "ChampionshipPoints": "",
                    "placingPoints": 3
                },
                {
                    "placing": 5,
                    "registrationNumber": "",
                    "horseName": "",
                    "owner": "",
                    "sire": "",
                    "dam": "",
                    "ChampionshipPoints": "",
                    "placingPoints": 1
                }
            ],
        }
    },
    methods: {
        updateValue: function (placing,show) {
            this.$emit('input', placing, show);
    }
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
                        "ChampionshipPoints": 6,
                        "placingPoints": 10
                    }]
-->