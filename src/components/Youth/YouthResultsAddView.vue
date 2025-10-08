<template>
    <Card class="m-0">
        <template #title>
            <Menubar :model="items" />
            <input type="file" accept=".json" ref="file" style="display:none" @change="ReadFile" />

        </template>
        <template #content class="m-0">
            <Fieldset legend="Show" class="w-full m-1 p-1" :toggleable="true">
                <div class="flex flex-column gap-2">
                    <label for="inputYear">Show Year</label>
                    <InputText id="inputYear" v-model="inputYear" />
                </div>

                <Listbox v-model="selectedShow" :options="showList" optionLabel="show" class="w-full mb-1"
                    listStyle="max-height:300px" />
                <Button label="Add Show" icon="pi pi-plus" @click="visibleRightAdd = true" />
                <div class="flex flex-row gap-2" style="align-items: center;" v-if="selectedShow">
                    <label for="youthCount">Youth Count</label>
                    <InputNumber id="youthCount" v-model.number="selectedShow.youthCount" @change="componentChange()"
                        required />
                </div>
            </Fieldset>

            <Sidebar v-model:visible="visibleRightAdd" position="right">
                <Listbox v-model="defaultShowSelected" :options="shows" multiple optionLabel="show" class="w-full mb-1"
                    listStyle="max-height:80vh" />

                <Button label="Add Show" icon="pi pi-plus" class="mr-2" @click="StartClassEntry" />

            </Sidebar>

            <Sidebar v-model:visible="visibleRightSelect" position="right">
                <Dropdown v-model="defaultFileSelected" :options="fileYears" optionLabel="year"
                    placeholder="Select a year" class="mb-3" style="width: 300px" /> 

                    <Button label="Download For Entry" icon="pi pi-plus" class="mr-2 mb-2" @click="downloadFile" />

                    <Button label="Set Lookup File" icon="pi pi-search-plus" class="mr-2 mb-2" @click="setLookupFile" />
                    

            </Sidebar>
            <form @submit="handleSubmit" class="placing-form; mr-0">
                <h1>Enter Results for {{ selectedShow?.show }}</h1>
                <Accordion :multiple="true" :activeIndex="setAccordianCount()">
                    <AccordionTab v-for="cls in selectedShow?.classes" :key="cls.class" :header="cls.class">

                        <div class="flex flex-row gap-2" style="align-items: center;">
                            <label :for="cls.classCount">Class Count</label>
                            <InputNumber v-model.number="cls.classCount" @change="componentChange()" />
                        </div>

                        <PlacingEntryComponent :EntryMode="entryMode" :HorseData="horseData" :Show="selectedShow.show" :ShowClass="cls"
                            :YouthCount="selectedShow?.youthCount" :ClassType="cls.classType" :Placings="cls.placings"
                            @input="(e, c, d) => handleChange(e, c, d)" @valueChange="() => componentChange()">
                        </PlacingEntryComponent>

                    </AccordionTab>
                </Accordion>

            </form>
        </template>
    </Card>
</template>

<script>
import { showViewData } from '../../classess/showResults.js'
import PlacingEntryComponent from '../PlacingEntryComponent.vue'
import { store } from '../../classess/store.js'
import { onMounted, ref, computed } from "vue";

