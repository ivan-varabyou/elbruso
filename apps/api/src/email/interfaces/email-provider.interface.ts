export interface EmailProvider {
    send(to: string, subject: string, html: string): Promise<void>;
}

export interface EmailTemplate {
    subject: string;
    body: string;
}
