import { AnswerVoteDTO } from './AnswerVoteDTO';

export class MyChilivoteDTO
{
    id: number;
    title: string;
    answerLeft: AnswerVoteDTO;
    answerRight: AnswerVoteDTO;
    created_at: Date;
}