require('../css/index.styl')


let { file_name } = require('./utils')
console.log(file_name)

import avatar_src from '../img/avatar.jpeg'

let avatar = new Image()
avatar.width = 200
avatar.src = avatar_src
document.body.appendChild(avatar)