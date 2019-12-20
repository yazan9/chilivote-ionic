import { AnswerVoteDTO } from './AnswerVoteDTO';

export class ChilivoteRandomDTO{
    id: number;
    title: string;
    answerLeft: AnswerVoteDTO;
    answerRight: AnswerVoteDTO;
    created_at: Date;
    username: string;
    isFollowing: boolean;
    userId:number;
}