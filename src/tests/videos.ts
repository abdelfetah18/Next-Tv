import { Video, Thumb } from "@/types/client";

export var array : Video[] = [];

for(let i = 0; i < 10; i++)
  array.push({
    title: "Naruto",
    categories: [{ name:"action" },{ name:"psyco" },{ name:"drama" }],
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    thumbnail: {
      alt: "thumb",
      src: "dqsdqsdqsdq"
    },
    servers : [
        {
            name: "Server 1",
            url: "https://dood.re/e/hx8r9uty82ok"
        },
        {
          name: "Server 2",
          url: "https://dood.re/e/hx8r9uty82ok"
        }
    ]
});
