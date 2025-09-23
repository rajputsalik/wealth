
import arcjet, { tokenBucket } from "@arcjet/next";
const aj = arcjet({

    key: process.env.ARCJET_KEY,
    characteristics: ["userId"], // track based on Clerk user ID
    rules: [
         // Rate limiting specifically for collection creation
        tokenBucket({
            mode: "LIVE",
            refillRate: 20, // 10 tokens
            interval: 3600, // per hour
            capacity: 20, // maximum 10 tokens
        }),
    ],
});

export default aj;