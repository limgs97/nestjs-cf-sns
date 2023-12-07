import { Injectable, NotFoundException } from '@nestjs/common';

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
  getAllPost() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post: PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  updatePost(postId: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === +postId);

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

    posts = posts.map((prevPost) =>
      prevPost.id === +postId ? post : prevPost,
    );

    return post;
  }

  deletePost(postId: number) {
    const post = posts.find((post) => post.id === +postId);

    if (!post) {
      throw new NotFoundException();
    }

    posts = posts.filter((post) => post.id !== +postId);

    return postId;
  }
}
