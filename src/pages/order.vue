<template>
    <div>
        <van-tabs v-model="active">
            <van-tab title="已完成">已完成</van-tab>
            <van-tab title="待支付">待支付</van-tab>
            <van-tab title="已取消">已取消</van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        name: "order",
        data() {
            return {
                active: 2
            }
        },
    }
</script>

<style scoped>

</style>