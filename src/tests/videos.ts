import { c_movie } from "@/types/client";

export var array : c_movie[] = [];

for(let i = 0; i < 10; i++)
  array.push({
    _id: "1",
    title: "Naruto",
    categories: [{ _id:"1", name:"action" },{ _id:"2", name:"psyco" },{ _id:"3", name:"drama" }],
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    cover_image: { _id: "0", originalFilename: "cover_image", url: "./3.png" },
    servers : [
        {
          _id:"1",
          name: "Server 1",
          url: "https://dood.re/e/hx8r9uty82ok",
          date: "01-06-2003"
        },
        {
          _id:"2",
          name: "Server 2",
          url: "https://dood.re/e/hx8r9uty82ok",
          date: "01-06-2003"
        }
    ],
    date: "01-06-2003",
    duration: "1h 30m"
});
