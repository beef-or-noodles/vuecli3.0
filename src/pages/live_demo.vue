<template>
  <div>
    视频聊天demo
    <div ref="video" />
  </div>
</template>

<script>
import * as QNRTC from 'pili-rtc-web'
// 实例化全局房间 Session 对象
console.log('current version is', QNRTC.version)
export default {
    name: 'LiveDemo',
    data() {
        return {
            myRoom: null
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.myRoom = new QNRTC.StreamModeSession()
        },
        // 加入房间 需要roomToken
        async addRoom() {
            const roomToken = 'QxZugR8TAhI38AiJ_cptTl3RbzLyca3t-AAiH-Hh:LFGupBRtPLPNLeDF1BIj9B3aI_k=:eyJhcHBJZCI6ImQ4bGs3bDRlZCIsInJvb21OYW1lIjoid3d3IiwidXNlcklkIjoid3dxIiwiZXhwaXJlQXQiOjE1ODk5MzgwNzc0MjU1NzMxNzQsInBlcm1pc3Npb24iOiJ1c2VyIn0='
            await this.myRoom.joinRoomWithToken(roomToken)
        },
        // 管理员踢人
        async getOutUser() {
            await this.myRoom.kickoutUser('USERID')
        },
        // 离开房间 可以配合浏览器的 onbeforeunload 事件在每次页面即将被关闭或者刷新时自动离开房间
        outRoom() {
            this.myRoom.leaveRoom()
        },
        // 发起一次本地流采集
        async gatherStream() {
            const stream = await QNRTC.deviceManager.getLocalStream({
                audio: { enabled: true },
                video: { enabled: true, width: 1280, height: 720 }
            })
            console.log('get stream!', stream)
        },
        // 播放流媒体 stream 订阅采集的流媒体
        playStream(stream) {
            const videoDom = this.$refs['video']
            stream.play(videoDom, false)
        },
        // 销毁采集 如若不销毁会一直占用摄像头
        releaseStream(stream) {
            stream.release()
        },
        // 发布本地流媒体 type:true发布本地流 false 取消发布 不会销毁本地采集
        async publish(stream, type = true) {
            if (type) {
                await this.myRoom.publish(stream)
            } else {
                // 取消发布
                await this.myRoom.unpublish()
            }
        },
        // 设置发布的 音视频状态 1 音频 2 视频
        setMute({ audio, video }) {
            this.myRoom.mute(audio, video)
        },

        /* 订阅和取消订阅远端的用户*/
        // 实时检测用户发布状态
        realTimeUser() {
            // 房间当前的用户列表
            const users = this.myRoom.users

            for (const user of users) {
                // 每个用户当前是否发布
                console.log('user', user.userId, 'published?', user.published)
            }

            this.myRoom.on('user-publish', user => {
                // 房间里有新的用户发布
                console.log(user, 'publish')
            })

            this.myRoom.on('user-unpublish', user => {
                // 房间里有新的用户取消发布
                console.log(user, 'unpublish')
            })
        },
        // 发起订阅
        async takeStream(userId) {
            // 取出每个 TrackInfo 的 trackId 当作参数发起订阅
            const stream = await this.myRoom.subscribe(userId)
            console.log(stream)
        },
        // 取消订阅
        async unTakeStream(userId) {
            // 传入 trackId，取消订阅，注意参数是一个列表
            await this.myRoom.unsubscribe(userId)
        }
    }
}
</script>

<style scoped>

</style>
