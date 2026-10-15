-- ==============================================================================
-- CD-IELTS PREPARATION PLATFORM - DATABASE SCHEMA
-- ==============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  target_band NUMERIC(3, 1) DEFAULT 7.0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 2. Essays Table
CREATE TABLE IF NOT EXISTS public.essays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  task_type TEXT NOT NULL CHECK (task_type IN ('task1', 'task2', 'full_test')),
  prompt_title TEXT NOT NULL,
  prompt_text TEXT NOT NULL,
  chart_image_url TEXT,
  essay_content TEXT NOT NULL,
  word_count INTEGER NOT NULL DEFAULT 0,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  overall_band NUMERIC(3, 1) NOT NULL,
  tr_score NUMERIC(3, 1),
  cc_score NUMERIC(3, 1),
  lr_score NUMERIC(3, 1),
  gra_score NUMERIC(3, 1),
  ai_feedback_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS essays_user_id_idx ON public.essays(user_id);
CREATE INDEX IF NOT EXISTS essays_created_at_idx ON public.essays(created_at DESC);

-- Enable RLS for essays
ALTER TABLE public.essays ENABLE ROW LEVEL SECURITY;

-- Essays Policies
CREATE POLICY "Users can view their own essays"
  ON public.essays FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own essays"
  ON public.essays FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own essays"
  ON public.essays FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own essays"
  ON public.essays FOR DELETE
  USING (auth.uid() = user_id);

-- 3. Automatic Trigger for New User Profile Creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, target_band)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    7.0
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
