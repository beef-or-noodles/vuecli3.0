<template>
  <div>
    <div class="btnBox">
      <div @click="openRoom">加入房间</div>
      <div @click="closeRoom">退出房间</div>
      <div @click="audioBtn">{{ mute.audio?"开":"关" }}声音</div>
      <div @click="videoBtn">{{ mute.video?"开":"关" }}视频</div>
      <div v-for="item in userList" :key="item.userId" @click="unTakeStream(item)">{{ item.takeType?'取消':'' }}订阅-{{ item.userId }}</div>
    </div>
    <div ref="video" class="video" />
  </div>
</template>

<script>
import * as QNRTC from 'pili-rtc-web'
export default {
    name: 'LiveDemo',
    data() {
        return {
            myRoom: null,
            mute: {
                audio: false,
                video: false
            },
            userList: []
        }
    },
    created() {
        console.log('初始化')
        this.myRoom = new QNRTC.StreamModeSession()
        // 关闭 SDK 的 console 打印
        QNRTC.log.setLevel('disable')
    },
    destroyed() {
        // 销毁
        this.gatherStream(false)
    },
    methods: {
        openRoom() {
            this.deviceEvnt()
            this.init()
        },
        closeRoom() {
            this.gatherStream(false)
        },
        audioBtn() {
            this.mute.audio = !this.mute.audio
            this.setMute()
        },
        videoBtn() {
            this.mute.video = !this.mute.video
            this.setMute()
        },
        kickout(item) {
            console.log(item.userId)
            this.getOutUser(item.userId)
        },
        async init() {
            await this.addRoom()
            await this.gatherStream()
        },
        // 加入房间 需要roomToken
        async addRoom() {
            const roomToken = 'QxZugR8TAhI38AiJ_cptTl3RbzLyca3t-AAiH-Hh:polXZtbcHLhPpTUov0Lfw26G6Lc=:eyJhcHBJZCI6ImQ4bGs3bDRlZCIsInJvb21OYW1lIjoid3d3IiwidXNlcklkIjoiMTIzMTIzIiwiZXhwaXJlQXQiOjE1ODk5NTM0MzAyNDQ2ODQ1NTgsInBlcm1pc3Npb24iOiJ1c2VyIn0='
            await this.myRoom.joinRoomWithToken(roomToken)
            await this.realTimeUser()
            console.log('成功加入房间')
        },
        // 管理员踢人
        async getOutUser(userId) {
            await this.myRoom.kickoutUser(userId)
        },
        // 离开房间 可以配合浏览器的 onbeforeunload 事件在每次页面即将被关闭或者刷新时自动离开房间
        outRoom() {
            console.log('销毁房间')
            this.myRoom.leaveRoom()
        },
        // 发起一次本地流采集 type:true采集发布音视频  false 销毁音视频取消发布并退出房间
        async gatherStream(type = true) {
            if (!QNRTC.deviceManager) {
                console.log('未查找到音视频设备')
            } else {
                try {
                    const stream = await QNRTC.deviceManager.getLocalStream({
                        audio: { enabled: true },
                        video: { enabled: true }
                    })
                    if (type) {
                        console.log('得到本地流!并发布')
                        this.playStream(stream)
                        this.publish(stream)
                    } else {
                        // this.publish('', false)
                        this.userList = []
                        this.releaseStream(stream)
                        this.outRoom()
                    }
                } catch (e) {
                    alert('设备连接不正常')
                }
            }
        },
        // 播放流媒体 stream 订阅采集的流媒体
        playStream(stream) {
            const videoDom = this.$refs['video']
            stream.play(videoDom, false)
            console.log('播放流')
        },
        // 销毁采集 如若不销毁会一直占用摄像头
        releaseStream(stream) {
            console.log('释放流采集')
            stream.release()
        },
        // 发布本地流媒体 type:true发布本地流 false 取消发布 不会销毁本地采集
        async publish(stream, type = true) {
            if (type) {
                console.log('发布流')
                await this.myRoom.publish(stream)
                this.setMute()
            } else {
                // 取消发布
                console.log('取消发布流')
                await this.myRoom.unpublish()
            }
        },
        // 设置发布的 音视频状态 1 音频 2 视频
        setMute() {
            const { audio, video } = this.mute
            this.myRoom.mute(audio, video)
        },

        /*
        * 订阅和取消订阅远端的用户
        */
        // 实时检测用户发布状态
        realTimeUser() {
            // 房间当前的用户列表
            const users = this.myRoom.users
            this.addUsers(users)
            for (const user of users) {
                // 每个用户当前是否发布
                if (user.published) {
                    this.takeStream(user.userId)
                }
            }

            this.myRoom.on('user-publish', user => {
                // 房间里有新的用户发布
                console.log(user, '有新用户发布')
                this.addUsers([user])
                const userId = user.userId
                this.takeStream(userId)
            })

            this.myRoom.on('user-unpublish', user => {
                // 房间里有新的用户取消发布
                this.addUsers([user], false)
                console.log(user, `用户${user.userId}退出房间`)
            })
        },
        // 发起订阅
        async takeStream(userId) {
            // 取出每个 TrackInfo 的 userid 当作参数发起订阅
            console.log('发起订阅')
            const stream = await this.myRoom.subscribe(userId)
            await this.playStream(stream)
        },
        // 取消订阅
        async unTakeStream(item) {
            // 传入 trackId，取消订阅，注意参数是一个列表
            if (item.takeType) {
                await this.myRoom.unsubscribe(item.userId)
                item.takeType = false
            } else {
                await this.takeStream(item.userId)
                item.takeType = true
            }
        },
        // 用户增加 type:true 增加 false 删除
        addUsers(arr = [], type = true) {
            const list = this.userList
            if (type) {
                arr.forEach(item => {
                    item['takeType'] = true
                    const bo = list.some(ls => {
                        return ls.userId === item.userId
                    })
                    if (!bo) {
                        this.userList.push(item)
                    }
                })
            } else {
                arr.forEach((item, index) => {
                    list.forEach((ls, inx) => {
                        if (item.userId === ls.userId) {
                            this.userList.splice(inx, 1)
                        }
                    })
                })
            }
        },
        // 设备事件监听
        deviceEvnt() {
            QNRTC.deviceManager.on('device-add', info => {
                // 新媒体设备插入
                console.log(info, '新媒体设备插入')
            })
            QNRTC.deviceManager.on('device-remove', info => {
                // 新媒体设备拔出
                console.log(info, '新媒体设备拔出')
            })
            QNRTC.deviceManager.on('device-update', info => {
                // 媒体设备列表更新
                console.log(info, '媒体设备列表更新')
            })
        }

    }
}
</script>

<style scoped lang="less">
    .video{
        width: 300px;
        height: 300px;
        display: flex;
    }
    .btnBox{
        display: flex;
        &>div{
            padding: 10px 20px;
            border-radius: 4px;
            margin-right: 15px;
            background-color: #7d779c;
            color: white;
            &:hover{
                cursor: pointer;
                opacity: .8;
            }
        }
    }
</style>
