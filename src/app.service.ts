import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Story } from './story.entity';
import { StoryDTO } from './story.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(Story)
      private readonly stories: Repository<Story>
  ) {}

  async createStory(story: StoryDTO ): Promise<any> {
    return this.stories.save(story).then(result => ({id: result.id}) );
  }

  async getStories(): Promise<any> {
    return await this.stories.find();
  }

  async updateStory(id: string, story: StoryDTO): Promise<any> {
    return await this.stories.update(Number(id), story);
  }
}
