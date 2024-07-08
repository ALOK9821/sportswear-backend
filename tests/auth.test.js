const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
    it('it should register a user', (done) => {
        let user = {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password'
        };
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
    });

    it('it should not register a user with the same email', (done) => {
        let user = {
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password'
        };
        chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').eql('User already exists');
                done();
            });
    });

    it('it should login a user', (done) => {
        let user = {
            email: 'testuser@example.com',
            password: 'password'
        };
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
                done();
            });
    });

    it('it should not login a user with incorrect password', (done) => {
        let user = {
            email: 'testuser@example.com',
            password: 'wrongpassword'
        };
        chai.request(server)
            .post('/api/auth/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').eql('Invalid Credentials');
                done();
            });
    });
});