export interface SendEmailDto {
  to: string;
  subject: string;
  html: string;
}

export interface SendWelcomeEmailDto {
  userId: string;
  lang?: string;
}

export interface SendPasswordResetEmailDto {
  userId: string;
  token: string;
  lang?: string;
}

export interface SendPasswordChangedEmailDto {
  userId: string;
  lang?: string;
}
