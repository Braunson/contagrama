
CREATE TABLE usda_food_groups (
  id character varying(4) NOT NULL,
  "desc" character varying(60) NOT NULL
);

CREATE TABLE usda_food_nutrition (
  id_food character varying(5) NOT NULL,
  id_nutrient character varying(3) NOT NULL,
  amount numeric(10,3) NOT NULL
);

CREATE TABLE usda_foods (
  id character varying(5) NOT NULL,
  id_food_group character varying(4) NOT NULL,
  cg_terms character varying(200),
  cg_listed boolean,
  desc_long character varying(200) NOT NULL,
  desc_short character varying(60) NOT NULL,
  common_names character varying(100),
  manufacturer character varying(65),
  sci_name character varying(65)
);

CREATE TABLE usda_nutrients (
  id character varying(3) NOT NULL,
  units character varying(7) NOT NULL,
  tagname character varying(20),
  "desc" character varying(60) NOT NULL,
  num_dec character varying(1) NOT NULL,
  sr_order numeric(6,0) NOT NULL
);

CREATE TABLE usda_weights (
  id character varying(5) NOT NULL,
  seq character varying(2) NOT NULL,
  amount numeric(6,3) NOT NULL,
  "desc" character varying(84) NOT NULL,
  gram_weight numeric(7,1) NOT NULL
);

ALTER TABLE ONLY usda_food_groups
  ADD CONSTRAINT usda_food_groups_pkey PRIMARY KEY (id);

ALTER TABLE ONLY usda_foods
  ADD CONSTRAINT usda_foods_id_food_group_index UNIQUE (id, id_food_group);

ALTER TABLE ONLY usda_foods
  ADD CONSTRAINT usda_foods_pkey PRIMARY KEY (id);

ALTER TABLE ONLY usda_nutrients
  ADD CONSTRAINT usda_nutrients_pkey PRIMARY KEY (id);

ALTER TABLE ONLY usda_food_nutrition
  ADD CONSTRAINT usda_nutrition_pkey PRIMARY KEY (id_food, id_nutrient);

ALTER TABLE ONLY usda_weights
  ADD CONSTRAINT usda_weights_pkey PRIMARY KEY (id, seq);

ALTER TABLE ONLY usda_foods
  ADD CONSTRAINT food_des_fdgrp_cd_fkey FOREIGN KEY (id_food_group) REFERENCES usda_food_groups(id);

ALTER TABLE ONLY usda_food_nutrition
  ADD CONSTRAINT nut_data_ndb_no_fkey FOREIGN KEY (id_food) REFERENCES usda_foods(id);

ALTER TABLE ONLY usda_food_nutrition
  ADD CONSTRAINT nut_data_nutr_no_fkey FOREIGN KEY (id_nutrient) REFERENCES usda_nutrients(id);

ALTER TABLE ONLY usda_weights
  ADD CONSTRAINT weight_ndb_no_fkey FOREIGN KEY (id) REFERENCES usda_foods(id);

