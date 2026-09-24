// ============================================================================
// Supabase Client & Real-time Notification Engine for Trojan Bridge Model
// Supports Supabase PostgreSQL + BroadcastChannel for 0-latency multi-tab sync
// ============================================================================

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export let supabase: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn('Supabase initialization fallback:', err);
  }
}

// Real-Time Cross-Tab / Cross-Panel Broadcast Channel
const TROJAN_BROADCAST_CHANNEL = 'jitomni_trojan_bridge_v1';
let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(TROJAN_BROADCAST_CHANNEL);
  } catch (e) {
    console.warn('BroadcastChannel not available, falling back to window storage events');
  }
}

export interface RealtimeMessage {
  type: 'NEW_ORDER' | 'ORDER_ACCEPTED_SATHI' | 'ORDER_CASCADED_PROVIDER' | 'ORDER_ACCEPTED_PROVIDER' | 'ORDER_FORWARDED_PAN_INDIA' | 'TASK_STARTED' | 'TASK_COMPLETED' | 'PROVIDER_REGISTERED' | 'CONFIG_UPDATED';
  payload: any;
  timestamp: string;
}

type MessageListener = (msg: RealtimeMessage) => void;
const listeners: Set<MessageListener> = new Set();

export const TrojanRealtime = {
  broadcast(type: RealtimeMessage['type'], payload: any) {
    const msg: RealtimeMessage = {
      type,
      payload,
      timestamp: new Date().toISOString(),
    };

    // 1. Local in-memory listeners
    listeners.forEach((listener) => {
      try {
        listener(msg);
      } catch (err) {
        console.error('Error in local realtime listener:', err);
      }
    });

    // 2. Cross-tab Broadcast Channel
    if (broadcastChannel) {
      try {
        broadcastChannel.postMessage(msg);
      } catch (e) {
        // ignore
      }
    }

    // 3. Window Custom Event for same-page non-React components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('jitomni-trojan-event', { detail: msg }));
    }

    // 4. If Supabase is connected, broadcast via Supabase Realtime
    if (supabase) {
      supabase.channel('trojan-orders').send({
        type: 'broadcast',
        event: type,
        payload,
      }).catch(() => {});
    }
  },

  subscribe(listener: MessageListener): () => void {
    listeners.add(listener);

    // Also listen to window storage & BroadcastChannel
    const handleBroadcast = (event: MessageEvent) => {
      if (event.data && event.data.type) {
        listener(event.data);
      }
    };

    if (broadcastChannel) {
      broadcastChannel.addEventListener('message', handleBroadcast);
    }

    return () => {
      listeners.delete(listener);
      if (broadcastChannel) {
        broadcastChannel.removeEventListener('message', handleBroadcast);
      }
    };
  }
};
