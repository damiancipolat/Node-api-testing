const request = require('supertest');

const {
    API_HOST,
    API_TOKEN
} = require('./config');

//Aqui probaremos crear recursos en el endpoint de users.
describe('DELETE /users',()=>{

    //Probamos borrar usuario que no existe.
    it('Borrar usuario - no existe',async ()=>{

        //Aqui creamos el bodt mock.
        const mockBody = {
            "name":"Robo mock",
            "gender":"male", 
            "email":`${new Date().getTime()}.mock@mock.com`, 
            "status":"active"
        };
        
        //Borro el usuario.
        const deleted = await request(`${API_HOST}`)
            .delete(`/users/0`)
            .send(mockBody)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${API_TOKEN}`);
        
        expect(deleted.status).toBe(404);

    });

    //Probamos crear y borrar usuario.
    it('Borrar usuario',async ()=>{

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

        //Borro el usuario.
        const deleted = await request(`${API_HOST}`)
            .delete(`/users/${id}`)
            .send(mockBody)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${API_TOKEN}`);
        
        //Valido respuestas.
        expect(creation.status).toBe(201);
        expect(deleted.status).toBe(204);

    });

});