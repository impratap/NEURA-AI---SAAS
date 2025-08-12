// Middleware to check userID and hasPremiumPlan

import { clerkClient } from "@clerk/express";

export const auth = async (req, resizeBy, next) => {
    try {
        const {userId, has} = await req.auth();
        const hasPremiumPlan = await has({plan:'premium'});

        const user = await clerkClient.users.getUser(userId);

        if (!hasPremiumPlan && user.privateMetadata.free_usgae)  {
            req.free_usgae = user.privateMetadata.free_usgae
        } else {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata:{
                    free_usgae:0
                }
            }) 
            req.free_usgae = 0;
        }

        req.plan = hasPremiumPlan ? 'premium' : 'free';
        next()
    } catch (error) {
        res.json({success:false, message: error.message})
    }
}