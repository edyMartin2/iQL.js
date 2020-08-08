var iql = new iQl();
var data = {
    updateUser : {
        data:{
            get:["name","apellido"],
            set:["edgar","valerio"],
            type:"update"
        },
        where:{
            data:"name",
            value:"ujj"
        },
        table:"users"    
    },

    setUser :  {
        data:{
            get:["nombre","apellido"],
            set:["edgar", "valerio"],
            type:"add"
        },
        table:"users"
    },
    
    getUser: {
        data:["nombre","apellido"],
        where:{
            data:"name",
            value:"ujj"
        },
        table:"users"
    }
}
