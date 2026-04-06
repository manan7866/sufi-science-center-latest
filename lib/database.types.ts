export interface Saint {
  id: string;
  name: string;
  slug: string;
  birth_year?: number | null;
  death_year?: number | null;
  short_summary?: string | null;
  biography?: string | null;
  region?: string | null;
  region_id?: string | null;
  era?: string | null;
  is_founder?: boolean;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Lineage {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  parent_id?: string | null;
  level?: number;
  display_order?: number;
  founded_year?: number | null;
  founder_name?: string | null;
  origin_region?: string | null;
  created_at?: string;
}

export interface Theme {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  category?: string | null;
  color?: string | null;
}

export interface SaintWithRelations extends Saint {
  lineages?: Lineage[];
  themes?: Theme[];
  roles?: string[];
}
