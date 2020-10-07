"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const Post_1 = require("../entities/Post");
const type_graphql_1 = require("type-graphql");
const FieldError_1 = __importDefault(require("../utils/FieldError"));
let PostResponse = class PostResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError_1.default], { nullable: true }),
    __metadata("design:type", Array)
], PostResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Post_1.Post, { nullable: true }),
    __metadata("design:type", Post_1.Post)
], PostResponse.prototype, "post", void 0);
PostResponse = __decorate([
    type_graphql_1.ObjectType()
], PostResponse);
let PostResolver = class PostResolver {
    posts() {
        return Post_1.Post.find();
    }
    post(id) {
        return Post_1.Post.findOne(id);
    }
    createPost(title, description) {
        return Post_1.Post.create({ title, description }).save();
    }
    updatePost(id, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.Post.findOne(id);
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
            yield post.save();
            return { post };
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.Post.findOne(id);
            if (!post) {
                return false;
            }
            Post_1.Post.remove(post);
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Post_1.Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    type_graphql_1.Query(() => Post_1.Post),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "post", null);
__decorate([
    type_graphql_1.Mutation(() => Post_1.Post),
    __param(0, type_graphql_1.Arg('title')),
    __param(1, type_graphql_1.Arg('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.Mutation(() => PostResponse),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg('title')),
    __param(2, type_graphql_1.Arg('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    type_graphql_1.ObjectType()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map