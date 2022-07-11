export default function hasPermission(params) {
  let tag = false // 表示是否有权限
  const codeList = JSON.parse(sessionStorage.getItem('codeList'))
  // 循环遍历权限字段列表
  for (let i = 0; i < codeList.length; i++) {
    // 判断当前权限字段是否与参数传递过来的字段一致
    if (codeList[i] === params) {
      tag = true
      break
    }
  }
  return tag
}
