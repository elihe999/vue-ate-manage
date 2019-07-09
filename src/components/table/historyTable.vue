<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>{{type}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center"></el-table-column>
                <el-table-column v-if="type == 'CASE'" prop="date" label="Date" sortable width="150">
                </el-table-column>
                <el-table-column v-if="type == 'CASE'" prop="name" label="Name" sortable width="180">
                    <template slot-scope="scope">
                        <el-button type="text" @click="goData(scope.$index, scope.row)">{{ scope.row.name }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column v-if="type == 'CASE'" prop="path" label="Path" sortable width="220">
                </el-table-column>
                <el-table-column v-if="type == 'CASE'" prop="time" label="Time" sortable width="130">
                </el-table-column>
                <el-table-column v-if="type == 'CASE'" prop="numc" label="Suite" sortable width="80">
                </el-table-column>
                <el-table-column v-if="type == 'CASE'" prop="loopc" label="Case" sortable width="80">
                </el-table-column>
                <el-table-column v-if="type == 'CASE'" prop="result" label="Result" sortable width="90">
                </el-table-column>
                <!-- -->
                <el-table-column v-if="type == 'SUITE'" prop="time" label="Date" sortable width="130">
                </el-table-column>
                <el-table-column v-if="type == 'SUITE'" prop="path" label="Path" sortable width="330">
                </el-table-column>
                <el-table-column v-if="type == 'SUITE'" prop="passnum" label="Pass" sortable width="80">
                </el-table-column>
                <el-table-column v-if="type == 'SUITE'" prop="warnnum" label="Warn" sortable width="80">
                </el-table-column>
                <el-table-column v-if="type == 'SUITE'" prop="failnum" label="Fail" sortable width="80">
                </el-table-column>
                <el-table-column v-if="type == 'SUITE'" prop="totalnum" label="Total" sortable width="80">
                </el-table-column>
                <el-table-column v-if="type == 'SUITE'" prop="passrate" label="Pass Rate" sortable width="100">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total=total>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        // model: {
        //     type: String,
        //     required: true
        // }
    ],
    data() {
        return {
            url: '/index.php/ReturnView/get_page_class/',
            pageurl: '/index.php/ReturnView/pagination/case/',
            tableData: [],
            cur_page: 1,
            multipleSelection: [],
            select_cate: 'suite',
            select_word: '',
            del_list: [],
            is_search: false,
            editVisible: false,
            delVisible: false,
            form: {
                name: '',
                date: '',
                pass: '',
            },
            idx: -1,
            total: 100,
            type: ""
        }
    },
    created() {
        this.type = this.$route.params.type.toUpperCase()                   //first
        this.getPage()
        this.getData()
    },
    computed: {
        data() {
            return this.tableData.filter((d) => {
                let is_del = false;
                for (let i = 0; i < this.del_list.length; i++) {
                    if (d.name === this.del_list[i].name) {
                        is_del = true;
                        break;
                    }
                }
                if (!is_del) {
                    if (d.name.indexOf(this.select_cate) > -1 &&
                        (d.name.indexOf(this.select_word) > -1 ||
                            d.name.indexOf(this.select_word) > -1)
                    ) {
                        return d;
                    }
                }
            })
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData() {
            let required_url = ""
            if (this.type == "case".toUpperCase()) {
                required_url = this.url + 'case/' + localStorage.getItem('ms_username') + "/" + this.cur_page + "/10" + "/path" + "/0";
            }
            else if (this.type == "suite".toUpperCase()) {
                required_url = this.url + 'suite/' + localStorage.getItem('ms_username') + "/" + this.cur_page + "/10" + "/path" + "/0";
            }
            this.tableData = [];
            console.log(this.$refs);
            this.$axios.get(required_url).then((res) => {
                if (this.type == "case".toUpperCase()) {
                    for (var i = 0,l=res.data.list.length;i<l;i++) {
                        let temp_number = Number(res.data.list[i].date)
                        let display_time = new Date(temp_number * 1000);
                        display_time = display_time.toLocaleString('en', { style: 'decimal', hour12: false});
                        this.tableData.push({
                            name: res.data.list[i].name,
                            numc: res.data.list[i].numc,
                            loopc: res.data.list[i].loopc,
                            path: res.data.list[i].path,
                            username: res.data.list[i].username,
                            date: display_time.split(',')[0],
                            time: res.data.list[i].time,
                            fail_res: res.data.list[i].fail_res,
                            result: res.data.list[i].result
                        })
                    }
                } else if (this.type == "suite".toUpperCase()) {
                    for (var i = 0,l=res.data.list.length;i<l;i++) {
                        let temp_number = Number(res.data.list[i].time)
                        let display_time = new Date(temp_number * 1000);
                        display_time = display_time.toLocaleString('en', { style: 'decimal', hour12: false});
                        this.tableData.push({
                            failnum: res.data.list[i].failnum,
                            passnum: res.data.list[i].passnum,
                            warnnum: res.data.list[i].warnnum,
                            totalnum: res.data.list[i].totalnum,
                            username: res.data.list[i].username,
                            time: display_time.split(',')[0],
                            path: res.data.list[i].path,
                            passrate: Math.floor((res.data.list[i].passnum/res.data.list[i].totalnum)*100)/100
                        })
                    }
                }
            })
        },
        search() {
            this.is_search = true;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                name: item.name,
                date: item.date,
            }
            this.editVisible = true;
        },
        handleDelete(index, row) {
            this.idx = index;
            this.delVisible = true;
        },
        delAll() {
            const length = this.multipleSelection.length;
            let str = '';
            this.del_list = this.del_list.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error('删除了' + str);
            this.multipleSelection = [];
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        saveEdit() {
            this.$set(this.tableData, this.idx, this.form);
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx+1} 行成功`);
        },
        deleteRow() {
            this.tableData.splice(this.idx, 1);
            this.$message.success('删除成功');
            this.delVisible = false;
        },
        // Show Data Table
        goData(index, row) {
            // this.$router.push({name: 'data', path: '/data', query: { 
            //         suite: row.path, name: row.name
            //     }
            // })
            console.log(row.name)
        },
        getPage() {
            if (this.type == "case".toUpperCase())
                this.pageurl = "/index.php/ReturnView/pagination/case/" + localStorage.getItem('ms_username');
            else if (this.type == "suite".toUpperCase())
                this.pageurl = "/index.php/ReturnView/pagination/suite/" + localStorage.getItem('ms_username');
            this.$axios.get(this.pageurl).then((res) => {
                this.total = res.data.number;
            })
        }
    },
    watch: {
        "$route": function(to, from) {
            this.type = this.$route.params.type.toUpperCase()
            this.getData()
            this.getPage()
        }
    }
}
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
