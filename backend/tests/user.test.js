import request from 'supertest';
import app from '../index.js'; // Asumiendo que index.js exporta la aplicación express como `app`

// test get all reports
describe("GET /api/reports", () => {
    it('response with json containing a list of all reports', done => {
        request(app)
            .get('/api/reports') 
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('/GET /player/:id', () => {
    it('response with json containing a player', done => {
        request(app)
            .get('/player/65fc1f3608cb47ede02b056d')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('PUT /player/:id', () => {
    it('responds with 200 OK', done => {
        const playerIdToUpdate = '65fc1f3608cb47ede02b056d';
        const updatedPlayerData = {
            nationality:"Alemania"
        };
        request(app)
            .put(`/player/${playerIdToUpdate}`)
            .send(updatedPlayerData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /player', () => {
    it('responds with 201 created', done => {
        const newPlayer = {
            name: "Manuel Martinez",
            age: 22,
            actualTeam: "Factoria F5",
            photo: "https://www.istockphoto.com/photo/sports-soccer-and-black-man-kick-ball-playing-game-training-and-exercise-on-outdoor-gm1482832137-509631944?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fes%2Fimages%2Fsearch%2Ffutbolistas%2F&utm_term=futbolistas",
            dorsal: 8,
            nationality:"Alemania",
            position: "portero",
            weight: "70",
            height: "1.70",
            strongFoot: "Ambas"

        };
        request(app)
            .post('/player')
            .send(newPlayer)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});

describe('DELETE /player/:id', () => {
    it('responds with 200 no content"Registro eliminado correctamente"', done => {
        const playerIdToDelete = '6601a0886c4b458bec1ca769';
        request(app)
            .delete(`/player/${playerIdToDelete}`)
            .expect(200).end((err, res) => {
                if (err) return done(err);
                console.log('Registro eliminado correctamente');
                done();
            })
    });
});