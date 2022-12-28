import { Client } from "@notionhq/client";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const notion = new Client({
    auth: process.env.NUXT_PUBLIC_NOTION_TOKEN,
  });
  const formDatabaseId: string = "3cc733cd7673445099be0657960893ea" ?? "";

  notion.pages.create({
    parent: {
      type: "database_id",
      database_id: formDatabaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: body.name,
            },
          },
        ],
      },
      Email: {
        email: body.email,
      },
      Message: {
        rich_text: [
          {
            text: {
              content: body.message,
            },
          },
        ],
      },
    },
  });
});
