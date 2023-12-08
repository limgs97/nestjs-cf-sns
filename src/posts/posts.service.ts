import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: '111',
    title: 'sbwlstm alswl',
    content: 'apdlzmdjq rhclrh dlTSms altswl',
    likeCount: 1000000,
    commentCount: 99999,
  },
  {
    id: 2,
    author: '111',
    title: 'dhvltufdls',
    content: 'apdlzmdjq rhclrh dlTSms altswl',
    likeCount: 1000000,
    commentCount: 99999,
  },
  {
    id: 3,
    author: '111',
    title: 'qfkvmvm',
    content: 'apdlzmdjq rhclrh dlTSms altswl',
    likeCount: 1000000,
    commentCount: 99999,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postRepository: Repository<PostModel>,
  ) {}

  async getAllPost() {
    const posts = await this.postRepository.find();
    return posts;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
    });

    if (!posts) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(author: string, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)

    const post = this.postRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postRepository.save(post);

    return newPost;
  }

  async updatePost(
    postId: number,
    author: string,
    title: string,
    content: string,
  ) {
    // save 기능
    // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면 (같은 id 값이 존재한다면) 존재하던 값을 업데이트한다.

    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postRepository.delete(postId);

    return postId;
  }
}
