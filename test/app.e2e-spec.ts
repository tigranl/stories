import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AppService} from '../src/app.service';
import { INestApplication } from '@nestjs/common';

describe('App', () => {
  let app: INestApplication;
  const appService = {
    getStories: () => [{
      id: 1,
      title: 'title',
      author: 'author',
      message: 'message'
    }],
    createStory: () => ({id: 1}),
    updateStory: () => ({status: 'success'})
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
        .overrideProvider(AppService)
        .useValue(appService)
        .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET stories`, () => {
    return request(app.getHttpServer())
        .get('/stories')
        .expect(200)
        .expect(
            appService.getStories()
        );
  });

  it('POST /story', () => {
    return request(app.getHttpServer())
        .post('/story')
        .send({
          title: 'title',
          author: 'author',
          message: 'message'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .expect(
            appService.createStory()
        )
  });

  it('PUT /story/<id>', () => {
    return request(app.getHttpServer())
        .put('/story/1')
        .send({
          title: 'new title',
          author: 'author',
          message: 'message'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(
            appService.updateStory()
        )
  });
  afterAll(async () => {
    await app.close();
  });
});
