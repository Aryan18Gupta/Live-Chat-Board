import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/loading";
import { Room } from "./_components/room";
interface BoardPageProps{
    params:{
        boardId: string;
    };
};

const BoardPage = ({
    params,
}:BoardPageProps) => {
    

    return (
        <Room roomId= {params.boardId} fallback = {<Loading/>}>
            <Canvas boardId = {params.boardId}/>
        </Room>    
    );
};

export default BoardPage;