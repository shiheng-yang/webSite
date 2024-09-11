// 格式化操作栏按钮宽度
export function formatBtnWidth() {
  let width = 120 // 默认宽度
  let paddingSpacing = 5 // 默认边距
  let btnCount = 0 // 按钮数量
  let btnDom = document.getElementsByClassName('btnList') // 获取操作栏按钮容器
  if (btnDom.length) {
    // [...btnDom]转数组
    var btnDomArray = [...btnDom]
    btnDomArray.forEach((v) => {
      // 最大宽度
      if (width < v.offsetWidth) width = v.offsetWidth
      // 按钮数量
      const buttons = v.getElementsByClassName('el-button--small').length
      if (btnCount < buttons) btnCount = buttons
    })
    // 如果按钮数量大于2，宽度要加上边距
    if (btnCount > 1) {
      width += paddingSpacing * btnCount * 2 + 1
    }
  }
  return width
}