export default {
    name: "Results",
    data() {
        return {
            //store,
            shows: ref(''),
            entryMode: "Youth",
            //shows: [],
            //showClasses: [],
            showDataList: [],
            accordianCount: [],
            defaultShowSelected: [],
            defaultFileSelected: [],
            horseData: ref(''),
            //visibleShowSelected: [],
            //showYear: { "year": "", "shows": currentShowList() },
            inputYear: "",
            selectedShow: { "show": "", "YouthCount": 0, "classes": [] },
            showList: [],
            enableForm: false,
            enableYearMode: false,
            visibleRightAdd: false,
            visibleRightSelect: false,
            youthCount: 0,
            form: { "show": "", "YouthCount": 0, "classes": [] },
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    command: () => this.SetNewMode()
                },
                {
                    label: 'Open',
                    icon: 'pi pi-upload',
                    severity: 'success',
                    command: () => this.OpenFile()
                },
                {
                    label: 'Save',
                    icon: '',
                    command: () => this.SaveFile()
                },
                {
                    label: '',
                    icon: 'pi pi-cloud-download',
                    command: () => this.visibleRightSelect = true
                }
            ]

            //<Button label="New" icon="pi pi-plus" class="mr-2" @click="SetNewMode" />
            //<input type="file" accept=".json" ref="file" style="display:none" @change="ReadFile" />
            //<Button label="Open" icon="pi pi-upload" severity="success" class="mr-2" @click="OpenFile" />
            //<Button label="Save" icon="" class="mr-2" @click="SaveFile" />


        };
    },
    setup() {

        onMounted(() => {
            store.getAccessToken();
            store.getShowDef();
            store.getYouthClassDef();
        });
    },
    components: {
        PlacingEntryComponent
    },
    methods: {
        getYouthShowData() {
            store.youthShowData = [];

            this.getShowFiles();
        },
        async getShowFiles() {
            try {
                const response = await store.getShowFiles("Youth", this.fileYears, this.defaultFileSelected);

                if (response.length > 0) {
                    this.fileYears = response;
                    //this.defaultFileSelected = this.fileYears[0];
                }
            } catch (error) {
                console.error("Error fetching show files:", error);
            }
        },
        OpenFile() {
            let fileInputElement = this.$refs.file;
            fileInputElement.click();

            // Do something with chosen file 
            const file = fileInputElement.files[0]
            this.ReadFile();
        },
        ReadFile() {
            this.file = this.$refs.file.files[0];
            const reader = new FileReader();
            if (this.file?.name.includes(".json")) {
                reader.onload = (res) => {
                    var FileParse = JSON.parse(res.target.result);

                    if (FileParse.year != undefined) {
                        this.inputYear = FileParse.year;
                        this.showList = FileParse.shows;
                    }
                    else {
                        this.showList = FileParse;
                    }

                    //this.showYear = JSON.parse(res.target.result);
                };
                reader.onerror = (err) => console.log(err);
                reader.readAsText(this.file);
            }
        },
        SaveFile() {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([JSON.stringify(this.showYear)], {
                type: "text/plain"
            }));
            a.setAttribute("download", this.showYear.year + " Belgian Youth Merit Program.json");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        SetNewMode() {
            this.inputYear = "";
            this.showList = [];
            this.selectedShow = form;

            localStorage.removeItem("showYouthData");

        },
        StartClassEntry() {
            let showcls = JSON.parse(JSON.stringify(this.classes));
            this.defaultShowSelected.forEach(showItem => {
                const foundShow = this.showList.find(({ show }) => show === showItem.show)
                //if (foundClass.has(placeItem.registrationNumber)) 
                if (foundShow == undefined) {
                    this.showList.push({ "show": showItem.show, "youthCount": 0, "classes": showcls });
                }
            })

            this.defaultShowSelected = [];
            this.visibleRightAdd = false;
            this.selectedShow = this.showList[this.showList.length - 1];
        },
        /*getShowDef() {
            fetch("Definition Files/Shows.json")
                .then(response => response.json())
                .then(data => (this.shows = data));
        },*/
        /*getClassDef() {
            fetch("Definition Files/YouthClasses.json")
                .then(response => response.json())
                .then(data => (this.form.classes = data));
        },*/
        setAccordianCount() {
            let length = 0;

            if (this.selectedShow?.classes?.length != null) {
                length = this.selectedShow.classes.length;
            }

            let arr = [];
            for (let i = 0; i < length; i++) {
                arr.push(i);
            }

            return arr;
        },
        handleSubmit() {
            //const data = JSON.stringify(this.form)
            //window.localStorage.setItem('form', data);
            //console.log(JSON.parse(window.localStorage.getItem('form')))
        },
        handleChange(placing, showclass, classCount) {
            const foundClass = this.selectedShow.classes.find(c => c.class == showclass.class);
            if (foundClass != null) {
                foundClass.placings = placing;
                //foundClass.classCount = classCount;
            }
            else {
                this.selectedShow.classes.push({ showclass, placing, classCount })
            }

            const parsed = JSON.stringify(this.showYear);
            localStorage.setItem('showYouthData', parsed);
        },
        componentChange() {
            const parsed = JSON.stringify(this.showYear);
            localStorage.setItem('showYouthData', parsed);
        },
        async downloadFile() {
            try {
                await store.downloadFile("Youth", this.defaultFileSelected.file, false);

                const FileParse = store.youthShowData;

                if (FileParse.year !== undefined) {
                    this.inputYear = FileParse.year;
                    this.showList = FileParse.shows;
                } else {
                    this.showList = FileParse;
                }

                this.horseData = new showViewData(store.youthShowData).ReturnDistinctYouthList();

                this.visibleRightSelect = false;
            } catch (error) {
                console.error("Failed to load Youth file:", error);
            }
        }, 
        async setLookupFile(){
            try {
                await store.downloadFile("Youth", this.defaultFileSelected.file, false);

                //const FileParse = store.youthShowData;
                
                this.horseData = new showViewData(store.youthShowData).ReturnDistinctYouthList();

                this.visibleRightSelect = false;
            } catch (error) {
                console.error("Failed to load Youth file:", error);
            }
        },      
        addResults() {

        }
    },
    computed: {
        showYear() {
            return { year: this.inputYear, shows: this.showList };
        },
        shows() {
            return store.showListData;
        },
        classes() {
            return store.youthClassListData;
        }
    },
    created: function () {
        this.getYouthShowData();
        //this.getShowDef();
        //this.getClassDef();
    },
    mounted() {
        if (localStorage.getItem('showYouthData')) {
            try {
                var FileParse = JSON.parse(localStorage.getItem('showYouthData'));

                if (FileParse.year != undefined) {
                    this.inputYear = FileParse.year;
                    this.showList = FileParse.shows;
                }
                else {
                    this.showList = FileParse;
                }
            } catch (e) {
                //localStorage.removeItem('showData');
            }
        }
    },
    watch: {
        inputYear(newYear) {
            const parsed = JSON.stringify(this.showYear);
            localStorage.setItem('showYouthData', parsed);
        },
        shows(showList) {
            shows = store.showListData;
        },
        classes(classList) {
            this.form.classess = store.youthClassListData;
        }
    }
};
</script>