-- Cost matrix Tier 3 (stock designs from panel companies).
--
-- This repo has no Payload migrations: the schema was created by Payload's dev push.
-- This file adds exactly what the stock-design-tier branch's schema adds over main,
-- found by diffing a main-pushed and a branch-pushed database (2026-11-03).
--
-- Additive and backward compatible: the code on main ignores the new enum value
-- and the new nullable columns, so run this BEFORE deploying the branch.
-- Safe to re-run (IF NOT EXISTS throughout).

ALTER TYPE "public"."enum_cost_matrix_entries_tier" ADD VALUE IF NOT EXISTS 'tier3';

ALTER TABLE "cost_matrix_entries" ADD COLUMN IF NOT EXISTS "bed_bath" varchar;
ALTER TABLE "cost_matrix_entries" ADD COLUMN IF NOT EXISTS "plans_published" varchar;
ALTER TABLE "cost_matrix_entries" ADD COLUMN IF NOT EXISTS "estimated_total" varchar;
ALTER TABLE "cost_matrix_entries" ADD COLUMN IF NOT EXISTS "estimated_total_sort_value" numeric;
ALTER TABLE "cost_matrix_entries" ADD COLUMN IF NOT EXISTS "estimated_total_source" varchar;
ALTER TABLE "cost_matrix_entries" ADD COLUMN IF NOT EXISTS "customization" varchar;
