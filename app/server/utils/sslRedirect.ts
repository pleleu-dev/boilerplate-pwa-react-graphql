export default function sslRedirect(environments: any, status: Number) {
    const _environments = environments || ["production"];
    const _status = status || 302;
    return function (req: any, res: any, next: any) {
        if (_environments === "production") {
            if (req.headers["x-forwarded-proto"] !== "https") {
                res.redirect(_status, "https://" + req.hostname + req.originalUrl);
            } else {
                next();
            }
        } else {
            next();
        }
    };
}