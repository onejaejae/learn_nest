import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './board/dto/create-board.dto';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id') boardId: string): Board {
    return this.boardsService.getBoardById(boardId);
  }

  @Post('/')
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id') boardId: string,
    @Body('status') status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoard(boardId, status);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') boardId: string): void {
    return this.boardsService.deleteBoard(boardId);
  }
}
