const nock = require('nock');
const supertest = require('supertest');
const chai = require('chai');
const app = require('../app');

const expect = chai.expect;

describe('POST /api/get-recommendations', () => {
    it('should return recommendations when OpenAI API returns valid data', (done) => {
        nock('https://api.openai.com')
            .post('https://api.openai.com/v1/engines/davinci/completions')
            .reply(200, {
                choices: [
                    { text: " Place 1, Place 2, Place 3" }
                ]
            });

        supertest(app)
            .post('/api/get-recommendations')
            .send({ lat: null, lng: null })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('array');
                expect(res.body).to.eql(['Place 1', 'Place 2', 'Place 3']);
                done();
            });
    });

    it('should return 500 if OpenAI API call fails', (done) => {
        nock('https://api.openai.com')
            .post('/v1/engines/text-davinci-003/completions')
            .replyWithError('an error');

        supertest(app)
            .post('/api/get-recommendations')
            .send({ lat: null, lng: null })
            .expect(500, done);
    });
});
