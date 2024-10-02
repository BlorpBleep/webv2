### **Progress Report**

- [ ] **Add `email` Column to `public.users`**
- [X] **Update Webhook Handler for Email Extraction**
- [ ] **Test User Provisioning Process**
- [ ] **Verify Database Schema Integrity**
- [ ] **Implement Persistent Deduplication**

---

### **Updated Database Schema Overview**

The database is structured to efficiently manage user accounts, payments, subscriptions, and services. The key tables and their relationships are as follows:

1. **auth.users and public.users**

    - **auth.users:** Handles authentication and stores basic user information such as email, password, and unique user ID (`id`).
    - **public.users:** Stores extended user profiles like full name, avatar URL, and **email**, linked to `auth.users` via the `id` field (foreign key).

        **Updated Schema:**

        ```sql
        ALTER TABLE public.users
        ADD COLUMN IF NOT EXISTS email VARCHAR(255);
        ```

2. **public.customers**

    - Maps users to their corresponding Stripe customer IDs.
    - **Foreign Key:** `id` references `auth.users(id)`.

3. **public.payment_intents and public.charges**

    - **payment_intents:** Records Stripe payment intents with details like amount, currency, status, and associated customer.
    - **charges:** Stores details of each charge, including amount, currency, status, billing details, and links to payment intents.
    - **Foreign Keys:**
        - `payment_intents.customer_id` references `customers(id)`.
        - `charges.payment_intent_id` references `payment_intents(id)`.

4. **public.subscriptions**

    - Manages user subscriptions, linking to Stripe subscription IDs, status, and associated user.
    - **Foreign Keys:**
        - `subscriptions.user_id` references `auth.users(id)`.

5. **public.vouchers**

    - Handles vouchers created upon successful payments.
    - Associates vouchers with user accounts and payment intents.
    - **Foreign Keys:**
        - `vouchers.payment_intent_id` references `payment_intents(id)`.
        - `vouchers.associated_account` references `accounts(account_number)`.

6. **public.accounts**

    - Stores user account details, including account numbers and expiry dates.
    - **Foreign Key:**
        - `accounts.user_id` references `users(id)`.

### **Data Relationships and Integrity**

- **UUIDs:** Used as primary keys to ensure uniqueness across tables.
- **Foreign Keys:** Maintain data integrity by enforcing relationships between tables.
- **Triggers:** Set up to automate updates and maintain consistency (e.g., updating vouchers when a subscription changes).

### **User Purchase Flow**

1. **Initiating a Purchase**

    - The customer selects a product or subscription on the frontend application.
    - Upon checkout, the frontend redirects the user to the Stripe payment page.
    - The user enters their payment information and completes the purchase.

2. **Post-Payment Success**

    - Stripe processes the payment and triggers webhook events upon success.
    - The backend server listens to these webhooks via `route.ts`.

3. **User Provisioning**

    - On receiving a successful payment event (`checkout.session.completed` or `payment_intent.succeeded`), the backend:
        - **[ ]** Creates a new user in `auth.users` if it’s their first purchase.
        - **[ ]** Generates an entry in `public.users` for the user profile.
        - **[ ]** Creates or updates the `public.customers` table with the Stripe customer ID.
        - **[ ]** Generates an account number and creates an entry in `public.accounts`.
        - **[ ]** Issues a voucher and updates the `public.vouchers` table.

### **Account and User Management**

#### **New User Creation**

- **First Purchase:**
    - A new user is created in `auth.users` with a unique `id`.
    - Extended profile information, including `email`, is stored in `public.users`.

#### **Linking to Stripe Customers**

- The user’s `id` is linked to a Stripe customer ID in `public.customers`.
- This mapping allows for easy retrieval of payment history and subscription status.

#### **Account Expiry Dates**

- The `public.accounts` table includes an `expiry` field.
- When a voucher is redeemed, the system calculates the new expiry date based on the voucher’s duration.
- This date is updated in the `accounts` table, extending the user’s access to services.

### **Payment Handling**

#### **Processing Payment Intents and Charges**

- Stripe sends webhook events for payment intents and charges.
- The backend processes these events to:
    - Record the payment intent in `public.payment_intents`.
    - Record the charge in `public.charges`.
    - Update the payment status and billing details.

#### **Storing Payment Details**

- Payment methods are stored in `public.payment_methods`.
- Includes type, last four digits, and expiration dates.
- Linked to users via `customer_id`.

### **Subscription Management**

#### **Handling One-Time Purchases (OTP) and Monthly Subscriptions**

