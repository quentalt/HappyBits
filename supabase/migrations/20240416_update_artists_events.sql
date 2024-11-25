-- Add releases column to artists
ALTER TABLE public.artists
ADD COLUMN releases text[] DEFAULT '{}';

-- Add lineup column to events
ALTER TABLE public.events
ADD COLUMN lineup text[] DEFAULT '{}';

-- Update sample data
UPDATE public.artists
SET releases = ARRAY['The Purpose Maker', 'Waveform Transmission', 'Time Machine']
WHERE name = 'Jeff Mills';

UPDATE public.artists
SET releases = ARRAY['Pain In The Dance', 'This Time', 'Ghetto Kraviz']
WHERE name = 'Nina Kraviz';

UPDATE public.artists
SET releases = ARRAY['Hypnotized', 'Higher', 'In My Mind']
WHERE name = 'Amelie Lens';

UPDATE public.events
SET lineup = ARRAY['Jeff Mills', 'Nina Kraviz', 'Amelie Lens']
WHERE name = 'Time Warp 2024';

UPDATE public.events
SET lineup = ARRAY['Ben Klock', 'Marcel Dettmann', 'Steffi']
WHERE name = 'Berghain Weekender';

UPDATE public.events
SET lineup = ARRAY['Jeff Mills', 'Carl Craig', 'Robert Hood']
WHERE name = 'Detroit Movement';