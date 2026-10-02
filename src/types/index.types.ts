export enum NotificationStatusEnum {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
    SUCCESS = 'success'
}
export enum NotificationOperationEnum {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    OTHER = 'other'
}
export enum NotificationEntityEnum {
    OBSERVATORY = 'observatory',
    PRODUCT = 'product',
    CATALOG = 'catalog',
    USER_PROFILE = 'user_profile',
    DATA_SOURCE = 'data_source',
    TASK = 'task',
    NONE = 'none',
    OTHER = 'other'
}

export interface Notification {
    notification_id: string;
    user_id: string;
    status: NotificationStatusEnum;
    operation: NotificationOperationEnum;
    entity: NotificationEntityEnum;
    entity_id: string | null;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
}


export enum TaskStatusEnum {
    PENDING = 'pending',
    RUNNING = 'running',
    SUCCESS = 'success',
    FAILED = 'failed',
}

export enum TaskOperationEnum {
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    SYNC = 'sync',
}

export interface TaskXDTO {
    task_id: string;
    user_id: string;
    observatory_id: string;
    title: string;
    description: string;
    operation: TaskOperationEnum;
    current_status: TaskStatusEnum;
    progress_message: string | null;
    created_at: string;
    updated_at: string;
}

export interface TasksStatsDTO {
    pending: number;
    running: number;
    success: number;
    failed: number;
}

export interface ServiceSummaryDTO {
  service_id: string;
  name: string;
  provider: string;
}

export interface DataSourceSummaryDTO {
  source_id: string;
  name: string;
}

export interface ObservatoryStatsDTO {
  observatory_id: string;
  avg_rating: number;
  review_count: number;
  services: ServiceSummaryDTO[];
  data_sources: DataSourceSummaryDTO[];
}

export interface ObservatoryDTO {
    observatory_id: string
    title: string
    description: string
    image_url: string
    metadata: Record<string, string>
    view_count: number
    created_at: string
    updated_at: string
    services?: ServiceSummaryDTO[]
    data_sources?: DataSourceSummaryDTO[]
    avg_rating?: number
    review_count?: number
};

export interface ReviewDTO {
  review_id: string
  observatory_id: string
  user_id: string
  content: string
  rating: number
  created_at: string
  updated_at: string
}

export interface ProductXDTO {
    product_id: string
    name: string
    description: string
    tags: string[]
    attributes: string[]
    metadata?: Record<string, string>
    observatory_id?: string | null
    observatory_ids?: string[]
    created_at: string
    updated_at: string
}

export interface SearchQueryDTO {
    query: string;
    observatory_id?: string | null;
    limit?: number;
    skip?: number;
    strict?: boolean;
    no_cache?: boolean;
}

export interface AppearanceSettings {
    theme: 'light' | 'dark' | 'system';
    font_size: number;
    reduce_animations: boolean;
}
export interface ExplorationSettings {
    enable_tutorial: boolean;
    default_view: 'list' | 'grid';
    items_per_page: number;
}
export interface ExportSettings {
    default_format: 'yml' | 'json';
    include_metadata: boolean;
}
export interface UserSettings {
    appearance: AppearanceSettings;
    exploration: ExplorationSettings;
    export: ExportSettings;
}

export interface UserProfile {
    user_id: string;
    fullname: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    profile_photo: string;
    created_at: string;
    updated_at: string;
    settings: UserSettings
}
export interface JubAuthResponseDTO{
    access_token: string;
    temporal_secret_key: string;
    user_profile: UserProfile;
}



export interface VerifyDTO {
    access_token: string;
    username: string;
    secret: string;
}
export interface LogoutDTO{
    access_token: string;
    username: string;
}

export interface AuthAttemptDTO {
    username: string;
    password: string;
    scope: string;
    expiration: string;
    renew_token: boolean;
}

export interface User {
    user_id?: string;
    username: string;
    first_name: string;
    last_name: string;
    fullname: string;
    email: string;
    profile_photo: string;
    // role?: string;
}

export interface AuthResponseDTO{
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_photo: string;
    access_token: string;
    temporal_secret: string;
    metadata: Record<string, any>;
    role?: string;
}

export interface CatalogSummaryDTO {
  catalog_id: string;
  name: string;
  value: string;
  catalog_type: string;
}

export interface CatalogItemAliasDTO {
  catalog_item_alias_id: string;
  value: string;
  value_type: string;
  description?: string;
}

export interface CatalogItemDTO {
  catalog_item_id: string;
  name: string;
  value: string;
  code: number;
  value_type: string;
  temporal_value?: string | null;
  description?: string;
  aliases: CatalogItemAliasDTO[];
  children: CatalogItemDTO[];
}

export interface CatalogResponseDTO {
  catalog_id: string;
  name: string;
  value: string;
  catalog_type: string;
  description?: string;
  items: CatalogItemDTO[];
}

export type CatalogType = 'INTEREST' | 'TEMPORAL' | 'SPATIAL' | 'OBSERVABLE' | 'REFERENCE';

export interface CatalogItemXResponseDTO {
  catalog_item_id: string;
  name: string;
  value: string;
  code: number;
  value_type: string;
  catalog_type: CatalogType | null;
  temporal_value: string | null;
  description: string;
  created_at: string;
  updated_at: string;
}

export type DataSourceFormat = 'csv' | 'json' | 'postgres' | 'mysql' | 'mongodb';

export interface DataSourceDTO {
  source_id: string;
  name: string;
  description: string;
  format: DataSourceFormat;
  bucket_id?: string | null;
  connection_uri?: string | null;
}

export interface DataRecord {
  record_id: string;
  source_id: string;
  spatial_id: string;
  temporal_id: string;
  interest_ids: string[];
  numerical_interest_ids: Record<string, number>;
  raw_payload: Record<string, unknown>;
}

// ── External Services ─────────────────────────────────────────────────────────

export interface BuildingBlockDetailDTO {
  building_block_id: string;
  name: string;
  command: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface PatternDetailDTO {
  pattern_id: string;
  name: string;
  task: string;
  pattern: string;
  description: string;
  workers: number;
  loadbalancer: string;
  building_block?: BuildingBlockDetailDTO | null;
  created_at: string;
  updated_at: string;
}

export interface StageDetailDTO {
  stage_id: string;
  name: string;
  source: string;
  sink: string;
  endpoint: string;
  transformation?: PatternDetailDTO | null;
  created_at: string;
  updated_at: string;
}

export interface WorkflowDetailDTO {
  workflow_id: string;
  name: string;
  stages: StageDetailDTO[];
  created_at: string;
  updated_at: string;
}

export type ServiceProvider = 'NEZ' | 'XELHUA' | 'EXTERNAL' | 'OTHER';

export interface ServiceDTO {
  service_id: string;
  name: string;
  description: string;
  owner_id: string;
  public: boolean;
  provider: ServiceProvider;
  workflow?: WorkflowDetailDTO | null;
  created_at: string;
  updated_at: string;
}

export interface SearchSuggestionResponseDTO {
  observatory_id: string;
  suggestions: Array<{ query: string; hit_count: number }>;
}

export interface ObservatorySuggestionResponseDTO {
  suggestions: Array<{ query: string; hit_count: number }>;
}

export interface CatalogXDTO {
  catalog_id: string;
  root_group_id: string | null;
  name: string;
  value: string;
  catalog_type: string;
  parent_catalog_id: string | null;
  level: number;
  description: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}