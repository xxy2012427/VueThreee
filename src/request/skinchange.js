//将colorData的数据正好写成三个class名 使用的时候就可以直接item用
const skinState = reactive({
    data: ['back1', 'back2', 'back3'],
    curSkin: 'back1',
    change: (item: string) => {
        skinState.curSkin = item
    }
})
