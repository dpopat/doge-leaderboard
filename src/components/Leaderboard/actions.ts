"use server";

import { createClient } from "@/utils/supabase/server";

type Vote = {
  id: number;
  item_id: number;
  is_upvote: boolean;
  created_at: string;
};

export async function addVote(item_id: number, is_upvote: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("Votes")
    .insert({ item_id: item_id, is_upvote: is_upvote });

  if (error) {
    console.log("Error sending vote:", error);
    throw new Error("Error sending vote");
  }
}

export async function removeVote(item_id: number, is_upvote: boolean) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Votes")
    .delete()
    .eq('item_id', item_id)
    .eq('is_upvote', is_upvote)
    .order('id', { ascending: true })
    .limit(1)
    .select<"*", Vote>();

  if (error) {
    console.log("Error removing vote:", error);
    throw new Error("Error removing vote");
  }

  if (!data || data.length === 0) {
    throw new Error("No vote found to remove");
  }
}
