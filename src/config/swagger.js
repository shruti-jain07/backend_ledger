const swaggerJsDoc=require("swagger-jsdoc")

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Backend Ledger API",
            version:"1.0.0",
            description:"A secure financial transaction backend built using Node.js, Express, MongoDB, and Ledger Architecture.",
        },
        
        servers:[
            {
                url:"http://localhost:3000/api"
            }
        ]
    },

    apis:["./src/routes/*.js"]
}

const swaggerSpec=
swaggerJsDoc(options)

module.exports=swaggerSpec