import {getRoleSelect} from '../../api/system/role'

function roleSelect () {
  let roleList = []
  roleList.push({value: '', label: '--请选择--'})
  getRoleSelect().then(res => {
    let dataList = res.data.data
    for (let i = 0; i < dataList.length; i++) {
      roleList.push(dataList[i])
    }
  })
  return roleList
}
export default {roleSelect}
