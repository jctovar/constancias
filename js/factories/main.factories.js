angular.module('main.auth', ['ngResource', 'base64'])

.factory("auth", function ($location, $http, $base64, login) {
    return{
        login : function (username, password) {
           
            var query = login.get({ id: username, password:  password }, function () {
                if (query.login[0] && query.login[0].user_email) {
                    sessionStorage.email = query.login[0].user_email;
                    sessionStorage.id = query.login[0].user_id;
                    sessionStorage.name = query.login[0].user_name;
                    sessionStorage.rol = query.login[0].rol_id;
                    sessionStorage.school = query.login[0].school_id;
                    //mandamos al dashboard
                    $location.path("/dashboard");
                } else {
                    console.log('error, not found');
                    $location.path("/login");
                }
            });
              
        },
        logout : function () {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            sessionStorage.clear();
            //mandamos al login
            $location.path("/");
        },
        checkStatus : function () {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["dashboard","profile","password","students","teachers","courses","student","teacher","course"];
            console.log('this path; ' + $location.path());
            console.log(sessionStorage.id);
            
            if(this.in_array($location.path(),rutasPrivadas) && typeof(sessionStorage.id) == "undefined")
            {
                $location.path("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if(this.in_array($location.path(),["/login"]) && typeof(sessionStorage.id) != "undefined")
            {
                $location.path("/dashboard");
            }
        },
        in_array : function(needle, haystack)
        {
            var needle = needle.replace(/([/][0-9]*)/g, "");
            var key = '';
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
            return false;
        }
    }
});