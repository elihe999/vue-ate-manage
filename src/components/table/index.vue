<template>
  <div>
    <h3>Element Table</h3>
    <hr>
    <ETable :model="model" ref="newtable">
        <template v-for="item in model">
            <ETabletr v-bind:key="item">
                <template v-for="subject in item.subItem">
                    <ETableth v-bind:key=subject :value=subject></ETableth>
                </template>
                <ETablethBtn :key="item" v-model="item.username">{{ item.username }}</ETablethBtn>
            </ETabletr>
        </template>
    </ETable>
  </div>
</template>

<script>
import ETable from "./Tabletb";
import ETabletr from "./Tabletr";
import ETableth from "./Tableth";
import ETablethBtn from "./TableBtn";
export default {
    components: {
        ETable,
        ETabletr,
        ETablethBtn,
        ETableth
    },
    data() {
        return {
            model: [
                {username: "test", subItem: ["11", "22"]},
                {username: "test", subItem: ["11", "22"]},
                {username: "test", subItem: ["11", "22"]},
                {username: "test", subItem: ["11", "22"]}
            ]
        };
    },
    methods: {

    }
}
</script>
