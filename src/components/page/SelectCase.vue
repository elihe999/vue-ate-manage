<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-rank"></i> 拖拽组件</el-breadcrumb-item>
                <el-breadcrumb-item>拖拽排序</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <button @click="show">Show</button>
                <el-cascader :options="options" clearable></el-cascader>
            </div>
            <div class="drag-box">
                <div class="drag-box-item">
                    <div class="item-title">cases</div>
                    <draggable v-model="cases" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="cases" class="item-ul">
                            <div v-for="item in cases" class="drag-list" :key="item.content">
                                {{item.content}}
                            </div>
                        </transition-group>
                    </draggable>
                </div>
                <div class="drag-box-item">
                    <div class="item-title">pending</div>
                    <draggable v-model="pending" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="pending" class="item-ul">
                            <div v-for="item in pending" class="drag-list" :key="item.content">
                                {{item.content}}
                            </div>
                        </transition-group>
                    </draggable>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'draglist',
        data() {
            return {
                dragOptions:{
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style'
                },
                cases: [
                    {
                        content: '开发图表组件'
                    },
                    {
                        content: '开发拖拽组件'
                    },
                    {
                        content: '开发权限测试组件'
                    },
                    {
                        content: '开发登录注册页面'
                    },
                    {
                        content: '开发头部组件'
                    },
                    {
                        content: '开发表格相关组件'
                    },
                    {
                        content: '开发表单相关组件'
                    }
                ],
                pending: [
                    
                ],
                options: [{
                    value: 'All',
                    label: 'All'
                }]
            }
        },
        components:{
            draggable
        },
        methods: {
            removeHandle(event){
                console.log(event);
                // this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
            },
            show(){
                console.log(this.pending);
            }
        }
    }
</script>

<style scoped>
    .drag-box{
        display: flex;
        user-select: none;
    }
    .drag-box-item {
        flex: 1;
        max-width: 660px;
        min-width: 300px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
    }
    .item-title{
        padding: 8px 8px 8px 12px;
        font-size: 14px;
        line-height: 1.5;
        color: #24292e;
        font-weight: 600;
    }
    .item-ul{
        padding: 0 8px 8px;
        height: 500px;
        overflow-y: scroll;
    }
    .item-ul::-webkit-scrollbar{
        width: 0;
    }
    .drag-list {
        border: 1px #e1e4e8 solid;
        padding: 10px;
        margin: 5px 0 10px;
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
    }
    .drag-list:hover {
        border: 1px solid #20a0ff;
    }
    .drag-title {
        font-weight: 400;
        line-height: 25px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .ghost-style{
        display: block;
        color: transparent;
        border-style: dashed
    }
</style>