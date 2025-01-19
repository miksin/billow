// src/env.d.ts

/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

interface Env {
  DB: D1Database;
}
declare namespace App {
  interface Locals extends Runtime { }
}
