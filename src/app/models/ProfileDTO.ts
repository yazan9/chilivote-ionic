export class ProfileDTO{
    public id: number;
    public username: string;
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
