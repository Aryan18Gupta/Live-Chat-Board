import {Liveblocks} from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";


const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret : process.env.LIVEBLOCKS_SECRET_KEY!,

});

export async function POST(request: Request){
    const authorization = await auth();
    const user = await currentUser();

    if(!authorization || !user){
        return new Response("Unauthorized",{status: 403});
    }

    const{room} = await request.json();
    const board = await convex.query(api.board.get, {id: room});

    // if(board?.orgId !== authorization.orgId){
    //     return new Response("Unauthorized");
    // }

    const userInfo = {
        name: user.firstName || "Teammate",
        picture: user.imageUrl,
    };
    console.log({userInfo});

    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    );
    if(room) {
        session.allow(room, session.FULL_ACCESS);
    }
    const {status,body} = await session.authorize();
    // console.log({status: body},"ALLOWED");
    return new Response(body,{status});
};