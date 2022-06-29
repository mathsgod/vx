<template>
    <el-card>
        <el-form label-width="auto">
            <el-form-item label="Subject">
                <el-input v-model="form.subject"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Content">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
        </el-form>
        <el-button @click="submit" type="primary">Submit</el-button>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            form: {
            }
        }
    },
    methods: {
        async submit() {
            await this.$vx.post("/System/mail-test", this.form)
        }
    }
}

</script>