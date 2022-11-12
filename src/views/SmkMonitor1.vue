<template>

    <div class="smkmonitor1">
        <button @click="postInfo">发送(post)</button>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "SmkMonitor1",
        methods: {
            postInfo() {
                axios.post('/api/monitor1').then((res) => {
                    console.log(res.data)
                    this.msg2=res.data
                })
            },

        }
    }

</script>

<style scoped>

</style>
