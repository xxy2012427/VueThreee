/**
 * @function 获取去css图标的class类名
 * @param {string} prefix 区分字体图标的前缀,例如：.icon-
 * @param {string} [fullIcon=''] 是否需要图标的class全名,例如：iconfont
 * @returns {arr}
 * @example initIcon(".icon-","iconfont").then((res)=>{console.log(res);})
 */
const initIcon = (prefix, fullIcon = '') => {
    return new Promise((resolve, reject) => {
        const regx = /\:before/;   //用于正则匹配有伪类:before的class名
        const styles = document.styleSheets;
        let sheetsIconList = [];
        for (let i = 0; i < styles.length; i++) {
            for (let j = 0; j < styles[i].cssRules.length; j++) {
                let cText = styles[i].cssRules[j].selectorText;
                // 判断是对应前缀开头、是否有::before伪类
                if (
                    cText &&
                    cText.indexOf(prefix) === 0 &&
                    regx.test(cText)
                ) {
                    // 清空前面的.和后面的::before,例如.el-icon-info::before=>el-icon-info
                    // /\./gi  替换.为空。/\:\:before/gi  将::before去除。
                    // /\[data-v-(.+?)\]/gi
                    let classname = cText.replace(/\./gi, "").replace(/\:\:before/gi, "")
                    // 可能有fa-close,fa-close-o的这种情况
                    if (cText.indexOf(",") > 0) {
                        let m = classname.split(","), m2 = [];
                        if (fullIcon) {
                            for (let a = 0; a < m.length; a++) {
                                m2.push(fullIcon + ' ' + m[a].replace('.', "").trim())
                            }
                        } else {
                            m2 = m;
                        }
                        sheetsIconList.push(...m2);
                    } else {
                        if (fullIcon) {
                            classname = fullIcon + ' ' + classname
                        }
                        sheetsIconList.push(classname);
                    }
                }
            }
        }
        if (sheetsIconList.length > 0) {
            // 得到数组后，先去重一下在将数组返回出去,避免有重复的class
            sheetsIconList = [...new Set(sheetsIconList)]
            resolve(sheetsIconList);
        } else{
            reject("未获取到值，请刷新重试");
        }
    });
}

// 导出方法
export default initIcon;
