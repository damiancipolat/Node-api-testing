const request = require('supertest');

const {
    API_HOST,
    API_TOKEN
} = require('./config');

//Aqui probaremos crear recursos en el endpoint de users.
describe('POST /users',()=>{

    //Probamos crear un usuario valido solo status code 401
    it('Crear usuario 1 - sin acceso',()=>{

        //Aqui creamos el bodt mock.
        const mockBody = {
            "name":"Pepito modo 122",
            "gender":"male", 
            "email":`${new Date().getTime()}.mock@15ce.com`, 
            "status":"active"
        };

        return request(`${API_HOST}`)
            .post('/users')
            .send(mockBody)
            .set('Accept', 'application/json')
            .expect(401);

    });

    //Probamos crear un usuario valido solo status code 201
    it('Crear usuario 2',()=>{

        //Aqui creamos el bodt mock.
        const mockBody = {
            "name":"Pepito modo 122",
            "gender":"male", 
            "email":`${new Date().getTime()}.mock@15ce.com`, 
            "status":"active"
        };

        return request(`${API_HOST}`)
            .post('/users')
            .send(mockBody)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${API_TOKEN}`)
            .expect(201);

    });

    //Probamos crear un usuario verifico respuesta
    it('Crear usuario 3',()=>{

        //Aqui creamos el bodt mock.
        const mockBody = {
            "name":"Pepito modo 122",
            "gender":"male", 
            "email":`${new Date().getTime()}.mock@15ce.com`, 
            "status":"active"
        };

        //Verificamos status code y si la respuesta del objeto es similar al mock.
        return request(`${API_HOST}`)
            .post('/users')
            .send(mockBody)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${API_TOKEN}`)
            .expect(201)
            .expect(function(response){
                expect(response.body).not.toBeNull();
                expect(response.body.data).not.toBeNull();
                expect(response.body.data).toMatchObject(mockBody); //Probamos si es similar no igual!
            });

    });

});