/*
*存放注册信息
*confirPassword用于再次验证密码
*/
export interface Signup {
    phone: string;
    email: string;
    shopName: string;
    password: string;
    confirmPassword: string;
    code: string;
}