- **One-Time Purchases:**
    - Processed as single charges.
    - A voucher is generated for the purchase.
- **Monthly Subscriptions:**
    - Managed in `public.subscriptions`.
    - Includes status, start and end dates, and Stripe subscription IDs.
    - Triggers are set to create or update vouchers when subscription status changes.

### **Voucher System**

#### **Generating Vouchers**

- Upon successful payment, a voucher code is generated.
- Vouchers are stored in `public.vouchers` with details like duration and associated account.

#### **Redeeming Vouchers**

- Vouchers are associated with user accounts.
- When redeemed, they extend the expiry date in `public.accounts`.
- The `is_used` flag is set to `true`, and `used_at` is timestamped.

### **Data Relationships**

#### **Maintaining Data Integrity**

- **Foreign Keys:** Ensure that references between tables are valid.
- **UUIDs:** Used as primary keys to prevent collisions and maintain uniqueness.
- **Constraints:** Enforce data integrity rules, such as unique voucher codes.

### **Frontend Interaction**

#### **Retrieving and Displaying User Information**

- The frontend uses Supabase APIs to fetch data from the database.
- Upon successful account provisioning:
    - The user can log in and access their account details.
    - Service access is granted based on the status and expiry fields in `public.accounts`.
    - Devices associated with the account are managed in `public.devices`.

#### **Data Flow from Backend to Frontend**

- Real-time updates are facilitated through database triggers and Supabase’s real-time features.
- When account or subscription data changes, the frontend reflects these changes immediately.

### **Security and Idempotency**

#### **Secure Handling of Payment Data**

- Sensitive data like payment methods are stored securely.
- Only necessary payment information (e.g., last four digits) is stored.

#### **Implementing Idempotency**

- Webhook processing includes checks to prevent duplicate records.
- For example, before creating a new charge record, the system checks if it already exists.

### **Error Handling and Logging**

#### **Logging Webhook Events**

- All webhook events are logged for audit purposes.
- Errors during processing are captured and logged.

#### **Monitoring and Alerting**

- The system includes monitoring tools to track webhook processing.
- Alerts are set up to notify administrators of failures or errors.

### **Database Schema Design Choices**

#### **Reasons Behind the Design**

- **Separation of Concerns:** Dividing `auth.users` and `public.users` allows for better security and management of user data.
- **Extensibility:** Using UUIDs and foreign keys makes it easier to scale and integrate additional services.
- **Data Integrity:** Constraints and triggers ensure that the data remains consistent and valid.
- **Performance:** Indexes on key columns improve query performance, especially for frequent operations.

### **Conclusion**

The system’s architecture is designed to integrate payment processing with user account management seamlessly. By leveraging Stripe and Supabase, it provides a robust platform that handles everything from payment initiation to service access. The database schema is thoughtfully designed to maintain data integrity, ensure security, and provide a scalable solution for future growth. Through careful handling of webhooks, triggers, and data relationships, the system delivers a reliable and efficient user experience.

---

### **Next Steps**

1. **Add `email` Column to `public.users`**
    - **Action:** Execute the provided SQL command to add the `email` column.
    - **Status:** Pending

2. **Update Webhook Handler for Email Syncing**
    - **Action:** Ensure that the webhook handler correctly syncs the `email` field from Stripe events to `public.users`.
    - **Status:** Completed

3. **Test User Provisioning Process**
    - **Action:** Perform tests to confirm that users are correctly created and linked in both `auth.users` and `public.users` with the `email` field populated.
    - **Status:** Pending

4. **Verify Database Schema Integrity**
    - **Action:** Review all tables to ensure that foreign keys and constraints are correctly set up.
    - **Status:** Pending

5. **Implement Persistent Deduplication**
    - **Action:** Replace in-memory deduplication with a persistent solution like Redis or a database table to track processed events.
    - **Status:** Pending

Please update the progress report by marking tasks as completed once you have tested and confirmed each step. Let me know once you've added the `email` column to `public.users` so we can proceed with testing the user provisioning process.








Supabase tables:

create table
  public.accounts (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    account_number text null,
    status text null default 'active'::text,
    max_devices text null default '5'::text,
    cryptotoken text null,
    can_add_ports text null default 'false'::text,
    can_add_devices text null default 'true'::text,
    max_ports text null default '0'::text,
    expiry text null default ''::text,
    apple_receipt text null,
    apple_api_response text null,
    user_id uuid null,
    marked_inactive_by_user timestamp with time zone null,
    constraint accounts_pkey primary key (id),
    constraint accounts_account_number_key unique (account_number),
    constraint accounts_cryptotoken_key unique (cryptotoken),
    constraint accounts_user_id_fkey foreign key (user_id) references users (id)
  ) tablespace pg_default;

