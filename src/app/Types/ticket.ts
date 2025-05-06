
export type ticket = {
    comment?: string;
    ticket_id?: string;
    type?: string[];
    organization?: string[]; // change to string[] if needed
    timestamp?: string;
    state?: string;
    star?: number;
    photo?: string;
}