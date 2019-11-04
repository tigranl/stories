import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { StoryDTO } from './story.dto';

@Injectable()
export class Storage {
    storage: Promise<Buffer>;
    constructor() {
        this.storage = Storage.readFile();
    }

    async createStories(story: StoryDTO): Promise<any> {
        const newStoryID = this.newID();
        await newStoryID
            .then(newID => (this.getStories()
            .then(stories => (stories.push({...{id: newID}, ...story})))))
            .then(() => this.saveData());
        return await newStoryID.then( newID => ({id: newID}));
    }

    async updateStory(storyID: number, story: StoryDTO): Promise<any> {
        return await this.getStories()
            .then((stories) => {
                if ( storyID > stories.length) {
                    throw new Error('ID is out of range');
                } else {
                    return stories;
                }
            })
            .then(stories => stories.find((j, i) => {
                if (j.id === storyID) {
                    stories[i] = {...{id: storyID}, ...story};
                }
            }))
            .then(() => this.saveData())
            .then(() => ({status: 'successful'}));
    }

    async newID(): Promise<any> {
        return this.storage.then(data => data.length + 1);
    }

    async getStories(): Promise<any> {
        return this.storage;
    }

    async saveData(): Promise<any> {
        return await this.getStories()
            .then(async stories => await Storage.writeToFile(stories));
    }

    static async readFile(): Promise<any> {
        return await fs.promises.readFile('data/data.json')
            .then(data => JSON.parse(data.toString()))
            .catch(() => []);
    }
    static async writeToFile(content): Promise<any> {
        return await fs.promises.writeFile('data/data.json', JSON.stringify(content), 'utf-8');
    }
}