create trigger trigger_sse_accounts
after insert
or delete
or
update on accounts for each row
execute function update_sse_from_accounts ();

create trigger trigger_accounts_update
after insert
or delete
or
update on accounts for each row
execute function accounts_update_trigger ();


create table
  public.charges (
    id uuid not null default gen_random_uuid (),
    stripe_charge_id text not null,
    payment_intent_id uuid not null,
    amount bigint not null,
    amount_refunded bigint not null default 0,
    currency text not null,
    customer_id uuid null,
    billing_details jsonb null,
    status text not null,
    created_at timestamp with time zone null default now(),
    receipt_email text null,
    constraint charges_pkey primary key (id),
    constraint charges_payment_intent_id_fkey foreign key (payment_intent_id) references payment_intents (id)
  ) tablespace pg_default;

  create table
  public.customers (
    id uuid not null,
    stripe_customer_id text null,
    constraint customers_pkey primary key (id),
    constraint customers_id_fkey foreign key (id) references auth.users (id)
  ) tablespace pg_default;

  create table
  public.payment_intents (
    id uuid not null default gen_random_uuid (),
    stripe_payment_intent_id text not null,
    status text not null,
    amount bigint not null,
    currency text not null,
    customer_id uuid null,
    created_at timestamp with time zone null default now(),
    receipt_email text null,
    constraint payment_intents_pkey primary key (id),
    constraint unique_stripe_payment_intent_id unique (stripe_payment_intent_id),
    constraint payment_intents_customer_id_fkey foreign key (customer_id) references customers (id)
  ) tablespace pg_default;

create index if not exists idx_payment_intents_stripe_payment_intent_id on public.payment_intents using btree (stripe_payment_intent_id) tablespace pg_default;

