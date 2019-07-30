import fetch from 'isomorphic-fetch'
const func = require('od-utility')
const md5 = require('md5')
require('es6-promise').polyfill()
async function request(method, base_url, path, pack, app_pack = {}) {

  //add signature
  const magic_num = Math.ceil(Math.random() * 4000) + 1
  const { app_token, app_key } = app_pack;
  if (!app_token) func.throwErrorWithMissingParam('app_token')
  if (!app_key) func.throwErrorWithMissingParam('app_key')
  const sig_body = `${magic_num}${method.toUpperCase()}/${path}${JSON.stringify(pack)}${app_token}${app_key}`
  const signature = md5(sig_body)
  try {
    return await fetch(`${base_url}/${path}`, {
      method,
      body: pack,
      headers: { signature, magic_num, app_token }
    }).then(async res => {
      const tempBody = await res.json();
      if (!tempBody.status) func.throwError(tempBody.message, res.status);
      return tempBody;
    })
  } catch (err) {
    console.log(err)
    throw err;
  }
}

export default request;