--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.6
-- Dumped by pg_dump version 9.6.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: usda_food_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE usda_food_groups (
    id character varying(4) NOT NULL,
    "desc" character varying(60) NOT NULL
);


ALTER TABLE usda_food_groups OWNER TO postgres;

--
-- Name: TABLE usda_food_groups; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE usda_food_groups IS 'A support file to the Food Description table and contains a list of food groups used in SR28
and their descriptions.';


--
-- Name: COLUMN usda_food_groups.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_food_groups.id IS '4-digit code identifying a food group. Only the first 2
digits are currently assigned. In the future, the last 2
digits may be used. Codes may not be consecutive.';


--
-- Name: COLUMN usda_food_groups."desc"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_food_groups."desc" IS 'Name of food group.';


--
-- Name: usda_food_nutrition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE usda_food_nutrition (
    id_food character varying(5) NOT NULL,
    id_nutrient character varying(3) NOT NULL,
    amount numeric(10,3) NOT NULL
);


ALTER TABLE usda_food_nutrition OWNER TO postgres;

--
-- Name: TABLE usda_food_nutrition; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE usda_food_nutrition IS 'Contains the nutrient
values and information about the values, including expanded statistical information.';


--
-- Name: COLUMN usda_food_nutrition.id_food; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_food_nutrition.id_food IS '5-digit Nutrient Databank number that uniquely
identifies a food item. If this field is defined as
numeric, the leading zero will be lost.';


--
-- Name: COLUMN usda_food_nutrition.id_nutrient; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_food_nutrition.id_nutrient IS 'Unique 3-digit identifier code for a nutrient.';


--
-- Name: COLUMN usda_food_nutrition.amount; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_food_nutrition.amount IS 'Amount in 100 grams, edible portion.';


--
-- Name: usda_foods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE usda_foods (
    id character varying(5) NOT NULL,
    id_food_group character varying(4) NOT NULL,
    desc_long character varying(200) NOT NULL,
    desc_short character varying(60) NOT NULL,
    common_names character varying(100),
    manufacturer character varying(65),
    sci_name character varying(65)
);


ALTER TABLE usda_foods OWNER TO postgres;

--
-- Name: TABLE usda_foods; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE usda_foods IS 'Contains long and
short descriptions and food group designators for all food items, along with common
names, manufacturer name, scientific name, percentage and description of refuse, and
factors used for calculating protein and kilocalories, if applicable. Items used in the
FNDDS are also identified by value of "Y" in the Survey field.';


--
-- Name: COLUMN usda_foods.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_foods.id IS '5-digit Nutrient Databank number that uniquely
identifies a food item. If this field is defined as
numeric, the leading zero will be lost.';


--
-- Name: COLUMN usda_foods.id_food_group; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_foods.id_food_group IS '4-digit code indicating food group to which a food
item belongs.';


--
-- Name: COLUMN usda_foods.desc_long; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_foods.desc_long IS '200-character description of food item.';


--
-- Name: COLUMN usda_foods.desc_short; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_foods.desc_short IS '60-character abbreviated description of food item.
Generated from the 200-character description using
abbreviations in Appendix A. If short description is
longer than 60 characters, additional abbreviations
are made.';


--
-- Name: COLUMN usda_foods.common_names; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_foods.common_names IS 'Other names commonly used to describe a food,
including local or regional names for various foods,
for example, "soda" or "pop" for "carbonated
beverages".';


--
-- Name: COLUMN usda_foods.manufacturer; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_foods.manufacturer IS 'Indicates the company that manufactured the
product, when appropriate.';


--
-- Name: COLUMN usda_foods.sci_name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_foods.sci_name IS 'Scientific name of the food item. Given for the least
processed form of the food (usually raw), if
applicable.';


--
-- Name: usda_nutrients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE usda_nutrients (
    id character varying(3) NOT NULL,
    units character varying(7) NOT NULL,
    tagname character varying(20),
    "desc" character varying(60) NOT NULL,
    num_dec character varying(1) NOT NULL,
    sr_order numeric(6,0) NOT NULL
);


ALTER TABLE usda_nutrients OWNER TO postgres;

--
-- Name: TABLE usda_nutrients; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE usda_nutrients IS 'A support table to
the Nutrient Data table. It provides the 3-digit nutrient code, unit of measure, INFOODS
tagname, and description.';


