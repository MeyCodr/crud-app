import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../lib/prisma"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const {title, content, image} = req.body;

    try {
        await prisma.post.create({
            data: {
                title,
                content,
                image

            }
        })
        res.status(200).json({message: 'Post Created'})
    } catch (error) {
        console.log(error);
        
    }
}