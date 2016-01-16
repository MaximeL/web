'use strict';

/**
 * @ngdoc function
 * @name webClientSideApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientSideApp
 */
angular.module('webClientSideApp')
  .controller('MainCtrl', function ($scope , $notification , user) {
    $scope.username = "passss@@";
    $scope.password = "bououououf";

    $scope.signup = {

      username : "",
      mail : "",
      password : ""
    }

    $scope.logged = false;

    $scope.login = {
      pseudo : "",
      password : ""
    }

   /**
      une manière d'necrypter les données du user : nom , mot de passe , email ......
      Lien vers la personne à qui j'ai piqué le code :) : http://spaghetti.io/cont/article/angularjs-and-basic-auth/12/1.html#.VpaxtFnb_HY
      "il est open source"
   **/

     $scope._base64 = {
    _keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=$scope._base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},
    decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=$scope._base64._utf8_decode(t);return t},
    _utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},
    _utf8_decode:function(e){var t="";var n=0;var r=0 , c1=0,c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}
    }



    $scope.userDataEncrypted = $scope._base64.encode( $scope.password);
    $scope.userDataDecrypted = $scope._base64.decode( $scope.userDataEncrypted);
    console.log("encrypted : " + $scope.userDataEncrypted);
    console.log("decrypted : " + $scope.userDataDecrypted);


      /**
      chech login befor signin
      */
     $scope.checkLogin = function(){
      if($scope.login.pseudo === "user" && $scope.login.password === "user"){
        $scope.logged = true;
        $notification.success("login", "connected with " + $scope._base64.encode($scope.login.peudo + ":" + $scope.login.password));
       
      }
      else{
        $notification.error("login", "refused");
        console.log('kokok');
      }
    }

    /**
    create a new user and stor it in DB
    */
    $scope.createUser = function(){
      if($scope.signup.username != $scope.signup.mail != $scope.signup.password != null){
            user.createUser($scope.signup);
            $notification.success("signup" ,  "user : " + $scope.signup.username + " created")
      }
    };

  });
