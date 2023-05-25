import { Client } from "@notionhq/client";

export default eventHandler(async (event) => {
  function toDate(unixTimestamp: number) {
    return new Date(unixTimestamp * 1000).toString();
  }

  const body = await readBody(event);

  const notion = new Client({
    auth: process.env.NUXT_PUBLIC_NOTION_TOKEN, // Change in .env
  });
  const formDatabaseId: string = "3cc733cd7673445099be0657960893ea" ?? ""; // Change accordingly to your database id

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
              content: toDate(Date.now()),
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
