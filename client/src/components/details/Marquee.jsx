// import { cn } from "@/lib/utils";
// import { Marquee } from "@/registry/magicui/marquee";

// const reviews = [
//   {
//     name: "Jack",
//     username: "@jack",
//     body: "I've never seen anything like this before. It's amazing. I love it.",
//     img: "https://avatar.vercel.sh/jack",
//   },
//   {
//     name: "Jill",
//     username: "@jill",
//     body: "I don't know what to say. I'm speechless. This is amazing.",
//     img: "https://avatar.vercel.sh/jill",
//   },
//   {
//     name: "John",
//     username: "@john",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/john",
//   },
//   {
//     name: "Jane",
//     username: "@jane",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jane",
//   },
//   {
//     name: "Jenny",
//     username: "@jenny",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/jenny",
//   },
//   {
//     name: "James",
//     username: "@james",
//     body: "I'm at a loss for words. This is amazing. I love it.",
//     img: "https://avatar.vercel.sh/james",
//   },
// ];

// const firstRow = reviews.slice(0, reviews.length / 2);
// const secondRow = reviews.slice(reviews.length / 2);

// // JSX version: Image only card
// function ImageCard({ img }) {
//   return (
//     <div
//       className={cn(
//         "relative h-40 w-40 mx-4 shrink-0 overflow-hidden rounded-xl border",
//         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
//         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
//       )}
//     >
//       <img
//         src={img}
//         alt="Profile"
//         className="h-full w-full object-cover rounded-xl"
//       />
//     </div>
//   );
// }

// export function MarqueeDemo() {
//   return (
//     <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
//       <Marquee pauseOnHover className="[--duration:20s]">
//         {firstRow.map((review) => (
//           <ImageCard key={review.username} img={review.img} />
//         ))}
//       </Marquee>
//       <Marquee reverse pauseOnHover className="[--duration:20s]">
//         {secondRow.map((review) => (
//           <ImageCard key={review.username} img={review.img} />
//         ))}
//       </Marquee>
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
//     </div>
//   );
// }
