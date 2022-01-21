const request = require('supertest');
const HOST = 'https://gorest.co.in/public/v1';
const ACCESS_TOKEN='7120040c271b489d96c82450b17643a738ad8cb36739c8998bada84923cf25bb';

//Aqui probaremos consultas al endpoint de users
describe('GET /users',()=>{

    //Revisamos si el status code es 200.
    it('Revisar status code 200', ()=>{

        return request(`${HOST}`)
            .get('/users/3379')
            .send()
            .expect(200);

    });

    //Revisamos si el status code es 200 y si el content type es json.
    it('Revisar status code 200 en json', ()=>{

        return request(`${HOST}`)
            .get('/users/3379')
            .send()
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200);

    });

    //Revisamos si el status code es 404 not found.
    it('Revisar status code 400', ()=>{

        return request(`${HOST}`)
            .get('/users/0')
            .send()
            .expect(404);

    });
    
    //Verificamos si la data devuelta es lo que esperabamos / Sin usar async/await.
    it('Revisar contenido', ()=>{

        const compare={
            "meta":null,
            "data":{
                "id":3379,
                "name":"Oscar Rosenbaum",
                "email":"eneida.kemmer@yahoo.com",
                "gender":"female",
                "status":"active"
            }
        }
        
        //Hago el request y comparo si tiene el mismo formato que espero.
        return request(`${HOST}`)
            .get('/users/3379')
            .expect(function(response){
                expect(response.body).not.toBeNull();
                expect(response.body).toEqual(compare); 
            });
    });

    //Verificamos si la data devuelta es lo que esperabamos / Sin usar async/await.
    it('Revisar contenido 1', ()=>{

        const compare={
            "meta":null,
            "data":{
                "id":3379,
                "name":"Oscar Rosenbaum",
                "email":"eneida.kemmer@yahoo.com",
                "gender":"female",
                "status":"active"
            }
        };
        
        //Hago el request y comparo si tiene el mismo formato que espero.
        return request(`${HOST}`)
            .get('/users/3379')
            .expect(function(response){
                expect(response.body).not.toBeNull();
                expect(response.body).toEqual(compare); 
            });
    });


    //Verificamos si la data devuelta es lo que esperabamos / Usando async await.
    it('Revisar contenido 2', async ()=>{

        const compare={
            "meta":null,
            "data":{
                "id":1000,
                "name":"Deeptimayee Sethi ",
                "email":"deeptimayee_sethi@gmail.com",
                "gender":"female",
                "status":"inactive"
            }
        };
        
        //Hago el request.
        const response = await request(`${HOST}`).get('/users/1000');            
        expect(response.body).not.toBeNull();
        expect(response.body).toEqual(compare);

    });         

});

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

        return request(`${HOST}`)
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

        return request(`${HOST}`)
            .post('/users')
            .send(mockBody)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
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
        return request(`${HOST}`)
            .post('/users')
            .send(mockBody)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${ACCESS_TOKEN}`)
            .expect(201)
            .expect(function(response){
                expect(response.body).not.toBeNull();
                expect(response.body.data).not.toBeNull();
                expect(response.body.data).toMatchObject(mockBody); //Probamos si es similar no igual!
            });

    });

});