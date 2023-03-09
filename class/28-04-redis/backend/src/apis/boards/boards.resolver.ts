import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
import { Board } from './entities/board.entity';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class BoardResolver {
  constructor(
    private readonly boardService: BoardService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Mutation(() => String)
  async createBoard(
    @Args('writer') writer: string,
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    //
    // 1. 캐시에 등록
    await this.cacheManager.set('aaa', createBoardInput, {
      ttl: 10,
    });

    //
    // 2. 캐시에서 조회
    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);

    //
    return '캐시 테스트 중';
    /////////////////////////////////////////////
    // 레디스 연습을 위해 주석 처리
    // return this.boardService.create({
    //   writer,
    //   title,
    //   contents,
    //   createBoardInput,
    // });
  }
}
