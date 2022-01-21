const request = require('supertest');

const {
    API_HOST
} = require('./config');

//Aqui probaremos consultas al endpoint de users
describe('GET /users',()=>{

    //Revisamos si el status code es 200.
    it('Revisar status code 200', ()=>{

        return request(`${API_HOST}`)
            .get('/users/337')
            .send()
            .expect(200);

    });

    //Revisamos si el status code es 200 y si el content type es json.
    it('Revisar status code 200 en json', ()=>{

        return request(`${API_HOST}`)
            .get('/users/337')
            .send()
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200);

    });

    //Revisamos si el status code es 404 not found.
    it('Revisar status code 400', ()=>{

        return request(`${API_HOST}`)
            .get('/users/0')
            .send()
            .expect(404);

    });
    
    //Verificamos si la data devuelta es lo que esperabamos / Sin usar async/await.
    it('Revisar contenido', ()=>{

        const compare={
            "meta":null,
            "data":{
                "id": 337,
                "name": "Siddhran Embranthiri",
                "email": "siddhran_embranthiri@schoen.net",
                "gender": "female",
                "status": "inactive"
            }
        }
        
        //Hago el request y comparo si tiene el mismo formato que espero.
        return request(`${API_HOST}`)
            .get('/users/337')
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
                "id": 337,
                "name": "Siddhran Embranthiri",
                "email": "siddhran_embranthiri@schoen.net",
                "gender": "female",
                "status": "inactive"
            }
        };
        
        //Hago el request y comparo si tiene el mismo formato que espero.
        return request(`${API_HOST}`)
            .get('/users/337')
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
                "id": 1000,
                "name": "Kiran Nehru",
                "email": "kiran_nehru@dubuque.co",
                "gender": "female",
                "status": "active"
            }
        };
        
        //Hago el request.
        const response = await request(`${API_HOST}`).get('/users/1000');            
        expect(response.body).not.toBeNull();
        expect(response.body).toEqual(compare);

    });         

});