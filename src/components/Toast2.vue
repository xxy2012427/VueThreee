<template>
      <div class="context" v-show="isshow">
        <span class="tip">{{ text }}</span>
      </div>
</template>

<script>
    export default {
        name: "Toast2",
        props: {
            isshow: {
                type: Boolean,
            },
            text: {
                type: String,
            },
        },
        watch: {
            isshow(val) {
                if (val === true) {
                    setTimeout(() => {
                        this.isshow = false;
                    }, 3000);
                }
            },
        },
    };
</script>
<style lang="less" scoped>
    .context {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        .tip {
            background-color: rgba(40, 40, 40, 0.8);
            color: aliceblue;
            font-size: 0.6rem;
            padding: 0.2rem;
            border-radius: 0.1rem;
        }
    }
</style>
