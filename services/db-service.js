import { supabase } from '../config/supabase.js';

const DAILY_LIMIT = parseInt(process.env.DAILY_TOKEN_LIMIT || '5000', 10);

export async function getUserProfile(userId, email) {
  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code === 'PGRST116') {
    // Profile doesn't exist, create it
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([{ id: userId, email: email, daily_token_usage: 0, last_usage_reset: new Date() }])
      .select()
      .single();
    
    if (createError) throw createError;
    return newProfile;
  }

  if (error) throw error;

  // Check if reset is needed (if last reset was more than 24h ago)
  const lastReset = new Date(profile.last_usage_reset);
  const now = new Date();
  if (now - lastReset > 24 * 60 * 60 * 1000) {
    const { data: updatedProfile, error: resetError } = await supabase
      .from('profiles')
      .update({ daily_token_usage: 0, last_usage_reset: now })
      .eq('id', userId)
      .select()
      .single();
    
    if (resetError) throw resetError;
    return updatedProfile;
  }

  return profile;
}

export async function updateUserUsage(userId, tokensUsed) {
  const { data, error } = await supabase.rpc('increment_token_usage', {
    user_id: userId,
    increment: tokensUsed
  });

  if (error) {
    // Fallback if RPC is not defined
    const { data: profile } = await supabase.from('profiles').select('daily_token_usage').eq('id', userId).single();
    await supabase.from('profiles').update({ daily_token_usage: (profile?.daily_token_usage || 0) + tokensUsed }).eq('id', userId);
  }
}

export async function createChat(userId, title = 'New Chat') {
  const { data, error } = await supabase
    .from('chats')
    .insert([{ user_id: userId, title }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function saveMessage(chatId, role, content) {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ chat_id: chatId, role, content }])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getChatHistory(chatId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function getUserChats(userId) {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
