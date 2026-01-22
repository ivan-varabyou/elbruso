export class ForgotPasswordDto {
    email: string;
    lang?: string;
}

export class ResetPasswordDto {
    token: string;
    newPassword: string;
}

export class VerifyTokenDto {
    token: string;
}
