
psql -U postgres --set passwd=$CG_PASSWORD -f setup.sql
psql -U postgres -d contagrama -f contagrama.sql
