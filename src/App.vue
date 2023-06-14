<template>
  <Menubar :model="items" class="flexrow">
    <template #start>
      <div class="flexrow">
        <img alt="logo" src="/public/corpclear.webp" height="40" class="mr-2" />
        <h3>Belgian Merit Program</h3>
      </div>
    </template>
    <template #end>
      <Dropdown v-model="defaultFileSelected" :options="fileYears" optionLabel="year" placeholder="Select a year"
        class="w-full md:w-14rem" @change="getShowData()" />
    </template>
  </Menubar>
  <router-view />
</template>

<style scoped>
.flexrow {
  display: flex;
  flex-direction: row;
  gap: .15rem;
  align-items: center;
  width: 100%;
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import { store } from './classess/store.js'


const items = ref([
  {
    label: 'Results',
    icon: 'pi pi-fw pi-home',
    to: '/'
  },
  {
    label: 'Add Results',
    icon: 'pi pi-fw pi-plus-circle',
    to: '/addview'
  },
  {
    label: 'Settings',
    icon: 'pi pi-fw pi-cog',
    to: '/test'
  }
])

const fileYears = [
  {
    year: "2023-2024",
    file: "Placings/2023BelgianMeritPlacings.json"
  },
  {
    year: "2022-2023",
    file: "Placings/2022BelgianMeritPlacings.json"
  }
]

let defaultFileSelected = ref()

let defaultFile = {
  year: "2023-2024",
  file: "Placings/2023BelgianMeritPlacings.json"
}

function getShowData() {
  fetch(defaultFileSelected.file)
    .then(response => response.json())
    .then(data => (
      //showDataList = data
      store.showData = data
      //this.showDataList = new showViewData(data)
      //this.horseDataList = new showViewData(data).ReturnHorseResults()
      //this.horseDataList = Array.from(new showViewData(data).ReturnHorseResults()).map(([name, value]) => ({value}))
      //this.horseData = new showViewData(data).ReturnHorseResults()
      //this.horseDataList = this.horseData.map(d => Array.from(Object.values(d)))
    ))
}

onMounted(() => {
  defaultFileSelected = defaultFile;
  getShowData();
})
</script>
