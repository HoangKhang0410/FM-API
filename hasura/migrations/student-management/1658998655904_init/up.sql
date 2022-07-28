SET check_function_bodies = false;
CREATE TABLE public."Classes" (
    id uuid NOT NULL,
    name character varying(255),
    "creatorId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
CREATE TABLE public."Enrolls" (
    user_id uuid NOT NULL,
    class_id uuid NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
CREATE TABLE public."Users" (
    id uuid NOT NULL,
    name character varying(255),
    username character varying(255),
    password character varying(255),
    role character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE ONLY public."Classes"
    ADD CONSTRAINT "Classes_name_key" UNIQUE (name);
ALTER TABLE ONLY public."Classes"
    ADD CONSTRAINT "Classes_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Enrolls"
    ADD CONSTRAINT "Enrolls_pkey" PRIMARY KEY (user_id, class_id);
ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);
ALTER TABLE ONLY public."Enrolls"
    ADD CONSTRAINT "Enrolls_class_id_fkey" FOREIGN KEY (class_id) REFERENCES public."Classes"(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."Enrolls"
    ADD CONSTRAINT "Enrolls_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
