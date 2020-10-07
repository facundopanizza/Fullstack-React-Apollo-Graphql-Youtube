import { Post } from '../entities/Post';
import { Arg, Field, Int, Mutation, ObjectType, Query } from 'type-graphql';
import FieldError from '../utils/FieldError';

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@ObjectType()
export class PostResolver {
  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post)
  post(@Arg('id', () => Int) id: number) {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  createPost(
    @Arg('title') title: string,
    @Arg('description') description: string
  ): Promise<Post> {
    return Post.create({ title, description }).save();
  }

  @Mutation(() => PostResponse)
  async updatePost(
    @Arg('id', () => Int) id: number,
    @Arg('title') title: string,
    @Arg('description') description: string
  ): Promise<PostResponse> {
    const post = await Post.findOne(id);

    const errors = [];

    if (!post) {
      return {
        errors: [{ field: 'id', message: 'el post no existe' }],
      };
    }

    if (title.length < 3) {
      errors.push({
        field: 'title',
        message: 'el titulo tiene que tener 3 letras o mas',
      });
    }

    if (description.length < 3) {
      errors.push({
        field: 'description',
        message: 'el descripcion tiene que tener 3 letras o mas',
      });
    }

    if (errors.length !== 0) {
      return { errors: errors };
    }

    post.title = title;
    post.description = description;
    await post.save();

    return { post };
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => Int) id: number) {
    const post = await Post.findOne(id);

    if (!post) {
      return false;
    }

    Post.remove(post);
    return true;
  }
}
