const expect = require('expect')
const supertestRequest = require('supertest')

const { app } = require('../server')
const { Todo } = require('../models/Todo')


// wipe out all the data of todo from db 
beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {

        var todo = new Todo({
            text: "My test",
            completed: true,
            completedAt: 12568
        });

        supertestRequest(app)
            .post('/todos')
            .send(todo)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todo.text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(todo.text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('Should not create todo with invalid body data', (done) => {
        supertestRequest(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));

            });
    });


});


// get all data text case
// describe('GET /todos',()=>{
//     it('should get all todos',(done)=>{
//         supertestRequest(app)
//         .get('/todos')
//         .expect(200)
//         .expect((res)=>{
//             expect(res.body.todos.length).toBe(2);
//         })
//         .end(done)
//         .catch((e) => done(e));
//     })
// })