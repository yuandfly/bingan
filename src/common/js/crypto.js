/**
 * 使用AES加密工具类
 */
import CryptoJS from 'crypto-js'

/**
 * 用户角色工具
 */
let user={};

export default {
	user,
    setUser(para){
        this.user = para;
    },
    getRoleStaffId(){
        return this.user.roleId!=0 ? this.user.staffId : "";
    },

//密码md5加密
  MD5(str){
      console.log(str);
	  if (str) {
          const PASSWORD_KEY = "o2aeyMl84e";
          return CryptoJS.MD5(CryptoJS.MD5(PASSWORD_KEY) + PASSWORD_KEY + CryptoJS.MD5(str.trim())).toString();
      }
  },

  //加密
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  },
  //解密
  decrypt( word, keyStr) {
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var decrypt = CryptoJS.AES.decrypt(  word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },

    getUserInfo () {
        return JSON.parse(this.decrypt(sessionStorage.getItem('sessionUser')));
    }

}
