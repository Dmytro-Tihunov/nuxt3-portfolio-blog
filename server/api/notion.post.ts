import { Client } from "@notionhq/client";

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const notion = new Client({
    auth: process.env.NUXT_PUBLIC_NOTION_TOKEN,
  });
  const formDatabaseId: string = "3cc733cd7673445099be0657960893ea" ?? "";

  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: formDatabaseId,
    },
    properties: {
      Date: {
        rich_text: [
          {
            text: {
              content: Date.now().toString(),
            },
          },
        ],
      },
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

  if (!response) {
    throw createError({
      statusCode: 500,
      statusMessage: "Notion API response is undefined",
    });
  }

  return response;
});
