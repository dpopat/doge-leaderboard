"use server";

import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

// Define validation schemas
const voteSchema = z.object({
  item_id: z.number().int().positive(),
  is_upvote: z.boolean()
});

const updateVoteSchema = z.object({
  item_id: z.number().int().positive(),
  curr_is_up_vote: z.boolean(),
  new_is_up_vote: z.boolean()
});

type Vote = {
  id: number;
  item_id: number;
  is_upvote: boolean;
  created_at: string;
};

export async function addVote(item_id: number, is_upvote: boolean) {
  // Validate input data
  const validationResult = voteSchema.safeParse({ item_id, is_upvote });
  
  if (!validationResult.success) {
    console.log("Validation error:", validationResult.error);
    throw new Error("Invalid vote data");
  }

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
  // Validate input data
  const validationResult = voteSchema.safeParse({ item_id, is_upvote });
  
  if (!validationResult.success) {
    console.log("Validation error:", validationResult.error);
    throw new Error("Invalid vote data");
  }

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

export async function updateVote(
  item_id: number, 
  curr_is_up_vote: boolean, 
  new_is_up_vote: boolean
) {
  // Validate input data
  const validationResult = updateVoteSchema.safeParse({ 
    item_id, 
    curr_is_up_vote, 
    new_is_up_vote 
  });
  
  if (!validationResult.success) {
    console.log("Validation error:", validationResult.error);
    throw new Error("Invalid vote update data");
  }

  const supabase = await createClient();

  // Update the vote
  const { data, error: updateError } = await supabase
    .from("Votes")
    .update({ is_upvote: new_is_up_vote })
    .eq('item_id', item_id)
    .eq('is_upvote', curr_is_up_vote)
    .order('id', { ascending: true })
    .limit(1)
    .select<"*", Vote>();

  if (updateError) {
    console.log("Error updating vote:", updateError);
    throw new Error("Error updating vote");
  }

  if (!data || data.length === 0) {
    throw new Error("No vote found to remove");
  }
}
