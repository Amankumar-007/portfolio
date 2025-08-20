declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_SUPABASE_URL: string;
      EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
      EXPO_PUBLIC_OPENAI_API_KEY: string;
    }
  }

  // Experimental: View Transitions API (not yet in lib.dom.d.ts everywhere)
  interface ViewTransition {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  }

  interface Document {
    // Optional because not all browsers support it
    startViewTransition?: (updateCallback: () => void) => ViewTransition;
  }
}

export {};