create table
  public.payment_methods (
    id uuid not null default gen_random_uuid (),
    stripe_payment_method_id text not null,
    type text not null,
    last_four text null,
    exp_month integer null,
    exp_year integer null,
    customer_id uuid null,
    created_at timestamp with time zone null default now(),
    updated_at timestamp with time zone null default now(),
    constraint payment_methods_pkey primary key (id),
    constraint payment_methods_customer_id_fkey foreign key (customer_id) references customers (id)
  ) tablespace pg_default;

  create table
  public.subscriptions (
    id text not null,
    user_id uuid not null,
    status public.subscription_status null,
    metadata jsonb null,
    price_id text null,
    quantity integer null,
    cancel_at_period_end boolean null,
    created timestamp with time zone not null default timezone ('utc'::text, now()),
    current_period_start timestamp with time zone not null default timezone ('utc'::text, now()),
    current_period_end timestamp with time zone not null default timezone ('utc'::text, now()),
    ended_at timestamp with time zone null default timezone ('utc'::text, now()),
    cancel_at timestamp with time zone null default timezone ('utc'::text, now()),
    canceled_at timestamp with time zone null default timezone ('utc'::text, now()),
    trial_start timestamp with time zone null default timezone ('utc'::text, now()),
    trial_end timestamp with time zone null default timezone ('utc'::text, now()),
    stripe_subscription_id character varying(255) null,
    constraint subscriptions_pkey primary key (id),
    constraint subscriptions_price_id_fkey foreign key (price_id) references prices (id),
    constraint subscriptions_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;

create trigger trigger_create_or_update_voucher_after_subscription_change
after insert
or
update on subscriptions for each row
execute function create_voucher_for_new_subscription ();

create trigger trigger_create_voucher_after_subscription_insert
after insert on subscriptions for each row
execute function create_voucher_for_new_subscription ();

create trigger trigger_update_voucher_after_subscription_update
after
update on subscriptions for each row when (old.status is distinct from new.status)
execute function update_voucher_on_subscription_change ();

create table
  public.users (
    id uuid not null,
    full_name text null,
    avatar_url text null,
    billing_address jsonb null,
    payment_method jsonb null,
    type text null,
    email character varying(255) null,
    constraint users_pkey primary key (id),
    constraint users_id_fkey foreign key (id) references auth.users (id)
  ) tablespace pg_default;

  create table
  public.vouchers (
    id uuid not null default gen_random_uuid (),
    code text not null,
    duration_months integer not null default 1,
    is_used boolean not null default false,
    associated_account text null,
    created_at timestamp with time zone not null default now(),
    used_at timestamp with time zone null,
    status text null default 'active'::text,
    subscription_id text null,
    channel_id uuid null default 'c4c8ca3f-3083-4484-a69c-cd64624ab765'::uuid,
    updated_at timestamp with time zone not null default now(),
    updated_by text null,
    payment_intent_id uuid null,
    constraint vouchers_pkey primary key (id),
    constraint vouchers_code_key unique (code),
    constraint vouchers_associated_account_fkey foreign key (associated_account) references accounts (account_number),
    constraint vouchers_channel_id_fkey foreign key (channel_id) references channels (id),
    constraint vouchers_payment_intent_id_fkey foreign key (payment_intent_id) references payment_intents (id),
    constraint vouchers_subscription_id_fkey foreign key (subscription_id) references subscriptions (id)
  ) tablespace pg_default;

create trigger vouchers_updated_at_trigger before
update on vouchers for each row
execute function update_voucher_updated_at ();

create table
  auth.users (
    instance_id uuid null,
    id uuid not null,
    aud character varying(255) null,
    role character varying(255) null,
    email character varying(255) null,
    encrypted_password character varying(255) null,
    email_confirmed_at timestamp with time zone null,
    invited_at timestamp with time zone null,
    confirmation_token character varying(255) null,
    confirmation_sent_at timestamp with time zone null,
    recovery_token character varying(255) null,
    recovery_sent_at timestamp with time zone null,
    email_change_token_new character varying(255) null,
    email_change character varying(255) null,
    email_change_sent_at timestamp with time zone null,
    last_sign_in_at timestamp with time zone null,
    raw_app_meta_data jsonb null,
    raw_user_meta_data jsonb null,
    is_super_admin boolean null,
    created_at timestamp with time zone null,
    updated_at timestamp with time zone null,
    phone text null default null::character varying,
    phone_confirmed_at timestamp with time zone null,
    phone_change text null default ''::character varying,
    phone_change_token character varying(255) null default ''::character varying,
    phone_change_sent_at timestamp with time zone null,
    confirmed_at timestamp with time zone generated always as (least(email_confirmed_at, phone_confirmed_at)) stored null,
    email_change_token_current character varying(255) null default ''::character varying,
    email_change_confirm_status smallint null default 0,
    banned_until timestamp with time zone null,
    reauthentication_token character varying(255) null default ''::character varying,
    reauthentication_sent_at timestamp with time zone null,
    is_sso_user boolean not null default false,
    deleted_at timestamp with time zone null,
    is_anonymous boolean not null default false,
    constraint users_pkey primary key (id),
    constraint users_phone_key unique (phone),
    constraint users_email_change_confirm_status_check check (
      (
        (email_change_confirm_status >= 0)
        and (email_change_confirm_status <= 2)
      )
    )
  ) tablespace pg_default;

create index if not exists users_instance_id_idx on auth.users using btree (instance_id) tablespace pg_default;

create index if not exists users_is_anonymous_idx on auth.users using btree (is_anonymous) tablespace pg_default;

create index if not exists users_instance_id_email_idx on auth.users using btree (instance_id, lower((email)::text)) tablespace pg_default;

create unique index if not exists confirmation_token_idx on auth.users using btree (confirmation_token) tablespace pg_default
where
  ((confirmation_token)::text !~ '^[0-9 ]*$'::text);

create unique index if not exists recovery_token_idx on auth.users using btree (recovery_token) tablespace pg_default
where
  ((recovery_token)::text !~ '^[0-9 ]*$'::text);

create unique index if not exists email_change_token_current_idx on auth.users using btree (email_change_token_current) tablespace pg_default
where
  (
    (email_change_token_current)::text !~ '^[0-9 ]*$'::text
  );

create unique index if not exists email_change_token_new_idx on auth.users using btree (email_change_token_new) tablespace pg_default
where
  (
    (email_change_token_new)::text !~ '^[0-9 ]*$'::text
  );

create unique index if not exists reauthentication_token_idx on auth.users using btree (reauthentication_token) tablespace pg_default
where
  (
    (reauthentication_token)::text !~ '^[0-9 ]*$'::text
  );

create unique index if not exists users_email_partial_key on auth.users using btree (email) tablespace pg_default
where
  (is_sso_user = false);

create trigger on_auth_user_created
after insert on auth.users for each row
execute function handle_new_user ();