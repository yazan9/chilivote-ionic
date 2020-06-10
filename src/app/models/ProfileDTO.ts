export class ProfileDTO{
    public id: number;
    public username: number;
    public avatar: string;
    public created_at: Date;
    public email: string;
    public role: string
    public following: number;
    public followers: number;
    public posts: number;
    public votedOn: number;
    public receivedVotesOn: number;
}
