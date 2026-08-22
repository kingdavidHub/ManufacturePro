interface JwtPayload {
    email: string;
}
export declare const signToken: (email: string) => string;
export declare const verifyToken: (token: string) => JwtPayload;
export {};
//# sourceMappingURL=jwtHelperFn.d.ts.map