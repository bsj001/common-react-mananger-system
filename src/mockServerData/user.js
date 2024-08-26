export default {
  getUserList: config => {

    /* const { name, page = 1, limit = 20 } = param2Obj(config.url)
    const mockList = list.filter(user => {
      if (name && user.name.index(name) === -1 && user.addr.index(name) === -1) return false
      return true
    })

    const pageList = mockList.filter((item,index) =>index < limit * page && index >= limit*(page-1))
 */
    return {
      code: 200,
      count: 1,
      list: [{
        id: 1,
        name: 'lisa',
        age: 18,
        gender: 1
      }]
    }
  }
}