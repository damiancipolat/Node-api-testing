const request = require('supertest');

const {
    API_HOST,
    API_TOKEN
} = require('./config');

//Aqui probaremos crear recursos en el endpoint de users.
describe('UPDATE /users',()=>{

    //Probamos borrar usuario que no existe.
    it('Actualizar usuario - no existe',async ()=>{

        //Aqui creamos el bodt mock.
        const mockBody = {
            "name":"Robo mock",
            "gender":"male", 
            "email":`${new Date().getTime()}.mock@mock.com`, 
            "status":"active"
        };
        
        //Borro el usuario.
        const deleted = await request(`${API_HOST}`)
            .put(`/users/0`)
            .send(mockBody)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${API_TOKEN}`);
        
        expect(deleted.status).toBe(404);

    });

    //Probamos crear y borrar usuario.
    it('Actualizar usuario',async ()=>{

        //Aqui creamos el bodt mock.
        const mockBody = {
            "name":"Robo mock",
            "gender":"male", 
            "email":`${new Date().getTime()}.mock@mock.com`, 
            "status":"active"
        };

        //Creo el usuario.
        const creation = await request(`${API_HOST}`)
            .post('/users')
            .send(mockBody)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${API_TOKEN}`);
        
        //Obtengo el id.
        const {
            id
        } = creation.body.data;


        //Mock para actualizar.
        const mockUpdate = {
            "email":`pepito-${new Date().getTime()}.mock@mock.com`
        };

        //Borro el usuario.
        const updated = await request(`${API_HOST}`)
            .put(`/users/${id}`)
            .send(mockUpdate)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${API_TOKEN}`);

        //Valido respuestas.
        expect(creation.status).toBe(201);
        expect(updated.status).toBe(200);

    });

});