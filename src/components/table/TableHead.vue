<template>
    <div class="handle-box">
        <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="select_cate" placeholder="Data type" class="handle-select mr10">
            <el-option key="1" label="Case" value="case"></el-option>
            <el-option key="2" label="Suite" value="suite"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
    </div>
</template>

<script>
export default {
    Provide() {
        return {
            form: this
        };
    }
}
</script>

