<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>{{ suitename[1] }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ suitename[2] }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ suitename[3] }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ suitename[4] }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ suitename[5] }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ suitename[6] }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ casename }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
               <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="Type"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                tableData: []
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    this.url = 'https://www.easy-mock.com/mock/5cfdf3b46b3bca3c744e7543/example/case/a';
                } else {
                    this.url = '/index.php/ReturnView/get_local_case/' + casename + "/" + suitename[3] + "/" + suitename[4] + "/" + suitename[5] + "/" 
                };

                this.$axios.get(this.url).then((res) => {
                    this.tableData = res.data.list;
                })
            },
            created() {
                this.getData();
            }
        },
        computed: {
            casename() {
                return this.$route.query.name
            },
            suitename() {
                if (this.$route.query.suite.split("/").length < 7) {                            // remove the /
                    alert("ERROR! Wrong parameter size: " + this.$route.query.suite.split("/").length)
                }
                return this.$route.query.suite.split("/")
            }
        }
    }
</script>