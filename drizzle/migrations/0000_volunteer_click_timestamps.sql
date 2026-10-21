CREATE TABLE public.volunteer_clicks (
  clicked_at timestamptz NOT NULL DEFAULT clock_timestamp()
);
GRANT ALL ON public.volunteer_clicks TO service_role;
REVOKE ALL ON public.volunteer_clicks FROM anon, authenticated;
ALTER TABLE public.volunteer_clicks ENABLE ROW LEVEL SECURITY;
CREATE INDEX volunteer_clicks_clicked_at_idx ON public.volunteer_clicks (clicked_at);
CREATE FUNCTION public.volunteer_click_stats()
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT jsonb_build_object(
    'total', (SELECT count(*) FROM public.volunteer_clicks),
    'days', COALESCE((SELECT jsonb_agg(jsonb_build_object('day', day, 'clicks', clicks) ORDER BY day DESC)
      FROM (SELECT (clicked_at AT TIME ZONE 'America/Chicago')::date AS day, count(*) AS clicks
        FROM public.volunteer_clicks GROUP BY 1) d), '[]'::jsonb)
  );
$$;
REVOKE ALL ON FUNCTION public.volunteer_click_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.volunteer_click_stats() TO anon, authenticated, service_role;
COMMENT ON TABLE public.volunteer_clicks IS 'Anonymous volunteer button clicks. Only server-generated timestamps; no identifying data.';