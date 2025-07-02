<template>
  <Menubar :model="items" class="flexrow" style="background-color: lightskyblue">
    <template #start>
      <div class="flexrow">
        <img alt="logo" src="/belgian-draft-horse-alliance-clear.webp" height="40" class="mr-2" />
        <h3>Belgian Alliance - Program Points</h3>
      </div>
    </template>
    <template #end>
      <Button icon="pi pi-fw pi-plus-circle" text rounded severity="primary" @click="$router.push('/addview')" aria-label="Add Results" />
    </template>
  </Menubar>  
  <router-view />
  <footer class="text-center" style="background-color: lightblue">
    <br/>
      &copy;{{ new Date().getFullYear() }} Belgian Draft Horse Corporation. All Rights Reserved. Website Design and Development by KLH.
  </footer>
</template>

<style scoped>
.flexrow {
  display: flex;
  flex-direction: row;
  gap: .15rem;
  align-items: center;
  width: 100%;
}

body {
  font-size: 10px;
}

</style>

<script setup>
import { onMounted, ref } from "vue";
//import { store } from './classess/store.js'


const items = ref([
  //{
  //  label: 'Merit Results',
  //  icon: 'pi pi-fw pi-home',
  //  to: '/'
  //},
  //{
  //  label: 'Youth Results',
  //  icon: 'pi pi-fw pi-star',
  //  to: '/youthresultsview'
  //},
  //{
  //  label: 'Hitch Results',
  //  icon: 'pi pi-fw pi-bookmark',
  //  to: '/hitchresultsview'
  //},
  {
    label: 'Results',
    icon: 'pi pi-fw pi-bookmark',
    to: '/meritresultsview'
  },  
  {
    label: 'Rules And Info',
    icon: 'pi pi-fw pi-info-circle',
    to: '/rulesandinfoview'
  }
])



/*let defaultFile = {
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
}*/

onMounted(() => {
  /*defaultFileSelected = defaultFile;
  getShowData();*/
})
</script>
