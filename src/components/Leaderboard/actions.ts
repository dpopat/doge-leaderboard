"use server";

import { createClient } from "@/utils/supabase/server";

export async function sendVote(item_id: number, is_upvote: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("Votes")
    .insert({ item_id: item_id, is_upvote: is_upvote });

  if (error) {
    console.log("Error sending vote:", error);
    throw new Error("Error sending vote");
  }
}
