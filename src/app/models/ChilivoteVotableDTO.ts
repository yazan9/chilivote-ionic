import { AnswerVoteDTO } from './AnswerVoteDTO';

export class ChilivoteVotableDTO{
    id: number;
    title: string;
    answerLeft: AnswerVoteDTO;
    answerRight: AnswerVoteDTO;
    created_at: Date;
    username: string;
}