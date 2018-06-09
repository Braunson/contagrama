
psql -U postgres --set passwd=$CG_PASSWORD -f setup.sql

# https://github.com/Adyg/usdanl-sr28-postgresql/
psql -U postgres -d contagrama -f usda_sr28.sql
