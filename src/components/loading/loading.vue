<template>
  <div id="loading">
    <div id="loading-center">
      <div id="loading-center-absolute">
        <div id="object_one" class="object" />
        <div id="object_two" class="object" />
        <div id="object_three" class="object" />
        <div id="object_four" class="object" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style scoped lang="less">
    #loading{
        background-color: rgba(0,0,0,.4);
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 999;
        margin-top: 0px;
        top: 0px;
        left: 0;
    }
    #loading-center{
        width: 100%;
        height: 100%;
        position: relative;
    }
    #loading-center-absolute {
        position: absolute;
        left: 50%;
        top: 50%;
        height: 100px;
        width: 50px;
        margin-top: -50px;
        margin-left: -25px;
    }
    .object{
        width: 50px;
        height: 8px;
        margin-bottom:15px;
        background-color: #FFF;
        -webkit-animation: animate 0.8s infinite;
        animation: animate 0.8s infinite;
    }

    #object_two {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;

    }
    #object_four {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
    }
    @-webkit-keyframes animate {

        50% {
            -ms-transform: translate(50%,0);
            -webkit-transform: translate(50%,0);
            transform: translate(50%,0);
        }
    }

    @keyframes animate {
        50% {
            -ms-transform: translate(50%,0);
            -webkit-transform: translate(50%,0);
            transform: translate(50%,0);
        }
    }
</style>
