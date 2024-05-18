import Image from "next/image";

export const EmptyFavorites = () => {
 return (
    <div className="mr-20 h-full flex flex-col items-center justify-center">
        <Image
         src= "/empty-favourites.svg"
         height={330}
         width={330}
         alt="Empty"
         />
         <h2 className="text-2xl font-semibold mt-6">
            No favorites found!
         </h2>
         <p className="text-muted-foreground textg-sm mt-2">
            Try favoriting a board
         </p>
    </div>
 );
};