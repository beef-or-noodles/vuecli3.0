<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <div class="list" v-for="item in list" :key="item">
                    <div class="shopbox" @click="detail(item)">
                        {{item}}
                    </div>

                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                refreshing:false,
            }
        },
        created(){
            this.onLoad()
        },
        methods: {
            onLoad() {
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }

                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = false;
                    }
                    this.refreshing = false;
                }, 1000);
            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;
                this.list = []
                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
            detail(item){
                console.log(item);
                this.$router.push({path:'/contents'})
            }
        },
    }
</script>

<style scoped>
.shopbox{
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>