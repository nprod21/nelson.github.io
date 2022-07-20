export interface Ticket {
    number: number;
    priority: string;
    type: string;
    project: string;
    title: string;
    description: string;
    status: string;
    assignee: string;
    submitter: string;
    log?: any[],
    highlighted: boolean
}