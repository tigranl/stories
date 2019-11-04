import { Injectable, Inject } from '@nestjs/common';
import {Storage} from './utils';
import { StoryDTO } from './story.dto';

@Injectable()
export class AppService {
  constructor(
      @Inject(Storage)
      private readonly stories: Storage
  ) {}

  async createStory(story: StoryDTO ): Promise<any> {
    return await this.stories.createStories(story);
  }

  async getStories(): Promise<any> {
    return await this.stories.getStories();
  }

  async updateStory(id: string, story: StoryDTO): Promise<any> {
    return await this.stories.updateStory(Number(id), story);
  }
}
