import axios from "axios";
import * as cheerio from "cheerio";

export default async function getOG(url) {
  const site = await axios.get(url);

  const $ = cheerio.load(site.data);

  const og = {};
  $("meta").each((_, e) => {
    if ($(e).attr("property")) {
      const key = $(e).attr("property").split(":")[1];

      if (
        key.includes("title") ||
        key.includes("image") ||
        key.includes("description")
      ) {
        const value = $(e).attr("content");
        og[key] = value;
      }
    }
  });

  return og;
}