--
-- Name: COLUMN usda_nutrients.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_nutrients.id IS 'Unique 3-digit identifier code for a nutrient.';


--
-- Name: COLUMN usda_nutrients.units; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_nutrients.units IS 'Units of measure.';


--
-- Name: COLUMN usda_nutrients.tagname; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_nutrients.tagname IS 'International Network of Food Data Systems
(INFOODS) Tagnames.';


--
-- Name: COLUMN usda_nutrients."desc"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_nutrients."desc" IS 'Name of nutrient/food component.';


--
-- Name: COLUMN usda_nutrients.num_dec; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_nutrients.num_dec IS 'Number of decimal places to which a nutrient value is
rounded.';


--
-- Name: COLUMN usda_nutrients.sr_order; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_nutrients.sr_order IS 'Used to sort nutrient records in the same order as
various reports produced from SR.';


--
-- Name: usda_weights; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE usda_weights (
    id character varying(5) NOT NULL,
    seq character varying(2) NOT NULL,
    amount numeric(6,3) NOT NULL,
    "desc" character varying(84) NOT NULL,
    gram_weight numeric(7,1) NOT NULL
);


ALTER TABLE usda_weights OWNER TO postgres;

--
-- Name: TABLE usda_weights; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE usda_weights IS 'Contains the weight in grams of
a number of common measures for each food item.';


--
-- Name: COLUMN usda_weights.id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_weights.id IS '5-digit Nutrient Databank number that uniquely
identifies a food item. If this field is defined as
numeric, the leading zero will be lost.';


--
-- Name: COLUMN usda_weights.seq; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_weights.seq IS 'Sequence number.';


--
-- Name: COLUMN usda_weights.amount; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_weights.amount IS 'Unit modifier (for example, 1 in "1 cup").';


--
-- Name: COLUMN usda_weights."desc"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_weights."desc" IS 'Description (for example, cup, diced, and 1-inch pieces).';


--
-- Name: COLUMN usda_weights.gram_weight; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN usda_weights.gram_weight IS 'Gram weight.';


--
-- Name: usda_food_groups usda_food_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_food_groups
    ADD CONSTRAINT usda_food_groups_pkey PRIMARY KEY (id);


--
-- Name: usda_foods usda_foods_id_food_group_index; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_foods
    ADD CONSTRAINT usda_foods_id_food_group_index UNIQUE (id, id_food_group);


--
-- Name: usda_foods usda_foods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_foods
    ADD CONSTRAINT usda_foods_pkey PRIMARY KEY (id);


--
-- Name: usda_nutrients usda_nutrients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_nutrients
    ADD CONSTRAINT usda_nutrients_pkey PRIMARY KEY (id);


--
-- Name: usda_food_nutrition usda_nutrition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_food_nutrition
    ADD CONSTRAINT usda_nutrition_pkey PRIMARY KEY (id_food, id_nutrient);


--
-- Name: usda_weights usda_weights_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_weights
    ADD CONSTRAINT usda_weights_pkey PRIMARY KEY (id, seq);


--
-- Name: usda_foods food_des_fdgrp_cd_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_foods
    ADD CONSTRAINT food_des_fdgrp_cd_fkey FOREIGN KEY (id_food_group) REFERENCES usda_food_groups(id);


--
-- Name: usda_food_nutrition nut_data_ndb_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_food_nutrition
    ADD CONSTRAINT nut_data_ndb_no_fkey FOREIGN KEY (id_food) REFERENCES usda_foods(id);


--
-- Name: usda_food_nutrition nut_data_nutr_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_food_nutrition
    ADD CONSTRAINT nut_data_nutr_no_fkey FOREIGN KEY (id_nutrient) REFERENCES usda_nutrients(id);


--
-- Name: usda_weights weight_ndb_no_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usda_weights
    ADD CONSTRAINT weight_ndb_no_fkey FOREIGN KEY (id) REFERENCES usda_foods(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: jonas
--

GRANT ALL ON SCHEMA public TO postgres;


--
-- Name: usda_food_groups; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE usda_food_groups TO contagrama;


--
-- Name: usda_food_nutrition; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE usda_food_nutrition TO contagrama;


--
-- Name: usda_foods; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE usda_foods TO contagrama;


--
-- Name: usda_nutrients; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE usda_nutrients TO contagrama;


--
-- PostgreSQL database dump complete
--

